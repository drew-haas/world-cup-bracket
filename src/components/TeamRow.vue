<template>
    <div class="team-row-container" :data-country-code="team.code" :data-country-name="team.name">
        <div class="team-flag">
            <img :src="require('@/assets/flags/' + team.code + '-32.png')">
        </div>
        <div class="team-name">{{team.name}}</div>
        <div class="team-info-container">
            <div class="info-button"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'TeamRow',
  props: {
    team: Object,
  }
}
</script>

<style scoped lang="scss">
.team-row-container {
    --color-padding-size: 5px;
    --number-width: 30px;

    display: grid;
    grid-template-columns: 50px 1fr 1fr;
    text-align: left;
    color: #000;
    border-bottom: 1px solid $gray;
    padding-left: var(--color-padding-size);
    background: #fff;
    position: relative;
    cursor: grab;

    &:active {
        cursor: grabbing;
    }

    &:first-of-type {
        border-top: 1px solid $gray;
    }

    // Advancing Icon
    &:before {
        content: '';
        width: var(--color-padding-size);
        background-color: $red;
        position: absolute;
        left: 0;
        z-index: 1;
        height: 100%;
    }

    // Number Order
    &:after {
        content: '';
        width: var(--number-width);
        height: 100%;
        position: absolute;
        left: calc(var(--number-width) * -1);
        top: 0;
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        // font-weight: bold;
        opacity: .4;
    }

    &:last-of-type {
        border-bottom: none;
        border-radius: 0 0 $radius $radius;
    }

    &:nth-child(1), &:nth-child(2) {
        &:before {
            background-color: $green;
        }
    }

    &:nth-child(1):after { content: '1'; }
    &:nth-child(2):after { content: '2'; }
    &:nth-child(3):after { content: '3'; }
    &:nth-child(4):after { content: '4'; }

    &.sortable-chosen {
        background-color: $bg-light;
        z-index: 1;
    }
}

.team-name {
    padding: 5px;
}

.team-flag {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
