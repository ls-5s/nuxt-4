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
// 导入 Drizzle ORM SQLite 适配器 + SQLite 驱动
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
// 导入 Nuxt 4 内置日志（替代 console，更贴合 Nuxt 生态）
import { consola } from 'consola';
// 导入路径模块（处理 SQLite 数据库文件绝对路径）
import path from 'path';
import { fileURLToPath } from 'url';

// ====================== Nuxt 4 ESM 环境适配（解决 __dirname 缺失）======================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ====================== 1. 创建 SQLite 数据库实例（指定数据库文件路径）======================
// 数据库文件生成在 server/db/ 目录下，命名为 sqlite.db（可自定义，如 blog.db）
const sqliteDb = new Database(path.join(__dirname, 'sqlite.db'), {
  // 开发环境开启日志（查看执行的 SQL 语句），生产环境可关闭
  verbose: process.env.NODE_ENV === 'development' ? console.log : null,
});

// ====================== 2. 创建 Drizzle ORM 全局连接实例 ======================
// 关联数据库实例，开发环境开启 logger（控制台打印 SQL），生产环境关闭
export const db = drizzle(sqliteDb, {
  logger: process.env.NODE_ENV === 'development',
});

// ====================== 3. 连接成功/失败提示（方便开发调试）======================
try {
  // 执行简单查询验证连接
  sqliteDb.prepare('SELECT 1;').run();
  consola.success('✅ SQLite + Drizzle ORM 数据库连接成功（全局单例）');
  consola.info(`📂 数据库文件路径：${path.join(__dirname, 'sqlite.db')}`);
} catch (error) {
  consola.fatal('❌ SQLite + Drizzle ORM 数据库连接失败', error);
  // 连接失败直接终止服务
  process.exit(1);
}
```
