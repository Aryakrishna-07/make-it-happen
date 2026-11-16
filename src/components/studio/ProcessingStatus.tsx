const stages = [
  "Media validation", "Vehicle detection", "Vehicle segmentation", "Background removal",
  "Studio compositing", "Shadow & reflection", "Final render",
];

/** The backend provides no per-stage status, so stages are shown as the pipeline outline only. */
export function ProcessingStatus({ kind }: { kind: "image" | "video" }) {
  return (
    <div className="border-t border-border py-8" role="status" aria-live="polite">
      <div className="flex items-center justify-between">
        <span className="label-mono text-foreground">Processing</span>
        <span className="label-mono text-muted-foreground">{kind} job</span>
      </div>
      <div className="relative mt-6 h-px overflow-hidden bg-border">
        <div className="animate-scan absolute inset-y-0 w-1/3 bg-foreground" />
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        Your {kind} is being prepared. The stages below describe the process; live stage progress is not available.
      </p>
      <ol className="mt-6 grid gap-x-8 sm:grid-cols-2">
        {stages.map((s, i) => (
          <li key={s} className="flex items-center gap-4 border-b border-border py-3 pr-3">
            <span className="label-mono text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
            <span className="label-mono text-foreground">{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
