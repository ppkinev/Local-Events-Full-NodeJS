'use strict'
const axios = require('axios')
const config = require('./core/config')

const preStart = require('./core/events-clean')
const start = require('./core/events-check')


axios(`https://graph.facebook.com/oauth/access_token?client_id=${config.client_id}&client_secret=${config.client_secret}&grant_type=client_credentials`)
    .then((res) => {
      const token = res.data.access_token
      console.log('Request OK:', token)
      preStart(token).then(() => {
        start(token)
      })
    })
    .catch((err) => {
      console.warn(err)
    })

/**
 1. List of groups and pages to get events from
 2. Schedule script to get events twice a day
 3. Store all events in database (create a handy DB format)
 4. Create API to get events from the database
 5. On every script launch check if new EVENTS appeared, then store them
 **/

// const a = {
//   '_id': ObjectId('5984b14d9aec840644db2236'),
//   'id': '1994761070794139',
//   'updated_time': ISODate('2017-08-04T11:23:45Z'),
//   'type': 'public',
//   'name': 'Гарик Корогодский. Продам бестселлер',
//   'attending_count': 67,
//   'declined_count': 0,
//   'interested_count': 325,
//   'maybe_count': 325,
//   'noreply_count': 93,
//   'description': 'В Одессе снова пройдёт вечер вопросов и ответов с Гариком Корогодским. У присутствующих будет возможность задать неограниченное количество самых нескромных вопросов. Гарик обещает ответить на все вопросы, кроме скучных, и подсказать способы войти/выйти в любое состояние.\n\nГарик Корогодски — эксцентричный миллионер, автор бестселлера «Как потратить миллион, которого нет и другие истории еврейского мальчика», блоггер, актер, меценат, Самовысуванець в мэры Киева и просто ̶к̶р̶а̶с̶а̶в̶ч̶и̶к̶. \n\nОпыт Гарика Корогодского – ярчайший пример удачного сочетания карьеры бизнесмена и писателя. Корогодский уже неоднократно входил в украинскую сотню Forbes, издавая при этом полезные и веселые книги. Все они – бестселлеры.\n\nУ вас будет возможность приобрести книги автора: «Как потратить миллион, которого нет, и другие истории еврейского мальчика» 1-2 часть, «У нас был секс», а также подписать их у автора. \n\nБилеты можно приобрести на рецепции Терминала 42 или по ссылке: https://terminal42.com.ua/event/prodam-bestseller-g-korogodskij/\nВсе собранные средства пойдут на благотворительный фонд Жизнелюб, занимающегося досугом пенсионеров.\n\nЧтобы не про..ать шанс побеседовать с Гариком и пожертвовать на содержание его многочисленных бабушек, приобретайте билеты, количество которых, в отличие от наших с вами умственных способностей, ограничено.\n\nПриходите обязательно!',
//   'start_time': ISODate('2017-08-05T13:30:00Z'),
//   'end_time': ISODate('2017-08-05T15:30:00Z'),
//   'is_canceled': false,
//   'is_page_owned': true,
//   'ticket_uri': 'https://terminal42.com.ua/event/prodam-bestseller-g-korogodskij/',
//   'timezone': 'Europe/Kiev',
//   'place': [{
//     'name': 'Терминал 42',
//     'id': '894144457305519',
//     'location': {
//       'city': 'Odessa',
//       'country': 'Ukraine',
//       'latitude': 46.4756822,
//       'longitude': 30.7399357,
//       'street': 'Ришельевская 33',
//       'zip': '65011',
//     },
//   }],
//   'owner': [{ 'name': 'Терминал 42', 'id': '894144457305519' }],
//   'cover': [{ 'source': 'https://scontent.xx.fbcdn.net/v/t1.0-9/s720x720/19990253_1500227266697232_5235144552733395072_n.jpg?oh=f0b4901ec3e140470e20532e9e17946a&oe=5A32947F' }],
//   '__v': 0,
// }
