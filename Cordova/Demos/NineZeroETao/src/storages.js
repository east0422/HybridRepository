const UserInfoKey = 'NineZeroETao-UserInfo'

// userinfo
export function getUserInfo () {
  let userinfo = window.localStorage.getItem(UserInfoKey)
  if (userinfo) {
    return JSON.parse(userinfo)
  }
  return {}
}

export function setUserInfo (userinfo) {
  return window.localStorage.setItem(UserInfoKey, JSON.stringify(userinfo))
}
