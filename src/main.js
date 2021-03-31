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

    // if lsGroupData exists - set localStorage item as userGroupData
    console.log('lsGroupData available')
    store.commit('updateUserGroupData', lsGroupData);
    console.log(store.state.userGroupData)

    // if lsGroupData is there only then check for lsKnockoutData
    if (lsKnockoutData) {

        console.log('lsKnockoutData available');

    } else {

        console.log('lsKnockoutData not available')

    }

} else {

    console.log('lsGroupData not available');

}

// Set knockoutGames to match from start
store.commit('updateRoundOne');