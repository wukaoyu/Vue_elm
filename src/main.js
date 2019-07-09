// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import store from './vuex/store'
import $ from 'jquery'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  $,
  render: h=>h(App)
})
Vue.use(VueRouter);
Vue.use(VueResource);
// import Vue from 'vue'
// import App from './App'
// import router from './router'
// // import VueRouter from 'vue-router'
// import goods from './components/goods/good';
// import ratings from './components/ratings/ratings';
// import seller from './components/seller/seller';

// Vue.config.productionTip = false
// Vue.use(VueRouter);
// /* eslint-disable no-new */
// let app=Vue.extends(App);
// // let router = new VueRouter();
// router.map({
//   '/good':{
//     component:goods
//   }
// })
// router.start(app,'#app');