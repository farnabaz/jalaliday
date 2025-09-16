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
