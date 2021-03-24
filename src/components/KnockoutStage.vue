<template>
    <div class="knockout-stage-container">
        <div class="knockout-stage-information">
            <div class="knockout-stage-description">
                <h2>Knockout Stage</h2>
                <p>Click on the team that you think will win and advance to the next game.</p>
                <p>+40 points for each first round game</p>
                <p>+80 points for each quarter-final game</p>
                <p>+120 points for each semi-final game</p>
                <p>+200 points for predicting the final</p>
            </div>
        </div>
        <div class="games-container">
            <div class="column col-g-8">
                <Game v-for="(game, i) in roundOne" :key="i" :game="game" :round="roundOne" :index="i"/>
            </div>
            <div class="column col-g-4">
                <Game v-for="(game, i) in roundTwo" :key="i" :game="game" :round="roundTwo" :index="i"/>
            </div>
            <div class="column col-g-2">
                <Game v-for="(game, i) in roundThree" :key="i" :game="game" :round="roundThree" :index="i"/>
            </div>
            <div class="column col-g-1">
                <Game v-for="(game, i) in roundFour" :key="i" :game="game" :round="roundFour" :index="i"/>
            </div>
        </div>
        <!-- <div class="knockout-actions">
            <button id="submitBracket" class="button button-submit" @click="submitBracketData">Submit</button>
            <button id="resetBracket" class="button button-alert" @click="resetBracketData">Reset</button>
        </div> -->
    </div>
</template>

<script>
import Game from '@/components/Game.vue'

export default {
    name: 'KnockoutStage',
    components: {
        Game
    },
    computed: {
        teams() {
            return this.$store.state.teams
        },
        roundOne() {
            return this.$store.state.roundOne
        },
        roundTwo() {
            return this.$store.state.roundTwo
        },
        roundThree() {
            return this.$store.state.roundThree
        },
        roundFour() {
            return this.$store.state.roundFour
        },
    },
    mounted() {
        // Check for stored data first and use it if so

        // Init Functions
        // this.setupBracket();
    },
    methods: {
        // Setup Bracket
        setupBracket() {
            console.log(this.groupData.length);
            if (this.groupData.length == 0) {
                return;
            };

            const col1 = document.querySelector('.col-g-8');

            // Fill in bracket from groupData
            this.knockoutGames.forEach((el) => {
                let t1 = el[0].split(''); // ['c', '1']
                let t2 = el[1].split(''); // t2[0] = group, t2[1] = position in group

                let g1 = this.groupData.filter(item => item.group === t1[0]);
                let g2 = this.groupData.filter(item => item.group === t2[0]);

                t1 = g1[0].teams[t1[1] - 1].teamCode;
                t2 = g2[0].teams[t2[1] - 1].teamCode;

                // push game item
                let gameDiv = this.createGameDiv(t1, t2);
                col1.append(gameDiv);
            });
        },

        // Go back to group data
        backToGroup() {
        },

        // On Submit Save the Bracket Data
        submitBracketData() {
        },

        // Reset the groups to the default value
        resetBracketData() {
        },

        // Create game div with two teams
        createGameDiv(t1, t2) {
            const gameContainer = document.createElement('div');
            gameContainer.classList.add('game');

            // const date = document.createElement('div');
            // date.classList.add('date');

            const team1 = this.teams.filter(item => item.code === t1);
            console.log(team1);
            const team1div = document.createElement('div');
            team1div.classList.add('team');
            team1div.dataset.code = t1;
            team1div.append(team1[0].name);

            const team2 = this.teams.filter(item => item.code === t2);
            console.log(team2);
            const team2div = document.createElement('div');
            team2div.classList.add('team');
            team2div.dataset.code = t2;
            team2div.append(team2[0].name);

            gameContainer.append(team1div, team2div)

            return gameContainer;
        }
    }
}
</script>

<style lang="scss">
.knockout-stage-information {
    max-width: $container-size;
    margin: $section-spacing auto;
    text-align: left;
}

.games-container {
    --game-width: 200px;
    --game-height: 100px;

    display: grid;
    grid-template-columns: repeat(4, var(--game-width));
    grid-gap: 30px;
    max-width: 1120px;
    margin: 0 auto;
}

.column {
    display: grid;
    grid-template-rows: repeat(16, calc(var(--game-height) / 2));
    grid-gap: 15px;
}

.col-g-8 {
    .prev-result {
        display: block;
    }
}

.col-g-4 {
    .game:nth-child(1) { grid-row: 2 / span 2; }
    .game:nth-child(2) { grid-row: 6 / span 2; }
    .game:nth-child(3) { grid-row: 10 / span 2; }
    .game:nth-child(4) { grid-row: 14 / span 2; }
}

.col-g-2 {
    .game:nth-child(1) { grid-row: 4 / span 2; }
    .game:nth-child(2) { grid-row: 12 / span 2; }
}

.col-g-1 {
    grid-template-rows: 1fr;
    align-items: center;
}
</style>
