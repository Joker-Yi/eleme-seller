<template>
  <div class="cartcontrol">
<!--   添加/减少按钮-->
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop="decrease">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop="add"></div>
<!--    阻止冒泡-->
  </div>
</template>

<script>
export default {
  name: "cartControl",
  props: ['food'],
  methods: {
    add(event) {
        //event._constructed 是 better-scroll 事件对象的属性,原生事件对象没有这个属性
        // 这里有点击一次,触发两次的事件, 是因为 插件会 多触发一次事件
        if (!event._constructed) {
            console.log(event._constructed);
            return;
        }
        if (!this.food.count){
            //如果food没有count这个属性的话用$set给它设置
            this.$set(this.food,'count',1)
        }else {
            this.food.count++
            console.log(1);
        }
        console.log(event.target);
        // 向父组件传递 当前点击的dom对象
        this.$emit('add',event.target)
    },
      decrease(event) {
        if (!event._constructed) {
            return;
        }
        if (this.food.count){
            this.food.count--
        }
      }
  }
}
</script>

<style scoped lang="stylus" type="text/stylus">
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      opacity: 1
      transform: translate3d(0, 0, 0)
      .inner
        display: inline-block
        line-height: 24px
        font-size: 24px
        color: rgb(0, 160, 220)
        transition: all 0.4s linear
        transform: rotate(0)
      &.move-enter-active, &.move-leave-active
        transition: all 0.4s linear
      &.move-enter, &.move-leave-active
        opacity: 0
        transform: translate3d(24px, 0, 0)
        .inner
          transform: rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .cart-add
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
</style>