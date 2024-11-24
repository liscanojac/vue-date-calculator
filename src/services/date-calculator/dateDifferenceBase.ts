import type { TimeDifference, TimeDifferenceMethods } from '@/interfaces/date-calculator'

export class DateDifferenceBase {
  #MS_PER_DAY = 1000 * 60 * 60 * 24
  protected timeDifference: TimeDifference = {
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
  protected timeDifferenceMethods: TimeDifferenceMethods = {
    y_m_d: [
      (startDate, endDate) => {
        this.timeDifference.years.total = this.getDifferenceInYears(startDate, endDate)
        return this.addYears(startDate, this.timeDifference.years.total)
      },
      (startDate, endDate) => {
        this.timeDifference.years.months = this.getDifferenceInMonths(startDate, endDate)
        return this.addMonths(startDate, this.timeDifference.years.months)
      },
      (startDate, endDate) => {
        this.timeDifference.years.months_days = this.getDifferenceInDays(startDate, endDate)
        return endDate
      },
    ],
    m_d: [
      (startDate, endDate) => {
        this.timeDifference.months.total = this.getDifferenceInMonths(startDate, endDate)
        return this.addMonths(startDate, this.timeDifference.months.total)
      },
      (startDate, endDate) => {
        this.timeDifference.months.days = this.getDifferenceInDays(startDate, endDate)
        return endDate
      },
    ],
    w_d: [
      (startDate, endDate) => {
        const totalDays = this.getDifferenceInDays(startDate, endDate)
        this.timeDifference.weeks.total = Math.floor(totalDays / 7)
        this.timeDifference.weeks.days = totalDays % 7
        return endDate
      },
    ],
    d: [
      (startDate, endDate) => {
        this.timeDifference.days.total = this.getDifferenceInDays(startDate, endDate)
        return endDate
      },
    ],
  }

  getDate(dateString: Date | string): Date {
    const newDate = new Date(dateString)

    return new Date(Date.UTC(newDate.getUTCFullYear(), newDate.getUTCMonth(), newDate.getUTCDate()))
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

    this.timeDifference.days.total = Math.floor((endDateUTC - startDateUTC) / this.#MS_PER_DAY)
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

  private isLeapDay(dateToAnalise: Date): boolean {
    return dateToAnalise.getUTCMonth() === 1 && dateToAnalise.getUTCDate() === 29
  }

  protected formatUTCDate(dateToFormat: Date): string {
    const year = dateToFormat.getUTCFullYear()
    const month = (dateToFormat.getUTCMonth() + 1).toString().padStart(2, '0')
    const day = dateToFormat.getUTCDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
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

  protected resetTimeDifference() {
    this.timeDifference = {
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
  }
}
