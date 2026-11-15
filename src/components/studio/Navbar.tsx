import { useState } from "react";
import { Logo } from "./Primitives";

const links = [
  { href: "#studio", label: "Studio" },
  { href: "#process", label: "Process" },
  { href: "#technology", label: "Technology" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/70 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-10">
        <a href="#top" aria-label="AI Automotive Studio home"><Logo /></a>
        <div className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="label-mono text-muted-foreground transition-colors hover:text-foreground">
              {l.label}
            </a>
          ))}
          <a href="#workspace" className="label-mono bg-primary px-4 py-2.5 text-primary-foreground transition-opacity hover:opacity-85">
            Enter Studio
          </a>
        </div>
        <button className="label-mono text-foreground md:hidden" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          {open ? "Close" : "Menu"}
        </button>
      </nav>
      {open && (
        <div className="border-t border-border bg-background px-5 pb-6 md:hidden">
          {links.map((l, i) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-border py-4">
              <span className="font-display text-2xl uppercase">{l.label}</span>
              <span className="label-mono text-muted-foreground">0{i + 1}</span>
            </a>
          ))}
          <a href="#workspace" onClick={() => setOpen(false)} className="label-mono mt-5 block bg-primary py-4 text-center text-primary-foreground">
            Enter Studio →
          </a>
        </div>
      )}
    </header>
  );
}
