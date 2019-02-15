// @flow
'use strict'
export const getArgument = (argument: string): ?string => {
  const value = process.argv.find((arg: string): boolean => arg.indexOf(`-${argument}=`) !== -1)
  return value ? value.split('=')[1] : null
}
export const getRandomInteger = (length: number): number => {
  return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1))
}

export const getRandomItem = (array: [any]): any => array[Math.floor(Math.random() * array.length)]

export const getGifPath = (id: string): string => `https://i.giphy.com/${id}.gif`
