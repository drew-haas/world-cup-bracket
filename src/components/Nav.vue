<template>
    <nav id="nav">
        <div class="logo-container">
            <router-link to="/"><div class="logo">wcb</div></router-link>
        </div>
        <div class="nav-links">
            <router-link to="/">
                <span class="fi fi-rr-home"></span>
                <span class="nav-link-text">Home</span>
            </router-link>
            <router-link to="/selections" v-if="signedin">
                <span class="fi fi-rr-apps"></span>
                <span class="nav-link-text">Selections</span>
            </router-link>
            <router-link to="/groups" v-if="signedin">
                <span class="fi fi-rr-users"></span>
                <span class="nav-link-text">Groups</span>
            </router-link>
            <router-link to="/account" v-if="signedin">
                <span class="fi fi-rr-user"></span>
                <span class="nav-link-text">Account</span>
            </router-link>

            <router-link to="/signin" v-if="!signedin">
                <span class="fi fi-rr-sign-in"></span>
                <span class="nav-link-text">Signin</span>
            </router-link>
            <router-link to="/signup" v-if="!signedin">
                <span class="fi fi-rr-user-add"></span>
                <span class="nav-link-text">Signup</span>
            </router-link>
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
    height: 100vh;
    width: 100%;
    position: sticky;
    top: 0;
    box-sizing: border-box;
    text-align: left;
    border-right: 1px solid $border-color;
    background: #fff;
}

.nav-links {
    a {
        color: $gray-dark;
        display: flex;
        padding: 20px;

        &.router-link-exact-active {
            color: $accent;
            position: relative;

            &:after {
                content: '';
                position: absolute;
                right: 0;
                top: 10%;
                height: 80%;
                width: 2px;
                background-color: $accent;
            }
        }

        &:hover {
            color: $accent;
            background: $bg-light;
        }
    }
}

.nav-link-text {
    margin-left: 20px;
}

.logo-container {
    height: $top-bar-height;
    border-bottom: 1px solid $border-color;
    display: flex;
    align-items: center;
    padding-left: 18px;

    .logo {
        color: white;
        font-weight: 400;
        font-size: 26px;
        --logo-size: 52px;
        width: var(--logo-size);
        height: var(--logo-size);
        background-color: $accent;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
}
</style>
