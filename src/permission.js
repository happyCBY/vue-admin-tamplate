import router from './router'
import store from './store'
import { getToken } from '@/utils/auth'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie
// 设置title
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist
// var flag = true
router.beforeEach(async(to, from, next) => {
  // 进度条开始
  NProgress.start()
  // 设置title
  document.title = getPageTitle(to.meta.title)
  if (to.path === '/login') {
    if (getToken()) {
      next(from.path)
      NProgress.done()
      return
    }
    next()
    NProgress.done()
  } else {
    // 在这里直接放行了，如果有需要判断的自行添加判断
    if (getToken()) {
      NProgress.done()
      next()
      console.log(store.state.user.flag)
      if (store.state.user.flag) {
        const accessRoutes = await store.dispatch('permission/generateRoutes', JSON.parse(window.localStorage.getItem('roles')) || [])
        console.log(accessRoutes)
        router.addRoutes(accessRoutes)
        store.state.user.flag = false
      }
    } else {
      next('/login')
    }
    // next({ ...to, replace: true })
    // 动态添加路由只有在加载的时候才触发一次，后面路由跳转不再触发
    // 这里写死了 管理权限为admin 可以访问所有路由，有权限设置的可以自己传入不同的值，并在store中的permission.js文件里面设置，不同权限开发不同的路由
    // hack method to ensure that addRoutes is complete
    // set the replace: true, so the navigation will not leave a history record
    //
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
