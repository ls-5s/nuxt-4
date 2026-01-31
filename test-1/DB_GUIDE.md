# 数据库协作指南 (Database Collaboration Guide)

在团队协作中，SQLite 数据库文件（`server/db/sqlite.db`）通常**不**应该包含在版本控制中（已在 `.gitignore` 中排除）。

为了确保所有开发者的本地环境拥有相同的数据库结构和基础数据，我们使用 **Migration（迁移）** 和 **Seed（种子数据）** 机制。

## 📥 当你拉取最新代码后 (After Pulling Code)

当你从 Git 拉取代码，或者初次克隆项目时，请按照以下步骤操作以对齐数据库：

### 1. 安装依赖
```bash
pnpm install
```

### 2. 同步数据库结构 (Migrate)
这会根据 `server/db/migrations` 中的迁移文件，更新你的本地 SQLite 数据库结构。
```bash
pnpm db:migrate
```

### 3. 填充基础数据 (Seed)
这会清空现有数据（可选，视脚本逻辑而定）并填入测试/初始数据（如默认管理员账号、测试文章等）。
```bash
pnpm db:seed
```

---

## 🛠️ 常用命令说明

| 命令 | 说明 |
|------|------|
| `pnpm db:generate` | 当你修改了 `schema.ts` 后，运行此命令生成新的 SQL 迁移文件。 |
| `pnpm db:migrate` | 执行迁移，将 SQL 变更应用到本地数据库。 |
| `pnpm db:seed` | **[新增]** 运行 `server/db/seed.ts`，填充初始数据。 |
| `pnpm db:studio` | 启动 Drizzle Studio 可视化界面查看和管理数据。 |

## 📝 如何修改种子数据？

编辑 `server/db/seed.ts` 文件。你可以添加更多的初始用户、配置项或测试内容。修改后提交该文件，其他成员拉取后运行 `pnpm db:seed` 即可获得更新后的数据。
