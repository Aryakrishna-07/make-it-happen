import { Logo } from "./Primitives";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <Logo />
            <p className="display-xl mt-10 text-4xl md:text-6xl">Precision in<br />every frame.</p>
          </div>
          <nav className="flex gap-8">
            {["Studio", "Process", "Technology"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="label-mono text-muted-foreground hover:text-foreground">{l}</a>
            ))}
          </nav>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <span className="text-sm text-muted-foreground">Automotive photography, reimagined.</span>
          <span className="label-mono text-muted-foreground">© {new Date().getFullYear()} AI Automotive Studio</span>
        </div>
      </div>
    </footer>
  );
}
