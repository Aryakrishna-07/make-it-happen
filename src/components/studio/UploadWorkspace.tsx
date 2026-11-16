import { useRef, useState } from "react";
import { isBackendConfigured, processMedia, StudioApiError, type MediaKind, type StudioResult } from "@/services/studioApi";
import { SectionHeader, Tag } from "./Primitives";
import { UploadPanel } from "./UploadPanel";
import { ProcessingStatus } from "./ProcessingStatus";
import { ResultDisplay } from "./ResultDisplay";
import { Button } from "@/components/ui/button";

type Phase = { s: "idle" } | { s: "processing" } | { s: "done"; result: StudioResult } | { s: "error"; error: string; code: string };

export function UploadWorkspace() {
  const [mode, setMode] = useState<MediaKind>("image");
  const [files, setFiles] = useState<Record<MediaKind, File | null>>({ image: null, video: null });
  const [phase, setPhase] = useState<Phase>({ s: "idle" });
  const abort = useRef<AbortController | null>(null);
  const file = files[mode];
  const busy = phase.s === "processing";

  const run = async () => {
    if (!file) return;
    abort.current = new AbortController();
    setPhase({ s: "processing" });
    try {
      const result = await processMedia(file, mode, abort.current.signal);
      setPhase({ s: "done", result });
    } catch (e) {
      if ((e as Error).name === "AbortError") return setPhase({ s: "idle" });
      const err = e instanceof StudioApiError ? e : new StudioApiError("Unexpected error during processing.", "server");
      setPhase({ s: "error", error: err.message, code: err.code });
    }
  };

  return (
    <section id="workspace" className="border-y border-border bg-secondary/40">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <SectionHeader index="03" name="Workspace" />
        <div className="mt-12 grid gap-8 md:grid-cols-12">
          <h2 className="display-xl text-5xl md:col-span-8 md:text-8xl">Your vehicle.<br /><span className="text-muted-foreground">Our studio.</span></h2>
          <div className="flex flex-col justify-end gap-4 md:col-span-4">
             <p className="text-sm leading-relaxed text-muted-foreground">A photograph or a film. Your vehicle, in a new setting.</p>
             <Tag>{isBackendConfigured ? "Processing available" : "Processing service not connected"}</Tag>
          </div>
        </div>

        <div id="process" className="mt-12 inline-grid grid-cols-2 border-b border-border" role="tablist" aria-label="Media type">
          {(["image", "video"] as const).map((m) => (
             <Button variant="ghost" key={m} role="tab" aria-selected={mode === m} disabled={busy}
              onClick={() => { setMode(m); setPhase({ s: "idle" }); }}
              className={`label-mono h-12 rounded-none border-b px-5 sm:px-8 ${mode === m ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              {m} studio
            </Button>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          <UploadPanel key={mode} kind={mode} file={file} disabled={busy}
            onFile={(f) => { setFiles((p) => ({ ...p, [mode]: f })); setPhase({ s: "idle" }); }} />
           <div className="flex flex-col gap-4 py-4 lg:pl-6">
            <p className="font-display text-2xl uppercase">{mode === "image" ? "Image studio" : "Video studio"}</p>
            <p className="text-sm text-muted-foreground">
              {mode === "image" ? "A single still placed inside the fixed LED studio." : "Footage processed frame-by-frame into the studio environment."}
            </p>
            <div className="mt-auto flex flex-col gap-2">
               <Button variant="studio" size="studio" onClick={run} disabled={!file || busy}>
                {busy ? "Processing…" : mode === "image" ? "Generate studio image →" : "Process video →"}
               </Button>
               {busy && <Button variant="studioOutline" size="studio" onClick={() => abort.current?.abort()}>Cancel</Button>}
            </div>
          </div>
        </div>

        <div className="mt-6">
          {busy && <ProcessingStatus kind={mode} />}
          {phase.s === "error" && (
            <div role="alert" className="border border-destructive/50 p-6 md:p-8">
              <span className="label-mono text-destructive">✕ {phase.code === "no_vehicle" ? "No vehicle detected" : phase.code === "not_configured" ? "Backend not connected" : "Processing failed"}</span>
              <p className="mt-3 max-w-2xl text-muted-foreground">{phase.error}</p>
               {phase.code !== "not_configured" && <Button variant="studioOutline" onClick={run} className="mt-5">Retry</Button>}
            </div>
          )}
          {phase.s === "done" && <ResultDisplay result={phase.result} />}
        </div>
      </div>
    </section>
  );
}
