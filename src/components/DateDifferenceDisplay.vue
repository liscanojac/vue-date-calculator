<template>
  <div class="flex flex-col" :class="[dateTravel ? 'min-h-20' : 'min-h-40']">
    <h2 class="text-lg md:text-xl font-medium my-1 ml-2">{{ getHeader() }}</h2>
    <div v-if="!dateTravel" class="ml-4">
      <div v-for="(difference, differenceKey) in dateDifference" :key="differenceKey">
        <p
          v-if="
            dateOptions[differenceKey] && !!calculatedData.startDate && !!calculatedData.endDate
          "
        >
          {{ difference }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type {
  DateDifferenceObject,
  DateOptions,
  TimeTravelOptionsBase,
} from '@/services/date-calculator/src/interfaces/date-calculator'
import { dateCalculator } from '@/services/date-calculator/src/date-calculator/dateDifference'
import { defineComponent, type PropType } from 'vue'
import type { CalculatedData } from '@/interfaces/date-calculator'

export default defineComponent({
  name: 'DateDifferenceDisplayComponent',
  props: {
    dateDifference: {
      type: Object as PropType<DateDifferenceObject>,
      required: true,
    },
    dateOptions: {
      type: Object as PropType<DateOptions>,
      required: true,
    },
    dateTravel: {
      type: Boolean,
      required: true,
    },
    calculatedData: {
      type: Object as PropType<CalculatedData>,
      required: true,
    },
  },
  computed: {
    anyDateDifferenceCalculated() {
      return (
        !!this.dateDifference.y_m_d ||
        !!this.dateDifference.m_d ||
        !!this.dateDifference.w_d ||
        !!this.dateDifference.d
      )
    },
    anyDateTravelOption() {
      return (
        !!this.calculatedData.dateTravelOptions.years ||
        !!this.calculatedData.dateTravelOptions.months ||
        !!this.calculatedData.dateTravelOptions.weeks ||
        !!this.calculatedData.dateTravelOptions.days
      )
    },
  },
  methods: {
    formatDate(dateToFormat: string): string {
      const date = dateCalculator.getDate(dateToFormat)
      return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric',
        timeZone: 'UTC',
      }).format(date)
    },
    getDateLapse() {
      return !!this.calculatedData.startDate &&
        !!this.calculatedData.endDate &&
        this.anyDateDifferenceCalculated
        ? `From ${this.formatDate(this.calculatedData.startDate)} to ${this.formatDate(this.calculatedData.endDate)} are:`
        : '\u200B'
    },
    getTimeTravelLapse() {
      return !!this.calculatedData.startDate &&
        !!this.calculatedData.endDate &&
        this.anyDateTravelOption
        ? `${this.formatDate(this.calculatedData.endDate)} is the date ${dateCalculator.formatTimeTravelOptions(this.calculatedData.dateTravelOptions)} ${this.calculatedData.goingFuture ? 'after' : 'before'} ${this.formatDate(this.calculatedData.startDate)}`
        : '\u200B'
    },
    getHeader() {
      return this.dateTravel ? this.getTimeTravelLapse() : this.getDateLapse()
    },
  },
})
</script>
