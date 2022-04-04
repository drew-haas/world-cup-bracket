<template>
    <nav id="nav">
        <div class="logo-container">
            <router-link to="/"><img class="logo" alt="World Brackets Logo" src="../assets/worldbrackets-logo.svg"></router-link>
        </div>
        <!-- TODO: loop through these? -->
        <div class="nav-links">
            <router-link to="/" class="home-link">
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
            <!-- <router-link to="/style-guide">
                <span class="fi fi-rr-apps"></span>
                <span class="nav-link-text">Style Guide</span>
            </router-link> -->
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
    background-color: $bg-light;
    z-index: 5;

    @include viewport(medium) {
        height: auto;
        position: fixed;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid $gray;
    }

    @include viewport(small) {
        width: 100vw;
        // justify-content: center;
    }
}

.nav-links {
    a {
        display: flex;
        text-decoration: none;
        padding: 20px 20px 20px 36px;
        color: black;
        transition: color .3s;
        font-family: 'Satoshi-Bold';
        font-size: 16px;
        letter-spacing: .1px;

        @include viewport(medium) {
            display: block;
            padding: 17px 16px 15px;
            line-height: 1.35;
        }

        @include viewport(small) {
            font-family: 'Satoshi-Medium';
            font-size: 15px;
        }

        &.router-link-exact-active {
            background-color: #fff;
        }

        &:hover {
            color: $accent;
            transition: color .25s;
        }
    }

    @include viewport(medium) {
        display: flex;
        text-align: center;
        padding: 0 20px;
    }

    @include viewport(small) {
        padding: 0;
    }

    .home-link {
        @include viewport(medium) {
            display: none;
        }
    }
}

.nav-link-text {
    margin-left: 25px;

    @include viewport(medium) {
        display: block;
        margin: 0;
    }
}

.logo-container {
    display: flex;
    justify-content: center;
    align-items: center;

    .logo {
        width: 100px;
        height: auto;
        padding: 20px 0;

        @include viewport(medium) {
            width: 60px;
            padding: 10px 20px;
        }
    }
}
</style>
