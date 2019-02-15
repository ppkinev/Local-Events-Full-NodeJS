// @flow
'use strict'

import { platform } from '../config'
import { TELEGRAM, MESSENGER } from './strings/global-constants'

let bot = null

switch (platform) {
  case MESSENGER:
    // bot = messengerBot
    break
  default:
    bot = require('./telegram-bot')
}

export default bot
