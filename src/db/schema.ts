import { pgTable, text, integer, boolean, timestamp, jsonb } from 'drizzle-orm/pg-core';

// A single showcase entry: one app built on the Neon platform.
// State lives here in Postgres; the screenshot bytes live in Neon Object
// Storage and are referenced by their public URL.
export const showcaseApps = pgTable('showcase_apps', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  // Stable, human-friendly identifier (also the object-storage key prefix).
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  tagline: text('tagline').notNull(),
  description: text('description').notNull(),
  // Which Neon platform services the app leans on (rendered as badges).
  services: jsonb('services').$type<string[]>().notNull().default([]),
  // Free-form stack lines (frontend, API, agent, storage, ...).
  stack: jsonb('stack').$type<string[]>().notNull().default([]),
  liveUrl: text('live_url').notNull(),
  repoUrl: text('repo_url').notNull(),
  // Object-storage key + the public URL it resolves to (public_read bucket).
  screenshotKey: text('screenshot_key').notNull(),
  screenshotUrl: text('screenshot_url').notNull(),
  // Tailwind-ish accent token used for the card glow.
  accent: text('accent').notNull().default('emerald'),
  featured: boolean('featured').notNull().default(false),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export type ShowcaseApp = typeof showcaseApps.$inferSelect;
export type NewShowcaseApp = typeof showcaseApps.$inferInsert;
