import * as p from "drizzle-orm/sqlite-core";

export const usersTable = p.sqliteTable("users", {
  // SQLite 自增主键
  id: p.integer().primaryKey({ autoIncrement: true }),

  // 字符串字段
  username: p.text().notNull().unique(),

  password: p.text().notNull(),

  // 创建时间
  createdAt: p.integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});
