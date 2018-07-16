import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import LoginComponent from '@/views/login'

export default new Router({
  routes: [
    {
      path: '/',
      components: LoginComponent
    }
  ]
})
