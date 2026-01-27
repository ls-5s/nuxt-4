<!-- app/layouts/default.vue -->
<template>
  <div class="default-layout min-h-screen flex flex-col bg-white dark:bg-gray-900">
    <!-- 现代化导航栏 -->
    <header class="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
      <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <!-- Logo 和品牌 -->
          <div class="flex items-center gap-3">
            <NuxtLink to="/" class="flex items-center gap-2 group">
              <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span class="i-heroicons-sparkles text-white text-lg"></span>
              </div>
              <span class="text-xl font-bold text-gray-900 dark:text-white">Nuxt 4</span>
            </NuxtLink>
          </div>

          <!-- 导航链接 -->
          <div class="hidden md:flex items-center gap-1">
            <NuxtLink
              to="/"
              class="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              active-class="bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400"
            >
              首页
            </NuxtLink>
            <NuxtLink
              to="/about"
              class="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              active-class="bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400"
            >
              关于我们
            </NuxtLink>
            <NuxtLink
              to="/demo"
              class="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              active-class="bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400"
            >
              演示
            </NuxtLink>
          </div>

          <!-- 移动端菜单按钮 -->
          <div class="md:hidden">
            <UButton
              icon="i-heroicons-bars-3"
              variant="ghost"
              size="sm"
              @click="mobileMenuOpen = !mobileMenuOpen"
            />
          </div>
        </div>

        <!-- 移动端菜单 -->
        <div v-if="mobileMenuOpen" class="md:hidden pb-4 space-y-1">
          <NuxtLink
            to="/"
            class="block px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            @click="mobileMenuOpen = false"
          >
            首页
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="block px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            @click="mobileMenuOpen = false"
          >
            关于我们
          </NuxtLink>
          <NuxtLink
            to="/demo"
            class="block px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            @click="mobileMenuOpen = false"
          >
            演示
          </NuxtLink>
        </div>
      </nav>
    </header>

    <!-- 页面内容 -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- 现代化页脚 -->
    <footer class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- 品牌信息 -->
          <div>
            <div class="flex items-center gap-2 mb-4">
              <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                <span class="i-heroicons-sparkles text-white text-lg"></span>
              </div>
              <span class="text-lg font-bold text-gray-900 dark:text-white">Nuxt 4</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              使用 Nuxt UI 与 Tailwind CSS 构建的现代化 Web 应用框架。
            </p>
          </div>

          <!-- 快速链接 -->
          <div>
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">快速链接</h3>
            <ul class="space-y-2">
              <li>
                <NuxtLink to="/" class="text-sm text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  首页
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/about" class="text-sm text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  关于我们
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/demo" class="text-sm text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  演示
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- 联系信息 -->
          <div>
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">联系我们</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              如有任何问题或建议，欢迎随时联系我们。
            </p>
          </div>
        </div>

        <!-- 版权信息 -->
        <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p class="text-center text-sm text-gray-600 dark:text-gray-400">
            © 2026 我的 Nuxt 4 项目 - 保留所有权利
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const mobileMenuOpen = ref(false)
</script>
