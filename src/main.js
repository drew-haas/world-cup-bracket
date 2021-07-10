import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { db, auth } from './firebase'

// ===================================
//
// Create Vue App
//
// ===================================
createApp(App).use(store).use(router).mount('#app');


// ===================================
//
// Check for firebase user data
//
// ===================================
auth.onAuthStateChanged((user) => {
  const signInStatus = document.getElementById('sign-in-status');
  const signInButton = document.getElementById('sign-in');
  const accountDetails = document.getElementById('account-details');

  if (user) {
    // User is signed in
    // Show information:
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var uid = user.uid;
    var phoneNumber = user.phoneNumber;
    var providerData = user.providerData;

    // Update Store
    store.commit('updateSignin', true);
    store.commit('updateUser', user);

    // TODO: check for user.gameData and commit to store
    const gameData = getGameData(uid);
    console.log('gameData', gameData);

    user.getIdToken().then(function(accessToken) {
      signInStatus.textContent = 'Signed in as ' + email;
      signInStatus.dataset.status = 'signed-in';
      signInButton.textContent = 'Sign out';
      signInButton.dataset.functionality = 'sign-out';
      accountDetails.textContent = JSON.stringify({
        displayName: displayName,
        email: email,
        emailVerified: emailVerified,
        phoneNumber: phoneNumber,
        photoURL: photoURL,
        uid: uid,
        accessToken: accessToken,
        providerData: providerData
      }, null, '  ');
    });

  } else {
    // User not signed in.
    // update store
    store.commit('updateSignin', false);

    // Show Information:
    signInStatus.textContent = 'Signed out';
    signInStatus.dataset.status = 'signed-out';
    signInButton.textContent = 'Sign in';
    signInButton.dataset.functionality = 'sign-in';
    accountDetails.textContent = 'user data null';
  }
}, function(error) {
  console.log(error);
});


// ===================================
//
// Check for localStorage items
//
// ===================================
let lsGroupData = JSON.parse(localStorage.getItem('userGroupData'));
let lsKnockoutData = JSON.parse(localStorage.getItem('userKnockoutData'));

// If lsGroupData is there use it!
if (lsGroupData) {
  // if lsGroupData exists - use it for userGroupData
  store.commit('updateUserGroupData', lsGroupData);
} else {
  // otherwise Set userGroupData to match ogGroupData
  store.commit('resetUserGroupData');
}

// if lsKnockoutData is there use it!
if (lsKnockoutData) {
  // update all games
  store.commit('updateGames', lsKnockoutData);
} else {
  // Set knockoutGames to match from start
  store.commit('updateRoundOne');
}

// ===================================
//
// Return user saved game data
//
// ===================================
function getGameData(uid) {
  db.ref('users/' + uid + '/gameData').once('value').then((snapshot) => {
    console.log('snapshot value', snapshot.val());
    const data = snapshot.val();
    return data;
  });
}