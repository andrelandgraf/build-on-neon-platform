import type { SVGProps } from "react";

// Simplified Neon logomark.
export function NeonMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden {...props}>
      <rect width="32" height="32" rx="8" fill="#00e599" />
      <path
        d="M8 22V10h3.2l7.2 9.1V10H22v12h-3.2l-7.2-9.1V22H8Z"
        fill="#07090c"
      />
    </svg>
  );
}
