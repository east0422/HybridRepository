import request from './request'
import qs from 'qs'

const userApi = {
  sendCode (mobile) { // 发送短信请求
    return request({
      method: 'post',
      data: qs.stringify({
        'type': 'send', // 类型
        'mobile': mobile // 手机号
      })
    })
  },
  register (username, mobile, code, password) { // 用户注册
    return request({
      method: 'post',
      data: qs.stringify({
        'type': 'reg', // 类型
        'qq': username, // 用户名
        'mobile': mobile, // 手机号
        'code': code, // 验证码
        'pwd': password // 密码
      })
    })
  },
  login (username, password) { // 用户登录
    return request({
      method: 'post',
      data: qs.stringify({
        'type': 'login', // 类型
        'qq': username, // 用户名
        'pwd': password // 登录密码
      })
    })
  },
  forgetPwd (username, mobile, code) { // 忘记密码
    return request({
      method: 'post',
      data: qs.stringify({
        'type': 'forget', // 类型
        'qq': username, // 用户名
        'mobile': mobile, // 绑定手机号
        'code': code // 验证码
      })
    })
  }
}

export default userApi
