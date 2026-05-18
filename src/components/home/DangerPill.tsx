import { DANGER } from "@/data/danger";
import type { DangerLevel } from "@/lib/types";
import { F } from "./theme";

interface DangerPillProps {
  level: DangerLevel;
}

export function DangerPill({ level }: DangerPillProps) {
  const d = DANGER[level];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "3px 8px 3px 6px",
        borderRadius: 999,
        background: d.bg,
        color: d.tone,
        fontFamily: F.mono,
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: 0.4,
        textTransform: "uppercase",
      }}
    >
      <span
        style={{
          width: 14,
          height: 14,
          borderRadius: 999,
          background: d.tone,
          color: d.bg,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 9,
          fontWeight: 700,
        }}
      >
        {level}
      </span>
      {d.short}
    </span>
  );
}
