<template>
    <div class="game">
        <div class="prev-result">
            <span>{{game.teams[0].id}}</span>
            <span>{{game.teams[1].id}}</span>
        </div>
        <div class="teams">
            <div class="team" :class="{ 'winner': team.isWinner, 'loser': team.isLoser }" v-for="(team, i) in game.teams" :key="team.code" :data-country-code="team.code" :data-country-name="team.name" :data-index="i" @click="teamClickCallback">
                <div class="team-flag" v-if="team.code">
                    <img :src="require('@/assets/flags/' + team.code + '-32.png')">
                </div>
                <div class="team-name">{{team.name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Game',
    props: {
        game: Object,
        round: Object,
        index: Number,
    },
    mounted() {
        this.submitInfo = document.querySelector('#knockoutDataSubmitInfo');
    },
    computed: {
        games() {
            return this.$store.state.games
        }
    },
    methods: {
        teamClickCallback(event) {
            // if no teams available exit function
            if (!event.target.dataset.countryCode) {
                return;
            }

            let teamIndex = event.target.dataset.index;
            let teamCode = event.target.dataset.countryCode;
            let teamName = event.target.dataset.countryName;
            let nextGame = this.game.nextGame.split('_');
            let nextRound = nextGame[0];
            let nextGameIndex = nextGame[1];
            let nextTeamIndex = nextGame[2];
            let toggleWinner = this.game.teams[teamIndex].isWinner;
            let toggleLoser = this.game.teams[teamIndex].isLoser;

            // Update Current Game
            if (toggleWinner) {
                // change both teams back to default
                this.game.teams.forEach((team, i) => {
                    team.isWinner = false;
                    team.isLoser = false;
                });
            } else {
                // update winner and loser
                this.game.teams.forEach((team, i) => {
                    if(i == teamIndex) {
                        team.isWinner = true;
                        team.isLoser = false;
                    } else {
                        team.isWinner = false;
                        team.isLoser = true;
                    }
                });
            }

            // clear submit info
            if (nextRound !== 'final') {
                this.submitInfo.innerHTML = '';
                this.submitInfo.classList.remove('submit-info-success', 'submit-info-alert');
            }

            // Update next game(s)
            if (nextRound == 'final') {
                // Winner Selected!
                // Create Winner Selection Celebration
                console.log('create a', teamName, 'celebration animation!');
                // const cellyDiv = document.querySelector('.final-celebration');
                // cellyDiv.innerHTML = teamName;
                // cellyDiv.classList.add('active');

            } else if (toggleWinner) {
                // Remove Team from chain of games
                let gameChain = this.getChainOfGames(this.game.nextGame);

                gameChain.forEach(game => {
                    let gameArray = game.split('_');
                    let gameId = gameArray[0] + '_' + gameArray[1];
                    let teamIndex = gameArray[2];

                    // Remove Team from Game
                    this.$store.commit({
                        type: 'removeTeamFromGame',
                        gameId,
                        teamIndex,
                        teamCode
                    });
                })
            } else if (toggleLoser) {
                // remove current/old winner from chain of games and add team to next game
                // Remove Team from all games
                let gameChain = this.getChainOfGames(this.game.nextGame);

                gameChain.forEach(game => {
                    let gameArray = game.split('_');
                    let gameId = gameArray[0] + '_' + gameArray[1];
                    let teamIndex = gameArray[2];

                    // Remove Team from Game
                    this.$store.commit({
                        type: 'removeTeamFromGame',
                        gameId,
                        teamIndex,
                        teamCode
                    });
                })

                // Add Team to next Game
                this.$store.commit({
                    type: 'addTeamToGame',
                    round: nextRound,
                    gameIndex: nextGameIndex,
                    teamIndex: nextTeamIndex,
                    code: teamCode,
                    name: teamName
                });

            } else {
                // Add Team to next Game
                this.$store.commit({
                    type: 'addTeamToGame',
                    round: nextRound,
                    gameIndex: nextGameIndex,
                    teamIndex: nextTeamIndex,
                    code: teamCode,
                    name: teamName
                });
            }

            // Update LocalStorage
            localStorage.setItem('userKnockoutData', JSON.stringify(this.games));

            // show submit button when all filled out and final selected
            this.checkForCompletion()
        },

        // Get Chain of Games for team
        getChainOfGames(nextGame) {
            let gameChain = [nextGame];

            while (nextGame != "final") {
                let s = nextGame.split('_');
                let currentGameId = s[0] + '_' + s[1];
                let currentGame = this.games.filter(game => game.gameId === currentGameId);

                nextGame = currentGame[0].nextGame;

                if (nextGame != "final") {
                    gameChain.push(nextGame);
                }
            }

            return gameChain;
        },

        checkForCompletion() {
            // check games to see if all have been filled out and final has selected
            let teamCount = 0, finalSelected = false;
            this.games.forEach(game => {
                game.teams.forEach(team => {
                    if (!(Object.keys(team.code).length === 0)) {
                        teamCount = teamCount + 1;
                    }
                })

                if (game.nextGame == 'final' && (game.teams[0].isWinner || game.teams[0].isLoser)) {
                    finalSelected = true;
                }
            })

            if (teamCount == this.games.length * 2 && finalSelected) {
                this.showSubmitButton();
            } else {
                this.hideSubmitButton();
            }

            return teamCount == this.games.length * 2 && finalSelected;
        },

        showSubmitButton() {
            let submitBtn = document.querySelector('#knockoutSubmit');
            submitBtn.classList.add('active');
        },

        hideSubmitButton() {
            let submitBtn = document.querySelector('#knockoutSubmit');
            submitBtn.classList.remove('active');
        }
    }
}
</script>

<style scoped lang="scss">
.game {
    width: var(--game-width);
    height: var(--game-height);
    border: 1px solid $gray;
    border-radius: $radius;
    margin-bottom: 15px;
    grid-row: span 2;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    position: relative;
}

.prev-result {
    text-transform: uppercase;
    position: absolute;
    left: -30px;
    display: flex;
    height: 100%;
    justify-content: space-evenly;
    flex-direction: column;
    opacity: .4;
    // font-weight: bold;
    display: none;

    span {
        height: 50%;
        display: flex;
        align-items: center;
    }
}

.teams {
    display: flex;
    height: 100%;
    flex-direction: column;
    position: relative;

    &:after {
        content: '';
        height: 1px;
        width: 100%;
        top: calc(50% - 1px);
        left: 0;
        position: absolute;
        background: #ccc;
    }

    .team {
        cursor: pointer;
        height: 50%;
        display: flex;
        align-items: center;

        &.winner {
            background: $bg-light;
        }

        &.loser {
            opacity: .5;
        }

        &:first-of-type {
            border-radius: $radius $radius 0 0;
        }

        &:last-of-type {
            border-radius: 0 0 $radius $radius;
        }
    }

    .team-flag {
        display: flex;
        padding: 0 13px;
    }

    .team-name, .team-flag {
        pointer-events: none;
    }
}
</style>
