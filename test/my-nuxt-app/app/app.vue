<script setup lang="ts">
// 主题切换
const isDark = ref(false);
const applyTheme = (dark: boolean) => {
  const el = document.documentElement;
  el.classList.toggle("dark", dark);
  localStorage.setItem("theme", dark ? "dark" : "light");
  isDark.value = dark;
};
onMounted(() => {
  const saved = localStorage.getItem("theme");
  applyTheme(saved === "dark");
});
const toggleTheme = () => applyTheme(!isDark.value);

const userStore = useUserStore();
const { isLogin, userShowName, userInfo } = storeToRefs(userStore);
</script>

<template>
  <div>
    <NuxtLayout>
      <!-- 主题切换器 - 固定在右上角 -->
      <div class="fixed top-20 right-4 z-50 flex flex-col items-end gap-2">
        <div class="flex items-center gap-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 p-2">
          <!-- 用户信息展示 -->
          <template v-if="isLogin">
            <div class="flex items-center gap-2 mr-2 px-2 border-r border-gray-200 dark:border-gray-700">
              <UAvatar :src="userInfo.avatar" :alt="userShowName" size="xs" />
              <span class="text-xs font-medium text-gray-700 dark:text-gray-300">{{ userShowName }}</span>
              <UButton
                icon="i-heroicons-log-out"
                variant="ghost"
                color="gray"
                size="xs"
                @click="userStore.logout"
              />
            </div>
          </template>
          <template v-else>
            <UButton
              to="/login"
              label="登录"
              variant="ghost"
              color="gray"
              size="sm"
              icon="i-heroicons-user-circle"
              class="mr-2"
            />
          </template>

          <!-- 主题切换器 -->
          <UButton
            :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
            :aria-label="isDark ? '切换到浅色模式' : '切换到深色模式'"
            color="gray"
            variant="ghost"
            size="sm"
            class="!p-2"
            @click="toggleTheme"
          />
        </div>
      </div>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
  </div>
</template>
