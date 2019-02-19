import axios from 'axios'
import {Message} from 'element-ui'

const service = axios.create({
  baseURL: process.env.API_SERVER,
  timeout: 15000
})

// request拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  Message({
    message: error.message,
    type: 'warning',
    duration: 5 * 1000
  })
  return Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(resp => {
  return resp
}, error => {
  Message({
    message: error.message,
    type: 'warning',
    duration: 5 * 1000
  })
  return Promise.reject(error)
})

export default service
