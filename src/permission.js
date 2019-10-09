import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
// 设置title
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // 进度条开始
  NProgress.start()
  // 设置title
  document.title = getPageTitle(to.meta.title)

  // 从cookie中获取token值
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // 如果token存在，则直接进入到后台
      next({ path: '/' })
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0

      if (hasRoles) {
        next()
      } else {
        // 这段代码可以按照实际情况自行删改
        try {
          // 判断登录用户的权限
          const { roles } = await store.dispatch('user/getInfo')

          // 获取该用户可以访问的路由列表
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          console.log(accessRoutes)

          // 动态添加路由，用于设置权限，方法是router自带的，accessRoutes必须符合路由的规则
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
