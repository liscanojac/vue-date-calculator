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

  private setTimeDifference(start: string, end: string, options: DateOptions) {
    const startDate = this.getDate(start)
    const endDate = this.getDate(end)
    for (const dateOption in options) {
      if (options[dateOption as keyof DateOptions]) {
        this.runDateMethods(startDate, endDate, dateOption as DateOptionKey)
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

  getTimeDifference(start: string, end: string, options: DateOptions): DateDifferenceObject {
    this.setTimeDifference(start, end, options)

    const timeDifference: DateDifferenceObject = {
      y_m_d: options.y_m_d ? this.formatTimeMethods.y_m_d() : '',
      m_d: options.m_d ? this.formatTimeMethods.m_d() : '',
      w_d: options.w_d ? this.formatTimeMethods.w_d() : '',
      d: options.d ? this.formatTimeMethods.d() : '',
    }

    return timeDifference
  }
}
