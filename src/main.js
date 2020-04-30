import Vue from 'vue'
import App from './App.vue'
import router from './router'
import http from './http'

import './assets/scss/style.scss'

import { Notify } from 'vant';

Vue.use(Notify);
Vue.config.productionTip = false
Vue.prototype.$http=http
Vue.prototype.$Notify=Notify

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
  render: h => h(App)
}).$mount('#app')
