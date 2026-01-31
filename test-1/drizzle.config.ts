import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./server/db/schema",
  out: "./server/db/migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: "file:server/db/sqlite_v2.db",
  },
  verbose: true,
  strict: true,
});
