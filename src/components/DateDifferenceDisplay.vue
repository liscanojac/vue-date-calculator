<template>
  <div class="min-h-40 flex flex-col">
    <h2 class="text-xl font-medium my-1 ml-2">{{ getHeader() }}</h2>
    <div v-if="!dateTravel" class="ml-4">
      <div v-for="(difference, differenceKey) in dateDifference" :key="differenceKey">
        <p v-if="dateOptions[differenceKey] && !!startDate && !!endDate">
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
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    dateTravel: {
      type: Boolean,
      required: true,
    },
    dateTravelOptions: {
      type: Object as PropType<TimeTravelOptionsBase>,
      required: true,
    },
    goingFuture: {
      type: Boolean,
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
        !!this.dateTravelOptions.years ||
        !!this.dateTravelOptions.months ||
        !!this.dateTravelOptions.weeks ||
        !!this.dateTravelOptions.days
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
      return !!this.startDate && !!this.endDate && this.anyDateDifferenceCalculated
        ? `From ${this.formatDate(this.startDate)} to ${this.formatDate(this.endDate)} are:`
        : '\u200B'
    },
    getTimeTravelLapse() {
      return !!this.startDate && !!this.endDate && this.anyDateTravelOption
        ? `${this.formatDate(this.endDate)} is the date ${dateCalculator.formatTimeTravelOptions(this.dateTravelOptions)} ${this.goingFuture ? 'after' : 'before'} ${this.formatDate(this.startDate)}`
        : '\u200B'
    },
    getHeader() {
      return this.dateTravel ? this.getTimeTravelLapse() : this.getDateLapse()
    },
  },
})
</script>
