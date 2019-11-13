import request from '@/utils/request'
import qs from 'qs'

export default {
  getUserList(data) {
    return request.post('/vip/toUserList', qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  referUser(data) {
    return request.post('/vip/referUser', qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }
}
