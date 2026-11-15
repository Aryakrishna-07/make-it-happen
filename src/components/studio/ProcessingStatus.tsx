const stages = [
  "Media validation", "Vehicle detection", "Vehicle segmentation", "Background removal",
  "Studio compositing", "Shadow & reflection", "Final render",
];

/** The backend provides no per-stage status, so stages are shown as the pipeline outline only. */
export function ProcessingStatus({ kind }: { kind: "image" | "video" }) {
  return (
    <div id="process" className="border border-border bg-secondary p-6 md:p-8" aria-live="polite">
      <div className="flex items-center justify-between">
        <span className="label-mono text-primary"><span className="animate-blink">●</span> Processing</span>
        <span className="label-mono text-muted-foreground">{kind} job</span>
      </div>
      <div className="relative mt-6 h-px overflow-hidden bg-border">
        <div className="animate-scan absolute inset-y-0 w-1/3 bg-primary" />
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        Your {kind} is being processed by the backend. Live stage-by-stage progress isn't reported, so the pipeline below
        describes what runs — not what has completed.
      </p>
      <ol className="mt-6 grid gap-px bg-border sm:grid-cols-2">
        {stages.map((s, i) => (
          <li key={s} className="flex items-center gap-4 bg-secondary py-3 pr-3">
            <span className="label-mono text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
            <span className="label-mono text-foreground">{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
