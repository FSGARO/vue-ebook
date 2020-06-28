<!--阅读-->
<template>
  <div class="ebook-reader">
    <div @click="onMaskClick"
         @mousedown.left="onMouseEnter"
         @mousemove.left="onMouseMove"
         @mouseup.left="onMouseEnd"
         @touchend="moveEnd"
         @touchmove="move"
         class="ebook-reader-mask">

    </div>
    <div id="read"></div>
  </div>
</template>

<script>
  import { ebookMixin } from '../../utils/mixin'
  import Epub from 'epubjs'
  import { flatten } from '../../utils/book'
  import {
    getFontFamily,
    getFontSize,
    getLocation,
    getTheme,
    saveFontFamily,
    saveFontSize,
    saveTheme
  } from '../../utils/localStorage'

  global.ePub = Epub
  export default {
    mixins: [ebookMixin], /*利用vuex的mixins精简代码,实现组件复用*/
    methods: {
      // 1 - 鼠标进入
      // 2 - 鼠标进入后的移动
      // 3 - 鼠标从移动状态松手
      // 4 - 鼠标还原
      onMouseEnter (e) {
        this.mouseState = 1
        this.mouseStartTime = e.timeStamp /*鼠标时间*/
        e.preventDefault()
        e.stopPropagation()
      },
      onMouseMove (e) {
        if (this.mouseState === 1) {
          this.mouseState = 2
        } else if (this.mouseState === 2) {
          let offsetY = 0
          if (this.firstOffsetY) {
            offsetY = e.clientY - this.firstOffsetY
            this.setOffsetY(offsetY)
          } else {
            this.firstOffsetY = e.clientY
          }
        }
        e.preventDefault()
        e.stopPropagation()
      },
      onMouseEnd (e) {
        if (this.mouseState === 2) {
          this.setOffsetY(0)
          this.firstOffsetY = null
          this.mouseState = 3
        } else {
          this.mouseState = 4
        }
        /*用鼠标点击时间优化*/
        const time = e.timeStamp - this.mouseStartTime
        if (time < 200) {
          this.mouseState = 4
        }
        e.preventDefault()
        e.stopPropagation()
      },
      move (e) {
        let offsetY = 0
        if (this.firstOffsetY) {
          offsetY = e.changedTouches[0].clientY - this.firstOffsetY
          this.setOffsetY(offsetY)
        } else {
          /*changedTouches 触摸点*/
          this.firstOffsetY = e.changedTouches[0].clientY
        }
        e.preventDefault()
        e.stopPropagation()
      },
      moveEnd (e) {
        this.setOffsetY(0)
        this.firstOffsetY = null
      },
      /*蒙版点击*/
      onMaskClick (e) {
        if (this.mouseState && (this.mouseState === 2 || this.mouseState === 3)) {
          return
        }
        const offsetX = e.offsetX
        const width = window.innerWidth
        if (offsetX > 0 && offsetX < width * 0.3) {
          this.prevPage()
        } else if (offsetX > 0 && offsetX > width * 0.7) {
          this.nextPage()
        } else {
          this.toggleTitleAndMenu()
        }
      },
      /*上一页*/
      prevPage () {
        if (this.rendition) {
          this.rendition.prev().then(() => {
            this.refreshLocation()
          })
          this.hideTitleAndMenu()
        }
      },
      /*下一页*/
      nextPage () {
        if (this.rendition) {
          this.rendition.next().then(() => {
            this.refreshLocation()
          })
          this.hideTitleAndMenu()
        }
      },
      /* 点击*/
      toggleTitleAndMenu () {
        /*this.$store.dispatch('setMenuVisible', !this.menuVisible)
        * 使用了mapActions精简代码 直接this.setMenuVisible()*/
        if (this.menuVisible) {
          this.setSettingVisible(-1)
          this.setFontFamilyVisible(false)
        }
        this.setMenuVisible(!this.menuVisible)
      },
      /*初始化字体大小*/
      initFontSize () {
        let fontSize = getFontSize(this.fileName)
        if (!fontSize) {
          saveFontSize(this.fileName, this.defaultFontSize)
        } else {
          this.rendition.themes.fontSize(`${fontSize}px`)
          this.setDefaultFontSize(fontSize)
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
      initTheme () {
        let defaultTheme = getTheme(this.fileName)
        if (!defaultTheme) {
          defaultTheme = this.themeList[0].name
          saveTheme(this.fileName, defaultTheme)
        }
        this.setDefaultTheme(defaultTheme)
        this.themeList.forEach(theme => {
          this.rendition.themes.register(theme.name, theme.style) /*注册*/
        })
        this.rendition.themes.select(defaultTheme)/*默认样式*/
      },
      /*渲染的初始化过程*/
      initRendition () {
        this.rendition = this.book.renderTo('read', {
          width: window.innerWidth,
          height: window.innerHeight,
          /* method: 'default'*/
          /*flow: 'scrolled'*/
        })
        const location = getLocation(this.fileName)
        /*location载入 初始化*/
        this.display(location, () => {
          this.initTheme()
          this.initFontSize()
          this.initFontFamily()
          this.initGlobalStyle()
        })
        /*阅读器渲染完后调用
        * contents管理资源*/
        this.rendition.hooks.content.register(contents => {
          /*es6的方法*/
          Promise.all([
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
      },
      /*手势*/
      initGesture () {
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
      },
      /*获取书的图片,基本信息*/
      parseBook () {
        this.book.loaded.cover.then(cover => {
          /*生成链接后保存*/
          this.book.archive.createUrl(cover).then(url => {
            this.setCover(url)
          })
        })
        /*图书信息*/
        this.book.loaded.metadata.then(metadata => {
          this.setMetadata(metadata)
        })
        /*图书章节*/
        this.book.loaded.navigation.then(nav => {
          const navItem = flatten(nav.toc) /*获取章节数组*/

          /*目录处理*/
          function find (item, level = 0) {
            return !item.parent ? level : find(navItem.filter(parentItem => parentItem.id === item.parent)[0], ++level)
            /*   if (!item.parent){
               return level
             }else{
               return find(navItem.filter(parebtItem=>parebtItem.id===item.parent[0],++level))
             }*/
          }

          navItem.forEach(item => {
            item.level = find(item)
          })
          /*目录*/
          this.setNavigation(navItem)
        })
      },
      /*加载Epub*/
      initEpub () {
        const url = `${process.env.VUE_APP_RES_URL}/epub/` + this.fileName + '.epub'
        this.book = new Epub(url)
        /*把书传入currentBook*/
        this.setCurrentBook(this.book)
        /*重构代码 渲染*/
        this.initRendition()
        this.parseBook()
        /*初始化手势*/
        /* this.initGesture()*/
        /*解析完成后 分页*/
        this.book.ready.then(() => {
          /*简单的分页算法 只能用来做进度百分比*/
          this.book.ready.then(() => {
            return this.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16))
          }).then(locations => {
            this.navigation.forEach(nav => {
              nav.pagelist = []/*默认为空*/
            })
            locations.forEach(item => {
              const loc = item.match(/\[(.*)\]!/)[1]
              this.navigation.forEach(nav => {
                if (nav.href) {
                  const href = nav.href.match(/^(.*)\.html$/)[1]
                  if (href === loc) {
                    nav.pagelist.push(item)
                  }
                }
              })
              let currentPage = 1
              this.navigation.forEach((nav, index) => {
                /*第一页*/
                if (index === 0) {
                  nav.page = 1
                } else {
                  nav.page = currentPage
                }
                currentPage += nav.pagelist.length + 1
              })
            })
            /*保存分页*/
            this.setPagelist(locations)
            this.setBookAvailable(true)
            this.refreshLocation()
          })
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

    .ebook-reader-mask {
      position: absolute;
      top: 0;
      left: 0;
      background: transparent;
      z-index: 150;
      width: 100%;
      height: 100%;
    }
  }
</style>
