import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SocketView from '@/components/SocketView'
import SocketMaster from '@/components/SocketMaster'
import SocketSlave from '@/components/SocketSlave'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/',
      name: 'socketview',
      component: SocketView
    }, {
      path: '/socketmaster',
      name: 'socketmaster',
      component: SocketMaster
    }, {
      path: '/socketslave',
      name: 'socketslave',
      component: SocketSlave
    }
  ]
})
