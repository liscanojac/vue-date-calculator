<template>
  <div>
    <Toggle :model-value="optionModel" @update:model-value="$emit('update:optionModel', $event)" />
    <label>{{ inputLabel }}</label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Toggle from '@vueform/toggle'

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
      required: true,
    },
  },
  emits: ['update:optionModel'],
})
</script>

<style src="@vueform/toggle/themes/default.css"></style>
