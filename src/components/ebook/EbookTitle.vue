<template>
  <transition name="slide-down">
    <!--标题-->
    <div class="title-wrapper" v-show="menuVisible">
      <div class="left">
        <!-- 返回-->
        <span class="icon-back" @click="back"></span>
      </div>
      <div class="img-wrapper">
        <img src="http://192.168.1.104:8081/logo.png">
      </div>

      <!--右-->
      <div class="right">
        <!-- 书架-->
        <div class="icon-wrapper">
          <span @click="gotoBookShelf" class="icon-shelf "></span>
        </div>
        <!--购物车图标-->
        <div class="icon-wrapper">
          <span @click="gotoBookStore" class="icon-cart "></span>
        </div>
        <!--更多-->
        <div class="icon-wrapper">
          <span class="icon-more "></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { ebookMixin } from '../../utils/mixin'

  export default {
    mixins: [ebookMixin], /*利用vuex的mixins精简代码*/
    name: 'EbookTitle',
    methods: {
      back () {
        this.$router.go(-1)/*返回*/
      },
      gotoBookShelf () {
        this.$router.push('/store/shelf')
      },
      gotoBookStore () {
        this.$router.push('/store/home')
      },
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .title-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 210;
    display: flex;
    width: 100%;
    height: px2rem(48);
    background: white;
    box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, .15);
    font-size: px2rem(20);

    .left {
      flex: 0 0 px2rem(40);
      @include left;
      margin-left: px2rem(15);
    }

    .img-wrapper {
      @include left;
    }

    img {
      width: px2rem(50);
    }

    .right {
      flex: 1;
      display: flex;
      justify-content: flex-end;

      .icon-wrapper {
        flex: 0 0 px2rem(40);
        @include center;

        .icon-shelf {
          font-size: px2rem(22);
        }

        .icon-cart {
          font-size: px2rem(22);
        }
      }

      .img-wrapper {
        flex: 1;
        @include center;

      }
    }
  }
</style>
