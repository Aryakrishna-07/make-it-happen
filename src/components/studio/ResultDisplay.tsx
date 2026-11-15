import type { StudioResult } from "@/services/studioApi";

export function ResultDisplay({ result }: { result: StudioResult }) {
  const info = [
    ["Media type", result.kind],
    ["Status", result.status],
    ["Output format", result.outputFormat ?? "—"],
    ["File name", result.fileName],
  ];
  return (
    <div className="mt-10">
      <h3 className="display-xl text-4xl md:text-6xl">The final frame.</h3>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="flex min-h-64 items-center justify-center border border-border bg-secondary">
          {!result.resultUrl ? (
            <p className="label-mono p-8 text-center text-muted-foreground">The backend finished but returned no result file.</p>
          ) : result.kind === "image" ? (
            <img src={result.resultUrl} alt="Processed studio render" className="max-h-[75vh] w-full object-contain" />
          ) : (
            <video src={result.resultUrl} controls playsInline className="max-h-[75vh] w-full" />
          )}
        </div>
        <aside className="border border-border">
          <div className="label-mono border-b border-border p-4 text-primary">✓ Render complete</div>
          <dl>
            {info.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-border p-4">
                <dt className="label-mono text-muted-foreground">{k}</dt>
                <dd className="label-mono truncate text-right">{v}</dd>
              </div>
            ))}
          </dl>
          {result.message && <p className="p-4 text-sm text-muted-foreground">{result.message}</p>}
          {result.resultUrl && (
            <div className="grid grid-cols-2 gap-px bg-border">
              <a href={result.resultUrl} target="_blank" rel="noreferrer" className="label-mono bg-background p-4 text-center hover:bg-card">Open ↗</a>
              <a href={result.resultUrl} download className="label-mono bg-primary p-4 text-center text-primary-foreground hover:opacity-85">Download ↓</a>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
