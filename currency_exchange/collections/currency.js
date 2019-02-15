'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const singleCurrencySchema = new Schema({
  buy: Number,
  sell: Number,
})

const currencySchema = new Schema({
  // id: { type: String, required: true, unique: true },
  received: Date,
  eur: singleCurrencySchema,
  rur: singleCurrencySchema,
  usd: singleCurrencySchema,
  btc: singleCurrencySchema,
})

module.exports = mongoose.model('Currency', currencySchema)
