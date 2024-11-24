<template>
  <div class="container">
    <div v-for="(difference, differenceKey) in dateDifference" :key="differenceKey">
      <p v-if="dateOptions[differenceKey]">{{ difference || '\u200B' }}</p>
    </div>
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
.container {
  min-height: 6rem;
  display: flex;
  flex-direction: column;
}
</style>
