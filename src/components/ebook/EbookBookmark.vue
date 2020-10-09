<template>
  <div class="ebook-bookmark" ref="bookmark">
    <div class="ebook-bookmark-text-wrapper">
      <!--下拉-->
      <div class="ebook-bookmark-down-wrapper" ref="iconDown">
        <!--下拉图标--> <span class="icon-down"></span>
      </div>
      <!--文本-->
      <div class="ebook-bookmark-text">{{text}}</div>
    </div>
    <!--书签图标-->
    <div :style="isFixed ? fixedStyle : {}" class="ebook-bookmark-icon-wrapper">
      <bookmark :color="color" :height="35" :width="15"></bookmark>
    </div>
  </div>
</template>

<script>
  import Bookmark from '../common/Bookmark'
  import { realPx } from '../../utils/utils'
  import { ebookMixin } from '../../utils/mixin'
  import { getBookmark, saveBookmark } from '../../utils/localStorage'

  const BLUE = '#346cbc'
  const WHITE = '#ffb400'
  export default {
    mixins: [ebookMixin],
    components: {
      Bookmark
    },
    computed: {
      height () {
        return realPx(35)
      },
      /*临界值*/
      threshold () {
        return realPx(55)
      },
      /*书签固定样式*/
      fixedStyle () {
        return {
          position: 'fixed',
          right: `${(window.innerWidth - this.$refs.bookmark.clientWidth) / 2}px`,
          top: 0
        }
      }
    },
    watch: {
      offsetY (v) {
        if (!this.bookAvailable || this.menuVisible || this.settingVisible >= 0) {
          return
        }
        if (v >= this.height && v <= this.threshold) {
          this.beforThreshold(v)
        } else if (v >= this.threshold) {
          this.atterThreshold(v)
        } else if (v > 0 && v < this.height) {
          /*1*/
          this.beforeHeight()
        } else if (v === 0) {
          this.restore()
        }
      },
      isBookmark (isBookmark) {
        this.isFixed = isBookmark
        if (isBookmark) {
          this.color = BLUE
          /*this.isFixed=true*/
        } else {
          this.color = WHITE
          /* this.isFixed=false*/
        }
      }
    },
    data () {
      return {
        text: '',
        color: BLUE,
        isFixed: false
      }
    },
    methods: {
      /*1:未超过书签高度*/
      beforeHeight () {
        if (this.isBookmark) {
          this.text = this.$t('book.pulldownDeleteMark')
          this.color = BLUE
          this.isFixed = true
        } else {
          this.text = this.$t('book.pulldownAddMark')
          this.color = WHITE
          this.isFixed = false
        }

      },
      /*2:未到达临界状态*/
      beforThreshold (v) {
        /*固定*/
        this.$refs.bookmark.style.top = `${-v}px`
        /*区分书签*/
        this.beforeHeight()
        /*图标旋转*/
        if (this.$refs.iconDown.style.transform === 'rotate(180deg)') {
          this.$refs.iconDown.style.transform = 'rotate(0deg)'
        }
      },
      /*3:超过临界状态*/
      atterThreshold (v) {
        this.$refs.bookmark.style.top = `${-v}px`
        /*区分书签*/
        if (this.isBookmark) {
          this.text = this.$t('book.releaseDeleteMark')
          this.color = WHITE
          this.isFixed = false
        } else {
          this.text = this.$t('book.releaseAddMark')
          this.color = BLUE
          this.isFixed = true
        }
        if (this.$refs.iconDown.style.transform === 'rotate(0deg)' ||
          this.$refs.iconDown.style.transform === '') {
          this.$refs.iconDown.style.transform = 'rotate(180deg)'
        }

      },
      /*4:归位*/
      restore () {
        setTimeout(() => {
          this.$refs.bookmark.style.top = `${-this.height}px`
          this.$refs.iconDown.style.transform = 'rotate(0deg)'
        }, 200)
        if (this.isFixed) {
          this.setIsBookmark(true)
          this.addBookMark()
        } else {
          this.setIsBookmark(false)
          this.removeBookMark()
        }
      },
      /*添加书签*/
      addBookMark () {
        /*获取cfi*/
        this.bookmark = getBookmark(this.fileName)
        if (!this.bookmark) {
          this.bookmark = []
        }
        const currentLocation = this.currentBook.rendition.currentLocation()
        const cfibase = currentLocation.start.cfi.replace(/!.*/, '')
        const cfistart = currentLocation.start.cfi.replace(/.*!/, '')
          .replace(/\)$/, '')
        const cfiend = currentLocation.end.cfi.replace(/.*!/, '')
          .replace(/\)$/, '')
        const cfirange = `${cfibase}!,${cfistart},${cfiend})`
        this.currentBook.getRange(cfirange).then(range => {
          const text = range.toString().replace(/\s\s/g, '')/*文本*/
          this.bookmark.push({
            cfi: currentLocation.start.cfi,
            text: text
          })
          saveBookmark(this.fileName, this.bookmark)
        })
      },
      removeBookMark () {
        const currentLocation = this.currentBook.rendition.currentLocation()
        const cfi = currentLocation.start.cfi
        this.bookmark = getBookmark(this.fileName)
        if (this.bookmark) {
          saveBookmark(this.fileName, this.bookmark.filter(item => item.cfi !== cfi))
          this.setIsBookmark(false)
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .ebook-bookmark {
    position: absolute;
    top: px2rem(-35);
    left: 0;
    z-index: 200;
    width: 100%;
    height: px2rem(35);

    .ebook-bookmark-text-wrapper {
      position: absolute;
      right: px2rem(45);
      bottom: 0;
      display: flex;

      .ebook-bookmark-down-wrapper {
        font-size: px2rem(14);
        color: #ff3500; /*-------------------------------------------------------------*/
        transition: all .2s linear;
        @include center;
      }

      .ebook-bookmark-text {
        font-size: px2rem(14);
        color: #ff0099;
      }
    }

    .ebook-bookmark-icon-wrapper {
      position: absolute;
      right: 0;
      bottom: 0;
      margin-right: px2rem(15);
    }
  }
</style>
