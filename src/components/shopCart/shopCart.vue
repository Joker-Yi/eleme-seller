<template>
  <div class="shopcartWrapper">
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount>0}">
              <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click.stop.prevent="pay">
          <div class="pay" :class="payClass">
            {{payDesc}}
          </div>
        </div>
      </div>
<!--      小球容器-->
      <div class="ball-container">
        <div v-for="ball in balls">
<!--          半场动画(只有enter的)-->
          <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>

<!--      购物车列表-->
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol @add="addFood" :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
<!--    背景遮罩-->
    <transition name="fade">
      <div class="list-mask" @click="hideList" v-show="listShow"></div>
    </transition>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import cartcontrol from 'components/cartControl/cartControl.vue'

const BALLS_LEN = 10;
function createBalls() {
    let res = [];
    for (let i = 0; i < BALLS_LEN; i++) {
      res.push({show: false});
    }
    return res;
}
export default {
  name: "shopCart",
  props:['deliveryPrice','minPrice','selectFoods'],
  data() {
        return {
            balls: createBalls(),
            dropBalls: [],
            fold: true
        };
    },
  computed: {
      // 商品总价
      totalPrice() {
          let total = 0;
          this.selectFoods.forEach((food) => {
              total += food.price * food.count;
          });
          return total;
      },
      // 在购物车图标上显示 总添加的商品数
      totalCount() {
          let count = 0;
          this.selectFoods.forEach((food) => {
              count += food.count;
          });
          return count;
      },
      // 根据总价 动态显示对应的文字
      payDesc() {
          if (this.totalPrice === 0) {
              return `￥${this.minPrice}元起送`;
          } else if (this.totalPrice < this.minPrice) {
              let diff = this.minPrice - this.totalPrice;
              return `还差￥${diff}元起送`;
          } else {
              return '去结算';
          }
      },
      // 与起送价格比较判断 分别给对应的样式
      payClass() {
          if (this.totalPrice < this.minPrice) {
              return 'not-enough';
          } else {
              return 'enough';
          }
      },
      // 购物车里商品列表的显示
      listShow() {
          if (!this.totalCount) {
              this.fold = true;
              return false;
          }
          let show = !this.fold;
          if (show) {
              this.$nextTick(() => {
                  if (!this.scroll) {
                      this.scroll = new BScroll(this.$refs.listContent, {
                          // 不让它再次触发添加事件了
                          click: false
                      });
                  } else {
                      this.scroll.refresh();
                  }
              });
          }
          return show;
      }
  },
  methods: {

    // 控制购物车商品列表 显示的开关
    toggleList() {
        if (!this.totalCount) {
            return;
        }
        this.fold = !this.fold;
    },
    hideList() {
        this.fold = true;
    },
    empty() {
        this.selectFoods.forEach((food) => {
            food.count = 0;
        });
    },
    pay() {
        if (this.totalPrice < this.minPrice) {
            return;
        }
        window.alert(`支付${this.totalPrice}元`);
    },
    // 购物车列表的 添加按钮 给 小球动画
    addFood(target) {
        this.drop(target);
    },

    // 整个小球动画
    drop(el) {
        //遍历 找到第一个ball.show为false的 小球 修改为true,
        for (let i = 0; i < this.balls.length; i++) {
            let ball = this.balls[i];
            if (!ball.show) {
                ball.show = true;
                //存入点击的dom对象,以便后面获取它的位置
                ball.el = el;
                this.dropBalls.push(ball);
                return;
            }
        }
    },
    // 动画的钩子函数(半场动画)
    //在小球运动前, 让 小球 原本就存在于 购物车 里 ,隐藏 ,点击,小球 运动到点击的位置,不过是隐藏看不见的,为小球下落运动做好准备
    beforeDrop(el) {
        let count = this.balls.length;
        while (count--) {
            // 获取 最后一个运动的小球(即最新的)
            let ball = this.balls[count];
            if (ball.show) {
                // 拿到当前 点击按钮的 位置信息
                let rect = ball.el.getBoundingClientRect();
                // 减去32 是 因为购物车 中心 离左侧 的距离 , 获取到 按钮 与 小球的水平距离
                let x = rect.left - 32;
                // 窗口的高度 减去 按钮距离顶部的距离 ,为小球 与按钮的 垂直距离
                let y = -(window.innerHeight - rect.top - 22);// 负值 是因为动画 小球要 往 按钮 去
                el.style.display = '';//隐藏
                //小球整体(包括里面的inner) 进行y轴方向 偏移
                el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                el.style.transform = `translate3d(0,${y}px,0)`;
                // 获取小球里层元素
                let inner = el.getElementsByClassName('inner-hook')[0];
                // inner 再 进行x轴方向 偏移
                inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                inner.style.transform = `translate3d(${x}px,0,0)`;
            }
        }
    },
    dropping(el, done) {
        /* eslint-disable no-unused-vars */
        //浏览器重绘
        let rf = el.offsetHeight;
        this.$nextTick(() => {
            // 回到原来的位置
            el.style.webkitTransform = 'translate3d(0,0,0)';
            el.style.transform = 'translate3d(0,0,0)';
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = 'translate3d(0,0,0)';
            inner.style.transform = 'translate3d(0,0,0)';
            //监听transitionend ,告诉本次动画执行完了,执行之后的aferDrop
            el.addEventListener('transitionend', done);
        });
    },
    afterDrop(el) {
        // 获取 要下落小球数组中 的 第一个小球
        let ball = this.dropBalls.shift();
        // 如果没有要下落的小球了, 则 隐藏
        if (ball) {
            ball.show = false;
            el.style.display = 'none';
        }
    }
  },
  created () {
      // this._getSellerInfo();
  },
  components: {
      cartcontrol,
  }
}
</script>

<style scoped lang="stylus" type="text/stylus">
  @import "../../common/stylus/mixin.styl"

  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 33.3%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #fff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .content-right
        flex: 0 0 100px
        width: 100px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        //贝塞尔曲线
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s linear
    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform: translate3d(0, -100%, 0)
      &.fold-enter-active, &.fold-leave-active
        transition: all 0.5s
      &.fold-enter, &.fold-leave-active
        transform: translate3d(0, 0, 0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)

      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px

  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-active
      opacity: 0
      background: rgba(7, 17, 27, 0)
</style>