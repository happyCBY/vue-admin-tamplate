import request from '@/utils/request'
import qs from 'qs'
export default {

  getRecommend(data) {
    return request({
      url: '/system/getRecommend',
      method: 'post',
      params: data
    })
  },
  // getRecommend(data) {
  //   return request.post('/system/getRecommend', qs.stringify(data), {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     }
  //   })
  // },
  getMeal(data) {
    return request({
      url: '/system/getMeal',
      method: 'post',
      params: data
    })
  },
  // getMeal(data) {
  //   return request.post('/system/getMeal', qs.stringify(data), {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     }
  //   })
  // },
  getPriceTask(data) {
    return request({
      url: '/system/getPriceTask',
      method: 'post',
      params: data
    })
  },
  // getPriceTask(data) {
  //   return request.post('/system/getPriceTask', qs.stringify(data), {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     }
  //   })
  // },
  getCoinConvert(data) {
    return request({
      url: '/system/getCoinConvert',
      method: 'post',
      params: data
    })
  },
  // getCoinConvert(data) {
  //   return request.post('/system/getCoinConvert', qs.stringify(data), {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     }
  //   })
  // },
  // 闪兑设置 增加/修改
  coinConvert(coinConvert) {
    return request({
      url: '/system/coinConvert',
      method: 'post',
      data: coinConvert
    })
  },
  // coinConvert(coinConvert) {
  //   return request.post('/system/coinConvert', JSON.stringify(coinConvert),
  //     {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     })
  // },
  // 后台用户设置--查询
  getSystemUser(data) {
    return request({
      url: '/system/getSystemUser',
      method: 'post',
      params: data
    })
  },
  // getSystemUser(data) {
  //   return request.post('system/getSystemUser', qs.stringify(data),
  //     {
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded'

  //       }
  //     })
  // },
  // 后台用户设置--增加修改
  systemUser(data) {
    return request({
      url: '/system/systemUser',
      method: 'post',
      params: data
    })
  },
  // systemUser(data) {
  //   return request.post('system/systemUser', qs.stringify(data),
  //     {
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded'
  //       }
  //     })
  // },
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
    return request({
      url: '/system/delSystemUser',
      method: 'post',
      params: data
    })
  },
  // delSystemUser(data) {
  //   return request.post('system/delSystemUser', qs.stringify(data),
  //     {
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded'

  //       }
  //     })
  // },
  // 获取当前app版本号(安卓/苹果)
  getVersion(data) {
    return request({
      url: '/system/getVersion',
      method: 'post',
      params: data
    })
  },
  // getVersion(data) {
  //   return request.post('/system/getVersion', qs.stringify(data),
  //     {
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded'
  //       }
  //     })
  // },
  // 设置当前app版本号(安卓/苹果)
  setVersion(data) {
    return request({
      url: '/system/revisionVersion',
      method: 'post',
      params: data
    })
  },
  // setVersion(data) {
  //   return request.post('/system/revisionVersion', qs.stringify(data),
  //     {
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded'
  //       }
  //     })
  // },
  // 获取权限列表
  // getPowerList(data) {
  //   return request('/system/getPorts', data)
  // },
  getPowerList(data) {
    return request({
      url: '/system/getPorts',
      method: 'post'
      // params: data
    })
  },
  // getPowerList(data) {
  //   return request.post('/system/getPorts', qs.stringify(data),
  //     {
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded'
  //       }
  //     })
  // },
  // 设置权限
  setPower(data) {
    return request.post('/system/upPort', qs.stringify(data),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
  },
  // 获取所有角色
  getRoles(data) {
    return request({
      url: '/system/getRoles',
      method: 'post'
      // params: data
    })
  },
  // getRoles(data) {
  //   return request.post('/system/getRoles', qs.stringify(data),
  //     {
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded'
  //       }
  //     })
  // },
  // 修改，新增角色
  upRoles(data) {
    console.log(data)
    return request.post('/system/upRoles', qs.stringify(data),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
  }
}
