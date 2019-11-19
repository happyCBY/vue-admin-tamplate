import request from '@/utils/request'
import qs from 'qs'
export default {

  getRecommend(data) {
    return request.post('/system/getRecommend', qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  getMeal(data) {
    return request.post('/system/getMeal', qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  getPriceTask(data) {
    return request.post('/system/getPriceTask', qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  getCoinConvert(data) {
    return request.post('/system/getCoinConvert', qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  // 闪兑设置 增加/修改
  coinConvert(coinConvert) {
    return request.post('/system/coinConvert', JSON.stringify(coinConvert),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
  },
  // 后台用户设置--查询
  getSystemUser(data) {
    return request.post('system/getSystemUser', qs.stringify(data),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'

        }
      })
  },
  // 后台用户设置--增加修改
  systemUser(data) {
    return request.post('system/systemUser', qs.stringify(data),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
  },
  // systemUser(bsUser) {
  //   return request.post('system/systemUser', JSON.stringify(bsUser),
  //     {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     })
  // },
  // 后台用户设置——删除
  delSystemUser(data) {
    return request.post('system/delSystemUser', qs.stringify(data),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'

        }
      })
  }
}
