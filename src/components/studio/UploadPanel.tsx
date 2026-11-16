import { useEffect, useRef, useState, type DragEvent } from "react";
import { ACCEPT, formatBytes, validateFile, type MediaKind } from "@/services/studioApi";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

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
        <Button type="button" variant="ghost" disabled={disabled}
          onClick={() => input.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={onDrop}
          className={`flex h-auto aspect-[4/3] w-full flex-col items-center justify-center gap-4 whitespace-normal rounded-none border border-dashed p-6 text-center transition-colors sm:aspect-[16/9] ${drag ? "border-primary bg-card" : "border-border hover:border-muted-foreground hover:bg-secondary"}`}>
          <Upload className="mb-2 text-muted-foreground" aria-hidden />
          <span className="font-display text-2xl font-medium uppercase md:text-3xl">{drag ? "Release to load" : `Select your ${kind}`}</span>
          <span className="text-sm font-normal text-muted-foreground">{ACCEPT[kind].label}</span>
        </Button>
      ) : (
        <div className="border border-border">
          <div className="relative flex aspect-[4/3] items-center justify-center bg-secondary sm:aspect-[16/9]">
            {preview && kind === "image" && <img src={preview} alt="Selected vehicle preview" className="h-full w-full object-contain" />}
            {preview && kind === "video" && <video src={preview} controls muted playsInline className="h-full w-full object-contain" />}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border p-4">
              <div className="min-w-0 flex-1">
              <div className="truncate font-medium">{file.name}</div>
              <div className="label-mono text-muted-foreground">{formatBytes(file.size)} · {file.name.split(".").pop()}</div>
            </div>
            <div className="flex gap-2">
               <Button variant="studioOutline" type="button" disabled={disabled} onClick={() => input.current?.click()}>Replace</Button>
               <Button variant="ghost" type="button" disabled={disabled} onClick={() => { onFile(null); setError(null); }} className="label-mono text-muted-foreground hover:text-destructive">Remove</Button>
            </div>
          </div>
        </div>
      )}
      {error && <p role="alert" className="label-mono mt-3 text-destructive">✕ {error}</p>}
    </div>
  );
}
