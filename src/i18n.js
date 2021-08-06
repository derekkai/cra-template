import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import en from './locales/en.json'
import zhCN from './locales/zh-CN.json'

const resources = {
  en: {
    translation: en,
  },
  'zh-CN': {
    translation: zhCN,
  },
}

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}.json',
    },
    resources,
    lng: 'zh-CN', // 預設語言
    fallbackLng: 'en', // 如果當前切換的語言沒有對應的翻譯則使用這個語言，
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
