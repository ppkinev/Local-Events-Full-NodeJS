const Scheduler = (() => {
  'use strict'
  const interval = 1000
  let events = []
  let now
  setInterval(() => {
    now = Date.now()
    let lastIndex = -1

    for (let i = 0; i < events.length; i++) {
      if (events[i].timestamp > now) break
      events[i].event()
      lastIndex = i
    }
    events.splice(0, lastIndex + 1)
  }, interval)

  const addEvent = function ({ time, delay, event, uid }) {
    const ev = {
      timestamp: time || Date.now() + delay * 1000,
      event: event,
      uid: uid || null,
    }

    let inserted = false
    if (events.length === 0) events.push(ev)
    else {
      let leftEnd = 0, rightEnd = events.length
      while (!inserted) {
        let candidate = events[Math.floor((rightEnd + leftEnd) / 2)]
        if (candidate && ev.timestamp === candidate.timestamp) {
          leftEnd = 0
          rightEnd = events.length
          ev.timestamp++
        } else if (rightEnd === leftEnd) {
          events.splice(leftEnd, 0, ev)
          inserted = true
        } else {
          if (candidate.timestamp < ev.timestamp) {
            leftEnd = Math.floor((rightEnd + leftEnd) / 2) + 1
          } else if (candidate.timestamp > ev.timestamp) {
            rightEnd = Math.floor((rightEnd + leftEnd) / 2)
          }
        }
      }
    }
  }

  return {
    add: ({ time, delay, event, uid }) => {
      if (time || delay) addEvent({ time, delay, event, uid })
      else event()
    },
    removeByTimestamp: (time) => {
      let index = -1
      for (let i = 0; i < events.length; i++) {
        if (events[i].timestamp === time) {
          index = i
          break
        }
      }
      if (index !== -1) events.splice(index, 1)
    },
    removeById: function (uid) {
      events = events.filter((ev) => ev.uid !== uid)
    },
  }
})()

export default Scheduler
