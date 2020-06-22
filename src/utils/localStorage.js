/*存储数据*/

import Storage from 'web-storage-cache'

const localStorage = new Storage()

/*写入*/
export function setLocalStorage (key, value) {
  return localStorage.set(key, value)
}

/*获取*/
export function getLocalStorage (key) {
  return localStorage.get(key)
}

export function removeLocalStorage (key) {
  return localStorage.delete(key)
}

/*清空*/
export function clearLocalStorage () {
  return localStorage.clear()
}
