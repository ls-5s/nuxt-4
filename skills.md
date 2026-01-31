Nuxt 4 全栈开发 Skills 安装与配置指南（Trae IDE 适配版）

本指南专为 Trae IDE 优化（兼容 Cursor/Claude Code），帮你快速配置「Nuxt 4 + TailwindCSS + Pinia + Server + Nuxt UI + Web UI」专属 Skills，解决 AI 生成旧版代码、提示冗余、认证失败等问题，确保 AI 输出的代码直接适配 Nuxt 4 最新规范。


---
📌 什么是 Skills？

Trae IDE 中的 Skills（技能包），是官方提供的 AI 助手能力扩展与规范约束包，用于定义特定技术栈的开发标准、语法规则及能力边界，帮助 AI 助手精准适配开发者的技术选型，确保生成代码符合项目开发规范与工具适配要求。

- 🎯 指定技术栈版本规范：明确当前开发所使用的 Nuxt 4 Beta 版本，区分于 Nuxt 2/3，避免 AI 生成过时 API（如混淆 app/ 与 pages/ 目录）；

- 📝 定义代码编写标准：约束 AI 助手严格遵循 Vue 3 组合式 API、Pinia 模块化、Tailwind 原子化样式等官方推荐写法，保障代码规范性；

- ❌ 屏蔽不兼容语法：禁止 AI 助手使用与 Nuxt 4 不兼容的第三方库及过时语法（如旧版 useAsyncData 配置），规避版本适配问题。

核心价值：默认 AI 训练数据未同步 Nuxt 4 最新变动，配置专属 Skills 后，AI 生成的代码无需手动改就能跑，彻底避免「版本不兼容报错」。


---
📋 第一步：准备工作（必做）

1. 环境前置检查

确保你的环境满足以下要求（Nuxt 4 核心依赖）：

- Node.js ≥ 20.0.0（推荐 20.x LTS）

- Git ≥ 2.30.0

- Trae IDE 已安装并更新至最新版本

补充：执行以下命令验证环境版本，若版本过低可通过 nvm 升级（以 macOS/Linux 为例）：

# 验证 Node.js 版本（需 ≥20.0.0）
node -v
# 验证 Git 版本（需 ≥2.30.0）
git -v
# 若 Node 版本过低，用 nvm 升级（macOS/Linux）
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install 20
nvm use 20

2. 安装 Skills CLI（全局）

Skills CLI 是管理 Trae IDE 技能库的核心工具，全局安装后可在任意项目使用：

# 全局安装 Skills CLI
npm install -g skills

# 验证安装成功（出现版本号即正常）
skills --version

3. 清理历史缓存（避免冲突）

如果之前尝试过安装 Skills，先清理缓存确保获取最新内容：

skills cache clean


---
🚀 第二步：精准安装核心 Skills（避坑版）

关键优化：改用 HTTPS 地址替代 SSH，避免「Authentication failed」认证失败；拆分命令，减少全量安装冗余。

1. 安装 Nuxt 4 核心全栈能力（首选适配仓库）

# 用 HTTPS 安装，-g 全局生效，-y 自动确认（仅装核心 Nuxt 4 技能）
skills add https://github.com/onmax/nuxt-skills.git -y -g

- ✅ 包含能力：Nuxt 4 目录规范（app//server/）、Nuxthub 部署/数据库、Nuxt UI 组件库最佳实践

- ✅ 核心优势：目前最适配 Nuxt 4 Beta 的 Skills 仓库，完全规避旧版 Nuxt 3 写法。

2. 安装 Pinia + Vue 3 最佳实践（官方标准）

skills add https://github.com/antfu/skills.git -y -g

- ✅ 包含能力：Pinia Setup Store 写法、Vue 3 组合式 API 规范、响应式数据最佳实践

- ✅ 核心优势：由 Vue/Vite 核心成员 Anthony Fu 维护，确保语法 100% 符合官方标准。

3. 安装 TailwindCSS 原子化样式能力

# 指定 tailwind-design-system 分支，精准安装仅 Tailwind 相关技能
skills add https://github.com/wshobson/agents.git@tailwind-design-system -y -g

- ✅ 包含能力：Tailwind 工具类优先级、自定义主题配置、响应式布局规范

- ✅ 核心优势：强制 AI 写原子化类名（如 flex items-center），而非传统 CSS。

4. 安装 Web UI 设计规范

skills add https://github.com/vercel-labs/agent-skills.git@web-design-guidelines -y -g

- ✅ 包含能力：现代化 UI 间距/排版/色彩规范、Nuxt UI 与 Tailwind 适配技巧

- ✅ 核心优势：提升 AI 生成页面的美观度和交互合理性。

补充：若出现网络问题导致克隆失败，可使用手动克隆兜底方案（以 nuxt-skills 为例）：

# 第一步：找到 Trae IDE Skills 全局目录（不同系统路径）
# Windows: %USERPROFILE%\.skills
# macOS/Linux: ~/.skills
mkdir -p ~/.skills/nuxt-skills
git clone https://github.com/onmax/nuxt-skills.git ~/.skills/nuxt-skills
# 第二步：手动启用该 Skills
skills enable -g nuxt-skills

其他 Skills 手动克隆方法同理，将仓库地址和目录名对应替换即可。


---
🧹 第三步：精简 Skills（关键！避免 AI 提示冗余）

安装上述仓库会附带 React、Slidev、Vitest 等无关技能，需清理后确保 AI 只聚焦 Nuxt 4 技术栈：

方式 1：一键精简（推荐）

# 全局卸载冗余 Skills，-y 自动确认
skills remove -g -y \
antfu document-writer motion nuxt-better-auth nuxt-content reka-ui slidev ts-library tsdown turborepo unocss \
vercel-composition-patterns vercel-react-best-practices vercel-react-native-skills \
vitepress vitest vue-testing-best-practices pnpm vite vue-router-best-practices nuxt-seo vueuse vueuse-functions

方式 2：手动筛选（更精准）

若一键命令报错，可先查看已安装的全局 Skills，再逐个删除无关项：

# 查看所有全局 Skills
skills list -g

# 示例：删除单个冗余 Skill
skills remove -g vercel-react-best-practices -y

精简逻辑：只保留「Nuxt 4 + Vue 3 + Pinia + Tailwind + Nuxt UI」相关技能，删除 React、通用构建工具、测试框架等无关项，让 AI 提示更精准。


---
✅ 第四步：双重验证安装结果

1. 命令行验证

执行以下命令，确认最终保留的 Skills 符合预期：

skills list -g

理想结果（纯净 Nuxt 4 技术栈）：

- nuxt (Nuxt 4 核心)
- vue (Vue 3 基础)
- pinia (状态管理)
- nuxt-ui (组件库)
- tailwind-design-system (Tailwind 规范)
- web-design-guidelines (UI 设计原则)
- nuxthub (Server/部署)

2. Trae IDE 可视化验证（关键）

1. 打开 Trae IDE → 左侧「AI 助手」→ 进入「规则和技能」面板；

2. 切换到「全局」标签页（全局安装的 Skills 仅在此显示）；

3. 确认上述核心 Skills 均为「已启用」状态（开关绿色）；

4. 若显示「已禁用」，点击开关启用后刷新页面。


---
📖 第五步：Skills 实战使用教程（纯规范化提问版）

配置好 Skills 后，只需通过规范化提问，就能让 Trae IDE 的 AI 助手精准调用对应 Skills，生成符合 Nuxt 4 技术栈规范的代码。以下是核心场景的标准化提问模板（可直接复制使用）：

🔧 基础操作：打开 AI 助手

1. 打开 Nuxt 4 项目（补充：完整初始化命令如下）；

2. 启动 AI 助手：按下快捷键 Ctrl+/（Windows）/ Cmd+/（macOS），或点击 Trae IDE 左侧「AI 助手」图标（机器人样式）。

# 初始化 Nuxt 4 项目（最新 Beta 版）
npx nuxi init@latest my-nuxt4-project
cd my-nuxt4-project
# 安装核心依赖（Nuxt UI + Pinia + TailwindCSS）
npm install @nuxt/ui pinia @pinia/nuxt @nuxtjs/tailwindcss
# 配置 nuxt.config.ts（启用核心模块）
echo 'export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@pinia/nuxt", "@nuxtjs/tailwindcss"]
})' > nuxt.config.ts
# 启动开发服务器
npm run dev

🎯 场景 1：生成 Nuxt 4 Server API 接口

基于 Nuxt 4 官方最佳实践，开发 server/api 目录下的用户注册接口，要求：
1. 接收 username、email、password 三个参数并完成基础参数校验；
2. 输出标准 JSON 格式响应（包含状态码、提示信息）；
3. 严格遵循 Nuxt 4 Server 目录规范和语法要求；
4. 适配 Nuxt 4 Beta 版本，禁用所有过时 API。

🎯 场景 2：生成 Nuxt UI + TailwindCSS 登录表单

基于 Nuxt 4 + Nuxt UI + TailwindCSS 最佳实践，开发登录表单组件，要求：
1. 组件路径遵循 Nuxt 4 官方目录规范；
2. 使用 Nuxt UI 官方组件，搭配 TailwindCSS 原子化样式开发；
3. 适配移动端响应式布局，符合 Web UI 设计的间距/排版/色彩规范；
4. 包含账号、密码输入框及登录按钮，交互逻辑简洁且符合 Nuxt 4 规范。

🎯 场景 3：生成 Pinia 状态管理 Store

基于 Vue 3 组合式 API 和 Pinia 官方最佳实践，为 Nuxt 4 项目开发主题管理 Store，要求：
1. 包含 darkMode 状态变量，支持深色模式切换方法；
2. 实现状态持久化存储，避免 Nuxt 4 服务端渲染水合错误；
3. 采用 Pinia Setup Store 写法，符合 Nuxt 4 集成规范。

🎯 场景 4：生成 Nuxt 4 页面/通用组件

基于 Nuxt 4 最佳实践，开发 app 目录下的首页页面组件，要求：
1. 集成 Nuxt UI 基础布局组件，搭配 TailwindCSS 完成样式设计；
2. 严格遵循 Nuxt 4 客户端/服务端组件的区分规范；
3. 符合 Web UI 设计的通用规范，保证页面美观性和兼容性。

💡 通用极简提问模板（万能套用）

基于 Nuxt 4 最佳实践，实现【具体功能】，要求：
1. 技术栈约束：Nuxt 4 + 【Pinia/TailwindCSS/Nuxt UI/Server】；
2. 遵循 Nuxt 4 官方目录规范和语法要求；
3. 禁用过时 API，适配 Nuxt 4 Beta 版本。


---
❓ 常见问题解决

- 1. 安装时提示「Authentication failed」
→ 改用指南中的 HTTPS 地址重新安装，若仍失败，使用手动克隆兜底方案。

- 2. AI 仍生成旧版代码
→ 重新执行「精简 Skills」步骤，重启 Trae IDE。

- 3. Skills 已安装但 IDE 不显示
→ 执行 skills cache clean → 重启 Trae IDE → 刷新「规则和技能」面板。


---
### 总结

1. 核心原则：HTTPS 安装避认证失败，精简 Skills 避提示冗余；

2. 验证关键：命令行 + Trae IDE 双验证，确保核心 Skills 全局启用；

3. 使用技巧：提问需明确「Nuxt 4 规范 + 技术栈 + 功能要求」，AI 自动调用 Skills 生成合规代码；

4. 核心价值：配置后 AI 代码无需修改，直接适配 Nuxt 4 规范；

5. 版本提醒：Nuxt 4 仍处于 Beta 阶段，API 可能迭代更新，建议每月执行一次 skills update -g 升级 Skills，确保与最新规范同步。
# https://skills.sh/    我给补充一个skills的排行榜，大家可以自取