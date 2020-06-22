<!--阅读-->
<template>
  <!-- <div class="ebook-reader">
     <div id="read"></div>
   </div>-->
  <div class="read-wrapper">
    <div id="read"></div>
  </div>
</template>
<script>
  import { ebookMinx } from '../../utils/mixin'
  import Epub from 'epubjs'
  import {
    getFontFamily,
    getFontSize,
    getTheme,
    saveFontFamily,
    saveFontSize,
    saveTheme
  } from '../../utils/localStorage'
  import { addCss, themeList } from '../../utils/book'

  global.ePub = Epub
  export default {
    mixins: [ebookMinx], /*利用vuex的mixins精简代码,实现组件复用*/
    methods: {
      /*上一页*/
      prevPage () {
        if (this.rendition) {
          this.rendition.prev()
          this.hideTitleAndMenu()
        }
      },
      /*下一页*/
      nextPage () {
        if (this.rendition) {
          this.rendition.next()
          this.hideTitleAndMenu()
        }
      },
      /* 点击*/
      toggleTitleAndMenu () {
        /*this.$store.dispatch('setMenuVisible', !this.menuVisible)
        * 使用了mapActions精简代码 直接this.setMenuVisible()*/
        if (this.menuVisible) {
          this.setSettingVisible(-1)
        }
        this.setMenuVisible(!this.menuVisible)
        this.setFontFamilyVisible(false)
      },
      hideTitleAndMenu () {
        this.setMenuVisible(false)//换页时自动关闭
        this.setSettingVisible(-1) /*关闭后自动隐藏字体选项*/
        this.setFontFamilyVisible(false)/*关闭后自动隐藏字体选择界面*/
      },
      /*初始化字体大小*/
      initFontSize () {
        let fontSize = getFontSize(this.fileName)
        if (!fontSize) {
          saveFontSize(this.fileName, this.defaultFontSize)
        } else {
          this.setDefaultFontSize(fontSize)
          this.rendition.themes.fontSize(`${fontSize}px`)
        }
      },
      /*初始化字体*/
      initFontFamily () {
        let font = getFontFamily(this.fileName)
        if (!font) {
          /*不存在*/
          saveFontFamily(this.fileName, this.defaultFontFamily)
        } else {
          /*有就设置字体*/
          this.rendition.themes.font(font)/*设置字体*/
          this.setDefaultFontFamily(font)/*更新面板*/
        }
      },
      /*设置主题*/
      initTheme(){
        let defaultTheme=getTheme(this.fileName)
        if (!defaultTheme){
          defaultTheme=this.themeList[0].name
          saveTheme(this.fileName,defaultTheme)
        }
        this.setDefaultTheme(defaultTheme)
        this.themeList.forEach(theme=>{
          this.rendition.themes.register(theme.name,theme.style) /*注册*/
        })
        this.rendition.themes.select(defaultTheme)/*默认样式*/
      },
      /*加载Epub*/
      initEpub () {
        const url = `${process.env.VUE_APP_RES_URL}/epub/` + this.fileName + '.epub'
        this.book = new Epub(url)
        /*把书传入currentBook*/
        this.setCurrentBook(this.book)
        this.rendition = this.book.renderTo('read', {
          width: window.innerWidth,
          height: window.innerHeight
        })
        /*渲染*/
        /*异步调用 设置字体*/
        this.rendition.display().then(() => {
          this.initTheme()
          this.initFontSize()
          this.initFontFamily()
          this.initGlobalStyle()
        })

        this.rendition.themes.fontSize(24 + '')
        /*开始触摸*/
        this.rendition.on('touchstart', event => {
          this.touchStartX = event.changedTouches[0].clientX
          this.touchStartTime = event.timeStamp
        })
        /*触摸结束*/
        this.rendition.on('touchend', event => {
          const offsetX = event.changedTouches[0].clientX - this.touchStartX/*X轴移动距离*/
          const time = event.timeStamp - this.touchStartTime/*触摸时间*/
          /*触摸小于0.5秒，距离大于40*/
          if (time < 500 && offsetX > 40) {
            this.prevPage()
          } else if (time < 500 && offsetX < -40) {
            this.nextPage()
          } else {
            this.toggleTitleAndMenu()
          }
          event.passive = false
          event.stopPropagation()
        })
        /*阅读器渲染完后调用
        * contents管理资源*/
        this.rendition.hooks.content.register(contents => {
          /*es6的方法*/
          Promise.all(
            [
              /*addStylesheet 手动添加样式文件*/
              /*环境变量要停止后再次加载才生效*/
              contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
              contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`),
              contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`),
              contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`)
            ]
          ).then(() => {
          }) /*加载后的操作*/
        })
      }
    },
    mounted () {
      this.setFileName(this.$route.params.fileName.split('|').join('/')).then(() =>
        this.initEpub()
      )
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";
  .ebook-reader {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
