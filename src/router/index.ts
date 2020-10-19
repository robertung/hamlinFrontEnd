import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import store from '../store';

Vue.use(VueRouter);
const pageTitle = 'Hamlin Halloween';
const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: document.title = `${pageTitle} : Login`,
      requiresVisitor: true,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: {
      title: document.title = `${pageTitle} : Register`,
      requiresVisitor: true,
    },
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: document.title = `${pageTitle} : Home : Pumpkin Contest`,
    },
  },
  {
    path: '/sponsors',
    name: 'Sponsors',
    component: () => import('../views/Sponsers.vue'),
    meta: {
      title: document.title = `${pageTitle} : Sponsors`,
    },
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue'),
    meta: {
      title: document.title = `${pageTitle} : Contact`,
    },
  },
  {
    path: '/vote',
    name: 'Vote',
    component: () => import('../views/Vote.vue'),
    meta: {
      title: document.title = `${pageTitle} : Vote`,
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      title: document.title = `${pageTitle} : Profile : Upload Pumpkins`,
      requiresAuth: true,
    },
  },
  {
    path: '/vote/:id',
    name: 'VoterById',
    component: () => import('../views/VoteById.vue'),
    meta: {
      title: `${pageTitle} : Vote for`,
    },
  }
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: 'Login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      next({
        name: 'Profile',
      })
    } else {
      next()
    }
  } else {
    next()
  }
});

export default router;
