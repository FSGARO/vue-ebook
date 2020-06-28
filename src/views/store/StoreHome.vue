<template>
  <div class="store-home">
    <SearchBar></SearchBar>
    <flap-card></flap-card>
    <scroll :top='scrollTop' @onScroll="onScroll" ref="scroll">
      <div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
        <div>111111111111111111111111111111</div>
      </div>
    </scroll>
  </div>
</template>
<script>
  import SearchBar from '../../components/home/SearchBar'
  import Scroll from '../../components/common/Scroll'
  import { storeHomeMixin } from '../../utils/mixin'
  import FlapCard from '../../components/home/FlapCard'

  export default {
    mixins: [storeHomeMixin],
    components: {
      Scroll,
      SearchBar,
      FlapCard
    },
    methods: {
      onScroll (offsetY) {
        this.setOffsetY(offsetY)
        if (offsetY > 0) {
          this.scrollTop = 42
        } else {
          this.scrollTop = 84
        }
        /*更新滚动条*/
        this.$refs.scroll.refresh()
      }
    },
    data () {
      return {
        scrollTop: 84
      }
    },

  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .store-home {
    position: relative;
    width: 100%;
    height: 100%;
    background: #fff;
    font-size: px2rem(16);
    color: #666;

    .book-list-wrapper {
      width: 100%;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;

      &::-webkit-scrollbar {
        display: none;
      }

      .banner-wrapper {
        width: 100%;
        padding: px2rem(10);
        box-sizing: border-box;

        .banner {
          width: 100%;
          height: px2rem(150);
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
      }

      .recommend {
        margin-top: px2rem(20);
      }

      .featured {
        margin-top: px2rem(20);
      }

      .category-list-wrapper {
        margin-top: px2rem(20);
      }

      .category {
        margin-top: px2rem(20);
      }
    }
  }
</style>
