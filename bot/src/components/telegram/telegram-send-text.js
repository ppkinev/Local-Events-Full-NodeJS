// @flow
'use strict'
import emoji from 'node-emoji'
import bot from '../../core/telegram-bot'

function sendText({ id, text, keyboard }: { id: string, text: string, keyboard: ?{} }): Promise<any> {
  if (!keyboard) keyboard = { parse_mode: 'HTML', disable_web_page_preview: true }
  return new Promise((resolve: () => mixed, reject: (err: ?{}) => mixed) => {
    bot.sendMessage(id, emoji.emojify(text), keyboard).then(resolve).catch(resolve)
  })
}

export default sendText
