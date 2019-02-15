// @flow
'use strict'
import sendText from '../../core/send-text'
import sendMedia from '../../core/send-media'
import type { UserType, FuncType, EventType } from '../../utils/types-generic'

const sendEvents = (user: UserType, events: [EventType], formatEventMessage: (EventType) => string): Promise<any> => {
  const { _id: id } = user
  const keyboard = undefined

  return new Promise((resolve: FuncType, reject: FuncType) => {
    const loopThroughEvents = (i: number) => {
      if (events.length > 0 && i < events.length) {
        sendMedia({
          id,
          document: events[i].id,
          path: events[i].cover[0].source,
          locale: 'ru',
          type: 'photo',
          keyboard,
          showFeedback: false,
        }).then(() => {
          sendText({ id, text: formatEventMessage(events[i]), keyboard })
              .then(loopThroughEvents.bind(null, i + 1))
              .catch(loopThroughEvents.bind(null, i + 1))
        }).catch(reject)
      } else {
        resolve()
      }
    }
    loopThroughEvents(0)
  })
}

export default sendEvents
