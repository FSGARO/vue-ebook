<!--书籍详情-->
<template>
  <div class="book-detail">
    <detail-title :showShelf="true"
                  @back="back"
                  ref="title"></detail-title>
    <scroll :bottom="52"
            :top="42"
            @onScroll="onScroll"
            class="content-wrapper"
            ref="scroll">
      <book-info :author="author"
                 :cover="cover"
                 :desc="desc"
                 :title="title"></book-info>
      <div class="book-detail-content-wrapper">
        <!--版权-->
        <div class="book-detail-content-title">{{$t('detail.copyright')}}</div>
        <div class="book-detail-content-list-wrapper">
          <div class="book-detail-content-row">
            <!--出版社-->
            <div class="book-detail-content-label">{{$t('detail.publisher')}}</div>
            <div class="book-detail-content-text">{{publisher}}</div>
          </div>
          <div class="book-detail-content-row">
            <!--分类-->
            <div class="book-detail-content-label">{{$t('detail.category')}}</div>
            <div class="book-detail-content-text">{{categoryText}}</div>
          </div>
          <div class="book-detail-content-row">
            <!--语言-->
            <div class="book-detail-content-label">{{$t('detail.lang')}}</div>
            <div class="book-detail-content-text">{{lang}}</div>
          </div>
          <div class="book-detail-content-row">
            <!--ISBN-->
            <div class="book-detail-content-label">{{$t('detail.ISBN')}}</div>
            <div class="book-detail-content-text">{{isbn}}</div>
          </div>
        </div>
      </div>
      <div class="book-detail-content-wrapper">
        <!--目录-->
        <div class="book-detail-content-title">{{$t('detail.navigation')}}</div>
        <div class="book-detail-content-list-wrapper">
          <div class="loading-text-wrapper" v-if="!this.navigation">
            <!--加载中...-->
            <span class="loading-text">{{$t('detail.loading')}}</span>
          </div>
          <div class="book-detail-content-item-wrapper">
            <div :key="index" @click="read(item)" class="book-detail-content-item"
                 v-for="(item, index) in flatNavigation">
              <div :class="{'is-sub': item.deep> 1}"
                   :style="itemStyle(item)"
                   class="book-detail-content-navigation-text"
                   v-if="item.label">{{item.label}}
              </div>
            </div>
          </div>
        </div>
      </div>
    <!--  <div class="book-detail-content-wrapper">
        <div class="book-detail-content-title">{{$t('detail.trial')}}</div>
        <div class="book-detail-content-list-wrapper">
          <div class="loading-text-wrapper" v-if="!this.displayed">
            <span class="loading-text">{{$t('detail.loading')}}</span>
          </div>
        </div>
        <div id="preview" ref="preview" v-show="this.displayed"></div>
      </div>-->
    </scroll>
    <div class="bottom-wrapper">
      <div @click.stop.prevent="readBook()" class="bottom-btn">{{$t('detail.read')}}</div>
      <!--  <div @click.stop.prevent="trialListening()" class="bottom-btn">{{$t('detail.listen')}}</div>-->
      <div @click.stop.prevent="addOrRemoveShelf()" class="bottom-btn">
        <span class="icon-check" v-if="inBookShelf"></span>
        {{inBookShelf ? $t('detail.isAddedToShelf') : $t('detail.addOrRemoveShelf')}}
      </div>
    </div>
    <toast :text="toastText" ref="toast"></toast>
  </div>
</template>

<script>
  import DetailTitle from '../../components/detail/DetaiTitle'
  import BookInfo from '../../components/detail/BookInfo'
  import Scroll from '../../components/common/Scroll'
  import Toast from '../../components/common/Toast'
  import { detail } from '../../api/store'
  import { px2rem, realPx } from '../../utils/utils'
  import Epub from 'epubjs'

  global.ePub = Epub

  export default {
    components: {
      DetailTitle,
      Scroll,
      BookInfo,
      Toast
    },
    computed: {
      desc () {
        if (this.description) {
          return this.description.substring(0, 100)
        } else {
          return ''
        }
      },
      flatNavigation () {
        if (this.navigation) {
          return Array.prototype.concat.apply([], Array.prototype.concat.apply([], this.doFlatNavigation(this.navigation.toc)))
        } else {
          return []
        }
      },

      lang () {
        return this.metadata ? this.metadata.language : '-'
      },
      isbn () {
        return this.metadata ? this.metadata.identifier : '-'
      },
      publisher () {
        return this.metadata ? this.metadata.publisher : '-'
      },
      title () {
        return this.metadata ? this.metadata.title : ''
      },
      /*获取作者*/
      author () {
        return this.metadata ? this.metadata.creator : ''
      },
      inBookShelf () {
        if (this.bookItem && this.bookShelf) {
          const flatShelf = (function flatten (arr) {
            return [].concat(...arr.map(v => v.itemList ? [v, ...flatten(v.itemList)] : v))
          })(this.bookShelf).filter(item => item.type === 1)
          const book = flatShelf.filter(item => item.fileName === this.bookItem.fileName)
          return book && book.length > 0
        } else {
          return false
        }
      }
    },
    data () {
      return {
        bookItem: null,
        book: null,
        metadata: null,
        trialRead: null,
        cover: null,
        navigation: null,
        displayed: false,
        audio: null,
        randomLocation: null,
        description: null,
        toastText: '',
        trialText: null,
        categoryText: null,
        opf: null
      }
    },
    methods: {
      addOrRemoveShelf () {
      },
      showToast (text) {
        this.toastText = text
        this.$refs.toast.show()
      },
      readBook () {
        this.$router.push({
          path: `/ebook/${this.categoryText}|${this.fileName}`
        })
      },
      /*   trialListening () {
         },*/
      read (item) {
        this.$router.push({
          path: `/ebook/${this.categoryText}|${this.fileName}`
        })
      },
      itemStyle (item) {
        return {
          marginLeft: (item.deep - 1) * px2rem(20) + 'rem'
        }
      },
      doFlatNavigation (content, deep = 1) {
        const arr = []
        content.forEach(item => {
          item.deep = deep
          arr.push(item)
          if (item.subitems && item.subitems.length > 0) {
            arr.push(this.doFlatNavigation(item.subitems, deep + 1))
          }
        })
        return arr
      },
      downloadBook () {
        const opf = `${process.env.VUE_APP_EPUB_URL}/${this.bookItem.categoryText}/${this.bookItem.fileName}/OEBPS/package.opf`
        this.parseBook(opf)
      },
      /*解析电子书*/
      parseBook (url) {
        this.book = new Epub(url)
        this.book.loaded.metadata.then(metadata => {
          this.metadata = metadata
        })
        this.book.loaded.navigation.then(nav => {
          this.navigation = nav
          if (this.navigation.toc && this.navigation.toc.length > 1) {
            const candisplay = this.display(this.navigation.toc[1].href)
            if (candisplay) {
              candisplay.then(section => {
                if (this.$refs.scroll) {
                  this.$refs.scroll.refresh()
                }
                this.displayed = true
                const reg = new RegExp('<.+?>', 'g')
                const text = section.output.replace(reg, '').replace(/\s\s/g, '')
                this.description = text
              })
            }
          }
        })
      },
      /*初始化*/
      init () {
        this.fileName = this.$route.query.fileName
        this.categoryText = this.$route.query.category
        if (this.fileName) {
          detail({
            fileName: this.fileName/*传入fileName获取图书信息*/
          }).then(response => {
            if (response.data.status === 200 && response.data) {
              const data = response.data.data
              this.bookItem = data
              this.cover = this.bookItem.cover
              let rootFile = data.rootFile
              /*去掉斜杠*/
              if (rootFile.startsWith('/')) {
                rootFile = rootFile.substring(1, rootFile.length)
              }
              this.opf = `${process.env.VUE_APP_EPUB_OPF_URL}/${this.fileName}/${rootFile}`
              /*解析电子书*/
              this.parseBook(this.opf)
            } else {
              this.showToast(response.data.msg)
            }
          })
        }
      },
      back () {
        this.$router.go(-1)/*返回*/
      },
      /*渲染*/
      display (location) {
        if (this.$refs.preview) {
          if (!this.rendition) {
            this.rendition = this.book.renderTo('preview', {
              width: window.innerWidth > 640 ? 640 : window.innerWidth,
              height: window.innerHeight,
              method: 'default'
            })
          }
          if (!location) {
            return this.rendition.display()
          } else {
            return this.rendition.display(location)
          }
        }
      },
      onScroll (offsetY) {
        if (offsetY > realPx(42)) {
          this.$refs.title.showShadow()/*显示*/
        } else {
          this.$refs.title.hideShadow()/*隐藏*/
        }
      }
    },
    mounted () {
      this.init()
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .book-detail {
    width: 100%;
    background: white;

    .content-wrapper {
      width: 100%;

      .book-detail-content-wrapper {
        width: 100%;
        border-bottom: px2rem(1) solid #eee;
        box-sizing: border-box;

        .book-detail-content-title {
          font-size: px2rem(20);
          font-weight: bold;
          padding: px2rem(20) px2rem(15) px2rem(10) px2rem(15);
          box-sizing: border-box;
        }

        .book-detail-content-list-wrapper {
          padding: px2rem(10) px2rem(15);
          box-sizing: border-box;

          .loading-text-wrapper {
            width: 100%;

            .loading-text {
              font-size: px2rem(14);
              color: #666;
            }
          }

          .book-detail-content-row {
            display: flex;
            box-sizing: border-box;
            margin-bottom: px2rem(10);

            .book-detail-content-label {
              flex: 0 0 px2rem(70);
              font-size: px2rem(14);
              color: #666;
            }

            .book-detail-content-text {
              flex: 1;
              font-size: px2rem(14);
              color: #333;
            }
          }

          #preview {
          }

          .book-detail-content-item-wrapper {
            .book-detail-content-item {
              padding: px2rem(15) 0;
              font-size: px2rem(14);
              line-height: px2rem(16);
              color: #666;
              border-bottom: px2rem(1) solid #eee;

              &:last-child {
                border-bottom: none;
              }

              .book-detail-content-navigation-text {
                width: 100%;
                @include ellipsis;

                &.is-sub {
                  color: #666;
                }
              }
            }
          }
        }
      }

      .audio-wrapper {
        width: 100%;
        padding: px2rem(15);
        box-sizing: border-box;

        #audio {
          width: 100%;
        }
      }
    }

    .bottom-wrapper {
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 120;
      display: flex;
      width: 100%;
      height: px2rem(52);
      box-shadow: 0 px2rem(-2) px2rem(2) rgba(0, 0, 0, .1);

      .bottom-btn {
        flex: 1;
        color: $color-blue;
        font-weight: bold;
        font-size: px2rem(14);
        @include center;

        &:active {
          color: $color-blue-transparent;
        }

        .icon-check {
          margin-right: px2rem(5);
        }
      }

      &.hide-shadow {
        box-shadow: none;
      }
    }
  }
</style>
