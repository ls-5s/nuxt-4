# 项目结构说明

## 📁 目录结构

```
test-1/
├── app/                          # 应用主目录
│   ├── assets/                   # 静态资源
│   │   └── css/                  # 样式文件
│   │       ├── main.css          # 主样式（导入 Tailwind）
│   │       └── theme.css         # 主题变量定义
│   ├── components/               # 组件目录（自动导入）
│   │   ├── Button.vue            # 按钮组件
│   │   ├── ThemeSwitcher.vue     # 主题切换组件
│   │   └── ColorSchemeSwitcher.vue # 颜色方案切换组件
│   ├── composables/              # 组合式函数（自动导入）
│   │   └── useTheme.ts           # 主题相关 Composable
│   ├── layouts/                  # 布局文件
│   │   └── default.vue           # 默认布局
│   ├── pages/                    # 页面（文件路由）
│   │   └── index.vue             # 首页/Demo 页面
│   ├── plugins/                  # 插件
│   │   └── pinia.client.ts      # Pinia 持久化插件
│   ├── stores/                   # Pinia Store
│   │   └── theme.ts              # 主题 Store
│   ├── types/                    # TypeScript 类型定义
│   │   └── Button.ts             # 按钮组件类型
│   └── app.vue                   # 应用根组件
├── public/                       # 公共静态文件
│   └── favicon.ico               # 网站图标
├── .editorconfig                 # 编辑器配置
├── .eslintrc.cjs                 # ESLint 配置
├── .gitignore                    # Git 忽略文件
├── .prettierignore               # Prettier 忽略文件
├── .prettierrc                   # Prettier 配置
├── .vscode/                      # VS Code 配置
│   └── extensions.json           # 推荐扩展
├── nuxt.config.ts                # Nuxt 配置文件
├── package.json                  # 项目依赖
├── README.md                     # 项目说明
├── tailwind.config.ts            # Tailwind CSS 配置
└── tsconfig.json                 # TypeScript 配置
```

## 🎯 核心功能模块

### 1. 主题系统 (`app/stores/theme.ts`)

- **主题模式**：light（浅色）、dark（深色）、system（系统）
- **颜色方案**：blue、green、purple、red、orange
- **持久化**：使用 Pinia PersistedState 保存用户选择

### 2. 按钮组件 (`app/components/Button.vue`)

- **尺寸**：xs、sm、md、lg、xl
- **变体**：solid、outline、ghost、soft、link
- **意图**：primary、secondary、success、warning、danger、neutral
- **状态**：disabled、loading、fullWidth

### 3. 主题切换组件

- **ThemeSwitcher**：切换主题模式（浅色/深色/系统）
- **ColorSchemeSwitcher**：切换颜色方案

## 🔧 技术栈

- **框架**：Nuxt 4
- **语言**：TypeScript
- **样式**：Tailwind CSS
- **状态管理**：Pinia + Pinia PersistedState
- **代码规范**：ESLint + Prettier + EditorConfig

## 📝 开发规范

1. **组件命名**：PascalCase（如 `Button.vue`）
2. **文件命名**：kebab-case（如 `use-theme.ts`）
3. **类型定义**：统一放在 `types/` 目录
4. **Composables**：可复用逻辑放在 `composables/` 目录
5. **样式**：优先使用 Tailwind CSS 工具类

## 🚀 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 代码检查
pnpm lint

# 代码格式化
pnpm format

# 类型检查
pnpm typecheck
```
