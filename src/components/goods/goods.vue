<template>
<<<<<<< HEAD
  <div class="goodsWrapper">
    <div class="goods">
<!--      侧边菜单栏-->
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item,index) in data" class="menu-item" :class="{'current':currentIndex===index}"
              @click="selectMenu(index,$event)" ref="menuList">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            <span class="word">{{item.name}}</span>
          </span>
          </li>
        </ul>
      </div>
<!--      食物列表-->
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="item in data" class="food-list" ref="foodList">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item border-1px">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span><span class="old"
                                                                  v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
<!--                    添加 小球按钮-->
<!--                      <cartcontrol @add="addFood" :food="food"></cartcontrol>-->
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
<!--      购物车-->

<!--      <shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>-->
      <shopcart :deliveryPrice="sellerInfo.deliveryPrice"
                :minPrice="sellerInfo.minPrice"
                :selectFoods="selectFoods"></shopcart>
    </div>


<!--    食物详情页-->
<!--    <food @add="addFood" :food="selectedFood" ref="food"></food>-->
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import shopcart from 'components/shopCart/shopCart.vue'
import {getSeller} from "../../api";

export default {
  name: "goods",
  props: ['data'],
  data () {
    return {
      goodList: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {},
      sellerInfo: {},
    }
  },
    computed: {
        //当前左侧栏 应该所在的位置
        currentIndex() {
            for (let i = 0; i < this.listHeight.length; i++) {
                // 创建一个区间
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i + 1];
                if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                    this._followScroll(i);
                    return i;
                }
            }
            return 0;
        },
        selectFoods() {
            let foods = [];
            this.data.forEach((good) => {
                good.foods.forEach((food) => {
                    if (food.count) {
                        foods.push(food);
                    }
                });
            });
            return foods;
        }
    },
    methods: {
        _getSellerInfo(){
            getSeller().then((seller) =>{
                this.sellerInfo = seller;
            })
        },
    //点击侧边栏 food栏滚动到相应列表
    selectMenu(index, event){
      if (!event._constructed){
        return;
      }
      //拿取食物列表dom 数组
      let foodList = this.$refs.foodList;
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el, 300);
    },
     selectFood(food, event) {
         if (!event._constructed) {
             return;
         }
         this.selectedFood = food;
         this.$refs.food.show();
     },
     addFood(target) {
         this._drop(target);
     },
        //小球运动
     _drop(target) {
         // 体验优化,异步执行下落动画
         this.$nextTick(() => {
             this.$refs.shopcart.drop(target);
         });
     },
    //使用better-scroll初始化滚动事件
    _initScroll () {
      //让侧边栏滚动
      this.meunScroll = new BScroll(this.$refs.menuWrapper,{
        click: true
      });
      //让食物列表滚动
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
        click: true,
        probeType: 3 //让它实时获取滚动的位置
      });

      this.foodsScroll.on('scroll', (pos) => {
        // 判断滑动方向，避免下拉时分类高亮错误（如第一分类商品数量为1时，下拉使得第二分类高亮）
        if (pos.y <= 0) {
          this.scrollY = Math.abs(Math.round(pos.y));
        }
      });

    },
        //把每个foodList 的 li 的高度 存进数组
    _calculateHeight() {
      let foodList = this.$refs.foodList;
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
      }
    },
    _followScroll(index) {
      let menuList = this.$refs.menuList;
      let el = menuList[index];
      this.meunScroll.scrollToElement(el, 300, 0, -100);
    }
    },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    this._getSellerInfo();
    this.goodList = this.data;
    console.log(this.goodList);
      this.$nextTick(() => {
          this._initScroll();
      });
  },
  // bug 点 ,把_calculateHeight函数放进$nextTick中,没有数据了
  //只好用watch监听,再调用该事件
  watch:{
      scrollY:function () {
          this._calculateHeight()
      }
  },
  components: {
      shopcart,
  }
=======
  <h1>商品</h1>
</template>

<script>
export default {
name: "goods"
>>>>>>> parent of 0c6976e... 完成侧边选择栏和商品列表栏,实现滚动和左右联动
}
</script>

<style scoped>

<<<<<<< HEAD
  @import "../../common/stylus/mixin.styl"
.goodsWrapper
  position: relative
  height: 100%
  overflow: hidden
  .goods
    display: flex
    position: absolute
    top: 0
    bottom: 0
    /*width: 100%*/
    left: 0
    right: 0
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px

      background: #f3f5f7
      ul
        padding-bottom: 58px
        .menu-item
          display: table
          height: 54px
          width: 56px
          padding: 0 12px
          line-height: 14px
          &.current
            position: relative
            z-index: 10
            margin-top: -1px
            background: #fff
            font-weight: 700
            .text
              border-none()
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 2px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_3')
            &.discount
              bg-image('discount_3')
            &.guarantee
              bg-image('guarantee_3')
            &.invoice
              bg-image('invoice_3')
            &.special
              bg-image('special_3')
          .text
            display: table-cell
            width: 56px
            vertical-align: middle
            border-1px(rgba(7, 17, 27, 0.1))
            font-size: 12px
            .word
              text-overflow: ellipsis !important;
              white-space: normal !important;
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
=======
>>>>>>> parent of 0c6976e... 完成侧边选择栏和商品列表栏,实现滚动和左右联动
</style>
