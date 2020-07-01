<template>
  <div class="store-home">
    <SearchBar></SearchBar>
    <flap-card :data="random"></flap-card>
    <scroll :top='scrollTop' @onScroll="onScroll" ref="scroll">
      <!--图片-->
      <div class="banner-wrapper">
        <img :src="banner" class="banner-img">
      </div>
      <!-- 猜你喜欢-->
      <guess-you-like :data="guessYouLike"></guess-you-like>
      <!--热门推荐-->
      <recommend :data="recommend" class="recommend"></recommend>
      <!--精选 -->
      <featured :btn-text="$t('home.seeAll')" :data="featured"
                :title-text="$t('home.featured')" class="featured">
      </featured>
      <!--下面的分类-->
      <div :key="index" class="category-list-wrapper" v-for="(item,index) in categoryList">
        <category-book :data="item"></category-book>
      </div>
      <!--所有分类-->
      <category :data="categories" class="categories"></category>
    </scroll>
  </div>
</template>
<script>
  import SearchBar from '../../components/home/SearchBar'
  import Scroll from '../../components/common/Scroll'
  import { storeHomeMixin } from '../../utils/mixin'
  import FlapCard from '../../components/home/FlapCard'
  import { home } from '../../api/store'
  import GuessYouLike from '../../components/home/GuessYouLike'
  import Recommend from '../../components/home/Recommend'
  import Featured from '../../components/home/Featured'
  import CategoryBook from '../../components/home/CategoryBook'
  import Category from '../../components/home/Category'

  export default {
    mixins: [storeHomeMixin],
    components: {
      Category,
      CategoryBook,
      Featured,
      Recommend,
      GuessYouLike,
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
        scrollTop: 84,
        random: null,
        banner: null,
        guessYouLike: null,
        recommend: null,
        featured: null,
        categoryList: null,
        categories: null
      }
    },
    mounted () {
      home().then(response => {
        if (response && response.status === 200) {
          const data = response.data
          const randomIndex = Math.floor(Math.random() * data.random.length)/*向下取整,随机拿书*/
          this.random = data.random[randomIndex]/*书*/
          this.banner = data.banner/*图*/
          this.guessYouLike = data.guessYouLike/*猜你喜欢*/
          this.recommend = data.recommend/*热门推荐*/
          this.featured = data.featured/*精选*/
          this.categoryList = data.categoryList/*分类*/
          this.categories = data.categories/*所有分类*/
        }
      })
    }

  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .store-home {
    width: 100%;
    height: 100%;

    .banner-wrapper {
      width: 100%;
      padding: px2rem(10);
      box-sizing: border-box;

      .banner-img {
        width: 100%;
        height: px2rem(100);
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

    .categories {
      margin-top: px2rem(20);
    }
  }
</style>
