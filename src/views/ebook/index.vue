<template>
  <div class="ebook">
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
    methods: {
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
</style>
