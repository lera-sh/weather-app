import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../utils/context'

const CurrentcityInfo = () => {
  const rootStore = useContext(Context)
  const { currentDate, currentPlace, currentTemperature, weatherIcon } = rootStore.weatherdataStore

  return (
    <div className="flex flex-col items-center">
      <p>{currentDate}</p>
      <p className="font-bold text-4xl text-center">{currentPlace ?? 'Unknown place'}</p>
      <p className="font-normal text-2xl pt-3">{currentTemperature ?? 'Loading...'}&deg;C</p>
      <img alt="weatherIcon" className="w-28" src={weatherIcon ?? 'Loading...'} />
    </div>
  )
}

export default observer(CurrentcityInfo)
