<template>
    <div class="game">
        <div class="prev-result">
            <span>{{game.teams[0].id}}</span>
            <span>{{game.teams[1].id}}</span>
        </div>
        <div class="teams">
            <div class="team" :class="{ 'winner': team.isWinner, 'loser': team.isLoser }" v-for="(team, i) in game.teams" :key="team.code" :data-country-code="team.code" :data-country-name="team.name" :data-index="i" @click="teamClickCallback">
                <div class="team-flag" v-if="team.code"><img :src="'https://www.countryflags.io/' + team.code + '/flat/24.png'"></div>
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
        index: Number
    },
    computed: {
        groupData() {
            return this.$store.state.groupData
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

            // Update Current Game with Winner and Loser
            this.game.teams.forEach((team, i) => {
                if(i == teamIndex) {
                    // winner
                    team.isWinner = true;
                    team.isLoser = false;
                } else {
                    // loser
                    team.isWinner = false;
                    team.isLoser = true;

                }
            });

            // Update next game
            // Organize Payload
            let nextGame = this.game.nextGame.split('_');
            let nextRound = nextGame[0];
            let nextGameIndex = nextGame[1];
            let nextTeamIndex = nextGame[2];

            if (nextRound == 'final') {
                console.log('create a', teamName, 'animation!');
            } else {
                // continue to next game
                // Update State
                this.$store.commit({
                    type: 'updateGame',
                    round: nextRound,
                    gameIndex: nextGameIndex,
                    nextTeamIndex: nextTeamIndex,
                    code: teamCode,
                    name: teamName
                });
            }
        },
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
    font-weight: bold;
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
