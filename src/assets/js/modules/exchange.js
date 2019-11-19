import request from '@/utils/request'
import qs from 'qs'
export default {
  getTransactionFlow(data) {
    return request.post('/exchange/toExchangeList', qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  getFlashExchange(data) {
    return request.post('/exchange/toExchangeOrderList', qs.stringify(data))
  }
}
