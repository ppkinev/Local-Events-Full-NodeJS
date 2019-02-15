// @flow
'use strict'
import { cacheFile, getFileId, getCacheName } from './telegram-file-caching.js'
import {
  videoSentString, videoNotSentString,
  photoSentString, photoNotSentString,
  audioSentString, audioNotSentString,
} from '../../constants/media-strings'
import bot from '../../core/telegram-bot'

type SendGifType = { id: string, path: string, keyboard: ?{}, botSendDocument: (id: string, path: string, keyboard: ?{}) => Promise<any> }
function sendGif({ id, path, keyboard, botSendDocument }: SendGifType): Promise<any> {
  return new Promise((resolve: () => mixed, reject: (err: ?{}) => mixed) => {
    keyboard = keyboard || {}
    botSendDocument(id, path, keyboard).then(resolve).catch(resolve)
  })
}

type MediaByFileType = {
  id: string, path: string,
  cache: string, type: string,
  keyboard: ?{},
  botSendMedia: (id: string, path: string) => Promise<any>,
  botSendMessage: (id: string, text: string, keyboard: ?{}) => Promise<any>,
  confirmSuccessString: string, confirmFailString: string,
  showFeedback: boolean
}

function sendMediaByFile({ id, path, cache, keyboard, type, botSendMedia, botSendMessage, confirmSuccessString, confirmFailString, showFeedback }: MediaByFileType): Promise<any> {
  return new Promise((resolve: () => mixed, reject: (err: ?{}) => mixed) => {
    botSendMedia(id, path).then((response: {}) => {
      if (Array.isArray(response[type])) {
        cacheFile({
          name: cache,
          path: path,
          id: response[type][response[type].length - 1]['file_id'],
        }).then(() => {
          if (showFeedback) botSendMessage(id, `<b>${confirmSuccessString}</b>`, keyboard).then(resolve)
          else resolve()
        })
      } else {
        cacheFile({
          name: cache,
          path: path,
          id: response[type]['file_id'],
        }).then(() => {
          if (showFeedback) botSendMessage(id, `<b>${confirmSuccessString}</b>`, keyboard).then(resolve)
          else resolve()
        })
      }
    }).catch((err: {}) => {
      botSendMessage(id, `<b>${confirmFailString}</b>`, keyboard).then(resolve)
      console.error(String(err))
    })
  })
}

type MediaType = {
  id: string,
  document: string,
  path: string,
  keyboard: ?{},
  locale: string,
  type: string,
  showFeedback: boolean
}
function sendMedia({ id, document, path, keyboard, locale, type, showFeedback = false }: MediaType): Promise<any> {
  return new Promise((resolve: () => mixed, reject: (err: ?{}) => mixed) => {
    const cache = getCacheName(document, path)
    const botSendMessage = bot.sendMessage.bind(bot)
    const botSendDocument = bot.sendDocument.bind(bot)
    let botSendMedia
    let confirmSuccessString = ''
    let confirmFailString = ''
    switch (type) {
      case 'photo':
        botSendMedia = bot.sendPhoto.bind(bot)
        confirmSuccessString = photoSentString[locale]
        confirmFailString = photoNotSentString[locale]
        break
      case 'video':
        botSendMedia = bot.sendVideo.bind(bot)
        confirmSuccessString = videoSentString[locale]
        confirmFailString = videoNotSentString[locale]
        break
      case 'audio':
        botSendMedia = bot.sendVoice.bind(bot)
        confirmSuccessString = audioSentString[locale]
        confirmFailString = audioNotSentString[locale]
        type = 'voice'
        break

        // GIFs are handled similar to text
      case 'gif':
        sendGif({ id, path, keyboard, botSendDocument }).then(resolve)
        return
    }

    getFileId(cache).then((cacheId: string) => {
      if (cacheId) {
        botSendMedia(id, cacheId).then(() => {
          if (showFeedback) botSendMessage(id, `<b>${confirmSuccessString}</b>`, keyboard).then(resolve)
          else resolve()
        }).catch(() => {
          sendMediaByFile({
            id, cache, keyboard, path, type,
            botSendMedia, botSendMessage,
            confirmSuccessString, confirmFailString,
            showFeedback,
          }).then(resolve)
        })
      } else {
        sendMediaByFile({
          id, cache, keyboard, path, type,
          botSendMedia, botSendMessage,
          confirmSuccessString, confirmFailString,
          showFeedback,
        }).then(resolve)
      }
    })
  })
}

export default sendMedia
