import { createClient } from "@libsql/client";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const projectRoot = path.resolve(__dirname, "../../");
// Note: We use sqlite_v2.db as per previous changes
const dbPath = path.resolve(projectRoot, "server/db/sqlite_v2.db");
export const backupDir = path.resolve(projectRoot, "backups");

// Ensure backup dir exists
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

export async function backup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupPath = path.resolve(backupDir, `backup-${timestamp}.sqlite`);

  console.log(`Starting database backup...`);
  console.log(`Source: ${dbPath}`);
  
  if (!fs.existsSync(dbPath)) {
      throw new Error(`Database file not found at ${dbPath}`);
  }

  // Create client directly to run VACUUM command
  const client = createClient({
    url: `file:${dbPath}`,
  });

  try {
    console.log(`Executing VACUUM INTO '${backupPath}'...`);
    // Escape single quotes in path if necessary
    await client.execute(`VACUUM INTO '${backupPath.replace(/'/g, "''")}'`);
    console.log(`✅ Backup created successfully at:`);
    console.log(backupPath);
    return backupPath;
  } catch (error) {
    console.error("❌ Backup failed:", error);
    throw error;
  } finally {
    client.close();
  }
}

// Run if called directly
if (process.argv[1] === __filename) {
    backup().catch(() => process.exit(1));
}
