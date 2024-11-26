import { describe, expect, it, beforeEach } from 'vitest'
import { DateDifferenceBase } from '../date-calculator/dateDifferenceBase'
import { DateDifference } from '../date-calculator/dateDifference'

const dateCalculatorBase = new DateDifferenceBase()

describe('Testing getDifferenceInDays method', () => {
  it('it should return 366 days', () => {
    expect(
      dateCalculatorBase.getDifferenceInDays(
        dateCalculatorBase.getDate('2023-11-18'),
        dateCalculatorBase.getDate('2024-11-18'),
      ),
    ).toBe(366)
  })

  it('it should return 0 days', () => {
    expect(
      dateCalculatorBase.getDifferenceInDays(
        dateCalculatorBase.getDate('2024-11-18'),
        dateCalculatorBase.getDate('2024-11-18'),
      ),
    ).toBe(0)
  })

  it('it should return 1 days', () => {
    expect(
      dateCalculatorBase.getDifferenceInDays(
        dateCalculatorBase.getDate('2024-11-17'),
        dateCalculatorBase.getDate('2024-11-18'),
      ),
    ).toBe(1)
  })

  it('it should return 24717 days', () => {
    expect(
      dateCalculatorBase.getDifferenceInDays(
        dateCalculatorBase.getDate('1957-03-18'),
        dateCalculatorBase.getDate('2024-11-18'),
      ),
    ).toBe(24717)
  })
})

describe('testing getDifferenceInYears method', () => {
  it('should return 1', () => {
    expect(
      dateCalculatorBase.getDifferenceInYears(
        dateCalculatorBase.getDate('2022-11-18'),
        dateCalculatorBase.getDate('2023-11-18'),
      ),
    ).toBe(1)
  })

  it('should return 1', () => {
    expect(
      dateCalculatorBase.getDifferenceInYears(
        dateCalculatorBase.getDate('2023-11-18'),
        dateCalculatorBase.getDate('2024-11-18'),
      ),
    ).toBe(1)
  })

  it('should return 0', () => {
    expect(
      dateCalculatorBase.getDifferenceInYears(
        dateCalculatorBase.getDate('2023-11-19'),
        dateCalculatorBase.getDate('2024-11-18'),
      ),
    ).toBe(0)
  })

  it('should return 1', () => {
    expect(
      dateCalculatorBase.getDifferenceInYears(
        dateCalculatorBase.getDate('2022-12-29'),
        dateCalculatorBase.getDate('2024-11-18'),
      ),
    ).toBe(1)
  })

  it('should return 1 with one leap year', () => {
    expect(
      dateCalculatorBase.getDifferenceInYears(
        dateCalculatorBase.getDate('2023-02-28'),
        dateCalculatorBase.getDate('2024-02-29'),
      ),
    ).toBe(1)
  })

  it('should return 1 with one leap year', () => {
    expect(
      dateCalculatorBase.getDifferenceInYears(
        dateCalculatorBase.getDate('2023-02-08'),
        dateCalculatorBase.getDate('2024-02-29'),
      ),
    ).toBe(1)
  })

  it('should return 4 with both leap year', () => {
    expect(
      dateCalculatorBase.getDifferenceInYears(
        dateCalculatorBase.getDate('2020-02-29'),
        dateCalculatorBase.getDate('2024-02-29'),
      ),
    ).toBe(4)
  })

  it('should return 4', () => {
    expect(
      dateCalculatorBase.getDifferenceInYears(
        dateCalculatorBase.getDate('2019-04-29'),
        dateCalculatorBase.getDate('2024-03-02'),
      ),
    ).toBe(4)
  })

  it('should return 5', () => {
    expect(
      dateCalculatorBase.getDifferenceInYears(
        dateCalculatorBase.getDate('2019-04-29'),
        dateCalculatorBase.getDate('2024-11-02'),
      ),
    ).toBe(5)
  })

  it('should return 0', () => {
    expect(
      dateCalculatorBase.getDifferenceInYears(
        dateCalculatorBase.getDate('2024-11-08'),
        dateCalculatorBase.getDate('2024-11-18'),
      ),
    ).toBe(0)
  })

  it('should return 0', () => {
    expect(
      dateCalculatorBase.getDifferenceInYears(
        dateCalculatorBase.getDate('2023-12-08'),
        dateCalculatorBase.getDate('2024-01-18'),
      ),
    ).toBe(0)
  })

  it('should return 18', () => {
    expect(
      dateCalculatorBase.getDifferenceInYears(
        dateCalculatorBase.getDate('2005-12-08'),
        dateCalculatorBase.getDate('2024-01-18'),
      ),
    ).toBe(18)
  })

  it('should return 0', () => {
    expect(
      dateCalculatorBase.getDifferenceInYears(
        dateCalculatorBase.getDate('2020-02-29'),
        dateCalculatorBase.getDate('2021-02-28'),
      ),
    ).toBe(0)
  })

  it('should return 1', () => {
    expect(
      dateCalculatorBase.getDifferenceInYears(
        dateCalculatorBase.getDate('2020-02-29'),
        dateCalculatorBase.getDate('2021-03-01'),
      ),
    ).toBe(1)
  })
})

describe('testing getDifferenceInMonths method', () => {
  it('should return 0', () => {
    expect(
      dateCalculatorBase.getDifferenceInMonths(
        dateCalculatorBase.getDate('2024-11-18'),
        dateCalculatorBase.getDate('2024-11-18'),
      ),
    ).toBe(0)
  })

  it('should return 0', () => {
    expect(
      dateCalculatorBase.getDifferenceInMonths(
        dateCalculatorBase.getDate('2024-11-17'),
        dateCalculatorBase.getDate('2024-11-18'),
      ),
    ).toBe(0)
  })

  it('should return 1', () => {
    expect(
      dateCalculatorBase.getDifferenceInMonths(
        dateCalculatorBase.getDate('2024-10-18'),
        dateCalculatorBase.getDate('2024-11-18'),
      ),
    ).toBe(1)
  })

  it('should return 80', () => {
    expect(
      dateCalculatorBase.getDifferenceInMonths(
        dateCalculatorBase.getDate('2018-03-17'),
        dateCalculatorBase.getDate('2024-11-18'),
      ),
    ).toBe(80)
  })

  it('should return 709', () => {
    expect(
      dateCalculatorBase.getDifferenceInMonths(
        dateCalculatorBase.getDate('1964-12-02'),
        dateCalculatorBase.getDate('2024-01-31'),
      ),
    ).toBe(709)
  })

  it('should return 708', () => {
    expect(
      dateCalculatorBase.getDifferenceInMonths(
        dateCalculatorBase.getDate('1964-12-19'),
        dateCalculatorBase.getDate('2024-01-16'),
      ),
    ).toBe(708)
  })

  it('should return 48', () => {
    expect(
      dateCalculatorBase.getDifferenceInMonths(
        dateCalculatorBase.getDate('2020-02-29'),
        dateCalculatorBase.getDate('2024-02-29'),
      ),
    ).toBe(48)
  })

  it('should return 23', () => {
    expect(
      dateCalculatorBase.getDifferenceInMonths(
        dateCalculatorBase.getDate('2021-06-21'),
        dateCalculatorBase.getDate('2023-06-20'),
      ),
    ).toBe(23)
  })

  it('should return 35', () => {
    expect(
      dateCalculatorBase.getDifferenceInMonths(
        dateCalculatorBase.getDate('2020-02-29'),
        dateCalculatorBase.getDate('2023-02-28'),
      ),
    ).toBe(35)
  })

  it('should return 220', () => {
    expect(
      dateCalculatorBase.getDifferenceInMonths(
        dateCalculatorBase.getDate('1995-06-05'),
        dateCalculatorBase.getDate('2013-10-12'),
      ),
    ).toBe(220)
  })
})

describe('testing addMonths', () => {
  it('should add 1 month', () => {
    expect(dateCalculatorBase.addMonths(dateCalculatorBase.getDate('2024-10-18'), 1)).toEqual(
      dateCalculatorBase.getDate('2024-11-18'),
    )
  })

  it('should add 1 month', () => {
    expect(dateCalculatorBase.addMonths(dateCalculatorBase.getDate('2021-01-29'), 1)).toEqual(
      dateCalculatorBase.getDate('2021-02-28'),
    )
  })

  it('should add 1 month', () => {
    expect(dateCalculatorBase.addMonths(dateCalculatorBase.getDate('2021-01-29'), 1)).toEqual(
      dateCalculatorBase.getDate('2021-02-28'),
    )
  })

  it('should add 2 months', () => {
    expect(dateCalculatorBase.addMonths(dateCalculatorBase.getDate('2019-12-31'), 2)).toEqual(
      dateCalculatorBase.getDate('2020-02-29'),
    )
  })

  it('should add 48 months', () => {
    expect(dateCalculatorBase.addMonths(dateCalculatorBase.getDate('2020-02-29'), 48)).toEqual(
      dateCalculatorBase.getDate('2024-02-29'),
    )
  })

  it('should add 100 months', () => {
    expect(dateCalculatorBase.addMonths(dateCalculatorBase.getDate('1987-11-08'), 100)).toEqual(
      dateCalculatorBase.getDate('1996-03-08'),
    )
  })

  it('should add 1000 months', () => {
    expect(dateCalculatorBase.addMonths(dateCalculatorBase.getDate('2000-01-01'), 1000)).toEqual(
      dateCalculatorBase.getDate('2083-05-01'),
    )
  })
})

describe('testing addYears method', () => {
  it('should add 1 year', () => {
    expect(dateCalculatorBase.addYears(dateCalculatorBase.getDate('2024-11-19'), 1)).toEqual(
      dateCalculatorBase.getDate('2025-11-19'),
    )
  })

  it('should add 1 year from leapYear to nonLeapYear', () => {
    expect(dateCalculatorBase.addYears(dateCalculatorBase.getDate('2024-02-29'), 1)).toEqual(
      dateCalculatorBase.getDate('2025-02-28'),
    )
  })
})

describe('testing getTimeDifference method', () => {
  const dateCalculator = new DateDifference()
  const testOptions = {
    y_m_d: true,
    m_d: true,
    d: true,
    w_d: true,
  }

  beforeEach(() => {
    testOptions.y_m_d = true
    testOptions.m_d = true
    testOptions.w_d = true
    testOptions.d = true
  })

  it('should calculate correctly from 1987-11-08 to 2024-11-20', () => {
    const testDateDiff = dateCalculator.getTimeDifference('1987-11-08', '2024-11-20', testOptions)

    expect(testDateDiff.y_m_d).toBe('37 years 0 months and 12 days')
  })

  it('should calculate correctly from 1957-03-06 to 2024-11-20', () => {
    const testDateDiff = dateCalculator.getTimeDifference('1957-03-06', '2024-11-20', testOptions)

    expect(testDateDiff.y_m_d).toBe('67 years 8 months and 14 days')
  })

  it('should calculate correctly from 1957-03-06 to 2024-11-20', () => {
    const testDateDiff = dateCalculator.getTimeDifference('1957-03-06', '2024-11-20', testOptions)

    expect(testDateDiff.m_d).toBe('812 months and 14 days')
  })

  it('should calculate correctly from 1997-05-08 to 2024-11-20', () => {
    const testDateDiff = dateCalculator.getTimeDifference('1997-05-08', '2024-11-20', testOptions)

    expect(testDateDiff.d).toBe('10058 days')
  })

  it('should return an empty string', () => {
    testOptions.w_d = false
    const testDateDiff = dateCalculator.getTimeDifference('1997-05-08', '2024-11-20', testOptions)

    expect(testDateDiff.w_d).toBe('')
  })
})
