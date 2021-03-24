import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')

// TODO: Set userGroupData to match ogGroupData from start or use localStorage
// if (localStorage.userGroupData) {
//     store.commit('updateUserGroupData', localStorage.userGroupData);
// } else {
//     store.commit('updateUserGroupData', store.state.ogGroupData);
// }
store.commit('updateUserGroupData', store.state.ogGroupData);

// Set knockoutGames to match ogGroupData from start
store.commit('updateRoundOne');