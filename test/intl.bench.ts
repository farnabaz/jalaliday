import { bench, describe } from 'vitest'

describe('intl.format performance', () => {
  const date = new Date()
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'UTC',
    calendar: 'persian',
  }

  bench('create new formatter in every format', () => {
    for (let i = 0; i < 1000; i++) {
      new Intl.DateTimeFormat('fa-IR', options).format(date)
    }
  })

  bench('create formatter and cache for next calls', () => {
    const formatter = new Intl.DateTimeFormat('fa-IR', options)
    for (let i = 0; i < 1000; i++) {
      formatter.format(date)
    }
  })
})
