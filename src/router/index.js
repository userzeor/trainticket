import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import homepage from '@/page/homepage'
import header from '@/components/header'
import sidebar from '@/components/sidebar'
import maincont from '@/components/maincont'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      name: '',
      component: login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: homepage,
      children: [{
        path: '/index',
        components: {
          header: header,
          sidebar: sidebar,
          maincont: maincont
        }
      }]
    }
  ]
})
