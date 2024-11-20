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

export class DateDifferenceBase {
  start: String = ''
  end: String = ''
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

  constructor() {}

  getDate(dateString: string): Date {
    return new Date(`${dateString}T00:00:00Z`)
  }

  getDifferenceInDays(startDate: Date, endDate: Date): number {
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

    this.timeDifference.days.total = Math.floor((endDateUTC - startDateUTC) / this.MS_PER_DAY)
    return this.timeDifference.days.total
  }

  getDifferenceInYears(startDate: Date, endDate: Date): number {
    let yearsDifference = 0

    yearsDifference = endDate.getUTCFullYear() - startDate.getUTCFullYear()
    if (this.beforeWholeYear(startDate, endDate)) yearsDifference--

    return yearsDifference
  }

  getDifferenceInMonths(startDate: Date, endDate: Date): number {
    let monthsDifference = 0
    monthsDifference = endDate.getUTCMonth() - startDate.getUTCMonth()

    if (this.beforeWholeMonth(startDate, endDate)) monthsDifference--
    if (monthsDifference < 0) monthsDifference = monthsDifference + 12

    return this.getDifferenceInYears(startDate, endDate) * 12 + monthsDifference
  }

  private beforeWholeYear(startDate: Date, endDate: Date): boolean {
    return (
      endDate.getUTCMonth() < startDate.getUTCMonth() ||
      (endDate.getUTCMonth() === startDate.getUTCMonth() &&
        endDate.getUTCDate() < startDate.getUTCDate())
    )
  }

  private beforeWholeMonth(startDate: Date, endDate: Date): boolean {
    return endDate.getUTCDate() < startDate.getUTCDate()
  }

  private isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  }

  private formatUTCDate(dateToFormat: Date): string {
    const year = dateToFormat.getUTCFullYear()
    const month = (dateToFormat.getUTCMonth() + 1).toString().padStart(2, '0')
    const day = dateToFormat.getUTCDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  private isLeapDay(dateToAnalise: Date): boolean {
    return dateToAnalise.getUTCMonth() === 1 && dateToAnalise.getUTCDate() === 29
  }

  addMonths(dateToAdd: Date, months: number): Date {
    const newDate = new Date(
      Date.UTC(dateToAdd.getUTCFullYear(), dateToAdd.getUTCMonth(), dateToAdd.getUTCDate()),
    )
    const originalDate = dateToAdd.getUTCDate()
    newDate.setUTCDate(1)
    newDate.setUTCMonth(newDate.getUTCMonth() + months)
    if (originalDate > 28) {
      const newDateMonthLength = this.getMonthLength(newDate)
      if (originalDate > newDateMonthLength) newDate.setUTCDate(newDateMonthLength)
      originalDate > newDateMonthLength
        ? newDate.setUTCDate(newDateMonthLength)
        : newDate.setUTCDate(originalDate)

      return newDate
    }
    newDate.setUTCDate(originalDate)

    return newDate
  }

  addYears(dateToAdd: Date, years: number): Date {
    const newDate = new Date(
      Date.UTC(dateToAdd.getUTCFullYear(), dateToAdd.getUTCMonth(), dateToAdd.getUTCDate()),
    )
    if (this.isLeapDay(dateToAdd)) {
      newDate.setUTCDate(1)
      newDate.setUTCFullYear(newDate.getUTCFullYear() + years)
      this.isLeapYear(newDate.getUTCFullYear()) ? newDate.setUTCDate(29) : newDate.setUTCDate(28)

      return newDate
    }
    newDate.setUTCFullYear(newDate.getUTCFullYear() + years)

    return newDate
  }

  private getMonthLength(dateToGetMonth: Date): number {
    return [
      31,
      this.isLeapYear(dateToGetMonth.getUTCFullYear()) ? 29 : 28,
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
    ][dateToGetMonth.getUTCMonth()]
  }
  calculate(start: string, end: string, options: DateOptions) {
    const startDate = this.getDate(start)
    const endDate = this.getDate(end)
    // if (options.years.months_days || options.years.weeks_days) this.getDifferenceInYears(start, end)
  }
}

class DateDifference extends DateDifferenceBase {}
