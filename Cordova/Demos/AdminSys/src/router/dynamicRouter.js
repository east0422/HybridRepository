const allRoutes = [
  {
    path: '/',
    redirect: '/home',
    component: resolve => require(['@/views/Main'], resolve),
    meta: {title: '权限树', icon: 'el-icon-view'},
    children: [
      {
        path: '/home',
        name: 'home',
        component: resolve => require(['@/views/Home'], resolve),
        meta: {title: '首页', icon: 'el-icon-view'}
      }, {
        path: '/message',
        name: 'message',
        component: resolve => require(['@/views/Message'], resolve),
        meta: {title: '消息', icon: 'el-icon-message'}
      }, {
        path: '/notify',
        name: 'notify',
        component: resolve => require(['@/views/Notify'], resolve),
        meta: {title: '通知', icon: 'el-icon-location'}
      }
    ]
  }, { // 未匹配的路径
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

// 根据允许访问的权限获取动态路由，若子路由有权限，则父路由也有
function generateAllowRoutes (routes, permissions) {
  let allowRoutes = []
  for (let route of routes) {
    if (route.children && route.children.length > 0) {
      let childrenAllowRoutes = generateAllowRoutes(route.children, permissions)
      if (childrenAllowRoutes.length > 0) {
        route.children = childrenAllowRoutes
        allowRoutes.push(route)
      } else {
        route.children = []
        if (route.hidden || permissions.includes(route.name)) {
          allowRoutes.push(route)
        }
      }
    } else {
      if (route.hidden || permissions.includes(route.name)) {
        allowRoutes.push(route)
      }
    }
  }
  return allowRoutes
}

export default {
  allRoutes: allRoutes,
  generateAllowRoutes: generateAllowRoutes
}
