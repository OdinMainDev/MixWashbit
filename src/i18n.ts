import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import es from './locales/es.json'
import fr from './locales/fr.json'
import ru from './locales/ru.json'
import zh from './locales/zh.json'

export const DEFAULT_LANGUAGE = 'ru'
const supportedLanguages = ['ru', 'en', 'zh', 'es', 'fr'] as const

const getInitialLanguage = () => {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE

  const stored = window.localStorage.getItem('lang')
  if (stored && supportedLanguages.includes(stored as (typeof supportedLanguages)[number])) {
    return stored
  }

  const browser = window.navigator.language.split('-')[0]
  if (browser && supportedLanguages.includes(browser as (typeof supportedLanguages)[number])) {
    return browser
  }

  return DEFAULT_LANGUAGE
}

const resources = {
  ru: { translation: ru },
  en: { translation: en },
  zh: { translation: zh },
  es: { translation: es },
  fr: { translation: fr },
} as const

i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: { escapeValue: false },
})

export default i18n
