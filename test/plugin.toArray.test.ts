import dayjs from 'dayjs'
import toArray from 'dayjs/plugin/toArray'
import MockDate from 'mockdate'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import jalali from '../src/dayjs/plugin'

describe('plugin.toArray', () => {
  dayjs.extend(toArray)
  dayjs.extend(jalali)
  dayjs.calendar('jalali')

  beforeEach(() => {
    MockDate.set(new Date())
  })

  afterEach(() => {
    MockDate.reset()
  })

  it('convert date to array gregory', () => {
    const date = dayjs('2018/09/03').calendar('gregory')
    expect(date.toArray()).toEqual([2018, 8, 3, 0, 0, 0, 0])
  })

  it('convert date to array jalali', () => {
    const date = dayjs('1397/06/13', { jalali: true })
    expect(date.toArray()).toEqual([1397, 5, 13, 0, 0, 0, 0])
  })
})
