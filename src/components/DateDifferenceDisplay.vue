<template>
  <div class="min-h-40 flex flex-col">
    <h2 class="text-xl font-medium my-1 ml-2">{{ getDateLapse() }}</h2>
    <div class="ml-4">
      <div v-for="(difference, differenceKey) in dateDifference" :key="differenceKey">
        <p v-if="dateOptions[differenceKey] && !!startDate && !!endDate">
          {{ difference }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { DateDifferenceObject, DateOptions } from '@/interfaces/date-calculator'
import { dateCalculator } from '@/services/date-calculator-service/dateDifference'
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
      required: false,
    },
    endDate: {
      type: String,
      required: false,
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
  },
})
</script>
