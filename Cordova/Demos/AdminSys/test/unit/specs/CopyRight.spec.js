import Vue from 'vue'
import CopyRight from '@/components/CopyRight'

describe('CopyRight.vue', () => {
  it('should render correct copyright', () => {
    const Constructor = Vue.extend(CopyRight)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).to.equal('copyright ©2019')
  })
})
