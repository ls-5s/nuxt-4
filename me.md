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



```ts
// 3. 定义一对一的两张表（核心：外键 + unique约束）
/**
 * 主表：用户表（users）
 * 存储用户基础信息，id是主键
 */
const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }), // 用户唯一标识
  username: text('username').notNull(), // 用户名
  phone: text('phone').notNull().unique(), // 手机号（唯一）
});

/**
 * 一对一关联表：用户详情表（user_profiles）
 * 存储用户的扩展信息（年龄、地址、头像），和用户表一对一绑定
 */
const userProfiles = sqliteTable('user_profiles', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id')
    .notNull()
    // 核心1：外键约束 → 保证userId必须是users表中存在的id（避免脏数据）
    .references(() => users.id)
    // 核心2：unique约束 → 保证一个userId只能对应1个详情（双向唯一的关键）
    .unique(),
  age: integer('age'), // 年龄
  address: text('address'), // 收货地址
  avatar: text('avatar'), // 头像地址
});
```
