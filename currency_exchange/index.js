'use strict'
const mongoose = require('mongoose')
const axios = require('axios')
const config = require('./core/config')
const Currency = require('./collections/currency')

mongoose.Promise = global.Promise
mongoose.connect(config.db_url, config.mongo_options)

const getCurrency = (array, type) => array
    .filter(currency => currency.ccy === type)
    .map(cur => ({
      buy: Number(cur.buy).toFixed(2),
      sell: Number(cur.sale).toFixed(2),
    }))[0]

axios('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
    .then((res) => {
      const eur = getCurrency(res.data, 'EUR')
      const usd = getCurrency(res.data, 'USD')
      const rur = getCurrency(res.data, 'RUR')
      const btc = getCurrency(res.data, 'BTC')

      Currency.updateOne({}, { eur, usd, rur, btc, received: Date.now() }, { upsert: true }, () => {
        process.exit(0)
      })
    })
    .catch((err) => {
      console.warn(err)
      process.exit(0)
    })
