import Vue from 'vue'
import VueI18N from 'vue-i18n'
import en from './en'
import cn from './cn'
import { getLocale, saveLocale } from '../utils/localStorage'

Vue.use(VueI18N)

const messages = {
  en,
  cn
}

let locale = getLocale()
/*没有就默认中文 保存*/
if (!locale) {
  let locale = 'cn'
  saveLocale(locale)
}

const i18n = new VueI18N({
  locale,
  messages
})
export default i18n
