<template>
  <div class="view home">
    <!-- <img class="logo" alt="Fifa World Cup Qatar 2022 Logo" src="../assets/wc-logo.png"> -->
    <div v-if="!signedin" class="signed-out-home content-wrapper">
      <h1>Welcome to the World Cup Bracket App.</h1>
      <p>Created to get the same excitement as a March Madness Bracket but for the World Cup. Sign up or sign in to get started.</p>
    </div>

    <div v-if="signedin" class="signed-in-home content-wrapper">
      <h1>Welcome<span v-if="user.displayName">, {{user.displayName}}</span><span v-if="!user.displayName"> to the World Cup Bracket App.</span></h1>
      <p>Check out your <router-link to="/selections">selections</router-link>.</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import GroupStage from '@/components/GroupStage.vue'
import KnockoutStage from '@/components/KnockoutStage.vue'

export default {
  name: 'Home',
  components: {
    GroupStage,
    KnockoutStage
  },
  computed: {
    signedin() {
      return this.$store.state.signedin
    },
    user() {
      return this.$store.state.user
    }
  }
}
</script>

<style scoped lang="scss">
.logo {
  max-width: 200px;
}

h1 {
  max-width: 760px;
}
</style>
