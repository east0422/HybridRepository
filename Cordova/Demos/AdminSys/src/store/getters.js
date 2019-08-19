import {generateAllowMenus} from '@/utils/permission.js'

const getters = {
  // app
  sidebarOpened: state => state.sidebarOpened,
  menuData: state => state.menuData,
  // user
  userInfo: state => state.userInfo,
  token: state => state.token,
  allowMenus: (state) => generateAllowMenus(state.menuData)
}
export default getters
