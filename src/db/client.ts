import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

function requireDatabaseUrl(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL is not set');
  }
  return url;
}

// HTTP serverless driver: a perfect fit for Vercel server components — one
// stateless fetch per query, no connection pool to manage, no Neon Function.
const sql = neon(requireDatabaseUrl());

export const db = drizzle(sql, { schema });
