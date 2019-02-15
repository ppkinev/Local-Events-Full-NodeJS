'use strict'
const mongoose = require('mongoose')
const config = require('./core/config')
const weather = require('yahoo-weather')
const formattedWeather = require('./core/get-formatted-weather')
const Forecast = require('./collections/forecast')

mongoose.Promise = global.Promise
mongoose.connect(config.db_url, config.mongo_options)


weather('odessa, ua', 'c').then(info => {
  const temperature = info.item.condition.temp
  const description = formattedWeather(info.item.condition.code)

  console.log(temperature, description, info.item)

  Forecast.updateOne({}, { temperature, description, received: Date.now() }, { upsert: true }, () => {
    process.exit(0)
  })

}).catch(err => {
  console.warn(err)
  process.exit(0)
})
