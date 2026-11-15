import { useRef, useState } from "react";
import { isBackendConfigured, processMedia, StudioApiError, type MediaKind, type StudioResult } from "@/services/studioApi";
import { SectionHeader, Tag } from "./Primitives";
import { UploadPanel } from "./UploadPanel";
import { ProcessingStatus } from "./ProcessingStatus";
import { ResultDisplay } from "./ResultDisplay";

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
            <p className="text-muted-foreground">Select your media and initiate the transformation.</p>
            <Tag className={isBackendConfigured ? "text-primary" : ""}>Backend: {isBackendConfigured ? "connected" : "not configured"}</Tag>
          </div>
        </div>

        <div className="mt-12 inline-grid grid-cols-2 border border-border p-1" role="tablist">
          {(["image", "video"] as const).map((m, i) => (
            <button key={m} role="tab" aria-selected={mode === m} disabled={busy}
              onClick={() => { setMode(m); setPhase({ s: "idle" }); }}
              className={`label-mono px-5 py-3 transition-colors sm:px-8 ${mode === m ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>
              0{i + 1} — {m} studio
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
          <UploadPanel key={mode} kind={mode} file={file} disabled={busy}
            onFile={(f) => { setFiles((p) => ({ ...p, [mode]: f })); setPhase({ s: "idle" }); }} />
          <div className="flex flex-col gap-4 border border-border p-6">
            <span className="label-mono text-muted-foreground">Mode {mode === "image" ? "01" : "02"}</span>
            <p className="font-display text-2xl uppercase">{mode === "image" ? "Image studio" : "Video studio"}</p>
            <p className="text-sm text-muted-foreground">
              {mode === "image" ? "A single still placed inside the fixed LED studio." : "Footage processed frame-by-frame into the studio environment."}
            </p>
            <div className="mt-auto flex flex-col gap-2">
              <button onClick={run} disabled={!file || busy}
                className="label-mono bg-primary px-6 py-4 text-primary-foreground transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-30">
                {busy ? "Processing…" : mode === "image" ? "Generate studio image →" : "Process video →"}
              </button>
              {busy && <button onClick={() => abort.current?.abort()} className="label-mono border border-border py-3 text-muted-foreground hover:text-foreground">Cancel</button>}
            </div>
          </div>
        </div>

        <div className="mt-6">
          {busy && <ProcessingStatus kind={mode} />}
          {phase.s === "error" && (
            <div role="alert" className="border border-destructive/50 p-6 md:p-8">
              <span className="label-mono text-destructive">✕ {phase.code === "no_vehicle" ? "No vehicle detected" : phase.code === "not_configured" ? "Backend not connected" : "Processing failed"}</span>
              <p className="mt-3 max-w-2xl text-muted-foreground">{phase.error}</p>
              {phase.code !== "not_configured" && <button onClick={run} className="label-mono mt-5 border border-border px-5 py-3 hover:border-foreground">Retry</button>}
            </div>
          )}
          {phase.s === "done" && <ResultDisplay result={phase.result} />}
        </div>
      </div>
    </section>
  );
}
