<template>
  <div class="ebook-slide-contents">
    <div class="slide-contents-search-wrapper">
      <!--搜索框-->
      <div class="slide-contents-search-input-wrapper">
        <!--图标-->
        <div class="slide-contents-search-icon">
          <span class="icon-search"></span>
        </div>
        <input :placeholder="$t('book.searchHint')"
               @click="showSearchPage"
               @keyup.enter.exact="search()"
               v-model="searchText"
               class="slide-contents-search-input"
               type="text"> <!--点击时显示取消-->
      </div>
      <!--取消按钮-->
      <div @click="hideSearchPage()"
           class="slide-contents-search-cancel"
           v-if="searchVisible">{{$t('book.cancel')}}
      </div>
    </div>
    <!--书信息-->
    <div class="slide-contents-book-wrapper" v-show="!searchVisible">
      <!--封面-->
      <div class="slide-contents-book-img-wrapper">
        <img :src="cover" class="slide-contents-book-img">
      </div>
      <!--书籍内容-->
      <div class="slide-contents-book-info-wrapper">
        <div class="slide-contents-book-title">
          <span class="slide-contents-book-title-text">{{metadata.title}}</span>
        </div>
        <div class="slide-contents-book-author">
          <span class="slide-contents-book-author-text">{{metadata.creator}}</span>
        </div>
      </div>
      <!--进度-->
      <div class="slide-contents-book-progress-wrapper">
        <div class="slide-contents-book-progress">
          <span class="progress">{{progress + '%'}}</span>
          <span class="progress-text">{{$t('book.haveRead2')}}</span>
        </div>
        <!--阅读时间-->
        <div class="slide-contents-book-time">{{getReadTimeText()}}</div>
      </div>
    </div>
    <scroll :bottom="48"
            :top="156"
            class="slide-contents-list"
            ref="scroll"
            v-show="!searchVisible">
      <div :key="index" class="slide-contents-item" v-for="(item, index) in navigation">
        <!--目录缩进-->
        <span :class="{'selected': section=== index}" :style="contentItemStyle(item)"
              @click="displayNavigation(item.href)"
              class="slide-contents-item-label">{{item.label}}</span>
        <span class="slide-contents-item-page">{{item.page}}</span>
      </div>
    </scroll>
    <scroll :bottom="48"
            :top="66"
            class="slide-search-list"
            v-show="searchVisible">
      <div :key="index"
           @click="displayNavigation(item.cfi, true)"
           class="slide-search-item"
           v-for="(item, index) in searchList"
           v-html="item.excerpt"></div>
    </scroll>
  </div>
</template>

<script>
  import { ebookMixin } from '../../utils/mixin'
  import Scroll from '../common/Scroll'
  import { px2rem } from '../../utils/utils'

  export default {
    mixins: [ebookMixin],
    name: 'EbookSlideContents',
    data () {
      return {
        searchVisible: false,
        searchList: null,/*结果*/
        searchText: null /*搜索文本*/
      }
    },
    methods: {
      /*搜索 epubjs*/
      doSearch (q) {
        return Promise.all(
          this.currentBook.spine.spineItems.map(
            section => section.load(this.currentBook.load.bind(this.currentBook))
              .then(section.find.bind(section, q))
              .finally(section.unload.bind(section)))
        ).then(results => Promise.resolve([].concat.apply([], results)))
      },

      /*隐藏取消按钮*/
      hideSearchPage () {
        this.searchVisible = false
        this.searchText = ''
        this.searchList = ''
      },
      showSearchPage () {
        this.searchVisible = true
      },
      /*缩进*/
      contentItemStyle (item) {
        /*一级15rem*/
        return {
          marginLeft: `${px2rem(item.level * 15)}rem`
        }
      },
      /*搜索*/
      search () {
        if (this.searchText && this.searchText.length > 0) {
          this.doSearch(this.searchText).then(list => {
            this.searchList = list
            this.searchList.map(item => {
              item.excerpt = item.excerpt.replace(this.searchText,
                `<span class="content-search-text">${this.searchText}</span>`)
            })
          })
        }
      },
      /*跳转*/
      displayNavigation (target, highlight = false) {
        this.display(target, () => {
          this.hideTitleAndMenu()
          if (highlight) {
            this.currentBook.rendition.annotations.highlight(target)
          }
        })
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .ebook-slide-contents {
    width: 100%;
    font-size: 0;

    .slide-contents-search-wrapper {
      display: flex;
      width: 100%;
      height: px2rem(36);
      margin: px2rem(20) 0 px2rem(10) 0;
      padding: 0 px2rem(15);
      box-sizing: border-box;

      .slide-contents-search-input-wrapper {
        flex: 1;
        border-radius: px2rem(3);
        @include center;

        .slide-contents-search-icon {
          flex: 0 0 px2rem(28);
          @include center;

          .icon-search {
            font-size: px2rem(12);
          }
        }

        .slide-contents-search-input {
          flex: 1;
          width: 100%;
          height: px2rem(32);
          font-size: px2rem(14);
          background: transparent;
          border: none;

          &:focus {
            outline: none;
          }
        }
      }

      .slide-contents-search-cancel {
        flex: 0 0 px2rem(50);
        font-size: px2rem(14);
        @include right;
      }
    }

    .slide-contents-book-wrapper {
      display: flex;
      width: 100%;
      height: px2rem(90);
      padding: px2rem(10) px2rem(15) px2rem(20) px2rem(15);
      box-sizing: border-box;

      .slide-contents-book-img-wrapper {
        flex: 0 0 px2rem(45);
        box-sizing: border-box;

        .slide-contents-book-img {
          width: px2rem(45);
          height: px2rem(60);
        }
      }

      .slide-contents-book-info-wrapper {
        flex: 1;
        @include columnLeft;

        .slide-contents-book-title {
          font-size: px2rem(14);
          line-height: px2rem(16);
          padding: 0 px2rem(10);
          box-sizing: border-box;
          @include left;

          .slide-contents-book-title-text {
            @include ellipsis2(1);
          }
        }

        .slide-contents-book-author {
          font-size: px2rem(12);
          line-height: px2rem(14);
          padding: 0 px2rem(10);
          box-sizing: border-box;
          margin-top: px2rem(5);
          @include left;

          .slide-contents-book-author-text {
            @include ellipsis2(1);
          }
        }
      }

      .slide-contents-book-progress-wrapper {
        flex: 0 0 px2rem(70);
        @include columnLeft;

        .slide-contents-book-progress {
          .progress {
            font-size: px2rem(14);
            line-height: px2rem(16);
          }

          .progress-text {
            font-size: px2rem(12);
            line-height: px2rem(14);
            margin-left: px2rem(2);
          }
        }

        .slide-contents-book-time {
          font-size: px2rem(12);
          line-height: px2rem(14);
          margin-top: px2rem(5);
        }
      }
    }

    .slide-contents-list {
      padding: 0 px2rem(15);
      box-sizing: border-box;

      .slide-contents-item {
        display: flex;
        padding: px2rem(20) 0;
        box-sizing: border-box;

        .slide-contents-item-label {
          flex: 1;
          font-size: px2rem(14);
          line-height: px2rem(16);
          @include ellipsis;
        }

        .slide-contents-item-page {
          flex: 0 0 px2rem(30);
          font-size: px2rem(10);
          @include right;
        }
      }
    }

    .slide-search-list {
      padding: 0 px2rem(15);
      box-sizing: border-box;

      .slide-search-item {
        font-size: px2rem(14);
        line-height: px2rem(16);
        padding: px2rem(20) 0;
        box-sizing: border-box;
      }
    }
  }
</style>
