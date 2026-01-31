import { createPersistedState } from "pinia-plugin-persistedstate";

export default defineNuxtPlugin({
  name: "pinia-persist",
  enforce: "pre", // 确保在其他插件之前执行
  setup(nuxtApp) {
    // @pinia/nuxt 已经创建了 pinia 实例
    // 使用 createPersistedState 创建插件实例
    if (nuxtApp.$pinia) {
      (nuxtApp.$pinia as any).use(createPersistedState());
    }
  },
});
