import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema.ts",
  driver: "better-sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL || "./dev.db",
  },
});
