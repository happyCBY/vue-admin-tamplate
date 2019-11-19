import Layout from '@/layout'
const newsRouter = [{
  path: '/news',
  component: Layout,
  meta: { title: '通告列表', icon: 'icon' },
  children: [
    {
      path: 'manager',
      component: () => import('@/views/news/manager'),
      name: 'managerNew',
      meta: { title: '通告列表', icon: 'icon', noCache: true }
    },
    {
      path: 'managerEdit',
      component: () => import('@/views/news/managerEdit'),
      name: 'managerEdit',
      meta: { title: '通告编辑', icon: 'icon', noCache: true },
      hidden: true
    }
  ]
}]
export default newsRouter
