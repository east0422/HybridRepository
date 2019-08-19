import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const SidebarStatusKey = 'Sidebar-Status'
const UserInfoKey = 'UserInfo'

function setCookie (key, value) {
  let twoHours = 1 / 12
  return Cookies.set(key, value, {
    expires: twoHours
  })
}

// token
export function getToken () {
  let token = Cookies.get(TokenKey)
  if (token && token !== 'undefined') {
    return token
  }
  return null
}

export function setToken (token) {
  return setCookie(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

// sidebarStatus
export function getSidebarStatus () {
  return Cookies.get(SidebarStatusKey)
}

export function setSidebarStatus (sidebarStatus) {
  return setCookie(SidebarStatusKey, sidebarStatus)
}

export function removeSidebarStatus () {
  return Cookies.remove(SidebarStatusKey)
}

// userinfo
export function getUserInfo () {
  let userinfo = Cookies.getJSON(UserInfoKey)
  if (userinfo) {
    return userinfo
  }
  return {}
}

export function setUserInfo (userinfo) {
  return setCookie(UserInfoKey, userinfo)
}

export function removeUserInfo () {
  return window.localStorage.removeItem(UserInfoKey)
}

// localstorage too big
const MenuDataKey = 'MenuData'
// menuData
export function getMenuData () {
  let menuData = window.localStorage.getItem(MenuDataKey)
  if (menuData) {
    // return JSON.parse(menuData)
    return menuData
  }
  return []
}

export function setMenuData (menuData) {
  return window.localStorage.setItem(MenuDataKey, menuData)
  // return window.localStorage.setItem(MenuDataKey, JSON.stringify(menuData))
}

export function removeMenuData () {
  return window.localStorage.removeItem(MenuDataKey)
}
