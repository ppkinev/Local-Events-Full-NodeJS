// @flow
'use strict'
import moment from 'moment'
import Place from '../../collections/place'
import sendText from '../../core/send-text'
import sendEvents from './events-sender'
import { getThree, getTopThree } from '../../api/events'
import { UTC_SHIFT } from '../strings/global-constants'
import type { UserType, FuncType, EntityType, EventType } from '../../utils/types-generic'

moment.locale('ru')

const sortByCount = (a: { count: number }, b: { count: number }): number => a.count - b.count
const filterCats = (cat: { count: number }): {} => cat.count > 1

const formatEventMessage = ({ id, name, attending_count, start_time, end_time, place, ticket_uri, owner, witCategories, category }: EventType): string => {
  const tickets = ticket_uri ? `:link: <a href="${ticket_uri}">Приобрести билет</a>` : ''
  const owners = owner.map((o: { name: string }): string => o.name).join(', ')
  const address = place.location.street ? `по адресу ${place.location.city}, ${place.location.street}` : ''

  const ownersToShow = `:alien: Проводят: <b>${owners}</b>`
  const attenders = (attending_count > 1) ? `\n:busts_in_silhouette: Ожидаем минимум ${attending_count} гостей` : ''

  const isUTC = !Boolean(Math.abs(moment.parseZone(start_time).utcOffset()))
  const time = isUTC ? moment(start_time).add(UTC_SHIFT, 'hours') : moment(start_time)

  const notedCategories = category && Array.isArray(category) ? category.join(', ') : (category || '')
  const categoriesToShow = witCategories.filter(filterCats)

  const timeToStart = `:date: Состоится <b>${time.format('Do MMMM')} в ${time.format('HH:mm')}</b>`

  const endTime = isUTC ? moment(end_time).add(UTC_SHIFT, 'hours') : moment(end_time)
  const timeToEnd = end_time ? `\n:lock: Завершится <b>${endTime.format('Do MMMM')} в ${endTime.format('HH:mm')}</b>` : ''

  // $FlowFixMe
  const categories = categoriesToShow.length ? `\n:wrench: Категории: <b>${categoriesToShow.sort(sortByCount).map((c: string): string => c.name).join(', ')} ${notedCategories}</b>\n` : ''
  return `
:link: <a href="https://www.facebook.com/events/${id}/">${name}</a>

${ownersToShow}${attenders}
${timeToStart}${timeToEnd}
:office: Ищите в ${place.name} ${address}
${categories}
${tickets}
`
}

export default ({ user, entities, top3 }: { user: UserType, entities: EntityType, top3: boolean }): Promise<any> => {
  return new Promise((resolve: FuncType, reject: FuncType) => {
    const { _id: id } = user
    const keyboard = undefined

    const getReplies = top3 ? getTopThree : getThree

    getReplies(entities).then((events: [EventType]) => {
      sendEvents(user, events, formatEventMessage).then(resolve)
    }).catch((reason: string) => {
      if (reason === 'ERR') {
        sendText({ id, text: 'Some random error', keyboard }).then(resolve).catch(reject)
      } else {
        if (entities.places.length) {
          Place.findOne({ searchName: entities.places[0] }, (err: {}, place: { name: string }) => {
            sendText({
              id,
              text: `:no_mouth: Что-то ничего не могу найти в "${place.name}", попробуй в другой раз или другое место?`,
              keyboard,
            }).then(resolve).catch(reject)
          })
        } else {
          sendText({
            id,
            text: 'Хм :neutral_face:, похоже ничего интересного нет, может поискать в других местах?',
            keyboard,
          }).then(resolve).catch(reject)
        }
      }
    })
  })
}
