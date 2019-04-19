import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let routes = [
  {
    path: '/',
    redirect: '/login'
  }, {
    path: '/login',
    name: 'login',
    component: resolve => require(['@/views/Login'], resolve)
  }, {
    path: '/search',
    name: 'search',
    component: resolve => require(['@/views/Search'], resolve)
  }, {
    path: '/coupon',
    name: 'coupon',
    component: resolve => require(['@/views/Coupon'], resolve)
  }, {
    path: '/mine',
    name: 'mine',
    component: resolve => require(['@/views/Mine'], resolve)
  }, {
    path: '/minedetail/:msg?',
    name: 'minedetail',
    props: true,
    component: resolve => require(['@/views/MineDetail'], resolve)
  }, {
    path: 'customerservice',
    name: 'customerservice',
    component: resolve => require(['@/views/CustomerService'], resolve)
  }, {
    path: 'guide/:guidename?',
    name: 'guide',
    props: true,
    component: resolve => require(['@/views/Guide'], resolve)
  }
]

export default new VueRouter({routes: routes})
