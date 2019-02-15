// @flow
'use strict'
import apiai from 'apiai'
import { api_ai_yesno_token } from '../../config'

const app = apiai(api_ai_yesno_token)
export default (text: string): Promise<any> => {
  return new Promise((resolve: (boolean) => mixed, reject: (boolean) => mixed) => {
    const request = app.textRequest(text, {
      sessionId: Date.now(),
    })

    request.on('response', (response: { result: { parameters: { yesno: ?string } } }) => {
      const { yesno } = response.result.parameters
      if (yesno) {
        resolve(yesno === 'yes')
      } else {
        reject(false)
      }
    })

    request.on('error', (error: {}) => {
      console.warn('err', String(error))
      reject(true)
    })

    request.end()
  })
}
