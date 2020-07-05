<template>
  <div class="store-shelf">
    <shelf-title :title="$t('shelf.title')"></shelf-title>
    <scroll :bottom="scrollBottom"
            :top="0"
            class="store-shelf-scroll-wrapper"
            @onScroll="onScroll"
            ref="scroll">
      <shelf-search></shelf-search>
      <shelf-list :data="this.shelfList"></shelf-list>
      <shelf-footer></shelf-footer>
    </scroll>
  </div>
</template>

<script>
  import ShelfTitle from '../../components/shelf/ShelfTitle'
  import { storeShelfMixin } from '../../utils/mixin'
  import Scroll from '../../components/common/Scroll'
  import ShelfSearch from '../../components/shelf/ShelfSearch'
  import ShelfList from '../../components/shelf/ShelfList'
  import ShelfFooter from '../../components/shelf/ShelfFooter'

  export default {
    mixins: [storeShelfMixin],
    components: {
      ShelfFooter,
      Scroll,
      ShelfTitle,
      ShelfSearch,
      ShelfList,
    },
    watch: {
      /*距离*/
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
      /**/
      /*   getShelfList(){
           /!*是否存在*!/
           let sheltList=getBookShelf()
           if(!sheltList||sheltList.length===0){
             shelf().then(response=>{
               if (response.status===200&&response.data&&response.data.bookList){
                 sheltList=appendAddToShelf(response.data.bookList)
                 saveBookShelf(sheltList)
                 this.setShelfList(sheltList)
               }
             })
           }else {
            this.setShelfList(sheltList)
           }
         }*/
    },
    mounted () {
      this.getShelfList()
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
