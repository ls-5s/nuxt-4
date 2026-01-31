import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import readline from "readline";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, "../../");
const dbPath = path.resolve(projectRoot, "server/db/sqlite_v2.db");
const backupDir = path.resolve(projectRoot, "backups");

async function confirm(question: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === "y" || answer.toLowerCase() === "yes");
    });
  });
}

async function restore() {
  const args = process.argv.slice(2);
  let sourcePath = "";

  // If the first arg is not a flag (doesn't start with -), assume it's a file path
  const fileArg = args.find((arg) => !arg.startsWith("-"));

  if (fileArg) {
    sourcePath = path.resolve(process.cwd(), fileArg);
  } else {
    // Find latest backup
    if (!fs.existsSync(backupDir)) {
      console.error("❌ No backups directory found.");
      process.exit(1);
    }
    const files = fs
      .readdirSync(backupDir)
      .filter((f) => f.startsWith("backup-") && f.endsWith(".sqlite"));
    if (files.length === 0) {
      console.error("❌ No backup files found.");
      process.exit(1);
    }
    // Sort by name (which contains timestamp) descending
    files.sort().reverse();
    sourcePath = path.resolve(backupDir, files[0]);
  }

  if (!fs.existsSync(sourcePath)) {
    console.error(`❌ Backup file not found: ${sourcePath}`);
    process.exit(1);
  }

  console.log(`Preparing to restore database...`);
  console.log(`Source: ${sourcePath}`);
  console.log(`Target: ${dbPath}`);
  console.log(`⚠️  WARNING: This will OVERWRITE the current database.`);
  console.log(`⚠️  Please ensure the application is STOPPED before proceeding.`);

  // Skip confirmation if --force is passed (for automation)
  if (!args.includes("--force") && !args.includes("-y")) {
    const confirmed = await confirm("Are you sure you want to proceed? (y/N): ");
    if (!confirmed) {
      console.log("Operation cancelled.");
      process.exit(0);
    }
  }

  try {
    fs.copyFileSync(sourcePath, dbPath);
    console.log("✅ Restore completed successfully.");
  } catch (e: any) {
    console.error("❌ Restore failed:", e.message);
    if (e.code === "EBUSY" || e.code === "EPERM") {
      console.error(
        "The database file is likely in use. Please stop the application (npm run dev) and try again."
      );
    }
    process.exit(1);
  }
}

restore();
