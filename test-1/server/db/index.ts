import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import path from "path";
import * as schema from "./schema";

const dbDir = path.resolve(process.cwd(), "server/db");
export const dbPath = path.resolve(dbDir, "sqlite.db");

export const libsqlClient = createClient({
  url: `file:${dbPath}`,
});

export const db = drizzle(libsqlClient, {
  schema,
  logger: process.env.NODE_ENV === "development",
});

export * from "./schema";
