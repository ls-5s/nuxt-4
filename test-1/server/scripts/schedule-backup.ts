import { backup } from "./db-backup";

// Default interval: 24 hours
// Can be overridden by env var BACKUP_INTERVAL_MS
const INTERVAL_MS = process.env.BACKUP_INTERVAL_MS
  ? parseInt(process.env.BACKUP_INTERVAL_MS)
  : 24 * 60 * 60 * 1000;

console.log(`🚀 Starting database backup scheduler.`);
console.log(`⏱️  Interval: ${INTERVAL_MS / 1000 / 60} minutes`);

async function runBackup() {
  try {
    console.log(`\n[${new Date().toLocaleString()}] Triggering scheduled backup...`);
    await backup();
  } catch (error) {
    console.error(`[${new Date().toLocaleString()}] ❌ Scheduled backup failed:`, error);
  }

  scheduleNext();
}

function scheduleNext() {
  const nextTime = new Date(Date.now() + INTERVAL_MS);
  console.log(`📅 Next backup scheduled for: ${nextTime.toLocaleString()}`);

  setTimeout(runBackup, INTERVAL_MS);
}

// Start the process
scheduleNext();
