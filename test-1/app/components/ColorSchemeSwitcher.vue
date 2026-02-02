<script setup lang="ts">
import { useTheme } from "~/composables/useTheme";

const { colorScheme, setColorScheme } = useTheme();

const schemes = [
  { value: "blue", color: "bg-blue-500", label: "蓝色" },
  { value: "green", color: "bg-green-500", label: "绿色" },
  { value: "purple", color: "bg-purple-500", label: "紫色" },
  { value: "red", color: "bg-red-500", label: "红色" },
  { value: "orange", color: "bg-orange-500", label: "橙色" },
] as const;
</script>

<template>
  <div class="flex items-center gap-2">
    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
      配色方案:
    </span>
    <div class="flex gap-2">
      <button
        v-for="scheme in schemes"
        :key="scheme.value"
        type="button"
        :class="[
          'h-8 w-8 rounded-full border-2 transition-all',
          scheme.color,
          colorScheme === scheme.value
            ? 'border-gray-900 dark:border-white scale-110'
            : 'border-transparent hover:scale-105',
        ]"
        :title="scheme.label"
        @click="setColorScheme(scheme.value)"
      />
    </div>
  </div>
</template>
