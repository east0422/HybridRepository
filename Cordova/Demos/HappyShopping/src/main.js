import '@babel/polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/routes'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import App from '@/App'

import '@/scss/common.scss'

Vue.config.productionTip = false

Vue.use(ElementUI, {locale})
Vue.use(VueRouter)

let router = new VueRouter({routes: routes})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  render: h => h(App)
})
