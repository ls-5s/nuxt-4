<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-200">
    <header class="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/75 dark:bg-gray-900/75 backdrop-blur">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
             <UIcon name="i-heroicons-rocket-launch" class="w-8 h-8 text-primary-500" />
             <span class="text-xl font-bold text-gray-900 dark:text-white">NuxtLanding</span>
          </div>
          <div class="flex items-center gap-4">
            <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700 dark:text-gray-200">
              <a href="#features" class="hover:text-primary-500">Features</a>
              <a href="#pricing" class="hover:text-primary-500">Pricing</a>
              <a href="#about" class="hover:text-primary-500">About</a>
            </nav>
            <div class="flex items-center gap-2">
              <ColorSchemeSwitcher />
              <ThemeSwitcher />
              <UButton to="/login" color="gray" variant="ghost">Sign in</UButton>
              <UButton to="/signup" color="primary">Get Started</UButton>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="flex-grow">
      <slot />
    </main>

    <footer class="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
      <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="col-span-1 md:col-span-2">
             <div class="flex items-center gap-2 mb-4">
               <UIcon name="i-heroicons-rocket-launch" class="w-6 h-6 text-primary-500" />
               <span class="text-lg font-bold text-gray-900 dark:text-white">NuxtLanding</span>
             </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
              Building the next generation of web applications with Nuxt 4, TailwindCSS, and modern best practices.
            </p>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Product</h3>
            <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="#" class="hover:text-primary-500">Features</a></li>
              <li><a href="#" class="hover:text-primary-500">Integrations</a></li>
              <li><a href="#" class="hover:text-primary-500">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Company</h3>
            <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="#" class="hover:text-primary-500">About</a></li>
              <li><a href="#" class="hover:text-primary-500">Blog</a></li>
              <li><a href="#" class="hover:text-primary-500">Contact</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-sm text-gray-500">© 2024 NuxtLanding. All rights reserved.</p>
          <div class="flex gap-4">
            <UButton icon="i-simple-icons-github" color="gray" variant="ghost" to="https://github.com" target="_blank" />
            <UButton icon="i-simple-icons-twitter" color="gray" variant="ghost" to="https://twitter.com" target="_blank" />
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Layout logic here if needed
</script>
