import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL;
const pool = postgres(connectionString, { max: 10 });

export const db = drizzle(pool);
