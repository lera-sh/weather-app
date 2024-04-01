import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        placeholder: 'Enter city',
        searchButton: 'Search',
        review: 'Review',
        feelsText: 'Feel like',
        humidityText: 'Humidity',
        uvText: 'UV-index',
        windText: 'Wind',
        mphText: 'mph'
      }
    },
    ru: {
      translation: {
        placeholder: 'Введите город',
        searchButton: 'Поиск',
        review: 'Обзор',
        feelsText: 'Ошущается как',
        humidityText: 'Влажность',
        uvText: 'UV-индекс',
        windText: 'Ветер',
        mphText: 'м/ч'
      }
    }
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
})

export default i18n
