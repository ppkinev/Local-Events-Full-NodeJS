// @flow
'use strict'
import onSystemMessage from './message-handlers/on-system-message'
import onFreeMessage from './message-handlers/on-free-message'
import { MESSAGE_SYSTEM_RXP } from '../constants/regexps'
import type { UserType } from '../utils/types-generic'

import { getTopThree } from '../api/events'

const isMessageSystem = (text: string): boolean => MESSAGE_SYSTEM_RXP.test(text)

export const onTextReceived = ({ text, user }: { text: string, user: UserType }) => {
  if (isMessageSystem(text)) {
    onSystemMessage({ text: MESSAGE_SYSTEM_RXP.exec(text)[1], user })
    return
  }

  onFreeMessage({ text, user })
}
