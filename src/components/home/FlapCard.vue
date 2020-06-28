<!--翻转小卡片-->
<template>
  <div class="flap-card-wrapper" v-show="this.flapCardVisible">
    <!--白色背景-->
    <div :class="{'animation':runFlapCardAnimation}" class="flap-card-bg">
      <!--圆-->
      <div :key="index" :style="{zIndex:item.zIndex}"
           class="flap-card"
           v-for="(item,index) in flapCardList">
        <div class="flap-card-circle">
          <!--左-->
          <div :style="semiCircleStyle(item,'left')"
               class="flap-card-semi-circle flap-card-semi-circle-left" ref="left">
          </div>
          <!--右-->
          <div :style="semiCircleStyle(item,'right')"
               class="flap-card-semi-circle flap-card-semi-circle-right" ref="right">

          </div>
        </div>
      </div>
      <!--小球-->
      <div class="point-wrapper">
        <div :class="{'animation':runPointAnimation}" :key="item" class="point" v-for="item in pointList"></div>
      </div>
    </div>
    <!--关闭按钮-->
    <div class="close-btn-wrapper">
      <div @click="close" class="icon-close"></div>
    </div>
  </div>
</template>

<script>
  import { storeHomeMixin } from '../../utils/mixin'
  import { flapCardList } from '../../utils/store'

  export default {
    mixins: [storeHomeMixin],
    name: 'FlapCard',
    created () {
      /*创建小球*/
      this.pointList = []
      for (let i = 0; i < 18; i++) {
        this.pointList.push(`point${i}`)
      }
    },
    data () {
      return {
        flapCardList,
        front: 0,
        back: 1,
        intervalTime: 25,
        runFlapCardAnimation: false,
        pointList: null,
        runPointAnimation: false,
      }
    },
    methods: {
      /*关闭*/
      close () {
        this.stopAnimation()
        this.setFlapCardVisible(false)
      },
      /*关闭后停止动画*/
      stopAnimation () {
        /*如果存在则关闭*/
        if (this.task) {
          clearInterval(this.task)
        }
        this.reset()/*重置卡片*/
      },
      /*绑定样式*/
      semiCircleStyle (item, dir) {
        return {
          backgroundColor: `rgb(${item.r}, ${item.g}, ${item.b})`,
          backgroundSize: item.backgroundSize,
          backgroundImage: dir === 'left' ? item.imgLeft : item.imgRight
        }
      },
      rotate (index, type) {
        const item = this.flapCardList[index]
        let dom
        /*正面*/
        if (type === 'front') {
          dom = this.$refs.right[index]
        } else {
          dom = this.$refs.left[index]
        }
        dom.style.transform = `rotateY(${item.rotateDegree}deg)`
        dom.style.backgroundColor = `rgb(${item.r}, ${item._g}, ${item.b})`
      },
      /*重置卡片*/
      reset () {
        this.front = 0
        this.back = 1
        /*还原*/
        this.flapCardList.forEach((item, index) => {
          item.zIndex = 100 - index
          item._g = item.g
          item.rotateDegree = 0
          this.rotate(index, 'front')
          this.rotate(index, 'back')
        })
      },
      /*卡片旋转*/
      flapCardRotate () {
        const frontFlapCard = this.flapCardList[this.front]
        const backFlapCard = this.flapCardList[this.back]
        frontFlapCard.rotateDegree += 10
        frontFlapCard._g -= 5
        backFlapCard.rotateDegree -= 10
        /*未显示 不加深*/
        if (backFlapCard.rotateDegree < 90) {
          backFlapCard._g += 5
        }
        if (frontFlapCard.rotateDegree === 90 && backFlapCard.rotateDegree === 90) {
          backFlapCard.zIndex += 2
        }
        this.rotate(this.front, 'front')/*正面*/
        this.rotate(this.back, 'back')/*背面*/
        /*重叠 */
        if (frontFlapCard.rotateDegree === 180 && backFlapCard.rotateDegree === 0) {
          this.next()
        }
      },
      /*下一组*/
      next () {
        const frontFlapCard = this.flapCardList[this.front]
        const backFlapCard = this.flapCardList[this.back]
        /*还原*/
        frontFlapCard.rotateDegree = 0
        backFlapCard.rotateDegree = 0
        frontFlapCard._g = frontFlapCard.g
        backFlapCard._g = backFlapCard.g

        this.rotate(this.front, 'front')
        this.rotate(this.back, 'back')

        this.front++
        this.back++
        const len = this.flapCardList.length
        if (this.front >= len) {
          this.front = 0
        }
        if (this.back >= len) {
          this.back = 0
        }
        /*zIndex
        * 100->96
        * 99->100
        * 98->99
        * 97->98
        * 96->97
        * */
        /*  (0-1+5)%5=4
        *   (1-1+5)%5=0
        * */
        this.flapCardList.forEach((item, index) => {
          item.zIndex = 100 - ((index - this.front + len) % len)
        })
        this.prepare()
      },
      /*左右半圆重叠*/
      prepare () {
        const backFlapCard = this.flapCardList[this.back]
        backFlapCard.rotateDegree = 180/*转动角度180*/
        backFlapCard._g = backFlapCard.g - 5 * 9
        this.rotate(this.back, 'back')
      },
      /*小球动画*/
      startPointAnimation () {
        this.runPointAnimation = true
        setTimeout(() => {
          this.runPointAnimation = false
          /*this.stopAnimation()*/
          if (this.task) {
            clearInterval(this.task)
          }
        }, 750)
      },
      /*开始卡片动画*/
      startFlapCardAnimation () {
        this.prepare()
        this.task = setInterval(() => {
          this.flapCardRotate()/*旋转*/
        }, this.intervalTime)
        setTimeout(() => {
          this.runFlapCardAnimation = false
        }, 2500)
      },
      /*弹出卡片*/
      runAnimation () {
        this.runFlapCardAnimation = true
        /*弹出后卡片翻转*/
        setTimeout(() => {
          this.startFlapCardAnimation()
          this.startPointAnimation()
        })
      }
    },
    watch: {
      flapCardVisible (v) {
        if (v) {
          this.runAnimation()
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  @import "../../assets/styles/flapCard";

  .flap-card-wrapper {
    z-index: 1000;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .6);
    @include center;
    @include absCenter;

    .flap-card-bg {
      position: relative;
      width: px2rem(64);
      height: px2rem(64);
      border-radius: px2rem(5);
      background: white;
      /*方便隐藏*/
      transform: scale(0);
      opacity: 0;


      &.animation {
        animation: flap-card-move .3s ease-in both; /*both 让主体维持在100%的状态*/
        /*ease-in:刚进入是缓缓进入 后面保持正常
                infinite 无限循环
                */
      }

      /*css3属性*/
      @keyframes flap-card-move {
        /*刚开始*/
        0% {
          transform: scale(0);
          opacity: 0;
        }
        50% {
          transform: scale(1.2);
          opacity: 1;
        }
        75% {
          transform: scale(.9);
          opacity: 1;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }

      .flap-card {
        width: px2rem(48);
        height: px2rem(48);
        @include absCenter;

        .flap-card-circle {
          display: flex;
          width: 100%;
          height: 100%;

          .flap-card-semi-circle {
            flex: 0 0 50%;
            width: 50%;
            height: 100%;
            background-repeat: no-repeat;
            backface-visibility: hidden; /*转动到背面隐藏*/
          }

          .flap-card-semi-circle-left {
            border-radius: px2rem(24) 0 0 px2rem(24);
            background-position: center right; /*居中且靠左*/
            transform-origin: right; /*转动轴*/
          }

          .flap-card-semi-circle-right {
            border-radius: 0 px2rem(24) px2rem(24) 0;
            background-position: center left;
            transform-origin: left; /*转动轴*/
          }
        }
      }

      .point-wrapper {
        z-index: 1500;
        @include absCenter;

        .point {
          border-radius: 50%;
          @include absCenter;

          &.animation {
            /*scss循环*/
            /*$i 1*/
            @for $i from 1 to length($moves) {
              /**/
              &:nth-child(#{$i}) {
                @include move($i)
              }
            }
          }
        }
      }
    }

    .close-btn-wrapper {
      position: absolute;
      left: 0;
      bottom: px2rem(30);
      z-index: 1100;
      width: 100%;
      @include center;

      .icon-close {
        width: px2rem(45);
        height: px2rem(45);
        border-radius: 50%;
        background: #333;
        font-size: px2rem(25);
        color: white;
        @include center;
      }
    }
  }
</style>
