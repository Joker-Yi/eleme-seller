<template>
 <div class="star" :class="starType">
   <span class="star-item" v-for="(item,index) in itemClasses" :key="index" :class="item"></span>
 </div>
</template>

<script>
  //星星总个数5
  const LENGTH = 5;
  //定义满星,半星,空星
  const CLS_FULL = 'on';
  const CLS_HALF = 'half';
  const CLS_EMPTY = 'off';
export default {
  name: "star",
  props: {
      size:Number,
      score:Number,
  },
  computed:{
      //通过父组件传递过来的size值(图标大小),拼合对应的类名
      starType(){
        return 'star-' + this.size;
      },
      itemClasses(){
        //存放每个星星该用的类名,总共5个,通过类名给它相应的图标
        let result = [];
        //分数*2向下取整,除2之后就会带有小数,是为了区分半星, .5及以上的小数会给半星,以下就没有半星 (另一方法较为普通麻烦 分数*10 再mod 10取余看是否大于5)
        const score = Math.floor(this.score * 2) / 2;
        //判断是否带有小数,则有一个半星 (整个过程重在半星的判断)
        const hasDot = score % 1 !== 0;
        //整数部分就是满星的数量
        const integer = Math.floor(score);
        //循环整数,添加满星
        for (let i = 0; i < integer; i++) {
            result.push(CLS_FULL);
        }
        //有小数,添加一个半星
        if (hasDot){
          result.push(CLS_HALF);
        }
        //之后剩余的全部用空星补满
        for (let i = 0; i < LENGTH - result.length; i++) {
          result.push(CLS_EMPTY)
        }
        return result;
      },
  }
}
</script>

<style scoped lang="stylus" type="text/stylus">
  @import "~common/stylus/mixin.styl"

  .star
    display: flex
    align-items: center
    justify-content: center
    .star-item
      background-repeat: no-repeat
    &.star-48
      .star-item
        width: 20px
        height: 20px
        margin-right: 22px
        background-size: 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
    &.star-36
      .star-item
        width: 15px
        height: 15px
        margin-right: 6px
        background-size: 15px 15px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
</style>
