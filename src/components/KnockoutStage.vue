<template>
    <div id="knockout-stage" class="knockout-stage-container tab-nav-content">
        <div class="knockout-stage-information">
            <div class="knockout-stage-description">
                <h3 class="bold">Knockout Stage</h3>
                <p>Click on the team that you think will win and advance to the next game.</p>
                <p>The teams are placed in the bracket based on your Group selections.</p>
            </div>
        </div>

        <!-- <div class="knockout-stage-titles">
            <div class="inner-wrapper">
                <div class="title" data-col="1">Round of 16</div>
                <div class="title" data-col="2">Quarterfinals</div>
                <div class="title" data-col="3">Semifinals</div>
                <div class="title" data-col="4">Final</div>
            </div>
        </div> -->

        <!-- <div class="games-container">
            <div class="inner-wrapper">
                <div class="column col-g-8" data-col="1">
                    <Game v-for="(game, i) in roundOne" :key="game.gameId" :game="game" :round="roundOne" :index="i"/>
                </div>
                <div class="column col-g-4" data-col="2">
                    <Game v-for="(game, i) in roundTwo" :key="game.gameId" :game="game" :round="roundTwo" :index="i"/>
                </div>
                <div class="column col-g-2" data-col="3">
                    <Game v-for="(game, i) in roundThree" :key="game.gameId" :game="game" :round="roundThree" :index="i"/>
                </div>
                <div class="column col-g-1" data-col="4">
                    <Game v-for="(game, i) in roundFour" :key="game.gameId" :game="game" :round="roundFour" :index="i"/>
                </div>
            </div>
        </div> -->

        <swiper
            :slidesPerView="'auto'"
            :spaceBetween="0"
            :pagination="{
                clickable: true,
            }"
            :modules="modules"
            class="mySwiper"
        >
            <swiper-slide>
                <div class="slide-header title">Round of 16</div>
                <div class="column col-g-8" data-col="1">
                    <Game v-for="(game, i) in roundOne" :key="game.gameId" :game="game" :round="roundOne" :index="i"/>
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="slide-header">Quarterfinals</div>
                <div class="column col-g-4" data-col="2">
                    <Game v-for="(game, i) in roundTwo" :key="game.gameId" :game="game" :round="roundTwo" :index="i"/>
                </div>
            </swiper-slide
            ><swiper-slide>
                <div class="slide-header">Semifinals</div>
                <div class="column col-g-2" data-col="3">
                    <Game v-for="(game, i) in roundThree" :key="game.gameId" :game="game" :round="roundThree" :index="i"/>
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="slide-header">Final</div>
                <div class="column col-g-1" data-col="4">
                    <Game v-for="(game, i) in roundFour" :key="game.gameId" :game="game" :round="roundFour" :index="i"/>
                </div>
            </swiper-slide>
        </swiper>

        <div class="knockout-actions" v-if="signedin">
            <button id="resetBracket" class="button button-alert" @click="resetBracketData">Reset Bracket</button>
            <button id="knockoutSubmit" class="button button-submit" v-if="!gameDataSaved" @click="submitData">Save & Submit</button>
        </div>
        <div class="signed-out-text" v-if="!signedin">
            <p>Sign in to save your bracket!</p>
        </div>
        <p id="knockoutDataSubmitInfo" class="submit-info"></p>
        <div class="final-celebration"></div>
    </div>
</template>

<script>
import { auth, db } from '../firebase'
import Game from '@/components/Game.vue'
import { Swiper, SwiperSlide } from "swiper/vue";
import 'swiper/swiper-bundle.css' // swiper styles
import { Pagination } from "swiper";

export default {
    name: 'KnockoutStage',
    components: {
        Game,
        Swiper,
        SwiperSlide
    },
    setup() {
        return {
            modules: [Pagination],
        };
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
        },
        games() {
            return this.$store.state.games
        },
        uid() {
            return this.$store.state.user.uid
        },
        email() {
            return this.$store.state.user.email
        },
        gameDataSaved() {
            return this.$store.gameDataSaved
        },
        signedin() {
            return this.$store.state.signedin
        }
    },
    mounted() {
        this.submitInfo = document.querySelector('#knockoutDataSubmitInfo');
        this.checkForCompletion();
    },
    methods: {
        // On Submit Save the Bracket Data
        submitData() {
            // Write new game data to firebase
            this.updateFirebase();
        },

        updateSubmitInfo(string, action) {
            this.submitInfo.innerHTML = string;
            this.submitInfo.classList.remove('submit-info-success', 'submit-info-alert');
            this.submitInfo.classList.add('submit-info-' + action);
        },

        updateFirebase() {
            let gameData = this.games;

            // update just gameData
            db.ref('users/' + this.uid + '/gameData').set(gameData, (error) => {
                if (error) {
                    // The write failed...
                    this.updateSubmitInfo('Knockout Data Not Saved Successfully!', 'alert');
                    console.log('Write Failed', error);

                } else {
                    this.handleDataSuccess();
                }
            });
        },

        handleDataSuccess() {
            // update store
            this.$store.commit('updateGameDataSaved', true);

            // update HTML
            this.updateSubmitInfo('Knockout Data Saved Successfully!', 'success');

            // Data saved successfully!
            console.log('Data Saved Successfully');

            // Hide Save and Submit
            this.hideSubmitButton();
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

            // remove local storage item
            localStorage.removeItem('userKnockoutData');

            // hide submit button
            this.hideSubmitButton();
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
            if (this.signedin) {
                let submitBtn = document.querySelector('#knockoutSubmit');
                submitBtn.classList.add('active');
            }
        },

        hideSubmitButton() {
            if (this.signedin) {
                let submitBtn = document.querySelector('#knockoutSubmit');
                submitBtn.classList.remove('active');
            }
        }
    }
}
</script>

<style lang="scss">
.knockout-stage-container {
    --game-width: 200px;
    --game-height: 100px;
    --slide-padding: 30px;
    // --game-grid-gap: 30px;

    width: 100%;
    height: auto;
    position: relative;
    padding-top: 120px;

    .button-submit {
        display: none;
        margin-left: 40px;

        @include viewport(medium) {
            margin-left: 0;
            margin-top: 20px;
        }

        &.active {
            display: block;
        }
    }
}

.knockout-stage-information {
    max-width: var(--container-size);
    margin: 0 auto var(--section-spacing);
    text-align: left;
}

.swiper-wrapper {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    width: 100%;
}

.swiper-container {
    width: 100%;
}

.swiper-slide {
    width: auto;

    &:nth-of-type(1) {
        .slide-header {
            padding-left: var(--slide-padding);
        }
    }

    .slide-header {
        opacity: .5;
        padding-bottom: 20px;
    }
}

// .games-container, .knockout-stage-titles {
//     box-sizing: border-box;

//     .inner-wrapper {
//         display: grid;
//         grid-template-columns: repeat(4, var(--game-width));
//         grid-gap: var(--game-grid-gap);
//         margin: 0 auto;
//     }

//     @include viewport(medium) {
//         width: 100%;
//         overflow: hidden;
//     }

//     @include viewport(large) {
//         --game-width: 175px;
//         --game-height: 85px;
//         --game-grid-gap: 15px;
//     }
// }

// .games-container {
//     max-width: 1120px;
//     padding-left: 40px;
// }

// .knockout-stage-titles {
//     --sticky-height: 93px;
//     margin-bottom: 20px;
//     position: sticky;
//     top: var(--sticky-height);
//     background-color: white;
//     border-bottom: 1px solid var(--gray);
//     z-index: 2;
//     padding: 10px 50px;
//     margin-bottom: 70px;

//     @include viewport(medium) {
//         --sticky-height: 74px;
//     }

//     .title {
//         opacity: .5;
//     }
// }

.column {
    display: grid;
    grid-template-rows: repeat(16, calc(var(--game-height) / 2));
    grid-gap: 15px;
    padding-right: var(--slide-padding);
}

.col-g-8 {
    padding-left: var(--slide-padding);

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
    height: 100%;
}

.knockout-actions {
    margin: 40px 0;
    display: flex;

    @include viewport(medium) {
        display: block;
    }
}

.final-celebration {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(0.3);
  opacity: 0;
  pointer-events: none;
  font-size: 120px;
  background: var(--bg-light);
  padding: 100px;

  &.active {
    pointer-events: auto;
    animation: scaleUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
}

@keyframes scaleUp {
  0% {
    transform: translate(-50%, -50%) scale(0.3);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
}
</style>
