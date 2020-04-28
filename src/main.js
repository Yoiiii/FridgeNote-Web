import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

import './assets/scss/style.scss'

Vue.config.productionTip = false

Vue.prototype.$http=axios.create({
  //baseURL:process.env.VUE_APP_API_URL || '/web/api',//生产环境用
  baseURL: 'http://localhost:3000/fridge/api',//开发环境用
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
