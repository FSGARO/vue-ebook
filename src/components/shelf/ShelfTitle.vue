<template>
  <!--动画-->
  <transition name="fade">
    <!--阴影-->
    <div :class="{'hide-shadow': ifHideShadow}" class="shelf-title" v-show="this.shelfTitleVisible">
      <div class="shelf-title-text-wrapper">
        <!--标题-->
        <span class="shelf-title-text">{{$t('shelf.title')}}</span>
        <!--选中数量-->
        <span class="shelf-title-sub-text" v-show="this.isEditMode">{{selectedText}}</span>
      </div>
      <!--左 清除缓存-->
      <div @click="clearCache" class="shelf-title-btn-wrapper shelf-title-left">
        <span class="shelf-title-btn-text">{{$t('shelf.clearCache')}}</span>
      </div>
      <!--右 编辑 取消-->
      <div class="shelf-title-btn-wrapper shelf-title-right">
        <span @click="onEditClick"
              class="shelf-title-btn-text">{{isEditMode ? $t('shelf.cancel') : $t('shelf.edit')}}</span>
      </div>
    </div>
  </transition>
</template>

<script>
  import { storeShelfMixin } from '../../utils/mixin'
  import { clearLocalStorage, saveBookShelf } from '../../utils/localStorage'

  export default {
    mixins: [storeShelfMixin],
    props: {
      title: String
    },
    computed: {
      /*显示选中*/
      selectedText () {
        /*选中数量*/
        const selectedNumber = this.shelfSelected ? this.shelfSelected.length : 0
        /**/
        return selectedNumber <= 0 ? this.$t('shelf.selectBook') : (selectedNumber === 1 ? this.$t('shelf.haveSelectedBook').replace('$1', selectedNumber) : this.$t('shelf.haveSelectedBooks').replace('$1', selectedNumber))
      },
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
        ifHideShadow: true
      }
    },
    methods: {
      back () {
        this.$router.go(-1)
        this.setIsEditMode(false)
      },
      onEditClick () {
        /*取消选中*/
        if (!this.isEditMode) {
          this.setShelfSelected([])
          this.shelfList.forEach(item => item.selected = false)
        }
        this.setIsEditMode(!this.isEditMode)
      },
      clearCache () {
        clearLocalStorage()
        this.setShelfList([])
        this.setShelfSelected([])
        this.getShelfList()
        saveBookShelf(this.shelfList)

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

      .icon-back {
        font-size: px2rem(20);
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
    }
  }
</style>
