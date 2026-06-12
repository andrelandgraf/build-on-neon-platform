import { defineConfig } from '@neondatabase/config/v1';

// "Build on Neon Platform" runs entirely on Vercel — there is no Neon Function.
// The app reads showcase rows from Postgres directly (serverless driver) and
// serves screenshots straight from a public_read Object Storage bucket, so the
// browser can <img src> them with no credentials and no proxy in the middle.
export default defineConfig({
  preview: {
    buckets: {
      // Anonymous reads (public URLs), authenticated writes (CLI upload).
      screenshots: { access: 'public_read' },
    },
  },
});
