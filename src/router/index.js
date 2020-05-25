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
    path:'/',
    redirect:'/home'
  },
  {
    path: '/',
    component: Main,
    children: [
      { path: '/home', name: 'FridgeInfo', component: FridgeInfo ,meta:{title:'冰箱笔记'}},
      { path: '/personal', name: 'Personal', component: Personal ,meta:{title:'个人'}},
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { isPublic: true ,title:'登录'}
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { isPublic: true ,title:'注册'}
  }
]

const router = new VueRouter({
  routes,
  linkActiveClass:"",
  linkExactActiveClass:""
})

router.beforeEach((to, from, next) => {
  document.title=to.meta.title
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})

export default router
