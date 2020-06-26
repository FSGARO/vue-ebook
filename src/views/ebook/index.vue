<template>
  <div class="ebook" ref="ebook">
    <ebook-title></ebook-title>
    <ebook-reader></ebook-reader>
    <ebook-menu></ebook-menu>
  </div>
</template>

<script>
  import EbookReader from '../../components/ebook/EbookReader'
  import EbookTitle from '../../components/ebook/EbookTitle'
  import EbookMenu from '../../components/ebook/EbookMenu'
  import { getReadTime, saveReadTime } from '../../utils/localStorage'
  import { ebookMinx } from '../../utils/mixin'

  export default {
    mixins: [ebookMinx],
    components: {
      EbookReader,
      EbookTitle,
      EbookMenu
    },
    /*监听*/
    watch: {
      offsetY (v) {
        if (v > 0) {
          this.move(v)
        } else if (v === 0) {
          this.restore()
        }
      }
    },
    methods: {
      restore () {
        this.$refs.ebook.style.top = 0 + 'px'
        this.$refs.ebook.style.transition = 'all .2s linear'
        setTimeout(() => {
          this.$refs.ebook.style.transition = ''
        }, 200)
      },
      move (v) {
        this.$refs.ebook.style.top = v + 'px'
      },
      /*计时*/
      startLoopReadTime () {
        let redeTime = getReadTime(this.fileName)
        if (!redeTime) {
          redeTime = 0

        }
        this.task = setInterval(() => {
          redeTime++
          if (redeTime % 30 === 0) {
            saveReadTime(this.fileName, redeTime)
          }
        }, 1000)
      }
    },
    mounted () {
      this.startLoopReadTime()
    },
    /*在页面销毁前关闭*/
    beforeDestroy () {
      if (this.task) {
        clearInterval(this.task)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .ebook {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }
</style>
