import { createRouter, createWebHistory } from 'vue-router'
import { auth } from 'firebase'

import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
    path: '/account',
    name: 'Account',
    component: () => {
      return import('../views/Account.vue')
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/selections',
    name: 'Selections',
    component: () => {
      return import('../views/Selections.vue')
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/groups',
    name: 'Groups',
    component: () => {
      return import('../views/Groups.vue')
    },
    meta: {
      requiresAuth: true
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
