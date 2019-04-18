import '@babel/polyfill'
import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import App from '@/App'

Vue.config.productionTip = false

Vue.use(ElementUI, {locale})

router.beforeEach((to, from, next) => {
  let notLogin = JSON.stringify(store.state.user) === '{}'
  if (to.path === '/login') {
    if (notLogin) {
      next()
    } else {
      next({name: 'coupon'})
    }
  } else {
    if (notLogin) {
      next({name: 'login'})
    } else {
      next()
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router: router,
  render: h => h(App)
})
