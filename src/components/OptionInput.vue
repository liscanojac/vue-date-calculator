<template>
  <div>
    <input
      type="checkbox"
      :name="inputName"
      :id="inputName"
      :checked="optionModel"
      @input="$emit('update:optionModel', ($event.target as HTMLInputElement).checked)"
    />
    <label :for="inputName">{{ inputLabel }}</label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'OptionInputComponent',
  props: {
    optionModel: {
      type: Boolean,
      required: true,
    },
    inputLabel: {
      type: String,
      required: true,
    },
    inputName: {
      type: String,
      required: true,
    },
  },
  emits: ['update:optionModel'],
})
</script>

<style scoped>
/* Add your styles here */
</style>
