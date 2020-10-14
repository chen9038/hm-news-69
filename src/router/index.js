import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../pages/login.vue'
import Register from '../pages/register.vue'
import User from '../pages/User.vue'
import Edit from '../pages/Edit.vue'
import Myfollow from '../pages/Myfollow.vue'
import Mycomment from '../pages/Mycomment.vue'
import MyStar from '../pages/MyStar.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/Login' },
    { path: '/Login', component: Login, name: 'Login' },
    { path: '/Register', component: Register, name: 'Register' },
    { path: '/User', component: User, name: 'User' },
    { path: '/edit', component: Edit, name: 'edit' },
    { path: '/my-follow', component: Myfollow, name: 'my-follow' },
    { path: '/my-comment', component: Mycomment, name: 'my-comment' },
    { path: '/my-star', component: MyStar, name: 'my-star' },
  ],
})
//全局全置守卫

const authPath = ['/user', '/my-follow', '/my-comment', '/my-star', '/edit']
;('to.path')
router.beforeEach((to, from, next) => {
  if (authPath.includes(to.path)) {
    let token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
