import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userinfo: {},
    type: ''
  },
  mutations: {
    setUserinfo (state, _userinfo) {
      state.userinfo = _userinfo
    },
    setType (state, _type) {
      state.type = _type
    }
  }
})

export default store
