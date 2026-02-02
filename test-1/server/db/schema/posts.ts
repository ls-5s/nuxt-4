import * as p from "drizzle-orm/sqlite-core";
import { usersTable } from "./users";

export const postsTable = p.sqliteTable("posts", {
  id: p.integer().primaryKey({ autoIncrement: true }),
  title: p.text().notNull(),
  content: p.text().notNull(),
  userId: p.integer("user_id").references(() => usersTable.id), // 外键关联
  createdAt: p.integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});
