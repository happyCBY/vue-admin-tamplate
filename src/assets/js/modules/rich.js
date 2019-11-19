
import request from '@/utils/request'
import qs from 'qs'
export default {
  // 提现审核
  getTakeOutReport(data) {
    return request.post('/report/getTakeOutReport', qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  // 提现审核-审核
  walletTransferToByOut(data) {
    return request.post('/report/walletTransferToByOut', qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },

  // 会员钱包
  getAccount(data) {
    return request.post('/report/getAccount', qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  // 区块同步转入
  getTransaction(data) {
    return request.post('/report/getTransaction', qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  // 区块同步转出
  getTransactionOut(data) {
    return request.post('/report/getTransactionOut', qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  // 区块转出-数据列表
  transactionOut(data) {
    return request.post('/report/method', qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  // 区块转出-转出ETH
  systemTurnAway(data) {
    return request.post('/report/systemTurnAway', qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  // 区块转出-转出MUSK
  systemTurnAwayByDB(data) {
    return request.post('/report/systemTurnAwayByDB', qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  // 矿机订单
  getFinance(data) {
    return request.post('/finance/getFinance', qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  // 矿机套餐数据
  getMealConfigure(data) {
    return request.post('/finance/getMealConfigure', qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  // 奖励汇总
  getDrillReport(data) {
    return request.post('/report/getDrillReport', qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }
}
