'use strict'
const mongoose = require('mongoose')
const graph = require('fbgraph')
const eventSources = require('./event-sources')
const eventSave = require('./event-save')
const eventFields = require('./config').event_fields


// const postFields = 'created_time, id, message, story, description, from, icon, instagram_eligibility, link, name, permalink_url, picture, place, type'

const handleSingleEvent = (event) => {
  return new Promise((resolve) => {
    eventSave(event).then(resolve).catch((err) => {
      if (err.code !== 11000) console.warn(err)
      resolve()
    })
  })
}

const handleEvents = (events) => {
  return new Promise((resolve) => {
    const loopThroughEvents = (i) => {
      if (events.length > 0 && i < events.length) {
        handleSingleEvent(events[i])
            .then(loopThroughEvents.bind(null, i + 1))
            .catch(loopThroughEvents.bind(null, i + 1))
      } else {
        resolve()
      }
    }
    loopThroughEvents(0)
  })
}

const grabEventsFromSource = (source) => {
  return new Promise((resolve, reject) => {
    const params = { fields: eventFields.join(',') }
    graph.get(`${source}/events`, params, function (err, res) {
      if (err) {
        reject(err)
        return
      }

      handleEvents(res.data).then(resolve)
    })
  })
}

const handleSources = () => {
  return new Promise((resolve) => {
    const loopThroughSources = (i) => {
      if (eventSources.length > 0 && i < eventSources.length) {
        console.log(eventSources[i])
        grabEventsFromSource(eventSources[i])
            .then(loopThroughSources.bind(null, i + 1))
            .catch(loopThroughSources.bind(null, i + 1))
      } else {
        resolve()
      }
    }
    loopThroughSources(0)
  })
}

module.exports = (token) => {
  graph.setAccessToken(token)
  console.log('- *** - *** - *** - *** - *** -')
  console.log('Getting events from sources...')
  handleSources().then(() => {
    setTimeout(() => {
      mongoose.connection.close()
      setTimeout(() => {
        process.exit(0)
      }, 2000)
    }, 1000)
  })
}
