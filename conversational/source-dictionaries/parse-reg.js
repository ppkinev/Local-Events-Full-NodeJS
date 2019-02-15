'use strict'
const fs = require('fs')

function getArgument(argument) {
  const value = process.argv.find((arg) => arg.indexOf(`-${argument}=`) !== -1)
  return value ? value.split('=')[1] : null
}

const path = `${__dirname}/dictionaries/src/${getArgument('file')}.txt`
const output = `${__dirname}/dictionaries/${getArgument('file')}.json`

const RXP = /(\^.*\$)\n([^\^]*)/gm

const final = []

fs.readFile(path, 'utf-8', (err, file) => {
  if (err) {
    console.log(err)
    return err
  }

  let result
  while ((result = RXP.exec(file)) !== null) {
    if (result[1]) {
      const regex = result[1]
      const replies = result[2]

      final.push({
        lookUp: regex.replace('(?i)', ''),
        reply: replies.split('\n').filter(r => r.length > 0),
      })
    }
  }

  fs.writeFile(output, JSON.stringify(final, null, '\t'))
})
