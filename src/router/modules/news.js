import Layout from '@/layout'
const newsRouter = [{
  path: '/news',
  component: Layout,
  meta: { title: '通告列表', icon: 'icon' },
  children: [
    {
      path: 'manager',
      component: () => import('@/views/user/manager'),
      name: 'manager',
      meta: { title: '会员信息', icon: 'icon', noCache: true }
    },
    {
      path: 'userSearch',
      component: () => import('@/views/user/userSearch'),
      name: 'userSearch',
      meta: { title: '推荐搜索', icon: 'icon', noCache: true }
    }
  ]
}]
export default newsRouter
