<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab-wrapper">
      <tab :tabs="tabs"></tab>
    </div>
  </div>
</template>

<script>
import hder from './components/header/header'
import {getSeller} from "api";
import tab from './components/tab/tab'
import Goods from 'components/goods/goods'
import Seller from 'components/seller/seller'
import Ratings from 'components/ratings/ratings'

export default {
  name: 'app',
  data(){
    return{
      seller: {}
    }
  },
  created() {
    this._getSeller()
  },
  methods:{
    _getSeller(){
      getSeller().then((seller) =>{
        this.seller = seller
      })
    }
  },
  computed:{
    tabs(){
      return [
        {label:'商品',component:Goods,data:{seller:this.seller}},
        {label:'评价',component:Seller,data:{seller:this.seller}},
        {label:'商家',component:Ratings,data:{seller:this.seller}},
      ]
    }
  },
  components: {
    'v-header': hder,
    tab,
    Goods,
    Seller,
    Ratings
  },

}
</script>
<style lang="stylus" type="text/stylus">
  #app
    .tab-wrapper
      position: fixed
      left: 0
      right: 0
      bottom: 0
      top: 134px
</style>
