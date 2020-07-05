/*存储数据*/

import Storage from 'web-storage-cache'

const localStorage = new Storage()
/*获取*/
export function getLocalStorage (key) {
  return localStorage.get(key)
}
/*写入*/
export function setLocalStorage (key, value) {
  return localStorage.set(key, value)
}
/*删除*/
export function removeLocalStorage (key) {
  return localStorage.delete(key)
}
/*清空*/
export function clearLocalStorage () {
  return localStorage.clear()
}
/*获取字体大小*/
export function getFontSize (fileName) {
  return getBookObject(fileName, 'fontSize')
}
/*保存字体大小*/
export function saveFontSize (fileName, fontSize) {
  setBookObject(fileName, 'fontSize', fontSize)
}

/*获取语言*/
export function getLocale () {
  return getLocalStorage('locale')
}
/*保存语言*/
export function saveLocale (locale) {
  return setLocalStorage('locale', locale)
}

export function getLocation (fileName) {
  return getBookObject(fileName, 'location')
}

export function saveLocation (fileName, location) {
  setBookObject(fileName, 'location', location)
}

export function getBookmark (fileName) {
  return getBookObject(fileName, 'bookmark')
}

export function saveBookmark (fileName, bookmark) {
  setBookObject(fileName, 'bookmark', bookmark)
}
/*阅读时间*/
export function getReadTime (fileName) {
  return getBookObject(fileName, 'time')
}
export function saveReadTime (fileName, theme) {
  setBookObject(fileName, 'time', theme)
}
/*获取字体*/
export function getFontFamily (fileName) {
  return getBookObject(fileName, 'fontFamily')
}
/*保存字体*/
export function saveFontFamily (fileName, fontFamily) {
  setBookObject(fileName, 'fontFamily', fontFamily)
}
/*主题*/
export function getTheme (fileName) {
  return getBookObject(fileName, 'theme')
}
/*主题*/
export function saveTheme (fileName, theme) {
  setBookObject(fileName, 'theme', theme)
}

/*书*/
export function getBookObject (fileName, key) {
  if (getLocalStorage(`${fileName}-info`)) {
    return getLocalStorage(`${fileName}-info`)[key]
  } else {
    return null
  }
}

/*保存书架*/
export function saveBookShelf (shelf) {
  return setLocalStorage('shelf', shelf)
}

/*获取书架*/
export function getBookShelf () {
  return getLocalStorage('shelf')
}

/*书*/
export function setBookObject (fileName, key, value) {
  let book = {}
  if (getLocalStorage(`${fileName}-info`)) {
    book = getLocalStorage(`${fileName}-info`)
  }
  book[key] = value
  setLocalStorage(`${fileName}-info`, book)
}

export function getLocalForage (key, cb) {
  localForage.getItem(key, (err, value) => {
    cb(err, value)
  })
}

