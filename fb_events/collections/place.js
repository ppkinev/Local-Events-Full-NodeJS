'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const placeSchema = new Schema({
  id: { type: String, required: true, unique: true },
  searchName: { type: String, required: true, unique: true },
  name: String,
  location: {
    city: String,
    country: String,
    latitude: Number,
    longitude: Number,
    street: String,
    zip: String,
  },
})

module.exports = mongoose.model('Place', placeSchema)
