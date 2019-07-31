<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab-wrapper">
      <tab></tab>
    </div>
  </div>
</template>

<script>
import hder from './components/header/header'
import {getSeller} from "api";
import tab from './components/tab/tab'

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
  components: {
    'v-header': hder,
    tab,
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
