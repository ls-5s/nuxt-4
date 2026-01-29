### 一、完整使用流程（开发阶段：Nuxt4 + TailwindCSS + Pinia + Server）
核心是通过 `find-skills` 安装目标 Skill 后，用**精准自然语言指令**让 AI 辅助开发全流程，以下是可直接落地的步骤：

#### 步骤1：安装目标 Skill（调用 `find-skills`）
先调用榜单第4名的 `find-skills`（vercel-labs/skills），安装核心 Skill，复制以下指令直接执行：
```
用 find-skills 搜索并安装：
1. nuxt-best-practices（出品方 nuxt-labs/agent-skills）
2. nuxt-vercel-best-practices（出品方 nuxt-labs/agent-skills）
3. tailwindcss-best-practices（出品方 vercel-labs/agent-skills）
```
✅ 执行结果：AI 会返回 Skill 安装成功的提示，并关联到你的 AI 助手/IDE 插件中。

#### 步骤2：用 Skill 初始化 Nuxt4 项目（一键生成规范模板）
复制以下指令调用 `nuxt-best-practices`，AI 会生成**开箱即用的项目代码**（含 TailwindCSS/Pinia/Server 配置）：
```
帮我生成一个 Nuxt4 Beta 项目，要求：
1. 基础配置：Vue3.4+、TypeScript、Vite 构建；
2. 集成技术：TailwindCSS 3（开启 JIT 模式）、Pinia（状态管理）；
3. Server 端：适配 Nuxt4 新 `server/` 目录，包含 API 示例、Edge Functions 模板；
4. 规范要求：符合 Nuxt 官方最佳实践，组件拆分、Composables 分层、TS 类型全覆盖；
5. 优化项：TailwindCSS 打包体积优化、Pinia 服务端/客户端状态同步、Server API 错误处理。
```
✅ AI 返回结果：
- 完整的项目目录结构（含 `nuxt.config.ts`/`tailwind.config.ts`/`stores/`/`server/`）；
- 关键文件代码（如下），直接复制到本地即可初始化项目。

##### 生成的核心配置文件示例（可直接复用）：
```ts
// nuxt.config.ts（Nuxt4 + Tailwind + Pinia 核心配置）
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss', // Tailwind 集成
    '@pinia/nuxt' // Pinia 集成（Nuxt4 内置适配）
  ],
  tailwindcss: {
    jit: true, // 开启 JIT 模式（Nuxt4 + Vite 最优）
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.ts'
  },
  nitro: { // Nuxt4 Server 端核心（Nitro 引擎）
    preset: 'vercel-edge', // 适配 Vercel Edge Functions
    routeRules: {
      '/api/**': { cors: true, cache: 'no-cache' } // Server API 配置
    }
  },
  typescript: {
    strict: true, // TS 严格模式（最佳实践）
    typeCheck: true
  }
})

// tailwind.config.ts（优化配置）
export default {
  content: [
    './components/**/*.{vue,ts}',
    './pages/**/*.{vue,ts}',
    './app/**/*.{vue,ts}',
    './layouts/**/*.{vue,ts}'
  ],
  theme: {
    extend: {},
  },
  plugins: []
}

// stores/counter.ts（Pinia TS 规范示例）
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  actions: {
    increment() {
      this.count++
    }
  },
  persist: true // 可选：状态持久化（Nuxt4 适配）
})

// server/api/hello.ts（Server API 示例）
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  // 错误处理（最佳实践）
  if (!query.name) {
    throw createError({ statusCode: 400, statusMessage: 'Name is required' })
  }
  return {
    message: `Hello ${query.name}! (Nuxt4 Server API)`
  }
})
```

#### 步骤3：开发阶段用 Skill 优化代码（针对性调优）
根据开发中的痛点，调用对应 Skill 优化，以下是高频场景的指令：
##### 场景1：优化 TailwindCSS 样式（调用 `tailwindcss-best-practices`）
```
帮我优化 Nuxt4 中 TailwindCSS 的使用：
1. 提取重复样式为自定义工具类（如 btn-primary、card-container）；
2. 关闭冗余的 PurgeCSS 配置（Nuxt4 + Vite JIT 模式无需手动配置）；
3. 适配 Nuxt4 Server Components 的样式隔离。
```

##### 场景2：优化 Pinia 状态管理（调用 `nuxt-best-practices`）
```
帮我检查并优化 Nuxt4 中 Pinia 的使用：
1. 确保 TS 类型全覆盖（State/Action/Getter）；
2. 解决服务端/客户端 hydration 不匹配问题；
3. 优化 Composables 中调用 Pinia 的逻辑（避免重复创建 store）。
```

##### 场景3：优化 Server 端（调用 `nuxt-vercel-best-practices`）
```
帮我优化 Nuxt4 Server 端：
1. server/api 接口的性能（添加缓存、限流）；
2. Edge Functions 适配 Vercel 部署（避免 Node.js 内置模块依赖）；
3. 实现 Server 端获取数据后传递到 Pinia 状态（客户端复用）。
```

### 二、完整部署流程（部署到 Vercel：Nuxt4 + Server 适配）
#### 步骤1：部署前用 Skill 生成 Vercel 配置（关键）
调用 `nuxt-vercel-best-practices` 生成适配 Nuxt4 的部署配置，复制指令执行：
```
帮我生成 Nuxt4 部署到 Vercel 的最佳配置：
1. 生成 vercel.json（适配 Nuxt4 Nitro 引擎、Edge Functions）；
2. 优化构建脚本（避免 Nuxt4 Beta 构建失败）；
3. 配置环境变量（区分开发/生产/预览环境）；
4. 给出部署命令和注意事项。
```
✅ 生成的 `vercel.json` 示例：
```json
{
  "version": 2,
  "builds": [
    {
      "src": "nuxt.config.ts",
      "use": "@vercel/node-bridge",
      "config": { "runtime": "nodejs20.x" }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/.output/server/index.mjs"
    }
  ],
  "env": {
    "NUXT_NODE_ENV": "production",
    "NUXT_VERCEL_ENV": "@vercel/env"
  }
}
```

#### 步骤2：本地验证部署配置
在项目根目录执行以下命令，验证 Nuxt4 构建是否正常：
```bash
# 安装 Vercel CLI
npm i -g vercel
# 本地构建（模拟 Vercel 部署）
nuxt build
# 本地预览构建产物
nuxt preview
```
✅ 验证通过：本地访问 `http://localhost:3000`，能正常访问页面、调用 `server/api/hello` 接口。

#### 步骤3：部署到 Vercel（两种方式）
##### 方式1：Vercel CLI 部署（快速测试）
```bash
# 登录 Vercel（首次需要扫码/授权）
vercel login
# 部署到 Vercel（选择项目、环境）
vercel deploy --prod
```

##### 方式2：Git 集成部署（生产环境推荐）
1. 将项目推送到 GitHub/GitLab/Gitee；
2. 打开 Vercel 官网 → 新建项目 → 导入该仓库；
3. 配置构建参数（Skill 已生成，直接用默认值）：
   - Framework Preset：Nuxt.js
   - Build Command：`nuxt build`
   - Output Directory：`.output`
4. 点击「Deploy」，等待部署完成。

#### 步骤4：部署后用 Skill 排查问题（高频踩坑）
若部署后出现「构建失败、Server API 404、Edge Functions 报错」，调用 `nuxt-vercel-best-practices` 排查：
```
我的 Nuxt4 项目部署到 Vercel 后出现以下问题：
1. server/api/hello 接口返回 404；
2. Edge Functions 提示 "Cannot use import statement outside a module"；
帮我排查并给出修复方案。
```
✅ AI 会返回针对性修复方案（如调整 `vercel.json` 路由、修改 Edge Functions 代码为 ESM 规范）。

### 三、关键注意事项（Nuxt4 Beta 专属）
1. **Skill 适配关键点**：所有指令必须加「Nuxt4 Beta」关键词，AI 会自动避开 Nuxt3 旧 API（如 `pages/` 路由），适配 Nuxt4 新 `app/` 路由、`server/` 目录；
2. **Nuxt4 Beta 坑点**：
   - 避免使用 Node.js 内置模块（如 `fs`/`path`）在 Edge Functions 中（Vercel Edge 环境不支持）；
   - Pinia 持久化需用 `@pinia-plugin-persistedstate/nuxt`（Nuxt4 适配版）；
   - TailwindCSS 在 Server Components 中需开启 `css: true` 配置；
3. **部署优化**：Nuxt4 推荐使用 Vercel Edge Runtime（`nitro.preset: 'vercel-edge'`），比 Node.js Runtime 性能更高，Skill 会自动推荐该配置。

### 四、核心总结
1. **使用流程**：安装 Skill → 初始化项目 → 开发中针对性调优 → 部署前配置优化；
2. **部署流程**：本地验证 → Vercel CLI/Git 部署 → 部署后 Skill 排查问题；
3. **关键技巧**：指令中明确标注「Nuxt4 Beta + TailwindCSS + Pinia + Server」，AI 会精准适配所有技术栈，避免 Nuxt3 旧写法。

这套流程是当前 Nuxt4 Beta 生态下，结合官方 Skill 的最优实践，覆盖「开发→部署→排障」全流程，直接复用即可落地！

# skills 排行榜
```
https://skills.sh/
```