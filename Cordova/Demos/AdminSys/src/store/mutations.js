// mutations have to be synchronous
import {APP, USER} from './types.js'
import {setSidebarStatus, setToken, setMenuData, setUserInfo} from '@/utils/cookies.js'

const mutations = {
  [APP.SIDEBAR_STATUS] (state) {
    if (state.sidebarOpened) {
      setSidebarStatus(1)
    } else {
      setSidebarStatus(0)
    }
    state.sidebarOpened = !state.sidebarOpened
  },
  [APP.INIT_MENU] (state, menuData) {
    state.menuData = menuData
    setMenuData(menuData)
  },
  [USER.SET_TOKEN] (state, token) {
    state.token = token
    setToken(token)
  },
  [USER.SET_USERINFO] (state, userInfo) {
    state.userInfo = userInfo
    setUserInfo(userInfo)
  }
}

export default mutations
