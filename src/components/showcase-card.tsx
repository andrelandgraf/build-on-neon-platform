import Image from "next/image";
import type { ShowcaseApp } from "@/db/schema";
import { ServiceBadge } from "./service-badge";
import { ArrowUpRightIcon, CodeIcon } from "./icons";

const ACCENT: Record<string, { glow: string; dot: string }> = {
  amber: { glow: "from-amber-400/25", dot: "bg-amber-400" },
  emerald: { glow: "from-emerald-400/25", dot: "bg-emerald-400" },
  cyan: { glow: "from-cyan-400/25", dot: "bg-cyan-400" },
  violet: { glow: "from-violet-400/25", dot: "bg-violet-400" },
};

export function ShowcaseCard({ app, index }: { app: ShowcaseApp; index: number }) {
  const accent = ACCENT[app.accent] ?? ACCENT.emerald;

  return (
    <article
      className="group float-in relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-white/15"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      {/* accent glow on hover */}
      <div
        className={`pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-gradient-to-b ${accent.glow} to-transparent opacity-0 blur transition-opacity duration-300 group-hover:opacity-100`}
      />

      {/* screenshot */}
      <a
        href={app.liveUrl}
        target="_blank"
        rel="noreferrer"
        className="relative block aspect-[16/10] overflow-hidden border-b border-border bg-black/40"
      >
        <Image
          src={app.screenshotUrl}
          alt={`${app.name} screenshot`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 580px"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </a>

      {/* body */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">{app.name}</h3>
          <p className="mt-0.5 text-sm font-medium text-neon">{app.tagline}</p>
        </div>

        <p className="text-sm leading-relaxed text-muted">{app.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {app.services.map((s) => (
            <ServiceBadge key={s} service={s} />
          ))}
        </div>

        <ul className="mt-1 space-y-1.5 border-t border-border pt-4">
          {app.stack.map((line) => (
            <li key={line} className="flex items-start gap-2 text-xs text-muted">
              <span className={`mt-1.5 h-1 w-1 shrink-0 rounded-full ${accent.dot}`} />
              <span>{line}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center gap-2 pt-2">
          <a
            href={app.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-neon px-3 py-2 text-sm font-semibold text-[#07090c] transition-colors hover:bg-white"
          >
            Live demo
            <ArrowUpRightIcon className="h-4 w-4" />
          </a>
          <a
            href={app.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-white/20 hover:bg-white/5"
          >
            <CodeIcon className="h-4 w-4" />
            Code
          </a>
        </div>
      </div>
    </article>
  );
}
