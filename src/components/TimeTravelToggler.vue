<template>
  <div>
    <OptionInput
      :option-model="timeTravel"
      :input-label="timeTravelLabel"
      @update:option-model="$emit('update:timeTravel', $event)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import OptionInput from './OptionInput.vue'

export default defineComponent({
  name: 'TimeTravelTogglerComponent',
  components: {
    OptionInput,
  },
  props: {
    timeTravel: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      timeTravelLabel: 'Add to or Subtract from a Date',
    }
  },
  methods: {},
  emits: ['update:timeTravel'],
})
</script>

<style scoped>
/* Add your styles here */
</style>
