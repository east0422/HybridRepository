let routes = [
  {
    path: '/',
    redirect: '/login'
  }, {
    path: '/login',
    name: 'login',
    component: resolve => require(['@/views/Login'], resolve)
  }, {
    path: '/register',
    name: 'register',
    component: resolve => require(['@/views/Register'], resolve)
  }, {
    path: '/demodisplay',
    name: 'demodisplay',
    component: resolve => require(['@/views/DemoDisplay'], resolve)
  }, {
    path: '/query/:querytype?/:querynow?',
    name: 'query',
    component: resolve => require(['@/views/Query'], resolve)
  }, {
    path: '/contactcustomerservice',
    name: 'contactcustomerservice',
    component: resolve => require(['@/views/ContactCustomerService'], resolve)
  }, {
    path: '/fanliquery/:result?',
    name: 'fanliquery',
    component: resolve => require(['@/views/FanliQuery'], resolve)
  }

]

export default routes
