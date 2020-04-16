import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import("@/views/Home")
  },,
  {
    path: '/evento',
    name: 'Evento',
    component: () => import("@/views/Evento")
  },
  {
    path: '/responsavel',
    name: 'Responsavel',
    component: () => import("@/views/Responsavel")
  },
  {
    path: '/sala',
    name: 'Sala',
    component: () => import("@/views/Sala")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
