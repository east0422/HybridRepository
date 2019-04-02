import Vue from 'vue'
import Vuex from 'vuex'
import {getUserInfo, setUserInfo} from '@/storages.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userinfo: getUserInfo(),
    bottomhidden: false
  },
  mutations: {
    setUserinfo (state, _userinfo) {
      state.userinfo = _userinfo
      setUserInfo(_userinfo)
    },
    setBottomHidden (state, _bottomhidden) {
      state.bottomhidden = _bottomhidden
    }
  }
})

export default store
