import Vue from 'vue'
import VueRouter from 'vue-router'
import Registrar from '../views/Registrar.vue'
import Pedidos from '../views/Pedidos.vue'
import Inicio from '../views/Inicio.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Inicio
  },
  {
    path: '/pedidos',
    name: 'Pedidos',
    component: Pedidos
  },
  {
    path: '/registrar',
    name: 'Registrar',
    component: Registrar
  }
]
 

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
