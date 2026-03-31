import initSqlJs, { Database as SqlJsDatabase } from "sql.js";
import { drizzle } from "drizzle-orm/sql-js";
import * as schema from "./schema";
import * as fs from "fs";
import * as path from "path";

const DB_PATH = process.env.DATABASE_URL || "./dev.db";

let dbInstance: SqlJsDatabase | null = null;
let drizzleInstance: any = null;
let sqlJs: any = null;

async function initializeDatabase() {
  try {
    sqlJs = await initSqlJs();

    let filebuffer: Buffer | null = null;
    if (fs.existsSync(DB_PATH)) {
      filebuffer = fs.readFileSync(DB_PATH);
    }

    dbInstance = new sqlJs.Database(filebuffer);
    drizzleInstance = drizzle(dbInstance, { schema });

    return drizzleInstance;
  } catch (error) {
    console.error("Database initialization error:", error);
    throw error;
  }
}

export async function getDb() {
  if (!drizzleInstance) {
    await initializeDatabase();
  }
  return drizzleInstance;
}

export async function saveDatabase() {
  if (dbInstance) {
    try {
      const data = dbInstance.export();
      const buffer = Buffer.from(data);
      const dir = path.dirname(DB_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DB_PATH, buffer);
    } catch (error) {
      console.error("Error saving database:", error);
    }
  }
}

// Initialize on module load
initializeDatabase().catch(console.error);

export const db = drizzleInstance;
export type DB = typeof drizzleInstance;
