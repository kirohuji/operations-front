import { constantRoutes } from '@/router'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(role, route) {
  if (route.meta && route.meta.code) {
    if (Array.isArray(route.meta.code)) {
      return isContained(role, route.meta.code)
    } else {
      return role.includes(route.meta.code)
    }
  } else {
    return false
  }
}
const isContained = (a, b) => {
  if (!(a instanceof Array) || !(b instanceof Array)) return false
  if (a.length < b.length) return false
  var aStr = a.toString()
  for (var i = 0, len = b.length; i < len; i++) {
    if (aStr.indexOf(b[i]) === -1) return false
  }
  return true
}
/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach((route) => {
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
    state.routes = routes
  }
}

const actions = {
  generateRoutes({ commit }, data) {
    return new Promise((resolve) => {
      const flat = (data) =>
        data.reduce((pre, cur) => {
          return cur.children ? pre.concat(cur.children) : pre.concat(cur)
        }, [])
      const accessedRoutes = filterAsyncRoutes(
        constantRoutes,
        flat(flat(data))
          .concat(flat(data))
          .map((item) => item.name)
      )
      commit('SET_ROUTES', accessedRoutes)
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
