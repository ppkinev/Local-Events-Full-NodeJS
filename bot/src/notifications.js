// @flow
'use strict'
import mongoose from 'mongoose'
import ontime from 'ontime'
import moment from 'moment'
import { db_url, mongo_options } from './config'
import User from './collections/user'
import sendText from './core/send-text'
import { weekDaysNotificationsStrings, greetings } from './core/strings/direct-reply-phrases'
import { UTC_SHIFT } from './core/strings/global-constants'
import { getRandomItem } from './utils/index'
import type { UserType } from './utils/types-generic'

import exchangeRatesText from './api/exchange-rates'
import forecastText from './api/forecast'

mongoose.Promise = global.Promise
mongoose.connect(db_url, mongo_options)

const sendNotifications = (): Promise<any> => {
  return new Promise((resolve: () => mixed) => {
    User.find({}, (err: {}, users: [UserType]) => {
      if (err) console.log(err)
      else {
        if (users && users.length) {
          (function loop(i: number) {
            if (i < users.length) {
              new Promise((resolve: () => mixed) => {
                console.log('Sending', users[i].firstName)


                let text2Send = getRandomItem(greetings)
                forecastText().then((forecast: string) => {
                  exchangeRatesText().then((rate: string) => {
                    if (forecast.length > 0) text2Send += `\n\n${forecast}`
                    if (rate.length > 0) text2Send += `\n\n${rate}`

                    text2Send += `\n${getRandomItem(weekDaysNotificationsStrings[moment().day()])}`

                    sendText({
                      id: users[i]._id,
                      text: text2Send,
                      keyboard: undefined,
                    }).then(() => {
                      User.update({ _id: users[i]._id }, { isFromNotification: true }, (err: {}) => {
                        if (err) console.log(err)
                        setTimeout(resolve, 500)
                      })
                    }).catch(() => {
                      setTimeout(resolve, 500)
                    })
                  })
                })


              }).then(loop.bind(null, i + 1))
            } else {
              resolve()
            }
          })(0)
        }
      }
    })
  })
}


// https://www.npmjs.com/package/ontime
export default () => {
  console.log('Notification scheduler initialized')
  const workDayTime = `${12 - UTC_SHIFT}:00:00`
  // const workDayTime = '18:32:00'
  const weekendDelay = 2 * 60 * 60 * 1000

  ontime({ cycle: [workDayTime] }, (ot: { done: () => mixed }) => {
    // 0 - Sunday, 6 - Saturday
    if (moment().day() > 0 && moment().day() < 6) {
      // Monday to Friday send at 12am
      sendNotifications().then(() => {
        ot.done()
      })
    } else {
      // Saturday, Sunday wait 4 hours more, then send notifications
      setTimeout(() => {
        sendNotifications().then(() => {
          ot.done()
        })
      }, weekendDelay)
    }
  })
}
