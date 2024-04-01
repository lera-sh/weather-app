import React from 'react'
import WeatherPage from './appComponents/WeatherPage'
import './App.css'
import { Context } from './utils/context'
import RootStore from './stores/rootStore'

function App() {
  return (
    <Context.Provider value={new RootStore()}>
      <WeatherPage />
    </Context.Provider>
  )
}

export default App
