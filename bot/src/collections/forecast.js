'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const forecastSchema = new Schema({
  received: Date,
  temperature: String,
  description: String
})

module.exports = mongoose.model('Forecast', forecastSchema)
