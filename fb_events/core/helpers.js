'use strict'
const isEventPassed = ({ start, end }) => {
  const now = Date.now()
  const startTime = start && (new Date(start)).getTime()
  const endTime = end && (new Date(end)).getTime()
  return (endTime || startTime) - now <= 0
}

module.exports = {
  isEventPassed,
}