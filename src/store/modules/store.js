
const store = {
  state: {
    hotSearchOffsetY: 0,/*搜索页面滑动距离*/
    flapCardVisible: false,/*卡片是否显示*/
    shelfList: [{
      'id': 1,
      'fileName': '2014_Book_TheInfoSecHandbook',
      'cover': 'http://47.99.166.157/book/res/img//ComputerScience/2014_Book_TheInfoSecHandbook.jpeg',
      'title': 'The InfoSec Handbook',
      'author': 'Umesh Hodeghatta Rao and Umesha Nayak',
      'publisher': 'Apress, Berkeley, CA',
      'bookId': '2014_Book_TheInfoSecHandbook',
      'category': 1,
      'categoryText': 'ComputerScience',
      'language': 'en',
      'rootFile': 'OEBPS/content.opf',
      'selected': false,
      'private': true,
      'cache': true,
      'haveRead': 0,
      'type': 1
    },
      {
        'id': 13,
        'fileName': '2016_Book_DissectingTheCriminalCorpse',
        'cover': 'http://47.99.166.157/book/res/img//History/2016_Book_DissectingTheCriminalCorpse.jpeg',
        'title': 'Dissecting the Criminal Corpse',
        'author': 'Elizabeth T. Hurren',
        'publisher': 'Palgrave Macmillan UK, London',
        'bookId': '2016_Book_DissectingTheCriminalCorpse',
        'category': 8,
        'categoryText': 'History',
        'language': 'en',
        'rootFile': 'OEBPS/content.opf',
        'selected': false,
        'private': false,
        'cache': false,
        'haveRead': 0,
        'type': 1
      },
      { 'type': 3 }
    ],/*书架图书列表*/
  },
  mutations: {
    SET_HOT_SEARCH_OFFSETY: (state, offsetY) => {
      state.hotSearchOffsetY = offsetY
    },
    SET_FLAP_VISIBLE: (state, visible) => {
      state.flapCardVisible = visible
    },
    SET_SHELF_LIST (state, list) {
      state.shelfList = list
    },
  },
}
export default store
