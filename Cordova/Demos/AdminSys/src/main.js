import '@babel/polyfill'
import Vue from 'vue'
import App from '@/App'
import router from '@/router/index.js'
import store from '@/store/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import '@/scss/common.scss'

Vue.config.productionTip = false

Vue.use(ElementUI, {locale})

// 添加路由守卫
const whiteList = ['/login', '/reg', '/forgetpwd'] // 不需要登录的白名单路径
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (store.getters.token) { // 已登录
    if (to.path === '/login') {
      next({path: '/'})
    } else {
      next()
    }
  } else { // 未登录
    if (whiteList.includes(to.path)) { // 当前路径不需要登录直接跳转
      next()
    } else { // 需要先登录, 重定向到登录页面
      next({path: '/login'})
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
