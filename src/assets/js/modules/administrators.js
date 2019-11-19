import request from '@/utils/request'
import qs from 'qs'
export default {
  // 新增矿机
  addNewItc(data) {
    return request.post('/admin/addMining', qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  // 复投矿机
  repeatItc(data) {
    return request.post('/admin/upgradeMining', qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  // 增加资金
  addMoney(data) {
    return request.post('/admin/addUsdt', qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  // 操作记录
  getAdminRecordList(data) {
    return request.post('/admin/getAdminRecordList', qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }
}

