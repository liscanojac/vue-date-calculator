<template>
  <div class="my-2">
    <VueDatePicker
      :model-value="dateModel"
      @update:model-value="handleModelUpdate"
      :min-date="minDate"
      :max-date="maxDate"
      :disabled-dates="disablePickingSameDate"
      :year-range="yearLimits"
      :format="formatDate"
      :enable-time-picker="false"
      :text-input="textInputOptions"
      :placeholder="placeholder"
      :required="required"
      :utc="true"
      auto-apply
      esc-close
      vertical
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { dateCalculator } from '@/services/date-calculator/dateDifference'

export default defineComponent({
  name: 'DatePickerComponent',
  components: {
    VueDatePicker,
  },
  props: {
    placeholder: {
      type: String,
      default: 'Select Date',
    },
    minDate: {
      type: String,
      default: '',
    },
    maxDate: {
      type: String,
      default: '',
    },
    dateModel: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      textInputOptions: {
        format: 'dd/MM/yyyy',
        enterSubmit: true,
      },
      yearLimits: [1492, 2492],
    }
  },
  methods: {
    formatDate(dateToFormat: string) {
      const date = dateCalculator.getDate(dateToFormat)
      const day = date.getUTCDate()
      const month = date.getUTCMonth() + 1
      const year = date.getUTCFullYear()
      return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`
    },
    handleModelUpdate(value: string | null) {
      this.$emit('update:dateModel', value === null ? '' : value)
    },
  },
  computed: {
    disablePickingSameDate(): string[] {
      const datesToDisable = [this.minDate, this.maxDate]

      return datesToDisable.filter((date) => date)
    },
  },
  emits: ['update:dateModel'],
})
</script>

<style scoped>
/* Add your styles here */
</style>
