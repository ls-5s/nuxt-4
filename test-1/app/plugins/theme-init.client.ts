/**
 * 主题初始化插件
 * 在页面渲染前应用主题，避免闪烁和 hydration 不匹配
 */
export default defineNuxtPlugin({
  name: "theme-init-script",
  enforce: "pre", // 在其他插件之前执行
  setup() {
    if (import.meta.client && typeof window !== "undefined") {
      // 在页面渲染前立即应用主题
      const applyThemeFromStorage = () => {
        try {
          const theme = localStorage.getItem("theme-store");
          if (theme) {
            const parsed = JSON.parse(theme);
            const mode = parsed.mode || "light";
            const colorScheme = parsed.colorScheme || "blue";

            const html = document.documentElement;
            html.setAttribute("data-color-scheme", colorScheme);

            // 直接根据 mode 判断，不再检测系统主题
            const shouldBeDark = mode === "dark";

            if (shouldBeDark) {
              html.classList.add("dark");
            } else {
              html.classList.remove("dark");
            }
          }
        } catch (e) {
          // 忽略错误，让其他插件处理
        }
      };

      // 立即执行
      applyThemeFromStorage();
    }
  },
});
