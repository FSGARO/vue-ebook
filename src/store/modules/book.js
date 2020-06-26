const book = {
  state: {
    fileName: '', /*文件名,链接*/
    menuVisible: false, /*控制菜单是否显示*/
    settingVisible: -1, /*控制字体选项 -1不显示 0:字号,1:主题,2:进度,3:目录*/
    defaultFontSize: 16, /*默认字体大小*/
    defaultFontFamily: 'Default', /*默认字体*/
    fontFamilyVisible: false, /*字体选择界面是否显示*/
    defaultTheme: 'Default',/*默认主题*/
    bookAvailable: false,/*进度条状态 false为禁用*/
    progress: 0,/*进度条位置*/
    section: 0,/*当前章节位置*/
    isPaginating: true,
    currentBook: null, //解析的书
    navigation: null,/*目录*/
    cover: null,/*电子书的图片*/
    metadata: null,/*书籍信息*/
    paginate: '',
    pagelist: null,
    offsetY: 0,/*书签中拉下的距离*/
    isBookmark: null
    /*  speakingIconBottom: realPx(58)*/
  },

  mutations: {
    SET_FILENAME: (state, fileName) => {
      state.fileName = fileName
    },
    SET_MENU_VISIBLE: (state, visible) => {
      state.menuVisible = visible
    },
    SET_SETTING_VISIBLE: (state, visible) => {
      state.settingVisible = visible
    },
    SET_DEFAULT_FONT_SIZE: (state, fontSize) => {
      state.defaultFontSize = fontSize
    },
    SET_DEFAULT_FONT_FAMILY: (state, font) => {
      state.defaultFontFamily = font
    },
    SET_FONT_FAMILY_VISIBLE: (state, visible) => {
      state.fontFamilyVisible = visible
    },
    SET_DEFAULT_THEME: (state, theme) => {
      state.defaultTheme = theme
    },
    SET_BOOK_AVAILABLE: (state, bookAvailable) => {
      state.bookAvailable = bookAvailable
    },
    SET_PROGRESS: (state, progress) => {
      state.progress = progress
    },
    SET_SECTION: (state, section) => {
      state.section = section
    },
    SET_IS_PAGINATING: (state, isPaginating) => {
      state.isPaginating = isPaginating
    },
    SET_CURRENT_BOOK: (state, currentBook) => {
      state.currentBook = currentBook
    },
    SET_NAVIGATION: (state, navigation) => {
      state.navigation = navigation
    },
    SET_COVER: (state, cover) => {
      state.cover = cover
    },
    SET_METADATA: (state, metadata) => {
      state.metadata = metadata
    },
    SET_PAGINATE: (state, paginate) => {
      state.paginate = paginate
    },
    SET_PAGELIST: (state, pagelist) => {
      state.pagelist = pagelist
    },
    SET_OFFSETY: (state, offsetY) => {
      state.offsetY = offsetY
    },
    SET_IS_BOOKMARK: (state, isBookmark) => {
      state.isBookmark = isBookmark
    },
    SET_SPEAKING_ICON_BOTTOM: (state, speakingIconBottom) => {
      state.speakingIconBottom = speakingIconBottom
    }
  },
  actions: {}
}
export default book
