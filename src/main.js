import Vue from 'vue'
import App from './App.vue'
import router from './router'
import JwPagination from 'jw-vue-pagination'

Vue.component('jw-pagination', JwPagination)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

