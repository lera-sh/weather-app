import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../utils/context'
import { useTranslation } from 'react-i18next'

const ReviewComponent = () => {
  const { t } = useTranslation()
  const rootStore = useContext(Context)
  const { feels, humidity, uv, wind } = rootStore.weatherdataStore.currentReview

  return (
    <div className="flex flex-col items-center">
      <p className="font-bold text-xl pb-2">{t('review')}</p>
      <div className="border-2 flex p-2 rounded-md">
        <div className="p-2">
          <p>
            {t('feelsText')}: {feels}&deg;C
          </p>
          <p>
            {t('humidityText')}: {humidity}%
          </p>
        </div>
        <div className="p-2">
          <p>
            {t('uvText')}: {uv}
          </p>
          <p>
            {t('windText')}: {wind} {t('mphText')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default observer(ReviewComponent)
