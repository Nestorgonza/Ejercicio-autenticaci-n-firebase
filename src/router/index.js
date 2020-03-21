import Vue from 'vue'
import VueRouter from 'vue-router'

import {
  auth
} from '../main'

Vue.use(VueRouter)

const routes = [{
    path: '/registro',
    name: 'registro',
    component: () => import( /* webpackChunkName: "about" */ '../views/Registro.vue')
  },
  {
    path: '/',
    name: 'inicio',
    component: () => import( /* webpackChunkName: "about" */ '../views/Inicio.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/ingreso',
    name: 'ingreso',
    component: () => import( /* webpackChunkName: "about" */ '../views/Ingreso.vue')
  },
  {
    path: '/agregar',
    name: 'agregar',
    component: () => import( /* webpackChunkName: "about" */ '../views/Agregar.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/editar/:id',
    name: 'editar',
    component: () => import( /* webpackChunkName: "about" */ '../views/Editar.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const rutaProtegida = to.matched.some(record => record.meta.requiresAuth);
  const user = auth.currentUser;

  if (rutaProtegida === true && user === null) {
    next({
      name: 'ingreso'
    })
  } else {
    next()
  }

})

export default router;
