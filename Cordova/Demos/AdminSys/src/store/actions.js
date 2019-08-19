// actions don't need to be synchronous
// you can use [methodname]:(param) => {body} or [methodname] (param) {body}
import {APP, USER} from './types.js'
import userApi from '@/api/user.js'
// import {removeToken} from '@/utils/cookies.js'
// import md5 from 'js-md5'

const actions = {
  [APP.SIDEBAR_STATUS] ({commit}) {
    commit(APP.SIDEBAR_STATUS)
  },
  [USER.SENDCODE] ({commit}, mobile) {
    return new Promise((resolve, reject) => {
      userApi.sendCode(mobile).then(response => {
        console.log('send code:', response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  [USER.FORGETPWD] ({commit}, payload) {
    return new Promise((resolve, reject) => {
      userApi.forgetPwd(payload.username, payload.mobile, payload.code).then(response => {
        console.log('forget pwd resp:', response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  [USER.LOGIN] ({commit}, payload) {
    return new Promise((resolve, reject) => {
      userApi.login(payload.username.trim(), payload.password).then(response => {
        const respData = response.data
        // 设置用户信息
        commit(USER.SET_USERINFO, respData.user)
        // 设置session
        commit(USER.SET_TOKEN, respData.session)
        // 初始化菜单
        commit(APP.INIT_MENU, respData.menuTree)

        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  [USER.REGISTER] ({commit}, playload) {
    return new Promise((resolve, reject) => {
      userApi.register(playload.username, playload.mobile, playload.code, playload.password).then((response) => {
        const respData = response.data
        // 设置用户信息
        commit(USER.SET_USERINFO, respData.user)
        // 设置session
        commit(USER.SET_TOKEN, respData.session)
        // 初始化菜单
        commit(APP.INIT_MENU, respData.menuTree)

        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default actions
