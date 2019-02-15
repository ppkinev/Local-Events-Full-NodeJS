// @flow
'use strict'
import sendText from '../send-text'
import sendGiphy from '../send-giphy'
import { informaMessagesLimitReachedStrings } from '../strings/direct-reply-phrases'
import { getRandomItem } from '../../utils'

import type { UserType, EntityType, FuncType } from '../../utils/types-generic'

const textAboutBot = `
Спроси меня :speech_balloon:, например, <b>что интересного сегодня</b> или <b>что будет завтра</b>
Или о конкретном месте :office: - <b>что в Терминале?</b>
`

const textDrink = 'здесь будет инфо о том, где можно выпить'
const textFood = 'здесь бует инфо о том, где можно поесть'

export const onInformaMessagesLimitReached = (user: UserType): Promise<any> => {
  return new Promise((resolve: () => mixed, reject: () => mixed) => {
    sendText({ id: user._id, text: getRandomItem(informaMessagesLimitReachedStrings), keyboard: undefined })
        .then(resolve).catch(reject)
  })
}

export const onSpecialEntityCase = (user: UserType, parameters: EntityType): Promise<any> => {
  const keyboard = undefined
  const id = user._id
  return new Promise((resolve: (string) => mixed, reject: FuncType) => {
    const { about_bot, searching_drink, searching_food } = parameters
    if (about_bot) {
      sendText({ id, text: textAboutBot, keyboard }).then(resolve).catch()
    } else if (searching_drink) {
      sendGiphy({ user, search: 'drinking' }).then(() => {
        sendText({ id, text: textDrink, keyboard }).then(resolve).catch()
      })
    } else if (searching_food) {
      sendGiphy({ user, search: 'eating' }).then(() => {
        sendText({ id, text: textFood, keyboard }).then(resolve).catch()
      })
    }
    else reject()
  })
}