import Vue from 'vue'
import VueRouter from 'vue-router'
import FridgeInfo from '../views/FridgeInfo.vue'
import Personal from '../views/Personal.vue'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import Register from '../views/Register.vue';
Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      component: Main,
      children:[
        {path:'/',name:'FridgeInfo',component:FridgeInfo},
        {path:'/personal',name:'Personal',component:Personal},
      ]
    },
  {
    path: '/login',
    name: 'Login',
    component:Login
  },
  {
    path: '/register',
    name: 'Register',
    component:Register
  }
]

const router = new VueRouter({
  routes
})

export default router
