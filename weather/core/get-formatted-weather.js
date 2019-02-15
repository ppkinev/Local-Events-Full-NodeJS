module.exports = (weatherCode) => {
  let desc = ''
  switch (Number(weatherCode)) {
    case 0:
      desc = 'ожидается :cyclone: торнадо'
      break
    case 1:
      desc = 'ожидается :cyclone: тропический шторм'
      break
    case 2:
      desc = 'впереди ураганы :cyclone:'
      break
    case 3:
      desc = 'ожидаются сильные грозы :zap:'
      break
    case 4:
      desc = 'ждем грозу :umbrella:'
      break
    case 5:
      desc = 'приготовьтесь :umbrella: к дождю со снегом'
      break
    case 6:
      desc = ':snowflake: мокрый снег нас ждет сегодня'
      break
    case 7:
      desc = 'будет липкий снежок :snowflake:'
      break
    case 8:
      desc = 'в этот раз нас ждет изморозь'
      break
    case 9:
      desc = 'ждем мелкий дождик :umbrella:'
      break
    case 10:
      desc = 'встречаем ледяной дождь :umbrella:'
      break
    case 11:
      desc = 'впереди ливни :umbrella:'
      break
    case 12:
      desc = 'впереди ливни :umbrella:'
      break
    case 13:
      desc = 'местами юудут порывы снега :snowflake:'
      break
    case 14:
      desc = ':snowflake: легкий снегопад на повестке дня'
      break
    case 15:
      desc = ':snowflake: снежная метель к нам пришла'
      break
    case 16:
      desc = ':snowflake: ожидаем снег'
      break
    case 17:
      desc = 'град, просто град'
      break
    case 18:
      desc = 'сегодня :snowflake: мокрый снежок'
      break
    case 19:
      desc = 'пыль :foggy:'
      break
    case 20:
      desc = 'туманный день :foggy:'
      break
    case 21:
      desc = ':foggy: мглу заказывали?'
      break
    case 22:
      desc = 'и дымкой :foggy: город занесло..'
      break
    case 23:
      desc = 'крайне ветренно за окном'
      break
    case 24:
      desc = 'ветренный день'
      break
    case 25:
      desc = 'там холодно'
      break
    case 26:
      desc = ':cloud: снаружи облачно'
      break
    case 27:
      desc = 'ночью облачно :cloud:'
      break
    case 28:
      desc = 'облачно днем :partly_sunny:'
      break
    case 29:
      desc = 'частичная облачность ночью'
      break
    case 30:
      desc = ':partly_sunny: частичная облачность днем'
      break
    case 31:
      desc = 'ясная ночь'
      break
    case 32:
      desc = 'сегодня солнечно :sunny:'
      break
    case 33:
      desc = 'ясная погода ночью'
      break
    case 34:
      desc = 'ясная погода днем :sunny:'
      break
    case 35:
      desc = 'дождь и град, господа'
      break
    case 36:
      desc = 'жара... включаем кондиционеры'
      break
    case 37:
      desc = ':zap: местами грозы'
      break
    case 38:
      desc = ':zap: рассеянные грозы'
      break
    case 39:
      desc = ':zap: рассеянные грозы'
      break
    case 40:
      desc = 'рассеянные ливни :umbrella:'
      break
    case 41:
      desc = 'тут типа :snowflake: снегопад'
      break
    case 42:
      desc = 'местами снегопад :snowflake:'
      break
    case 43:
      desc = 'тут типа снегопад :snowflake:'
      break
    case 44:
      desc = 'частичная облачность :partly_sunny:'
      break
    case 45:
      desc = 'гроза над нами :zap:'
      break
    case 46:
      desc = 'да будет СНЕГ :snowflake:'
      break
    case 47:
      desc = 'местами грозы, много :zap:'
      break
    default:
      desc = ''
  }

  return desc
}
