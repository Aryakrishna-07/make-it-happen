import type { ReactNode } from "react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 32 32" className="size-7" aria-hidden>
        <rect x="0.75" y="0.75" width="30.5" height="30.5" fill="none" className="stroke-border" strokeWidth="1.5" />
        <path d="M6 25 16 6l10 19" fill="none" className="stroke-foreground" strokeWidth="2.2" />
        <path d="M10.5 19h11" className="stroke-foreground" strokeWidth="2.2" />
      </svg>
      <span className="label-mono leading-tight text-foreground">AI Automotive<br />Studio</span>
    </span>
  );
}

export function Crosshair({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`size-4 text-muted-foreground ${className}`} aria-hidden>
      <path d="M8 0v16M0 8h16" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function Tag({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`label-mono text-muted-foreground ${className}`}>{children}</span>;
}

export function SectionHeader({ index, name }: { index: string; name: string }) {
  return (
    <div className="flex items-center justify-between border-t border-border pt-5">
      <span className="label-mono text-muted-foreground">{name}</span>
      <span className="label-mono text-muted-foreground">{index}</span>
    </div>
  );
}
