import Link from "next/link";
import { asc } from "drizzle-orm";
import { db } from "@/db/client";
import { showcaseApps } from "@/db/schema";
import { ShowcaseCard } from "@/components/showcase-card";
import { NeonMark } from "@/components/neon-mark";
import { GitHubIcon, BoltIcon } from "@/components/icons";

// Content lives in Postgres — read it fresh on every request.
export const dynamic = "force-dynamic";

const PLATFORM_SERVICES = [
  "Postgres",
  "Auth",
  "Functions",
  "Object Storage",
  "AI Gateway",
];

const REPO_URL = "https://github.com/andrelandgraf/build-on-neon-platform";

export default async function Home() {
  const apps = await db
    .select()
    .from(showcaseApps)
    .orderBy(asc(showcaseApps.sortOrder));

  return (
    <>
      {/* ── header ── */}
      <header className="sticky top-0 z-20 border-b border-border bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <NeonMark className="h-7 w-7" />
            <span className="text-sm font-semibold tracking-tight">
              Build on <span className="text-neon">Neon</span> Platform
            </span>
          </Link>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-sm text-muted transition-colors hover:border-white/20 hover:text-foreground"
          >
            <GitHubIcon className="h-4 w-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </header>

      <main className="flex-1">
        {/* ── hero ── */}
        <section className="relative overflow-hidden">
          <div className="hero-glow pointer-events-none absolute inset-0 -z-10" />
          <div className="grid-bg pointer-events-none absolute inset-0 -z-10" />
          <div className="mx-auto max-w-6xl px-6 pt-20 pb-14 text-center sm:pt-28">
            <div className="float-in inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
              </span>
              The backend for apps and agents
            </div>

            <h1 className="float-in mx-auto mt-6 max-w-3xl text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Build it all on the{" "}
              <span className="text-neon">Neon platform</span>.
            </h1>

            <p className="float-in mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Postgres, Auth, Functions, Object Storage, and an AI Gateway — one
              serverless backend that branches together. Here are real apps that
              prove it.
            </p>

            <div className="float-in mt-8 flex flex-wrap items-center justify-center gap-2">
              {PLATFORM_SERVICES.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground/90"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* meta-note: this page IS a Neon demo */}
            <div className="float-in mx-auto mt-12 flex max-w-2xl items-start gap-3 rounded-xl border border-border bg-card px-4 py-3 text-left text-sm text-muted">
              <BoltIcon className="mt-0.5 h-4 w-4 shrink-0 text-neon" />
              <p>
                Meta moment: this page is itself a Neon demo. Its content lives in{" "}
                <span className="text-foreground">Neon Postgres</span> and the
                screenshots stream from a{" "}
                <span className="text-foreground">
                  Neon Object Storage public bucket
                </span>
                , served straight from Vercel — no backend function in the loop.
              </p>
            </div>
          </div>
        </section>

        {/* ── showcase grid ── */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Built on Neon
            </h2>
            <span className="text-sm text-muted">
              {apps.length} {apps.length === 1 ? "app" : "apps"}
            </span>
          </div>

          {apps.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center text-muted">
              No apps yet. Run <code className="text-foreground">bun run seed</code>{" "}
              to populate the showcase.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {apps.map((app, i) => (
                <ShowcaseCard key={app.id} app={app} index={i} />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* ── footer ── */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-muted sm:flex-row">
          <div className="flex items-center gap-2.5">
            <NeonMark className="h-5 w-5" />
            <span>Built on the Neon platform · Auth · Functions · Storage · AI Gateway · Postgres</span>
          </div>
          <a
            href="https://neon.com"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            neon.com →
          </a>
        </div>
      </footer>
    </>
  );
}
