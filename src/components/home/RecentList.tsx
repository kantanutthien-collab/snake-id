"use client";

import { formatRelative, type HistoryEntry } from "@/lib/history";
import type { ScanResult } from "@/lib/types";
import { C, F } from "./theme";
import { DangerPill } from "./DangerPill";
import { SwatchDot } from "./SwatchDot";

interface RecentListProps {
  entries: HistoryEntry[];
  hydrated: boolean;
}

function PhotoOrSwatch({
  result,
}: {
  result: Extract<ScanResult, { kind: "snake" }>;
}) {
  if (result.photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={result.photo.url}
        alt=""
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          objectFit: "cover",
          flexShrink: 0,
          boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.1)",
        }}
      />
    );
  }
  return <SwatchDot colors={result.snake.swatch} />;
}

function RecentRow({ entry }: { entry: HistoryEntry }) {
  const when = formatRelative(entry.when);

  if (entry.result.kind === "snake") {
    const s = entry.result.snake;
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "10px 14px",
          borderRadius: 14,
          background: C.surface,
          border: `1px solid ${C.hair}`,
        }}
      >
        <PhotoOrSwatch result={entry.result} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: F.ui,
                fontSize: 14,
                fontWeight: 600,
                color: C.ink,
                letterSpacing: -0.2,
              }}
            >
              {s.en}
            </span>
            <DangerPill level={s.danger} />
          </div>
          <div
            style={{
              fontFamily: F.ui,
              fontSize: 11.5,
              color: C.ink3,
              marginTop: 2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {s.th && s.th !== "—" ? `${s.th} · ` : ""}
            <span style={{ fontStyle: "italic" }}>{s.sci}</span>
          </div>
        </div>
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 9.5,
            color: C.ink3,
            letterSpacing: 0.6,
            textAlign: "right",
            flexShrink: 0,
          }}
        >
          {when}
        </div>
      </div>
    );
  }

  const o = entry.result.other;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 14px",
        borderRadius: 14,
        background: C.surface,
        border: `1px solid ${C.hair}`,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: C.paper,
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
          fontFamily: F.disp,
          fontSize: 22,
          color: C.moss,
        }}
      >
        {o.emoji}
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: F.ui,
            fontSize: 14,
            fontWeight: 600,
            color: C.ink,
          }}
        >
          {o.label}
        </div>
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 10,
            color: C.ink3,
            letterSpacing: 0.6,
            textTransform: "uppercase",
            marginTop: 3,
          }}
        >
          Not a snake · No profile
        </div>
      </div>
      <div
        style={{
          fontFamily: F.mono,
          fontSize: 9.5,
          color: C.ink3,
          letterSpacing: 0.6,
          flexShrink: 0,
        }}
      >
        {when}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div
      style={{
        padding: "20px 14px",
        borderRadius: 14,
        background: C.surface,
        border: `1px solid ${C.hair}`,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: F.ui,
          fontSize: 13,
          color: C.ink2,
          lineHeight: 1.45,
        }}
      >
        No scans yet
      </div>
      <div
        style={{
          fontFamily: F.mono,
          fontSize: 10,
          color: C.ink3,
          letterSpacing: 0.6,
          textTransform: "uppercase",
          marginTop: 6,
        }}
      >
        Tap the viewfinder or use Scan now
      </div>
    </div>
  );
}

export function RecentList({ entries, hydrated }: RecentListProps) {
  const top = entries.slice(0, 3);

  return (
    <div style={{ margin: "20px 16px 0" }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <div
          style={{
            fontFamily: F.disp,
            fontStyle: "italic",
            fontSize: 22,
            color: C.ink,
            letterSpacing: -0.2,
          }}
        >
          Recent finds
        </div>
        {entries.length > 3 && (
          <button
            type="button"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontFamily: F.mono,
              fontSize: 10,
              color: C.moss2,
              letterSpacing: 0.8,
              textTransform: "uppercase",
            }}
          >
            See all →
          </button>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {!hydrated || top.length === 0 ? (
          <EmptyState />
        ) : (
          top.map((entry) => <RecentRow key={entry.id} entry={entry} />)
        )}
      </div>
    </div>
  );
}
