<!--书架标题-->
<template>
  <div :class="{'hide-shadow': ifHideShadow}" class="shelf-title">
    <div class="shelf-title-text-wrapper">
      <!--文本-->
      <span class="shelf-title-text">{{title}}</span>
    </div>
    <div class="shelf-title-btn-wrapper shelf-title-left">
      <!--清除-->
      <span @click="clearCache" class="shelf-title-btn-text">{{$t('shelf.clearCache')}}</span>
    </div>
    <div @click="change" class="shelf-title-btn-wrapper shelf-title-right">
      <!--切换-->
      <span class="icon-cn icon2" v-if="lang === 'cn'"></span>
      <span class="icon-en icon2" v-else></span>
    </div>
  </div>
</template>

<script>
  import { setLocalStorage } from '../../utils/localStorage'

  export default {
    props: {
      title: String
    },
    watch: {
      offsetY (offsetY) {
        if (offsetY > 0) {
          this.ifHideShadow = false
        } else {
          this.ifHideShadow = true
        }
      }
    },
    data () {
      return {
        ifHideShadow: true,
        lang: this.$i18n.locale
      }
    },
    methods: {
      clearCache () {
        console.log('清除缓存')
      },
      change () {
        this.$i18n.locale = this.$i18n.locale === 'cn' ? 'en' : 'cn'
        this.lang = this.$i18n.locale
        setLocalStorage('locale', this.lang)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .shelf-title {
    position: relative;
    z-index: 130;
    width: 100%;
    height: px2rem(42);
    background: white;
    box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, .1);

    &.hide-shadow {
      box-shadow: none;
    }

    .shelf-title-text-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: px2rem(42);
      @include columnCenter;

      .shelf-title-text {
        font-size: px2rem(16);
        line-height: px2rem(20);
        font-weight: bold;
        color: #333;
      }

      .shelf-title-sub-text {
        font-size: px2rem(10);
        color: #333;
      }
    }

    .shelf-title-btn-wrapper {
      position: absolute;
      top: 0;
      box-sizing: border-box;
      height: 100%;
      @include center;

      .shelf-title-btn-text {
        font-size: px2rem(14);
        color: #666;
      }

      &.shelf-title-left {
        left: 0;
        padding-left: px2rem(15);
      }

      &.shelf-title-right {
        right: 0;
        padding-right: px2rem(15);
      }

      .icon2 {
        color: #666;
        font-size: px2rem(20);
      }
    }
  }
</style>
