// 递归所有menuData中对应的url放到menus中生成允许访问的路由权限菜单数组
function getAllowMenus (menuData) {
  let menus = []
  for (let menu of menuData) {
    menus.push(menu.url)
    if (menu.children && menu.children.length > 0) {
      menus = menus.concat(getAllowMenus(menu.children))
    }
  }
  return menus
}
// 生成允许访问的路由权限菜单数组
export function generateAllowMenus (menuData) {
  let menus = []
  // TODO: 后期会依据api对此进行修改，目前api返回非数组而是{}
  if (menuData && menuData.url) {
    menus.push(menuData.url)
  }
  if (menuData && menuData.children) {
    menus = menus.concat(getAllowMenus(menuData.children))
  }
  return menus
}
