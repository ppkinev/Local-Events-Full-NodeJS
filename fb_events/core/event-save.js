'use strict'
const mongoose = require('mongoose')
const slugify = require('transliteration').slugify
const config = require('./config')
const Event = require('../collections/event')
const Place = require('../collections/place')
const isEventPassed = require('./helpers').isEventPassed
const getWitCategories = require('./get-wit-categories')
const savePlaceToApiAI = require('./save-places-to-apiai')

mongoose.Promise = global.Promise
mongoose.connect(config.db_url, config.mongo_options)

const categorisingEvent = (event) => {
  return new Promise((resolve, reject) => {
    if (!isEventPassed({ start: event.start_time, end: event.end_time })) {
      const newEvent = new Event(event)
      newEvent.save().then(() => {
        resolve()
        getWitCategories(newEvent)
      }).catch((err) => {
        reject(err)
      })
    } else {
      resolve()
    }
  })
}

module.exports = (event) => {
  return new Promise((resolve, reject) => {
    if (event.place) {
      Place.find({ searchName: event.place.searchName }, (err, docs) => {
        if (err) {
          console.warn(err)
        } else {
          if (!docs || docs.length === 0) {
            const newPlace = new Place(event.place)
            newPlace.searchName = slugify(newPlace.name, { separator: '_' })
            newPlace.save().then(() => {
              savePlaceToApiAI(newPlace).then(() => {
                categorisingEvent(event).then(resolve).catch(reject)
              })
            }).catch((err) => {
              categorisingEvent(event).then(resolve).catch(reject)
            })
          } else {
            categorisingEvent(event).then(resolve).catch(reject)
          }
        }
      })
    } else {
      categorisingEvent(event).then(resolve).catch(reject)
    }
    // if (!isEventPassed({ start: event.start_time, end: event.end_time })) {
    //   const newEvent = new Event(event)
    //   newEvent.save().then(() => {
    //     resolve()
    //     getWitCategories(newEvent)
    //   }).catch((err) => {
    //     reject(err)
    //   })
    // } else {
    //   resolve()
    // }
  })
}
