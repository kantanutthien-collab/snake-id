export interface ProcessedImage {
  base64: string;
  dataUrl: string;
  mediaType: "image/jpeg";
}

const MAX_DIM = 1024;
const QUALITY = 0.85;

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
  const out = canvas.toDataURL("image/jpeg", QUALITY);
  return { base64: dataUrlToBase64(out), dataUrl: out, mediaType: "image/jpeg" };
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
  const out = canvas.toDataURL("image/jpeg", QUALITY);
  return { base64: dataUrlToBase64(out), dataUrl: out, mediaType: "image/jpeg" };
}
