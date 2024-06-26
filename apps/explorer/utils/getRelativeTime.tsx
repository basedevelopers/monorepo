import ms from "ms"

export function getRelativeTime(date: Date, lang = "en-US"): string {
  const timeMs = date.getTime() - new Date().getTime()
  const cutoffs = [ms("1m"), ms("1h"), ms("1d"), ms("1w"), ms("30d"), ms("1y")]
  const units: Intl.RelativeTimeFormatUnit[] = [
    "second",
    "minute",
    "hour",
    "day",
    "week",
    "month",
    "year",
  ]

  const msUnits = ["s", "m", "h", "d", "w", "M", "y"] as const

  const index = cutoffs.findIndex((cutoff) => Math.abs(timeMs) < cutoff)
  const unit = units[index] as Intl.RelativeTimeFormatUnit
  const value = Math.round(timeMs / ms(`1${msUnits[index]}`))

  return new Intl.RelativeTimeFormat(lang, {
    style: "long",
    numeric: "auto",
  }).format(value, unit)
}
