<template>
  <div class="store-shelf">
    <shelf-title :title="$t('shelf.title')"></shelf-title>
    <scroll :bottom="scrollBottom"
            :top="0"
            @onScroll="onScroll"
            class="store-shelf-scroll-wrapper"
            ref="scroll">
      <shelf-list :data="this.shelfList"></shelf-list>
    </scroll>
  </div>
</template>

<script>
  import ShelfTitle from '../../components/shelf/ShelfTitle'
  import { storeShelfMixin } from '../../utils/mixin'
  import Scroll from '../../components/common/Scroll'
  import ShelfList from '../../components/shelf/ShelfList'

  export default {
    mixins: [storeShelfMixin],
    components: {
      Scroll,
      ShelfTitle,
      ShelfList,
    },
    watch: {
      isEditMode (isEditMode) {
        this.scrollBottom = isEditMode ? 48 : 0
        this.$nextTick(() => {
          this.$refs.scroll.refresh()
        })
      }
    },
    data () {
      return {
        scrollBottom: 0
      }
    },
    methods: {
      onScroll (offsetY) {
        this.setOffsetY(offsetY)
      },
      /* getShelfList() {
         let shelfList = getBookShelf()
         if (!shelfList) {
           shelf().then(response => {
             if (response.status === 200 && response.data && response.data.bookList) {
               shelfList = appendAddToShelf(response.data.bookList)
               saveBookShelf(shelfList)
               return this.setShelfList(shelfList)
             }
           })
         } else {
           return this.setShelfList(shelfList)
         }
       },*/

    },
    mounted () {
      /*  this.getShelfList()*/
      /*this.setShelfCategory([])
      this.setCurrentType(1)*/
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .store-shelf {
    position: relative;
    z-index: 100;
    width: 100%;
    height: 100%;
    background: white;

    .store-shelf-scroll-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 101;
    }
  }
</style>
