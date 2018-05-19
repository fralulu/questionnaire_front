/**
 * author: bwzou
 * time: 2018-05-15
 */
import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user
  }
})
