import initSqlJs, { Database as SqlJsDatabase } from "sql.js";
import { drizzle } from "drizzle-orm/sql-js";
import * as schema from "./schema";
import * as fs from "fs";
import * as path from "path";

const DB_PATH = process.env.DATABASE_URL || "./dev.db";

let dbInstance: SqlJsDatabase | null = null;
let drizzleInstance: any = null;
let sqlJs: any = null;
let initPromise: Promise<void> | null = null;

async function initializeDatabase() {
  if (drizzleInstance) return;
  
  try {
    sqlJs = await initSqlJs();

    let filebuffer: Buffer | null = null;
    if (fs.existsSync(DB_PATH)) {
      filebuffer = fs.readFileSync(DB_PATH);
    }

    dbInstance = new sqlJs.Database(filebuffer);
    if (!dbInstance) {
      throw new Error("Failed to create database instance");
    }
    drizzleInstance = drizzle(dbInstance, { schema });
  } catch (error) {
    console.error("Database initialization error:", error);
    throw error;
  }
}

export async function getDb() {
  if (!drizzleInstance) {
    if (!initPromise) {
      initPromise = initializeDatabase();
    }
    await initPromise;
  }
  return drizzleInstance!;
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

// Initialize immediately
initPromise = initializeDatabase().catch(console.error);

// Export a wrapper that will work after initialization
export let db: any = new Proxy({}, {
  get(target: any, prop: string) {
    if (!drizzleInstance) {
      throw new Error(`Database not initialized. Cannot access property: ${prop}`);
    }
    return Reflect.get(drizzleInstance, prop);
  },
  has(target: any) {
    return drizzleInstance != null;
  },
});

export type DB = typeof drizzleInstance;
