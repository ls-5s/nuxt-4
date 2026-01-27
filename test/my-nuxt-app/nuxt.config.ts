// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Nuxt 兼容性日期
  compatibilityDate: "2025-07-15",

  // 开发者工具
  devtools: { enabled: true },

  // 模块配置
  modules: [
    "@nuxt/ui",
    "@pinia/nuxt",
  ],

  // 全局样式
  css: ["~/assets/css/main.css"],

  // 组件自动导入配置
  components: [
    {
      path: "~/components",
      pathPrefix: false,
      ignore: ["**/demo/**", "**/*.test.*", "**/*.spec.*"],
    },
  ],

  // TypeScript 配置
  typescript: {
    strict: true,
    shim: false,
    // 禁用开发时的类型检查（可通过 pnpm typecheck 单独运行）
    // 避免 vite-plugin-checker 的 ESLint 版本冲突
    typeCheck: false,
    tsConfig: {
      compilerOptions: {
        jsx: "preserve",
        jsxFactory: "h",
        jsxFragmentFactory: "Fragment",
      },
    },
  },

  // 运行时配置
  runtimeConfig: {
    // 私有配置（仅在服务端可用）
    apiSecret: "",
    // 公共配置（客户端和服务端都可用）
    public: {
      apiBase: "",
      appName: "Nuxt 4 App",
      appVersion: "1.0.0",
    },
<<<<<<< HEAD
    langDir: "locales",
    vueI18n: "./i18n.config.ts",
=======
  },

  // 应用配置
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Nuxt 4 App",
      meta: [
        { name: "description", content: "Modern web application built with Nuxt 4" },
      ],
    },
  },

  // 构建配置
  build: {
    transpile: [],
  },

  // 实验性功能
  experimental: {
    // 根据需要启用实验性功能
>>>>>>> ea113425e9fd30896636ff25f524813f9558c631
  },
});
