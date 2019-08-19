import Vue from 'vue'
import Login from '@/views/login/Login'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'
Vue.use(ElementUI, {locale})

describe('Login.vue', () => {
  let vm
  let loginForm

  beforeEach(() => {
    const Constructor = Vue.extend(Login)
    vm = new Constructor().$mount()
    loginForm = vm.loginForm
  })
  afterEach(() => {
    vm.loginForm = loginForm
  })

  describe('#handleLogin', () => {
    it('should return false if valid fail', () => {
      vm.loginForm = {
        username: null,
        password: null,
        type: 1
      }
      vm.handleLogin()
      // expect(vm.$store.dispatch).to.have.not.been.called()
    })
  })
})
