import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import getPageTitle from '@/utils/get-page-title'
import { serviceContainer } from '@/composables/context-provider'

export const service = serviceContainer.authService

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect']

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  const hasToken = localStorage.getItem('token')

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
      NProgress.done()
    }
  } else if (to.query.code || localStorage.getItem('code')) {
    const code = to.query.code || localStorage.getItem('code')
    service
      .login({
        code
      })
      .then(({ data }) => {
        localStorage.setItem('user', JSON.stringify(data))
        localStorage.setItem('token', 'Bearer ' + data.api_token)
        next({ path: '/' })
        NProgress.done()
      })
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
