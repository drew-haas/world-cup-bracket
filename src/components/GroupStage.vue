<template>
    <div class="group-stage-container">
        <div class="group-stage-information">
            <div class="group-stage-description">
                <h2>Group Stage</h2>
                <p>Drag and drop the teams to arrange them in the order you expect them to finish. When you are happy with your selections move on to the knockout stage.</p>
            </div>
            <div class="group-key">
                <h2 class="key-item-header">Key</h2>
                <div class="key-item key-item-green">
                    <div class="key-item-icon"></div>
                    <div class="key-item-info">Advancing to knockout stage</div>
                </div>
                <div class="key-item key-item-red">
                    <div class="key-item-icon"></div>
                    <div class="key-item-info">Eliminated from tournament</div>
                </div>
                <div class="key-item">
                    <div class="key-item-icon"></div>
                    <div class="key-item-info">+10 points for every correct placement in the group stage</div>
                </div>
            </div>
        </div>
        <div class="group-stage-grid">
            <div v-for="group in userGroupData" :key="group.group" class="group" :data-group="group.group">
                <h2 class="group-name">Group <span>{{group.group}}</span></h2>
                <div class="group-teams">
                    <TeamRow v-for="team in group.teams" :key="team.code" :team="team"/>
                </div>
            </div>
        </div>
        <!-- <div class="group-actions">
            <button id="submitGroup" class="button button-submit" @click="submitGroupData">Submit</button>
            <button id="reset" class="button button-alert" @click="resetGroupData">Reset</button>
        </div> -->
    </div>
</template>

<script>
import TeamRow from '@/components/TeamRow.vue'
import Draggabilly from 'draggabilly'

export default {
    name: 'GroupStage',
    components: {
        TeamRow
    },
    computed: {
        userGroupData() {
            return this.$store.state.userGroupData
        },
        roundOne() {
            return this.$store.state.roundOne
        }
    },
    mounted() {
        // Init Functions
        this.setupDraggabilly();
    },
    methods: {
        // Setup all Dragabilly instances
        setupDraggabilly() {
            // get all draggie elements
            const draggableElems = document.querySelectorAll('.team-row-container');

            // array of Draggabillies
            let draggies = []
            let sortedArray = [];
            let userDataTeamsArray = [];
            let groupContainer;
            let groupData = [];

            // Create new Draggie for each element
            for (let i = 0; i < draggableElems.length; i++) {
                const draggableElem = draggableElems[i];
                const draggie = new Draggabilly(draggableElem, {
                    axis: 'y',
                    // containment: true
                });

                draggies.push(draggie); // Array of draggabilly elements

                draggie.on('dragStart', (event, pointer) => {
                    // clear user data teams array
                    userDataTeamsArray = [];
                })

                draggie.on('dragMove', (event, pointer, moveVector) => {
                    // assign groupContainer to current group
                    groupContainer = draggableElem.parentElement;

                    // get sorted teams in their group based on top positions
                    sortedArray = this.sortTeamsByTop([...draggableElem.parentElement.children]);
                });

                draggie.on('dragEnd', (event, pointer) => {
                    // update group html with sorted content
                    groupContainer.innerHTML = "";

                    sortedArray.forEach((el) => {
                        // update vuex
                        let obj = {};
                        obj.code = el.dataset.countryCode;
                        obj.name = el.dataset.countryName;
                        userDataTeamsArray.push(obj);

                        // update html
                        groupContainer.appendChild(el)
                    });

                    // Clear top styles on teams
                    let c = [...groupContainer.children];
                    c.forEach(el => el.style.top = 0);

                    // set up user group data
                    // this.updateGroupData();

                    // update group
                    let groupLetter = groupContainer.parentNode.dataset.group;
                    let groupObj = {};
                    let groupIndex = this.userGroupData.map((e) => {return e.group}).indexOf(groupLetter);
                    groupObj.group = groupLetter;
                    groupObj.teams = userDataTeamsArray;

                    this.$store.commit({
                        type: 'updateUserGroup',
                        groupObj: groupObj,
                        groupIndex: groupIndex
                    })

                    // update round one
                    this.$store.commit({
                        type: 'updateRoundOne'
                    })
                })
            }
        },

        // Calculate Order of teams by top position
        sortTeamsByTop(teams) {
            // push teams to an array with their top position
            let rectArray = [];
            teams.forEach((element, i) => {
                let r = element.getBoundingClientRect();
                rectArray.push({top: r.top, team: teams[i]});
            });

            // sort by top
            rectArray.sort((a, b) => (a.top > b.top) ? 1 : -1);

            // return just teams array with new order
            let newArray = [];
            rectArray.forEach((el) => {
                newArray.push(el.team);
            })

            return newArray;
        },

        // Update Group Data based on HTML order
        updateGroupData() {
            let groupData = [];
            const groups = [...document.querySelectorAll('.group')];

            groups.forEach((el) => {
                // Setup Group Objects
                let groupObject = {};
                const teams = [...el.querySelector('.group-teams').children];

                groupObject.group = el.dataset.group;
                groupObject.teams = [];

                // Setup Team Objects
                teams.forEach((el, i) => {
                    let teamObject = {};
                    teamObject.code = el.dataset.countryCode;
                    teamObject.name = el.dataset.countryName;
                    groupObject.teams.push(teamObject);
                });

                userGroupData.push(groupObject);
            });

            // Update userGroupData in state
            this.$store.commit('updateUserGroupData', userGroupData);

            // Update userGroupData in localStorage
            // localStorage.setItem('userGroupData', JSON.stringify(userGroupData));
        },

        // Update Teams in Round One
        updateRoundOneData() {
            this.$store.commit('updateRoundOne');
        },

        // On Submit Save the Group Data
        submitGroupData() {
            console.log('Submit Data?');
            // TODO: figure out best way to handle knockout data
            // Update Knockout Games?
            // Route to Knockout stage?
            // this.$router.push({ path: '/bracket/'});
        },

        // Reset the groups to the default value
        resetGroupData() {
            console.log('Reset to ogGroupData!');
            // TODO: go back to ogGroupData
        }
    }
}
</script>

<style scoped lang="scss">
.group-stage-container {
    --group-width: 1200px;
    --grid-gap: 40px;
}

.group-stage-information {
    max-width: var(--group-width);
    text-align: left;
    margin: 0 auto 70px;
    padding: 0 var(--grid-gap);
    display: flex;
    justify-content: space-between;

    p {
        max-width: 400px;
    }
}

.group-stage-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: var(--grid-gap);
    max-width: var(--group-width);
    margin: 0 auto;
    padding: 0 var(--grid-gap);

    @include viewport(medium) {
        grid-template-columns: 1fr;
    }
}

.group-teams {
    padding: 5px 0 0;
}

.group {
    border: 1px solid $gray;
    border-radius: $radius;
}

.group-name {
    span {
        text-transform: uppercase;
    }
}

.group-key {
    text-align: left;
    max-width: var(--group-width);
    padding: 0 var(--grid-gap);

    h2 {
        margin: 10px 0;
    }
}

.key-item {
    display: flex;
    align-items: center;
    margin-bottom: 3px;

    &-green {
        .key-item-icon {
            background: $green;
        }
    }

    &-red {
        .key-item-icon {
            background: $red;
        }
    }
}

.key-item-icon {
    width: 5px;
    height: 30px;
    margin-right: 8px;
}

.group-actions {
    margin: 70px 0;

    .button {
        margin: 0 10px;
    }
}
</style>
