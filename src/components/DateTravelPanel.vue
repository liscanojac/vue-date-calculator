<template>
  <div>
    <!-- Your template here -->
    <OptionInput
      :option-model="dateTravelDirection"
      @update:option-model="$emit('update:goingFuture', $event)"
    >
      <template #left-label>
        <label class="text-2xl mr-3">&minus;</label>
      </template>
      <template #right-label>
        <label class="text-2xl ml-3">&plus;</label>
      </template>
    </OptionInput>
    <div class="grid grid-cols-2">
      <div v-for="(option, optionKey) in dateTravelOptions" :key="optionKey">
        <NumberInput
          :number-value="option"
          :input-label="optionKey"
          :max-value="1000"
          @update:number-value="updateDateOption(optionKey, $event)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import OptionInput from './OptionInput.vue'
import NumberInput from './NumberInput.vue'
import type { TimeTravelOptionsBase } from '@/services/date-calculator/src/interfaces/date-calculator'

export default defineComponent({
  name: 'DateTravelPanelComponent',
  components: {
    OptionInput,
    NumberInput,
  },
  props: {
    dateTravelOptions: {
      type: Object as PropType<TimeTravelOptionsBase>,
      required: true,
    },
    dateTravelDirection: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      // Define your data properties here
    }
  },
  methods: {
    updateDateOption(optionKey: keyof TimeTravelOptionsBase, value: boolean) {
      // const updatedOptions = { ...this.dateTravelOptions, [optionKey]: value }
      // this.$emit('update:dateTravelOptions', updatedOptions)
      this.$emit('update:dateTravelOptions', optionKey, value)
    },
  },
  emits: ['update:goingFuture', 'update:dateTravelOptions'],
})
</script>

<style scoped>
/* Add your styles here */
</style>
