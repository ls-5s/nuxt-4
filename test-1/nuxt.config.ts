// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Nuxt 兼容性日期
  compatibilityDate: "2025-07-15",

  // 开发者工具
  devtools: { enabled: true },

  // 模块配置
  modules: ["@nuxt/ui", "@pinia/nuxt"],

  // 全局样式
  css: ["~/assets/css/main.css"],

  // 组件自动导入配置
  components: [
    {
      path: "~/components",
      pathPrefix: false,
      ignore: ["**/*.test.*", "**/*.spec.*"],
    },
  ],

  // TypeScript 配置
  typescript: {
    strict: true,
    shim: false,
    typeCheck: false,
    tsConfig: {
      compilerOptions: {
        jsx: "preserve",
        jsxFactory: "h",
        jsxFragmentFactory: "Fragment",
      },
    },
  },

  // 应用配置
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Nuxt 4 Theme Demo",
      meta: [
        {
          name: "description",
          content: "Modern web application with theme switching built with Nuxt 4",
        },
      ],
    },
  },
});
