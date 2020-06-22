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

export function getHome () {
  return getLocalStorage('home')
}

export function saveHome (home) {
  return setLocalStorage('home', home, 1800)
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

export function getReadTime (fileName) {
  return getBookObject(fileName, 'time')
}

export function saveReadTime (fileName, theme) {
  setBookObject(fileName, 'time', theme)
}

export function getProgress (fileName) {
  return getBookObject(fileName, 'progress')
}

export function saveProgress (fileName, progress) {
  setBookObject(fileName, 'progress', progress)
}

export function getNavigation (fileName) {
  return getBookObject(fileName, 'navigation')
}

export function saveNavigation (fileName, navigation) {
  setBookObject(fileName, 'navigation', navigation)
}

export function getMetadata (fileName) {
  return getBookObject(fileName, 'metadata')
}

export function saveMetadata (fileName, metadata) {
  setBookObject(fileName, 'metadata', metadata)
}

export function getCover (fileName) {
  return getBookObject(fileName, 'cover')
}

export function saveCover (fileName, cover) {
  setBookObject(fileName, 'cover', cover)
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
/*书*/
export function setBookObject (fileName, key, value) {
  let book = {}
  if (getLocalStorage(`${fileName}-info`)) {
    book = getLocalStorage(`${fileName}-info`)
  }
  book[key] = value
  setLocalStorage(`${fileName}-info`, book)
}
