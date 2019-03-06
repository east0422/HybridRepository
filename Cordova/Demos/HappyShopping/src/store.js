import Vue from 'vue'
import Vuex from 'vuex'
import {getUserInfo, setUserInfo} from '@/storages.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userinfo: getUserInfo(),
    type: '',
    bottomhidden: false
  },
  mutations: {
    setUserinfo (state, _userinfo) {
      state.userinfo = _userinfo
      setUserInfo(_userinfo)
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
