<!--热门推荐-->
<template>
  <div class="recommend">
    <!--小标题-->
    <title-view :btn="$t('home.seeAll')" :label="$t('home.recommend')" @click="showBookList"></title-view>
    <div class="recommend-list">
      <div :key="index" @click="showBookDetail(item)" class="recommend-item" v-for="(item, index) in data">
        <div class="img-wrapper">
          <!--图片-->
          <img :src="item.cover" class="img">
        </div>
        <div class="content-wrapper">
          <!--书名-->
          <div class="title title-medium" ref="title">{{item.title}}</div>
          <!--多少人读-->
          <div class="num sub-title" ref="num">{{$t('home.readers').replace('$1', item.readers)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TitleView from './Title'
  import { storeHomeMixin } from '../../utils/mixin'

  export default {
    mixins: [storeHomeMixin],
    components: {
      TitleView
    },
    props: {
      data: Array
    },
    methods: {
      /*显示图书列表*/
      showBookList () {
        this.$router.push('/store/list')
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .recommend {
    .recommend-list {
      width: 100%;
      @include top;
      padding: 0 px2rem(5);
      box-sizing: border-box;

      .recommend-item {
        flex: 0 0 33.33%;
        width: 33.33%;
        padding: 0 px2rem(5);
        box-sizing: border-box;

        .img-wrapper {
          @include center;

          .img {
            width: 80%;
          }
        }

        .content-wrapper {
          width: 100%;
          margin-top: px2rem(10);
          @include columnCenter;

          .title {
            text-align: center;
          }

          .num {
            margin-top: px2rem(5);
          }
        }
      }
    }
  }
</style>
