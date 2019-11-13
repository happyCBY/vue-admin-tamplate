import request from '@/utils/request'

export function searchUser(name) {
  return request({
    url: '/mock/search/user',
    method: 'get',
    params: { name }
  })
}

export function transactionList(query) {
  return request({
    url: '/mock/transaction/list',
    method: 'get',
    params: query
  })
}
