<template>
  <div :class="{'shelf-item-shadow': data.type === 1}"
       @click="onItemClick"
       class="shelf-item">
    <component :data="data"
               :is="item"
               class="shelf-item-comp"></component>
    <!--小图标-->
    <div :class="{'is-selected': data.selected}"
         class="icon-selected"
         v-show="isEditMode && data.type === 1"><!--编辑时 图书上显示-->
    </div>
  </div>
</template>

<script>
  import { storeShelfMixin } from '../../utils/mixin'
  import ShelfBook from './ShelfItemBook'
  import ShelfAdd from './ShelfItemAdd'
  import { gotoStoreHome } from '../../utils/store'

  export default {
    mixins: [storeShelfMixin],
    props: {
      data: Object
    },
    /*判断类型*/
    computed: {
      item () {
        return this.data.type === 1 ? this.book : this.add
      }
    },
    data () {
      return {
        book: ShelfBook,
        add: ShelfAdd
      }
    },
    methods: {
      onItemClick () {
        /*编辑模式*/
        if (this.isEditMode) {
          this.data.selected = !this.data.selected
          /*选中时存储*/
          if (this.data.selected) {
            /*不重复*/
            this.shelfSelected.pushWithoutDuplicate(this.data)
          } else {
            /**/
            this.setShelfSelected(this.shelfSelected.filter(item => item.id !== this.data.id))
          }
        } else {
          if (this.data.type === 1) {
            this.showBookDetail(this.data)
          } else if (this.data.type === 3) {
            gotoStoreHome(this)
          }
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .shelf-item {
    position: relative;
    width: 100%;
    height: 100%;
    &.shelf-item-shadow {
      box-shadow: px2rem(2) px2rem(2) px2rem(6) px2rem(2) rgba(200, 200, 200, .3);
    }
    .icon-selected {
      position: absolute;
      bottom: px2rem(2);
      right: px2rem(2);
      font-size: px2rem(18);
      color: rgba(0, 0, 0, .4);
      &.is-selected {
        color: $color-blue;
      }
    }
  }
</style>
