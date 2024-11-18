<template>
  <div>
    <label>
      {{ inputDateLabel }}:
      <input
        type="date"
        name=""
        id=""
        :value="dateModel"
        :min="minDate"
        @input="$emit('update:dateModel', ($event.target as HTMLInputElement).value)"
      />
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DateInputComponent',
  props: {
    dateModel: {
      type: String,
      required: true,
    },
    onlyDateInput: {
      type: Boolean,
      default: false,
    },
    onlyOptionInput: {
      type: Boolean,
      default: false,
    },
    minDate: {
      type: String,
      required: false,
      default: '',
    },
    inputDateLabel: {
      type: String,
      required: false,
      default: '',
    },
  },
  emits: ['update:dateModel'],
  data() {
    return {
      // Define your data properties here
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
