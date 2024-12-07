<template>
  <div>
    <form class="max-w-xs mx-auto">
      <label
        for="quantity-input"
        class="block mb-2 text-sm font-medium dark:text-white"
        :class="labelClass"
        >{{ inputLabel }}</label
      >
      <div class="relative flex items-center max-w-[8rem]">
        <button
          type="button"
          id="decrement-button"
          data-input-counter-decrement="quantity-input"
          :class="[
            btnDefaultClasses,
            'rounded-s-lg',
            darkMode ? btnDarkModeClasses : btnLightModeClasses,
          ]"
          @click="updateValue(numberValue - 1)"
        >
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h16"
            />
          </svg>
        </button>
        <input
          type="text"
          id="quantity-input"
          data-input-counter
          aria-describedby="helper-text-explanation"
          :class="[inputDefaultClasses, darkMode ? inputDarkModeClasses : inputLightModeClasses]"
          placeholder="999"
          required
          :value="numberValue"
          @input="filterNumbers"
        />
        <button
          type="button"
          id="increment-button"
          data-input-counter-increment="quantity-input"
          :class="[
            btnDefaultClasses,
            'rounded-e-lg',
            darkMode ? btnDarkModeClasses : btnLightModeClasses,
          ]"
          @click="updateValue(numberValue + 1)"
        >
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
      <!-- <p id="helper-text-explanation" class="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Please select a 5 digit number from 0 to 9.
      </p> -->
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NumberInputComponent',
  props: {
    numberValue: {
      type: Number,
      required: true,
    },
    inputLabel: {
      type: String,
      required: false,
      default: 'Choose quantity:',
    },
    maxValue: {
      type: Number,
      required: false,
    },
    minValue: {
      type: Number,
      default: 0,
      required: false,
    },
    labelClass: {
      type: String,
      required: false,
    },
    darkMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      btnDefaultClasses: 'border p-3 h-11 focus:ring-2 focus:outline-none',
      btnLightModeClasses: 'bg-gray-100 hover:bg-gray-200 border-gray-300 focus:ring-gray-100',
      btnDarkModeClasses: 'bg-dark-blue hover:bg-charcoal border-light-blue focus:ring-light-mint',
      inputDefaultClasses:
        'border-x-0 h-11 text-center text-sm focus:border-blue-500 block w-full py-2.5',
      inputLightModeClasses: 'bg-gray-50 border-gray-300 focus:ring-primary-blue',
      inputDarkModeClasses: 'bg-dark-blue border-light-blue',
    }
  },
  methods: {
    filterNumbers(event: Event) {
      const input = event.target as HTMLInputElement
      const filteredValue = input.value.replace(/[^0-9]/g, '')

      const numericValue = Number(filteredValue)

      const valueToEmit = this.applyMinAndMax(numericValue)
      input.value = valueToEmit.toString()
      this.$emit('update:numberValue', valueToEmit)
    },
    applyMinAndMax(value: number): number {
      if (this.minValue !== undefined && value < this.minValue) return this.minValue
      if (this.maxValue !== undefined && value > this.maxValue) return this.maxValue
      return value
    },
    updateValue(newValue: number) {
      const valueToEmit = this.applyMinAndMax(newValue)
      this.$emit('update:numberValue', valueToEmit)
    },
  },
  emits: ['update:numberValue'],
})
</script>

<style scoped>
/* Add your styles here */
</style>
