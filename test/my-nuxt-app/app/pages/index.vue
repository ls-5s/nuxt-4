<script setup lang="ts">
// 页面元数据
useHead({
  title: '首页 - Nuxt 4',
  meta: [
    { name: 'description', content: '使用 Nuxt UI 与 Tailwind，快速构建现代、优雅的网页体验。' }
  ]
})
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero 区域 -->
    <section class="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div class="text-center">
          <!-- 徽章 -->
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 text-sm font-medium mb-6">
            <span class="i-heroicons-sparkles text-base"></span>
            <span>全新发布</span>
          </div>

          <!-- 主标题 -->
          <h1 class="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
            <span class="block">精美着陆页</span>
            <span class="block bg-gradient-to-r from-brand-600 to-brand-700 bg-clip-text text-transparent">
              现代化设计
            </span>
          </h1>

          <!-- 描述 -->
          <p class="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300 mb-10">
            使用 Nuxt UI 与 Tailwind，快速构建现代、优雅的网页体验。
          </p>

          <!-- CTA 按钮 -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <UButton
              icon="i-heroicons-rocket-launch"
              size="xl"
              label="立即体验"
              class="bg-brand-600 hover:bg-brand-700 text-white border-0 shadow-lg shadow-brand-500/50 hover:shadow-xl hover:shadow-brand-500/50 transition-all"
            />
            <UButton
              icon="i-heroicons-book-open"
              variant="outline"
              size="xl"
              label="查看文档"
              class="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            />
          </div>

          <!-- 统计信息 -->
          <div class="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div class="text-center">
              <div class="text-3xl font-bold text-brand-600 dark:text-brand-400">100+</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">组件</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-brand-600 dark:text-brand-400">50K+</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">下载量</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-brand-600 dark:text-brand-400">99%</div>
              <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">满意度</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 特性区域 -->
    <section class="py-24 bg-white dark:bg-gray-900">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            为什么选择我们
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            提供完整的解决方案，让开发更简单、更高效
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- 特性卡片 1 -->
          <UCard class="p-8 hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:border-brand-300 dark:hover:border-brand-700">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center mb-6">
              <span class="i-heroicons-sparkles-20-solid text-white text-2xl"></span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
              组件丰富
            </h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              内置 100+ 精美组件，包括按钮、卡片、图标等，随拿随用，开箱即用。
            </p>
          </UCard>

          <!-- 特性卡片 2 -->
          <UCard class="p-8 hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:border-brand-300 dark:hover:border-brand-700">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center mb-6">
              <span class="i-heroicons-bolt-20-solid text-white text-2xl"></span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
              性能优先
            </h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              轻量、极速，采用最新的技术栈，开发与体验两不误，性能卓越。
            </p>
          </UCard>

          <!-- 特性卡片 3 -->
          <UCard class="p-8 hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:border-brand-300 dark:hover:border-brand-700">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center mb-6">
              <span class="i-heroicons-shield-check-20-solid text-white text-2xl"></span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
              最佳实践
            </h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              约定优于配置，遵循行业最佳实践，快速上手不走弯路，代码质量有保障。
            </p>
          </UCard>
        </div>
      </div>
    </section>

    <!-- CTA 区域 -->
    <section class="py-24 bg-gradient-to-r from-brand-600 to-brand-700">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <UCard class="bg-white/10 dark:bg-white/5 backdrop-blur-md border-0 p-12">
          <div class="flex flex-col md:flex-row items-center justify-between gap-8">
            <div class="text-center md:text-left">
              <h3 class="text-3xl font-bold text-white mb-4">
                准备好开始了吗？
              </h3>
              <p class="text-lg text-white/90 max-w-xl">
                几分钟内搭建你的新项目，立即开始你的开发之旅。
              </p>
            </div>
            <div>
              <UButton
                icon="i-heroicons-arrow-right-20-solid"
                size="xl"
                label="开始构建"
                class="bg-white text-brand-600 hover:bg-gray-100 border-0 shadow-lg hover:shadow-xl transition-all"
              />
            </div>
          </div>
        </UCard>
      </div>
    </section>
  </div>
</template>

<style scoped>
.bg-grid-pattern {
  background-image:
    linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
}

.dark .bg-grid-pattern {
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
}
</style>
