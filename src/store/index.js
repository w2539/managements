import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '../utils/storage.js'

Vue.use(Vuex)
const USER_KEY = 'userInfo'

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY)
  },
  mutations: {
    setUser (state, data) {
      state.user = data

      setItem(USER_KEY, state.user)
      // window.localStorage.setItem('TOUTIAO_USER', JSON.stringify(state.user))
    },
    setUserPhoto (state, data) {
      state.user.photo = data
    }
  },
  actions: {},
  modules: {}
})
