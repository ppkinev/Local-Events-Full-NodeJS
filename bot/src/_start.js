// @flow
// 'use strict'
// import bot from './core/bot'
// const mongoose = require('mongoose')
// import Scheduler from './core/scheduler'
// import { db_url, baseDir } from './config'
// import { sendGAPageView } from './core/analytics'
//
import User from './collections/user'
//
// import sendText from './core/send-text'
// import sendMedia from './components/telegram-send-media';
// import sendLink from './components/telegram-send-link';

// mongoose.Promise = global.Promise;
// mongoose.connect(db_url);

const user2 = new User({ _id: 5 })
// user.addGameProgress();

// console.log(Scheduler);

// telegramCaching.getFileId('ad').then((res: any) => {
//     console.log('res: ', res);
// }).catch((err: any) => {
//     console.warn('err: ', err);
// });

// telegramCaching.cacheFile({name: '123', id: 'aasdddc', path: '11sds31d'}).then((res: any) => {
//     console.log('res: ', res);
// }).catch((err: any) => {
//     console.warn('err: ', err);
// });

User.findOneAndUpdate({ _id: 5 }, user2, { new: true }, (err, user) => {
  console.log(err)
  console.log(user)
})

// user.save().then(() => {
//     console.log(user);
// }).catch((err: {errmsg: string, code: number}) => {
//     const {errmsg, code} = err;
//     console.error(errmsg);
//     console.error(code);
// });

// sendText({ id: '238311990', text: 'Some text' })