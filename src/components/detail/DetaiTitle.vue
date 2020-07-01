<!--标题-->
<template>
  <div :class="{'hide-shadow': ifHideShadow}" class="detail-title-wrapper">
    <!--左 返回-->
    <div @click="back" class="title-left-wrapper">
      <span class="icon-back"></span>
    </div>
    <!--右 显示书架-->
    <div class="title-right-wrapper">
      <span @click="showBookShelf" class="icon-shelf icon" v-if="showShelf"></span>
      <span class="icon-share" v-else></span>
    </div>
    <!--标题-->
    <div class="title-text" v-if="title">
      {{title}}
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      showShelf: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        ifHideShadow: true
      }
    },
    methods: {
      showBookShelf () {
        this.$router.push('/store/shelf')
      },
      showShadow () {
        this.ifHideShadow = false
      },
      hideShadow () {
        this.ifHideShadow = true
      },
      back () {
        this.$emit('back')
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .detail-title-wrapper {
    position: relative;
    display: flex;
    width: 100%;
    height: px2rem(42);
    box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, .1);
    font-size: px2rem(20);
    color: #666;

    &.hide-shadow {
      box-shadow: none;
    }

    .title-left-wrapper {
      position: relative;
      z-index: 200;
      flex: 1;
      margin-left: px2rem(15);
      @include left;
    }

    .title-right-wrapper {
      position: relative;
      z-index: 200;
      flex: 1;
      margin-right: px2rem(15);
      @include right;
    }

    .title-text {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      height: px2rem(42);
      font-size: px2rem(16);
      color: #333;
      @include center;
    }
  }
</style>
