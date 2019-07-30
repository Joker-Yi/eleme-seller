<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
  </div>
</template>

<script>
import hder from './components/header/header'
import {getSeller} from "api";

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
  },

}
</script>
<style lang="stylus">

</style>
