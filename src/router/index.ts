import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { auth } from '@/utils/configs/init'
import SigninView from '../views/SigninView.vue'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import NotFoundView from '../views/404View.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: SigninView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  auth.onAuthStateChanged(function (user) {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
    //las rutas que requieren autenticacion y el usuario no esta logueado
    if (requiresAuth && !user) next('login')
    //si hay usuario y la ruta requiere autenticacion
    else if (requiresAuth && user) next()
    //si hay usuario, omitit las rutas que no requieren autenticacion
    else if (!requiresAuth && user) next('/')
    //si no hay usuario, omitir las rutas que requieren autenticacion
    else next()
  })
})

export default router
