<!--书-->
<template>
  <div :class="{'shelf-item-shadow': data.type === 1}"
       class="shelf-item">
    <component :data="data"
               :is="item"
               class="shelf-item-comp"></component>
    <div :class="{'is-selected': data.selected}"
         class="icon-selected"></div>
  </div>
</template>

<script>
  import { storeShelfMixin } from '../../utils/mixin'
  import ShelfBook from './ShelfItemBook'
  import ShelfAdd from './ShelfItemAdd'

  export default {
    mixins: [storeShelfMixin],
    props: {
      data: Object
    },
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
    methods: {}
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

    .shelf-item-comp {
      opacity: 1;

      &.is-edit {
        opacity: .5;
      }
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
