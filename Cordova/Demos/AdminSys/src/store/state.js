import {getToken, getSidebarStatus, getMenuData, getUserInfo} from '@/utils/cookies.js'

const state = {
  sidebarOpened: (!+getSidebarStatus()), // 侧边栏是否展开,
  menuData: getMenuData(), // 用户菜单(树形结构)
  userInfo: getUserInfo(), // 用户信息
  token: getToken()
}

export default state
