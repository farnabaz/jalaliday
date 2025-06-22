import dayjs from 'dayjs'
import MockDate from 'mockdate'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import jalali from '../src/dayjs/plugin'

dayjs.extend(jalali)
dayjs.calendar('jalali')

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

describe('diff two dates', () => {
  const a = dayjs('1397/06/01', { jalali: true })
  const b = dayjs('1397/09/10', { jalali: true })

  it('diff(float)', () => {
    expect(a.diff(b, 'month', true).toFixed(1)).toEqual('-3.3')
  })

  it('diff(month)', () => {
    expect(a.diff(b, 'month', false)).toEqual(-3)
  })

  it('diff(day)', () => {
    expect(a.diff(b, 'day')).toEqual(-100)
  })

  it('diff(day): a gregory and jalali', () => {
    expect(a.calendar('gregory').diff(b, 'day')).toEqual(-100)
  })

  it('diff(year)', () => {
    expect(a.diff(b, 'year')).toEqual(0)
  })
})
