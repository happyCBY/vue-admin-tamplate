import Layout from '@/layout'
const newsRouter = [{
  path: '/rich',
  name: 'rich',
  component: Layout,
  meta: { title: '财富中心', icon: 'icon' },
  children: [
    {
      path: 'take-out-report',
      component: () => import('@/views/rich/take-out-report'),
      name: 'take-out-report',
      meta: { title: '提现审核', icon: 'icon', noCache: true }
    },
    {
      path: 'account',
      component: () => import('@/views/rich/account'),
      name: 'account',
      meta: { title: '会员钱包', icon: 'icon', noCache: true }
    },
    {
      path: 'block',
      component: () => import('@/views/rich/block'),
      name: 'block',
      meta: { title: '区块转出', icon: 'icon', noCache: true }
    },
    {
      path: 'transaction',
      component: () => import('@/views/rich/transaction'),
      name: 'transaction',
      meta: { title: '区块同步转入', icon: 'icon', noCache: true }
    },
    {
      path: 'transaction-out',
      component: () => import('@/views/rich/transaction-out'),
      name: 'transaction-out',
      meta: { title: '区块同步转出', icon: 'icon', noCache: true }
    },
    {
      path: 'finance',
      component: () => import('@/views/rich/finance'),
      name: 'finance',
      meta: { title: '矿机订单', icon: 'icon', noCache: true }
    }

  ]
},
{
  path: '/report',
  name: 'report',
  component: Layout,
  meta: { title: '奖励汇总', icon: 'icon' },
  children: [
    {
      path: 'drill-report',
      component: () => import('@/views/rich/drill-report'),
      name: 'drill-report',
      meta: { title: '奖励汇总表', icon: 'icon', noCache: true }
    }
  ]
}
]
export default newsRouter
