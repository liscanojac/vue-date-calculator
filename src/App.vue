<script setup lang="ts">
import { ref } from 'vue'
import DateCalculator from './components/DateCalculator.vue'
DateCalculator
import DarkModeInput from './components/DarkModeInput.vue'
import { Icon } from '@iconify/vue'

const darkMode = ref(false)
</script>

<template>
  <header class="flex items-center justify-around py-2 px-4">
    <img alt="Vue logo" class="h-10 w-10 md:h-12 md:w-12" src="./assets/logo.svg" />
    <h1 class="text-xl md:text-2xl lg:text-3xl font-semibold">Vue Date Calculator</h1>
    <DarkModeInput v-model:dark-mode="darkMode" />
  </header>
  <main>
    <DateCalculator :dark-mode="darkMode" />
  </main>
  <footer class="absolute bottom-0 w-full">
    <div class="grid items-center grid-cols-2 md:grid-cols-4 lg:grid-cols-7 py-4">
      <div class="md:col-start-2 md:col-span-2 lg:col-start-3 lg:col-span-3">
        <div class="flex justify-center items-center">
          <h4 class="flex text-center">
            Made with <span class="text-xl px-1"><Icon icon="line-md:heart-filled" /></span> and Vue
          </h4>
        </div>
      </div>
      <div class="md:col-start-4 lg:col-start-7">
        <div class="flex justify-center items-center text-2xl">
          <a class="mr-2" href="https://x.com/liscanojac" target="_blank" rel="noopener noreferrer">
            <Icon icon="line-md:twitter-x" />
          </a>
          <a
            href="https://github.com/liscanojac/vue-date-calculator"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon icon="line-md:github" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped></style>
