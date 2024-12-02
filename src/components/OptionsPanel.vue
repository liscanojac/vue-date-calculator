<template>
  <div>
    <h2 class="text-xl font-medium mx-1">{{ optionTitle }}</h2>
    <div class="my-2">
      <div class="" v-for="(option, optionKey) in dateOptions" :key="optionKey">
        <OptionInput
          :option-model="option"
          :input-label="dateOptionLabels[optionKey]"
          @update:option-model="updateOption(optionKey, $event)"
        />
      </div>
    </div>
    <p v-if="noOptionSelected" class="text-xs mx-1 text-red-600">
      Please select an option to calculate
    </p>
  </div>
</template>

<script lang="ts">
import type { DateDifferenceObject, DateOptions } from '@/interfaces/date-calculator'
import { defineComponent, type PropType } from 'vue'
import OptionInput from './OptionInput.vue'
import { returnOptionsTitle } from '@/services/date-calculator/src/date-calculator/testSkaffolding'

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
  computed: {
    noOptionSelected() {
      return (
        !this.dateOptions.d &&
        !this.dateOptions.m_d &&
        !this.dateOptions.w_d &&
        !this.dateOptions.y_m_d
      )
    },
    optionTitle() {
      return returnOptionsTitle()
    },
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
