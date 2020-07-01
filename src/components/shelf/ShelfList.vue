<!--图书列表-->
<template>
  <div :style="{top: shelfListTop}" class="shelf-list">
    <transition-group id="shelf-list" name="list" tag="div">
      <div :key="item.id" class="shelf-list-item-wrapper" v-for="item in data">
        <shelf-item :data="item" :style="{height: itemHeight}"></shelf-item>
        <div class="shelf-list-title-wrapper">
          <span class="shelf-list-title title-small">{{item.title}}</span>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
  import { storeShelfMixin } from '../../utils/mixin'
  import ShelfItem from './ShelfItem'
  import { px2rem, realPx } from '../../utils/utils'

  export default {
    mixins: [storeShelfMixin],
    name: 'ShelfList',
    components: { ShelfItem },
    props: {
      top: {
        type: Number,
        default: 42
      },
      data: Array
    },
    computed: {
      shelfListTop () {
        return px2rem(this.top) + 'rem'
      },
      itemHeight () {
        /*减去空白,再除3*/
        return ((window.innerWidth - realPx(120) / 3) / 3) + 'px'
      }
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .shelf-list {
    position: absolute;
    left: 0;
    z-index: 100;
    width: 100%;

    #shelf-list {
      display: flex;
      flex-flow: row wrap;
      width: 100%;
      padding: 0 px2rem(15);
      box-sizing: border-box;

      .shelf-list-item-wrapper {
        flex: 0 0 33.33%;
        width: 33.33%;
        padding: px2rem(15);
        box-sizing: border-box;

        &.list-leave-active {
          display: none;
        }

        &.list-move {
          transition: transform .5s;
        }

        .shelf-list-title-wrapper {
          margin-top: px2rem(10);
        }
      }
    }
  }
</style>
