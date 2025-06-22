import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { expect, it } from 'vitest'
import jalali from '../src/dayjs/plugin'

dayjs.extend(utc)
dayjs.extend(jalali)

it('should respect utc', () => {
  const date = dayjs.utc().calendar('jalali')

  expect(date.isUTC()).toBe(true)
})
