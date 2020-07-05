import Vue from 'vue'
import lazyload from 'vue-lazyload'

Vue.use(lazyload, {
  error: require('@/assets/images/logo.png'),
  loading: require('@/assets/images/logo.png')
})
