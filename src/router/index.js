import Vue from 'vue'
import VueRouter from 'vue-router'
import Registrar from '../views/Registrar.vue'
import Pedidos from '../views/Pedidos.vue'
import Inicio from '../views/Inicio.vue'
import AlterarPedido from '../views/AlterarPedido.vue'
import RecuperacaoSenha from '../views/RecuperacaoSenha'
import Login from '../views/Login'
import axios from 'axios'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Inicio,
    beforeEnter: Auth
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/pedidos',
    name: 'Pedidos',
    component: Pedidos,
    beforeEnter: Auth
  },
  {
    path: '/registrar',
    name: 'Registrar',
    component: Registrar,
    beforeEnter: Auth
  },
  {
    path: '/alterar-pedido',
    name: 'AlterarPedido',
    component: AlterarPedido,
    beforeEnter: Auth
  },
  {
    path: '/recuperacao-senha',
    name: 'RecuperacaoSenha',
    component: RecuperacaoSenha
  }
]
 

function Auth(to, from, next) {
    const url =  process.env.VUE_APP_API_URL;

    if(localStorage.getItem('token') !== undefined){
      
      var request = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      }  
      axios.post(`${url}/v1/validar`,{}, request).then(() => {
    
        next();
        
      }).catch(err => {
        console.log(err);
        next('/login');
        
      });

    }else{
      next('/login');
    }

}


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
