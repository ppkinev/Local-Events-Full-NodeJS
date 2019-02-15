// @flow
'use strict'
const ua = require('universal-analytics')
import { platform, hostName } from '../config'

const GA_ID = 'UA-83298050-1'

export function sendGAPageView(userId: string, pageName: string, label: string) {
  const visitor = ua(GA_ID, userId, { strictCidFormat: false })
  visitor.pageview({
    dp: `/${platform}/${pageName}`,
    dt: label,
    dh: hostName,
  }, function (err: string) {
    if (err) console.log(err)
  })
}
