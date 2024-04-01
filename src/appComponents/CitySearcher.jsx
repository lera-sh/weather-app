import React, { useCallback, useContext, useState } from 'react'
import InputText from '../components/InputText'
import Button from '../components/Button'
import { observer } from 'mobx-react-lite'
import { Context } from '../utils/context'
import LanguageChanger from './LanguageChanger'
import { useTranslation } from 'react-i18next'

const CitySearcher = () => {
  const { t } = useTranslation()
  const [city, setCity] = useState('')
  const rootStore = useContext(Context)

  const handleCityChanges = useCallback((event) => setCity(event.target.value), [])

  const handleSearch = useCallback(
    async (event) => {
      event.preventDefault()
      rootStore.weatherdataStore.setCity(city)
      await rootStore.weatherdataStore.fetchWeatherData()
      await rootStore.weatherdataStore.forwardGeocoding()
      await rootStore.weatherdataStore.reverseGeocoding()
      setCity('')
    },
    [rootStore, city]
  )

  return (
    <div className="flex justify-center py-4">
      <LanguageChanger />
      <form onSubmit={handleSearch}>
        <InputText onChange={handleCityChanges} placeholder={t('placeholder')} value={city} />
        <Button disabled={!city} text={t('searchButton')} type="submit" />
      </form>
    </div>
  )
}

export default observer(CitySearcher)
