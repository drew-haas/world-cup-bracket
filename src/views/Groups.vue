<template>
  <div class="view groups">
    <div v-if="!signedin" class="signed-out-groups content-wrapper">
      <h1>Sign in to see your Groups.</h1>
      <p><router-link to="/signin">Sign In</router-link></p>
    </div>

    <div v-if="signedin" class="signed-in-groups content-wrapper">
      <h1>Your Groups</h1>
      <p>You're currently not in a group.</p>
      <p>Create or Join a group to compete with friends.</p>
      <div class="groups"></div>
    </div>

    <div class="group-options default-grid content-wrapper">
      <div class="tile large-span-6 small-span-12">
        <h2>Create a Group</h2>
        <form id="createGroup" autocomplete="off">
          <label for="createGroupName">Group Name</label>
          <input type="text" id="createGroupName" name="createGroupName">
          <label for="createGroupPassword">Group Password</label>
          <input type="text" id="createGroupPassword" name="createGroupPassword" autocomplete="new-password">
          <div class="pw-toggle">
            <input type="checkbox" @change="togglePassword($event)">
            <span>Hide Password</span>
          </div>
          <button class="button button-submit">Create and Join Group</button>
        </form>
      </div>
      <div class="tile large-span-6 small-span-12">
        <h2>Join a Group</h2>
        <form id="joinGroup">
          <label for="joinGroupName">Group Name</label>
          <input type="text" id="joinGroupName" name="joinGroupName">
          <label for="joinGroupPassword">Group Password</label>
          <input type="password" id="joinGroupPassword" name="joinGroupPassword" autocomplete="new-password">
          <button class="button">Join Group</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { db, auth } from '../firebase'

export default {
  name: 'Groups',
  computed: {
    signedin() {
      return this.$store.state.signedin
    },
    user() {
      return this.$store.state.user
    }
  },
  mounted() {
      // Form Setup
      const joinForm = document.getElementById("joinGroup");
      const createForm = document.getElementById("createGroup");

      if (joinForm && createForm) {
        joinForm.addEventListener('submit', this.handleJoinForm);
        createForm.addEventListener('submit', this.handleCreateForm);
      }

      // Check for User Groups
      const ref = db.ref('groups');

      // Attach an asynchronous callback to read the data at our posts reference
      ref.on('value', (snapshot) => {
      console.log(snapshot.val());
      }, (errorObject) => {
      console.log('The read failed: ' + errorObject.name);
      });
      // email = document.getElementById("email").value;
      // password = document.getElementById("password").value;
  },
  methods: {
    handleCreateForm(event) {
      event.preventDefault();

      console.log('handle create form');

      let groupName = document.querySelector('#createGroupName').value;
      let groupUID = groupName.replace(/\s/g, '').toLowerCase(); // make group name all lowercase and remove spaces
      let groupPassword = document.querySelector('#createGroupPassword').value;
      let groupCreator = this.user.uid;

      // Form validation
      console.log('Group Name: ', groupName)
      console.log('Group UID: ', groupUID);

      if (groupUID == '' || groupPassword == '') {
        alert('Group Name or Password Empty!');
        return;
      }

      // - group name doesn't already exist
      // - max 50 characters?
      // - password min 8 characters
      // if not show correct error

      // Write New Group to Database
      // Group Name - string
      // Group Creator - uid / string
      // Group Password - string
      // Group Members - array
      let groupData = {
        groupUID,
        groupName,
        groupPassword,
        groupCreator,
        members: [
          groupCreator
        ]
      }

      // "set" new group to database
      db.ref('groups/' + groupUID).set(groupData);

      // clear form, show success, show new group, add group to user

    },
    handleJoinForm(event) {
      event.preventDefault();
      console.log('handle join form');
      let groupName = document.querySelector('#joinGroupName');
      let groupPassword = document.querySelector('#joinGroupPassword');
      // Form validation
      // - check if Group Name exists
      // - check if password matches
      // if not show correct error
    },
    writeNewGroup() {

    },
    togglePassword(event) {
      console.log('toggle pw', event);
      if (target.isChecked) {
        // hide password
      } else {
        // show password
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.group-options {
  h2 {
    margin-bottom: 20px;
  }

  input {
    background-color: white;
  }
}

.pw-toggle {
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: -10px;
  margin-bottom: 20px;

  input {
    width: auto;
    margin-right: 17px;
    margin: 0 15px 0 0px;
  }
}
</style>