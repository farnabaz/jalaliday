import type { PluginFunc } from 'dayjs'

declare const plugin: PluginFunc
export default plugin

type CalendarType = 'jalali' | 'gregory'

declare module 'dayjs' {
  // @ts-expect-error - dayjs types are not correct
  import type { Dayjs } from 'dayjs'

  export function calendar(calendarType: CalendarType): Dayjs

  export function isJalali(): boolean

  export interface FormatObject {
    jalali?: boolean
  }

  interface Dayjs {
    calendar: (calendarType: CalendarType) => Dayjs
  }
}
