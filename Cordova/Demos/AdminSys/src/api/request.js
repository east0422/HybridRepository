import axios from 'axios'
// import {Message} from 'element-ui'
// import store from '@/store/index.js'
// import router from '@/router/index.js'
// import {removeToken} from '@/utils/cookies.js'
// import {USER} from '@/store/types.js'

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 15000,
  headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  // withCredentials: true
})

// // request拦截器
// service.interceptors.request.use(config => {
//   if (store.getters.token) {
//     config.data = {
//       ...config.data,
//       session: store.getters.token
//     }
//   }
//   return config
// }, error => {
//   Message({
//     message: error.message,
//     type: 'warning',
//     duration: 5 * 1000
//   })
//   return Promise.reject(error)
// })

// // respone拦截器
// service.interceptors.response.use(resp => {
//   let code = (+resp.data.code)
//   if (code === 303) { // 用户未登录
//     store.commit(USER.SET_TOKEN, '')
//     removeToken()
//     router.replace({path: '/login'})
//   } else if (code !== 100) {
//     Message({
//       message: resp.data.message,
//       type: 'warning',
//       duration: 5 * 1000
//     })
//   }
//   return resp
// }, error => {
//   console.log('error:', error)
//   Message({
//     message: error.message,
//     type: 'warning',
//     duration: 5 * 1000
//   })
//   return Promise.reject(error)
// })

export default service
