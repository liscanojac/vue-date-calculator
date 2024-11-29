<template>
  <div>
    <OptionInput
      :option-model="darkMode"
      :toggle-classes="toggleClasses"
      @update:option-model="toggleDarkMode"
    >
      <template #left-label>
        <Icon icon="mingcute:sun-line" :class="{ invisible: darkMode }" class="mr-2 text-3xl" />
      </template>
      <template #right-label>
        <Icon icon="lucide:sun-moon" :class="{ invisible: !darkMode }" class="ml-3 text-3xl" />
      </template>
    </OptionInput>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import OptionInput from './OptionInput.vue'
import { Icon } from '@iconify/vue'

export default defineComponent({
  name: 'DarkModeComponent',
  components: {
    OptionInput,
    Icon,
  },
  props: {},
  data() {
    return {
      darkMode: false,
      toggleClasses: {
        toggleOff: 'bg-dark-blue border-dark-blue justify-end text-gray-700',
      },
    }
  },
  mounted() {
    const initialTheme = this.hasDarkThemePreference()
    this.toggleDarkMode(initialTheme)
  },
  methods: {
    toggleDarkMode(optionTheme: boolean) {
      this.darkMode = optionTheme
      optionTheme ? document.body.classList.add('dark') : document.body.classList.remove('dark')
      this.$emit('update:darkMode', this.darkMode)
    },
    hasDarkThemePreference(): boolean {
      const darkPreference = window.matchMedia('(prefers-color-scheme: dark)').matches
      return darkPreference
    },
  },
  emits: ['update:darkMode'],
})
</script>

<style scoped>
/* Add your styles here */
</style>
