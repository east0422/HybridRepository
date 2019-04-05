let routes = [
  {
    path: '/',
    redirect: '/login'
  }, {
    path: '/login',
    name: 'login',
    component: resolve => require(['@/views/Login'], resolve)
  }, {
    path: '/main',
    name: 'main',
    component: resolve => require(['@/views/Main'], resolve)
  }
]

export default routes
