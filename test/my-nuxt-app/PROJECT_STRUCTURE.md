# 项目结构说明

本文档详细说明了项目的目录结构和各文件的用途。

## 📂 目录结构

```
my-nuxt-app/
├── .vscode/                    # VS Code 配置
│   ├── settings.json           # 编辑器设置（格式化、ESLint 等）
│   └── extensions.json         # 推荐扩展
├── app/                        # 应用源代码（Nuxt 约定目录）
│   ├── assets/                # 静态资源
│   │   └── css/              # 样式文件
│   │       ├── main.css      # 主样式文件（导入 Tailwind）
│   │       └── theme.css     # 主题变量定义
│   ├── components/           # Vue 组件（自动导入）
│   │   ├── demo/            # 示例组件目录
│   │   └── index.ts         # 组件导出索引
│   ├── composables/         # 组合式函数（自动导入）
│   ├── constants/           # 常量定义
│   │   └── index.ts         # 常量导出
│   ├── layouts/             # 布局组件
│   │   ├── default.vue      # 默认布局
│   │   └── custom.vue       # 自定义布局
│   ├── middleware/          # 路由中间件
│   │   └── auth.ts          # 认证中间件示例
│   ├── pages/               # 页面路由（文件系统路由）
│   ├── plugins/             # 插件（启动时执行）
│   ├── stores/              # Pinia 状态管理
│   │   ├── app.ts           # 应用状态
│   │   ├── user.ts          # 用户状态
│   │   └── index.ts         # Store 导出
│   ├── types/               # TypeScript 类型定义
│   │   └── index.ts         # 全局类型
│   ├── utils/               # 工具函数
│   │   └── index.ts         # 工具函数导出
│   ├── app.vue              # 根组件
│   └── error.vue            # 错误页面
├── locales/                  # 国际化语言文件
│   ├── zh.json              # 中文翻译
│   └── en.json              # 英文翻译
├── public/                   # 公共静态资源（直接访问）
│   ├── favicon.ico          # 网站图标
│   └── robots.txt           # 搜索引擎配置
├── server/                   # 服务端代码
│   ├── api/                 # API 路由
│   │   └── user/            # 用户相关 API
│   │       └── login.ts     # 登录接口
│   └── error.ts             # 服务端错误处理
├── .editorconfig            # 编辑器配置
├── .eslintrc.cjs            # ESLint 配置
├── .gitignore               # Git 忽略文件
├── .prettierrc              # Prettier 配置
├── .prettierignore          # Prettier 忽略文件
├── i18n.config.ts          # i18n 配置文件
├── nuxt.config.ts           # Nuxt 配置文件
├── package.json             # 项目依赖和脚本
├── README.md                # 项目说明文档
├── tailwind.config.ts       # Tailwind CSS 配置
└── tsconfig.json            # TypeScript 配置
```

## 📝 文件说明

### 配置文件

- **nuxt.config.ts**: Nuxt 核心配置文件，包含模块、路由、构建等配置
- **tsconfig.json**: TypeScript 编译配置
- **tailwind.config.ts**: Tailwind CSS 主题和插件配置
- **i18n.config.ts**: 国际化配置
- **.eslintrc.cjs**: ESLint 代码检查规则
- **.prettierrc**: Prettier 代码格式化规则
- **.editorconfig**: 编辑器统一配置

### 源代码目录

#### `app/assets/`
存放静态资源文件，如 CSS、图片等。这些文件会被 Nuxt 处理并优化。

#### `app/components/`
Vue 组件目录，Nuxt 会自动导入这些组件，无需手动 import。

**命名规范**:
- 组件文件使用 PascalCase: `MyComponent.vue`
- 组件目录使用 kebab-case: `my-component/`

#### `app/composables/`
组合式函数目录，Nuxt 会自动导入，可在任何组件中使用。

**示例**:
```typescript
// app/composables/useCounter.ts
export const useCounter = () => {
  const count = ref(0)
  const increment = () => count.value++
  return { count, increment }
}
```

#### `app/utils/`
纯函数工具目录，需要手动导入使用。

**与 composables 的区别**:
- `utils/`: 纯函数，无响应式，需要手动导入
- `composables/`: 可能包含响应式逻辑，自动导入

#### `app/constants/`
常量定义目录，存放应用中使用的常量。

#### `app/types/`
TypeScript 类型定义，全局类型放在 `index.ts` 中。

#### `app/stores/`
Pinia 状态管理目录，每个 store 文件定义一个 store。

#### `app/pages/`
页面路由目录，基于文件系统的路由。

**路由规则**:
- `index.vue` → `/`
- `about.vue` → `/about`
- `user/[id].vue` → `/user/:id`
- `demo/index.vue` → `/demo`

#### `app/layouts/`
布局组件目录，用于定义页面布局。

**使用方式**:
```vue
<script setup lang="ts">
definePageMeta({
  layout: 'custom'
})
</script>
```

#### `app/middleware/`
路由中间件目录，用于在路由跳转前执行逻辑。

**使用方式**:
```vue
<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
</script>
```

### 国际化

#### `locales/`
语言文件目录，每个语言一个 JSON 文件。

**使用方式**:
```vue
<template>
  <div>{{ $t('nav.home') }}</div>
</template>
```

### 服务端

#### `server/api/`
API 路由目录，每个文件定义一个 API 端点。

**示例**:
```typescript
// server/api/user/login.ts
export default defineEventHandler(async (event) => {
  // 处理登录逻辑
  return { success: true }
})
```

访问路径: `http://localhost:3000/api/user/login`

## 🔧 开发规范

### 代码组织

1. **组件**: 放在 `app/components/`，按功能分组
2. **工具函数**: 放在 `app/utils/`，按模块分类
3. **组合式函数**: 放在 `app/composables/`，以 `use` 开头
4. **类型定义**: 放在 `app/types/`，全局类型在 `index.ts`
5. **常量**: 放在 `app/constants/`，统一导出

### 命名规范

- **组件**: PascalCase (`MyComponent.vue`)
- **组合式函数**: camelCase，以 `use` 开头 (`useCounter.ts`)
- **工具函数**: camelCase (`formatDate.ts`)
- **常量**: UPPER_SNAKE_CASE (`API_ENDPOINTS`)
- **类型**: PascalCase (`UserInfo`)

### 导入规范

- 自动导入: `components/`, `composables/` 目录下的文件
- 手动导入: `utils/`, `constants/`, `types/` 目录下的文件

## 📚 更多信息

详细的使用说明请参考 [README.md](./README.md)。
