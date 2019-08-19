import Vue from 'vue'
import Error404 from '@/views/errors/404'

describe('404.vue', () => {
  it('should render correct content', () => {
    const Constructor = Vue.extend(Error404)
    const vm = new Constructor().$mount()
    expect(vm.message).to.equal('恭喜你发现了新大陆......')
    expect(vm.$el.querySelector('.error404-tips-return-home').textContent).to.equal('返回首页')
  })
})
