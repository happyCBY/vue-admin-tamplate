import request from '@/utils/request'

export function getToken() {
  return request({
    url: '/mock/qiniu/upload/token', // 假地址 自行替换
    method: 'get'
  })
}
