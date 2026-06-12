// Static class strings per service so Tailwind keeps them at build time.
const SERVICE_STYLES: Record<string, string> = {
  Postgres: "border-sky-400/25 bg-sky-400/10 text-sky-300",
  Auth: "border-violet-400/25 bg-violet-400/10 text-violet-300",
  Functions: "border-amber-400/25 bg-amber-400/10 text-amber-300",
  "Object Storage": "border-teal-400/25 bg-teal-400/10 text-teal-300",
  "AI Gateway": "border-fuchsia-400/25 bg-fuchsia-400/10 text-fuchsia-300",
};

const FALLBACK = "border-white/15 bg-white/5 text-muted";

export function ServiceBadge({ service }: { service: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
        SERVICE_STYLES[service] ?? FALLBACK
      }`}
    >
      {service}
    </span>
  );
}
