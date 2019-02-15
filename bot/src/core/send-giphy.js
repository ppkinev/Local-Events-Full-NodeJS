// @flow
'use strict'
import sendMedia from './send-media'
import { getRandomItem, getGifPath } from '../utils'
import { giphy_api_key } from '../config'

const giphy = require('giphy-api')(giphy_api_key)

import type { UserType, GiphyType, FuncType } from '../utils/types-generic'
export default ({ user, search }: { user: UserType, search: string }): Promise<any> => {
  return new Promise((resolve: FuncType, reject: FuncType) => {
    giphy.search(search, (err: ?{}, res: { data: [GiphyType] }) => {
      sendMedia({
        id: user._id,
        document: 'gifs',
        path: getGifPath(getRandomItem(res.data).id),
        type: 'gif',
        keyboard: undefined,
        locale: 'ru',
        showFeedback: false,
      }).then(resolve).catch(reject)
    })
  })
}