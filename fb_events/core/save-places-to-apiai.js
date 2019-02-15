'use strict'
const axios = require('axios')

const ENTITY = 'places'
module.exports = (place) => {
  return new Promise((resolve) => {
    axios({
      url: `https://api.api.ai/v1/entities/${ENTITY}/entries?v=20150910`,
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 547248c6884941e18382ec88d51901ed',
        'Content-Type': 'application/json; charset=utf-8',
      },
      data: [{
        value: place.searchName,
        synonyms: [place.searchName, place.name],
      }],
    })
        .then((response) => {
          console.log('NEW PLACE ADDED: ', place.searchName, place.name, place.id)
          setTimeout(() => {
            resolve()
          }, 200)
        })
        .catch((err) => {
          console.warn(String(err))
          resolve()
        })
  })
}

