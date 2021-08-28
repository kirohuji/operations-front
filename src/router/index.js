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
    redirect: '/portrait/portraitmanage'
  },
  {
    path: '/portrait',
    component: Layout,
    name: 'portrait',
    alwaysShow: true,
    meta: {
      title: '画像中心',
      icon: 'iconfont icon icon-qiantaidaping',
      code: 'portrait'
    },
    children: [
      {
        path: 'default',
        redirect: 'portraitmanage'
      },
      {
        path: 'portraitmanage',
        component: () => import('@/views/portraitmanage/index'),
        name: 'portraitmanage',
        meta: { title: '画像管理', affix: true, code: 'portraitmanage' }
      }
    ]
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
      },
      {
        path: 'roles',
        component: () => import('@/views/roles/index'),
        name: 'roles',
        meta: { title: '角色管理', affix: false, code: 'rolemanage' }
      }
    ]
  },
  {
    path: '/organmanage',
    component: Layout,
    name: 'dictionaries',
    meta: {
      title: '机构维护',
      icon: 'iconfont icon-jigouweihu-01',
      code: 'organization'
    },
    children: [
      {
        path: '/organmanage',
        component: () => import('@/views/organmanage/index'),
        name: 'organmanage',
        meta: { title: '机构维护', affix: false }
      }
    ]
  },
  {
    path: '/dictionaries',
    component: Layout,
    name: 'dictionaries',
    meta: {
      title: '字典管理',
      icon: 'iconfont icon-zidianguanli-01',
      code: 'dictionaries'
    },
    children: [
      {
        path: '/dictionaries',
        component: () => import('@/views/dicmanage/index'),
        name: 'dicmanage',
        meta: { title: '字典管理', affix: false }
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
