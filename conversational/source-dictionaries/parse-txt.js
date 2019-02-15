'use strict'
const fs = require('fs')

function getArgument(argument) {
  const value = process.argv.find((arg) => arg.indexOf(`-${argument}=`) !== -1)
  return value ? value.split('=')[1] : null
}

const path = `${__dirname}/dictionaries/${getArgument('file')}.txt`
const output = `${__dirname}/dictionaries/${getArgument('file')}.json`

const linesRXP = /^(.*)\r\n/gm
// const lookUpRXP = /\[(.*)\W]/gm
const lookUpRXP = /{(.*)\W}/gm
// const lookUpRXP = /\((.*)\W\)/gm
const lookUpJokesRXP = /(.*)==(.*)/gm

fs.readFile(path, 'utf-8', (err, file) => {
  if (err) return err

  const pairs = []
  let result, temp;
  while((result = linesRXP.exec(file)) !== null) {
    if (result[1]) {
      // if (lookUpRXP.test(result[1])) {
      //   temp = result[1].replace(lookUpRXP, '$1').trim()
      //   console.log('LOOK UP: ', result[1].replace(lookUpRXP, '$1'))
      // } else {
      //   pairs.push({
      //     lookUp: temp.split(' '),
      //     reply: result[1].trim(),
      //   })
      //   console.log('PHRASE: ', result[1].trim())
      // }
      if (lookUpJokesRXP.test(result[1])) {
        pairs.push({
          lookUp: result[1].replace(lookUpJokesRXP, '$1').trim(),
          reply: result[1].replace(lookUpJokesRXP, '$2').trim(),
        })
      }
    }
  }

  fs.writeFile(output, JSON.stringify(pairs, null, '\t'))
})