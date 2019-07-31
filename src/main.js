import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import './register'//导入创建的api SellerDetail

import './common/stylus/index.styl'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
