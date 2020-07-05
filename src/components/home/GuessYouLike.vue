<!--猜你喜欢 -->
<template>
  <div class="guess-you-like">
    <!--换一批-->
    <title-view :btn="$t('home.change')" :label="$t('home.guessYouLike')" @onClick="change"></title-view>
    <div class="guess-you-like-list">
      <!--三本书-->
      <div :key="index" @click="showBookDetail(item)" class="guess-you-like-item" v-for="(item, index) in showData">
        <div class="img-wrapper">
          <!--图片-->
          <img :src="item.cover" class="img" v-lazy="item.cover">
        </div>
        <div class="content-wrapper">
          <!--书名-->
          <div class="title title-big" ref="title">{{item.title}}</div>
          <!--作者-->
          <div class="author sub-title" ref="author">{{item.author}}</div>
          <!--推荐信息-->
          <div class="result third-title" ref="result">{{resultText(item)}}</div>
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
    watch: {
      data (v) {
        this.total = v.length / 3 /* */
      }
    },
    computed: {
      showData () {
        if (this.data) {
          return [
            this.data[this.index],/*1*/
            this.data[this.index + this.total],/*4*/
            this.data[this.index + this.total * 2]/*7*/
          ]
        } else {
          return []
        }
      }
    },
    data () {
      return {
        index: 0,
        total: 0
      }
    },
    methods: {
      change () {
        if (this.index + 1 >= this.total) {
          this.index = 0 /*归零*/
        } else {
          this.index++
        }
      },
      resultText (item) {
        if (item && item.type && item.result) {
          switch (item.type) {
            case 1:
              /*同作者*/
              return this.$t('home.sameAuthor').replace('$1', item.result)
            /*感兴趣也在读*/
            case 2:
              return this.$t('home.sameReader').replace('$1', item.result)
            /*阅读的人也在读*/
            case 3:
              return this.$t('home.readPercent').replace('$1', item.percent).replace('$2', item.result)
          }
        }
      },
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .guess-you-like {
    .guess-you-like-list {
      width: 100%;
      padding: 0 px2rem(10);
      box-sizing: border-box;

      .guess-you-like-item {
        display: flex;
        margin-top: px2rem(15);

        &:first-child {
          margin-top: px2rem(5);
        }

        .img-wrapper {
          flex: 0 0 20%;
          padding: px2rem(10) px2rem(10) px2rem(10) 0;
          box-sizing: border-box;

          .img {
            width: 100%;
          }
        }

        .content-wrapper {
          flex: 1;
          padding: px2rem(10) 0;
          box-sizing: border-box;

          .author {
            margin-top: px2rem(15);
          }

          .result {
            margin-top: px2rem(5);
          }
        }
      }
    }
  }
</style>
