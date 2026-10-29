import { HOURS } from '../config'

/** A calendar day in Almaty time, independent of the visitor's own time zone. */
export type Day = { y: number; m: number; d: number; key: string; weekday: number }

const pad = (n: number) => String(n).padStart(2, '0')

/** Current date and minutes-since-midnight in Asia/Almaty. */
export function almatyNow() {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Almaty', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
      .formatToParts(new Date())
      .map((p) => [p.type, p.value]),
  )
  return { y: +parts.year, m: +parts.month, d: +parts.day, minutes: +parts.hour * 60 + +parts.minute }
}

export function makeDay(y: number, m: number, d: number): Day {
  const dt = new Date(Date.UTC(y, m - 1, d))
  return { y: dt.getUTCFullYear(), m: dt.getUTCMonth() + 1, d: dt.getUTCDate(), key: `${dt.getUTCFullYear()}-${pad(dt.getUTCMonth() + 1)}-${pad(dt.getUTCDate())}`, weekday: dt.getUTCDay() }
}

export function nextDays(count: number): Day[] {
  const now = almatyNow()
  return Array.from({ length: count }, (_, i) => makeDay(now.y, now.m, now.d + i))
}

// Small deterministic PRNG so the mocked schedule is stable for a given day.
function seeded(str: string) {
  let h = 2166136261
  for (const c of str) h = Math.imul(h ^ c.charCodeAt(0), 16777619)
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507)
    h = Math.imul(h ^ (h >>> 13), 3266489909)
    return ((h ^= h >>> 16) >>> 0) / 4294967296
  }
}

/** Mocked free slots ("HH:MM") for a day and visit length; roughly 40% of the grid is already booked. */
export function slotsFor(day: Day, minutes: number): string[] {
  const hours = HOURS[day.weekday]
  if (!hours) return []
  const [open, close] = hours
  const rnd = seeded(`${day.key}:${minutes}`)
  const now = almatyNow()
  const isToday = day.y === now.y && day.m === now.m && day.d === now.d
  const out: string[] = []
  for (let t = open * 60; t + minutes <= close * 60; t += 30) {
    if (t >= 13 * 60 && t < 14 * 60) continue // lunch
    if (isToday && t < now.minutes + 90) continue
    if (rnd() < 0.42) continue
    out.push(`${pad(Math.floor(t / 60))}:${pad(t % 60)}`)
  }
  return out
}

export const isClosed = (day: Day) => !HOURS[day.weekday]

/** Format a day for display in the chosen language. */
export function formatDay(day: Day, lang: string, opts: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat(lang === 'ru' ? 'ru-RU' : 'en-GB', { timeZone: 'UTC', ...opts }).format(new Date(Date.UTC(day.y, day.m - 1, day.d)))
}
