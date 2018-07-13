import Vue from 'vue'

// 引入elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import App from './App'
import router from './router'
import store from './store'

// 将moment.js引入并放置在vue原型链上
import moment from 'moment'
Vue.prototype.moment = moment

// 引入公用css
import '@/styles/index.scss'
import '@/styles/reElement.scss'
import 'font-awesome/css/font-awesome.css'

// 引入并遍历设置全局filter
import * as filters from '@/utils/filter'

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
