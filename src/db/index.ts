import { env } from "@/env.js"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

export const connection = postgres(env.DATABASE_URL)

export const db = drizzle(connection)
