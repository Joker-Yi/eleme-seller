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
import {getGoods} from "./api";
import {getRatings} from "./api";
import tab from './components/tab/tab'
import Goods from 'components/goods/goods'
import Seller from 'components/seller/seller'
import Ratings from 'components/ratings/ratings'

export default {
  name: 'app',
  data(){
    return{
      seller: {},
      goods: [],
      ratings: []
    }
  },
  created() {
    this._getSeller();
    this._getGoods();
    this._getRatings();
  },
  methods:{
    _getSeller(){
      getSeller().then((seller) =>{
        this.seller = seller
      })
    },
    _getGoods(){
        getGoods().then((goods) =>{
            this.goods = goods
        })
    },
    _getRatings(){
        getRatings().then((ratings) =>{
            this.ratings = ratings
        })
    },
  },
  computed:{
    tabs(){
      return [
        {label:'商品',component:Goods,data:this.goods},
        {label:'评价',component:Ratings,data:this.ratings},
        {label:'商家',component:Seller,data:this.seller},
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
