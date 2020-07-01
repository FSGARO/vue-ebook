<template>
  <div>
    <div :class="{'hide-title':!titleVisible,
  'hide-shadow':!shadowVisible}" class="search-bar">
      <transition name="title-move">
        <div class="search-bar-title-wrapper" v-show="titleVisible">
          <div class="title-text-wrapper">
            <!--标题文本-->
            <span class="title-text title">{{$t('home.title')}}</span>
          </div>
          <!--书籍推荐-->
          <div @click="showFlapCard" class="title-icon-shake-wrapper">
            <span class="icon-shake icon"></span>
          </div>
        </div>
      </transition>
      <!--返回按钮-->
      <div @click="back" class="title-icon-back-wrapper">
        <span class="icon-back icon"></span>
      </div>
      <!--输入-->
      <div :class="{'hide-title':!titleVisible}" class="search-bar-input-wrapper">
        <!--占位用 用于改变大小-->
        <div :class="{'hide-title':!titleVisible}" class="search-bar-blank"></div>
        <div class="search-bar-input"><!--输入框-->
          <span class="icon-search icon"></span><!--左侧图标-->
          <input :placeholder="$t('home.hint')"
                 @click="showHotSearch"
                 class="input"
                 type="text"
                 v-model="searchText"
                 @keyup.13.exact="search"><!--只有回车触发-->
        </div>
      </div>
    </div>
    <hot-search-list ref="hotSearch" v-show="hotSearchVisible"></hot-search-list>
  </div>
</template>

<script>
  import { storeHomeMixin } from '../../utils/mixin'
  import HotSearchList from './HotSearchList'

  export default {
    components: { HotSearchList },
    mixins: [storeHomeMixin],
    data () {
      return {
        searchText: '',/*搜索内容*/
        titleVisible: true,/*标题文字是否显示*/
        shadowVisible: false,/*阴影是否显示*/
        hotSearchVisible: false,/*搜索界面是否显示*/
      }
    },
    watch: {
      offsetY (offsetY) {
        if (offsetY > 0) {
          this.hideTitle()
          this.showShadow()
        } else {
          this.showTitle()
          this.hideShadow()
        }
      },
      hotSearchOffsetY (offsetY) {
        if (offsetY > 0) {
          this.showShadow()
        } else {
          this.hideShadow()
        }
      }
    },
    methods: {
      /*显示推荐卡片*/
      showFlapCard () {
        this.setFlapCardVisible(true)
      },
      /*隐藏标题*/
      hideTitle () {
        this.titleVisible = false
      },
      showTitle () {
        this.titleVisible = true
      },
      /*阴影*/
      hideShadow () {
        this.shadowVisible = false
      },
      showShadow () {
        this.shadowVisible = true
      },
      /*隐藏搜索界面*/
      hideHotSearch () {
        this.hotSearchVisible = false
        if (this.hotSearchOffsetY > 0) {
          this.hideTitle()
          this.showShadow()
        } else {
          this.showTitle()
          this.hideShadow()
        }
      },
      /*显示搜索界面*/
      showHotSearch () {
        this.hideTitle()
        this.hideShadow()
        this.hotSearchVisible = true
        this.$nextTick(() => {
          this.$refs.hotSearch.reset()
        })
      },
      /*搜索*/
      search () {
        /*跳转列表页*/
        this.$router.push({
          path: '/store/list',/**/
          query: {
            keyword: this.searchText
          }
        })
      },
      /*返回按钮*/
      back () {
        if (this.offsetY > 0) {
          this.hideTitle()
          this.showShadow()
        } else {
          this.showTitle()
          this.hideShadow()
        }
        this.hideHotSearch()
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .search-bar {
    position: relative;
    z-index: 150;
    width: 100%;
    height: px2rem(84);
    box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, .1);

    &.hide-title {
      height: px2rem(42); /*优化标题隐藏后间隔*/
    }

    &.hide-shadow {
      box-shadow: none;
    }

    .search-bar-title-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: px2rem(42);

      .title-text-wrapper {
        width: 100%;
        height: px2rem(42);
        @include center
      }

      .title-icon-shake-wrapper {
        position: absolute;
        right: px2rem(15);
        top: 0;
        height: px2rem(42);
        @include center
      }
    }

    .title-icon-back-wrapper {
      position: absolute;
      left: px2rem(15);
      top: 0;
      z-index: 200;
      height: px2rem(42);
      @include center
    }

    .search-bar-input-wrapper {
      position: absolute;
      left: 0;
      top: px2rem(42);
      display: flex;
      width: 100%;
      height: px2rem(42);
      padding: 0 px2rem(10);
      box-sizing: border-box;
      transition: top $animationTime $animationType; /*方便维护管理*/
      &.hide-title {
        top: 0;
      }

      .search-bar-blank {
        flex: 0;
        width: 0;
        transition: all $animationTime $animationType;

        &.hide-title {
          flex: 0 0 px2rem(31);
          width: px2rem(31);
        }
      }

      .search-bar-input {
        flex: 1;
        width: 100%;
        background: #f4f4f4;
        border-radius: px2rem(20);
        padding: px2rem(5) px2rem(15);
        box-sizing: border-box;
        border: px2rem(1) solid #eee;
        @include left;

        .icon-search {
          color: #999;
        }

        .input {
          width: 100%;
          height: px2rem(22);
          border: none; /*去边框*/
          background: transparent;
          margin-left: px2rem(10);
          font-size: px2rem(13);
          color: #666;

          &:focus {
            outline: none; /*去边框*/
          }

          &::-webkit-input-placeholder {
            color: #ccc;
          }
        }
      }
    }
  }
</style>
