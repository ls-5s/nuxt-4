<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
    <header class="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            Nuxt 4 Theme Demo
          </h1>
          <div class="flex items-center gap-4">
            <ColorSchemeSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </header>
    <main class="container mx-auto px-4 py-8">
      <slot />
    </main>
    <footer class="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 mt-auto">
      <div class="container mx-auto px-4 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
        Built with Nuxt 4, TypeScript & Tailwind CSS
      </div>
    </footer>
  </div>
</template>
