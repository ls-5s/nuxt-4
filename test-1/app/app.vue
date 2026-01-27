<template>
  <div class="fixed top-4 right-4 z-50 flex items-center space-x-4">
    <!-- 语言切换 -->
    <USelect
      v-model="currentLocale"
      :options="locales"
      option-attribute="name"
      value-attribute="code"
      icon="i-heroicons-language"
      color="gray"
      variant="outline"
    />
  </div>

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useI18n } from '#imports';

const { locale, locales, setLocale } = useI18n();

// 语言切换计算属性
const currentLocale = computed({
  get: () => locale.value,
  set: (value) => {
    setLocale(value);
  },
});

// 设置 body 背景色和 HTML lang 属性
useHead({
  htmlAttrs: {
    lang: locale,
    dir: "ltr",
  },
  bodyAttrs: {
    class: "bg-white dark:bg-gray-900 transition-colors duration-200",
  },
});

// 确保主题在客户端正确应用
onMounted(() => {
  if (import.meta.client) {
    // 使用 nextTick 确保 Pinia 已完全初始化
    nextTick(() => {
      try {
        const themeStore = useThemeStore();
        themeStore.applyTheme();
      } catch (error) {
        console.warn("[App] Theme store not ready, retrying...", error);
        // 延迟重试
        setTimeout(() => {
          try {
            const themeStore = useThemeStore();
            themeStore.applyTheme();
          } catch (e) {
            console.error("[App] Failed to apply theme:", e);
          }
        }, 100);
      }
    });
  }
});
</script>
