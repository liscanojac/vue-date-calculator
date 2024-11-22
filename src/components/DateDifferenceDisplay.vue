<template>
  <div v-for="(difference, differenceKey) in dateDifference" :key="differenceKey">
    <p v-if="dateOptions[differenceKey]">{{ difference || '\u200B' }}</p>
  </div>
</template>

<script lang="ts">
import type { DateDifferenceObject, DateOptions } from '@/interfaces/date-calculator'
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
  },
})
</script>

<style scoped>
/* Add your styles here */
</style>
