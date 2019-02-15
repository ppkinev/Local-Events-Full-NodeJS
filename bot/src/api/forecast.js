// @flow
'use strict'
import mongoose from 'mongoose'
import { db_url, mongo_options } from '../config'
import Forecast from '../collections/forecast'
import type ForecastType from '../utils/types-generic'

mongoose.Promise = global.Promise
mongoose.connect(db_url, mongo_options)

export default (): Promise<any> => {
  return new Promise((resolve: () => mixed) => {
    Forecast.findOne({}, (err: ?{}, forecast: ?ForecastType) => {
      if (!forecast || err) resolve('')
      else {
        resolve(`Температура <b>${forecast.temperature}</b>, а так же ${forecast.description}`)
      }
    })
  })
}
