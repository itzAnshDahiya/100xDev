import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "@/../../db/schema";

// Initialize better-sqlite3
const sqlite = new Database(process.env.DATABASE_URL || "./dev.db");
sqlite.pragma("journal_mode = WAL");

// Create drizzle instance
export const db = drizzle(sqlite, { schema });

export type Database = typeof db;

