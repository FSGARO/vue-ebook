<template>
  <div :class="{'search-top': ifInputClicked,
  'hide-shadow': ifHideShadow}" class="shelf-search-wrapper">
    <div :class="{'search-top': ifInputClicked}" class="shelf-search">
      <div class="search-wrapper">
        <!--搜索图标-->
        <div class="icon-search-wrapper">
          <span class="icon-search icon"></span>
        </div>
        <!--输入框-->
        <div class="search-input-wrapper">
          <input :placeholder="$t('shelf.search')"
                 @click="onSearchClick"
                 class="search-input"
                 type="text"
                 v-model="searchText">
        </div>
        <!--清除-->
        <div @click="clearSearchText"
             class="icon-clear-wrapper"
             v-show="searchText.length > 0">
          <span class="icon-close-circle-fill"></span>
        </div>
      </div>
      <!--语言-->
      <div @click="switchLocale" class="icon-locale-wrapper" v-if="!ifInputClicked">
        <span class="icon-cn icon" v-if="lang === 'cn'"></span>
        <span class="icon-en icon" v-else></span>
      </div>
      <!--取消-->
      <div @click="onCancelClick" class="cancel-btn-wrapper" v-else>
        <span class="cancel-text">{{$t('shelf.cancel')}}</span>
      </div>
    </div>
    <!--排序-->
    <transition name="hot-search-move">
      <div class="shelf-search-tab-wrapper" v-if="ifInputClicked">
        <div :key="item.id" @click="onTabClick(item.id)" class="shelf-search-tab-item" v-for="item in tabs">
          <span :class="{'is-selected': item.id === selectedTab}" class="shelf-search-tab-text">{{item.text}}</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import { setLocalStorage } from '../../utils/localStorage'
  import { storeShelfMixin } from '../../utils/mixin'

  export default {
    mixins: [storeShelfMixin],
    watch: {
      offsetY (offsetY) {
        if (offsetY > 0 && this.ifInputClicked) {
          this.ifHideShadow = false // 显示阴影
        } else {
          this.ifHideShadow = true // 隐藏阴影
        }
      }
    },
    computed: {
      /*语言*/
      lang () {
        return this.$i18n.locale
      },
      /**/
      tabs () {
        return [
          {
            id: 1,
            text: this.$t('shelf.default')
          },
          {
            id: 2,
            text: this.$t('shelf.progress')
          },
          {
            id: 3,
            text: this.$t('shelf.purchase')
          }
        ]
      }
    },
    data () {
      return {
        ifInputClicked: false,/*是否点击输入框*/
        searchText: '',/*输入内容*/
        selectedTab: 1,/*选中的tab id*/
        ifHideShadow: true/*是否隐藏阴影*/
      }
    },
    methods: {
      /*切换tab*/
      onTabClick (id) {
        this.selectedTab = id
      },
      /*清空输入*/
      clearSearchText () {
        this.searchText = ''
      },
      /*切换语言*/
      switchLocale () {
        if (this.lang === 'en') {
          this.$i18n.locale = 'cn'
        } else {
          this.$i18n.locale = 'en'
        }
        setLocalStorage('locale', this.$i18n.locale)
      },
      /*点击输入框*/
      onSearchClick () {
        this.ifInputClicked = true
        this.setShelfTitleVisible(false)
      },
      /*点击取消*/
      onCancelClick () {
        this.ifInputClicked = false
        this.setShelfTitleVisible(true)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .shelf-search-wrapper {
    position: relative;
    z-index: 105;
    width: 100%;
    height: px2rem(94);
    font-size: px2rem(16);
    background: white;
    box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, .1);

    &.hide-shadow {
      box-shadow: none;
    }

    &.search-top {
      position: fixed;
      left: 0;
      top: 0;
    }

    .shelf-search {
      position: absolute;
      top: px2rem(42);
      left: 0;
      z-index: 105;
      display: flex;
      width: 100%;
      height: px2rem(52);
      transition: top $animationTime linear;

      &.search-top {
        top: 0;
      }

      .search-wrapper {
        flex: 1;
        display: flex;
        margin: px2rem(8) 0 px2rem(8) px2rem(10);
        border: px2rem(1) solid #ccc;
        border-radius: px2rem(3);

        .icon-search-wrapper {
          flex: 0 0 px2rem(22);
          @include right;

          .icon-search {
            font-size: px2rem(12);
          }
        }

        .search-input-wrapper {
          flex: 1;
          padding: 0 px2rem(10);
          box-sizing: border-box;
          @include center;

          .search-input {
            width: 100%;
            font-size: px2rem(14);
            border: none;
            color: #333;

            &:focus {
              outline: none;
            }

            &::-webkit-input-placeholder {
              font-size: px2rem(14);
              color: #ccc;
            }
          }
        }

        .icon-clear-wrapper {
          flex: 0 0 px2rem(24);
          @include left;

          .icon-close-circle-fill {
            font-size: px2rem(14);
            color: #ccc;
          }
        }
      }

      .icon-locale-wrapper {
        flex: 0 0 px2rem(55);
        @include center;

        .icon-cn, .icon-en {
          font-size: px2rem(22);
          color: #666;
        }
      }

      .cancel-btn-wrapper {
        flex: 0 0 px2rem(55);
        @include center;

        .cancel-text {
          font-size: px2rem(14);
          color: $color-blue;
        }
      }
    }

    .shelf-search-tab-wrapper {
      position: absolute;
      top: px2rem(52);
      left: 0;
      z-index: 105;
      display: flex;
      width: 100%;
      height: px2rem(42);

      .shelf-search-tab-item {
        flex: 1;
        @include center;

        .shelf-search-tab-text {
          font-size: px2rem(12);
          color: #999;

          &.is-selected {
            color: $color-blue;
          }
        }
      }
    }
  }
</style>
