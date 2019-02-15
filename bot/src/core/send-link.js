// @flow
'use strict'

import { platform } from '../config'
import { TELEGRAM, MESSENGER } from './strings/global-constants'
import sendTelegramLink from '../components/telegram/telegram-send-link'

// default telegram
let sendLink = sendTelegramLink

switch (platform) {
  case MESSENGER:
    // sendMedia = sendMessengerText
    break
}

export default sendLink
