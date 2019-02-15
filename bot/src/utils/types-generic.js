// @flow
export type TelegramMessageType =
    {
      from: {
        id: number,
        first_name: string,
        last_name: string,
        username: string,
        language_code: string
      },
      text: string
    }

export type FuncType = () => mixed

export type UserType = {
  _id: string,
  firstName: string,
  lastName: string,
  userName: string,
  gender: string,
  age: number,
  email: string,
  profile_pic: string,
  locale: string,
  timezone: string,
  lastSeen: string,
  createdOn: string,
  language: string,
  informalMessagesInARow: number,
  isConfirmationToShowTopRequired: boolean,
  isFromNotification: boolean
}

export type EntityType = {
  places: ?[string],
  day: ?[string],
  time: ?[string],
  action: ?[string] | string,
  about_bot: ?string,
  searching_drink: ?string,
  searching_food: ?string
}

export type PlaceType = {
  id: string,
  name: string,
  location: {
    city: string,
    country: string,
    latitude: number,
    longitude: number,
    street: string
  }
}

export type EventType = {
  id: string,
  name: string,
  attending_count: number,
  start_time: string,
  end_time: string,
  place: PlaceType,
  ticket_uri: ?string,
  cover: [{ source: string }],
  owner: [{ name: string }],
  witCategories: [?{ count: number, name: string }]
}

export type GiphyType = {
  id: string,
  bitly_gif_url: string
}

type SingleCurrencyType = {
  buy: number,
  sell: number
}
export type CurrencyType = {
  received: string,
  eur: SingleCurrencyType,
  rur: SingleCurrencyType,
  usd: SingleCurrencyType,
  btc: SingleCurrencyType
}

export type ForecastType = {
  received: string,
  temperature: string,
  description: string
}
