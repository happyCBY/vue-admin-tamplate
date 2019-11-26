
import request from '@/utils/request'
import qs from 'qs'
export default {
  login(data) {
    return request({
      url: '/login',
      method: 'post',
      params: data
    })
  },
  // login(data) {
  //   return request.post('/login', qs.stringify(data), {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     }
  //   })
  // },
  loginOut(data) {
    return request.post('/loginOut', qs.stringify(data))
  }
}
