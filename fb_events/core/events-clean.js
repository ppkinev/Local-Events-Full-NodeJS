'use strict'
const mongoose = require('mongoose')
const graph = require('fbgraph')
const config = require('./config')
const getParams = { fields: config.event_fields_update.join(',') }
const Event = require('../collections/event')
const isEventPassed = require('./helpers').isEventPassed

mongoose.Promise = global.Promise
mongoose.connect(config.db_url, config.mongo_options)

const checkEvent = (localEvent) => {
  return new Promise((resolve) => {
    graph.get(localEvent.id, getParams, (err, event) => {
      if (err) {
        Event.deleteOne({ id: localEvent.id }, () => {
          console.log(localEvent.name, '- event deleted (deleted by owner)')
          resolve()
        })
      } else {
        if (
            isEventPassed({ start: event.start_time, end: event.end_time })
            || event.is_canceled
        ) {
          Event.deleteOne({ id: event.id }, () => {
            console.log(event.name, '- event deleted (expired)')
            resolve()
          })
        } else {
          Event.findOneAndUpdate({ id: event.id }, event, (err) => {
            if (err) console.log(err)
            else console.log(event.name, '- event updated')
            resolve()
          })
        }
      }
    })
  })
}

const handleEvents = (events) => {
  return new Promise((resolve) => {
    (function loop(i) {
      if (i < events.length) {
        new Promise(resolve => {
          checkEvent(events[i]).then(resolve)
        }).then(loop.bind(null, i + 1))
      } else {
        resolve()
      }
    })(0)
  })
}

module.exports = (token) => {
  return new Promise((resolve) => {
    graph.setAccessToken(token)

    Event.find({}, (err, events) => {
      if (err) {
        console.log(err)
        return
      }
      console.log('Events found: ', events.length)
      console.log('- *** - *** - *** - *** - *** -')
      console.log('Updating EVENTS DB...')
      handleEvents(events).then(resolve)
    })
  })
}
