import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/store'
    },
    {
      path: '/ebook',
      component: () => import('./views/ebook/index.vue'),
      children: [
        {
          path: ':fileName',
          component: () => import('./components/ebook/EbookReader.vue')
        }
      ]
    },
    {
      path: '/store',
      component: () => import('./views/store/index'),
      redirect: '/store/hello',
      children: [
        {
          path: 'home',
          component: () => import('./views/store/StoreHome.vue')
        },
        {
          path: 'list',
          component: () => import('./views/store/StoreList.vue')
        },
        {
          path: 'detail',
          component: () => import('./views/store/StoreDetail.vue')
        },
        {
          path: 'shelf',
          component: () => import('./views/store/StoreShelf')
        },
        {
          path: 'hello',
          component: () => import('./views/Hello')
        }
      ]
    }
  ]
})
