<script setup lang="ts">
import { useTheme } from "~/composables/useTheme";
import { useI18n } from '#imports';

const { t } = useI18n();
const { colorScheme, setColorScheme } = useTheme();

const schemes = [
  { value: "blue", color: "bg-blue-500", label: t('colorSchemes.blue') },
  { value: "green", color: "bg-green-500", label: t('colorSchemes.green') },
  { value: "purple", color: "bg-purple-500", label: t('colorSchemes.purple') },
  { value: "red", color: "bg-red-500", label: t('colorSchemes.red') },
  { value: "orange", color: "bg-orange-500", label: t('colorSchemes.orange') },
] as const;
</script>

<template>
  <div class="flex items-center gap-2">
    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
      {{ $t('colorSchemes.title') }}:
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
