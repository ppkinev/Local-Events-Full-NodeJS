'use strict'
import apiai from 'apiai'
import { api_ai_token } from '../../config'

const app = apiai(api_ai_token)
export default (text) => {
  return new Promise((resolve, reject) => {
    const request = app.textRequest(text, {
      sessionId: Date.now(),
    })

    request.on('response', (response) => {
      resolve(response)
    })

    request.on('error', (error) => {
      reject()
      console.warn('err', String(error))
    })

    request.end()
  })
}