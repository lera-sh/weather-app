import React, { useContext, useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import mapboxgl from 'mapbox-gl'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
import { Context } from '../utils/context'

const Map = () => {
  const mapContainerRef = useRef(null)
  const rootStore = useContext(Context)
  const { currentLatAndLon, language } = rootStore.weatherdataStore

  useEffect(() => {
    if (Array.isArray(currentLatAndLon)) {
      mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: currentLatAndLon,
        zoom: 9
      })

      new mapboxgl.Marker().setLngLat(currentLatAndLon).addTo(map)

      const lang = new MapboxLanguage({
        defaultLanguage: language
      })

      map.addControl(lang)
    }
  }, [currentLatAndLon, language])

  return (
    <div ref={mapContainerRef} style={{ width: '100%', height: '400px', borderRadius: '4px' }} />
  )
}

export default observer(Map)
