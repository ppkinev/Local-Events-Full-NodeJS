'use strict'
const axios = require('axios')
const mongoose = require('mongoose')
const config = require('./config')
const Event = require('../collections/event')

mongoose.Promise = global.Promise
mongoose.connect(config.db_url, { useMongoClient: true })

const MAX = 255

const sendToWit = (text) => {
  return new Promise((resolve) => {
    axios({
      url: `https://api.wit.ai/message?v=20170307&q=${encodeURIComponent(text)}`,
      headers: {
        'Authorization': `Bearer WERD5THCUSE4IWAKI7SM2BPKJWM3J3B5`,
      },
    }).then(resolve).catch((err) => {
      console.warn(err)
      resolve()
    })
  })
}

const handleDescription = (event) => {
  const phrases = []
  let categories = []
  if (event.description) {
    const MAX_PARTS = event.description.length / MAX | 0
    if (MAX_PARTS > 0) {
      for (let t = 0; t < Math.min(5, MAX_PARTS); t++) {
        const phrase = event.description
            .replace(/["'\n\r«»]/g, '')
            .replace(/\s+/g, ' ')
            .substring(t * MAX, (t + 1) * MAX)
        phrases.push(phrase)
      }
    }
  }

  (function loop(i) {
    if (i < phrases.length) {
      new Promise(resolve => {
        sendToWit(phrases[i]).then(({ data }) => {
          const cats = data.entities.category
          if (cats) {
            categories = [...categories, ...cats.filter(cat => !cat.suggested).map(cat => cat.value)]
          }
          setTimeout(() => {
            resolve()
          }, 100)
        })
      }).then(loop.bind(null, i + 1))
    } else {
      categories = categories.reduce((acc, c) => {
        const el = acc.find(elem => elem.name === c)
        if (el) el.count++
        else acc.push({ name: c, count: 1 })
        return acc
      }, [])
      Event.findOneAndUpdate({ id: event.id }, { witCategories: categories }, (err, doc) => {
        if (err) console.log(err)
      })
    }
  })(0)
}

module.exports = handleDescription
