import type {
  DateOptionKey,
  DateOptions,
  formatTimeMethods,
  DateDifferenceObject,
} from '@/interfaces/date-calculator'

import { DateDifferenceBase } from './dateDifferenceBase'

export class DateDifference extends DateDifferenceBase {
  private formatTimeMethods: formatTimeMethods = {
    y_m_d: () =>
      `${this.timeDifference.years.total} years ${this.timeDifference.years.months} months and ${this.timeDifference.years.months_days} days`,
    m_d: () =>
      `${this.timeDifference.months.total} months and ${this.timeDifference.months.days} days`,
    d: () => `${this.timeDifference.days.total} days`,
    w_d: () =>
      `${this.timeDifference.weeks.total} weeks and ${this.timeDifference.weeks.days} days`,
  }
  private startDate: Date | undefined = undefined
  private endDate: Date | undefined = undefined
  private dateOptionsCalculated: DateOptions = {
    y_m_d: false,
    m_d: false,
    w_d: false,
    d: false,
  }

  private setDates(start: Date, end: Date) {
    this.startDate = this.getDate(start)
    this.endDate = this.getDate(end)
  }

  private areDatesEqual(date1: Date, date2: Date): boolean {
    return this.formatUTCDate(date1) === this.formatUTCDate(date2)
  }
  private setOptionsCalculated(newOptions: DateOptions) {
    this.dateOptionsCalculated = newOptions
  }
  private optionAlreadyCalculated(dateOption: keyof DateOptions): boolean {
    return this.dateOptionsCalculated[dateOption]
  }

  private setTimeDifference(start: Date, end: Date, options: DateOptions) {
    const bothDatesAlreadyCalculated =
      !!this.startDate &&
      !!this.endDate &&
      this.areDatesEqual(start, this.startDate) &&
      this.areDatesEqual(end, this.endDate)

    if (!bothDatesAlreadyCalculated) this.resetTimeDifference()
    for (const dateOption in options) {
      if (options[dateOption as keyof DateOptions]) {
        if (
          bothDatesAlreadyCalculated &&
          this.optionAlreadyCalculated(dateOption as keyof DateOptions)
        )
          continue
        this.runDateMethods(start, end, dateOption as DateOptionKey)
      }
    }
  }

  private runDateMethods(startDate: Date, endDate: Date, dateOption: DateOptionKey) {
    let initialDate: Date = new Date(
      Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate()),
    )

    for (const dateMethod of this.timeDifferenceMethods[dateOption]) {
      initialDate = dateMethod(initialDate, endDate)
    }
  }

  getTimeDifference(start: Date, end: Date, options: DateOptions): DateDifferenceObject {
    const startDate = this.getDate(start)
    const endDate = this.getDate(end)
    this.setTimeDifference(startDate, endDate, options)

    const timeDifference: DateDifferenceObject = {
      y_m_d: options.y_m_d ? this.formatTimeMethods.y_m_d() : '',
      m_d: options.m_d ? this.formatTimeMethods.m_d() : '',
      w_d: options.w_d ? this.formatTimeMethods.w_d() : '',
      d: options.d ? this.formatTimeMethods.d() : '',
    }
    this.setDates(startDate, endDate)
    this.setOptionsCalculated(options)
    return timeDifference
  }
}

export const dateCalculator = new DateDifference()
