# Nuxt 4 规范化项目

一个基于 Nuxt 4 的规范化前端项目模板，包含最佳实践和完整的开发工具链。

## 🚀 技术栈

- **框架**: Nuxt 4.3.0
- **UI 库**: Nuxt UI 2.22.3
- **状态管理**: Pinia 3.0.4
- **国际化**: @nuxtjs/i18n 10.2.1
- **样式**: Tailwind CSS 3.4.19
- **类型检查**: TypeScript (严格模式)
- **代码规范**: ESLint + Prettier

## 📁 项目结构

```
my-nuxt-app/
├── app/                    # 应用源代码目录
│   ├── assets/            # 静态资源（CSS、图片等）
│   │   └── css/           # 样式文件
│   ├── components/        # Vue 组件（自动导入）
│   ├── composables/       # 组合式函数（自动导入）
│   ├── constants/         # 常量定义
│   ├── layouts/           # 布局组件
│   ├── middleware/        # 路由中间件
│   ├── pages/             # 页面路由（文件系统路由）
│   ├── plugins/            # 插件
│   ├── stores/            # Pinia 状态管理
│   ├── types/             # TypeScript 类型定义
│   ├── utils/             # 工具函数
│   ├── app.vue            # 根组件
│   └── error.vue          # 错误页面
├── locales/               # 国际化语言文件
├── public/                # 公共静态资源
├── server/                # 服务端代码
│   └── api/               # API 路由
├── .eslintrc.cjs          # ESLint 配置
├── .prettierrc            # Prettier 配置
├── .editorconfig          # EditorConfig 配置
├── i18n.config.ts         # i18n 配置
├── nuxt.config.ts         # Nuxt 配置
├── tailwind.config.ts     # Tailwind 配置
└── tsconfig.json          # TypeScript 配置
```

## 🛠️ 开发指南

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

应用将在 `http://localhost:3000` 启动（如果端口被占用会自动切换到其他端口）。

### 构建生产版本

```bash
pnpm build
```

### 预览生产构建

```bash
pnpm preview
```

### 代码检查

```bash
# 检查代码规范
pnpm lint

# 自动修复代码规范问题
pnpm lint:fix
```

### 代码格式化

```bash
# 格式化代码
pnpm format

# 检查代码格式
pnpm format:check
```

### 类型检查

```bash
pnpm typecheck
```

## 📝 代码规范

### 组件命名

- 组件文件使用 PascalCase：`MyComponent.vue`
- 组件目录使用 kebab-case：`my-component/`

### 文件命名

- 工具函数：`camelCase.ts`
- 常量文件：`UPPER_SNAKE_CASE.ts` 或 `index.ts`
- 类型定义：`PascalCase.ts` 或 `index.ts`

### 目录结构规范

- `components/`: 可复用的 Vue 组件
- `composables/`: 组合式函数（自动导入）
- `utils/`: 纯函数工具（需要手动导入）
- `constants/`: 常量定义
- `types/`: TypeScript 类型定义

## 🌍 国际化

项目支持多语言，默认语言为中文。

### 添加新语言

1. 在 `locales/` 目录下创建新的语言文件，如 `ja.json`
2. 在 `nuxt.config.ts` 的 `i18n.locales` 中添加配置：

```typescript
{ code: "ja", iso: "ja-JP", name: "日本語", file: "ja.json" }
```

### 使用翻译

在组件中使用 `$t()` 或 `t()`：

```vue
<template>
  <div>{{ $t('nav.home') }}</div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const title = t('nav.home')
</script>
```

## 🎨 样式规范

- 使用 Tailwind CSS 进行样式开发
- 自定义样式放在 `app/assets/css/` 目录
- 遵循 Tailwind 的实用类优先原则

## 🔧 状态管理

使用 Pinia 进行状态管理，store 文件放在 `app/stores/` 目录。

### 创建 Store

```typescript
// app/stores/user.ts
export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    email: '',
  }),
  actions: {
    setUser(user: UserInfo) {
      this.name = user.name
      this.email = user.email
    },
  },
})
```

## 📦 组件自动导入

Nuxt 会自动导入 `components/` 和 `composables/` 目录下的文件，无需手动导入。

## 🚦 路由中间件

在 `app/middleware/` 目录下创建中间件文件，可在页面中使用：

```vue
<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
</script>
```

## 📚 类型定义

全局类型定义在 `app/types/index.ts`，可在整个项目中使用。

## 🔐 环境变量

创建 `.env` 文件（不要提交到 Git）：

```env
NUXT_PUBLIC_API_BASE=http://localhost:3000/api
```

在代码中通过 `useRuntimeConfig()` 访问。

## 📄 许可证

MIT

## 👥 贡献

欢迎提交 Issue 和 Pull Request！
