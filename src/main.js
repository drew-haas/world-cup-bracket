import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

// Setup Firebase Settings
// TODO: make these Environment Variables?
var firebaseConfig = {
    apiKey: "AIzaSyBxOybl1InZOVq0Pzg6SRVpj8kjxfLRvns",
    authDomain: "world-cup-bracket-35f1b.firebaseapp.com",
    projectId: "world-cup-bracket-35f1b",
    storageBucket: "world-cup-bracket-35f1b.appspot.com",
    messagingSenderId: "180181053728",
    appId: "1:180181053728:web:4937cb83780a4a1f21e745",
    measurementId: "G-G61BKFH8R9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create Vue App
createApp(App).use(store).use(router).mount('#app');

// Check for user data
firebase.auth().onAuthStateChanged(function(user) {
    const signInStatus = document.getElementById('sign-in-status');
    const signInButton = document.getElementById('sign-in');
    const accountDetails = document.getElementById('account-details');

    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var uid = user.uid;
      var phoneNumber = user.phoneNumber;
      var providerData = user.providerData;

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
      // User is signed out.
      signInStatus.textContent = 'Signed out';
      signInStatus.dataset.status = 'signed-out';
      signInButton.textContent = 'Sign in';
      signInButton.dataset.functionality = 'sign-in';
      accountDetails.textContent = 'user data null';
    }
  }, function(error) {
    console.log(error);
  });

// Check for localStorage items
let lsGroupData = JSON.parse(localStorage.getItem('userGroupData'));
let lsKnockoutData = JSON.parse(localStorage.getItem('userKnockoutData'));

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