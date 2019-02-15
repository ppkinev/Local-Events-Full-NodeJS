'use strict'
const lookup0 = [...require('./dictionaries/lookup0.json')]
const lookupRXP = [...require('./dictionaries/lookup-rxp.json')]
const lookup1 = [...require('./dictionaries/lookup1.json')]
const lookup2 = [...require('./dictionaries/lookup2.json')]
const lookup3 = [...require('./dictionaries/lookup3.json')]

const getRandomItem = array => array[Math.floor(Math.random() * array.length)]
const chanceToShow = () => Math.floor(Math.random() * 100) >= 50
const SPACE_RXP = /\s+/g

const getReply = (text, lookup) => {
  if (SPACE_RXP.test(lookup.lookUp)) {
    if (text.indexOf(lookup.lookUp) !== -1) {
      return lookup.reply
    }
  } else {
    if (text.split(' ').some(word => word === lookup.lookUp) && chanceToShow()) {
      return lookup.reply
    } else {
      return null
    }
  }
}

const getRXPReply = (text, lookup) => {
  const rxp = new RegExp(lookup.lookUp, 'i')
  if (!SPACE_RXP.test(text)) text += ' '
  return rxp.test(text) ? lookup.reply : null
}

module.exports = (text) => {
  let reply = null
  const replies = []

  for (let i = 0; i < lookup0.length; i++) {
    reply = getReply(text, lookup0[i])
    if (reply) replies.push(reply)
  }
  for (let i = 0; i < lookupRXP.length; i++) {
    reply = getRXPReply(text, lookupRXP[i])
    if (reply) replies.push(...reply)
  }
  if (replies.length > 0) {
    return getRandomItem(replies)
  } else {
    // save inputs to DB here for further analysis
  }


  for (let i = 0; i < lookup1.length; i++) {
    reply = getReply(text, lookup1[i])
    if (reply) return reply
  }

  for (let i = 0; i < lookup2.length; i++) {
    for (let t = 0; t < lookup2[i].lookUp.length; t++) {
      if (text.split(' ').some(word => word === lookup2[i].lookUp[t])) {
        return lookup2[i].reply
      }
    }
  }

  return getRandomItem(lookup3).reply
}