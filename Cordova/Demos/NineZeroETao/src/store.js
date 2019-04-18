import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const UserKey = 'NineZeroETao-User'
const storage = window.localStorage

export function getUser () {
  let user = storage.getItem(UserKey)
  if (user) {
    return JSON.parse(user)
  }
  return {}
}

const store = new Vuex.Store({
  state: {
    user: getUser()
  },
  mutations: {
    setUser (state, _user) {
      state.user = _user
      storage.setItem(UserKey, JSON.stringify(_user))
    }
  }
})

export default store
