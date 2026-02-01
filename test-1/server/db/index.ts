// ========================
// Drizzle ORM 数据库连接配置文件
// 核心作用：建立Node.js与本地SQLite（libsql）数据库的连接，配置ORM核心规则
// ========================

// 1. 导入核心依赖
// 导入Drizzle ORM针对libsql数据库的连接函数（libsql兼容SQLite本地文件）
import { drizzle } from "drizzle-orm/libsql";
// 导入libsql客户端创建函数（负责和SQLite文件建立底层连接）
import { createClient } from "@libsql/client";
// Node.js内置路径处理模块：解决不同系统（Windows/Linux/Mac）路径兼容问题
import path from "path";
// 导入自定义的数据库表结构（比如usersTable、loginTable、userGroupTable等）
import * as schema from "./schema";

// 2. 配置数据库文件的绝对路径（避免相对路径导致的跨系统/跨目录错误）
// 2.1 确定数据库文件夹路径：项目根目录/server/db
const dbDir = path.resolve(
  process.cwd(), // 获取当前Node.js进程的项目根目录
  "server/db" // 数据库文件夹相对路径
);
// 2.2 确定数据库文件路径：项目根目录/server/db/sqlite_v2.db
export const dbPath = path.resolve(dbDir, "sqlite_v2.db");

// 3. 创建libsql客户端（底层数据库连接，Drizzle依赖这个客户端通信）
export const libsqlClient = createClient({
  // 连接本地SQLite文件：file:前缀是libsql识别本地文件的标识
  url: `file:${dbPath}`,
});

// 4. 创建Drizzle ORM实例（核心：封装底层连接，提供类型安全的增删改查API）
export const db = drizzle(libsqlClient, {
  // 关联自定义表结构：提供类型提示、自动生成SQL、支持数据库迁移
  schema,
  // 开发环境开启SQL日志（控制台打印执行的原生SQL），生产环境关闭（避免泄露/性能损耗）
  // process.env.NODE_ENV：Node.js环境变量，开发环境值为development，生产为production
  logger: process.env.NODE_ENV === "development",
  // ✅ 核心配置：开启驼峰↔蛇形命名自动映射
  // 代码中用驼峰（如userId）→ 数据库中自动转蛇形（user_id）
  // 数据库中蛇形（login_name）→ 代码中自动转驼峰（loginName）
  casing: "snake_case",
});

// 5. 统一导出表结构：其他文件只需导入此文件，即可同时获取db实例和所有表结构
// 示例：import { db, usersTable, loginTable } from "./db"
export * from "./schema";
