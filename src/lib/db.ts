import { neon } from "@neondatabase/serverless";

export function getDb() {
  const url = process.env.POSTGRES_URL || process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL;
  if (!url) {
    throw new Error("No database URL found. Set POSTGRES_URL or DATABASE_URL in environment variables.");
  }
  return neon(url);
}
