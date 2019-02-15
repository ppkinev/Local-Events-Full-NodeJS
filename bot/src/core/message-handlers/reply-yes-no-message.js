// @flow
'use strict'
import { giphy_api_key } from '../../config'
import parseYesNo from '../remote-ai/parse-yesno-reply'
import replyProperEntities from '../message-handlers/reply-proper'
import { handleNoForCategoriesStrings, handleUnknownForCategoriesStrings } from '../strings/direct-reply-phrases'
import { FOR_CATEGORIES, FOR_NOTIFICATIONS } from '../strings/global-constants'
import { getRandomItem, getGifPath } from '../../utils'
import sendText from '../send-text'
import sendMedia from '../send-media'
import User from '../../collections/user'
import type { UserType, GiphyType } from '../../utils/types-generic'

// https://www.npmjs.com/package/giphy-api
const giphy = require('giphy-api')(giphy_api_key)

const reactForCateogories = ({ user, isYes }: { user: UserType, isYes: boolean }): Promise<any> => {
  return new Promise((resolve: () => mixed) => {
    if (isYes) {
      // $FlowFixMe
      replyProperEntities({ user, entities: {} }).then(resolve)
    } else {
      // REACT FOR "NO"
      sendText({
        id: user._id,
        text: getRandomItem(handleNoForCategoriesStrings),
        keyboard: undefined,
      }).then(() => {
        giphy.search('sad', function (err: ?{}, res: { data: [GiphyType] }) {
          if (!err) {
            sendMedia({
              id: user._id,
              document: 'gifs',
              path: getGifPath(getRandomItem(res.data).id),
              type: 'gif',
              keyboard: undefined,
              locale: 'ru',
              showFeedback: false,
            })
          }
        })
      })
    }
  })
}

const reactForNotifications = ({ user, isYes }: { user: UserType, isYes: boolean }): Promise<any> => {
  return new Promise((resolve: () => mixed) => {
    if (isYes) {
      // $FlowFixMe
      replyProperEntities({ user, entities: {}, top3: true }).then(resolve)
    } else {
      // REACT FOR "NO"
      sendText({
        id: user._id,
        text: getRandomItem(handleNoForCategoriesStrings),
        keyboard: undefined,
      }).then(() => {
        giphy.search('sad', function (err: ?{}, res: { data: [GiphyType] }) {
          if (!err) {
            sendMedia({
              id: user._id,
              document: 'gifs',
              path: getGifPath(getRandomItem(res.data).id),
              type: 'gif',
              keyboard: undefined,
              locale: 'ru',
              showFeedback: false,
            })
          }
        })
      })
    }
  })
}

export default ({ text, user, type = FOR_CATEGORIES }: { text: string, user: UserType, type: string }): Promise<any> => {
  return new Promise((resolve: () => mixed, reject: () => mixed) => {
    parseYesNo(text).then((isYes: boolean) => {
      User.findOneAndUpdate({ _id: user._id }, {
        $set: {
          informalMessagesInARow: 0,
          isConfirmationToShowTopRequired: false,
          isFromNotification: false,
        },
      }).exec()

      switch (type) {
        case FOR_NOTIFICATIONS:
          reactForNotifications({ user, isYes }).then(resolve)
          break
        default:
          reactForCateogories({ user, isYes }).then(resolve)
      }
    }).catch((isErr: boolean) => {
      if (isErr) {
        // some error on API.ai handle somehow
        // for now will just launch normal flow
        resolve()
      } else {
        // no "yes", "no" words found
        // add more to the dictionary
        // for now will just launch normal flow
        sendText({
          id: user._id,
          text: getRandomItem(handleUnknownForCategoriesStrings),
          keyboard: undefined,
        })
      }
    })
  })
}