import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import { expect, it } from 'vitest'
import jalali from '../src/dayjs/plugin'

dayjs.extend(weekday)
dayjs.extend(jalali)

it('should return correct weekday', () => {
  // پنج‌شنبه ۱ اسفند ۱۳۹۸
  const date = dayjs('1398-12-01', { jalali: true }).locale('fa')

  expect(date.day()).toBe(4)
  expect(date.weekday()).toBe(5)
})
