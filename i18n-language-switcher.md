# Nuxt UI 语言切换功能实现指南

本文档详细说明如何在 Nuxt 4 项目中集成 Nuxt UI 和 i18n 模块，实现多语言切换功能。

## 目录

- [前置要求](#前置要求)
- [第一步：安装依赖](#第一步安装依赖)
- [第二步：配置 Nuxt 模块](#第二步配置-nuxt-模块)
- [第三步：配置 i18n](#第三步配置-i18n)
- [第四步：创建语言文件](#第四步创建语言文件)
- [第五步：实现语言切换组件](#第五步实现语言切换组件)
- [第六步：在页面中使用](#第六步在页面中使用)
- [配置说明](#配置说明)
- [常见问题](#常见问题)

---

## 前置要求

- Node.js 18+ 
- pnpm/npm/yarn 包管理器
- 已创建 Nuxt 4 项目

---

## 第一步：安装依赖

### 1.1 安装必要的包

在项目根目录执行以下命令安装所需的依赖：

```bash
# 使用 pnpm（推荐）
pnpm add @nuxt/ui @nuxtjs/i18n

# 或使用 npm
npm install @nuxt/ui @nuxtjs/i18n

# 或使用 yarn
yarn add @nuxt/ui @nuxtjs/i18n
```

### 1.2 依赖说明

- **@nuxt/ui**: Nuxt UI 组件库，提供丰富的 UI 组件（包括 USelect、UButton 等）
- **@nuxtjs/i18n**: Nuxt 的国际化模块，提供多语言支持

安装完成后，`package.json` 应该包含以下依赖：

```json
{
  "dependencies": {
    "@nuxt/ui": "^2.22.3",
    "@nuxtjs/i18n": "^10.2.1",
    "nuxt": "^4.2.2"
  }
}
```

---

## 第二步：配置 Nuxt 模块

### 2.1 在 `nuxt.config.ts` 中注册模块

打开项目根目录的 `nuxt.config.ts` 文件，在 `modules` 数组中添加 `@nuxt/ui` 和 `@nuxtjs/i18n`：

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  // 注册 Nuxt UI 和 i18n 模块
  modules: ["@nuxt/ui", "@nuxtjs/i18n"],
  
  // 其他配置...
})
```

### 2.2 完整配置示例

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  
  // 注册模块
  modules: ["@nuxt/ui", "@nuxtjs/i18n"],
  
  // i18n 配置（详见第三步）
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
})
```

---

## 第三步：配置 i18n

### 3.1 创建 i18n 配置文件

在项目根目录创建 `i18n.config.ts` 文件：

```typescript
// i18n.config.ts
import { defineI18nConfig } from "#i18n"

export default defineI18nConfig(() => ({
  legacy: false,        // 不使用 Vue I18n 的旧版 API
  locale: "zh",        // 默认语言
  fallbackLocale: "en", // 回退语言（当翻译缺失时使用）
}))
```

### 3.2 配置说明

- **legacy: false**: 使用 Vue I18n 的 Composition API（推荐）
- **locale**: 应用的默认语言代码
- **fallbackLocale**: 当当前语言缺少翻译时，回退到该语言

---

## 第四步：创建语言文件

### 4.1 创建语言文件目录结构

在 `app` 目录下创建 `locales` 文件夹，用于存放语言文件：

```
app/
  locales/
    zh.json  # 中文翻译
    en.json  # 英文翻译
```

### 4.2 创建中文语言文件

创建 `app/locales/zh.json`：

```json
{
  "nav": {
    "home": "首页",
    "about": "关于我们"
  },
  "footer": {
    "copyright": "© 2026 我的 Nuxt 4 项目 - 公共页脚"
  },
  "hero": {
    "title": "精美着陆页",
    "desc": "使用 Nuxt UI 与 Tailwind，快速构建现代、优雅的网页体验。",
    "ctaPrimary": "立即体验",
    "ctaDoc": "文档"
  },
  "features": {
    "title1": "组件丰富",
    "desc1": "内置按钮、卡片、图标等，随拿随用。",
    "title2": "性能优先",
    "desc2": "轻量、极速，开发与体验两不误。",
    "title3": "最佳实践",
    "desc3": "约定优于配置，快速上手不走弯路。"
  },
  "cta": {
    "title": "准备好开始了吗？",
    "desc": "几分钟内搭建你的新项目。",
    "btn": "开始构建"
  }
}
```

### 4.3 创建英文语言文件

创建 `app/locales/en.json`：

```json
{
  "nav": {
    "home": "Home",
    "about": "About"
  },
  "footer": {
    "copyright": "© 2026 My Nuxt 4 Project - Footer"
  },
  "hero": {
    "title": "Beautiful Landing Page",
    "desc": "Build modern, elegant web experiences with Nuxt UI and Tailwind.",
    "ctaPrimary": "Get Started",
    "ctaDoc": "Docs"
  },
  "features": {
    "title1": "Rich Components",
    "desc1": "Built-in buttons, cards, icons and more.",
    "title2": "Performance First",
    "desc2": "Lightweight and fast for dev and UX.",
    "title3": "Best Practices",
    "desc3": "Convention over configuration for quick start."
  },
  "cta": {
    "title": "Ready to begin?",
    "desc": "Spin up your new project in minutes.",
    "btn": "Start Building"
  }
}
```

### 4.4 语言文件结构说明

- 使用 JSON 格式存储翻译内容
- 支持嵌套结构（如 `nav.home`）
- 所有语言文件的结构应该保持一致
- 键名使用小写字母和点号分隔（如 `nav.home`）

---

## 第五步：实现语言切换组件

### 5.1 在 `app.vue` 中实现语言切换

打开 `app/app.vue` 文件，添加语言切换功能：

```vue
<script setup lang="ts">
// 定义 UI Locale 对象（用于 Nuxt UI 组件）
const uiLocales = {
  zh: {
    code: "zh",
    name: "中文",
    iso: "zh-CN",
  },
  en: {
    code: "en",
    name: "English",
    iso: "en-US",
  },
}

// 使用 i18n composable
const { locale, setLocale } = useI18n()

// 计算当前 UI Locale（传递给 UApp 组件）
const uiLocale = computed(() => {
  return uiLocales[locale.value as keyof typeof uiLocales] || uiLocales.en
})

// 语言选项列表（用于 USelect 组件）
const localeOptions = computed(() => {
  return Object.values(uiLocales).map((loc) => ({
    label: loc.name,
    value: loc.code,
  }))
})

// 当前选中的语言（双向绑定）
const currentLocale = computed({
  get: () => locale.value,
  set: (val: string) => {
    if (val === "zh" || val === "en") {
      setLocale(val)
    }
  },
})
</script>

<template>
  <!-- UApp 组件包裹整个应用，传递 locale 属性 -->
  <UApp :locale="uiLocale">
    <NuxtLayout>
      <!-- 语言切换器：固定在右上角 -->
      <div class="fixed top-4 right-4 z-50 flex items-center gap-2">
        <USelect
          v-model="currentLocale"
          :options="localeOptions"
          size="sm"
          class="w-32"
          placeholder="选择语言"
        />
      </div>
      
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
```

### 5.2 代码说明

#### 5.2.1 UI Locale 对象

```typescript
const uiLocales = {
  zh: { code: "zh", name: "中文", iso: "zh-CN" },
  en: { code: "en", name: "English", iso: "en-US" },
}
```

- **code**: 语言代码（与 i18n 配置中的 code 一致）
- **name**: 语言的显示名称
- **iso**: ISO 639-1 语言代码

#### 5.2.2 useI18n() Composable

```typescript
const { locale, setLocale } = useI18n()
```

- **locale**: 响应式的当前语言代码（ref）
- **setLocale**: 切换语言的函数

#### 5.2.3 UI Locale 计算属性

```typescript
const uiLocale = computed(() => {
  return uiLocales[locale.value as keyof typeof uiLocales] || uiLocales.en
})
```

根据当前 i18n 语言，返回对应的 UI Locale 对象，用于传递给 `UApp` 组件。

#### 5.2.4 语言选项列表

```typescript
const localeOptions = computed(() => {
  return Object.values(uiLocales).map((loc) => ({
    label: loc.name,  // 显示名称
    value: loc.code,  // 值（语言代码）
  }))
})
```

将 `uiLocales` 转换为 `USelect` 组件需要的格式。

#### 5.2.5 双向绑定的语言选择

```typescript
const currentLocale = computed({
  get: () => locale.value,
  set: (val: string) => {
    if (val === "zh" || val === "en") {
      setLocale(val)
    }
  },
})
```

实现双向绑定，当用户在下拉框中选择语言时，自动调用 `setLocale` 更新语言。

### 5.3 完整示例（包含主题切换）

```vue
<script setup lang="ts">
// 主题切换逻辑
const isDark = ref(false)
const applyTheme = (dark: boolean) => {
  const el = document.documentElement
  el.classList.toggle("dark", dark)
  localStorage.setItem("theme", dark ? "dark" : "light")
  isDark.value = dark
}
onMounted(() => {
  const saved = localStorage.getItem("theme")
  applyTheme(saved === "dark")
})
const toggleTheme = () => applyTheme(!isDark.value)

// 语言切换逻辑
const uiLocales = {
  zh: { code: "zh", name: "中文", iso: "zh-CN" },
  en: { code: "en", name: "English", iso: "en-US" },
}

const { locale, setLocale } = useI18n()
const uiLocale = computed(() => {
  return uiLocales[locale.value as keyof typeof uiLocales] || uiLocales.en
})

const localeOptions = computed(() => {
  return Object.values(uiLocales).map((loc) => ({
    label: loc.name,
    value: loc.code,
  }))
})

const currentLocale = computed({
  get: () => locale.value,
  set: (val: string) => {
    if (val === "zh" || val === "en") {
      setLocale(val)
    }
  },
})
</script>

<template>
  <UApp :locale="uiLocale">
    <NuxtLayout>
      <div class="fixed top-4 right-4 z-50 flex items-center gap-2">
        <!-- 语言切换器 -->
        <USelect
          v-model="currentLocale"
          :options="localeOptions"
          size="sm"
          class="w-32"
          placeholder="选择语言"
        />
        <!-- 主题切换按钮 -->
        <UButton
          :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
          :label="isDark ? '浅色' : '深色'"
          color="gray"
          variant="soft"
          size="sm"
          @click="toggleTheme"
        />
      </div>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
```

---

## 第六步：在页面中使用

### 6.1 使用 $t() 函数（Options API 风格）

在模板中使用 `$t()` 函数获取翻译：

```vue
<template>
  <div>
    <h1>{{ $t('hero.title') }}</h1>
    <p>{{ $t('hero.desc') }}</p>
    <UButton :label="$t('hero.ctaPrimary')" />
  </div>
</template>
```

### 6.2 使用 useI18n() Composable（Composition API 风格）

在 `<script setup>` 中使用：

```vue
<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div>
    <h1>{{ t('hero.title') }}</h1>
    <p>{{ t('hero.desc') }}</p>
    <UButton :label="t('hero.ctaPrimary')" />
  </div>
</template>
```

### 6.3 完整页面示例

```vue
<!-- app/pages/index.vue -->
<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="container mx-auto p-8">
    <h1 class="text-4xl font-bold mb-4">{{ t('hero.title') }}</h1>
    <p class="text-gray-600 mb-8">{{ t('hero.desc') }}</p>
    
    <div class="flex gap-4">
      <UButton :label="t('hero.ctaPrimary')" color="primary" />
      <UButton :label="t('hero.ctaDoc')" variant="outline" />
    </div>
    
    <nav class="mt-8">
      <NuxtLink to="/about">{{ t('nav.about') }}</NuxtLink>
    </nav>
  </div>
</template>
```

---

## 配置说明

### i18n 配置详解

在 `nuxt.config.ts` 中的 `i18n` 配置项：

```typescript
i18n: {
  // 支持的语言列表
  locales: [
    { code: "zh", iso: "zh-CN", name: "中文", file: "zh.json" },
    { code: "en", iso: "en-US", name: "English", file: "en.json" },
  ],
  
  // 默认语言
  defaultLocale: "zh",
  
  // 路由策略
  // - "prefix_except_default": 默认语言不加前缀，其他语言加前缀（如 /en/about）
  // - "prefix": 所有语言都加前缀
  // - "prefix_and_default": 所有语言都加前缀，包括默认语言
  strategy: "prefix_except_default",
  
  // 浏览器语言检测
  detectBrowserLanguage: {
    useCookie: true,        // 使用 Cookie 存储语言偏好
    cookieKey: "i18n_redirected", // Cookie 键名
    alwaysRedirect: false,   // 是否总是重定向
    fallbackLocale: "zh",    // 回退语言
  },
  
  // 语言文件目录（相对于 app 目录）
  langDir: "locales",
  
  // Vue I18n 配置文件路径
  vueI18n: "./i18n.config.ts",
}
```

### 路由策略说明

- **prefix_except_default**: 
  - 中文（默认）: `/`、`/about`
  - 英文: `/en`、`/en/about`
  
- **prefix**: 
  - 中文: `/zh`、`/zh/about`
  - 英文: `/en`、`/en/about`
  
- **prefix_and_default**: 
  - 中文: `/zh`、`/zh/about`（即使设置了 defaultLocale）
  - 英文: `/en`、`/en/about`

---

## 常见问题

### Q1: 为什么不能使用 `@nuxt/ui/locale` 导入？

**A**: `@nuxt/ui` 包在 v2.22.3 版本中不导出 `./locale` 子路径。解决方案是手动定义 `uiLocales` 对象。

### Q2: 语言切换后页面不更新？

**A**: 确保：
1. 使用了 `useI18n()` 的 `setLocale` 函数
2. 模板中使用了 `$t()` 或 `t()` 函数
3. 语言文件路径配置正确

### Q3: 如何添加更多语言？

**A**: 
1. 在 `nuxt.config.ts` 的 `locales` 数组中添加新语言配置
2. 在 `app/locales/` 目录下创建对应的 JSON 文件
3. 在 `app.vue` 的 `uiLocales` 对象中添加对应配置

示例（添加日语）：

```typescript
// nuxt.config.ts
locales: [
  { code: "zh", iso: "zh-CN", name: "中文", file: "zh.json" },
  { code: "en", iso: "en-US", name: "English", file: "en.json" },
  { code: "ja", iso: "ja-JP", name: "日本語", file: "ja.json" }, // 新增
],

// app.vue
const uiLocales = {
  zh: { code: "zh", name: "中文", iso: "zh-CN" },
  en: { code: "en", name: "English", iso: "en-US" },
  ja: { code: "ja", name: "日本語", iso: "ja-JP" }, // 新增
}
```

### Q4: 如何自定义语言切换器的样式？

**A**: 可以通过 `class` 属性或 Tailwind CSS 类来自定义：

```vue
<USelect
  v-model="currentLocale"
  :options="localeOptions"
  size="sm"
  class="w-32 custom-language-select"
  placeholder="选择语言"
/>
```

然后在 CSS 中定义样式：

```css
.custom-language-select {
  /* 自定义样式 */
}
```

### Q5: 语言切换后 URL 路径变化？

**A**: 这是正常的。根据 `strategy` 配置：
- `prefix_except_default`: 默认语言路径不变，其他语言会添加前缀
- `prefix`: 所有语言都会添加前缀

如果不想改变 URL，可以使用 `no_prefix` 策略（不推荐，SEO 不友好）。

### Q6: 如何在服务端获取当前语言？

**A**: 在服务端代码中也可以使用 `useI18n()`：

```typescript
// app/server/api/hello.ts
export default defineEventHandler((event) => {
  const { locale } = useI18n(event)
  return { message: `Current locale: ${locale.value}` }
})
```

---

## 总结

通过以上步骤，你已经成功实现了：

1. ✅ 安装和配置 Nuxt UI 和 i18n 模块
2. ✅ 创建多语言文件
3. ✅ 实现语言切换组件
4. ✅ 在页面中使用翻译

现在你的应用支持多语言切换，用户可以通过右上角的下拉框选择语言，所有使用 `$t()` 或 `t()` 的内容都会自动更新。

---

## 参考资源

- [Nuxt UI 官方文档](https://ui.nuxt.com/)
- [Nuxt i18n 模块文档](https://i18n.nuxtjs.org/)
- [Vue I18n 文档](https://vue-i18n.intlify.dev/)

---

**最后更新**: 2025-01-XX
**适用版本**: Nuxt 4.x, @nuxt/ui 2.x, @nuxtjs/i18n 10.x

