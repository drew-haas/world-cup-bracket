<template>
  <div class="view groups">
    <div v-if="!signedin" class="signed-out-groups content-wrapper">
      <h1>Sign in to see your Groups.</h1>
      <p><router-link to="/signin">Sign In</router-link></p>
    </div>

    <div v-if="signedin" class="signed-in-groups content-wrapper">

      <h1>Groups and Standings</h1>
      <p v-if="!userGroups">You're currently not in a group.</p>
      <p  v-if="!userGroups">Create or Join a group to compete with friends.</p>

      <div v-if="userGroups" class="groups">
        <div v-for="group in userGroups" :key="group" class="group">

          <h3 class="group-name bold">{{group.groupName}}</h3>
          <p class="group-creator">Group Creator: {{group.groupCreatorEmail}}</p>

          <div class="group-table">

            <div class="group-table-header group-table-row">
              <div class="member-rank">Rank</div>
              <div class="member-name">Name</div>
              <div class="member-points">Points</div>
              <div class="member-points-pos">Pos.</div>
            </div>

            <div class="group-member-row group-table-row" v-for="(member, index) in group.members" :key="index">
              <div class="member-rank">{{index + 1}}</div>
              <div class="member-name">{{member.email}}</div>
              <div class="member-points">0</div>
              <div class="member-points-pos">0</div>
            </div>

          </div>
        </div>
      </div>

      <div v-if="allGroups" class="groups">
        <h2 style="margin-bottom: 20px;">All Groups:</h2>
        <div v-for="group in allGroups" :key="group.groupUID" class="group-item-placeholder">{{group.groupName}}</div>
      </div>
    </div>

    <div class="group-options default-grid content-wrapper">

      <div class="tile large-span-6 small-span-12">
        <h2>Create a Group</h2>
        <form id="createGroup" autocomplete="off">
          <label for="createGroupName">Group Name</label>
          <input type="text" id="createGroupName" name="createGroupName">
          <label for="createGroupPassword">Group Password</label>
          <input type="password" id="createGroupPassword" class="password-field" name="createGroupPassword" autocomplete="new-password">
          <div class="pw-toggle">
            <input id="pwVisbilityCreate" name="pwVisbilityCreate" type="checkbox" @change="togglePassword($event)">
            <label for="pwVisbilityCreate">Show Password</label>
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
          <input type="password" id="joinGroupPassword" class="password-field" name="joinGroupPassword" autocomplete="new-password">
          <div class="pw-toggle">
            <input id="pwVisbilityJoin" name="pwVisbilityJoin" type="checkbox" @change="togglePassword($event)">
            <label for="pwVisbilityJoin">Show Password</label>
          </div>
          <button class="button">Join Group</button>
        </form>
      </div>

    </div>
  </div>
</template>

<script>
import { db, auth } from '../firebase'

// Member Object should have:
// let memberTemplate = {
//   uid: '',
//   email: ''
// }

export default {
  name: 'Groups',
  title: 'Foo Page',
  data() {
    return {
      allGroups: null,
      userGroups: null
    }
  },
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
  },
  created() {
    // Check for User Groups
      const dbGroups = db.ref('groups');
      const dbUsers = db.ref('users');

      // Grab All Groups
      // Attach an asynchronous callback to read the data at our posts reference
      dbGroups.on('value', (snapshot) => {
        this.allGroups = snapshot.val();

        if (!this.allGroups) {
          console.warn('All Groups not available!')
        }

      }, (errorObject) => {
        console.log('The read failed: ' + errorObject.name);
      });

      // Update User Groups
      dbUsers.on('value', (snapshot) => {
        // All users
        let users = snapshot.val();

        // check if user has groups yet
        if (users[this.user.uid].groups) {

          // grab groupUID's for current user
          let usersGroups = users[this.user.uid].groups;
          let userGroupsArr = Object.keys(usersGroups);

          // fill with all group data for current user
          let userGroupFull = [];
          userGroupsArr.forEach((groupId, i) => {
            userGroupFull.push(this.allGroups[groupId]);
            userGroupFull[i].members = Object.values(this.allGroups[groupId].members); // make members just the objects for easier handling
          });

          this.userGroups = userGroupFull; // make available in template

        } else {
          // User does not have a groups object yet
          console.warn('User does not have a groups object!');
          return;
        }

      }, (errorObject) => {
        console.log('The read failed: ' + errorObject.name);
      });
  },
  methods: {
    handleCreateForm(event) {
      event.preventDefault();

      const form = event.srcElement;
      let groupName = document.querySelector('#createGroupName').value;
      let groupUID = groupName.replace(/\s/g, '').toLowerCase(); // make group name all lowercase and remove spaces
      let groupPassword = document.querySelector('#createGroupPassword').value;
      let groupCreatorUID = this.user.uid;
      let groupCreatorEmail = this.user.email;

      // Form validation
      // if empty field return
      // TODO:
      // - group name doesn't already exist!
      // - max 50 characters?
      // - password min 8 characters
      // if not show correct error
      if (groupUID == '' || groupPassword == '') {
        alert('Group Name or Password Empty!');
        return;
      } else if (!this.isAlphanumeric(groupUID)) {
        // Contains special characters
        alert('Group Name can not contain special characters.')
        return;
      }

      // Write New Group to Database
      // Group Name - string
      // Group Creator - uid / string / display name ?
      // Group Password - string
      // Group Members - array
      let groupData = {
        groupUID,
        groupName,
        groupPassword,
        groupCreatorUID,
        groupCreatorEmail
      }

      let userGroupData = {
        groupUID
      }

      // "set" (add) new group to database
      db.ref('groups/' + groupUID).set(groupData);
      // "set" (add) new member to group
      db.ref('groups/' + groupUID + '/members/' + this.user.uid).set({
        uid: this.user.uid,
        email: this.user.email
      });

      // "set" (add) group to user
      db.ref('users/' + groupCreatorUID + '/groups/' + groupUID).set(userGroupData);

      // clear form
      form.reset();

      // TODO: show success

    },
    handleJoinForm(event) {
      event.preventDefault();

      const form = event.srcElement;
      let groupName = document.querySelector('#joinGroupName').value;
      let groupUID = groupName.replace(/\s/g, '').toLowerCase(); // make group name all lowercase and remove spaces
      let groupPassword = document.querySelector('#joinGroupPassword').value;

      // Form validation
      if (groupUID == '' || groupPassword == '') {
        // nothing in the form
        alert('Group Name or Password Empty!');
        return;
      } else if (!this.isAlphanumeric(groupUID)) {
        // Contains special characters
        alert('Group Name can not contain special characters.')
        return;
      }

      // Get Group Ref
      let group = db.ref('groups/' + groupUID);

      group.on('value', (snapshot) => {
        let groupData = snapshot.val();
        let membersArr = Object.values(groupData.members);

        // Check if groupData exists
        if (groupData) {

          // Check if user already in group
          if (membersArr.some(member => member.uid === this.user.uid)) {
            alert('You are already in this group!');
          }

          if (groupData.groupUID === groupUID && groupData.groupPassword === groupPassword) {
            // Access Granted - Join Group!
            // "set" (add) new member to group
            db.ref('groups/' + groupUID + '/members/' + this.user.uid).set({
              uid: this.user.uid,
              email: this.user.email
            });

            // add group to user
            // "set" (add) group to user
            db.ref('users/' + this.user.uid + '/groups/' + groupUID).set({groupUID});

          } else {
            // Password or GroupUID does not match!
            alert('Password or Group Name does not match!');
          }
        } else {
          // groupData does not exist
          alert('You are trying to join a group that does not exist.');
        }

      }, (errorObject) => {
        console.log('The read failed: ' + errorObject.name);
      });

      // Show Success message
      // Clear Form
      form.reset();

    },

    isAlphanumeric(str) {
      let regex = new RegExp('^[a-z0-9]+$');
      return regex.test(str);
    },

    togglePassword(event) {
      let pwField = event.target.closest('form').querySelector('.password-field');

      if (pwField.type === 'password') {
        pwField.type = "text";
      } else {
        pwField.type = "password";
      }
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 100px;
}

.group-options {
  h2 {
    margin-bottom: 20px;
  }

  input {
    background-color: white;
  }
}

.group {
  padding: 10px;
  margin: 10px 0 50px;
}

.group-name {
  font-size: 23px;
}

.group-creator {
  font-size: 14px;
}

.group-table {
  background-color: $gray-bg;
  max-width: 700px;
  border: 1px solid #ddd;
}

.group-table-header {
  border-bottom: 1px solid #ddd;
}

.group-table-row {
  display: grid;
  grid-template-columns: 66px 1fr 66px 66px;
  justify-content: space-evenly;
  padding: 14px;

  // &:nth-of-type(even) {
  //   background-color: white;
  // }
}

.member-points, .member-points-pos {
  text-align: right;
}

.pw-toggle {
  display: flex;
  justify-content: left;
  align-items: center;
  margin-top: -10px;
  margin-bottom: 20px;

  input {
    width: auto;
    margin: 0;
    cursor: pointer;
  }

  label {
    margin: 0;
    padding-left: 15px;
    cursor: pointer;
  }
}

// TODO: to be removed
.group-item-placeholder {
  padding: 10px 0;
}
</style>