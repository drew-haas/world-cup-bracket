<template>
    <nav id="nav">
        <div class="title">
            <router-link to="/">World Cup Bracket Challenge</router-link>
        </div>
        <div class="nav-links">
            <router-link to="/"><span class="fi fi-rr-apps"></span> Selections</router-link>
            <router-link to="/signup" v-if="!signedin">Signup</router-link>
            <router-link to="/signin" v-if="!signedin">Signin</router-link>
            <router-link to="/account" v-if="signedin"><span class="fi fi-rr-user"></span>  Account</router-link>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'TeamRow',
    props: {
    team: Object,
    group: String
    },
    computed: {
        signedin() {
            return this.$store.state.signedin
        }
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
        display: flex;
        flex-direction: column;

        &.router-link-exact-active {
            color: $red;
        }

        &:hover {
            color: $accent;
        }
    }
}

.nav-links {
    display: flex;
}
</style>
