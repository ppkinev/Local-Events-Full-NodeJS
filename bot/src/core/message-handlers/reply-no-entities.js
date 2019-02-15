// @flow
'use strict'
import sendText from '../../core/send-text'
import onNewEntities from './on-no-entities'

import type { UserType, FuncType } from '../../utils/types-generic'

const replyNoEntities = ({ text, user }: { text: string, user: UserType }): Promise<any> => {
  return new Promise((resolve: FuncType, reject: FuncType) => {
    onNewEntities(text).then((reply: string) => {
      sendText({ id: user._id, text: reply, keyboard: undefined }).then(resolve).catch(reject)
    })
  })
}

export default replyNoEntities
