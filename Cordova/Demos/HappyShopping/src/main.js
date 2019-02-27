import '@babel/polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/routes'
import store from '@/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import App from '@/App'
import axios from 'axios'

import '@/scss/common.scss'

Vue.config.productionTip = false

Vue.use(ElementUI, {locale})
Vue.use(VueRouter)

axios.defaults.baseURL = 'http://php.9gola.cn/yunling/index.php'
axios.defaults.timeout = 15000
Vue.prototype.$axios = axios

let router = new VueRouter({routes: routes})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router: router,
  render: h => h(App)
})
