import { useState } from "react";
import { Logo } from "./Primitives";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#studio", label: "Studio" },
  { href: "#process", label: "Process" },
  { href: "#technology", label: "Technology" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95">
      <nav className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:px-10">
        <a href="#top" aria-label="AI Automotive Studio home"><Logo /></a>
        <div className="hidden items-center gap-7 md:flex lg:gap-9">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="label-mono text-muted-foreground transition-colors hover:text-foreground">
              {l.label}
            </a>
          ))}
          <Button asChild variant="studio" className="h-10 px-5"><a href="#workspace">Enter Studio</a></Button>
        </div>
        <Button variant="ghost" className="label-mono text-foreground md:hidden" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-navigation">
          {open ? "Close" : "Menu"}
        </Button>
      </nav>
      {open && (
        <div id="mobile-navigation" className="border-t border-border bg-background px-5 pb-6 md:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-border py-4">
              <span className="font-display text-2xl uppercase">{l.label}</span>
            </a>
          ))}
          <Button asChild variant="studio" size="studio" className="mt-5 w-full"><a href="#workspace" onClick={() => setOpen(false)}>Enter Studio</a></Button>
        </div>
      )}
    </header>
  );
}
