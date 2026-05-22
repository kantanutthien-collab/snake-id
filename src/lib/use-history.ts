"use client";

import { useCallback, useEffect, useState } from "react";
import type { ScanResult } from "@/lib/types";
import {
  computeStats,
  createEntry,
  loadHistory,
  saveHistory,
  type HistoryEntry,
} from "@/lib/history";

interface UseHistoryReturn {
  entries: HistoryEntry[];
  stats: ReturnType<typeof computeStats>;
  addScan: (result: ScanResult, userThumbnail?: string) => void;
  hydrated: boolean;
}

export function useHistory(): UseHistoryReturn {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // localStorage is undefined during SSR; we deliberately hydrate from it
    // after mount. Canonical pattern for browser-storage bootstrapping.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEntries(loadHistory());
    setHydrated(true);
  }, []);

  const addScan = useCallback(
    (result: ScanResult, userThumbnail?: string) => {
      setEntries((prev) => {
        const next = [createEntry(result, userThumbnail), ...prev].slice(0, 50);
        saveHistory(next);
        return next;
      });
    },
    [],
  );

  return {
    entries,
    stats: computeStats(entries),
    addScan,
    hydrated,
  };
}
