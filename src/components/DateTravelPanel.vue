<template>
  <div>
    <div class="flex flex-col items-center">
      <h3 class="my-1 font-medium text-sm">Add/Subtract from a Date</h3>
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
    </div>
    <div class="grid grid-cols-2 justify-items-center gap-4 my-3">
      <div
        class="flex items-center"
        v-for="(option, optionKey) in dateTravelOptions"
        :key="optionKey"
      >
        <NumberInput
          :number-value="option"
          :input-label="optionKey"
          label-class="capitalize text-center"
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
    return {}
  },
  methods: {
    updateDateOption(optionKey: keyof TimeTravelOptionsBase, value: boolean) {
      this.$emit('update:dateTravelOptions', optionKey, value)
    },
  },
  emits: ['update:goingFuture', 'update:dateTravelOptions'],
})
</script>

<style scoped>
/* Add your styles here */
</style>
