import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')

// Set userGroupData to match ogGroupData
store.commit('updateUserGroupData', store.state.ogGroupData);

// Set knockoutGames to match ogGroupData from start
store.commit('updateRoundOne');