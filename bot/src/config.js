'use strict'
const path = require('path')
import { TELEGRAM, ODESSA } from'./core/strings/global-constants'
import keyData from './core/key-data'
import { getArgument } from './utils'
import common from '../../config-common'

export const brand = getArgument('brand') || ODESSA
export const env = getArgument('env') || 'strict-test1' // local
export const platform = getArgument('platform') || TELEGRAM
export const hostName = `http://${platform}.${brand}.${env}`
export const { telegramToken, maxDelay, telegramWebhookUrl } = keyData(brand, env)
export const baseDir = __dirname
export const db_url = common.db_url
export const mongo_options = common.mongo_options
export const api_ai_token = ''
export const api_ai_yesno_token = ''
export const giphy_api_key = ''