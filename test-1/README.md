# Nuxt 4 Theme Demo

一个使用 Nuxt 4、TypeScript 和 Tailwind CSS 构建的规范化前端项目，包含完整的主题系统和组件库。

## ✨ 特性

- 🎨 **主题切换**：支持浅色/深色/系统主题模式
- 🌈 **颜色方案**：5 种颜色方案（蓝色、绿色、紫色、红色、橙色）
- 🧩 **组件化**：封装的按钮组件，支持多种变体和状态
- 📝 **TypeScript**：完整的类型定义和类型安全
- 🎯 **规范化**：ESLint、Prettier、EditorConfig 配置
- 🎨 **Tailwind CSS**：使用 Tailwind CSS 进行样式管理

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000)

### 构建

```bash
pnpm build
```

### 预览

```bash
pnpm preview
```

## 📁 项目结构

```
test-1/
├── app/
│   ├── assets/
│   │   └── css/
│   │       ├── main.css          # 主样式文件
│   │       └── theme.css          # 主题变量定义
│   ├── components/
│   │   ├── Button.vue            # 按钮组件
│   │   ├── ThemeSwitcher.vue     # 主题切换组件
│   │   └── ColorSchemeSwitcher.vue # 颜色方案切换组件
│   ├── composables/
│   │   └── useTheme.ts           # 主题 Composable
│   ├── layouts/
│   │   └── default.vue           # 默认布局
│   ├── pages/
│   │   └── index.vue             # 首页/Demo 页面
│   ├── stores/
│   │   ├── theme.ts              # 主题 Store
│   │   └── index.ts              # Store 入口
│   ├── types/
│   │   └── Button.ts             # 按钮类型定义
│   └── app.vue                   # 应用入口
├── .eslintrc.cjs                 # ESLint 配置
├── .prettierrc                   # Prettier 配置
├── .editorconfig                 # EditorConfig 配置
├── nuxt.config.ts                # Nuxt 配置
├── tailwind.config.ts            # Tailwind 配置
└── tsconfig.json                 # TypeScript 配置
```

## 🎨 主题系统

### 主题模式

- **light**：浅色模式
- **dark**：深色模式
- **system**：跟随系统设置

### 颜色方案

- **blue**：蓝色（默认）
- **green**：绿色
- **purple**：紫色
- **red**：红色
- **orange**：橙色

### 使用主题

```vue
<script setup lang="ts">
import { useTheme } from "~/composables/useTheme";

const { mode, colorScheme, isDark, toggleTheme, setColorScheme } = useTheme();
</script>
```

## 🧩 按钮组件

### 基本用法

```vue
<template>
  <Button>点击我</Button>
</template>
```

### Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| size | `xs \| sm \| md \| lg \| xl` | `md` | 按钮尺寸 |
| variant | `solid \| outline \| ghost \| soft \| link` | `solid` | 按钮变体 |
| intent | `primary \| secondary \| success \| warning \| danger \| neutral` | `primary` | 按钮意图/颜色 |
| disabled | `boolean` | `false` | 是否禁用 |
| loading | `boolean` | `false` | 是否加载中 |
| fullWidth | `boolean` | `false` | 是否全宽 |
| icon | `string` | - | 左侧图标类名 |
| iconRight | `string` | - | 右侧图标类名 |
| to | `string` | - | Nuxt 路由链接 |
| href | `string` | - | 外部链接 |

### 示例

```vue
<template>
  <!-- 不同尺寸 -->
  <Button size="sm">小按钮</Button>
  <Button size="md">中按钮</Button>
  <Button size="lg">大按钮</Button>

  <!-- 不同变体 -->
  <Button variant="solid">实心</Button>
  <Button variant="outline">轮廓</Button>
  <Button variant="ghost">幽灵</Button>

  <!-- 不同颜色 -->
  <Button intent="primary">主要</Button>
  <Button intent="success">成功</Button>
  <Button intent="danger">危险</Button>

  <!-- 状态 -->
  <Button loading>加载中</Button>
  <Button disabled>禁用</Button>
  <Button full-width>全宽</Button>
</template>
```

## 🛠️ 代码规范

项目使用以下工具确保代码质量：

- **ESLint**：代码检查
- **Prettier**：代码格式化
- **TypeScript**：类型检查
- **EditorConfig**：编辑器配置

### 运行检查

```bash
# ESLint 检查
pnpm lint

# ESLint 自动修复
pnpm lint:fix

# Prettier 格式化
pnpm format

# Prettier 检查
pnpm format:check

# TypeScript 类型检查
pnpm typecheck
```

## 📝 开发规范

1. **组件命名**：使用 PascalCase（如 `Button.vue`）
2. **文件命名**：使用 kebab-case（如 `use-theme.ts`）
3. **类型定义**：在 `types/` 目录下定义类型
4. **Composables**：在 `composables/` 目录下创建可复用逻辑
5. **样式**：优先使用 Tailwind CSS 工具类

## 📄 许可证

MIT
