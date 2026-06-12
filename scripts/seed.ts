import { config as loadEnv } from 'dotenv';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { showcaseApps, type NewShowcaseApp } from '../src/db/schema';

loadEnv({ path: '.env.local' });

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error('DATABASE_URL is not set');

// Public_read bucket endpoint — every object resolves at <endpoint>/<bucket>/<key>.
const endpoint = process.env.AWS_ENDPOINT_URL_S3;
if (!endpoint) throw new Error('AWS_ENDPOINT_URL_S3 is not set (run `neonctl deploy`)');
const BUCKET = 'screenshots';
const shot = (key: string) => `${endpoint}/${BUCKET}/${key}`;

const apps: NewShowcaseApp[] = [
  {
    slug: 'rate-my-pricing',
    name: 'Rate My Pricing',
    tagline: 'How confusing is that pricing page?',
    description:
      'Paste any pricing URL and an AI agent reads it, untangles the tiers, and hands out two scores — pricing clarity and agent friendliness. Like Lighthouse, but for pricing pages.',
    services: ['Postgres', 'Functions', 'AI Gateway'],
    stack: [
      'Next.js frontend on Vercel',
      'Judge agent on Neon Functions',
      'LLM calls via Neon AI Gateway',
      'Ratings cached in Neon Postgres',
    ],
    liveUrl: 'https://ratemypricing.vercel.app/',
    repoUrl: 'https://github.com/andrelandgraf/rate-my-pricing',
    screenshotKey: 'rate-my-pricing.png',
    screenshotUrl: shot('rate-my-pricing.png'),
    accent: 'amber',
    featured: true,
    sortOrder: 1,
  },
  {
    slug: 'branch-explorer',
    name: 'Branch Explorer',
    tagline: 'Fork your database and storage — instantly.',
    description:
      'Fork any Neon branch to copy its Postgres database and object storage together, then explore tables, rows, and files. Mutate a fork, swap back to its parent — the parent is untouched. Click around; it\u2019s really fast.',
    services: ['Postgres', 'Functions', 'Object Storage', 'AI Gateway'],
    stack: [
      'TanStack Router SPA on Vercel',
      'JSON API on Neon Functions',
      'Image-gen agent on Neon Functions',
      'Assets in Object Storage, tables in Postgres',
    ],
    liveUrl: 'https://branch-explorer.vercel.app/?b=br-late-credit-w2frw287',
    repoUrl: 'https://github.com/andrelandgraf/branch-explorer',
    screenshotKey: 'branch-explorer.png',
    screenshotUrl: shot('branch-explorer.png'),
    accent: 'emerald',
    featured: true,
    sortOrder: 2,
  },
  {
    slug: 'neon-image-studio',
    name: 'Neon Image Studio',
    tagline: 'Cast anyone into any scene.',
    description:
      'Upload photos of your teammates, @-mention them in a prompt, and an agent uses their faces as the starting point. Your whole team shares one collaborative gallery.',
    services: ['Auth', 'Functions', 'Object Storage', 'AI Gateway', 'Postgres'],
    stack: [
      'Next.js frontend on Vercel',
      'Neon Auth — agent gated by JWT',
      'Image-gen agent on Neon Functions',
      'Assets in Object Storage, tables in Postgres',
    ],
    liveUrl: 'https://neon-image-studio.vercel.app/',
    repoUrl: 'https://github.com/andrelandgraf/vibecast',
    screenshotKey: 'neon-image-studio.png',
    screenshotUrl: shot('neon-image-studio.png'),
    accent: 'cyan',
    featured: true,
    sortOrder: 3,
  },
];

async function main() {
  const sql = neon(databaseUrl!);
  const db = drizzle(sql, { schema: { showcaseApps } });

  await db.delete(showcaseApps);
  await db.insert(showcaseApps).values(apps);

  const rows = await db.select().from(showcaseApps);
  console.log(`Seeded ${rows.length} showcase apps:`);
  for (const r of rows.sort((a, b) => a.sortOrder - b.sortOrder)) {
    console.log(`  • ${r.name} — ${r.screenshotUrl}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
