import Vue from 'vue'

import Cookies from 'js-cookie'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import Element from 'element-ui'
import './styles/element-variables.scss'
// import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log
// import DataSearchForm from '@/components/organisms/DataSearchForm'
import * as filters from './filters' // global filters
import LourdComponents from 'lourd_components'
import ThenableProvider from 'lourd_components/src/plugins/thenable'
import BaseSearch from './components/molecules/BaseSearch'
import BaseCascader from './components/molecules/BaseCascader/cascader/src/cascader.vue'
Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
  // locale: enLang // 如果使用中文，无需设置，请删除
})
Vue.prototype.$cache = {}
Vue.use(ThenableProvider)
Vue.use(LourdComponents, {
  baseEnter: {
    search: BaseSearch,
    'base-cascader': BaseCascader
  }
})
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
