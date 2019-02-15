// @flow
'use strict'
import parseMessage from '../remote-ai/parse-message'
import replyNoEntities from './reply-no-entities'
import replyProperEntities from './reply-proper'
import replyYesNoMessage from './reply-yes-no-message'
import { onInformaMessagesLimitReached, onSpecialEntityCase } from './reply-special-cases'
import scheduler from '../../utils/scheduler'
import User from '../../collections/user'
import { FOR_CATEGORIES, FOR_NOTIFICATIONS } from '../strings/global-constants'

import type { UserType, EntityType, FuncType } from '../../utils/types-generic'

const DELAY = 60 //seconds
const MAX_FREE_MESSAGES = 4

const resetUserInformal = (user: UserType) => {
  User.findOneAndUpdate({ _id: user._id }, {
    $set: {
      informalMessagesInARow: 0,
      isConfirmationToShowTopRequired: false,
    },
  }, (err: {}) => {
    if (err) console.warn(err)
  })

  // clearing up the scheduler
  scheduler.removeById(user._id)
}

const increaseInformalMessageCount = (user: UserType): Promise<any> => {
  return new Promise((resolve: (boolean) => mixed) => {
    User.findOneAndUpdate({ _id: user._id }, { $inc: { informalMessagesInARow: 1 } }, { new: true }, (err: {}, upadtedUser: UserType) => {
      if (err) console.warn(err)
      else resolve(upadtedUser.informalMessagesInARow >= MAX_FREE_MESSAGES)
    })

    // clearing possible events
    // resetting informal counter on a schedule
    scheduler.removeById(user._id)
    scheduler.add({
      delay: DELAY, uid: user._id, event: () => {
        resetUserInformal(user)
      },
    })
  })
}

type ResponseType = {
  result: {
    parameters: EntityType,
    score: number
  }
}
export default ({ text, user }: { text: string, user: UserType }) => {
  if (user.isConfirmationToShowTopRequired) {
    replyYesNoMessage({ text, user, type: FOR_CATEGORIES })
    return
  }
  if (user.isFromNotification) {
    replyYesNoMessage({ text, user, type: FOR_NOTIFICATIONS })
    return
  }


  parseMessage(text).then((response: ResponseType) => {
    const { result: { parameters, score = 0 } } = response
    const THRESHOLD = 0.85

    if (parameters && Object.keys(parameters).length && score > THRESHOLD) {
      onSpecialEntityCase(user, parameters).then((specialCase: string) => {
        // Message already sent, handle next moves if needed
      }).catch(() => {
        // no special entity cases, only event search
        replyProperEntities({ user, entities: parameters })
        resetUserInformal(user)
      })
    } else {
      increaseInformalMessageCount(user).then((enough: boolean) => {
        if (enough) {
          onInformaMessagesLimitReached(user).then(() => {
            User.findOneAndUpdate({ _id: user._id }, { $set: { isConfirmationToShowTopRequired: true } }).exec()
          })
        } else {
          replyNoEntities({ text, user })
        }
      })
    }
  })
}
