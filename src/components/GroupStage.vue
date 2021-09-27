<template>
    <div class="group-stage-container">
        <div class="group-stage-information">
            <div class="group-stage-description">
                <h2 class="visually-hidden">Group Stage</h2>
                <p>Drag and drop the teams in the order you expect them to finish. When you are happy with your selections click Save and move on to the knockout stage.</p>
                <p>You may reset the groups to the default position at anytime.</p>
            </div>
            <div class="group-key">
                <h2 class="key-item-header">Key</h2>
                <div class="key-item key-item-green">
                    <div class="key-item-icon"></div>
                    <div class="key-item-info">Advancing to knockout stage</div>
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
        <div class="group-stage-actions">
            <button id="resetBracket" class="button button-alert" @click="resetGroupData">Reset Groups</button>
        </div>
    </div>
</template>

<script>
import TeamRow from '@/components/TeamRow.vue'
import draggable from "vuedraggable"
// import { mapState } from 'vuex'

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
        games() {
            return this.$store.state.games
        }
    },
    methods: {
        onMoveCallback(evt, originalEvent) {
            // Update Games
            this.updateRoundOneData();

            // Update LocalStorage
            localStorage.setItem('userGroupData', JSON.stringify(this.userGroupData));
            localStorage.setItem('userKnockoutData', JSON.stringify(this.games));
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
        }
    }
}
</script>

<style scoped lang="scss">
.group-stage-container {
    --group-width: 1200px;
    --grid-row-gap: 30px;
    --grid-column-gap: 100px;
}

.group-stage-information {
    max-width: var(--group-width);
    text-align: left;
    margin: 0 auto 70px;
    padding: 0 var(--grid-row-gap);

    p {
        max-width: 700px;
    }
}

.group-stage-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: var(--grid-row-gap) var(--grid-column-gap);
    max-width: var(--group-width);
    margin: 0 auto;
    padding: 0 var(--grid-row-gap);

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
    padding: 0 3px;

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
    margin: 70px 0;

    .button {
        margin: 0 10px;
    }
}
</style>
