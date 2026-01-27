<template>
  <div class="space-y-12">
    <!-- 介绍部分 -->
    <section>
      <h2 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
        欢迎使用 Nuxt 4 主题演示
      </h2>
      <p class="text-lg text-gray-600 dark:text-gray-400">
        这是一个使用 Nuxt 4、TypeScript 和 Tailwind CSS 构建的规范化前端项目示例。包含主题切换、颜色方案切换和完整的按钮组件系统。
      </p>
    </section>

    <!-- 按钮组件演示 -->
    <section>
      <h3 class="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
        按钮组件演示
      </h3>

      <!-- 尺寸演示 -->
      <div class="mb-8">
        <h4 class="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">
          尺寸
        </h4>
        <div class="flex flex-wrap items-center gap-4">
          <Button size="xs">超小 (XS)</Button>
          <Button size="sm">小 (SM)</Button>
          <Button size="md">中 (MD)</Button>
          <Button size="lg">大 (LG)</Button>
          <Button size="xl">超大 (XL)</Button>
        </div>
      </div>

      <!-- 变体演示 -->
      <div class="mb-8">
        <h4 class="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">
          变体
        </h4>
        <div class="flex flex-wrap items-center gap-4">
          <Button variant="solid">实心 (Solid)</Button>
          <Button variant="outline">轮廓 (Outline)</Button>
          <Button variant="ghost">幽灵 (Ghost)</Button>
          <Button variant="soft">柔和 (Soft)</Button>
          <Button variant="link">链接 (Link)</Button>
        </div>
      </div>

      <!-- 意图/颜色演示 -->
      <div class="mb-8">
        <h4 class="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">
          意图/颜色
        </h4>
        <div class="space-y-4">
          <div class="flex flex-wrap items-center gap-4">
            <Button intent="primary">主要 (Primary)</Button>
            <Button intent="secondary">次要 (Secondary)</Button>
            <Button intent="success">成功 (Success)</Button>
            <Button intent="warning">警告 (Warning)</Button>
            <Button intent="danger">危险 (Danger)</Button>
            <Button intent="neutral">中性 (Neutral)</Button>
          </div>
          <div class="flex flex-wrap items-center gap-4">
            <Button variant="outline" intent="primary">主要 (Primary)</Button>
            <Button variant="outline" intent="secondary">次要 (Secondary)</Button>
            <Button variant="outline" intent="success">成功 (Success)</Button>
            <Button variant="outline" intent="warning">警告 (Warning)</Button>
            <Button variant="outline" intent="danger">危险 (Danger)</Button>
            <Button variant="outline" intent="neutral">中性 (Neutral)</Button>
          </div>
        </div>
      </div>

      <!-- 状态演示 -->
      <div class="mb-8">
        <h4 class="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">
          状态
        </h4>
        <div class="flex flex-wrap items-center gap-4">
          <Button>正常</Button>
          <Button disabled>禁用</Button>
          <Button loading>加载中</Button>
          <Button full-width>全宽按钮</Button>
        </div>
      </div>

      <!-- 组合演示 -->
      <div class="mb-8">
        <h4 class="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">
          组合示例
        </h4>
        <div class="flex flex-wrap items-center gap-4">
          <Button size="lg" variant="solid" intent="primary">
            大号主要按钮
          </Button>
          <Button size="sm" variant="outline" intent="success">
            小号成功按钮
          </Button>
          <Button variant="soft" intent="warning" loading>
            加载中的警告按钮
          </Button>
          <Button variant="ghost" intent="danger" disabled>
            禁用的危险按钮
          </Button>
        </div>
      </div>
    </section>

    <!-- 主题切换演示 -->
    <section>
      <h3 class="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
        主题切换演示
      </h3>
      <ClientOnly>
        <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 space-y-4">
          <p class="text-gray-700 dark:text-gray-300">
            当前主题模式：<strong>{{ mode === "dark" ? "深色" : "浅色" }}</strong>
          </p>
          <p class="text-gray-700 dark:text-gray-300">
            当前颜色方案：<strong>{{ colorScheme }}</strong>
          </p>
          <p class="text-gray-700 dark:text-gray-300">
            是否为深色模式：<strong>{{ isDark ? "是" : "否" }}</strong>
          </p>
          <div class="flex gap-4">
            <Button @click="toggleTheme">
              {{ isDark ? "切换到浅色" : "切换到深色" }}
            </Button>
          </div>
        </div>
        <template #fallback>
          <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 space-y-4">
            <p class="text-gray-700 dark:text-gray-300">加载中...</p>
          </div>
        </template>
      </ClientOnly>
    </section>

    <!-- 颜色方案演示 -->
    <section>
      <h3 class="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
        颜色方案演示
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
            {{ schemeLabels[scheme.value].label }}
          </h4>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {{ schemeLabels[scheme.value].description }}
          </p>
          <Button
            :intent="scheme.value === colorScheme ? 'primary' : 'neutral'"
            :variant="scheme.value === colorScheme ? 'solid' : 'outline'"
            size="sm"
            @click="setColorScheme(scheme.value)"
          >
            {{ scheme.value === colorScheme ? "当前方案" : "切换到此方案" }}
          </Button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from "~/composables/useTheme";

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
    label: "蓝色方案",
    description: "经典蓝色，适合大多数应用场景",
  },
  green: {
    label: "绿色方案",
    description: "清新绿色，适合自然、环保类应用",
  },
  purple: {
    label: "紫色方案",
    description: "优雅紫色，适合创意、艺术类应用",
  },
  red: {
    label: "红色方案",
    description: "热情红色，适合活力、运动类应用",
  },
  orange: {
    label: "橙色方案",
    description: "温暖橙色，适合温暖、友好类应用",
  },
};
</script>
