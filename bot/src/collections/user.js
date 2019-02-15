// @flow
'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  _id: { type: String, required: true, unique: true },
  firstName: String,
  lastName: String,
  userName: String,
  gender: String,
  age: Number,
  email: String,
  profile_pic: String,
  locale: { type: String, default: 'ru' },
  timezone: String,
  lastSeen: Date,
  createdOn: { type: Date, default: Date.now },
  language: { type: String, default: 'ru' },

  // Additional info
  informalMessagesInARow: { type: Number, default: 0 },
  isConfirmationToShowTopRequired: { type: Boolean, default: false },
  isFromNotification: { type: Boolean, default: false },
})

module.exports = mongoose.model('User', userSchema)
