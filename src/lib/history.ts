import type { ScanResult } from "@/lib/types";

const STORAGE_KEY = "snake-id:history:v1";
const MAX_ENTRIES = 50;

export interface HistoryEntry {
  id: string;
  when: string;
  result: ScanResult;
  /** Small (~200px) thumbnail data URL of the photo the user actually scanned. */
  userThumbnail?: string;
}

export interface HistoryStats {
  scans: number;
  snakes: number;
  deadly: number;
}

interface StoredShape {
  version: 1;
  entries: HistoryEntry[];
}

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

export function loadHistory(): HistoryEntry[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Partial<StoredShape>;
    if (parsed.version !== 1 || !Array.isArray(parsed.entries)) return [];
    return parsed.entries;
  } catch {
    return [];
  }
}

export function saveHistory(entries: HistoryEntry[]): void {
  if (!isBrowser()) return;
  try {
    const payload: StoredShape = { version: 1, entries: entries.slice(0, MAX_ENTRIES) };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // localStorage quota or disabled — silently drop
  }
}

export function clearHistory(): void {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function createEntry(
  result: ScanResult,
  userThumbnail?: string,
): HistoryEntry {
  return {
    id:
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    when: new Date().toISOString(),
    result,
    userThumbnail,
  };
}

export function computeStats(entries: HistoryEntry[]): HistoryStats {
  const uniqueSnakeIds = new Set<string>();
  const uniqueDeadlyIds = new Set<string>();
  for (const e of entries) {
    if (e.result.kind === "snake") {
      uniqueSnakeIds.add(e.result.snake.id);
      if (e.result.snake.danger === 5) uniqueDeadlyIds.add(e.result.snake.id);
    }
  }
  return {
    scans: entries.length,
    snakes: uniqueSnakeIds.size,
    deadly: uniqueDeadlyIds.size,
  };
}

export function formatRelative(iso: string, now: Date = new Date()): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "—";
  const deltaMs = now.getTime() - then;
  const deltaSec = Math.max(0, Math.round(deltaMs / 1000));
  if (deltaSec < 45) return "just now";
  const deltaMin = Math.round(deltaSec / 60);
  if (deltaMin < 60) return `${deltaMin} min ago`;
  const deltaHr = Math.round(deltaMin / 60);
  if (deltaHr < 24) return `${deltaHr} hr ago`;
  const deltaDay = Math.round(deltaHr / 24);
  if (deltaDay === 1) return "Yesterday";
  if (deltaDay < 7) return `${deltaDay} days ago`;
  return new Date(iso).toLocaleDateString();
}
