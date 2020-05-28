import Vue from 'vue'
import App from './App.vue'
import router from './router'
import http from './http'
import store from './store'

import './assets/scss/style.scss'
import FastClick from 'fastclick'
import { Notify } from 'vant';

Vue.use(Notify);
Vue.config.productionTip = false
Vue.prototype.$http=http
Vue.prototype.$Notify=Notify
//解决移动端300ms 延迟
FastClick.attach(document.body)

Vue.mixin({
  computed: {
    mixinUploadUrl(){
      return this.$http.defaults.baseURL +'/upload'
    }
  },
  methods: {
    mixinGetAuthHeaders(){
      return{
        Authorization:`Bearer ${localStorage.token || ''}`
      }
    }
  },
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
