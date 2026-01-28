/**
 * Nuxt4 数据库核心连接配置（零编译纯 JS 版，Windows 专用）
 * 驱动：@libsql/client + drizzle-orm/sqlite-proxy（无 C++ 编译，直接可用）
 */
import { drizzle } from "drizzle-orm/sqlite-proxy";
import { createClient } from "@libsql/client";
import path from "path";
import { consola } from "consola";

// 数据库文件路径（与原有路径一致：server/db/sqlite.db）
const dbDir = path.resolve(process.cwd(), "server/db");
const dbPath = path.resolve(dbDir, "sqlite.db");

// 创建 LibSQL 客户端（本地 SQLite 文件模式，纯 JS 实现）
export const libsqlClient = createClient({
  url: `file:${dbPath}`, // 本地文件协议，固定写法
});

// 创建 Drizzle ORM 实例（全局导出，供校验插件/业务代码使用）
export const db = drizzle(libsqlClient, {
  logger: process.env.NODE_ENV === "development", // 开发环境打印 SQL 日志
});

// 导出数据库路径（供校验插件使用，保持原有逻辑兼容）
export { dbPath };
