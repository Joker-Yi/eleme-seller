<template>
<!--  这里采用的是cube-ui的cube-tab-bar组件,没用采用vue-router路由,主要为了实现手机端左右滑动,tab栏切换的联动效果-->
  <div class="tab">
    <cube-tab-bar
      v-model="selectedLabelDefault"
      :data="tabs"
      show-slider
      class="border-bottom-1px">
    </cube-tab-bar>
    <div class="slide-wrapper">
      <cube-slide
        :loop=false
        :auto-play=false
        :show-dots=false
        :initial-index="index"
        ref="slide"
        @change="slideChange"
        :options="slideOptions"
      >
<!--        自带change事件,可获取当前索引-->
        <!--    使用默认插槽和 cube-slide-item 就可以自定义每个轮播页的结构-->
        <cube-slide-item v-for="(tab,index) in tabs" :key="index">
          <component :is="tab.component" :data="tab.data"></component>
        </cube-slide-item>

<!--        <cube-slide-item>-->
<!--          <goods></goods>-->
<!--        </cube-slide-item>-->
<!--        <cube-slide-item>-->
<!--          <ratings></ratings>-->
<!--        </cube-slide-item>-->
<!--        <cube-slide-item>-->
<!--          <seller></seller>-->
<!--        </cube-slide-item>-->
      </cube-slide>
    </div>
  </div>

</template>

<script>
import Goods from 'components/goods/goods'
import Seller from 'components/seller/seller'
import Ratings from 'components/ratings/ratings'
export default {
  name: "tab",
  props:{
    tabs: Array
  },
  data(){
    return{
      index:0,
      //不能写死,不易于维护,利用props传值过来
      // tabs:[
      //   {label:'商品'},
      //   {label:'评价'},
      //   {label:'商家'},
      // ],
      slideOptions:{
        click: false,
      }
    }
  },

  methods:{
    slideChange(current){ //当前索引
      this.index = current
    }
  },
  computed:{
      selectedLabelDefault: {
        get(){
          return this.tabs[this.index].label
        },
        //动态设置index
        set(newVal){
          this.index = this.tabs.findIndex((value) => {
            return value.label === newVal
          })
        }
      }
  },
  components:{
    Goods,
    Seller,
    Ratings
  }
}
</script>

<style scoped lang="stylus" type="text/stylus">
  /*@import "~common/stylus/variable"*/
  .tab
    >>> .cube-tab-bar
          .cube-tab
            padding: 11px 0
            &.cube-tab_active
              color: #ff382d
              /*border-bottom: 2px solid red*/

  .tab
    display: flex
    flex-direction : column
    height: 100%
    .slide-wrapper
      flex: 1
      overflow: hidden
</style>
