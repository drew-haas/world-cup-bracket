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
const app = createApp(App).use(store).use(router).mount('#app');

// Save DB Game Data
let USER_DATA = null;
let LOCAL_STORAGE = null;

// reset on first load // TODO: figure out why we need this?
store.commit('resetUserGroupData');
store.commit('updateRoundOne');

// ===================================
//
// Check auth for user and if data is available
//
// ===================================
auth.onAuthStateChanged(async (user) => {

  if (user) {
    // User is signed in - update store
    store.commit('updateSignin', true);
    store.commit('updateUser', user);

    // Check for DB data first - update store
    USER_DATA = await userDb(user.uid); // get user data from database

    // Check for Local Storage second - update store
    LOCAL_STORAGE = await checkLocalStorage();

    // Logs
    console.log('user: ', user.email);
    console.log('uid: ', user.uid);

    // update groupData
    if (LOCAL_STORAGE.groupData) {
      store.commit('updateUserGroupData', LOCAL_STORAGE.groupData);
      console.log('used LOCAL_STORAGE.groupData: ', LOCAL_STORAGE.groupData);
    } else if (USER_DATA.groupData) {
      store.commit('updateUserGroupData', USER_DATA.groupData);
      console.log('used USER_DATA.groupData: ', USER_DATA.groupData);
    }

    // update knockoutData
    if (LOCAL_STORAGE.knockoutData) {
      store.commit('updateGames', LOCAL_STORAGE.knockoutData);
      console.log('used LOCAL_STORAGE.knockoutData: ', LOCAL_STORAGE.knockoutData);
    } else if (USER_DATA.gameData) {
      store.commit('updateGames', USER_DATA.gameData);
      console.log('used USER_DATA.gameData: ', USER_DATA.gameData);
    }

  } else {
    // User not signed in - don't worry about data for now
    // update store
    store.commit('updateSignin', false);
    store.commit('resetUserGroupData');
    store.commit('updateRoundOne');
  }

}, function(error) {
  console.log(error);
});


// ===================================
//
// Check for localStorage items
//
// ===================================
async function checkLocalStorage() {
  let groupData = await JSON.parse(localStorage.getItem('userGroupData'));
  let knockoutData = await JSON.parse(localStorage.getItem('userKnockoutData'));

  return {
    groupData,
    knockoutData
  }
}

// ===================================
//
// Return user data from database
//
// ===================================
async function userDb(uid) {
  return await db.ref('users/' + uid).once('value').then((snapshot) => {
    const data = snapshot.val();
    return data;
  });
}