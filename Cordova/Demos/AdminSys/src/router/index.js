import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let baseRoutes = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: resolve => require(['@/views/Login'], resolve)
  }, {
    path: '/reg',
    name: 'reg',
    hidden: true,
    component: resolve => require(['@/views/Register'], resolve)
  }, {
    path: '/forgetpwd',
    name: 'forgetpwd',
    hidden: true,
    component: resolve => require(['@/views/ForgetPwd'], resolve)
  }, {
    path: '/404',
    name: '404',
    hidden: true,
    component: resolve => require(['@/views/Error404'], resolve),
    meta: {title: '404'}
  }
]

export default new VueRouter({routes: baseRoutes})
