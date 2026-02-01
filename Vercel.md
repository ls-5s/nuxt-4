# Vercel 部署指南

本项目已针对 [Vercel](https://vercel.com) 部署进行了优化。Vercel 是 Next.js 的创造者，也是 Nuxt 应用的首选部署平台。

## ⚡ 零配置 (Zero Configuration)

Nuxt 会自动检测是否在 Vercel 上部署，并使用 `nitro` 引擎自动配置构建输出。

**你不需要：**
- `vercel.json` 文件（大多数情况下）。
- 手动在 `nuxt.config.ts` 中配置 `preset: 'vercel'`。

## 🚀 如何部署

### 选项 1: Git 集成（推荐）

最简单的部署方式是将你的 GitHub/GitLab/Bitbucket 仓库连接到 Vercel。

1. 将代码推送到你的 Git 仓库。
2. 前往 [Vercel Dashboard](https://vercel.com/dashboard) 并点击 **"Add New..."** -> **"Project"**。
3. 导入你的仓库。
4. **项目设置 (Project Settings)**：
   - **Framework Preset**: Vercel 应自动检测为 `Nuxt.js`。
   - **Root Directory**: `.` (如果适用，或者是你的项目子目录)。
   - **Build Command**: `npm run build` (默认)。
   - **Output Directory**: `.output/public` (默认)。
5. 点击 **Deploy**。

每次推送到 `main` 分支都会自动触发生产环境部署。Pull Requests 会生成预览部署 (Preview Deployments)。

### 选项 2: Vercel CLI（手动/测试）

你可以直接从终端使用 Vercel CLI 进行部署。

1. 安装 Vercel CLI：
   ```bash
   npm i -g vercel
   ```

2. 登录 Vercel：
   ```bash
   vercel login
   ```

3. 部署（预览环境）：
   ```bash
   vercel
   ```

4. 部署（生产环境）：
   ```bash
   vercel --prod
   ```

## ⚙️ 配置

### 环境变量 (Environment Variables)

如果你的应用使用 API 密钥或机密信息（在 `runtimeConfig` 中定义），你必须在 Vercel 中设置它们。

1. 前往你的 Vercel 项目 > **Settings** > **Environment Variables**。
2. 添加变量，例如：
   - `NUXT_API_SECRET` (对应 `nuxt.config.ts` 中的 `apiSecret`)
   - `NUXT_PUBLIC_API_BASE` (对应 `public.apiBase`)

### nuxt.config.ts

虽然通常不需要，但你可以在 `nuxt.config.ts` 中自定义构建预设：

```ts
export default defineNuxtConfig({
  nitro: {
    // 强制指定 Vercel preset (通常会自动检测)
    preset: 'vercel',
    
    // 自定义 Serverless Function 区域
    vercel: {
      regions: ['iad1'] 
    }
  }
})
```

### vercel.json (高级)

**警告**：避免使用 `vercel.json` 进行构建设置（如 `builds`、`routes`），因为它们可能会与 Nuxt 的输出冲突。

仅在 Nuxt 无法处理的功能上使用 `vercel.json`，例如 **Cron Jobs (定时任务)** 或 **传统重定向**：

```json
{
  "crons": [
    {
      "path": "/api/cron",
      "schedule": "0 10 * * *"
    }
  ]
}
```

## ❓ 故障排除

- **资源文件 404 错误**: 确保 Vercel 设置中的 **Root Directory** 正确。
- **服务器错误 (500)**: 检查 Vercel **Function Logs**。通常是因为缺少环境变量。
- **冷启动 (Cold Starts)**: Vercel 上的 Nuxt 使用 Serverless Functions。在一段时间不活动后的第一次请求，API 响应可能会稍慢。
