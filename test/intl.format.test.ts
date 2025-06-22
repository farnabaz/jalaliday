import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { describe, expect, it } from 'vitest'
import jalali from '../src/dayjs/plugin'
import { formatDate } from '../src/intl/format'

dayjs.extend(jalali)
dayjs.extend(utc)

describe('formatDate', () => {
  it('should format date', () => {
    const d = new Date('2025-01-01')
    expect(formatDate(d)).toBe(dayjs(d).calendar('jalali').format('YYYY/MM/DD'))
  })

  it('should format date with custom format', () => {
    const d = new Date('2025-01-01')
    expect(formatDate(d, 'YYYY/MM/DD')).toBe(dayjs(d).calendar('jalali').format('YYYY/MM/DD'))
  })

  it('should format date with all tokens', () => {
    const date = new Date('2025-01-01T10:20:30Z')
    const dayjsDate = dayjs(date).calendar('jalali')

    expect(formatDate(date, 'YYYY')).toBe(dayjsDate.format('YYYY'))
    expect(formatDate(date, 'YY')).toBe(dayjsDate.format('YY'))
    expect(formatDate(date, 'MM')).toBe(dayjsDate.format('MM'))
    expect(formatDate(date, 'M')).toBe(dayjsDate.format('M'))
    expect(formatDate(date, 'DD')).toBe(dayjsDate.format('DD'))
    expect(formatDate(date, 'D')).toBe(dayjsDate.format('D'))
    expect(formatDate(date, 'HH')).toBe('13') // 10:20 UTC is 13:50 Tehran time, but test is only for hour
    expect(formatDate(date, 'H')).toBe('13') // 10:20 UTC is 13:50 Tehran time
    expect(formatDate(date, 'mm')).toBe('50') // 10:20 UTC is 13:50 Tehran time
    expect(formatDate(date, 'm')).toBe('50') // 10:20 UTC is 13:50 Tehran time
    expect(formatDate(date, 'ss')).toBe(dayjsDate.format('ss')) // 10:20 UTC is 13:50 Tehran time
    expect(formatDate(date, 's')).toBe(dayjsDate.format('s')) // 10:20 UTC is 13:50 Tehran time
  })
})
