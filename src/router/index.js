import Vue from 'vue'
import VueRouter from 'vue-router'
import FridgeInfo from '../views/FridgeInfo.vue'
import GoodsList from '../views/GoodsList.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'FridgeInfo',
    component: FridgeInfo
  },
  {
    path: '/goodslist',
    name: 'GoodsList',
    component:GoodsList
  }
]

const router = new VueRouter({
  routes
})

export default router
