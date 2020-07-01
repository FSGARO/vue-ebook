<!--4个分类-->
<template>
  <div class="category-book">
    <!--小标题-->
    <title-view :btn="$t('home.seeAll')" :label="categoryText(data.category)" @onClick="showBookCategory"></title-view>
    <div class="category-book-list">
      <div :key="index" @click="showBookDetail(item)" class="category-book-item" v-for="(item, index) in data.list">
        <div class="img-wrapper">
          <!--图片-->
          <img :src="item.cover" class="img">
        </div>
        <div class="content-wrapper">
          <!--书名-->
          <div class="title title-small" ref="title">{{item.title}}</div>
          <!--作者-->
          <div class="num sub-title-tiny" ref="author">{{item.author}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TitleView from './Title'
  import { categoryText, getCategoryName } from '../../utils/store'
  import { storeHomeMixin } from '../../utils/mixin'

  export default {
    mixins: [storeHomeMixin],
    components: {
      TitleView
    },
    props: {
      data: Object
    },
    methods: {
      /*路由跳转*/
      showBookCategory () {
        this.$router.push({
          path: '/store/list',
          query: {
            category: getCategoryName(this.data.category),
            categoryText: this.categoryText(this.data.category)
          }
        })
      },
      /*分类名称*/
      categoryText (category) {
        return categoryText(category, this)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .category-book {
    .category-book-list {
      width: 100%;
      @include top;
      padding: 0 px2rem(5);
      box-sizing: border-box;

      .category-book-item {
        flex: 0 0 25%;
        width: 25%;
        padding: 0 px2rem(5);
        box-sizing: border-box;

        .img-wrapper {
          @include center;

          .img {
            width: 100%;
          }
        }

        .content-wrapper {
          width: 100%;
          margin-top: px2rem(10);

          .num {
            margin-top: px2rem(5);
          }
        }
      }
    }
  }
</style>
