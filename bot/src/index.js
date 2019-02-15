// @flow
'use strict'

const mongoose = require('mongoose')
import telegramBot from './core/telegram-bot'
import initNotifications from './notifications'
import { TELEGRAM, MESSENGER } from './core/strings/global-constants'
import { platform, db_url, mongo_options } from './config'
import { onTextReceived } from './core/on-text-received'

import User from './collections/user'

import type { TelegramMessageType } from './utils/types-generic'

mongoose.Promise = global.Promise
mongoose.connect(db_url, mongo_options)

initNotifications()

if (platform === TELEGRAM) {
  telegramBot.on('message', (message: TelegramMessageType) => {
    if (message.text) {
      const text = message.text

      const id = message.from.id
      const locale = message.from.language_code
      const first_name = message.from.first_name
      const last_name = message.from.last_name
      const username = message.from.username

      User.findOneAndUpdate({ _id: id }, {
        _id: id,
        firstName: first_name,
        lastName: last_name,
        userName: username,
        locale,
        lastSeen: Date.now(),
      }, {
        new: true,
        upsert: true,
      }, (err: ?{}, user: any) => {
        onTextReceived({ text, user })
      })
    }
  })

  telegramBot.on('polling_error', (error: { code: string }) => {
    console.log('polling_error')
    console.log(error.code)
  })
}

