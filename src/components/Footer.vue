<template>
    <footer class="footer">
        <img class="dru-logo" alt="Fifa World Cup Qatar 2022 Logo" src="../assets/dru-logo.svg">
        <br><br>
        <hr>
        <br>
        <div id="sign-in-status" class="status" data-satus="signed-out"></div>
        <button id="sign-in" class="button" data-functionality="sign-in" @click="handleSignIn"></button>
        <div id="account-details" class="user-details"></div>
    </footer>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'TeamRow',
  props: {
    team: Object,
    group: String
  },
  methods: {
    handleSignIn(event) {
      // route to sign in or sign out
      console.log('handle sign-in', event.target.dataset.functionality);

      if (event.target.dataset.functionality == 'sign-out') {
        // sign out user
        firebase.auth().signOut().then(() => {
          // Sign-out successful.
        }).catch((error) => {
          // An error happened.
        });
      } else if (event.target.dataset.functionality == 'sign-in') {
        // route to sign in page
        this.$router.push('signin');
      } else {
        console.warn('handleSignIn -- no option available. Error with data-functionality: ', event.target.dataset.functionality);
      }
    }
  }
}
</script>

<style scoped lang="scss">
.footer {
  margin-top: 50px;
  background-color: $bg-light;
  text-align: left;
  padding: 50px 50px 45px;
}
.dru-logo {
  max-width: 60px;
}

.user-details {
  padding-top: 20px;
}
</style>
