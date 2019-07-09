import Vue from 'vue'
import Router from 'vue-router'
import good from '@/components/goods/good'
import ratings from '@/components/ratings/ratings'
import seller from '@/components/seller/seller'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'good',
      component: good
    },
    {
      path: '/goods',
      name: 'good',
      component: good
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: seller
    },
  ]
})
