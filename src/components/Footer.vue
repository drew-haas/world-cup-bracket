<template>
    <footer class="footer">
        <img class="dru-logo" alt="Fifa World Cup Qatar 2022 Logo" src="../assets/dru-logo.svg">
        <br><br>
        <hr>
        <br>
        <div id="sign-in-status" class="status" data-satus="signed-out"></div>
        <button id="sign-in" class="button" data-functionality="sign-in" @click="handleSignIn"></button>
        <h3 style="margin: 30px 0 0;">Auth Data:</h3>
        <div id="account-details" class="user-details"></div>
    </footer>
</template>

<script>
import { auth } from '../firebase'

export default {
  name: 'Footer',
  methods: {
    handleSignIn(event) {
      // Sign Out the user
      if (event.target.dataset.functionality == 'sign-out') {
        auth.signOut().then(() => {
          // Sign Out Success
          // update store
          this.$store.commit('updateSignin', false);
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
  background-color: var(--bg-light);
  text-align: left;
  padding: 50px 50px 45px;
  overflow: hidden;
}

.dru-logo {
  max-width: 60px;
}

.user-details {
  padding-top: 20px;
}
</style>
