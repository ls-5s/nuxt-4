<template>
  <div class="space-y-12">
    <!-- 介绍部分 -->
    <section>
      <h2 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        {{ $t('demo.title') }}
        <NuxtLink to="/">{{ $t('demo.backHome') }}</NuxtLink>
      </h2>
      <p class="text-lg text-gray-600 dark:text-gray-400">
        {{ $t('demo.description') }}
      </p>
    </section>

    <!-- 按钮组件演示 -->
    <section>
      <h3 class="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
        {{ $t('demo.buttons.title') }}
      </h3>

      <!-- 尺寸演示 -->
      <div class="mb-8">
        <h4 class="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">
          {{ $t('demo.buttons.sizes.title') }}
        </h4>
        <div class="flex flex-wrap items-center gap-4">
          <Button size="xs">{{ $t('demo.buttons.sizes.xs') }}</Button>
          <Button size="sm">{{ $t('demo.buttons.sizes.sm') }}</Button>
          <Button size="md">{{ $t('demo.buttons.sizes.md') }}</Button>
          <Button size="lg">{{ $t('demo.buttons.sizes.lg') }}</Button>
          <Button size="xl">{{ $t('demo.buttons.sizes.xl') }}</Button>
        </div>
      </div>

      <!-- 变体演示 -->
      <div class="mb-8">
        <h4 class="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">
          {{ $t('demo.buttons.variants.title') }}
        </h4>
        <div class="flex flex-wrap items-center gap-4">
          <Button variant="solid">{{ $t('demo.buttons.variants.solid') }}</Button>
          <Button variant="outline">{{ $t('demo.buttons.variants.outline') }}</Button>
          <Button variant="ghost">{{ $t('demo.buttons.variants.ghost') }}</Button>
          <Button variant="soft">{{ $t('demo.buttons.variants.soft') }}</Button>
          <Button variant="link">{{ $t('demo.buttons.variants.link') }}</Button>
        </div>
      </div>

      <!-- 意图/颜色演示 -->
      <div class="mb-8">
        <h4 class="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">
          {{ $t('demo.buttons.intents.title') }}
        </h4>
        <div class="space-y-4">
          <div class="flex flex-wrap items-center gap-4">
            <Button intent="primary">{{ $t('demo.buttons.intents.primary') }}</Button>
            <Button intent="secondary">{{ $t('demo.buttons.intents.secondary') }}</Button>
            <Button intent="success">{{ $t('demo.buttons.intents.success') }}</Button>
            <Button intent="warning">{{ $t('demo.buttons.intents.warning') }}</Button>
            <Button intent="danger">{{ $t('demo.buttons.intents.danger') }}</Button>
            <Button intent="neutral">{{ $t('demo.buttons.intents.neutral') }}</Button>
          </div>
          <div class="flex flex-wrap items-center gap-4">
            <Button variant="outline" intent="primary">{{ $t('demo.buttons.intents.primary') }}</Button>
            <Button variant="outline" intent="secondary">{{ $t('demo.buttons.intents.secondary') }}</Button>
            <Button variant="outline" intent="success">{{ $t('demo.buttons.intents.success') }}</Button>
            <Button variant="outline" intent="warning">{{ $t('demo.buttons.intents.warning') }}</Button>
            <Button variant="outline" intent="danger">{{ $t('demo.buttons.intents.danger') }}</Button>
            <Button variant="outline" intent="neutral">{{ $t('demo.buttons.intents.neutral') }}</Button>
          </div>
        </div>
      </div>

      <!-- 状态演示 -->
      <div class="mb-8">
        <h4 class="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">
          {{ $t('demo.buttons.states.title') }}
        </h4>
        <div class="flex flex-wrap items-center gap-4">
          <Button>{{ $t('demo.buttons.states.normal') }}</Button>
          <Button disabled>{{ $t('demo.buttons.states.disabled') }}</Button>
          <Button loading>{{ $t('demo.buttons.states.loading') }}</Button>
          <Button full-width>{{ $t('demo.buttons.states.fullWidth') }}</Button>
        </div>
      </div>

      <!-- 组合演示 -->
      <div class="mb-8">
        <h4 class="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">
          {{ $t('demo.buttons.combinations.title') }}
        </h4>
        <div class="flex flex-wrap items-center gap-4">
          <Button size="lg" variant="solid" intent="primary">
            {{ $t('demo.buttons.combinations.lgPrimary') }}
          </Button>
          <Button size="sm" variant="outline" intent="success">
            {{ $t('demo.buttons.combinations.smSuccess') }}
          </Button>
          <Button variant="soft" intent="warning" loading>
            {{ $t('demo.buttons.combinations.loadingWarning') }}
          </Button>
          <Button variant="ghost" intent="danger" disabled>
            {{ $t('demo.buttons.combinations.disabledDanger') }}
          </Button>
        </div>
      </div>
    </section>

    <!-- 主题切换演示 -->
    <section>
      <h3 class="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
        {{ $t('demo.theme.title') }}
      </h3>
      <ClientOnly>
        <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 space-y-4">
          <p class="text-gray-700 dark:text-gray-300">
            {{ $t('demo.theme.currentMode') }}: <strong>{{ mode === "dark" ? $t('demo.theme.dark') : $t('demo.theme.light') }}</strong>
          </p>
          <p class="text-gray-700 dark:text-gray-300">
            {{ $t('demo.theme.colorScheme') }}: <strong>{{ colorScheme }}</strong>
          </p>
          <p class="text-gray-700 dark:text-gray-300">
            {{ $t('demo.theme.isDark') }}: <strong>{{ isDark ? $t('demo.theme.yes') : $t('demo.theme.no') }}</strong>
          </p>
          <div class="flex gap-4">
            <Button @click="toggleTheme">
              {{ isDark ? $t('demo.theme.switchToLight') : $t('demo.theme.switchToDark') }}
            </Button>
          </div>
        </div>
        <template #fallback>
          <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 space-y-4">
            <p class="text-gray-700 dark:text-gray-300">{{ $t('demo.loading') }}</p>
          </div>
        </template>
      </ClientOnly>
    </section>

    <!-- 颜色方案演示 -->
    <section>
      <h3 class="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
        {{ $t('demo.colorSchemes.title') }}
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="scheme in schemes"
          :key="scheme.value"
          class="p-6 rounded-lg border-2 transition-all"
          :class="[
            colorScheme === scheme.value
              ? 'border-brand-600 dark:border-brand-400 bg-brand-50 dark:bg-brand-900/20'
              : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800',
          ]"
        >
          <h4 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
            {{ $t(schemeLabels[scheme.value].label) }}
          </h4>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {{ $t(schemeLabels[scheme.value].description) }}
          </p>
          <Button
            :intent="scheme.value === colorScheme ? 'primary' : 'neutral'"
            :variant="scheme.value === colorScheme ? 'solid' : 'outline'"
            size="sm"
            @click="setColorScheme(scheme.value)"
          >
            {{ scheme.value === colorScheme ? $t('demo.colorSchemes.current') : $t('demo.colorSchemes.switchTo') }}
          </Button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from "~/composables/useTheme";
import { useI18n } from '#imports';

const { t } = useI18n();
const { mode, colorScheme, isDark, toggleTheme, setColorScheme } = useTheme();

// 颜色方案配置
const schemes = [
  { value: "blue" },
  { value: "green" },
  { value: "purple" },
  { value: "red" },
  { value: "orange" },
] as const;

// 颜色方案标签
const schemeLabels = {
  blue: {
    label: "demo.colorSchemes.blue.label",
    description: "demo.colorSchemes.blue.description",
  },
  green: {
    label: "demo.colorSchemes.green.label",
    description: "demo.colorSchemes.green.description",
  },
  purple: {
    label: "demo.colorSchemes.purple.label",
    description: "demo.colorSchemes.purple.description",
  },
  red: {
    label: "demo.colorSchemes.red.label",
    description: "demo.colorSchemes.red.description",
  },
  orange: {
    label: "demo.colorSchemes.orange.label",
    description: "demo.colorSchemes.orange.description",
  },
};
</script>
