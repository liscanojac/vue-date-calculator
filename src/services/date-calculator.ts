import type { DateOptions, TimeDifference } from '@/interfaces/date-calculator'

export function dateDifference(startDate: string, endDate: string) {}

export function dateDifferenceInDays(start: string, end: string): number {
  const MS_PER_DAY = 1000 * 60 * 60 * 24
  const startDate: Date = new Date(start)
  const endDate: Date = new Date(end)

  const startDateUTC = Date.UTC(
    startDate.getUTCFullYear(),
    startDate.getMonth(),
    startDate.getUTCDate(),
  )
  const endDateUTC = Date.UTC(endDate.getUTCFullYear(), endDate.getMonth(), endDate.getUTCDate())

  return Math.floor((endDateUTC - startDateUTC) / MS_PER_DAY)
}

export class DateDifference {
  start: String
  end: String
  private startDate: Date
  private endDate: Date
  private differenceInDays: number
  private MS_PER_DAY = 1000 * 60 * 60 * 24
  timeDifference: TimeDifference = {
    years: {
      total: 0,
      months: 0,
      months_days: 0,
      weeks: 0,
      weeks_days: 0,
    },
    months: {
      total: 0,
      weeks: 0,
      weeks_days: 0,
      days: 0,
    },
    weeks: {
      total: 0,
      days: 0,
    },
    days: {
      total: 0,
    },
  }

  constructor(start: string, end: string) {
    this.start = start
    this.end = end
    this.startDate = this.getNewDateUTC(start)
    this.endDate = this.getNewDateUTC(end)
    this.differenceInDays = this.getDifferenceInDays(start, end)
    this.timeDifference.days.total = this.differenceInDays
  }

  private getNewDateUTC(date: string): Date {
    return new Date(`${date}T00:00:00Z`)
  }

  getDifferenceInDays(start: string, end: string): number {
    const startDate = this.getNewDateUTC(start)
    const endDate = this.getNewDateUTC(end)
    const startDateUTC = Date.UTC(
      startDate.getUTCFullYear(),
      startDate.getUTCMonth(),
      startDate.getUTCDate(),
    )
    const endDateUTC = Date.UTC(
      endDate.getUTCFullYear(),
      endDate.getUTCMonth(),
      endDate.getUTCDate(),
    )

    return Math.floor((endDateUTC - startDateUTC) / this.MS_PER_DAY)
  }

  getDifferenceInYears(): number {
    let yearsDifference = 0
    if (this.timeDifference.days.total < 365) return yearsDifference

    yearsDifference = this.endDate.getUTCFullYear() - this.startDate.getUTCFullYear()
    if (this.beforeWholeYear()) yearsDifference--

    return yearsDifference
  }

  getDifferenceInMonths(): number {
    let monthsDifference = 0
    if (this.timeDifference.days.total < 28) return monthsDifference

    monthsDifference = this.endDate.getUTCMonth() - this.startDate.getUTCMonth()

    if (this.beforeWholeMonth()) monthsDifference--
    if (monthsDifference < 0) monthsDifference = monthsDifference + 12

    return this.getDifferenceInYears() * 12 + monthsDifference
  }

  private beforeWholeYear(): boolean {
    return (
      this.endDate.getUTCMonth() < this.startDate.getUTCMonth() ||
      (this.endDate.getUTCMonth() === this.startDate.getUTCMonth() &&
        this.endDate.getUTCDate() < this.startDate.getUTCDate())
    )
  }

  private beforeWholeMonth(): boolean {
    return this.endDate.getUTCDate() < this.startDate.getUTCDate()
  }

  private isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  }

  addMonths(date: Date, months: number): Date {
    return new Date(date.setMonth(date.getUTCMonth() + months))
  }

  addMonths2(date: Date, months: number): Date {
    const newDate = new Date(date)
    const originalDate = date.getUTCDate()
    newDate.setUTCDate(1)
    newDate.setUTCMonth(newDate.getUTCMonth() + months)
    if (originalDate > 28) {
      const newDateMonthLength = this.getMonthLength(newDate)
      originalDate > newDateMonthLength
        ? newDate.setUTCDate(newDateMonthLength)
        : newDate.setUTCDate(originalDate)
    }
    return newDate
  }

  private getMonthLength(date: Date): number {
    return [
      31,
      this.isLeapYear(date.getUTCFullYear()) ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ][date.getUTCMonth()]
  }
  calculate(options: DateOptions) {
    if (options.years.months_days || options.years.weeks_days) this.getDifferenceInYears()
  }
}
