<template>
  <div>
    <DateDifferenceDisplay :date-difference="dateDifference" :date-options="dateOptions" />
    <DatePicker v-model:date-model="startDate" :max-date="endDate" />
    <DatePicker v-model:date-model="endDate" :min-date="startDate" />
    <button type="button" @click="getDateDifference" :disabled="bothDatesEmpty">Calculate</button>
    <OptionsPanel :date-options="dateOptions" @update:date-options="updateDateOptions" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { DateOptions } from '@/interfaces/date-calculator'
import { dateCalculator } from '@/services/date-calculator/dateDifference'
import OptionsPanel from './OptionsPanel.vue'
import DateDifferenceDisplay from './DateDifferenceDisplay.vue'
import DatePicker from './DatePicker.vue'

export default defineComponent({
  name: 'DateCalculatorComponent',
  components: {
    OptionsPanel,
    DateDifferenceDisplay,
    DatePicker,
  },
  props: {},
  data() {
    return {
      startDate: undefined as Date | undefined,
      endDate: undefined as Date | undefined,
      dateDifference: {
        y_m_d: '',
        m_d: '',
        w_d: '',
        d: '',
      },
      dateOptions: {
        y_m_d: true,
        m_d: true,
        w_d: true,
        d: true,
      },
    }
  },
  computed: {
    bothDatesEmpty(): boolean {
      return !this.startDate && !this.endDate
    },
  },

  methods: {
    getDateDifference() {
      if (this.startDate && this.endDate) {
        this.dateDifference = dateCalculator.getTimeDifference(
          this.startDate,
          this.endDate,
          this.dateOptions,
        )
      }
    },
    dateDisplayEmpty(): boolean {
      return Object.values(this.dateDifference).join('') === ''
    },
    updateDateOptions(key: keyof DateOptions, value: boolean) {
      this.dateOptions = { ...this.dateOptions, [key]: value }
      if (!this.dateDisplayEmpty()) {
        this.getDateDifference()
      }
    },
  },
})
</script>

<style scoped>
/* Add your styles here */
</style>
