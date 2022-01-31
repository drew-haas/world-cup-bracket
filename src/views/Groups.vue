<template>
  <div class="view groups">
    <div v-if="!signedin" class="signed-out-groups content-wrapper">
      <h1>Sign in to see your Groups.</h1>
      <p><router-link to="/signin">Sign In</router-link></p>
    </div>

    <div v-if="signedin" class="signed-in-groups content-wrapper">
      <h1>Your Groups</h1>
      <p>Group functionality has not been created yet.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Groups',
  computed: {
    signedin() {
      return this.$store.state.signedin
    }
  }
}
</script>