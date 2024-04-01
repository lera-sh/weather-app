import React, { useCallback, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../utils/context'
import { useTranslation } from 'react-i18next'

const LanguageChanger = () => {
  const rootStore = useContext(Context)
  const { i18n } = useTranslation()

  const handleLanguageChange = useCallback(
    (event) => {
      i18n.changeLanguage(event.target.value)
      rootStore.weatherdataStore.setLanguage(event.target.value)
      rootStore.weatherdataStore.reverseGeocoding()
    },
    [rootStore, i18n]
  )

  return (
    <select
      className="mr-1 p-1"
      onChange={handleLanguageChange}
      value={rootStore.weatherdataStore.language}
    >
      <option value="en">En</option>
      <option value="ru">Ru</option>
    </select>
  )
}

export default observer(LanguageChanger)
