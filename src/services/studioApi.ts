/**
 * Studio backend integration.
 *
 * The backend API contract has NOT been agreed yet. Everything here is driven by env vars
 * so no endpoint path or response shape is hard-coded as fact:
 *   VITE_STUDIO_API_URL        base URL of the processing backend (required to enable processing)
 *   VITE_STUDIO_IMAGE_ENDPOINT path for image processing (default "/process/image" — placeholder)
 *   VITE_STUDIO_VIDEO_ENDPOINT path for video processing (default "/process/video" — placeholder)
 *
 * Assumed placeholder contract (adjust in `parseResult` once the backend is defined):
 *   POST multipart/form-data with field "file"
 *   -> JSON { status?: string; result_url?: string; output_format?: string; message?: string; error?: string }
 */

export type MediaKind = "image" | "video";

export interface StudioResult {
  kind: MediaKind;
  resultUrl: string | null;
  status: string;
  outputFormat: string | null;
  message: string | null;
  fileName: string;
}

export class StudioApiError extends Error {
  constructor(
    message: string,
    public code: "not_configured" | "no_vehicle" | "network" | "server",
  ) {
    super(message);
  }
}

const BASE = (import.meta.env["VITE_STUDIO_API_URL"] as string | undefined)?.replace(/\/$/, "");
const IMAGE_PATH = (import.meta.env["VITE_STUDIO_IMAGE_ENDPOINT"] as string | undefined) ?? "/process/image";
const VIDEO_PATH = (import.meta.env["VITE_STUDIO_VIDEO_ENDPOINT"] as string | undefined) ?? "/process/video";

export const isBackendConfigured = Boolean(BASE);

export const ACCEPT: Record<MediaKind, { ext: string[]; mime: string[]; label: string }> = {
  image: { ext: ["jpg", "jpeg", "png"], mime: ["image/jpeg", "image/png"], label: "JPG · JPEG · PNG" },
  video: { ext: ["mp4", "mov"], mime: ["video/mp4", "video/quicktime"], label: "MP4 · MOV" },
};

export function validateFile(file: File, kind: MediaKind): string | null {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!ACCEPT[kind].ext.includes(ext)) {
    return `Unsupported format ".${ext || "?"}". Accepted: ${ACCEPT[kind].label}.`;
  }
  return null;
}

function parseResult(kind: MediaKind, fileName: string, data: Record<string, unknown>): StudioResult {
  const url = (data["result_url"] ?? data["url"] ?? null) as string | null;
  const absolute = url && BASE && url.startsWith("/") ? `${BASE}${url}` : url;
  return {
    kind,
    fileName,
    resultUrl: absolute,
    status: String(data["status"] ?? "completed"),
    outputFormat: (data["output_format"] as string) ?? null,
    message: (data["message"] as string) ?? null,
  };
}

export async function processMedia(file: File, kind: MediaKind, signal?: AbortSignal): Promise<StudioResult> {
  if (!BASE) {
    throw new StudioApiError(
      "The processing backend is not connected yet. Set VITE_STUDIO_API_URL to enable studio rendering.",
      "not_configured",
    );
  }
  const body = new FormData();
  body.append("file", file);
  let res: Response;
  try {
    res = await fetch(`${BASE}${kind === "image" ? IMAGE_PATH : VIDEO_PATH}`, { method: "POST", body, signal: signal ?? null });
  } catch (e) {
    if ((e as Error).name === "AbortError") throw e;
    throw new StudioApiError("Could not reach the processing backend. Check your connection and try again.", "network");
  }
  let data: Record<string, unknown> = {};
  try {
    data = await res.json();
  } catch {
    /* non-JSON body */
  }
  const errText = String(data["error"] ?? data["detail"] ?? data["message"] ?? "");
  if (!res.ok || data["error"]) {
    if (/no vehicle|vehicle not (found|detected)/i.test(errText)) {
      throw new StudioApiError("No vehicle was detected in this media. Try a clearer photo where the full vehicle is visible.", "no_vehicle");
    }
    throw new StudioApiError(errText || `Processing failed (status ${res.status}).`, "server");
  }
  return parseResult(kind, file.name, data);
}

export function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 ** 2) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 ** 2).toFixed(1)} MB`;
}
