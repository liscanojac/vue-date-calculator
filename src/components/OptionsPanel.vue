<template>
  <div>
    <h2 class="text-xl font-medium m-1 mb-2">Options</h2>
    <div v-for="(option, optionKey) in dateOptions" :key="optionKey">
      <OptionInput
        :option-model="option"
        :input-label="dateOptionLabels[optionKey]"
        @update:option-model="updateOption(optionKey, $event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import type { DateDifferenceObject, DateOptions } from '@/interfaces/date-calculator'
import { defineComponent, type PropType } from 'vue'
import OptionInput from './OptionInput.vue'

export default defineComponent({
  name: 'OptionsPanelComponent',
  components: {
    OptionInput,
  },
  props: {
    dateOptions: {
      type: Object as PropType<DateOptions>,
      required: true,
    },
  },
  data() {
    return {
      dateOptionLabels: {
        y_m_d: 'Year, Months and Days',
        m_d: 'Months and Days',
        w_d: 'Weeks and Days',
        d: 'Days',
      } as DateDifferenceObject,
    }
  },
  methods: {
    updateOption(key: keyof DateOptions, value: boolean) {
      this.$emit('update:dateOptions', key, value)
    },
  },
  emits: ['update:dateOptions'],
})
</script>

<style scoped></style>
