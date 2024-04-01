import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import formatDate from '../utils/formatDate'
import { Context } from '../utils/context'

const FutureforecastComponent = ({ data }) => {
  const rootStore = useContext(Context)

  return (
    <div className="flex flex-col items-center text-center">
      <p className="font-bold">{formatDate(data.date, rootStore.weatherdataStore.language)}</p>
      <div className="flex">
        <p className="px-3">{Math.floor(data.day.mintemp_c)}&deg;C</p>
        <p className="px-3">{Math.ceil(data.day.maxtemp_c)}&deg;C</p>
      </div>
      <img alt="forecast-img" src={data.day.condition.icon} />
    </div>
  )
}

export default observer(FutureforecastComponent)
