<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// 设置 body 背景色
useHead({
  htmlAttrs: {
    lang: "zh-CN",
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
