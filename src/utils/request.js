import axios from 'axios'
// import store from '@/store'
import { Message } from 'element-ui'
import { getToken, removeToken } from '@/utils/auth'
// create an axios instance
const service = axios.create({
  baseURL: '',
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    config.headers['myToken'] = getToken()
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(

  response => {
    const res = response.data

    return res
  },
  error => {
    console.log(error.response.data)

    if (error.response && error.response.data && error.response.data.message) {
      if (error.response.data.message === '100001') {
        Message({
          message: '用户未登录',
          type: 'error'
        })
        removeToken()
        window.location.href = '/#/login'
      } else if (error.response.data.message === '100005') {
        Message({
          message: '登录信息过期',
          type: 'error'
        })
        removeToken()
        window.location.href = '/#/login'
      } else if (error.response.data.message === '100006') {
        Message({
          message: '登录信息失效或在其他地方登录',
          type: 'error'
        })
        removeToken()
        window.location.href = '/#/login'
      } else if (error.response.data.message === '100007') {
        Message({
          message: '非法登陆',
          type: 'error'
        })
        removeToken()
        window.location.href = '/#/login'
      }
      return
    }
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
