import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/groups',
    name: 'Groups',
    component: () => {
      return import('../views/Groups.vue')
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => {
      return import('../views/Signup.vue')
    }
  },
  {
    path: '/signin',
    name: 'Signin',
    component: () => {
      return import('../views/Signin.vue')
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
