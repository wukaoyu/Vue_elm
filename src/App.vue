<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods"> 
          商品
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings"> 
          评价
        </router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller"> 
          商家
        </router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import header from './components/header/header';
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

const ERR_OK=0;
Vue.use(VueRouter)
Vue.use(VueResource);
export default {
  name: 'App',
  data() {
    return{
      seller:{}
    }
  },
  created() {
    this.$http.get('/api/seller').then((response) => {
        response=response.body;
        if(response.errno==0){
            this.seller=response.data;
            //console.log(this.seller);
        }
    })
  },
  components:{
    'v-header':header
  }
}; 

</script>

<style>
@import "./common/stylus/icon.styl";
a{
  text-decoration: none;
  color: #000;
}
.tab{
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px; 
}
.tab-item{
  flex: 1;
  text-align: center;
}
.tab-item>a{
  display: block;
  font-size: 14px;
  color: rgb(77,85,93);
}
.tab-item>a:active{
  color:rgb(240,20,20);
}
.tab-item>.router-link-active{
  color:rgb(240,20,20);
}
</style>
