<template>
    <div id="group-stage" class="group-stage-container tab-nav-content tab-nav-content-active">
        <div class="group-stage-information">
            <div class="group-stage-description">
                <h2 class="visually-hidden">Group Stage</h2>
                <h3 class="bold">Drag and drop the teams in the order you expect them to finish.</h3>
                <p>The Group stage determines the team positions in the Knockout stage. When you make a change here it is reflected in the bracket below.</p>
                <p>When you are happy with your selections click "Save" and move on to the Knockout stage.</p>
                <p>You may reset the groups to the default position at anytime using the "Reset Groups" button. <span class="bold">This will update your groups and bracket.</span> Make sure to click "Save" when you are finished with your selections.</p>
            </div>
            <div class="group-key">
                <h2 class="key-item-header">Key</h2>
                <div class="key-item key-item-green">
                    <div class="key-item-icon"></div>
                    <div class="key-item-info">Advancing to Knockout stage</div>
                </div>
                <div class="key-item key-item-gray">
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
                <div class="group-name"><span>{{group.group}}</span></div>
                <draggable class="group-teams" v-model="group.teams" item-key="team" @change="onMoveCallback">
                    <template #item="{element}">
                        <TeamRow :key="element" :team="element"/>
                    </template>
                </draggable>
            </div>
        </div>
        <div class="group-stage-actions" v-if="signedin">
            <button id="resetGroups" class="button button-alert" @click="resetGroupData">Reset Groups</button>
            <button id="groupSubmit" class="button button-submit" @click="submitData">Save & Submit</button>
        </div>
        <div class="signed-out-text" v-if="!signedin">
            <p>Sign in to save your bracket!</p>
        </div>
        <p id="groupDataSubmitInfo" class="submit-info"></p>
    </div>
</template>

<script>
import TeamRow from '@/components/TeamRow.vue'
import draggable from "vuedraggable"
import { auth, db } from '../firebase'

export default {
    name: 'GroupStage',
    components: {
        TeamRow,
        draggable
    },
    computed: {
        userGroupData: {
            get() {
                return this.$store.state.userGroupData
            },
            set(value) {
                this.$store.commit('updateUserGroupData', value)
            }
        },
        uid() {
            return this.$store.state.user.uid
        },
        games() {
            return this.$store.state.games
        },
        signedin() {
            return this.$store.state.signedin
        }
    },
    mounted() {
        this.submitInfo = document.querySelector('#groupDataSubmitInfo');
    },
    methods: {
        onMoveCallback(evt, originalEvent) {
            // Update Games
            this.updateRoundOneData();

            // Update LocalStorage
            localStorage.setItem('userGroupData', JSON.stringify(this.userGroupData));
            localStorage.setItem('userKnockoutData', JSON.stringify(this.games));

            // clear submit info
            this.updateSubmitInfo('', 'default');
        },

        // Update Teams in Round One
        updateRoundOneData() {
            this.$store.commit('updateRoundOne');
        },

        // Reset the groups to the default value
        resetGroupData() {
            this.$store.commit('resetUserGroupData');

            localStorage.removeItem('userGroupData');

            this.updateRoundOneData();

            localStorage.setItem('userKnockoutData', JSON.stringify(this.games));
        },

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
            console.log(this.userGroupData);
            let groupData = this.userGroupData;

            // update just gameData
            db.ref('users/' + this.uid + '/groupData').set(groupData, (error) => {
                if (error) {
                    // The write failed...
                    console.log('Write Failed', error);
                    // this.updateSubmitInfo('Group Data Not Saved Successfully!', 'alert');

                } else {
                    // Data saved successfully!
                    console.log('Data Saved Successfully');

                    // update store if necessary
                    this.$store.commit('updateGroupDataSaved', true);

                    // update HTML
                    this.updateSubmitInfo('Group Data Saved Successfully!', 'success');
                }
            });
        },
    }
}
</script>

<style scoped lang="scss">
.group-stage-container {
    --group-width: 1200px;
    --grid-row-gap: 30px;
    --grid-column-gap: 100px;
    padding-top: 115px;
}

.group-stage-information {
    // max-width: var(--group-width);
    max-width: 500px;
    text-align: left;
    margin: 0 0 70px 0;

    p {
        max-width: 700px;
    }

    .typography-headline-reduced {
        margin-bottom: 50px;
        line-height: 1.3;
    }
}

.group-stage-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: var(--grid-row-gap) var(--grid-column-gap);
    max-width: var(--group-width);
    margin: 0 auto;

    @include viewport(medium) {
        grid-template-columns: 1fr;
    }
}

.group-teams {
    padding: 0;
    border: 1px solid $gray-bg;
}

.group-name {
    span {
        display: block;
        text-transform: uppercase;
        color: $gray;
        font-family: 'Satoshi-Light';
        font-size: 80px;
        padding: 6px 0;
    }
}

.group-key {
    text-align: left;
    max-width: var(--group-width);

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

    &-gray {
        .key-item-icon {
            background: $gray;
        }
    }
}

.key-item-icon {
    width: 5px;
    height: 30px;
    margin-right: 8px;
}

.group-stage-actions {
    margin: 50px 0 0;
}

.button-submit {
    margin-left: 40px;
}
</style>
