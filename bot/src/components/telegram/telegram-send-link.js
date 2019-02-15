// @flow
'use strict'
import sendText from './telegram-send-text'
import { linkSentString, linkNotSentString, linkButtonString } from '../../constants/media-strings'

type SendLinkType = { id: string, text: string, url: ?string, locale: string, keyboard: ?{}, showKeyboard: ?boolean };
function sendLink({ id, text, url, locale, keyboard, showKeyboard }: SendLinkType): Promise<any> {
  return new Promise((resolve: () => mixed, reject: (err: ?{}) => mixed) => {
    if (!url || !url.length || url.indexOf('http') === -1) {
      console.error('URL is invalid: ', url)
      sendText({
        id,
        text: `<b>${linkNotSentString[locale]}</b>`,
        keyboard: showKeyboard ? keyboard : { parse_mode: 'HTML' },
      }).then(resolve).catch(resolve)
      return
    }
    const linkKeyboard = {
      parse_mode: 'HTML',
      disable_notification: true,
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: linkButtonString[locale],
              url: url,
            },
          ],
        ],
      },
    }
    sendText({ id, text, keyboard: linkKeyboard }).then(() => {
      if (showKeyboard) {
        sendText({ id, text: `<b>${linkSentString[locale]}</b>`, keyboard }).then(resolve)
      }
      else resolve()
    }).catch((err: ?{}) => {
      console.error(String(err))
      if (showKeyboard) {
        sendText({ id, text: `<b>${linkNotSentString[locale]}</b>`, keyboard }).then(resolve)
      }
      else resolve()
    })
  })
}

export default sendLink
