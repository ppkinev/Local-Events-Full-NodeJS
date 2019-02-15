// @flow
'use strict'
import sendText from '../send-text'
import sendGiphy from '../send-giphy'

const TEXT = `
Хеллоу :v: Я <b>Левша</b>. Да-да, тот самый легендарный бот, который знает ВСЕ о событиях в Одессе.

Меня можно спросить :speech_balloon:, например, <b>что интересного сегодня</b> или <b>что будет завтра</b>
Или о конкретном месте :office: - <b>что в Терминале?</b>
Приятно познакомиться :smiley:

Если возникнут вопросы, пиши сюда - @ppkinev
`

import type { UserType, GiphyType } from '../../utils/types-generic'
export default ({ text, user }: { text: string, user: UserType }) => {
  // text here is system command
  // like /start for ex.
  // but no / so check for word only
  switch (text) {
    default:
      // assuming "start" as default
      sendText({
        id: user._id,
        text: TEXT,
        keyboard: undefined,
      }).then(() => {
        sendGiphy({ user, search: 'hello' })
      })
  }
}
