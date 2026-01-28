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
