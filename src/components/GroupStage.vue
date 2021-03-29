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
                <draggable class="group-teams" v-model="group.teams" item-key="team" @change="onMoveCallback">
                    <template #item="{element}">
                        <TeamRow :key="element" :team="element"/>
                    </template>
                </draggable>
            </div>
        </div>
        <div class="group-stage-actions">
            <!-- <button id="submitBracket" class="button button-submit" @click="submitBracketData">Submit</button> -->
            <!-- <button id="resetBracket" class="button" @click="resetGroupData">Reset</button> -->
        </div>
    </div>
</template>

<script>
import TeamRow from '@/components/TeamRow.vue'
import draggable from "vuedraggable"
import { mapState } from 'vuex'

export default {
    name: 'GroupStage',
    components: {
        TeamRow,
        draggable
    },
    computed: {
        // userGroupData: {
        //     get() {
        //         return this.$store.state.userGroupData
        //     },
        //     set(value) {
        //         this.$store.commit('updateUserGroupData', value)
        //     }
        // },
        userGroupData() {
            return this.$store.state.userGroupData
        },
        ...mapState([
            'userGroupData'
        ])
    },
    methods: {
        onMoveCallback(evt, originalEvent) {
            this.updateRoundOneData();
        },

        // Update Teams in Round One
        updateRoundOneData() {
            this.$store.commit('updateRoundOne');
        },

        // On Submit Save the Group Data
        submitGroupData() {
            // TODO: figure out best way to handle knockout data
            // console.log('Submit Data?');
        },

        // Reset the groups to the default value
        resetGroupData() {
            // TODO: go back to ogGroupData
            console.log('Reset to ogGroupData!');
            this.$store.commit('updateUserGroupData', this.$store.state.ogGroupData);
            console.log(this.userGroupData);
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
