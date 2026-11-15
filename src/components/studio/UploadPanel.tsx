import { useEffect, useRef, useState, type DragEvent } from "react";
import { ACCEPT, formatBytes, validateFile, type MediaKind } from "@/services/studioApi";
import { Crosshair } from "./Primitives";

interface Props {
  kind: MediaKind;
  file: File | null;
  onFile: (f: File | null) => void;
  disabled?: boolean;
}

export function UploadPanel({ kind, file, onFile, disabled }: Props) {
  const input = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return setPreview(null);
    const u = URL.createObjectURL(file);
    setPreview(u);
    return () => URL.revokeObjectURL(u);
  }, [file]);

  const accept = (f: File | undefined) => {
    if (!f) return;
    const err = validateFile(f, kind);
    setError(err);
    if (!err) onFile(f);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDrag(false);
    if (!disabled) accept(e.dataTransfer.files[0]);
  };

  const acceptAttr = [...ACCEPT[kind].mime, ...ACCEPT[kind].ext.map((x) => `.${x}`)].join(",");

  return (
    <div>
      <input ref={input} type="file" accept={acceptAttr} className="hidden" aria-label={`Select ${kind} file`}
        onChange={(e) => { accept(e.target.files?.[0]); e.target.value = ""; }} />

      {!file ? (
        <button type="button" disabled={disabled}
          onClick={() => input.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={onDrop}
          className={`tech-grid relative flex aspect-[4/3] w-full flex-col items-center justify-center gap-5 border border-dashed p-6 text-center transition-colors sm:aspect-[16/9] ${drag ? "border-primary bg-card" : "border-border hover:border-muted-foreground hover:bg-secondary"}`}>
          <Crosshair className="absolute left-3 top-3" /><Crosshair className="absolute right-3 top-3" />
          <Crosshair className="absolute bottom-3 left-3" /><Crosshair className="absolute bottom-3 right-3" />
          <span className={`flex size-16 items-center justify-center rounded-full border text-2xl transition-colors ${drag ? "border-primary text-primary" : "border-border"}`}>+</span>
          <span className="font-display text-2xl uppercase md:text-3xl">{drag ? "Release to load" : `Drop ${kind} here`}</span>
          <span className="label-mono text-muted-foreground">or click to browse — {ACCEPT[kind].label}</span>
        </button>
      ) : (
        <div className="border border-border">
          <div className="relative flex aspect-[4/3] items-center justify-center bg-secondary sm:aspect-[16/9]">
            {preview && kind === "image" && <img src={preview} alt="Selected vehicle preview" className="h-full w-full object-contain" />}
            {preview && kind === "video" && <video src={preview} controls muted playsInline className="h-full w-full object-contain" />}
            <span className="label-mono absolute left-3 top-3 bg-background/80 px-2 py-1 text-muted-foreground">Source / local preview</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-4">
            <div className="min-w-0">
              <div className="truncate font-medium">{file.name}</div>
              <div className="label-mono text-muted-foreground">{formatBytes(file.size)} · {file.name.split(".").pop()}</div>
            </div>
            <div className="flex gap-2">
              <button type="button" disabled={disabled} onClick={() => input.current?.click()} className="label-mono border border-border px-4 py-2.5 hover:border-foreground disabled:opacity-40">Replace</button>
              <button type="button" disabled={disabled} onClick={() => { onFile(null); setError(null); }} className="label-mono border border-border px-4 py-2.5 text-muted-foreground hover:text-destructive disabled:opacity-40">Remove</button>
            </div>
          </div>
        </div>
      )}
      {error && <p role="alert" className="label-mono mt-3 text-destructive">✕ {error}</p>}
    </div>
  );
}
