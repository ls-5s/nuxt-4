<template>
  <div class="page-container h-screen p-8">
    <UCard class="max-w-xl mx-auto p-6">
      <h2 class="text-xl font-semibold text-gray-900">示例页面（CA）</h2>
      <p class="mt-2 text-gray-600">
        这是一个示例内容区域，使用 Nuxt UI 卡片组件。
      </p>
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
