import type { TimeTravelOptionsBase } from '@/services/date-calculator/src/interfaces/date-calculator'

export interface toggleInputClasses {
  container?: string
  toggle?: string
  toggleOn?: string
  toggleOff?: string
  toggleOnDisabled?: string
  toggleOffDisabled?: string
  handle?: string
  handleOn?: string
  handleOff?: string
  handleOnDisabled?: string
  handleOffDisabled?: string
  label?: string
}

export interface CalculatedData {
  startDate: string
  endDate: string
  goingFuture: boolean
  dateTravelOptions: TimeTravelOptionsBase
}
