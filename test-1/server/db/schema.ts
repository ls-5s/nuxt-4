// 先导入 sqlite-core 并别名化为 p（这是代码中 p 的来源，必须有）
import * as p from "drizzle-orm/sqlite-core";

// 链式调用写法
export const usersTable = p.sqliteTable("users", {
  // SQLite 自增主键
  id: p.integer().primaryKey({ autoIncrement: true }),

  // 字符串字段：text() 是 SQLite 最通用的字符串类型
  username: p.text().notNull().unique(),

  password: p.text().notNull(),

  // 整数字段：timestamp 存创建时间
  createdAt: p.integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const postsTable = p.sqliteTable("posts", {
  id: p.integer().primaryKey({ autoIncrement: true }),
  title: p.text().notNull(),
  content: p.text().notNull(),
  userId: p.integer("user_id").references(() => usersTable.id), // 外键关联
  createdAt: p.integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});
