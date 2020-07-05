import { getBookShelf, saveBookShelf } from './localStorage'
/*卡片半圆列表*/

export const flapCardList = [
  {
    r: 255,
    g: 102,
    _g: 102,
    b: 159,
    imgLeft: 'url(' + require('@/assets/images/gift-left.png') + ')',/*左图*/
    imgRight: 'url(' + require('@/assets/images/gift-right.png') + ')',/*右图*/
    backgroundSize: '50% 50%',/*整个背景大小*/
    zIndex: 100,/*卡片位置 最上面*/
    rotateDegree: 0,/*转动角度*/
  },
  {
    r: 74,
    g: 171,
    _g: 171,
    b: 255,
    imgLeft: 'url(' + require('@/assets/images/compass-left.png') + ')',
    imgRight: 'url(' + require('@/assets/images/compass-right.png') + ')',
    backgroundSize: '50% 50%',
    zIndex: 99,
    rotateDegree: 0
  },
  {
    r: 255,
    g: 198,
    _g: 198,
    b: 102,
    imgLeft: 'url(' + require('@/assets/images/star-left.png') + ')',
    imgRight: 'url(' + require('@/assets/images/star-right.png') + ')',
    backgroundSize: '50% 50%',
    zIndex: 98,
    rotateDegree: 0
  },
  {
    r: 255,
    g: 102,
    _g: 102,
    b: 159,
    imgLeft: 'url(' + require('@/assets/images/heart-left.png') + ')',
    imgRight: 'url(' + require('@/assets/images/heart-right.png') + ')',
    backgroundSize: '50% 50%',
    zIndex: 97,
    rotateDegree: 0
  },
  {
    r: 59,
    g: 201,
    _g: 201,
    b: 22,
    imgLeft: 'url(' + require('@/assets/images/crown-left.png') + ')',
    imgRight: 'url(' + require('@/assets/images/crown-right.png') + ')',
    backgroundSize: '50% 50%',
    zIndex: 96,
    rotateDegree: 0
  },

]

/*通过id查找分类*/
export function getCategoryName (id) {
  switch (id) {
    case 1:
      return 'ComputerScience'
    case 2:
      return 'SocialSciences'
    case 3:
      return 'Economics'
    case 4:
      return 'Education'
    case 5:
      return 'Engineering'
    case 6:
      return 'Environment'
    case 7:
      return 'Geography'
    case 8:
      return 'History'
    case 9:
      return 'Laws'
    case 10:
      return 'LifeSciences'
    case 11:
      return 'Literature'
    case 12:
      return 'Biomedicine'
    case 13:
      return 'BusinessandManagement'
    case 14:
      return 'EarthSciences'
    case 15:
      return 'MaterialsScience'
    case 16:
      return 'Mathematics'
    case 17:
      return 'MedicineAndPublicHealth'
    case 18:
      return 'Philosophy'
    case 19:
      return 'Physics'
    case 20:
      return 'PoliticalScienceAndInternationalRelations'
    case 21:
      return 'Psychology'
    case 22:
      return 'Statistics'
  }
}

/*书架添加图标*/
export function appendAddToShelf (list) {
  list.push({
    id: -1,
    type: 3
  })
  return list
}

/*书架删除图标*/
export function removeAddFromShelf (list) {
  return list.filter(item => item.type !== 3)
}

/*添加到书架*/
export function addToShelf (book) {
  let shelfList = getBookShelf()/*获取书架数组*/
  shelfList = removeAddFromShelf(shelfList)/*去掉图标*/
  book.type = 1/*设置type*/
  shelfList.push(book)/*添加*/
  shelfList = computeId(shelfList)/*处理id*/
  shelfList = appendAddToShelf(shelfList)/*添加图标*/
  saveBookShelf(shelfList)/*保存书架*/
}

/*处理id*/
export function computeId (list) {
  return list.map((book, index) => {
    if (book.type === 1) {
      book.id = index + 1
    }
    return book
  })
}

export function removeFromBookShelf (book) {
  return getBookShelf().filter(item => {
    if (item.itemList) {
      item.itemList = removeAddFromShelf(item.itemList)
    }
    return item.fileName !== book.fileName
  })
}

/*分类的显示 国际化*/
export function categoryText (category, vue) {
  switch (category) {
    case 1:
      return vue.$t('category.computerScience')
    case 2:
      return vue.$t('category.socialSciences')
    case 3:
      return vue.$t('category.economics')
    case 4:
      return vue.$t('category.education')
    case 5:
      return vue.$t('category.engineering')
    case 6:
      return vue.$t('category.environment')
    case 7:
      return vue.$t('category.geography')
    case 8:
      return vue.$t('category.history')
    case 9:
      return vue.$t('category.laws')
    case 10:
      return vue.$t('category.lifeSciences')
    case 11:
      return vue.$t('category.literature')
    case 12:
      return vue.$t('category.biomedicine')
    case 13:
      return vue.$t('category.businessandManagement')
    case 14:
      return vue.$t('category.earthSciences')
    case 15:
      return vue.$t('category.materialsScience')
    case 16:
      return vue.$t('category.mathematics')
    case 17:
      return vue.$t('category.medicineAndPublicHealth')
    case 18:
      return vue.$t('category.philosophy')
    case 19:
      return vue.$t('category.physics')
    case 20:
      return vue.$t('category.politicalScienceAndInternationalRelations')
    case 21:
      return vue.$t('category.psychology')
    case 22:
      return vue.$t('category.statistics')
  }
}

export function gotoStoreHome (vue) {
  vue.$router.push({
    path: '/store/home',/*路径*/
  })
}

/*显示书籍信息*/
export function gotoBookDetail (vue, book) {
  /*路由跳转*/
  vue.$router.push({
    path: '/store/detail',/*路径*/
    /*参数*/
    query: {
      fileName: book.fileName,/*书名*/
      category: book.categoryText/*分类*/
    }
  })
}

/*分类的名称与id*/
export const categoryList = {
  'ComputerScience': 1,
  'SocialSciences': 2,
  'Economics': 3,
  'Education': 4,
  'Engineering': 5,
  'Environment': 6,
  'Geography': 7,
  'History': 8,
  'Laws': 9,
  'LifeSciences': 10,
  'Literature': 11,
  'Biomedicine': 12,
  'BusinessandManagement': 13,
  'EarthSciences': 14,
  'MaterialsScience': 15,
  'Mathematics': 16,
  'MedicineAndPublicHealth': 17,
  'Philosophy': 18,
  'Physics': 19,
  'PoliticalScienceAndInternationalRelations': 20,
  'Psychology': 21,
  'Statistics': 22
}


