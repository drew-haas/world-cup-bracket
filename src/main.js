import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')

// Set userGroupData to match ogGroupData
store.commit('resetUserGroupData');

// Check for localStorage items
let lsGroupData = JSON.parse(localStorage.getItem('userGroupData'));
let lsKnockoutData = JSON.parse(localStorage.getItem('userKnockoutData'));

if (lsGroupData) {

    // if lsGroupData exists - use it for userGroupData
    store.commit('updateUserGroupData', lsGroupData);

}

// if lsKnockoutData is there use it!
if (lsKnockoutData) {

    console.log('lsKnockoutData available');
    // update all games
    store.commit('updateGames', lsKnockoutData);

} else {

    // Set knockoutGames to match from start
    store.commit('updateRoundOne');

}
