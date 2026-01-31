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
npx drizzle-kit migrates
```
## 多文件中的模式
你想要把 Drizzle 多文件 Schema 的示例（原 Postgres + src 目录）适配成 **Nuxt 项目 + SQLite** 的版本，核心是调整目录结构（贴合 Nuxt 的 `server/db` 规范）和 `drizzle.config.ts` 配置（适配 SQLite），同时保留多文件拆分表结构的设计思路。

### 一、第一步：Nuxt 项目的目录结构（多文件 Schema）
贴合 Nuxt 服务端代码的存放规范（`server` 目录），Schema 拆分后的目录结构如下：
```
📦 <项目根目录>
 ├ 📂 server          // Nuxt 服务端核心目录
 │  └ 📂 db           // 数据库相关所有文件
 │     ├ 📂 schema    // 拆分的表结构文件（按业务分文件）
 │     │  ├ 📜 users.ts    // 用户表
 │     │  ├ 📜 products.ts // 产品表
 │     │  └ 📜 messaging.ts// 消息表
 │     ├ 📜 index.ts       // Nuxt 运行时的数据库连接（业务代码用）
 │     └ 📜 sqlite.db      // SQLite 数据库文件（自动生成）
 ├ 📂 drizzle         // 迁移文件目录（自动生成）
 │  └ 📂 migrations
 └ 📜 drizzle.config.ts // Drizzle CLI 配置文件
```

### 二、第二步：适配 Nuxt + SQLite 的 drizzle.config.ts
核心修改：指定 SQLite 方言、指向 Nuxt 的 `server/db/schema` 目录、配置 SQLite 数据库文件路径：
```typescript
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "sqlite", // 适配 SQLite（替换原 postgresql）
  schema: "./server/db/schema", // 指向 Nuxt 服务端的 schema 目录（递归读取所有.ts文件）
  out: "./drizzle/migrations", // 迁移文件输出目录（项目根目录下）
  // SQLite 专属：指定数据库文件路径（和 Nuxt 运行时连接的文件一致）
  dbCredentials: {
    url: "./server/db/sqlite.db",
  },
  verbose: true, // 可选：开启详细日志
  strict: true,  // 可选：严格模式
});
```

### 三、第三步：多文件 Schema 示例（拆分的表结构）
每个表单独写在 `server/db/schema` 下的文件里，需导出表定义，Drizzle CLI 会自动递归读取：

#### 1. users.ts（用户表）
```typescript
// server/db/schema/users.ts
import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

// 定义用户表
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }), // 自增主键
  name: text("name").notNull(), // 用户名（非空）
  email: text("email").unique().notNull(), // 邮箱（唯一+非空）
  age: integer("age"), // 年龄（可选）
  createdAt: text("created_at").default(new Date().toISOString()), // 创建时间
});

// 可选：定义用户表的类型（方便 TS 类型提示）
export type User = typeof users.$inferSelect; // 查询返回的类型
export type NewUser = typeof users.$inferInsert; // 新增传入的类型
```

#### 2. products.ts（产品表）
```typescript
// server/db/schema/products.ts
import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

// 定义产品表
export const products = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  price: real("price").notNull(), // 价格（浮点型）
  stock: integer("stock").default(0), // 库存（默认0）
  userId: integer("user_id").references(() => users.id), // 关联用户表（外键）
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
```

#### 3. messaging.ts（消息表）
```typescript
// server/db/schema/messaging.ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { users } from "./users"; // 关联用户表

// 定义消息表
export const messages = sqliteTable("messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  content: text("content").notNull(),
  senderId: integer("sender_id").references(() => users.id), // 发送者（关联用户）
  receiverId: integer("receiver_id").references(() => users.id), // 接收者（关联用户）
  sentAt: text("sent_at").default(new Date().toISOString()),
});

export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;
```

### 四、第四步：Nuxt 运行时的数据库连接（业务代码用）
创建 `server/db/index.ts`，封装数据库连接，方便接口/服务中导入使用：
```typescript
// server/db/index.ts
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
// 导入所有表（也可以按需导入，比如只导入users、products）
import * as users from "./schema/users";
import * as products from "./schema/products";
import * as messaging from "./schema/messaging";

// 连接 SQLite 数据库文件（路径和 drizzle.config.ts 中一致）
const sqlite = new Database("./server/db/sqlite.db");
// 创建 Drizzle ORM 客户端，关联所有表
export const db = drizzle(sqlite, {
  schema: {
    ...users,
    ...products,
    ...messaging,
  },
});

// 可选：导出所有表类型/表定义，方便业务代码直接用
export * from "./schema/users";
export * from "./schema/products";
export * from "./schema/messaging";
```

### 五、第五步：使用示例（Nuxt 接口中操作数据库）
比如创建 `server/api/users.get.ts`，查询所有用户：
```typescript
// server/api/users.get.ts
import { db, users } from "../db/index";

export default defineEventHandler(async () => {
  // 查询所有用户（TS 类型自动提示）
  const allUsers = db.select().from(users).all();
  return {
    code: 200,
    data: allUsers,
  };
});
```

### 六、第六步：迁移命令（生成/执行迁移文件）
在 `package.json` 中添加脚本，方便执行 Drizzle CLI 命令：
```json
{
  "scripts": {
    "db:generate": "drizzle-kit generate", // 生成迁移文件（对比 Schema 和数据库结构）
    "db:migrate": "drizzle-kit migrate"    // 执行迁移（将 Schema 同步到数据库）
  }
}
```
执行流程：
1. 写好 Schema 后，运行 `npm run db:generate` → 生成迁移文件到 `drizzle/migrations`；
2. 运行 `npm run db:migrate` → 将迁移文件的 SQL 执行到 SQLite 数据库中（创建/修改表）。

### 总结
1. **目录适配**：把 Schema 放在 Nuxt 的 `server/db/schema` 下，贴合 Nuxt 服务端代码规范；
2. **配置核心**：`drizzle.config.ts` 中 `dialect` 设为 `sqlite`，`schema` 指向 `server/db/schema`，`dbCredentials.url` 指向 SQLite 文件；
3. **多文件拆分**：按业务拆分表到不同 `.ts` 文件，Drizzle CLI 会递归读取所有文件；
4. **运行时连接**：单独封装 `server/db/index.ts`，统一管理数据库连接和表导入，方便业务代码使用；
5. **迁移命令**：通过 npm 脚本快速生成/执行迁移，保证 Schema 和数据库结构一致。

## 塑造数据模式
Drizzle 模式由您正在使用的数据库中的几种模型类型组成。使用 Drizzle，您可以指定

包含列、约束等的表。
模式（仅限 PostgreSQL）
枚举
序列（仅限 PostgreSQL）
视图
物化视图
等等。
让我们逐一查看如何在 Drizzle 中定义模式。
### 表和列声明
Drizzle 中的表应至少定义 1 列，这与数据库中的要求相同。有一点很重要，Drizzle 中没有通用的表对象。您需要选择正在使用的方言，PostgreSQL、MySQL 或 SQLite。
```ts
import * as p from "drizzle-orm/sqlite-core";
// 拓展：多表定义示例（保持统一语法风格）
export const postsTable = p.sqliteTable("posts", {
  id: p.integer().primaryKey().autoincrement(),
  title: p.text().notNull(),
  content: p.text(),
  authorId: p.integer("author_id").notNull(), // 外键关联字段：TS authorId → 数据库 author_id
  publishTime: p.text("publish_time"),
});
```
默认情况下，Drizzle 将在数据库查询中使用 TypeScript 键名作为列名。因此，示例中的模式和查询将生成如下所示的 SQL 查询：

### 驼峰命名与蛇形命名
数据库模型名称通常使用 snake_case 约定，而在 TypeScript 中，通常使用 camelCase 命名模型。这可能导致模式中出现大量别名定义。为解决此问题，Drizzle 提供了一种在 Drizzle 数据库初始化时包含一个可选参数来自动将 TypeScript 中的 camelCase 映射到数据库中的 snake_case 的方法。

对于这种映射，您可以在 Drizzle DB 声明中使用 casing 选项。此参数将帮助您指定数据库模型的命名约定，并将尝试相应地映射所有 JavaScript 键。
### 高级
您可以使用 Drizzle ORM 实现一些技巧。由于 Drizzle 完全存在于 TypeScript 文件中，因此您基本上可以在简单的 TypeScript 项目中对代码执行任何操作。

一个常见功能是将列分离到不同的位置，然后重复使用它们。例如，考虑 updated_at、created_at 和 deleted_at 列。许多表/模型可能需要这三个字段来跟踪和分析系统中实体的创建、删除和更新。

我们可以将这些列定义在一个单独的文件中，然后导入并将它们分散到您拥有的所有表对象中。
```ts
columns.helpers.ts（定义通用字段）
typescript
运行
import * as p from "drizzle-orm/sqlite-core";
import { usersTable } from "../schema";

export const timestamps = {
  createdAt: p.integer("created_at").notNull().default(Date.now()),
  updatedAt: p.integer("updated_at"),
  deletedAt: p.integer("deleted_at"),
};

export const commonStatus = {
  status: p.integer().notNull().default(1),
};

export const operateUser = {
  creatorId: p.integer("creator_id").references(() => usersTable.id),
  updaterId: p.integer("updater_id").references(() => usersTable.id),
};
```
使用 
```ts
import * as p from "drizzle-orm/sqlite-core";
import { timestamps, commonStatus } from "../helpers/columns.helpers";

export const usersTable = p.sqliteTable("users", {
  id: p.integer().primaryKey().autoincrement(),
  firstName: p.text("first_name").notNull(),
  email: p.text().notNull().unique(),
  ...commonStatus,
  ...timestamps,
});
```
目录
```ts
server/
└── db/
    ├── helpers/                # 【核心】DB层全局通用工具目录（所有子文件夹共享）
    │   └── columns.helpers.ts  # 全局复用字段（timestamps/状态/通用外键等）
    ├── schema/                 # 你的表结构定义文件夹（原schema）
    │   ├── users.ts
    │   ├── posts.ts
    │   └── index.ts            # schema聚合入口
    ├── queries/                # 数据库查询逻辑文件夹（如CRUD封装）
    │   ├── userQueries.ts
    │   └── postQueries.ts
    │   └── index.ts            # 查询聚合入口
    ├── migrations/             # Drizzle迁移文件文件夹（自动生成）
    ├── connection.ts           # 全局单例数据库连接（原db.ts）
    └── utils/                  # 其他DB工具文件夹（如数据转换/事务封装）
        └── dbUtils.ts
```
### 模式
```ts
// 统一导入 SQLite 核心并指定别名 p，贴合你的写法规范
import * as p from "drizzle-orm/sqlite-core";
// 导入唯一字符串生成工具函数（posts 表 slug 动态默认值依赖）
import { generateUniqueString } from "../utils";

// ====================== 用户表（usersTable）======================
export const usersTable = p.sqliteTable(
  "users",
  {
    // SQLite 自增主键：integer() + primaryKey() + autoincrement() 组合
    id: p.integer().primaryKey().autoincrement(),
    // TS小驼峰 → 数据库蛇形命名，保持列别名规范
    firstName: p.text("first_name"),
    lastName: p.text("last_name"),
    // 非空约束，配合唯一索引保证邮箱唯一性
    email: p.text().notNull(),
    // 自关联外键：引用当前表 id，AnySQLiteColumn 做类型注解避免TS报错
    invitee: p.integer().references((): p.AnySQLiteColumn => usersTable.id),
    // TS 字面量类型约束，限制角色只能是指定值，默认值 guest
    role: p.text().$type<"guest" | "user" | "admin">().default("guest"),
  },
  // 表第三个参数：配置索引，邮箱唯一索引（优化查询+保证唯一性）
  (table) => [p.uniqueIndex("email_idx").on(table.email)]
);

// 自动推导类型：查询/插入时使用，全程类型安全
export type User = typeof usersTable.$inferSelect; // 查询返回的用户类型
export type NewUser = typeof usersTable.$inferInsert; // 插入用户的参数类型（自动排除自增/默认字段）

// ====================== 帖子表（postsTable）======================
export const postsTable = p.sqliteTable(
  "posts",
  {
    // SQLite 自增主键
    id: p.integer().primaryKey().autoincrement(),
    // 动态默认值：插入时自动执行函数生成16位唯一字符串，作为帖子唯一标识
    slug: p.text().$default(() => generateUniqueString(16)),
    title: p.text(),
    // 外键关联：帖子所属用户，关联 usersTable.id，TS小驼峰→数据库蛇形命名
    ownerId: p.integer("owner_id").references(() => usersTable.id),
  },
  // 配置索引：slug 唯一索引（防止重复）、title 普通索引（优化标题查询）
  (table) => [
    p.uniqueIndex("slug_idx").on(table.slug),
    p.index("title_idx").on(table.title),
  ]
);

// 自动推导帖子类型
export type Post = typeof postsTable.$inferSelect;
export type NewPost = typeof postsTable.$inferInsert;

// ====================== 评论表（commentsTable）======================
export const commentsTable = p.sqliteTable("comments", {
  // SQLite 自增主键
  id: p.integer().primaryKey().autoincrement(),
  // 文本字段带长度软约束（SQLite 层面无强制，TS 层面做类型提示）
  text: p.text({ length: 256 }),
  // 外键关联：评论所属帖子，关联 postsTable.id
  postId: p.integer("post_id").references(() => postsTable.id),
  // 外键关联：评论发布用户，关联 usersTable.id
  ownerId: p.integer("owner_id").references(() => usersTable.id),
});

// 自动推导评论类型
export type Comment = typeof commentsTable.$inferSelect;
export type NewComment = typeof commentsTable.$inferInsert;
```
# 数据库的链接
server/db/connection.ts
```ts
// 导入Drizzle ORM的libSQL适配器 - 用于连接SQLite/libSQL数据库，实现ORM核心操作（增删改查/联表/迁移等）
import { drizzle } from "drizzle-orm/libsql";
// 导入libSQL官方客户端 - 建立与SQLite/libSQL数据库的底层连接，Drizzle基于此连接做上层ORM封装
import { createClient } from "@libsql/client";
// 导入Node.js内置路径处理模块 - 解决不同操作系统（Windows/macOS/Linux）的路径分隔符差异，保证路径跨平台有效
import path from "path";
// 导入本地数据库模式定义 - 包含所有表结构、字段、索引、关联关系等schema定义，Drizzle通过schema做类型校验和SQL生成
import * as schema from "./schema";

// 解析数据库存储目录的绝对路径 - process.cwd()为项目根目录，拼接server/db作为数据库文件存放目录
const dbDir = path.resolve(process.cwd(), "server/db");
// 解析SQLite数据库文件的绝对路径 - 在dbDir目录下生成sqlite.db文件，作为本地数据库的物理文件
const dbPath = path.resolve(dbDir, "sqlite.db");

// 创建libSQL客户端实例 - 建立与本地SQLite数据库的底层连接
export const libsqlClient = createClient({
  // 数据库连接地址 - file:协议表示本地文件型SQLite数据库，拼接绝对路径保证连接指向正确的物理文件
  url: `file:${dbPath}`,
});

// 创建Drizzle ORM核心实例 - 封装libSQL客户端，结合schema实现类型安全的数据库操作
export const db = drizzle(libsqlClient, {
  schema, // 关联数据库schema定义 - 开启Drizzle的类型校验，实现TS类型推断（如查询结果自动推导字段类型）
  logger: process.env.NODE_ENV === "development", // 开发环境开启SQL日志 - 控制台打印执行的SQL语句，方便调试；生产环境关闭，减少性能开销
});

// 导出数据库文件绝对路径 - 供其他模块（如数据库迁移、备份、配置读取）复用该路径，避免重复解析
export { dbPath };
```
## 验证
server/plugins/db-check.ts
```ts
/**
 * Nuxt4 服务端数据库连接校验插件
 * 路径：server/plugins/db-check.ts
 * 作用：服务启动时校验数据库连接，失败则终止服务
 * 适配：@libsql/client（最新版 API）
 */
import { consola } from "consola";
import { libsqlClient, dbPath } from "../db/connection";

export default async () => {
  consola.info("🔄 正在校验数据库连接...");

  try {
    // 核心修复：使用 @libsql/client 最新版 API `execute`
    await libsqlClient.execute("SELECT 1 AS db_connected;");
    consola.success(`✅ SQLite + Drizzle ORM 初始化成功（零编译纯 JS 驱动）`);
    consola.info(`📁 数据库文件路径：${dbPath}`);
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "未知错误（非 Error 类型）";
    consola.fatal(`❌ 数据库连接失败，服务将强制终止：${errMsg}`);
    process.exit(1);
  }
};
```
# 数据库的CRUD
## Drizzle ORM 常用条件操作符速查（适配你的 SQLite + Nuxt 4 场景）
精选开发中**95%场景会用到**的操作符，按「使用频率+功能分类」整理，和 `eq` 用法完全一致，**导入即⽤、类型安全**，直接适配你用 `sqlite-core` 定义的 `usersTable`，附**代码示例+对应SQL**，可直接复制复用！

### 一、基础比较操作符（替代 SQL 原生比较符，最常用）
对应 SQL 核心比较符号，适用于**数字、时间戳、字符串**等所有可比较字段，是日常精确/范围筛选的基础。
| 操作符 | 含义     | 代码示例（基于 usersTable）                         | 生成的 SQL 片段            |
| ------ | -------- | --------------------------------------------------- | -------------------------- |
| `eq`   | 等于     | `eq(usersTable.id, 1)`                              | `id = 1`                   |
| `ne`   | 不等于   | `ne(usersTable.id, 0)`                              | `id != 0`                  |
| `gt`   | 大于     | `gt(usersTable.id, 5)`                              | `id > 5`                   |
| `lt`   | 小于     | `lt(usersTable.id, 10)`                             | `id < 10`                  |
| `gte`  | 大于等于 | `gte(usersTable.createdAt, new Date('2026-01-01'))` | `created_at >= 1735689600` |
| `lte`  | 小于等于 | `lte(usersTable.id, 20)`                            | `id <= 20`                 |

### 二、逻辑组合操作符（拼接多条件，必用）
单独条件无法满足复杂需求时，用于**组合/嵌套多个条件**，对应 SQL 的 `AND`/`OR`，**必须配合其他操作符使用**，支持无限嵌套。
| 操作符 | 含义                 | 代码示例                                                         | 生成的 SQL 片段                      |
| ------ | -------------------- | ---------------------------------------------------------------- | ------------------------------------ |
| `and`  | 且（所有条件都满足） | `and(eq(usersTable.username, 'test'), gt(usersTable.id, 1))`     | `username = 'test' AND id > 1`       |
| `or`   | 或（任一条件满足）   | `or(ne(usersTable.id, 2), like(usersTable.username, '%admin%'))` | `id != 2 OR username LIKE '%admin%'` |

### 三、模糊/范围匹配操作符（业务高频）
针对**字符串模糊查询**、**值在指定范围**的场景，替代繁琐的多条件拼接，贴合注册、搜索、筛选等业务需求。
| 操作符       | 含义                 | 代码示例                              | 生成的 SQL 片段          |
| ------------ | -------------------- | ------------------------------------- | ------------------------ |
| `like`       | 模糊匹配（SQL 原生） | `like(usersTable.username, '%user%')` | `username LIKE '%user%'` |
| `inArray`    | 值在指定数组中       | `inArray(usersTable.id, [1,3,5,7])`   | `id IN (1,3,5,7)`        |
| `notInArray` | 值不在指定数组中     | `notInArray(usersTable.id, [2,4,6])`  | `id NOT IN (2,4,6)`      |
> 注意：`like` 通配符规则和 SQL 一致：`%` 匹配任意多个字符，`_` 匹配单个字符（如 `like(usersTable.username, 'user_')` 匹配 `user1`/`user2`，不匹配 `user123`）。

### 四、空值判断操作符（处理可为空字段）
针对表中定义为**可选（nullable）** 的字段（如 `avatar: p.text().nullable()`），判断字段是否为 `NULL`，对应 SQL 的 `IS NULL`/`IS NOT NULL`。
| 操作符      | 含义          | 代码示例（假设表有 avatar 可选字段） | 生成的 SQL 片段      |
| ----------- | ------------- | ------------------------------------ | -------------------- |
| `isNull`    | 字段为 NULL   | `isNull(usersTable.avatar)`          | `avatar IS NULL`     |
| `isNotNull` | 字段不为 NULL | `isNotNull(usersTable.avatar)`       | `avatar IS NOT NULL` |

### 五、通用使用规则（和 eq 完全一致，一次记熟）
#### 1. 统一导入方式
所有操作符都从 `drizzle-orm` 导入，多个用逗号分隔，按需导入即可：
```typescript
// 按需导入，避免冗余（推荐）
import { eq, ne, gt, and, like, inArray } from "drizzle-orm";
// 全量导入（适合新手，不用反复改导入）
import * as ops from "drizzle-orm";
// 全量导入使用方式：ops.eq(usersTable.id, 1)
```

#### 2. 统一使用位置
所有操作符**仅在 `.where()` 方法中使用**，支持「单个条件」或「多条件组合」，不影响原有链式查询写法：
```typescript
// 单个条件
db.select().from(usersTable).where(eq(usersTable.username, 'test'));
// 多条件组合
db.select().from(usersTable).where(and(gt(usersTable.id, 5), like(usersTable.username, '%user%')));
```

#### 3. 链式兼容
可与 `.orderBy()`/`.limit()`/`.offset()`/`.select({指定字段})` 等方法无缝配合，写法不变：
```typescript
// 操作符 + 分页 + 排序 + 指定字段查询
db.select({ id: usersTable.id, username: usersTable.username })
  .from(usersTable)
  .where(gt(usersTable.id, 10))
  .orderBy(usersTable.createdAt, 'desc')
  .limit(10)
  .offset(0);
```

### 六、综合实战示例（贴合业务，直接复用）
结合你的 `usersTable`，写一个**注册/登录/用户筛选**中常见的复杂查询，覆盖多操作符组合，直接参考使用：
```typescript
import { db } from "../../db/connection";
import { usersTable } from "../../db/schema";
// 按需导入所需操作符
import { eq, gt, and, or, like, inArray, isNotNull } from "drizzle-orm";

// 需求：查询 id大于5 且 （用户名包含"user" 或 id在[6,7,8,9,10]中） 且 有头像（avatar非空）的用户，按创建时间倒序取前5条
const targetUsers = await db
  // 仅查询非敏感字段，避免返回password
  .select({
    id: usersTable.id,
    username: usersTable.username,
    createdAt: usersTable.createdAt,
  })
  .from(usersTable)
  .where(
    and(
      gt(usersTable.id, 5), // 基础比较
      or( // 逻辑或嵌套
        like(usersTable.username, "%user%"), // 模糊匹配
        inArray(usersTable.id, [6,7,8,9,10]) // 范围匹配
      ),
      isNotNull(usersTable.avatar) // 空值判断
    )
  )
  .orderBy(usersTable.createdAt, "desc")
  .limit(5);
```

### 核心总结
1. 以上是开发中**最常用的操作符**，覆盖「精确匹配、范围筛选、模糊查询、多条件组合、空值判断」所有场景；
2. 所有操作符**用法和 `eq` 完全一致**，无需额外学习新语法，导入后直接在 `.where()` 中使用；
3. 全程**类型安全**，Drizzle 会自动校验「字段类型」和「传入值类型」，开发阶段提前拦截错误；
4. 完全适配你用 `sqlite-core` 别名 `p` 定义的 `usersTable`，**一行代码不用改，直接导入使用**。

后续开发中，只需根据业务需求「按需导入操作符+组合条件」，就能轻松实现任意复杂的数据库查询！
## 查询
1. 必懂基础结构（固定写法）
```typescript
await db
  .select({/* 必写：多表字段+别名，避免冲突 */})
  .from(主表)
  // 👇 多表关联核心：固定加在 .from 后、.where 前，格式严格遵循
  .innerJoin(关联表, eq(表A.关联字段, 表B.关联字段))
  .where(
    and(
      gt(主表.字段, 5),
      or(
        like(主表.字段, "%匹配值%"),
        inArray(主表.字段, [匹配值1,匹配值2])
      )
      // 可追加：关联表.筛选条件
    )
  )
  .orderBy(排序字段, "desc/asc")
  .limit(条数);
```
demo
```ts
// 先按创建时间倒序（主），创建时间相同则按用户名正序（次）
.orderBy(usersTable.createdAt, "desc", usersTable.username, "asc")
// 对应SQL：ORDER BY created_at DESC, username ASC

.where( // 核心筛选条件：多条件组合查询（and外层嵌套or，先圈范围再细化筛选）
  and( // 外层：且关系（所有子条件必须同时满足，缺一不可）
    gt(usersTable.id, 5), // 子条件1：筛选ID大于5的用户（先圈定基础查询范围）
    or( // 内层：或关系（满足任一条件即可），在ID>5的基础上进一步精准筛选
      like(usersTable.username, "%user%"), // 子条件2-1：用户名模糊匹配，包含"user"字符（%是通配符，匹配任意字符）
      inArray(usersTable.id, [6,7,8]) // 子条件2-2：用户ID在指定数组[6,7,8]中（替代id=6 or id=7，写法更简洁）
    )
  )
)
```
2.demo
```typescript
// 1. 核心导入：数据库实例 + 表结构 + 所需操作符
import { db } from "../../db/connection";
import { usersTable } from "../../db/schema";
import { gt, and, or, like, inArray } from "drizzle-orm";

// 2. 新手版核心查询：实现需求+语法最简
const targetUsers = await db
  // 仅查非敏感字段（避免返回密码，新手必学安全习惯）
  .select({
    id: usersTable.id,
    username: usersTable.username,
    createdAt: usersTable.createdAt,
  })
  .from(usersTable) // 指定查询的表
  .where(
    and(
      gt(usersTable.id, 5), // 条件1：id大于5
      or( // 条件2：用户名含user 或 id在[6,7,8,9,10]中（二选一）
        like(usersTable.username, "%user%"),
        inArray(usersTable.id, [6,7,8,9,10])
      )
    )
  )
  .orderBy(usersTable.createdAt, "desc") // 按创建时间倒序
  .limit(5); // 只取前5条结果
```
## 插入
简单的插入
```ts
// ========== 单条数据插入语法（带返回值） ==========
// await：等待数据库操作完成（异步操作必须加）
// db：Drizzle ORM的数据库实例（已提前连接好数据库）
// .insert(表名)：指定要插入数据的目标表（比如storyboards分镜表）
// .values(单条数据对象)：传入要插入的一条数据，对象的key必须和表的字段名一致
// .returning()：【可选】执行插入后，返回包含这条记录的数组（即使单条也是数组）
// 解构数组：单条插入时返回值是长度为1的数组，用[变量名]解构出唯一的元素
const [insertedSingleData] = await db.insert(表名).values(单条数据对象).returning(); 
// insertedSingleData：拿到插入的单条完整数据（包含自增ID、默认值等所有字段）
console.log('单条插入返回的完整数据：', insertedSingleData); // 输出示例：{ id: 101, title: "熊大警觉", duration: 3, ... }


// ========== 批量数据插入语法（带返回值） ==========
// .values([数据对象1, 数据对象2])：传入要插入的多条数据，用数组包裹多个数据对象
// .returning()：【可选】执行批量插入后，返回包含所有插入记录的数组（数组长度=插入条数）
const insertedBatchData = await db.insert(表名).values([数据对象1, 数据对象2]).returning(); 
// insertedBatchData：拿到批量插入的所有完整数据（数组形式，每个元素是一条插入的记录）
console.log('批量插入返回的完整数据数组：', insertedBatchData); 
// 输出示例：[{ id: 101, ... }, { id: 102, ... }]

// 按需遍历批量返回的结果
insertedBatchData.forEach((item, index) => {
  console.log(`第${index+1}条插入的数据：`, item);
});
```
复杂的写法
```ts
// ===================== 第一步：定义经典电商表结构（行业通用设计） =====================
// server/db/schema.ts
// 导入Drizzle ORM的SQLite表构建工具（经典依赖，适配轻量级数据库场景）
import { sqliteTable, integer, text, real, unique, index } from 'drizzle-orm/sqlite-core';
// 导入sql函数：用于生成数据库级默认值（经典设计，避免前端时间/随机值不一致）
import { sql } from 'drizzle-orm';

// ========== 经典表1：用户表（所有系统的核心基础表） ==========
export const users = sqliteTable('users', {
  // 自增主键：经典唯一标识，数据库自动生成，是所有表的基础设计
  id: integer('id').primaryKey({ autoIncrement: true }),
  // 用户名：非空，业务上用户必须有名称（经典必填字段）
  username: text('username').notNull(),
  // 手机号：非空+唯一约束 → 经典防重复注册设计，避免同一手机号多账号
  phone: text('phone').notNull().unique(),
  // 密码：非空（注：生产环境需用bcrypt加密，此处简化为明文，仅作示例）
  password: text('password').notNull(),
  // 创建时间：数据库自动生成当前本地时间 → 经典设计，避免前端时区/客户端时间篡改
  createTime: text('create_time').default(sql`datetime('now', 'localtime')`),
}, (table) => ({
  // 给手机号加索引 → 经典查询优化，加快“按手机号查用户”的速度（高频查询场景）
  phoneIdx: index('user_phone_idx').on(table.phone),
}));

// ========== 经典表2：商品表（电商核心基础表） ==========
export const goods = sqliteTable('goods', {
  // 自增主键：经典唯一标识
  id: integer('id').primaryKey({ autoIncrement: true }),
  // 商品名：非空，核心业务字段
  name: text('name').notNull(),
  // 价格：实数类型（支持小数）+ 非空 → 电商经典数值字段
  price: real('price').notNull(),
  // 分类：非空，用于商品归类（经典商品属性）
  category: text('category').notNull(),
  // 库存：整数+非空+默认0 → 经典库存设计，避免空值导致业务逻辑错误
  stock: integer('stock').notNull().default(0),
  // 创建时间：数据库自动生成
  createTime: text('create_time').default(sql`datetime('now', 'localtime')`),
}, (table) => ({
  // 复合唯一键：商品名+分类 → 经典防重复设计，避免“同分类下重复商品名”
  nameCategoryIdx: unique('goods_name_category_idx').on(table.name, table.category),
}));

// ========== 经典表3：订单表（用户-订单 一对多关联核心表） ==========
export const orders = sqliteTable('orders', {
  // 自增主键
  id: integer('id').primaryKey({ autoIncrement: true }),
  // 订单号：非空+默认随机生成 → 经典订单号设计（hex(randomblob(16))生成32位唯一字符串）
  orderNo: text('order_no').notNull().default(sql`hex(randomblob(16))`),
  // 用户ID：外键关联用户表 + 级联删除 → 经典关联设计：删用户时自动删其订单，避免脏数据
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  // 订单总价：实数+非空 → 经典订单金额字段
  totalPrice: real('total_price').notNull(),
  // 订单状态：非空+默认待支付 → 经典订单状态设计（pending/paid/shipped/completed）
  status: text('status').notNull().default('pending'),
  // 收货地址：非空，电商核心订单字段
  address: text('address').notNull(),
  // 创建时间：数据库自动生成
  createTime: text('create_time').default(sql`datetime('now', 'localtime')`),
});

// ========== 经典表4：订单商品关联表（订单-商品 多对多核心表） ==========
export const orderGoods = sqliteTable('order_goods', {
  // 自增主键
  id: integer('id').primaryKey({ autoIncrement: true }),
  // 订单ID：外键关联订单表 + 级联删除 → 删订单时自动删关联的订单商品
  orderId: integer('order_id').notNull().references(() => orders.id, { onDelete: 'cascade' }),
  // 商品ID：外键关联商品表 + 级联删除 → 删商品时自动删关联的订单商品
  goodsId: integer('goods_id').notNull().references(() => goods.id, { onDelete: 'cascade' }),
  // 商品名：冗余存储 → 经典“快照设计”：下单时记录商品名，避免后续商品名修改导致订单数据不一致
  goodsName: text('goods_name').notNull(),
  // 下单价格：冗余存储 → 经典“价格快照”：记录下单时的价格，避免商品价格变动导致订单金额异常
  price: real('price').notNull(),
  // 购买数量：整数+非空+默认1 → 经典商品购买数量设计
  count: integer('count').notNull().default(1),
});

// ===================== 第二步：数据库连接（经典SQLite配置） =====================
// server/db/connection.ts
// 导入Drizzle ORM的SQLite适配器（经典轻量级数据库适配）
import { drizzle } from 'drizzle-orm/better-sqlite3';
// 导入better-sqlite3（SQLite的Node.js驱动，经典选择）
import Database from 'better-sqlite3';
// 导入上面定义的表结构
import * as schema from './schema';

// 连接SQLite数据库文件（经典配置：文件名为classic_ecommerce.db，不存在则自动创建）
const sqlite = new Database('classic_ecommerce.db');
// 创建Drizzle ORM实例，关联数据库连接和表结构 → 经典初始化方式
export const db = drizzle(sqlite, { schema });

// ===================== 第三步：经典多表插入核心函数（覆盖99%场景） =====================
// server/api/classic-insert.ts
// 导入数据库连接实例
import { db } from '@/server/db/connection';
// 导入所有表结构
import { users, goods, orders, orderGoods } from '@/server/db/schema';
// 导入Drizzle核心工具：eq（精确匹配）、sql（数据库函数）
import { eq, sql } from 'drizzle-orm';
// 导入Nuxt4内置错误处理（经典前端友好提示设计）
import { createError } from 'h3';

/**
 * 经典电商多表插入函数：用户→商品→订单→订单商品
 * 核心设计：
 * 1. 事务原子性：所有表插入要么全成功，要么全失败（避免脏数据）
 * 2. 防重复插入：手机号/商品名+分类唯一约束，冲突时更新
 * 3. 关联ID传递：基础表ID → 关联表外键（实现多表绑定）
 * 4. 数据快照：订单商品冗余存储商品名/价格（保证订单数据稳定）
 * 5. 类型转换/兜底：避免前端传参类型错误/缺失导致报错
 */
export async function classicEcommerceInsert() {
  // 模拟前端传入的经典业务数据（实际开发中由前端接口传参）
  const userForm = { username: '经典用户', phone: '13888888888', password: '123456' };
  const goodsList = [
    { name: '经典T恤', price: '99', category: '服饰', stock: '100' }, // 前端可能传字符串价格/库存
    { name: '经典球鞋', price: '299', category: '鞋类', stock: '50' },
  ];
  const orderForm = { totalPrice: '398', address: '经典市经典区经典路1号' };

  try {
    // ========== 核心：开启事务（多表插入必加！经典原子性保障） ==========
    const result = await db.transaction(async (tx) => {
      // ------------------ 步骤1：插入用户表（单表单条，经典防重复） ------------------
      const [insertedUser] = await tx
        .insert(users) // 指定插入表：用户表
        .values({
          username: userForm.username, // 前端传入的用户名
          phone: userForm.phone, // 前端传入的手机号（唯一键）
          password: userForm.password, // 注：生产环境需加密，此处简化
        })
        .onConflictDoUpdate({ // 经典防重复逻辑：手机号冲突时更新用户名
          target: users.phone, // 冲突字段：手机号（唯一键）
          set: { username: sql`excluded.username` }, // excluded=待插入的新值
        })
        .returning({ id: users.id, username: users.username, phone: users.phone }); // 只返回需要的字段（经典性能优化）
      // 提取用户自增ID → 核心：用于后续订单表关联
      const userId = insertedUser.id;

      // ------------------ 步骤2：插入商品表（单表批量，经典防重复+类型转换） ------------------
      // 预处理商品数据：类型转换+字段兜底（经典前端传参兼容）
      const processedGoods = goodsList.map(good => ({
        name: good.name,
        price: Number(good.price), // 经典转换：前端传字符串价格→数字
        category: good.category,
        stock: Number(good.stock) || 0, // 经典兜底：库存为空则填0
      }));
      const insertedGoods = await tx
        .insert(goods) // 指定插入表：商品表
        .values(processedGoods) // 批量插入预处理后的商品数据
        .onConflictDoUpdate({ // 经典防重复：商品名+分类冲突时更新价格/库存
          target: [goods.name, goods.category], // 复合唯一键
          set: { 
            price: sql`excluded.price`, // 更新价格为新值
            stock: sql`excluded.stock`  // 更新库存为新值
          },
        })
        .returning({ id: goods.id, name: goods.name, price: goods.price }); // 返回商品ID/名称/价格
      // 构建商品名→ID/价格映射 → 经典：方便后续订单商品关联（避免重复查库）
      const goodsMap = new Map(insertedGoods.map(g => [g.name, { id: g.id, price: g.price }]));

      // ------------------ 步骤3：插入订单表（单表单条，经典关联用户） ------------------
      const [insertedOrder] = await tx
        .insert(orders) // 指定插入表：订单表
        .values({
          userId: userId, // 核心：关联用户表ID（实现用户-订单绑定）
          totalPrice: Number(orderForm.totalPrice), // 转换：字符串总价→数字
          address: orderForm.address, // 前端传入的收货地址
        })
        .returning({ id: orders.id, orderNo: orders.orderNo, totalPrice: orders.totalPrice }); // 返回订单核心字段
      // 提取订单自增ID → 核心：用于后续订单商品关联
      const orderId = insertedOrder.id;

      // ------------------ 步骤4：插入订单商品表（单表批量，经典多对多关联） ------------------
      const orderGoodsList = goodsList.map(good => ({
        orderId: orderId, // 核心：关联订单表ID
        goodsId: goodsMap.get(good.name)!.id, // 核心：关联商品表ID（通过映射获取）
        goodsName: good.name, // 经典快照：冗余存储商品名
        price: goodsMap.get(good.name)!.price, // 经典快照：冗余存储下单价格
        count: 1, // 默认购买1件（可由前端传参）
      }));
      const insertedOrderGoods = await tx
        .insert(orderGoods) // 指定插入表：订单商品关联表
        .values(orderGoodsList) // 批量插入关联数据
        .returning(); // 返回所有插入的订单商品数据

      // ========== 事务内返回所有插入结果（经典：方便前端获取完整数据） ==========
      return {
        user: insertedUser, // 用户插入结果
        goods: insertedGoods, // 商品插入结果
        order: insertedOrder, // 订单插入结果
        orderGoods: insertedOrderGoods, // 订单商品插入结果
      };
    });

    // ========== 插入成功：返回标准化结果（经典前端友好格式） ==========
    return {
      code: 200, // 经典状态码：成功
      msg: '经典电商多表插入成功', // 友好提示
      data: result, // 所有插入结果
    };
  } catch (error) {
    // ========== 全局错误处理（经典：服务端日志+前端友好提示） ==========
    console.error('经典电商多表插入失败：', error); // 服务端日志（调试必备）
    // 抛出Nuxt4友好错误，前端可捕获并提示用户
    throw createError({
      statusCode: 500, // 经典状态码：服务器错误
      statusMessage: `经典插入失败：${(error as Error).message}`, // 错误详情
    });
  }
}

// ===================== 第四步：经典调用示例（实际开发中可通过接口触发） =====================
// 调用函数并打印结果（测试用，实际开发中注释掉，由接口调用）
// classicEcommerceInsert().then(res => {
//   console.log('=== 经典多表插入结果 ===', JSON.stringify(res, null, 2));
// }).catch(err => {
//   console.error('=== 经典插入失败 ===', err.message);
// });
```
## 删除
```ts
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { 
  delete as drizzleDelete, eq, inArray, and, gt 
} from 'drizzle-orm';
import Database from 'better-sqlite3';
import { 
  integer, text, sqliteTable, foreignKey 
} from 'drizzle-orm/sqlite-core';

// ====================== 1. 定义关联表结构 ======================
// 主表：用户表
const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }), // 自增ID
  name: text('name').notNull(), // 用户名
  age: integer('age').notNull(), // 年龄
  status: text('status', { enum: ['active', 'inactive'] }).default('active'), // 状态
});

// 子表：帖子表（关联用户表，一对多）
const posts = sqliteTable('posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(), // 帖子标题
  content: text('content'), // 帖子内容
  userId: integer('user_id'), // 关联用户ID
}, (table) => ({
  // 定义外键关联（仅约束，不设置级联删除，避免误删）
  fkPostToUser: foreignKey({
    columns: [table.userId],
    foreignColumns: [users.id],
    name: 'fk_post_user',
  }),
}));

// ====================== 2. 初始化SQLite连接 ======================
// 连接本地SQLite数据库（不存在则自动创建）
const sqliteDb = new Database('test-db.sqlite');
// 开启外键约束（关键！否则外键关联失效）
sqliteDb.pragma('foreign_keys = ON');
// 创建Drizzle ORM实例
const db = drizzle(sqliteDb);

// ====================== 3. 核心业务函数 ======================
/**
 * 初始化测试数据（先清空旧数据，再插入测试用户和帖子）
 */
async function initTestData() {
  // 先清空旧数据（先删子表，再删主表）
  await db.delete(posts);
  await db.delete(users);

  // 插入2个测试用户
  const insertedUsers = await db.insert(users).values([
    { name: '张三', age: 28, status: 'active' }, // id: 1
    { name: '李四', age: 17, status: 'inactive' }, // id: 2
  ]).returning();
  console.log('初始化用户：', insertedUsers);

  // 插入测试帖子（关联上述用户）
  const insertedPosts = await db.insert(posts).values([
    { title: '张三的第一篇帖子', content: 'Hello Drizzle', userId: 1 }, // 关联张三
    { title: '张三的第二篇帖子', content: 'SQLite关联删除', userId: 1 }, // 关联张三
    { title: '李四的帖子', content: '新手教程', userId: 2 }, // 关联李四
  ]).returning();
  console.log('初始化帖子：', insertedPosts);
}

/**
 * 场景1：删除指定用户 + 同步删除其所有帖子（最常用）
 * @param userId 要删除的用户ID
 */
async function deleteUserAndRelatedPosts(userId: number) {
  try {
    // 事务包裹：保证要么都删成功，要么都失败
    await db.transaction(async (tx) => {
      // 第一步：删除该用户的所有帖子（子表）
      const deletedPosts = await tx.delete(posts)
        .where(eq(posts.userId, userId))
        .returning();
      console.log(`删除用户${userId}的帖子：`, deletedPosts);

      // 第二步：删除该用户（主表）
      const deletedUser = await tx.delete(users)
        .where(eq(users.id, userId))
        .returning();
      console.log(`删除的用户：`, deletedUser);
    });
    console.log(`✅ 用户${userId}及其关联帖子删除成功`);
  } catch (error) {
    console.error(`❌ 删除失败：`, error);
  }
}

/**
 * 场景2：按用户条件批量删除帖子（只删子表，不删主表）
 * 示例：删除「年龄<18岁 且 状态为inactive」的用户的所有帖子
 */
async function deletePostsByUserCondition() {
  try {
    // 子查询：先筛选出符合条件的用户ID
    const targetUserIds = db.select({ id: users.id })
      .from(users)
      .where(and(
        eq(users.status, 'inactive'), // 状态为inactive
        gt(users.age, 0), // 年龄>0（兜底）
        users.age.lt(18) // 年龄<18
      ));

    // 删除这些用户的所有帖子
    const deletedPosts = await db.delete(posts)
      .where(inArray(posts.userId, targetUserIds))
      .returning();

    if (deletedPosts.length === 0) {
      console.log('📌 无符合条件的帖子需要删除');
      return;
    }
    console.log(`✅ 按条件删除的帖子：`, deletedPosts);
  } catch (error) {
    console.error(`❌ 按条件删帖失败：`, error);
  }
}

// ====================== 4. 执行Demo ======================
async function runDemo() {
  console.log('===== 初始化测试数据 =====');
  await initTestData();

  console.log('\n===== 场景1：删除用户1及关联帖子 =====');
  await deleteUserAndRelatedPosts(1);

  console.log('\n===== 场景2：按条件删除帖子 =====');
  await deletePostsByUserCondition();

  // 关闭数据库连接
  sqliteDb.close();
  console.log('\n===== Demo执行完成 =====');
}

// 启动Demo
runDemo();
```
## 跟新
```ts
// 更新单个字段：把用户2的年龄改成18
async function updateSingleField() {
  const result = await db.update(users)
    .set({ age: 18 }) // 核心：指定要改的字段（age）和新值（18）
    .where(eq(users.id, 2)) // 限定只改ID=2的用户
    .returning();

  console.log('更新后的用户：', result);
  // 输出：[{ id: 2, name: '李四', age: 18, status: 'inactive' }]
}
```