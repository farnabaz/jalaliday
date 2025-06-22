const defaultOptions = {
  locale: 'fa-IR-u-ca-persian',
  defaultFormat: 'YYYY/MM/DD',
  timeZone: 'Asia/Tehran',
}

export interface FormatOptions {
  locale: Intl.LocalesArgument
  defaultFormat: string
  timeZone: string
}

// Map format tokens to Intl.DateTimeFormat part types and formatting logic
const tokenMap: Record<string, (parts: Record<string, string>) => string> = {
  YYYY: /**/ parts => parts.year ?? '',
  YY: /*  */ parts => parts.year ? parts.year.slice(-2) : '',
  MM: /*  */ parts => parts.month ?? '',
  M: /*   */ parts => parts.month ? String(parts.month) : '',
  DD: /*  */ parts => parts.day ?? '',
  D: /*   */ parts => parts.day ? String(parts.day) : '',
  HH: /*  */ parts => parts.hour ?? '00',
  H: /*   */ parts => parts.hour ? String(parts.hour) : '0',
  mm: /*  */ parts => parts.minute ?? '00',
  m: /*   */ parts => parts.minute ? String(parts.minute) : '0',
  ss: /*  */ parts => parts.second ?? '00',
  s: /*   */ parts => parts.second ? String(parts.second) : '0',
}

// Regex to match supported tokens
const tokenRegex = /YYYY|YY|MM|M|DD|D|HH|H|mm|m|ss|s/g

export function createFormatter(opts: Partial<FormatOptions> = defaultOptions) {
  const { locale, defaultFormat, timeZone } = { ...defaultOptions, ...opts }

  // Always use all parts for maximum flexibility
  const formatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    numberingSystem: 'latn',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone,
  })

  /**
   * Formats a Date object using a Day.js-like format string (limited to supported tokens).
   * @param date - The Date object to format
   * @param format - The format string (e.g., 'YYYY/MM/DD HH:mm:ss')
   * @returns The formatted date string
   */
  return function formatDate(date: Date, format?: string) {
    const parts = formatter.formatToParts(date).reduce((acc, part) => {
      if (part.type !== 'literal')
        acc[part.type] = part.value
      return acc
    }, {} as Record<string, string>)

    // Replace tokens in the format string
    return (format || defaultFormat || 'YYYY/MM/DD').replace(tokenRegex, (token) => {
      const fn = tokenMap[token]
      return fn ? fn(parts) : token
    })
  }
}

/**
 * Formats a Date object using a Day.js-like format string (limited to supported tokens).
 * @param date - The Date object to format
 * @param format - The format string (e.g., 'YYYY/MM/DD HH:mm:ss')
 * @returns The formatted date string
 */
export const formatDate = createFormatter({
  locale: 'fa-IR-u-ca-persian',
  defaultFormat: 'YYYY/MM/DD',
  timeZone: 'Asia/Tehran',
})
