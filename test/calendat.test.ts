import { describe, expect, it } from 'vitest'
import cal from '../src/calendar'

describe('calendar', () => {
  it('s', () => {
    expect(cal.G(1404, 6, 25)).toStrictEqual([2025, 9, 16])
  })
  it('f', () => {
    expect(cal.J(2025, 9, 16)).toStrictEqual([1404, 6, 25])
  })
})

describe('calendar: January and February of Gregorian leap years', () => {
  it('converts Gregorian to Jalali', () => {
    expect(cal.J(2024, 1, 1)).toStrictEqual([1402, 10, 11])
    expect(cal.J(2024, 2, 28)).toStrictEqual([1402, 12, 9])
    expect(cal.J(2024, 2, 29)).toStrictEqual([1402, 12, 10])
    expect(cal.J(2024, 3, 1)).toStrictEqual([1402, 12, 11])
    expect(cal.J(2000, 1, 1)).toStrictEqual([1378, 10, 11])
    expect(cal.J(2000, 2, 29)).toStrictEqual([1378, 12, 10])
  })

  it('round-trips every day from 1900 to 2100', () => {
    const start = Date.UTC(1900, 0, 1)
    const end = Date.UTC(2100, 0, 1)
    for (let t = start; t < end; t += 86400000) {
      const d = new Date(t)
      const g = [d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate()]
      const [jy, jm, jd] = cal.J(g[0], g[1], g[2])
      expect(cal.G(jy, jm, jd)).toStrictEqual(g)
    }
  })
})
