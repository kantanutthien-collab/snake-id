import type { HistoryStats } from "@/lib/history";
import { C, F } from "./theme";

interface StatProps {
  n: string;
  label: string;
}

function Stat({ n, label }: StatProps) {
  return (
    <div style={{ flex: 1, display: "flex", alignItems: "baseline", gap: 7 }}>
      <div
        style={{
          fontFamily: F.disp,
          fontStyle: "italic",
          fontSize: 22,
          color: C.ink,
          lineHeight: 1,
        }}
      >
        {n}
      </div>
      <div
        style={{
          fontFamily: F.mono,
          fontSize: 9.5,
          color: C.ink3,
          letterSpacing: 1,
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
    </div>
  );
}

interface StatRowProps {
  stats: HistoryStats;
}

export function StatRow({ stats }: StatRowProps) {
  return (
    <div
      style={{
        margin: "14px 16px 0",
        padding: "12px 14px",
        borderRadius: 14,
        background: C.surface,
        border: `1px solid ${C.hair}`,
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <Stat n={String(stats.scans)} label="Scans" />
      <div style={{ width: 1, height: 22, background: C.hair }} />
      <Stat n={String(stats.snakes)} label="Snakes" />
      <div style={{ width: 1, height: 22, background: C.hair }} />
      <Stat n={String(stats.deadly)} label="Deadly seen" />
    </div>
  );
}
