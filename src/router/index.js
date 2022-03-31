import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'World Cup Bracket App',
      metaTags: [
        {
          name: 'description',
          content: 'Bringing Fantasy Football to the World Cup.'
        },
        {
          property: 'og:description',
          content: 'Bringing Fantasy Football to the World Cup.'
        }
      ]
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => {
      return import('../views/Signup.vue')
    },
    meta: {
      title: 'Sign Up - World Cup Bracket App',
      metaTags: [
        {
          name: 'description',
          content: 'Bringing Fantasy Football to the World Cup.'
        },
        {
          property: 'og:description',
          content: 'Bringing Fantasy Football to the World Cup.'
        }
      ]
    }
  },
  {
    path: '/signin',
    name: 'Signin',
    component: () => {
      return import('../views/Signin.vue')
    },
    meta: {
      title: 'Sign In - World Cup Bracket App',
      metaTags: [
        {
          name: 'description',
          content: 'Bringing Fantasy Football to the World Cup.'
        },
        {
          property: 'og:description',
          content: 'Bringing Fantasy Football to the World Cup.'
        }
      ]
    }
  },
  {
    path: '/style-guide',
    name: 'StyleGuide',
    component: () => {
      return import('../views/StyleGuide.vue')
    },
    meta: {
      title: 'Style Guide - World Cup Bracket App',
      metaTags: [
        {
          name: 'description',
          content: 'Bringing Fantasy Football to the World Cup.'
        },
        {
          property: 'og:description',
          content: 'Bringing Fantasy Football to the World Cup.'
        }
      ]
    }
  },
  {
    path: '/account',
    name: 'Account',
    component: () => {
      return import('../views/Account.vue')
    },
    meta: {
      title: 'Your Account - World Cup Bracket App',
      metaTags: [
        {
          name: 'description',
          content: 'Bringing Fantasy Football to the World Cup.'
        },
        {
          property: 'og:description',
          content: 'Bringing Fantasy Football to the World Cup.'
        }
      ]
    }
  },
  {
    path: '/selections',
    name: 'Selections',
    component: () => {
      return import('../views/Selections.vue')
    },
    meta: {
      title: 'Selections - World Cup Bracket App',
      metaTags: [
        {
          name: 'description',
          content: 'Bringing Fantasy Football to the World Cup.'
        },
        {
          property: 'og:description',
          content: 'Bringing Fantasy Football to the World Cup.'
        }
      ]
    }
  },
  {
    path: '/groups',
    name: 'Groups',
    component: () => {
      return import('../views/Groups.vue')
    },
    meta: {
      title: 'Groups and Standings - World Cup Bracket App',
      metaTags: [
        {
          name: 'description',
          content: 'Bringing Fantasy Football to the World Cup.'
        },
        {
          property: 'og:description',
          content: 'Bringing Fantasy Football to the World Cup.'
        }
      ]
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
    },
    meta: {
      title: 'About - World Cup Bracket App',
      metaTags: [
        {
          name: 'description',
          content: 'Bringing Fantasy Football to the World Cup.'
        },
        {
          property: 'og:description',
          content: 'Bringing Fantasy Football to the World Cup.'
        }
      ]
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// --------------------------------
// Meta Data Swapping per Route
// --------------------------------
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
  // `/nested`'s will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if(nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else if(previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if(!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    // We use this to track which meta tags we create so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
  // Add the meta tags to the document head.
  .forEach(tag => document.head.appendChild(tag));

  next();
});

export default router
