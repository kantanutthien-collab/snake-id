export type SupportedMediaType = "image/jpeg" | "image/webp";

export interface ProcessedImage {
  base64: string;
  dataUrl: string;
  mediaType: SupportedMediaType;
  bytes: number;
}

const MAX_DIM = 1024;
const QUALITY = 0.78;

function scaleDown(w: number, h: number, max: number) {
  const ratio = Math.max(w, h) / max;
  if (ratio <= 1) return { width: w, height: h };
  return { width: Math.round(w / ratio), height: Math.round(h / ratio) };
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function dataUrlToBase64(dataUrl: string): string {
  const idx = dataUrl.indexOf(",");
  return idx >= 0 ? dataUrl.slice(idx + 1) : dataUrl;
}

function estimateBytes(base64: string): number {
  // base64 expands raw bytes ~4/3. Subtract padding for tighter estimate.
  const padding = base64.endsWith("==") ? 2 : base64.endsWith("=") ? 1 : 0;
  return Math.floor((base64.length * 3) / 4) - padding;
}

function encodeCanvas(canvas: HTMLCanvasElement): ProcessedImage {
  // Try WebP first — typically 25-40% smaller than JPEG at same quality
  const webpUrl = canvas.toDataURL("image/webp", QUALITY);
  if (webpUrl.startsWith("data:image/webp")) {
    const base64 = dataUrlToBase64(webpUrl);
    return {
      base64,
      dataUrl: webpUrl,
      mediaType: "image/webp",
      bytes: estimateBytes(base64),
    };
  }
  // Fallback to JPEG
  const jpegUrl = canvas.toDataURL("image/jpeg", QUALITY);
  const base64 = dataUrlToBase64(jpegUrl);
  return {
    base64,
    dataUrl: jpegUrl,
    mediaType: "image/jpeg",
    bytes: estimateBytes(base64),
  };
}

export async function processBlob(blob: Blob): Promise<ProcessedImage> {
  const dataUrl = await blobToDataUrl(blob);
  const img = await loadImage(dataUrl);
  const { width, height } = scaleDown(img.width, img.height, MAX_DIM);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable.");
  ctx.drawImage(img, 0, 0, width, height);
  return encodeCanvas(canvas);
}

/**
 * Render a small (~200px) thumbnail of an existing image data URL.
 * Used to persist the user's scanned photo into history without bloating
 * localStorage — full-size images are kept only in the active session.
 */
export async function makeThumbnail(
  sourceDataUrl: string,
  maxDim = 200,
  quality = 0.7,
): Promise<string> {
  const img = await loadImage(sourceDataUrl);
  const { width, height } = scaleDown(img.width, img.height, maxDim);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable.");
  ctx.drawImage(img, 0, 0, width, height);
  const webp = canvas.toDataURL("image/webp", quality);
  if (webp.startsWith("data:image/webp")) return webp;
  return canvas.toDataURL("image/jpeg", quality);
}

export async function processVideoFrame(
  video: HTMLVideoElement,
): Promise<ProcessedImage> {
  if (!video.videoWidth || !video.videoHeight) {
    throw new Error("Camera frame not ready yet.");
  }
  const { width, height } = scaleDown(
    video.videoWidth,
    video.videoHeight,
    MAX_DIM,
  );
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable.");
  ctx.drawImage(video, 0, 0, width, height);
  return encodeCanvas(canvas);
}
