<!--图书信息-->
<template>
  <div class="cover-title-wrapper">
    <!--封面-->
    <div class="cover-title-left-wrapper">
      <!--图片-->
      <img :src="cover" class="cover-img" v-lazy="cover">
    </div>
    <div class="cover-title-right-wrapper">
      <!--标题-->
      <div class="detail-cover-title-wrapper">
        <div class="cover-title-text">{{title}}</div>
      </div>
      <!--作者-->
      <div class="cover-author-wrapper">
        <div class="cover-author-text">{{author}}</div>
      </div>
      <!--简介-->
      <div class="detail-cover-description-wrapper">
        <div class="detail-cover-description-text">{{desc}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      cover: String,/*图片*/
      title: String,/*书名*/
      author: String,/*作者*/
      desc: String,/*简介*/
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .cover-title-wrapper {
    display: flex;
    width: 100%;
    padding: px2rem(10) 0;
    border-bottom: px2rem(1) solid #eee;
    box-sizing: border-box;

    .cover-title-left-wrapper {
      flex: 0 0 px2rem(103);
      padding: px2rem(10) 0 px2rem(10) px2rem(15);
      box-sizing: border-box;
      @include top;

      .cover-img {
        width: px2rem(103);
        height: px2rem(146);
      }
    }

    .cover-title-right-wrapper {
      flex: 1;
      padding: px2rem(10) px2rem(15);
      box-sizing: border-box;

      .detail-cover-title-wrapper {
        .cover-title-text {
          font-size: px2rem(24);
          line-height: px2rem(26);
          font-weight: bold;
          color: #333;
        }
      }

      .cover-author-wrapper {
        margin-top: px2rem(10);

        .cover-author-text {
          font-size: px2rem(14);
          line-height: px2rem(16);
          color: $color-blue;
        }
      }

      .detail-cover-description-wrapper {
        margin-top: px2rem(10);

        .detail-cover-description-text {
          font-size: px2rem(14);
          line-height: px2rem(16);
          color: #666;
          word-break: keep-all;
          white-space: normal;
          overflow: hidden;
          text-overflow: ellipsis;
          overflow-wrap: break-word;
        }
      }
    }
  }
</style>
