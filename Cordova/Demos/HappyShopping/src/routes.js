let routes = [
  {
    path: '/',
    redirect: '/login'
  }, {
    path: '/login',
    name: 'login',
    component: resolve => require(['@/views/Login'], resolve)
  }, {
    path: '/demodisplay',
    name: 'demodisplay',
    component: resolve => require(['@/views/DemoDisplay'], resolve)
  }, {
    path: '/orderquery',
    name: 'orderquery',
    component: resolve => require(['@/views/OrderQuery'], resolve)
  }, {
    path: '/balancequery',
    name: 'balancequery',
    component: resolve => require(['@/views/BalanceQuery'], resolve)
  }, {
    path: '/contactcustomerservice',
    name: 'contactcustomerservice',
    component: resolve => require(['@/views/ContactCustomerService'], resolve)
  }
]

export default routes
