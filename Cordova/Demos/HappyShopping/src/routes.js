let routes = [
  {
    path: '/',
    redirect: '/login'
  }, {
    path: '/login',
    name: 'login',
    component: resolve => require(['@/views/Login'], resolve),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/register',
    name: 'register',
    component: resolve => require(['@/views/Register'], resolve),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/demodisplay',
    name: 'demodisplay',
    component: resolve => require(['@/views/DemoDisplay'], resolve),
    meta: {
      keepAlive: false
    }
  }, {
    path: '/query/:querytype?/:querynow?',
    name: 'query',
    component: resolve => require(['@/views/Query'], resolve),
    meta: {
      keepAlive: false
    }
  }, {
    path: '/contactcustomerservice',
    name: 'contactcustomerservice',
    component: resolve => require(['@/views/ContactCustomerService'], resolve),
    meta: {
      keepAlive: true
    }
  }, {
    path: '/fanliquery/:result?',
    name: 'fanliquery',
    component: resolve => require(['@/views/FanliQuery'], resolve),
    meta: {
      keepAlive: false
    }
  }, {
    path: '/binddemo',
    name: 'binddemo',
    component: resolve => require(['@/views/BindDemo'], resolve),
    meta: {
      keepAlive: false
    }
  }

]

export default routes
