/**
 * 主题应用插件
 * 确保主题在客户端正确应用
 */
import { useThemeStore } from "~/stores/theme";

export default defineNuxtPlugin({
  name: "theme-listener",
  enforce: "post", // 在 Pinia 插件之后执行
  setup() {
    if (import.meta.client && typeof window !== "undefined") {
      // 等待 Pinia 初始化完成
      nextTick(() => {
        try {
          const themeStore = useThemeStore();

          // 确保主题已应用（从 store 同步）
          themeStore.applyTheme();
        } catch (error) {
          // Pinia 可能还没有初始化，忽略错误
          console.warn("[Theme Listener] Store not ready:", error);
        }
      });
    }
  },
});
