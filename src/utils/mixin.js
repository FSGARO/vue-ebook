import { mapActions, mapGetters } from 'vuex'
import { addCss, getReadTimeByMinute, removeAllCss, themeList } from './book'
import { saveLocation } from './localStorage'
/*mapActions是混入methods中*/
export const ebookMinx = {
  computed: {
    ...mapGetters([
      'menuVisible',
      'fileName',
      'settingVisible',
      'defaultFontSize',
      'defaultFontFamily',
      'fontFamilyVisible',
      'defaultTheme',
      'bookAvailable',
      'progress',
      'section',
      'isPaginating',
      'currentBook',
      'navigation',
      'cover',
      'metadata',
      'paginate',
      'pagelist',
      'offsetY',
      'isBookmark',
      'speakingIconBottom'
    ]),
    /*主题数组*/
    themeList () {
      return themeList(this)
    },

    /*  getSectionName() {
        if (this.section) {
          const section = this.currentBook.section(this.section)
          if (section && section.href && this.currentBook && this.currentBook.navigation) {
            // return this.currentBook.navigation.get(section.href).label
            return this.navigation[this.section].label
          }
        }
      }*/
  },
  methods: {
    ...mapActions([
      'setFileName',
      'setMenuVisible',
      'setSettingVisible',
      'setDefaultFontSize',
      'setDefaultFontFamily',
      'setFontFamilyVisible',
      'setDefaultTheme',
      'setBookAvailable',
      'setProgress',
      'setSection',
      'setIsPaginating',
      'setCurrentBook',
      'setNavigation',
      'setCover',
      'setMetadata',
      'setPaginate',
      'setPagelist',
      'setOffsetY',
      'setIsBookmark',
      'setSpeakingIconBottom'
    ]),
    /*初始化全局样式 动态添加css*/
    initGlobalStyle () {
      removeAllCss()
      switch (this.defaultTheme) {
        case 'Default':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_Default.css`)
          break
        case  'Gold':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`)
          break
        case 'Eye':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`)
          break
        case 'Night':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`)
          break
        default:
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
          break
      }
    },
    /*刷新位置*/
    refreshLocation () {
      const currentLocation = this.currentBook.rendition.currentLocation()
      /*章节开始位置*/
      if (currentLocation && currentLocation.start) {
        const startCfi = currentLocation.start.cfi
        const progress = this.currentBook.locations.percentageFromCfi(startCfi)
        this.setProgress(Math.floor(progress * 100))
        this.setSection(currentLocation.start.index)
        saveLocation(this.fileName, startCfi) /*保存位置*/
      }
    },
    display (target, cb) {
      if (target) {
        this.currentBook.rendition.display(target).then(() => {
          this.refreshLocation()
          if (cb) cb() /*回调*/
        })
      } else {
        this.currentBook.rendition.display().then(() => {
          this.refreshLocation()
          if (cb) cb()
        })
      }
    },
    /*隐藏*/
    hideTitleAndMenu () {
      this.setMenuVisible(false)//换页时自动关闭
      this.setSettingVisible(-1) /*关闭后自动隐藏字体选项*/
      this.setFontFamilyVisible(false)/*关闭后自动隐藏字体选择界面*/
    },
    /*获取阅读时间与文本*/
    getReadTimeText () {
      return this.$t('book.haveRead').replace('$1', getReadTimeByMinute(this.fileName))
    },
  }
}
