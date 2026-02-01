import * as p from "drizzle-orm/sqlite-core";

export const usersTable = p.sqliteTable("users", {
  // SQLite 自增主键
  id: p.integer().primaryKey({ autoIncrement: true }),

  // 字符串字段
  username: p.text().notNull().unique(),

  password: p.text().notNull(),

  role: p.text(),

  // 创建时间
  createdAt: p.integer("created_at", { mode: "timestamp" }),
});
// export type Message = p.InferModel<typeof messagesTable>;
// export type NewMessage = p.InferModel<typeof messagesTable, "insert">;
// export const loginTable = p.sqliteTable("login", {
//   id: p.integer().primaryKey({ autoIncrement: true }),
//   name: p.text().notNull().unique(),
//   // ✅ 核心：外键字段，关联 usersTable 的 id 主键
//   userId: p
//     .integer("user_id")
//     .notNull()
//     .unique() // 登录账号必须关联一个用户
//     .references(() => usersTable.id, {
//       onDelete: "cascade", // 级联删除：删除用户时，自动删除对应的登录记录
//       onUpdate: "cascade", // 级联更新：用户 id 变更时，登录表的 userId 同步更新
//     }),
//   password: p.text().notNull(),
//   createdAt: p.integer("created_at", { mode: "timestamp" }),
// });、
