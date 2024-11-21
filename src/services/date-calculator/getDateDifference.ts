import type { DateDifferenceObject, DateOptions } from '@/interfaces/date-calculator'
import { DateDifference } from './dateDifference'

const dateCalculator = new DateDifference()

export function getDateDiference(
  start: string,
  end: string,
  options: DateOptions,
): DateDifferenceObject {
  return dateCalculator.getTimeDifference(start, end, options)
}
