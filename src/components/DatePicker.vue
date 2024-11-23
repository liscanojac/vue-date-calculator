<template>
  <div>
    <VueDatePicker
      :model-value="dateModel"
      @update:model-value="$emit('update:dateModel', $event)"
      :min-date="minDate"
      :max-date="maxDate"
      :year-range="yearLimits"
      :format="formatDate"
      :enable-time-picker="false"
      :text-input="textInputOptions"
      :placeholder="placeholder"
      utc
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
      type: Date,
      default: undefined,
    },
    maxDate: {
      type: Date,
      default: undefined,
    },
    dateModel: {
      type: Date,
      default: undefined,
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
    formatDate(date: Date) {
      const day = date.getUTCDate()
      const month = date.getUTCMonth() + 1
      const year = date.getUTCFullYear()
      return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`
    },
  },
  emits: ['update:dateModel'],
})
</script>

<style scoped>
/* Add your styles here */
</style>
