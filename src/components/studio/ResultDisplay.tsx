import type { StudioResult } from "@/services/studioApi";
import { Button } from "@/components/ui/button";

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
      <div className="mt-8">
        <div className="flex min-h-64 items-center justify-center bg-secondary">
          {!result.resultUrl ? (
            <p className="label-mono p-8 text-center text-muted-foreground">The backend finished but returned no result file.</p>
          ) : result.kind === "image" ? (
            <img src={result.resultUrl} alt="Processed studio render" className="max-h-[75vh] w-full object-contain" />
          ) : (
            <video src={result.resultUrl} controls playsInline className="max-h-[75vh] w-full" />
          )}
        </div>
        <aside className="mt-6">
          <div className="label-mono py-4 text-foreground">Render complete</div>
          <dl className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {info.map(([k, v]) => (
               <div key={k} className="min-w-0 border-b border-border py-4">
                <dt className="label-mono text-muted-foreground">{k}</dt>
                 <dd className="mt-2 break-words text-sm">{v}</dd>
              </div>
            ))}
          </dl>
          {result.message && <p className="p-4 text-sm text-muted-foreground">{result.message}</p>}
          {result.resultUrl && (
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="studioOutline" size="studio"><a href={result.resultUrl} target="_blank" rel="noreferrer">Open ↗</a></Button>
              <Button asChild variant="studio" size="studio"><a href={result.resultUrl} download>Download ↓</a></Button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
