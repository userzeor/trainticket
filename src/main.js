import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './style/base/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import './fonts/iconfont.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  // el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App)
}).$mount('#app')
