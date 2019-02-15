// @flow
'use strict'
const mongoose = require('mongoose')
import { db_url, mongo_options } from '../../config'

const Schema = mongoose.Schema
mongoose.Promise = global.Promise
mongoose.connect(db_url, mongo_options)

const fileCachingSchema = new Schema({
  id: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  path: { type: String, required: true },
})

const File = mongoose.model('cached-file', fileCachingSchema)

type FileCachingType = { id: string, name: string, path: string };
export const cacheFile = function ({ name, path, id }: FileCachingType): Promise<any> {
  return new Promise((resolve: (arg: mixed) => mixed, reject: (err: ?{}) => mixed) => {
    File.findOneAndUpdate({ id }, { name, path, id }, { upsert: true }, (err: ?{}) => {
      if (err) reject(err)
      else resolve(id)
    })
  })
}

export const getFileId = function (name: string): Promise<any> {
  return new Promise((resolve: (arg: mixed) => mixed, reject: (err: ?{}) => mixed) => {
    File.findOne({ name }, 'id', (err: ?{}, doc: { id: string }) => {
      if (err) reject(err)
      else {
        if (doc) resolve(doc.id)
        else resolve()
      }
    })
  })
}

export const getCacheName = function getCacheName(chapter: string, file: string): string {
  return chapter + file.substring(file.lastIndexOf('/'), file.length)
}
