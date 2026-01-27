// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Nuxt 兼容性日期（固定配置）
  compatibilityDate: "2025-07-15",
  // 开启开发者工具
  devtools: { enabled: true },
  // 引入 Nuxt UI 模块
  modules: ["@nuxt/ui", "@nuxtjs/i18n", "@pinia/nuxt"],
  // 全局导入自定义 CSS
  css: ["./app/assets/main.css"],

  // 组件自动导入配置：排除 demo 目录，避免无用组件被导入
  components: {
    dirs: [
      "~/components", // 保留默认 components 目录自动导入
      {
        path: "~/components",
        ignore: ["**/demo/**"], // 简化忽略规则，**/demo/** 已包含所有 demo 子目录及文件
      },
    ],
  },

  // Vue 核心配置：启用 JSX/TSX 语法，移除 Vue 2 废弃配置
  vue: {
    compilerOptions: {
      // 已删除：preserveWhitespace: false（Vue 3 不支持，会触发类型错误）
    },
    // jsx: true, // 核心开关：启用 Nuxt 内置的 JSX/TSX 解析支持
  },

  // TypeScript 配置：适配 JSX/TSX 语法，关闭无用 shim
  typescript: {
    shim: false, // 关闭 Nuxt 自动生成的 shim 文件（TS 项目无需）
    tsConfig: {
      compilerOptions: {
        jsx: "preserve", // 保留 JSX 语法，由 Nuxt/Vue 编译器统一处理
        jsxFactory: "h", // 指定 JSX 转换的核心渲染函数
        jsxFragmentFactory: "Fragment", // 指定 JSX 片段（<>...</>）的底层容器
      },
    },
  },

  i18n: {
    locales: [
      { code: "zh", iso: "zh-CN", name: "中文", file: "zh.json" },
      { code: "en", iso: "en-US", name: "English", file: "en.json" },
    ],
    defaultLocale: "zh",
    strategy: "prefix_except_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      alwaysRedirect: false,
      fallbackLocale: "zh",
    },
    langDir: "locales",
    vueI18n: "./i18n.config.ts",
  },
});
