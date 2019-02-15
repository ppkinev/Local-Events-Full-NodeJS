// @flow
'use strict'

import { platform } from '../config'
import { TELEGRAM, MESSENGER } from './strings/global-constants'
import sendTelegramText from '../components/telegram/telegram-send-text'

// default telegram
let sendText = sendTelegramText

switch (platform) {
  case MESSENGER:
    // sendText = sendMessengerText
    break
}

export default sendText
