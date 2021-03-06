import Vue from 'vue'
import Home from '@/views/Home'

describe('Home.vue', () => {
  it('should render correct Home', () => {
    const Constructor = Vue.extend(Home)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.home-content-item').textContent).to.equal('日历')
  })
})
