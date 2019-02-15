'use strict'
import TelegramBot from 'node-telegram-bot-api'
import { telegramToken } from '../config'

const bot = new TelegramBot(telegramToken, { polling: { interval: 2000, params: { timeout: 65 } } })

export default bot
