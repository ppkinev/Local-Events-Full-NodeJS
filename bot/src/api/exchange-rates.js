// @flow
'use strict'
import mongoose from 'mongoose'
import { db_url, mongo_options } from '../config'
import Currency from '../collections/currency'
import type CurrencyType from '../utils/types-generic'

mongoose.Promise = global.Promise
mongoose.connect(db_url, mongo_options)

export default (): Promise<any> => {
  return new Promise((resolve: () => mixed) => {
    Currency.findOne({}, (err: ?{}, currency: ?CurrencyType) => {
      if (!currency || err) resolve('')
      else {
        resolve(
            `Курс сегодня: 
:dollar: покупка: <b>${currency.usd.sell.toFixed(2)}</b>, продажа: <b>${currency.usd.buy.toFixed(2)}</b> 
:euro: покупка: <b>${currency.eur.sell.toFixed(2)}</b>, продажа: <b>${currency.eur.buy.toFixed(2)}</b> 
`,
        )
      }
    })
  })
}
