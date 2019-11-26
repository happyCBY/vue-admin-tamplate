import request from '@/utils/request'

export default {
  getUserList(data) {
    return request({
      url: '/vip/toUserList',
      method: 'post',
      params: data
    })
  },
  // getUserList(data) {
  //   return request.post('/vip/toUserList', qs.stringify(data), {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     }
  //   })
  // },
  referUser(data) {
    return request({
      url: '/vip/referUser',
      method: 'post',
      params: data
    })
  },
  // referUser(data) {
  //   return request.post('/vip/referUser', qs.stringify(data), {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     }
  //   })
  // },
  upTuUser(tuUser) {
    return request({
      url: '/vip/upTuUser',
      method: 'post',
      data: tuUser
    })
  }
  // upTuUser(tuUser) {
  //   return request.post('/vip/upTuUser', JSON.stringify(tuUser), {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  // }
}
