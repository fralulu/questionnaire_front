/**
 * author: bwzou
 * time: 2018-05-16
 */

const state = {
  userInfo: {},
  token: null
}

const getters = {
  getUserInfo: state => state.userInfo,
  getToken: state => state.token
}

const mutations = {
  // 更新用户信息
  setUserInfo(state, newUserInfo) {
    state.userInfo = newUserInfo
  },

  // 更新token
  setToken(state, newToken) {
    state.token = newToken
  }
}

const actions = {
  updateUserInfo({commit}, params) {
    // fetch.fetchGet('/user/getUser').then(result => {
    //   if (result.success) {
    //     commit("setUserInfo", result.data);
    //   } else {
    //     console.log('updateUserInfo', result);
    //   }
    // }).catch(function (result) {
    //   console.log('updateUserInfo', result);
    // })
  },

  updateToken({commit}, params) {
    commit("setToken", params.token)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
