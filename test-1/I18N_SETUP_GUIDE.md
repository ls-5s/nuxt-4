# Nuxt 4 多语言配置完整指南

本文档详细说明如何在 Nuxt 4 项目中配置和使用多语言（i18n）功能，包括使用 Pinia store 管理语言状态，确保页面跳转时语言保持不变。

## 📋 目录

- [前置要求](#前置要求)
- [第一步：安装依赖](#第一步安装依赖)
- [第二步：配置 i18n 模块](#第二步配置-i18n-模块)
- [第三步：创建语言文件](#第三步创建语言文件)
- [第四步：创建 Pinia Store](#第四步创建-pinia-store)
- [第五步：创建路由中间件](#第五步创建路由中间件)
- [第六步：在组件中使用](#第六步在组件中使用)
- [第七步：实现语言切换](#第七步实现语言切换)
- [常见问题](#常见问题)
- [最佳实践](#最佳实践)

---

## 前置要求

- Node.js 18+
- 已创建 Nuxt 4 项目
- 已安装 `@pinia/nuxt` 模块
- 已安装 `pinia-plugin-persistedstate`（用于状态持久化）

---

## 第一步：安装依赖

### 1.1 安装 @nuxtjs/i18n

```bash
pnpm add @nuxtjs/i18n
```

### 1.2 验证安装

检查 `package.json` 中是否包含：

```json
{
  "dependencies": {
    "@nuxtjs/i18n": "^10.2.1"
  }
}
```

---

## 第二步：配置 i18n 模块

### 2.1 更新 nuxt.config.ts

在 `nuxt.config.ts` 中添加 i18n 配置：

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  // 模块配置
  modules: ["@nuxt/ui", "@pinia/nuxt", "@nuxtjs/i18n"],

  // i18n 配置
  i18n: {
    // 使用 no_prefix 策略，URL 不包含语言前缀
    // 语言状态由 store 和 cookie 管理，页面跳转时不会改变
    strategy: "no_prefix",
    
    // 支持的语言列表
    locales: [
      {
        code: "zh",
        iso: "zh-CN",
        name: "中文",
        file: "zh.ts",
      },
      {
        code: "en",
        iso: "en-US",
        name: "English",
        file: "en.ts",
      },
    ],
    
    // 语言文件目录（相对于项目根目录）
    langDir: "lang",
    
    // 默认语言
    defaultLocale: "zh",
    
    // Vue I18n 配置文件路径
    vueI18n: "./i18n.config.ts",
    
    // 浏览器语言检测配置
    detectBrowserLanguage: {
      useCookie: true,           // 使用 Cookie 存储语言偏好
      cookieKey: "i18n_redirected", // Cookie 键名
      alwaysRedirect: false,     // 不总是重定向（避免 URL 变化）
      fallbackLocale: "zh",      // 回退语言
    },
  },
})
```

### 2.2 创建 i18n.config.ts

在项目根目录创建 `i18n.config.ts`：

```typescript
// i18n.config.ts
import { defineI18nConfig } from '#imports'

export default defineI18nConfig(() => ({
  legacy: false,        // 不使用 Vue I18n 的 legacy 模式
  locale: 'zh',        // 默认语言
  fallbackLocale: 'zh', // 回退语言
}))
```

### 2.3 路由策略说明

**`strategy: "no_prefix"`** 的优势：
- ✅ URL 不包含语言前缀（如 `/about` 而不是 `/en/about`）
- ✅ 页面跳转时语言状态保持不变
- ✅ 语言状态由 Pinia store 和 Cookie 管理
- ✅ 更简洁的 URL 结构

**其他策略对比：**
- `prefix_except_default`: 默认语言无前缀，其他语言有前缀（如 `/en/about`）
- `prefix`: 所有语言都有前缀
- `prefix_and_default`: 所有语言都有前缀，包括默认语言

---

## 第三步：创建语言文件

### 3.1 目录结构

创建语言文件目录结构：

```
i18n/
└── lang/
    ├── zh.ts    # 中文翻译
    └── en.ts    # 英文翻译
```

### 3.2 中文语言文件 (i18n/lang/zh.ts)

```typescript
// i18n/lang/zh.ts
export default {
  index: {
    goToDemo: '跳转到 Demo',
    namePlaceholder: '请输入用户名',
    passwordPlaceholder: '请输入密码',
    login: '登录',
    getUserInfo: '获取用户信息',
    loginSuccess: '登录成功',
    loginFailed: '登录失败',
  },
  demo: {
    title: '欢迎使用 Nuxt 4 主题演示',
    backHome: '返回首页',
    description: '这是一个使用 Nuxt 4、TypeScript 和 Tailwind CSS 构建的规范化前端项目示例。',
    // ... 更多翻译
  },
}
```

### 3.3 英文语言文件 (i18n/lang/en.ts)

```typescript
// i18n/lang/en.ts
export default {
  index: {
    goToDemo: "Go to Demo",
    namePlaceholder: "Please enter username",
    passwordPlaceholder: "Please enter password",
    login: "Login",
    getUserInfo: "Get User Info",
    loginSuccess: "Login successful",
    loginFailed: "Login failed",
  },
  demo: {
    title: "Welcome to the Nuxt 4 Theme Demo",
    backHome: "Back to Home",
    description: "This is an example of a standardized front-end project built with Nuxt 4, TypeScript, and Tailwind CSS.",
    // ... 更多翻译
  },
}
```

### 3.4 语言文件组织建议

- 使用嵌套对象组织翻译键
- 按功能模块分组（如 `index`、`demo`、`common`）
- 保持中英文文件结构一致
- 使用有意义的键名（如 `loginSuccess` 而不是 `msg1`）

---

## 第四步：创建 Pinia Store

### 4.1 创建语言 Store (app/stores/locale.ts)

```typescript
// app/stores/locale.ts
import { defineStore } from "pinia";

export interface LocaleState {
  currentLocale: string;
  locales: Array<{
    code: string;
    iso: string;
    name: string;
    file: string;
  }>;
}

export const useLocaleStore = defineStore(
  "locale",
  () => {
    // 默认语言配置（与 nuxt.config.ts 中的配置保持一致）
    const defaultLocales = [
      {
        code: "zh",
        iso: "zh-CN",
        name: "中文",
        file: "zh.ts",
      },
      {
        code: "en",
        iso: "en-US",
        name: "English",
        file: "en.ts",
      },
    ];

    // 当前语言
    const currentLocale = ref<string>("zh");
    
    // 可用语言列表
    const locales = ref(defaultLocales);

    // 初始化语言（从 i18n 获取）
    const initLocale = () => {
      if (import.meta.server) return;

      try {
        const { locale } = useI18n();
        if (locale.value) {
          currentLocale.value = locale.value;
        }
      } catch (error) {
        console.warn("[Locale] Failed to init from i18n:", error);
      }
    };

    // 设置语言（同步到 i18n，但不改变 URL）
    const setLocale = async (localeCode: string) => {
      if (import.meta.server) return;

      try {
        const { setLocale: setI18nLocale } = useI18n();
        // 设置语言，no_prefix 策略下不会改变 URL
        await setI18nLocale(localeCode as "zh" | "en");
        currentLocale.value = localeCode;

        // 更新 HTML lang 属性
        if (document.documentElement) {
          const locale = locales.value.find((l) => l.code === localeCode);
          if (locale) {
            document.documentElement.setAttribute("lang", locale.iso);
          }
        }

        // 开发环境调试日志
        if (import.meta.dev) {
          console.log("[Locale] Changed to:", localeCode);
        }
      } catch (error) {
        console.error("[Locale] Failed to set locale:", error);
      }
    };

    // 获取当前语言信息
    const getCurrentLocaleInfo = () => {
      const found = locales.value.find((l) => l.code === currentLocale.value);
      return found || locales.value[0] || {
        code: "zh",
        iso: "zh-CN",
        name: "中文",
        file: "zh.ts",
      };
    };

    return {
      currentLocale,
      locales,
      initLocale,
      setLocale,
      getCurrentLocaleInfo,
    };
  },
  {
    persist: {
      key: "locale-store", // localStorage 键名
    },
  }
);
```

### 4.2 Store 功能说明

- **`currentLocale`**: 当前语言代码（响应式）
- **`locales`**: 可用语言列表（响应式）
- **`initLocale()`**: 从 i18n 初始化语言状态
- **`setLocale(localeCode)`**: 设置语言并同步到 i18n
- **`getCurrentLocaleInfo()`**: 获取当前语言的完整信息

### 4.3 状态持久化

使用 `pinia-plugin-persistedstate` 实现状态持久化：
- 语言选择保存到 `localStorage`
- 刷新页面后自动恢复
- 键名：`locale-store`

---

## 第五步：创建路由中间件

### 5.1 创建语言中间件 (app/middleware/locale.ts)

```typescript
// app/middleware/locale.ts
/**
 * 语言中间件
 * 确保页面跳转时语言状态保持不变
 */
export default defineNuxtRouteMiddleware((to, from) => {
  // 仅在客户端执行
  if (import.meta.server) return;

  try {
    const localeStore = useLocaleStore();
    const { locale, setLocale } = useI18n();

    // 如果 store 中的语言与 i18n 不一致，同步 i18n
    if (localeStore.currentLocale && localeStore.currentLocale !== locale.value) {
      // no_prefix 策略下不会改变 URL
      setLocale(localeStore.currentLocale);
    } else if (!localeStore.currentLocale && locale.value) {
      // 如果 store 中没有语言，从 i18n 初始化
      localeStore.currentLocale = locale.value;
    }
  } catch (error) {
    console.warn("[Locale Middleware] Failed to sync locale:", error);
  }
});
```

### 5.2 全局应用中间件

在 `nuxt.config.ts` 中配置全局中间件（可选）：

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  // ... 其他配置
  
  // 全局路由中间件（所有页面都会执行）
  router: {
    middleware: ['locale'], // 如果中间件文件名为 locale.ts
  },
})
```

或者在 `app.vue` 中初始化：

```typescript
// app.vue
onMounted(() => {
  if (import.meta.client) {
    const localeStore = useLocaleStore();
    localeStore.initLocale();
  }
});
```

---

## 第六步：在组件中使用

### 6.1 在模板中使用翻译

```vue
<template>
  <div>
    <!-- 使用 $t() 函数 -->
    <h1>{{ $t('index.title') }}</h1>
    <p>{{ $t('index.description') }}</p>
    
    <!-- 在属性中使用 -->
    <input :placeholder="$t('index.namePlaceholder')" />
    
    <!-- 在条件渲染中使用 -->
    <p v-if="showMessage">{{ $t('index.loginSuccess') }}</p>
  </div>
</template>
```

### 6.2 在脚本中使用翻译

```vue
<script setup lang="ts">
// 方式1：使用 useI18n()
const { t } = useI18n();
const message = t('index.loginSuccess');

// 方式2：使用 $t（仅在模板中可用）
// 在 setup 脚本中需要使用 useI18n()
</script>
```

### 6.3 完整示例

```vue
<template>
  <div>
    <button @click="login">
      {{ $t('index.login') }}
    </button>
    <p v-if="res && res.code === 200">
      {{ $t('index.loginSuccess') }}
    </p>
  </div>
</template>

<script setup lang="ts">
// 使用翻译函数
const { t } = useI18n();

const login = async () => {
  // ... 登录逻辑
  if (response.code === 200) {
    console.log(t('index.loginSuccess'));
  }
}
</script>
```

---

## 第七步：实现语言切换

### 7.1 在 Header 组件中实现

```vue
<template>
  <header>
    <!-- PC 端语言切换 -->
    <USelect
      v-model="currentLocale"
      :options="locales"
      option-attribute="name"
      value-attribute="code"
      icon="i-heroicons-language"
      color="gray"
      variant="outline"
      size="sm"
      class="hidden md:block"
    />

    <!-- 移动端语言切换下拉菜单 -->
    <UDropdown
      :items="languageMenuItems"
      :popper="{ placement: 'bottom-end' }"
      class="md:hidden"
    >
      <UButton
        icon="i-heroicons-language"
        color="gray"
        variant="ghost"
        size="sm"
        aria-label="切换语言"
      />
    </UDropdown>
  </header>
</template>

<script setup lang="ts">
// 导入语言切换功能（从 Pinia store）
const localeStore = useLocaleStore()

// 语言切换计算属性
const currentLocale = computed({
  get: () => localeStore.currentLocale,
  set: (value) => {
    localeStore.setLocale(value)
  },
})

// 可用语言列表
const locales = computed(() => localeStore.locales)

// 移动端语言菜单项
const languageMenuItems = computed(() => [
  locales.value.map((loc) => ({
    label: loc.name,
    click: () => {
      localeStore.setLocale(loc.code)
    },
    icon: 'i-heroicons-language',
  })),
])

// 初始化语言（仅在客户端）
onMounted(() => {
  if (import.meta.client) {
    localeStore.initLocale()
  }
})
</script>
```

### 7.2 在页面中实现

```vue
<template>
  <div class="relative">
    <!-- 语言切换按钮（右上角） -->
    <div class="absolute top-4 right-4">
      <USelect
        v-model="currentLocale"
        :options="locales"
        option-attribute="name"
        value-attribute="code"
        icon="i-heroicons-language"
        color="gray"
        variant="outline"
        size="sm"
      />
    </div>
    
    <!-- 页面内容 -->
    <div>
      {{ $t('index.title') }}
    </div>
  </div>
</template>

<script setup lang="ts">
// 导入语言切换功能（从 Pinia store）
const localeStore = useLocaleStore()

const currentLocale = computed({
  get: () => localeStore.currentLocale,
  set: (value) => {
    localeStore.setLocale(value)
  },
})

const locales = computed(() => localeStore.locales)

onMounted(() => {
  if (import.meta.client) {
    localeStore.initLocale()
  }
})
</script>
```

---

## 常见问题

### Q1: 页面跳转时语言改变了？

**A**: 确保：
1. 使用 `strategy: "no_prefix"` 策略
2. 创建并应用了语言中间件
3. Store 中正确初始化了语言状态

### Q2: TypeScript 报错找不到 `ref` 或 `useI18n`？

**A**: 
1. 运行 `pnpm nuxt prepare` 重新生成类型定义
2. 在 Nuxt 中，`ref` 和 `useI18n` 是自动导入的，通常不需要手动导入
3. 如果 IDE 仍报错，重启 TypeScript 服务器

### Q3: 翻译不生效？

**A**: 检查：
1. 语言文件路径是否正确（`i18n/lang/`）
2. `nuxt.config.ts` 中的 `langDir` 配置是否正确
3. 翻译键名是否与语言文件中的键名一致
4. 是否使用了 `$t()` 或 `t()` 函数

### Q4: 如何添加新语言？

**A**: 
1. 在 `nuxt.config.ts` 的 `locales` 数组中添加新语言配置
2. 在 `i18n/lang/` 目录下创建对应的语言文件（如 `ja.ts`）
3. 在 `locale.ts` store 的 `defaultLocales` 中添加新语言
4. 更新 `setLocale` 函数中的类型断言

示例（添加日语）：

```typescript
// nuxt.config.ts
locales: [
  // ... 现有语言
  {
    code: "ja",
    iso: "ja-JP",
    name: "日本語",
    file: "ja.ts",
  },
]

// app/stores/locale.ts
const defaultLocales = [
  // ... 现有语言
  {
    code: "ja",
    iso: "ja-JP",
    name: "日本語",
    file: "ja.ts",
  },
]

// 更新类型断言
await setI18nLocale(localeCode as "zh" | "en" | "ja");
```

### Q5: 语言切换后页面不更新？

**A**: 确保：
1. 使用了响应式的 `$t()` 函数
2. Store 中的 `setLocale` 正确调用了 i18n 的 `setLocale`
3. 组件使用了响应式的翻译键

---

## 最佳实践

### 1. 语言文件组织

- ✅ 按功能模块分组（`index`、`demo`、`common`）
- ✅ 使用嵌套对象组织翻译键
- ✅ 保持所有语言文件结构一致
- ✅ 使用有意义的键名

### 2. 状态管理

- ✅ 使用 Pinia store 统一管理语言状态
- ✅ 启用状态持久化（localStorage）
- ✅ 在路由中间件中同步语言状态
- ✅ 初始化时从 i18n 获取当前语言

### 3. 性能优化

- ✅ 使用 `no_prefix` 策略避免 URL 重定向
- ✅ 语言文件按需加载（Nuxt i18n 自动处理）
- ✅ 使用 Cookie 缓存语言偏好

### 4. 用户体验

- ✅ 页面跳转时保持语言状态
- ✅ 刷新页面后恢复用户选择的语言
- ✅ 提供清晰的语言切换 UI
- ✅ 支持响应式设计（PC 端和移动端）

### 5. 开发体验

- ✅ 使用 TypeScript 确保类型安全
- ✅ 添加开发环境调试日志
- ✅ 提供清晰的错误提示
- ✅ 文档化语言键名结构

---

## 完整文件结构

```
nuxt-4/test-1/
├── app/
│   ├── stores/
│   │   └── locale.ts          # 语言状态管理
│   ├── middleware/
│   │   └── locale.ts          # 语言路由中间件
│   ├── components/
│   │   └── layout/
│   │       └── Header.vue     # 包含语言切换的导航栏
│   └── pages/
│       └── index.vue          # 使用多语言的页面
├── i18n/
│   └── lang/
│       ├── zh.ts             # 中文翻译
│       └── en.ts             # 英文翻译
├── i18n.config.ts            # Vue I18n 配置
└── nuxt.config.ts             # Nuxt 配置（包含 i18n 配置）
```

---

## 总结

通过以上步骤，你已经成功实现了：

1. ✅ 安装和配置 `@nuxtjs/i18n` 模块
2. ✅ 创建语言文件（中文、英文）
3. ✅ 使用 Pinia store 管理语言状态
4. ✅ 创建路由中间件保持语言状态
5. ✅ 在组件中使用多语言
6. ✅ 实现语言切换功能
7. ✅ 确保页面跳转时语言保持不变

现在你的应用支持多语言切换，用户可以在任何页面切换语言，语言选择会持久化保存，页面跳转时语言状态保持不变。

---

## 参考资源

- [Nuxt i18n 官方文档](https://i18n.nuxtjs.org/)
- [Vue I18n 文档](https://vue-i18n.intlify.dev/)
- [Pinia 文档](https://pinia.vuejs.org/)
- [Nuxt 4 文档](https://nuxt.com/)

---

**最后更新**: 2025-01-28  
**适用版本**: Nuxt 4.x, @nuxtjs/i18n 10.x, Pinia 3.x
