# Build on Neon Platform

A showcase of real apps built on the **Neon platform** — Postgres, Auth, Functions, Object Storage, and the AI Gateway.

**Live demo:** https://build-on-neon-platform.vercel.app

The twist: this site is itself a Neon demo. Its content lives in **Neon Postgres** and every screenshot streams from a **Neon Object Storage public bucket** — served **straight from Vercel, with no Neon Function in the loop**.

```
Browser ──► Vercel (Next.js, server components)
                 ├─ @neondatabase/serverless ──► Neon Postgres   (showcase rows)
                 └─ <img src> ─────────────────► Neon Object Storage (public_read bucket)
```

Because the screenshots live in a `public_read` bucket, the browser reads them over anonymous, stable public URLs — no presigning, no proxy, no credentials shipped to the edge. The only secret the app needs is `DATABASE_URL`.

## How it differs from the apps it showcases

Most Neon-platform demos put a **Neon Function** in front of Object Storage (the Function holds the S3 credential and serves objects via presigned URLs). This one deliberately doesn't: a `public_read` bucket means Vercel can render the images directly, so the entire backend is just Postgres + a public bucket.

## Stack

- **Next.js 15 (App Router)** on **Vercel** — server components only, `force-dynamic` so the showcase reads Postgres on every request.
- **Neon Postgres** via `@neondatabase/serverless` (HTTP driver — one stateless fetch per query, ideal for serverless).
- **Drizzle ORM** for the schema + typed queries.
- **Neon Object Storage** `public_read` bucket for the screenshots.
- Declared as infrastructure-as-code in [`neon.ts`](./neon.ts).

## Project layout

```
build-on-neon-platform/
├── neon.ts                 # Neon IaC: the public_read "screenshots" bucket (no functions)
├── drizzle.config.ts
├── scripts/seed.ts         # seeds showcase rows + builds public screenshot URLs
└── src/
    ├── db/
    │   ├── schema.ts       # showcase_apps table
    │   └── client.ts       # neon-http + drizzle
    ├── app/                # layout + page (the showcase, a server component)
    └── components/         # showcase card, service badges, icons, logomark
```

## Local development

```bash
bun install

# link the Neon project + pull env (DATABASE_URL + storage vars) into .env.local
neonctl link
neonctl deploy            # provision the public_read bucket from neon.ts
bun run db:push           # apply the Drizzle schema

# upload screenshots into the public bucket (authenticated write via the CLI)
neonctl bucket object put screenshots/<key>.png --file <local.png> --content-type image/png

bun run seed              # seed showcase rows (reads AWS_ENDPOINT_URL_S3 to build URLs)
bun run dev               # http://localhost:3000
```

> Object Storage is a Neon preview feature, available on new projects in `us-east-2`.

## Deploy

```bash
vercel link
vercel env add DATABASE_URL production   # the pooled Neon connection string
vercel deploy --prod
```

The app only needs `DATABASE_URL` at runtime — screenshots are public URLs already stored in Postgres.

---

Built as a demo of the Neon backend platform (Postgres · Auth · Functions · Object Storage · AI Gateway).
