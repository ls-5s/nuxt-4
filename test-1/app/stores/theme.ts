import { defineStore } from "pinia";

export type ThemeMode = "light" | "dark";
export type ColorScheme = "blue" | "green" | "purple" | "red" | "orange";

export interface ThemeState {
  mode: ThemeMode;
  colorScheme: ColorScheme;
  isDark: boolean;
}

export const useThemeStore = defineStore(
  "theme",
  () => {
    const mode = ref<ThemeMode>("light");
    const colorScheme = ref<ColorScheme>("blue");
    // SSR 时默认为 false（浅色），客户端 hydration 后会从 localStorage 恢复
    const isDark = ref<boolean>(false);

    // 应用主题
    const applyTheme = () => {
      if (import.meta.server) return;

      const shouldBeDark = mode.value === "dark";

      isDark.value = shouldBeDark;

      const html = document.documentElement;
      if (shouldBeDark) {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }

      // 应用颜色方案
      html.setAttribute("data-color-scheme", colorScheme.value);

      // 开发环境调试日志
      if (import.meta.dev) {
        console.log("[Theme] Applied:", {
          mode: mode.value,
          colorScheme: colorScheme.value,
          isDark: shouldBeDark,
          htmlClasses: html.className,
          dataScheme: html.getAttribute("data-color-scheme"),
        });
      }
    };

    // 设置主题模式
    const setMode = (newMode: ThemeMode) => {
      mode.value = newMode;
      applyTheme();
    };

    // 切换主题
    const toggleTheme = () => {
      // 在 light 和 dark 之间切换
      setMode(isDark.value ? "light" : "dark");
    };

    // 设置颜色方案
    const setColorScheme = (scheme: ColorScheme) => {
      colorScheme.value = scheme;
      applyTheme();
    };

    return {
      mode,
      colorScheme,
      isDark,
      setMode,
      toggleTheme,
      setColorScheme,
      applyTheme,
    };
  },
  {
    persist: {
      key: "theme-store",
    },
  }
);
