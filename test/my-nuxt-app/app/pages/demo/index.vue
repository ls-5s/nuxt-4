<script setup lang="ts">
import MyButton from "../../components/demo/UButton.vue";
const loading = ref(false);
</script>

<template>
  <div class="h-screen p-8 space-y-6">
    <h1 class="text-2xl font-bold">封装按钮大全 (demo/UButton.vue)</h1>

    <UCard class="space-y-4 p-6">
      <h2 class="text-xl font-semibold">封装组件 - 基础颜色 (intent)</h2>
      <div class="flex flex-wrap gap-4 items-center">
        <MyButton label="Primary" intent="primary" />
        <MyButton label="Neutral" intent="neutral" />
        <MyButton label="Danger" intent="danger" />
      </div>
    </UCard>

    <UCard class="space-y-4 p-6">
      <h2 class="text-xl font-semibold">封装组件 - 变体样式 (variant)</h2>
      <div class="flex flex-wrap gap-4 items-center">
        <MyButton label="Solid" variant="solid" />
        <MyButton label="Soft" variant="soft" />
        <MyButton label="Outline" variant="outline" />
        <MyButton label="Ghost" variant="ghost" />
      </div>
    </UCard>

    <UCard class="space-y-4 p-6">
      <h2 class="text-xl font-semibold">封装组件 - 不同尺寸 (size)</h2>
      <div class="flex flex-wrap gap-4 items-center">
        <MyButton label="Small" size="sm" />
        <MyButton label="Medium" size="md" />
        <MyButton label="Large" size="lg" />
      </div>
    </UCard>

    <UCard class="space-y-4 p-6">
      <h2 class="text-xl font-semibold">封装组件 - 状态与图标</h2>
      <div class="flex flex-wrap gap-4 items-center">
        <MyButton label="加载中" loading />
        <MyButton label="带图标" icon="i-heroicons-sparkles" />
      </div>
    </UCard>
  </div>
</template>
