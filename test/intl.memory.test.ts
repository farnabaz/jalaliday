import { describe, it } from 'vitest'

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0)
    return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${Number.parseFloat((bytes / (k ** i)).toFixed(dm))} ${sizes[i]}`
}

describe('intl.DateTimeFormat memory usage', () => {
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
  const iterations = 10000 // More iterations for memory test

  it('should measure memory for creating new formatter in every format', () => {
    const startMemory = process.memoryUsage().heapUsed

    for (let i = 0; i < iterations; i++)
      new Intl.DateTimeFormat('fa-IR', options).format(date)

    const endMemory = process.memoryUsage().heapUsed
    const diff = endMemory - startMemory

    console.warn(`[New formatter]: Memory used: ${formatBytes(diff)} for ${iterations} iterations.`)
  })

  it('should measure memory for cached formatter', () => {
    const startMemory = process.memoryUsage().heapUsed

    const formatter = new Intl.DateTimeFormat('fa-IR', options)
    for (let i = 0; i < iterations; i++)
      formatter.format(date)

    const endMemory = process.memoryUsage().heapUsed
    const diff = endMemory - startMemory
    console.warn(`[Cached formatter]: Memory used: ${formatBytes(diff)} for ${iterations} iterations.`)
  })
})
