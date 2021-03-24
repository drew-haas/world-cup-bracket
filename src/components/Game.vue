<template>
    <div class="game">
        <div class="prev-result">
            <span>{{game.teams[0].id}}</span>
            <span>{{game.teams[1].id}}</span>
        </div>
        <div class="teams">
            <div class="team" v-for="team in game.teams" :key="team.code" @click="updateNextGame">
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
    },
    computed: {
        groupData() {
            return this.$store.state.groupData
        }
    },
    mounted() {
        // Init Functions
    },
    methods: {
        updateNextGame() {
            console.log('Update Next Game');
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
    }

    .team-flag {
        display: flex;
        padding: 0 13px;
    }
}
</style>
