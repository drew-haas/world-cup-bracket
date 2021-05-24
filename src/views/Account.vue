<template>
  <div class="account">
    <div class="user-information">
      <h1>Your Account</h1>
      <div class="user-item">
        <div class="user-key">Display Name</div>
        <div class="user-value">{{user.displayName}}</div>
      </div>
      <div class="user-item">
        <div class="user-key">Email</div>
        <div class="user-value">{{user.email}}</div>
      </div>
      <div class="actions">
        <button class="button" @click="handleSignOut">Sign Out</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
    name: 'Account',
    mounted() {
    },
    methods: {
      handleSignOut(event) {
        // Sign Out the user
        firebase.auth().signOut().then(() => {
          // Sign Out Success
          // update store
          this.$store.commit('updateSignin', false);
          // redirect to home
          this.$router.push('/');
        }).catch((error) => {
          // An error happened.
        });
      }
    },
    computed: {
      user() {
          return this.$store.state.user
      }
    },
}
</script>

<style scoped lang="scss">
h1 {
  color: $red;
}

.user-information {
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  text-align: left;
}

.user-item {
  display: grid;
  grid-template-columns: 200px 1fr;
  margin-bottom: 20px;
}
</style>
