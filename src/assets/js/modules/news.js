import request from '@/utils/request'
import qs from 'qs'

export default {
  // 公告查询
  getNewsList(data) {
    console.log(qs.stringify(data))
    return request.post('/news/getList', qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  // 修改公告
  updataNews(data) {
    return request.post('/news/upNews', qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  // 删除公告
  delNews(data) {
    return request.post('/news/delNews', qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },

  // 添加公告
  addNews(data) {
    return request.post('/news/addNews', qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

}
