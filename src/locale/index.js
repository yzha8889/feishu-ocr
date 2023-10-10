import { createI18n } from 'vue-i18n'
import { bitable } from '@lark-base-open/js-sdk'
import en from './en'
import cn from './zh'

const lang = await bitable.bridge.getLanguage()

const i18n = createI18n({
  locale: lang,
  fallbackLocale: 'en',
  allowComposition: true,
  messages: {
    en: en,
    zh: cn,
  },
})

export default i18n
