html css javascript typescript nodejs 
框架 vue2/3  nuxt4 tailwindcss express nitro + h3
组件库 element-ui nuxt-ui useVue ECnarts
工具 git
状态管理 vuex  pinia
api axios
数据库 typeorm DizzleORM


pnpm run db:studio
pnpm run db:migrate
pnpm run db:generate

=====================================

📌 分开安装（按需选择，适合分步操作）
1. 安装运行时依赖（生产环境必须，项目上线保留）
```bash
运行
pnpm add drizzle-orm @libsql/client
```
drizzle-orm：Drizzle 核心 ORM 库，提供所有查询 / 操作符 / 表定义能力
@libsql/client：SQLite 官方驱动，实现数据库连接通信
2. 安装开发工具依赖（仅开发环境用，上线不打包）
```bash
运行
pnpm add -D drizzle-kit
```
drizzle-kit：Drizzle 配套工具，支持db:push/generate/migrate/studio等核心命令