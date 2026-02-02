<script setup lang="ts">
import { useTheme } from "~/composables/useTheme";

const { mode, isDark, toggleTheme, setMode } = useTheme();

const modes = [
  { value: "light", icon: "☀️", label: "浅色" },
  { value: "dark", icon: "🌙", label: "深色" },
] as const;
</script>

<template>
  <div class="flex items-center gap-2">
    <select
      :value="mode"
      class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
      @change="setMode(($event.target as HTMLSelectElement).value as any)"
    >
      <option
        v-for="m in modes"
        :key="m.value"
        :value="m.value"
      >
        {{ m.icon }} {{ m.label }}
      </option>
    </select>
    <button
      type="button"
      class="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
      @click="toggleTheme"
    >
      {{ isDark ? "☀️" : "🌙" }}
    </button>
  </div>
</template>
