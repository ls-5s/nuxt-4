<!-- app/pages/about.vue -->
<script setup lang="ts">
// 明确指定当前页面使用 custom 布局（对应 layouts/custom.vue）
definePageMeta({
  layout: "custom",
});
</script>

<template>
  <div class="about-page h-screen p-8">
    <UCard class="max-w-3xl mx-auto p-6">
      <h1 class="text-2xl font-bold">关于页（Custom 布局）</h1>
      <p class="mt-3 text-gray-600">
        我使用的是 layouts/custom.vue 布局（深色系）
      </p>
      <p class="mt-1 text-gray-600">可以看到深蓝色侧边栏 + 深色导航栏</p>
      <div class="mt-6">
        <UButton
          to="/"
          icon="i-heroicons-home"
          label="返回首页"
          class="bg-brand-600 hover:bg-brand-700 text-white border-0"
        />
      </div>
    </UCard>
  </div>
</template>
