import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  /** 首页 */
  {
    path: '/',
    redirect: '/person/'
  },
  {
    path: '/person',
    component: Layout,
    name: 'person',
    meta: {
      title: '用户中心',
      icon: 'iconfont icon-yonghuguanli-01',
      code: 'user'
    },
    children: [
      {
        path: 'default',
        redirect: 'users'
      },
      {
        path: 'users',
        component: () => import('@/views/users/index.vue'),
        name: 'users',
        meta: { title: '用户管理', affix: false, code: 'usermanage' }
      }
    ]
  }
]
export const asyncRoutes = []

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
