<template>
  <div class="view account">
    <div class="user-information content-wrapper">
      <h1>Your Account</h1>

      <div class="user-item locked">
        <div class="user-key">Email</div>
        <div class="user-value">{{user.email}}</div>
      </div>

      <div class="user-item locked">
        <div class="user-key">UID</div>
        <div class="user-value">{{user.uid}}</div>
      </div>

      <div class="user-item">
        <div class="user-key">Display Name</div>
        <div class="user-value">
          <span v-if="user.displayName">{{user.displayName}}</span>
          <span v-if="!user.displayName">Undefined</span>
        </div>
        <div class="user-value-actions">
          <div class="action action-edit"><span class="fi fi-rr-edit"></span></div>
          <!-- <div class="action action-save"><span class="fi fi-rr-file-check"></span></div> -->
        </div>
      </div>

      <div class="user-item">
        <div class="user-key">Profile Image</div>
        <div class="user-value">
          <span v-if="user.photoUrl">{{user.photoUrl}}</span>
          <span v-if="!user.photoUrl">Undefined</span>
        </div>
        <div class="user-value-actions">
          <div class="action action-edit"><span class="fi fi-rr-edit"></span></div>
          <!-- <div class="action action-save"><span class="fi fi-rr-file-check"></span></div> -->
        </div>
      </div>

      <div class="account-actions">
        <button class="button" @click="handleSignOut">Sign Out</button>
      </div>

      <div class="user-item-placeholder">
        {{user}}
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '../firebase';

export default {
    name: 'Account',
    computed: {
      user() {
          return this.$store.state.user
      }
    },
    mounted() {
      window.scrollTo(0,0);
    },
    methods: {
      handleSignOut(event) {
        // Sign Out the user
        auth.signOut().then(() => {
          // Sign Out Success
          // update store
          this.$store.commit('updateSignin', false);

          // remove any local storage
          localStorage.removeItem('userGroupData');
          localStorage.removeItem('userKnockoutData');

          // redirect to home
          this.$router.push('/');

        }).catch((error) => {
          // An error occurred
          console.log('Error signing out: ', error);
        });
      }
    },
}
</script>

<style scoped lang="scss">
h1 {
  margin-bottom: 30px;
}

.user-item {
  display: grid;
  grid-template-columns: 170px 200px 1fr;
  margin-bottom: 20px;
  align-items: center;

  &.locked {
    .user-value {
      opacity: .6;
    }
  }
}

.user-value-actions {
  display: flex;
  font-size: 20px;

  .action {
    cursor: pointer;

    &:hover {
      color: $accent;
    }
  }

  .fi {
    display: flex;

    &:before {
      position: relative;
    }
  }
}

.account-actions {
  margin-top: 50px;
}

.user-item-placeholder {
  margin: 100px auto;
  word-break: break-all;
}
</style>
