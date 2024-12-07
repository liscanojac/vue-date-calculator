<template>
  <div class="my-1 flex items-center">
    <label for="left-label"><slot name="left-label"></slot></label>
    <Toggle
      :classes="getToggleClasses"
      :model-value="optionModel"
      @update:model-value="$emit('update:optionModel', $event)"
    />
    <label for="right-label"><slot name="right-label"></slot></label>
    <label v-if="inputLabel" class="ml-2">{{ inputLabel }}</label>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import Toggle from '@vueform/toggle'
import type { toggleInputClasses } from '@/interfaces/date-calculator'

export default defineComponent({
  name: 'OptionInputComponent',
  components: {
    Toggle,
  },
  props: {
    optionModel: {
      type: Boolean,
      required: true,
    },
    inputLabel: {
      type: String,
      required: false,
    },
    toggleClasses: {
      type: Object as PropType<toggleInputClasses>,
    },
  },
  data() {
    return {
      toggleClassesDefault: {
        container:
          'inline-block rounded-full outline-none focus:ring focus:ring-light-mint focus:ring-opacity-50',
        toggle:
          'flex w-12 h-5 rounded-full relative cursor-pointer transition items-center box-content border-2 text-xs leading-none',
        toggleOn: 'bg-primary-mint border-primary-mint',
        toggleOff: 'bg-light-blue border-light-blue justify-end text-gray-700',
        toggleOnDisabled:
          'bg-gray-300 border-gray-300 justify-start text-gray-400 cursor-not-allowed',
        toggleOffDisabled:
          'bg-gray-200 border-gray-200 justify-end text-gray-400 cursor-not-allowed',
        handle: 'inline-block bg-white w-5 h-5 top-0 rounded-full absolute transition-all',
        handleOn: 'left-full transform -translate-x-full',
        handleOff: 'left-0',
        handleOnDisabled: 'bg-gray-100 left-full transform -translate-x-full',
        handleOffDisabled: 'bg-gray-100 left-0',
        label: 'text-center w-8 border-box whitespace-nowrap select-none',
      },
    }
  },
  computed: {
    getToggleClasses(): toggleInputClasses {
      return { ...this.toggleClassesDefault, ...this.toggleClasses }
    },
  },
  emits: ['update:optionModel'],
})
</script>

<style scoped></style>
