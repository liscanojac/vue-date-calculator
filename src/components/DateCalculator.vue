<template>
  <div>
    <DateInput v-model:date-model="startDate" input-date-label="Start Date" />
    <DateInput v-model:date-model="endDate" :min-date="startDate" input-date-label="End Date" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DateInput from './DateInput.vue'

export default defineComponent({
  name: 'DateCalculatorComponent',
  components: {
    DateInput,
  },
  props: {},
  data() {
    return {
      // Define your data properties here
      startDate: '',
      endDate: '',
    }
  },
  methods: {
    // Define your methods here
  },
})
</script>

<style scoped>
/* Add your styles here */
</style>
