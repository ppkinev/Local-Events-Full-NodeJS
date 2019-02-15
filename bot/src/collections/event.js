'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const coverSchema = new Schema({
  source: String,
}, { _id: false })

const ownerSchema = new Schema({
  name: String,
  id: String,
}, { _id: false })

const placeSchema = new Schema({
  name: String,
  location: {
    city: String,
    country: String,
    latitude: Number,
    longitude: Number,
    street: String,
    zip: String,
  },
  id: String,
}, { _id: false })

const eventSchema = new Schema({
  id: { type: String, required: true, unique: true },
  type: String,
  category: String,
  witCategories: Array,
  updated_time: Date,
  name: String,
  description: String,
  attending_count: Number,
  declined_count: Number,
  interested_count: Number,
  maybe_count: Number,
  noreply_count: Number,
  cover: [coverSchema],
  owner: [ownerSchema],
  start_time: Date,
  end_time: Date,
  is_canceled: Boolean,
  is_page_owned: Boolean,
  place: placeSchema,
  timezone: String,
  ticket_uri: String,
  ticketing_privacy_uri: String,
  ticketing_terms_uri: String,
})

module.exports = mongoose.model('Event', eventSchema)
