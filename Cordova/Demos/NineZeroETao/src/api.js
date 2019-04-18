import axios from 'axios'
import md5 from 'js-md5'
import qs from 'qs'
import {getUser} from '@/store'

const signKey = 'xxs'
const request = axios.create({
  baseURL: process.env.BASE_API,
  method: 'post',
  headers: {'content-type': 'application/json'},
  timeout: 15000
})

const api = {
  login (account) { // 登录
    return request({
      url: '',
      data: {
        type: 'login',
        user: account,
        sign: md5(signKey + account + signKey)
      }
    })
  },
  register (regaccount, inviteaccount) { // 注册
    return request({
      url: '',
      data: {
        type: 'reg',
        user: regaccount,
        inviter: inviteaccount,
        sign: md5(signKey + regaccount + signKey)
      }
    })
  },
  searchMsg (msg) { // 查询msg
    let user = getUser()
    return request({
      url: '',
      data: {
        type: 'query',
        msg: window.encodeURI(msg),
        user: user.user,
        inviter: user.inviter,
        url: user.url,
        sign: md5(signKey + user.user + signKey)
      }
    })
  },
  couponList (key, page, cid) { // 查询优惠券
    return request({
      url: 'http://quan.9gola.cn/api/taobao.ashx',
      method: 'post',
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      data: qs.stringify({
        method: 'getQuan',
        key: key,
        page: page,
        cid: cid
      })
    })
  }
}

export default api
