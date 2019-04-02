import Vue from 'vue'
import Login from '@/views/Login'

describe('Login.vue', () => {
  it('should render correct text', () => {
    const Constructor = Vue.extend(Login)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.login-btn').textContent).to.equal('登录')
  })
})
