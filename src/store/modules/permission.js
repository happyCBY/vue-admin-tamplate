import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.name) {
    return roles.some(role => route.name === role)
  } else {
    return true
  }
  // if (route.meta && route.meta.roles) {
  //   return roles.some(role => route.meta.roles.includes(role))
  // } else {
  //   return true
  // }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
// 递归遍历出所有符合该用户身份的路由，并返回
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    // 将分支路由添加到主路由
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes(store, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      // 如果是admin则可以查看全部信息
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        // 获得符合该用户身份的路由
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      // 将该路由添加到主路由上
      store.commit('SET_ROUTES', accessedRoutes)
      store.state.flag = false
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
