import React, { useCallback, useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../utils/context'
import clsx from 'clsx'
import CitySearcher from './CitySearcher'
import CurrentcityInfo from './CurrentcityInfo'
import FuturedayComponent from './FuturedayComponent'
import Map from './MapComponent'
import ReviewComponent from './ReviewComponent'
import { backgrounds } from '../utils/backgrounds'

const WeatherPage = () => {
  const rootStore = useContext(Context)

  useEffect(() => {
    rootStore.weatherdataStore.init()
  }, [rootStore])

  const handleBackground = useCallback(() => {
    const currentHour = rootStore.weatherdataStore.currentHour

    if ((currentHour >= 5 && currentHour <= 8) || (currentHour >= 17 && currentHour <= 20)) {
      return backgrounds.morningEvening
    } else if (currentHour >= 9 && currentHour <= 16) {
      return backgrounds.day
    } else {
      return backgrounds.night
    }
  }, [rootStore])

  return (
    <div className={clsx('w-160 p-5', handleBackground())}>
      <CitySearcher />
      <CurrentcityInfo />
      <ReviewComponent />
      <FuturedayComponent />
      <Map />
    </div>
  )
}

export default observer(WeatherPage)
