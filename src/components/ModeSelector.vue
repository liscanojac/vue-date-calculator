<template>
  <div>
    <form class="max-w-sm mx-auto">
      <label for="small" class="block mb-2 text-sm font-medium">Select Mode:</label>
      <select
        id="small"
        :value="dateTravel"
        @change="handleSelector"
        :class="[
          defaultSelectClasses,
          darkMode ? selectClassesDarkMode : selectClassesLightMode,
          selectClasses,
        ]"
      >
        <option :value="false">Date Difference</option>
        <option :value="true">Date Add/Subtract</option>
      </select>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ModeSelectorComponent',
  props: {
    dateTravel: {
      type: Boolean,
      required: true,
    },
    selectClasses: {
      type: String,
    },
    darkMode: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      defaultSelectClasses: 'block w-full p-2 mb-6 text-sm border border-gray-300 rounded-lg',
      selectClassesLightMode:
        'text-dark-blue bg-gray-50 focus:ring-dark-blue focus:border-dark-blue',
      selectClassesDarkMode:
        'bg-dark-blue text-white focus:ring-primary-mint focus:border-primary-mint',
    }
  },
  methods: {
    // Define your methods here
    handleSelector(event: Event) {
      this.$emit('update:calculatorMode', (event.target as HTMLSelectElement).value === 'true')
    },
  },
  emits: ['update:calculatorMode'],
})
</script>

<style scoped>
/* Add your styles here */
</style>
