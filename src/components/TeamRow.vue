<template>
    <div class="team-row-container" :data-country-code="team.code" :data-country-name="team.name">
        <div class="team-order"></div>
        <div class="team-flag">
            <img :src="require('@/assets/flags/' + team.code + '-32.png')">
        </div>
        <div class="team-name">{{team.name}}</div>
        <div class="team-actions-container">
            <div class="drag-icon handle"><span class="fi fi-rr-apps-sort"></span></div>
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
    grid-template-columns: 45px 32px 1fr 45px;
    text-align: left;
    padding-left: var(--color-padding-size);
    background: var(--gray-bg);
    position: relative;

    // Advancing/Eliminated Icon
    &:before {
        content: '';
        width: var(--color-padding-size);
        background-color: transparent;
        position: absolute;
        left: 0;
        z-index: 1;
        height: 100%;
    }

    // Number Order
    .team-order {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;

        &:after {
            content: '';
        }
    }

    &:nth-child(1), &:nth-child(2) {
        &:before {
            background-color: var(--green);
        }
    }

    &:nth-of-type(odd) {
        background-color: #fff;
    }

    &:nth-child(1) .team-order:after { content: '1'; }
    &:nth-child(2) .team-order:after { content: '2'; }
    &:nth-child(3) .team-order:after { content: '3'; }
    &:nth-child(4) .team-order:after { content: '4'; }

    &.sortable-chosen {
        cursor: grabbing;
        background-color: var(--bg-light);
        z-index: 1;
    }
}

.team-name {
    padding: 10px 21px;
    flex: 1;
}

.team-flag {
    display: flex;
    justify-content: center;
    align-items: center;
}

.team-actions-container {
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 1px solid var(--gray);
}

.drag-icon {
    cursor: grab;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    &:active {
        cursor: grabbing;
    }

    &:hover {
        opacity: .5;
    }
}
</style>
