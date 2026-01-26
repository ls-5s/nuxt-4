# Nuxt UI 主题切换功能实现指南

本文档详细说明如何在 Nuxt 4 项目中实现暗黑模式/浅色模式的主题切换功能，使用 Tailwind CSS 和 CSS 变量实现主题系统。

## 目录

- [前置要求](#前置要求)
- [第一步：配置 Tailwind CSS](#第一步配置-tailwind-css)
- [第二步：创建主题 CSS 变量](#第二步创建主题-css-变量)
- [第三步：实现主题切换逻辑](#第三步实现主题切换逻辑)
- [第四步：创建主题切换按钮](#第四步创建主题切换按钮)
- [第五步：在组件中使用主题](#第五步在组件中使用主题)
- [高级配置](#高级配置)
- [常见问题](#常见问题)

---

## 前置要求

- Node.js 18+
- pnpm/npm/yarn 包管理器
- 已创建 Nuxt 4 项目
- 已安装并配置 `@nuxt/ui` 模块
- 已安装 Tailwind CSS（Nuxt UI 会自动安装）

---

## 第一步：配置 Tailwind CSS

### 1.1 检查 Tailwind 配置

确保项目根目录有 `tailwind.config.ts` 文件。如果使用 Nuxt UI，该文件应该已经存在。

### 1.2 配置主题颜色映射

在 `tailwind.config.ts` 中配置品牌颜色，使用 CSS 变量实现主题切换：

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      // 主题颜色：将 CSS 变量映射为 Tailwind 的品牌色阶
      colors: {
        brand: {
          DEFAULT: "var(--color-brand-500)",
          50: "var(--color-brand-50)",
          100: "var(--color-brand-100)",
          200: "var(--color-brand-200)",
          300: "var(--color-brand-300)",
          400: "var(--color-brand-400)",
          500: "var(--color-brand-500)",
          600: "var(--color-brand-600)",
          700: "var(--color-brand-700)",
          800: "var(--color-brand-800)",
          900: "var(--color-brand-900)",
          950: "var(--color-brand-950)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
```

### 1.3 配置说明

- **colors.brand**: 定义品牌色系，使用 CSS 变量 `var(--color-brand-*)`
- **色阶**: 从 50（最浅）到 950（最深），提供完整的颜色梯度
- **DEFAULT**: 默认使用 `brand-500` 作为主色

---

## 第二步：创建主题 CSS 变量

### 2.1 创建主题 CSS 文件

在 `app/assets/css/` 目录下创建 `theme.css` 文件：

```css
/* app/assets/css/theme.css */

/* 浅色模式（默认） */
:root {
  --color-brand-primary: #3b82f6;
  --color-brand-secondary: #64748b;
  --text-size-hero: 4rem;
  
  /* 红色系色阶（浅色模式） */
  --color-brand-50: #fef2f2;
  --color-brand-100: #fee2e2;
  --color-brand-200: #fecaca;
  --color-brand-300: #fca5a5;
  --color-brand-400: #f87171;
  --color-brand-500: #ef4444;
  --color-brand-600: #dc2626;
  --color-brand-700: #b91c1c;
  --color-brand-800: #991b1b;
  --color-brand-900: #7f1d1d;
  --color-brand-950: #450a0a;
}

/* 深色模式 */
.dark {
  --color-brand-primary: #10b981; /* 主绿（适配深色背景） */
  --color-brand-secondary: #64748b; /* 辅助灰蓝（保持不变） */
  --text-size-hero: 4rem;
  
  /* 绿色系色阶（深色模式） */
  --color-brand-50: #f0fdf4;
  --color-brand-100: #dcfce7;
  --color-brand-200: #bbf7d0;
  --color-brand-300: #86efac;
  --color-brand-400: #4ade80;
  --color-brand-500: #22c55e; /* 标准主色 */
  --color-brand-600: #16a34a;
  --color-brand-700: #15803d;
  --color-brand-800: #166534;
  --color-brand-900: #14532d;
  --color-brand-950: #083321;
}
```

### 2.2 在全局 CSS 中引入主题文件

在 `app/assets/main.css` 中引入主题文件：

```css
/* app/assets/main.css */
@import "@/assets/css/theme.css";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 2.3 在 Nuxt 配置中引入全局 CSS

确保 `nuxt.config.ts` 中引入了全局 CSS：

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@nuxt/ui"],
  
  // 全局导入自定义 CSS
  css: ["./app/assets/main.css"],
  
  // 其他配置...
})
```

### 2.4 CSS 变量说明

#### 浅色模式（`:root`）

- 使用较深的颜色，确保在浅色背景上清晰可见
- 示例：红色系（`#ef4444`）在白色背景上对比度高

#### 深色模式（`.dark`）

- 使用较亮的颜色，确保在深色背景上清晰可见
- 示例：绿色系（`#22c55e`）在深色背景上对比度高

#### 变量命名规范

- `--color-brand-*`: 品牌色系变量
- `--color-brand-primary`: 主色（用于强调）
- `--color-brand-secondary`: 辅助色（用于次要元素）

---

## 第三步：实现主题切换逻辑

### 3.1 在 `app.vue` 中实现主题切换

在 `app/app.vue` 的 `<script setup>` 中添加主题切换逻辑：

```vue
<script setup lang="ts">
// 主题状态
const isDark = ref(false)

// 应用主题的函数
const applyTheme = (dark: boolean) => {
  const el = document.documentElement
  
  // 切换 dark 类名
  el.classList.toggle("dark", dark)
  
  // 保存到 localStorage
  localStorage.setItem("theme", dark ? "dark" : "light")
  
  // 更新状态
  isDark.value = dark
}

// 组件挂载时恢复主题
onMounted(() => {
  const saved = localStorage.getItem("theme")
  applyTheme(saved === "dark")
})

// 切换主题的函数
const toggleTheme = () => applyTheme(!isDark.value)
</script>
```

### 3.2 代码说明

#### 3.2.1 主题状态管理

```typescript
const isDark = ref(false)
```

- 使用 `ref` 创建响应式状态
- `false` 表示浅色模式，`true` 表示深色模式

#### 3.2.2 应用主题函数

```typescript
const applyTheme = (dark: boolean) => {
  const el = document.documentElement
  el.classList.toggle("dark", dark)
  localStorage.setItem("theme", dark ? "dark" : "light")
  isDark.value = dark
}
```

**功能说明：**
1. **获取根元素**: `document.documentElement` 是 `<html>` 元素
2. **切换类名**: 添加或移除 `dark` 类名
3. **持久化存储**: 保存到 `localStorage`，刷新页面后保持主题
4. **更新状态**: 同步更新响应式状态

#### 3.2.3 恢复主题

```typescript
onMounted(() => {
  const saved = localStorage.getItem("theme")
  applyTheme(saved === "dark")
})
```

- 在组件挂载时读取保存的主题
- 如果之前选择过深色模式，自动应用

#### 3.2.4 切换主题

```typescript
const toggleTheme = () => applyTheme(!isDark.value)
```

- 切换当前主题状态
- 调用 `applyTheme` 应用新主题

---

## 第四步：创建主题切换按钮

### 4.1 基础按钮实现

在 `app.vue` 的模板中添加主题切换按钮：

```vue
<template>
  <UApp>
    <NuxtLayout>
      <!-- 主题切换按钮 -->
      <div class="fixed top-4 right-4 z-50">
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

### 4.2 按钮说明

- **图标动态切换**: 
  - 深色模式显示太阳图标（`i-heroicons-sun`）
  - 浅色模式显示月亮图标（`i-heroicons-moon`）
- **标签动态切换**: 
  - 深色模式显示"浅色"（点击切换到浅色）
  - 浅色模式显示"深色"（点击切换到深色）
- **样式**: 使用 `gray` 颜色和 `soft` 变体，尺寸为 `sm`

### 4.3 完整示例（包含语言切换）

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

// 语言切换逻辑（可选）
// ... 语言切换代码 ...
</script>

<template>
  <UApp>
    <NuxtLayout>
      <div class="fixed top-4 right-4 z-50 flex items-center gap-2">
        <!-- 语言切换器（可选） -->
        <USelect
          v-model="currentLocale"
          :options="localeOptions"
          size="sm"
          class="w-32"
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

### 4.4 其他按钮样式示例

#### 仅图标按钮

```vue
<UButton
  :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
  color="gray"
  variant="ghost"
  size="sm"
  @click="toggleTheme"
  aria-label="切换主题"
/>
```

#### 圆形图标按钮

```vue
<UButton
  :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
  color="gray"
  variant="ghost"
  size="sm"
  class="rounded-full"
  @click="toggleTheme"
/>
```

---

## 第五步：在组件中使用主题

### 5.1 使用 Tailwind 的 dark: 前缀

在组件中使用 Tailwind 的暗黑模式类：

```vue
<template>
  <div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
    <h1 class="text-2xl font-bold">标题</h1>
    <p class="text-gray-600 dark:text-gray-400">内容</p>
  </div>
</template>
```

### 5.2 使用品牌颜色

使用配置好的品牌颜色变量：

```vue
<template>
  <div>
    <!-- 使用品牌色 -->
    <UButton label="主要按钮" color="brand" />
    
    <!-- 使用品牌色阶 -->
    <div class="bg-brand-500 text-white">品牌色背景</div>
    <div class="bg-brand-100 dark:bg-brand-800">自适应背景</div>
  </div>
</template>
```

### 5.3 使用 CSS 变量

在自定义样式中使用 CSS 变量：

```vue
<template>
  <div class="custom-box">自定义样式</div>
</template>

<style scoped>
.custom-box {
  background-color: var(--color-brand-primary);
  color: var(--color-brand-secondary);
  font-size: var(--text-size-hero);
}
</style>
```

### 5.4 完整组件示例

```vue
<template>
  <UCard class="bg-white dark:bg-gray-800">
    <template #header>
      <h2 class="text-xl font-bold text-gray-900 dark:text-white">
        主题示例卡片
      </h2>
    </template>
    
    <div class="space-y-4">
      <p class="text-gray-600 dark:text-gray-400">
        这个卡片会根据当前主题自动调整颜色。
      </p>
      
      <div class="flex gap-2">
        <UButton 
          label="主要按钮" 
          color="brand" 
        />
        <UButton 
          label="次要按钮" 
          variant="outline"
          class="border-brand-500 text-brand-500 dark:border-brand-400 dark:text-brand-400"
        />
      </div>
    </div>
  </UCard>
</template>
```

---

## 高级配置

### 6.1 支持系统主题偏好

检测并跟随系统主题偏好：

```vue
<script setup lang="ts">
const isDark = ref(false)

// 检测系统主题偏好
const getSystemTheme = () => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  return false
}

const applyTheme = (dark: boolean) => {
  const el = document.documentElement
  el.classList.toggle("dark", dark)
  localStorage.setItem("theme", dark ? "dark" : "light")
  isDark.value = dark
}

onMounted(() => {
  const saved = localStorage.getItem("theme")
  
  if (saved) {
    // 如果有保存的主题，使用保存的主题
    applyTheme(saved === "dark")
  } else {
    // 否则跟随系统主题
    applyTheme(getSystemTheme())
  }
  
  // 监听系统主题变化
  if (typeof window !== 'undefined') {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      // 只有在没有手动设置主题时才跟随系统
      if (!localStorage.getItem("theme")) {
        applyTheme(e.matches)
      }
    })
  }
})

const toggleTheme = () => applyTheme(!isDark.value)
</script>
```

### 6.2 使用 Composable 封装

创建可复用的主题切换 Composable：

```typescript
// app/composables/useTheme.ts
export const useTheme = () => {
  const isDark = ref(false)

  const applyTheme = (dark: boolean) => {
    const el = document.documentElement
    el.classList.toggle("dark", dark)
    localStorage.setItem("theme", dark ? "dark" : "light")
    isDark.value = dark
  }

  const toggleTheme = () => applyTheme(!isDark.value)

  onMounted(() => {
    const saved = localStorage.getItem("theme")
    applyTheme(saved === "dark")
  })

  return {
    isDark: readonly(isDark),
    toggleTheme,
    applyTheme,
  }
}
```

在 `app.vue` 中使用：

```vue
<script setup lang="ts">
const { isDark, toggleTheme } = useTheme()
</script>
```

### 6.3 多主题支持（浅色/深色/自动）

```vue
<script setup lang="ts">
type Theme = 'light' | 'dark' | 'auto'

const theme = ref<Theme>('auto')
const isDark = ref(false)

const getSystemTheme = () => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  return false
}

const applyTheme = (themeValue: Theme) => {
  let shouldBeDark = false
  
  if (themeValue === 'auto') {
    shouldBeDark = getSystemTheme()
  } else {
    shouldBeDark = themeValue === 'dark'
  }
  
  const el = document.documentElement
  el.classList.toggle("dark", shouldBeDark)
  localStorage.setItem("theme", themeValue)
  theme.value = themeValue
  isDark.value = shouldBeDark
}

onMounted(() => {
  const saved = (localStorage.getItem("theme") as Theme) || 'auto'
  applyTheme(saved)
})

const themeOptions = [
  { label: '浅色', value: 'light' },
  { label: '深色', value: 'dark' },
  { label: '自动', value: 'auto' },
]
</script>

<template>
  <USelect
    v-model="theme"
    :options="themeOptions"
    @update:model-value="applyTheme"
  />
</template>
```

### 6.4 动画过渡效果

为主题切换添加平滑过渡：

```css
/* app/assets/css/theme.css */
:root {
  /* ... 其他变量 ... */
  
  /* 过渡动画 */
  --transition-theme: background-color 0.3s ease, color 0.3s ease;
}

* {
  transition: var(--transition-theme);
}
```

---

## 常见问题

### Q1: 主题切换后页面闪烁？

**A**: 这是因为在 `onMounted` 中才读取主题，导致初始渲染时使用默认主题。解决方案：

```vue
<script setup lang="ts">
// 在服务端渲染前就设置主题
if (typeof window !== 'undefined') {
  const saved = localStorage.getItem("theme")
  if (saved === "dark") {
    document.documentElement.classList.add("dark")
  }
}

// 然后在 onMounted 中同步状态
onMounted(() => {
  isDark.value = document.documentElement.classList.contains("dark")
})
</script>
```

### Q2: 某些组件没有响应主题切换？

**A**: 确保：
1. 组件使用了 `dark:` 前缀的 Tailwind 类
2. 或者使用了 CSS 变量
3. 检查是否有内联样式覆盖了主题样式

### Q3: 如何自定义主题颜色？

**A**: 修改 `theme.css` 中的 CSS 变量：

```css
:root {
  --color-brand-500: #your-color; /* 浅色模式颜色 */
}

.dark {
  --color-brand-500: #your-dark-color; /* 深色模式颜色 */
}
```

### Q4: 主题切换按钮不显示？

**A**: 检查：
1. 是否正确引入了图标库（Nuxt UI 默认包含 Heroicons）
2. 按钮是否被其他元素遮挡（检查 `z-index`）
3. 控制台是否有错误信息

### Q5: 如何在不同页面使用不同的主题？

**A**: 可以在页面级别覆盖主题：

```vue
<script setup lang="ts">
// 在特定页面强制使用深色模式
onMounted(() => {
  document.documentElement.classList.add("dark")
})

onUnmounted(() => {
  // 离开页面时恢复全局主题
  const saved = localStorage.getItem("theme")
  if (saved !== "dark") {
    document.documentElement.classList.remove("dark")
  }
})
</script>
```

### Q6: 如何测试主题切换？

**A**: 
1. 点击主题切换按钮
2. 检查所有使用 `dark:` 前缀的元素是否正确切换
3. 刷新页面，确认主题被保存
4. 在不同浏览器中测试

### Q7: 主题切换影响性能吗？

**A**: 主题切换只是切换 CSS 类名和变量，性能影响极小。但如果使用了大量动画，可能需要优化过渡效果。

---

## 总结

通过以上步骤，你已经成功实现了：

1. ✅ 配置 Tailwind CSS 支持主题切换
2. ✅ 创建主题 CSS 变量系统
3. ✅ 实现主题切换逻辑
4. ✅ 创建主题切换按钮
5. ✅ 在组件中使用主题

现在你的应用支持暗黑模式/浅色模式切换，用户可以通过按钮切换主题，所有使用主题相关的样式都会自动适配。

---

## 参考资源

- [Tailwind CSS 暗黑模式文档](https://tailwindcss.com/docs/dark-mode)
- [Nuxt UI 官方文档](https://ui.nuxt.com/)
- [CSS 变量 (Custom Properties)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Heroicons 图标库](https://heroicons.com/)

---

**最后更新**: 2025-01-XX
**适用版本**: Nuxt 4.x, @nuxt/ui 2.x, Tailwind CSS 3.x

