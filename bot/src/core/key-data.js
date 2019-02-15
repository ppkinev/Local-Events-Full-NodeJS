// @flow
import { LOOK_RIGHT, FAST_AID } from './strings/global-constants'
type KeyDataType = { telegramToken: string, maxDelay: ?number }

export default function keyData(brand: string, env: string): KeyDataType {
  'use strict'
  return {
    // local
    telegramToken: '222233302:AAEW3Kok7M5nqLS_i1e1nUIgxsczAm4e7sw',

    // DO
    // telegramToken: '328867102:AAErBPtVomxc4Zs03K4LPYig_ni2iT2ZS0M',
    maxDelay: 1,
  }
}
