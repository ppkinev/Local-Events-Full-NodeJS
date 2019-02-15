'use strict'
const getBoltunMessage = require('../../../../conversational/index')

export default (text) => {
  return new Promise((resolve) => {
    resolve(getBoltunMessage(text))
  })
}