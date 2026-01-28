# 模式(SQLite)
## Drizzle 模式
Drizzle 允许您使用 TypeScript 定义模式，支持底层数据库的各种模型和属性。
当您定义模式时，它将作为未来查询（使用 Drizzle-ORM）和迁移（使用 Drizzle-Kit）
修改的真实性源。

如果您使用 Drizzle-Kit 进行迁移过程，请确保从您模式文件中导出所有定义的模型，以便 Drizzle-Kit 可以导入它们并在迁移差异过程中使用。
这个是设计表格数据的
```ts
/// server/db/schema.ts
// 1. 导入 SQLite 专属核心包（替换 pg-core/mysql-core）
import * as p from "drizzle-orm/sqlite-core";

// 2. 定义 users 表（SQLite 专属：sqliteTable）
export const usersTable = p.sqliteTable("users", {
  // SQLite 自增用 autoincrement()（区别于 PostgreSQL 的 generatedAlwaysAsIdentity()）
  id: p.integer()
    .primaryKey()
    .autoincrement(),

  // 字符串字段：SQLite 用 text() 更通用（varchar() 也支持，无长度限制）
  name: p.text().notNull(), // 非空约束：所有数据库通用

  // 整数字段：integer() 是 SQLite 整型
  age: p.integer().notNull(),

  // 唯一约束：通用（保证邮箱不重复）
  email: p.text().notNull().unique(),
});
```
## 常用的类型
我把 SQLite + Drizzle 中**最常用的字段类型**和**通用约束**整合在一起，包含每个用法的作用说明+示例，你可以直接参考使用（所有示例都基于 SQLite，去掉 `p.` 就是按需解构导入的写法）：

注意: 是的！字段类型方法（比如 p.integer()/p.text()/p.real() 等）必须作为链式调用的第一个方法 —— 这是 Drizzle 语法的硬性规则，没有任何例外，违反的话代码会直接报错。

### 一、核心：SQLite 常用字段类型（drizzle-orm/sqlite-core）
| 字段类型        | 作用                          | 示例（带约束）|
|-----------------|-------------------------------|---------------------------------------------|
| `p.integer()`   | 整型（存数字：ID、年龄、数量） | `id: p.integer().primaryKey().autoincrement()` |
| `p.text()`      | 字符串（存文本：名称、邮箱）| `name: p.text().notNull()`                  |
| `p.real()`      | 浮点型（存小数：价格、评分）| `price: p.real().default(0).notNull()`       |
| `p.blob()`      | 二进制（存文件、图片）| `avatar: p.blob()`                          |
| `p.boolean()`   | 布尔型（存状态：是否激活）| `isActive: p.boolean().default(true)`       |
| `p.date()`      | 日期型（存日期：生日）| `birthday: p.date()`                        |
| `p.datetime()`  | 时间戳（存创建/更新时间）| `createdAt: p.datetime().defaultNow()`      |

---

### 二、通用约束（所有数据库都能用，核心高频）
| 约束方法          | 作用                                  | 示例                  |
|-------------------|---------------------------------------|-----------------------|
| `.notNull()`      | 字段非空（必须传值，不能为 null）| `name: p.text().notNull()` |
| `.primaryKey()`   | 设为主键（唯一标识一行数据）| `id: p.integer().primaryKey()` |
| `.autoincrement()`| 自增（SQLite/MySQL 专属，ID 自动递增） | `id: p.integer().primaryKey().autoincrement()` |
| `.unique()`       | 字段值唯一（比如邮箱不能重复）| `email: p.text().notNull().unique()` |
| `.default(值)`    | 设置默认值（不传值时用默认值）| `isActive: p.boolean().default(true)` |
| `.defaultNow()`   | 默认当前时间（时间戳专用）| `createdAt: p.datetime().defaultNow()` |
| `.references()`   | 外键（关联其他表的主键）| `userId: p.integer().references(() => usersTable.id)` |
| `.check(条件)`    | 自定义校验（比如年龄≥0）| `age: p.integer().check(age => age > 0)` |

---

### 三、整合示例（包含所有常用写法）
```typescript
import * as p from "drizzle-orm/sqlite-core";

// 1. 先定义基础表（用户表）
export const usersTable = p.sqliteTable("users", {
  // 整型 + 主键 + 自增（最常用的ID写法）
  id: p.integer()
    .primaryKey()
    .autoincrement(),

  // 文本 + 非空（必传的名称）
  name: p.text().notNull(),

  // 整型 + 非空 + 自定义校验（年龄必须>0）
  age: p.integer()
    .notNull()
    .check(age => age > 0),

  // 文本 + 非空 + 唯一（邮箱不重复）
  email: p.text()
    .notNull()
    .unique(),

  // 布尔型 + 默认值（默认激活）
  isActive: p.boolean().default(true),

  // 时间戳 + 默认当前时间（创建时间）
  createdAt: p.datetime().defaultNow(),
});

// 2. 关联表（文章表，含外键）
export const postsTable = p.sqliteTable("posts", {
  id: p.integer().primaryKey().autoincrement(),

  // 文本 + 非空（文章标题）
  title: p.text().notNull(),

  // 文本（文章内容，可选）
  content: p.text(),

  // 浮点型 + 非空 + 默认值（文章评分）
  score: p.real()
    .notNull()
    .default(0),

  // 外键（关联用户表ID，核心关联写法）
  userId: p.integer()
    .notNull()
    .references(() => usersTable.id), // 关联users表的id字段
});
```

---

### 总结（核心要点）
1. **字段类型**：SQLite 中 `integer`/`text`/`datetime` 是日常开发90%场景会用到的；
2. **约束**：`notNull()`/`primaryKey()`/`autoincrement()`/`unique()`/`default()` 是高频必用；
3. **外键**：`.references(() => 表名.字段)` 是关联表的标准写法，必须用回调函数避免循环导入；
4. 所有写法去掉 `p.` 就是按需解构导入的形式（比如 `integer()` 替代 `p.integer()`），功能完全一致。

# 组织您的模式文件
您可以将 SQL 模式直接在 TypeScript 中声明，或者将所有内容放在一个 schema.ts 文件中，
或者您可以分散它们——随您所愿，完全没有限制！
## 单文件中的模式

一、Nuxt 4 专属目录结构（单文件 Schema）
Nuxt 4（和 Nuxt 3）的服务端代码默认放在 server 目录下（而非src），这是和普通 TS 项目的核心区别，最终目录结构如下：
```ts
plaintext
📦 你的Nuxt 4项目根目录
 ├ 📂 server          # Nuxt服务端核心目录（自动识别）
 │  └ 📂 db           # 数据库相关目录
 │     └ 📜 schema.ts # 单文件Schema（所有表都写在这里）
 ├ 📜 drizzle.config.ts # Drizzle-Kit配置文件（项目根目录）
 ├ 📜 .env            # 可选：环境变量（如数据库路径）
 └ 📜 package.json

```

三、Drizzle 配置文件（drizzle.config.ts）
适配 Nuxt 4 路径 + SQLite 方言，放在项目根目录：
```ts

// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite", // 替换为SQLite（原示例是postgresql）
  schema: "./server/db/schema.ts", // 适配Nuxt的Schema路径（核心修改）
  out: "./drizzle/migrations", // 迁移文件生成目录（项目根目录下）
  // SQLite专属：指定数据库文件路径（和Nuxt的db目录对应）
  dbCredentials: {
    url: "./server/db/sqlite.db", // SQLite数据库文件会自动创建在这里
  },
  // 可选：开启TypeScript类型生成（增强提示）
  verbose: true,
  strict: true,
});
```

四、补充：Nuxt 4 必装依赖
在项目根目录执行以下命令，安装 SQLite+Drizzle 依赖：
```bash
运行
# 核心依赖：Drizzle ORM + SQLite驱动
npm install drizzle-orm better-sqlite3
# 开发依赖：Drizzle-Kit（生成迁移文件）
npm install -D drizzle-kit
```
五、核心使用命令（Nuxt 4 中生成 / 执行迁移）
```bash
运行
# 1. 生成迁移文件（基于schema.ts）
npx drizzle-kit generate

# 2. 执行迁移（创建/更新数据库表）
npx drizzle-kit migrate
```