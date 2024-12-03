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
      :dark="darkMode"
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
import { dateCalculator } from '@/services/date-calculator/src/date-calculator/dateDifference'

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
    pickingSameDate: {
      type: Boolean,
      default: true,
    },
    darkMode: {
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
    disablePickingSameDate(): Array<string> {
      const datesToDisable = [this.minDate, this.maxDate]

      return this.pickingSameDate ? [] : datesToDisable.filter((date) => date)
    },
  },
  emits: ['update:dateModel'],
})
</script>

<style scoped>
/* Add your styles here */
.dp__theme_dark {
  --dp-background-color: var(--dark-blue);
  --dp-text-color: #fff;
  --dp-hover-color: #484848;
  --dp-hover-text-color: #fff;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #005cb2;
  --dp-primary-disabled-color: #61a8ea;
  --dp-primary-text-color: #fff;
  --dp-secondary-color: #a9a9a9;
  --dp-border-color: #212121;
  --dp-menu-border-color: #2d2d2d;
  --dp-border-color-hover: #aaaeb7;
  --dp-border-color-focus: #aaaeb7;
  --dp-disabled-color: #737373;
  --dp-disabled-color-text: #d0d0d0;
  --dp-scroll-bar-background: #212121;
  --dp-scroll-bar-color: #484848;
  --dp-success-color: #00701a;
  --dp-success-color-disabled: #428f59;
  --dp-icon-color: #959595;
  --dp-danger-color: #e53935;
  --dp-marker-color: #e53935;
  --dp-tooltip-color: #3e3e3e;
  --dp-highlight-color: rgb(0 92 178 / 20%);
  --dp-range-between-dates-background-color: var(--dp-hover-color, #484848);
  --dp-range-between-dates-text-color: var(--dp-hover-text-color, #fff);
  --dp-range-between-border-color: var(--dp-hover-color, #fff);
}
</style>
