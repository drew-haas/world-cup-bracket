<template>
    <nav id="nav">
        <div class="title">World Cup Bracket Challenge</div>
        <div class="nav-links">
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
            <router-link to="/groups">Groups</router-link>
        </div>
    </nav>
</template>

<script>
export default {
  name: 'TeamRow',
  props: {
    team: Object,
    group: String
  }
}
</script>

<style scoped lang="scss">
#nav {
    padding: 30px;
    background-color: $bg-light;
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;

    a {
        font-weight: bold;
        color: $gray-dark;
        margin-right: 20px;

        &.router-link-exact-active {
            color: $red;
        }

        &:hover {
            color: $accent;
        }
    }
}
</style>
