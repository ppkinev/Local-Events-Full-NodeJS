'use strict'
const bot = require('./temp/bot')
const getReply = require('../index')

bot.onText(/.*/, (message) => {
  const text = message.text
  const id = message.from.id

  bot.sendMessage(id, getReply(text))
})