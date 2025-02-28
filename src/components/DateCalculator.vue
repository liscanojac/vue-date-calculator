<template>
  <div class="flex justify-center items-center w-full px-4">
    <div class="w-full md:w-1/3">
      <div>
        <ModeSelector
          :dark-mode="darkMode"
          :date-travel="dateTravel"
          @update:calculator-mode="updateDateTravel"
        />
      </div>
      <DateDifferenceDisplay
        :date-difference="dateDifference"
        :date-options="dateOptions"
        :date-travel="dateTravel"
        :calculated-data="calculated"
      />
      <form action="submit" class="flex flex-col px-1" @submit.prevent="handleCalculateBtn">
        <DatePicker
          v-model:date-model="startDate"
          :max-date="endDate"
          placeholder="Select Start Date"
          :required="true"
          :picking-same-date="false"
          :dark-mode="darkMode"
        />
        <DatePicker
          v-if="!dateTravel"
          v-model:date-model="endDate"
          :min-date="startDate"
          placeholder="Select End Date"
          :required="!dateTravel"
          :picking-same-date="false"
          :dark-mode="darkMode"
        />
        <DateTravelPanel
          v-if="dateTravel"
          :date-travel-options="dateTravelOptions"
          :date-travel-direction="goingFuture"
          :dark-mode="darkMode"
          @update:going-future="updateDateTravelDirection"
          @update:date-travel-options="updateDateTravelOptions"
        />
        <button
          type="submit"
          class="text-white bg-primary-mint hover:bg-primary-green focus:ring-4 focus:ring-primary-green font-medium rounded-lg text-lg px-5 py-2.5 my-2 disabled:bg-celadon disabled:cursor-not-allowed"
          :disabled="!btnEnabled"
        >
          Calculate
        </button>
      </form>
      <OptionsPanel
        v-if="!dateTravel"
        :date-options="dateOptions"
        @update:date-options="updateDateOptions"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type {
  DateOptions,
  TimeTravelOptionsBase,
} from '@/services/date-calculator/src/interfaces/date-calculator'
import { dateCalculator } from '@/services/date-calculator/src/date-calculator/dateDifference'
import OptionsPanel from './OptionsPanel.vue'
import DateDifferenceDisplay from './DateDifferenceDisplay.vue'
import DatePicker from './DatePicker.vue'
import DateTravelPanel from './DateTravelPanel.vue'
import ModeSelector from './ModeSelector.vue'

export default defineComponent({
  name: 'DateCalculatorComponent',
  components: {
    OptionsPanel,
    DateDifferenceDisplay,
    DatePicker,
    DateTravelPanel,
    ModeSelector,
  },
  props: {
    darkMode: {
      type: Boolean,
      default: false,
    },
  },
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
      dateTravel: false,
      goingFuture: true,
      dateTravelOptions: {
        years: 0,
        months: 0,
        weeks: 0,
        days: 0,
      },
      calculated: {
        startDate: '',
        endDate: '',
        goingFuture: true,
        dateTravelOptions: {
          years: 0,
          months: 0,
          weeks: 0,
          days: 0,
        },
      },
      testVar: false,
    }
  },
  computed: {
    btnEnabled(): boolean {
      return this.dateTravel ? this.dateTravelEnabled : this.bothDatesEnabled
    },
    bothDatesEnabled() {
      return (
        !!this.startDate &&
        !!this.endDate &&
        (this.dateOptions.d ||
          this.dateOptions.m_d ||
          this.dateOptions.w_d ||
          this.dateOptions.y_m_d)
      )
    },
    dateTravelEnabled() {
      return (
        !!this.startDate &&
        (!!this.dateTravelOptions.years ||
          !!this.dateTravelOptions.months ||
          !!this.dateTravelOptions.weeks ||
          !!this.dateTravelOptions.days)
      )
    },
  },

  methods: {
    getDateDifference() {
      this.dateDifference = dateCalculator.getTimeDifference(
        this.startDate,
        this.endDate,
        this.dateOptions,
      )
      this.calculated.startDate = this.startDate
      this.calculated.endDate = this.endDate
    },
    getDateTravel() {
      const travelledDate = dateCalculator.getTimeTravelDate(this.startDate, {
        ...this.dateTravelOptions,
        past: !this.goingFuture,
      })
      this.calculated = {
        ...this.calculated,
        startDate: this.startDate,
        endDate: travelledDate,
        dateTravelOptions: this.dateTravelOptions,
        goingFuture: this.goingFuture,
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
    updateDateTravel(value: boolean) {
      this.dateTravel = value
      this.resetValues()
    },
    updateDateTravelDirection(value: boolean) {
      this.goingFuture = value
    },
    updateDateTravelOptions(optionKey: keyof TimeTravelOptionsBase, value: boolean) {
      this.dateTravelOptions = { ...this.dateTravelOptions, [optionKey]: value }
    },
    handleCalculateBtn() {
      if (this.btnEnabled) {
        this.dateTravel ? this.getDateTravel() : this.getDateDifference()
      }
    },
    resetValues() {
      this.startDate = ''
      this.endDate = ''
      this.dateDifference = {
        y_m_d: '',
        m_d: '',
        w_d: '',
        d: '',
      }
      this.dateOptions = {
        y_m_d: true,
        m_d: true,
        w_d: true,
        d: true,
      }
      this.goingFuture = true
      this.dateTravelOptions = {
        years: 0,
        months: 0,
        weeks: 0,
        days: 0,
      }
      this.calculated = {
        startDate: '',
        endDate: '',
        goingFuture: true,
        dateTravelOptions: {
          years: 0,
          months: 0,
          weeks: 0,
          days: 0,
        },
      }
    },
  },
})
</script>
