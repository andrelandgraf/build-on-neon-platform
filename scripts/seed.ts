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
    sortOrder: 2,
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
    sortOrder: 4,
  },
  {
    slug: 'vibecastly',
    name: 'Vibecastly',
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
    liveUrl: 'https://vibecastly.vercel.app',
    repoUrl: 'https://github.com/andrelandgraf/vibecastly',
    screenshotKey: 'vibecastly.png',
    screenshotUrl: shot('vibecastly.png'),
    accent: 'cyan',
    featured: true,
    sortOrder: 3,
  },
  {
    slug: 'chat-with-neon',
    name: 'Chat with Neon',
    tagline: 'Realtime group chat with an @neon AI sidekick.',
    description:
      'A shared realtime chat: sign in, message everyone over WebSockets, attach images, and set a profile picture. A moderation agent screens every message, and tagging @neon summons an AI assistant that knows Neon (docs + agent skills) and replies right in the chat.',
    services: ['Auth', 'Functions', 'Object Storage', 'AI Gateway', 'Postgres'],
    stack: [
      'Next.js frontend on Vercel (Neon Auth)',
      'Realtime WebSocket server on Neon Functions',
      'Moderation + @neon assistant agents via Neon AI Gateway',
      'Messages in Postgres, images & avatars in Object Storage',
    ],
    liveUrl: 'https://chat-with-neon.vercel.app/',
    repoUrl: 'https://github.com/andrelandgraf/chat-with-neon',
    screenshotKey: 'chat-with-neon.png',
    screenshotUrl: shot('chat-with-neon.png'),
    accent: 'violet',
    featured: true,
    sortOrder: 1,
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
