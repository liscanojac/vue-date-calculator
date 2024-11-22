<template>
  <div>
    <DateDifferenceDisplay :date-difference="dateDifference" :date-options="dateOptions" />
    <DateInput v-model:date-model="startDate" input-date-label="Start Date" />
    <DateInput v-model:date-model="endDate" :min-date="startDate" input-date-label="End Date" />
    <OptionsPanel :date-options="dateOptions" @update:date-options="updateDateOptions" />
    <button type="button" @click="getDateDifference" :disabled="bothDatesEmpty">Calculate</button>
    <br />
    <input type="date" name="" id="" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { dateCalculator } from '@/services/date-calculator/dateDifference'
import DateInput from './DateInput.vue'
import OptionsPanel from './OptionsPanel.vue'
import type { DateOptions } from '@/interfaces/date-calculator'
import DateDifferenceDisplay from './DateDifferenceDisplay.vue'

export default defineComponent({
  name: 'DateCalculatorComponent',
  components: {
    DateInput,
    OptionsPanel,
    DateDifferenceDisplay,
  },
  props: {},
  data() {
    return {
      startDate: '',
      endDate: '',
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
    bothDatesEmpty() {
      return this.startDate === '' && this.endDate === ''
    },
  },

  methods: {
    getDateDifference() {
      this.dateDifference = dateCalculator.getTimeDifference(
        this.startDate,
        this.endDate,
        this.dateOptions,
      )
    },
    updateDateOptions(dateOptionsUpdated: DateOptions) {
      this.dateOptions = dateOptionsUpdated
    },
  },
})
</script>

<style scoped>
/* Add your styles here */
</style>
