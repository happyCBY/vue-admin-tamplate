import Layout from '@/layout'
const newsRouter = [{
  path: '/exchange',
  name: 'exchange',
  component: Layout,
  meta: { title: '交易管理', icon: 'icon' },
  children: [
    {
      path: 'journal',
      component: () => import('@/views/exchange/journal'),
      name: 'journal',
      meta: { title: '交易流水', icon: 'icon', noCache: true }
    },
    {
      path: 'order',
      component: () => import('@/views/exchange/order'),
      name: 'order',
      meta: { title: '闪兑订单', icon: 'icon', noCache: true }
    }
  ]
}]
export default newsRouter
