import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../utils/context'
import FutureforecastComponent from './FutureforecastComponent'

const FuturedayComponent = () => {
  const rootStore = useContext(Context)
  const futureData = rootStore.weatherdataStore.futureData

  if (!Array.isArray(futureData)) {
    return <div>Loading...</div>
  }

  return (
    <div className="bg-white flex justify-around items-center rounded-md my-3 py-2">
      {futureData.map((day) => (
        <FutureforecastComponent key={day.date_epoch} data={day} />
      ))}
    </div>
  )
}

export default observer(FuturedayComponent)
