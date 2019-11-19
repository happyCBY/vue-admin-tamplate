import Layout from '@/layout'
const newsRouter = [{
  path: '/system',
  component: Layout,
  meta: { title: '系统设置', icon: 'icon' },
  children: [
    {
      path: 'recommend',
      component: () => import('@/views/system/recommend'),
      name: 'recommend',
      meta: { title: '等级提成比例', icon: 'icon', noCache: true }
    },
    {
      path: 'meal',
      component: () => import('@/views/system/meal'),
      name: 'meal',
      meta: { title: '矿机类型', icon: 'icon', noCache: true }
    },
    {
      path: 'price-task',
      component: () => import('@/views/system/price-task'),
      name: 'price-task',
      meta: { title: '币种汇率', icon: 'icon', noCache: true }
    },
    {
      path: 'coin-convert',
      component: () => import('@/views/system/coin-convert'),
      name: 'coin-convert',
      meta: { title: '闪兑设置', icon: 'icon', noCache: true }
    },
    {
      path: 'user',
      component: () => import('@/views/system/user'),
      name: 'user',
      meta: { title: '后台用户管理', icon: 'icon', noCache: true }
    }

  ]
}]
export default newsRouter
