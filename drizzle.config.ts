import { config as loadEnv } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

loadEnv({ path: '.env.local' });

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error('DATABASE_URL is not set (expected in .env.local)');
}

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  schemaFilter: ['public'],
  dbCredentials: { url },
});
