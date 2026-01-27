import { useThemeStore } from "~/stores/theme";

/**
 * 主题切换 Composable
 * 提供便捷的主题操作方法
 */
export const useTheme = () => {
  const themeStore = useThemeStore();

  return {
    mode: computed(() => themeStore.mode),
    colorScheme: computed(() => themeStore.colorScheme),
    isDark: computed(() => themeStore.isDark),
    toggleTheme: themeStore.toggleTheme,
    setMode: themeStore.setMode,
    setColorScheme: themeStore.setColorScheme,
  };
};
