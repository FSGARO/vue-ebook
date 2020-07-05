import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/icon.css'
import './assets/styles/global.scss'
import i18n from '././lang'
/*import './mock'*/
/*不支持下载,所以无法渲染电子书*/
import './utils/boost'
import './lazy'

Vue.config.productionTip = false
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
