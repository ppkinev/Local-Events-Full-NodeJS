// @flow
'use strict'

import { platform } from '../config'
import { TELEGRAM, MESSENGER } from './strings/global-constants'
import sendTelegramMedia from '../components/telegram/telegram-send-media'

// default telegram
let sendMedia = sendTelegramMedia

switch (platform) {
  case MESSENGER:
    // sendMedia = sendMessengerText
    break
}

export default sendMedia
