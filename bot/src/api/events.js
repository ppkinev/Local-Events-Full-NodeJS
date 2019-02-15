// @flow
'use strict'
import mongoose from 'mongoose'
import moment from 'moment'
import { db_url, mongo_options } from '../config'
import { UTC_SHIFT } from '../core/strings/global-constants'
const Event = require('../collections/event')
const Place = require('../collections/place')

import type { EntityType, EventType } from '../utils/types-generic'

mongoose.Promise = global.Promise
mongoose.connect(db_url, mongo_options)

const getPlaceId = (places: ?[string]): Promise<any> => {
  return new Promise((resolve: (id: ?string) => mixed) => {
    if (!places || !places.length) resolve()
    else {
      Place.findOne({ searchName: places[0] }, (err: {}, place: { id: string }) => {
        resolve(place ? place.id : undefined)
      })
    }
  })
}

const getDateQuery = (day: ?string, time: ?string): { from: string, to: string } => {
  const morning = {
    from: 6 - UTC_SHIFT,
    to: 12 - UTC_SHIFT,
  }
  const daytime = {
    from: 12 - UTC_SHIFT,
    to: 18 - UTC_SHIFT,
  }
  const evening = {
    from: 18 - UTC_SHIFT,
    to: 21 - UTC_SHIFT,
  }
  const night = {
    from: 21 - UTC_SHIFT,
    to: 6 - UTC_SHIFT, // next day
  }

  let dateFrom, dateTo
  switch (day) {
    case 'today':
      dateFrom = moment().utc().startOf('day')
      dateTo = moment().utc().startOf('day').add(1, 'days')
      break
    case 'tomorrow':
      dateFrom = moment().utc().startOf('day').add(1, 'days')
      dateTo = moment().utc().startOf('day').add(2, 'days')
      break
    case 'nextWeek':
      dateFrom = moment().utc().add(1, 'weeks').startOf('isoWeek')
      dateTo = moment().utc().add(1, 'weeks').endOf('isoWeek')
      break
    default:
      dateFrom = moment().utc().startOf('day')
      dateTo = moment(dateFrom).utc().add(10, 'days')
  }

  switch (time) {
    case 'morning':
      dateFrom = moment(dateFrom).utc().hour(morning.from)
      dateTo = moment(dateFrom).utc().hour(morning.to)
      break
    case 'evening':
      dateFrom = moment(dateFrom).utc().hour(evening.from)
      dateTo = moment(dateFrom).utc().hour(evening.to)
      break
    case 'night':
      dateFrom = moment(dateFrom).utc().hour(night.from)
      dateTo = moment(dateTo).utc().hour(night.to)
      break
    case 'day':
      dateFrom = moment(dateFrom).utc().hour(daytime.from)
      dateTo = moment(dateFrom).utc().hour(daytime.to)
      break
    default:
      dateFrom = moment(dateFrom).utc().hours(0)
      dateTo = moment(dateTo).utc().hours(0)
  }

  return {
    from: dateFrom.toDate(),
    to: dateTo.toDate(),
  }
}

const sortByAttendings = (a: { attending_count: number }, b: { attending_count: number }): number => b.attending_count - a.attending_count
const sortByDate = (a: { start_time: number }, b: { start_time: number }): number => a.start_time - b.start_time

type ArrType = ?[EventType]
const getFilteredEvents = ({ places, day, time, action }: EntityType): Promise<any> => {
  return new Promise((resolve: (ArrType) => mixed, reject: (string) => mixed) => {
    getPlaceId(places).then((placeId: string) => {
      const searchQuery = {}
      const getDate = (day && day.length) ? day[0] : null
      const getTime = (time && time.length) ? time[0] : null
      const rangeDate = getDateQuery(getDate, getTime)

      if (placeId) searchQuery['place.id'] = placeId
      searchQuery['start_time'] = { $gte: rangeDate.from, $lt: rangeDate.to }

      Event.find(searchQuery, (err: {}, events: ?[EventType]) => {
        if (err) {
          console.log(err)
          reject('ERR')
        } else {
          if (events && events.length) {
            resolve(events)
          } else {
            reject('NO')
          }
        }
      })
    })
  })
}

export const getTopThree = (entities: EntityType): Promise<any> => {
  return new Promise((resolve: (ArrType) => mixed, reject: (string) => mixed) => {
    // $FlowFixMe
    getFilteredEvents(entities).then((events: [EventType]) => {
      if (events && events.length) {
        const todayEvents = events.filter((event: EventType): boolean => moment(event.start_time).isSame(new Date(), 'day'))
        // $FlowFixMe
        resolve(todayEvents.sort(sortByAttendings).slice(0, 3).sort(sortByDate))
      }
    }).catch(reject)
  })
}

export const getThree = (entities: EntityType): Promise<any> => {
  return new Promise((resolve: (ArrType) => mixed, reject: (string) => mixed) => {
    getFilteredEvents(entities).then((events: [EventType]) => {
      // $FlowFixMe
      if (events && events.length) resolve(events.sort(sortByDate).slice(0, 3))
    }).catch(reject)
  })
}