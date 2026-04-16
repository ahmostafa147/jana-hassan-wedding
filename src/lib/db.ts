import { neon } from "@neondatabase/serverless";

export function getDb() {
  if (!process.env.POSTGRES_URL) {
    throw new Error("POSTGRES_URL environment variable is not set");
  }
  return neon(process.env.POSTGRES_URL);
}
