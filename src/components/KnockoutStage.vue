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
                <Game v-for="(game, i) in roundOne" :key="game.gameId" :game="game" :round="roundOne" :index="i"/>
            </div>
            <div class="column col-g-4">
                <Game v-for="(game, i) in roundTwo" :key="game.gameId" :game="game" :round="roundTwo" :index="i"/>
            </div>
            <div class="column col-g-2">
                <Game v-for="(game, i) in roundThree" :key="game.gameId" :game="game" :round="roundThree" :index="i"/>
            </div>
            <div class="column col-g-1">
                <Game v-for="(game, i) in roundFour" :key="game.gameId" :game="game" :round="roundFour" :index="i"/>
            </div>
        </div>
        <div class="knockout-actions">
            <!-- <button id="submitBracket" class="button button-submit" @click="submitBracketData">Submit</button> -->
            <button id="resetBracket" class="button" @click="resetBracketData">Reset</button>
        </div>
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
        roundOne() {
            return this.$store.state.games.filter(game => game.round === 1)
        },
        roundTwo() {
            return this.$store.state.games.filter(game => game.round === 2)
        },
        roundThree() {
            return this.$store.state.games.filter(game => game.round === 3)
        },
        roundFour() {
            return this.$store.state.games.filter(game => game.round === 4)
        },
        resetGames() {
            return this.$store.state.games.filter(game => game.round != 1)
        }
    },
    mounted() {
        // TODO: Check for stored data first and use it if so
    },
    methods: {

        // On Submit Save the Bracket Data
        submitBracketData() {
        },

        // Reset the groups to the default value
        resetBracketData() {
            // remove teams from all rounds except round 1
            this.resetGames.forEach(game => {
                game.teams.forEach(team => {
                    team.code = "";
                    team.name = "";
                    team.isWinner = false;
                    team.isLoser  = false;
                });
            })

            // set round 1 back to no winner or loser
            this.roundOne.forEach(game => {
                game.teams.forEach(team => {
                    team.isWinner = false;
                    team.isLoser  = false;
                });
            })
        },
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
