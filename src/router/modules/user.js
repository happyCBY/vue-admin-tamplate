import Layout from '@/layout'
const userRouter = [{
  path: '/user',
  name: 'user',
  component: Layout,
  meta: { title: '会员管理', icon: 'icon' },
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
export default userRouter
