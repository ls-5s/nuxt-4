<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100"
  >
    <div class="text-center px-6">
      <h1 class="text-6xl font-extrabold text-gray-900">404</h1>
      <p class="mt-4 text-gray-600">抱歉，页面不存在或已被移动</p>
      <div class="mt-8 flex justify-center gap-4">
        <UButton
          icon="i-heroicons-home"
          color="blue"
          size="lg"
          to="/"
          label="返回首页"
        />
        <UButton
          icon="i-heroicons-book-open"
          color="gray"
          variant="soft"
          size="lg"
          to="/ui-demo"
          label="查看示例"
        />
      </div>
    </div>
  </div>
</template>
