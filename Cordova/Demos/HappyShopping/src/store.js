import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userinfo: {},
    type: '',
    bottomhidden: false
  },
  mutations: {
    setUserinfo (state, _userinfo) {
      state.userinfo = _userinfo
    },
    setType (state, _type) {
      state.type = _type
    },
    setBottomHidden (state, _bottomhidden) {
      state.bottomhidden = _bottomhidden
    }
  }
})

export default store
