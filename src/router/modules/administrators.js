/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const administrators = [
  {
    path: '/administrators',
    component: Layout,
    // redirect: '/administrators/addNewItc',
    name: 'administrators',
    meta: {
      title: '管理员',
      icon: 'table',
      noCache: true
    },
    children: [
      {
        path: 'addNewItc',
        component: () => import('@/views/administrators/addNewItc/index'),
        name: 'addNewItc',
        meta: { title: '添加矿机', noCache: true }
        // hidden: true
      },
      {
        path: 'repeatItc',
        component: () => import('@/views/administrators/repeatItc/index'),
        name: 'repeatItc',
        meta: { title: '复投矿机', noCache: true }
        // hidden: true
      },
      {
        path: 'addMoney',
        component: () => import('@/views/administrators/addMoney/index'),
        name: 'addMoney',
        meta: { title: '增加资金', noCache: true }
        // hidden: true
      },
      {
        path: 'recode',
        component: () => import('@/views/administrators/lastActivityView/index'),
        name: 'recode',
        meta: { title: '操作记录', noCache: true }
        // hidden: true
      }
    ]
  }
]
export default administrators
