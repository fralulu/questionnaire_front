/**
 * author; bwzou
 * time: 2018-05-17
 */
import Vue from 'vue'
import axios from 'axios'

/* 修改原型链 */
Vue.prototype.$http = axios.create({
  timeout: 5000,
  withCredentials: true // 允许携带cookie
})

function fetchPost(url, data) {
  return new Promise((resolve, reject) => {
    Vue.prototype.$http({
      method: 'post',
      url: url,
      data: data
    }).then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
}

function fetchGet(url, params) {
  return new Promise((resolve, reject) => {
    Vue.prototype.$http({
      method: 'get',
      url: url,
      params: params
    }).then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
}

export default {
  fetchPost,
  fetchGet
}
