"use client";

import { useMemo, useState } from "react";
import { species, type Species, type VenomousLabel } from "@/data/species";
import { DANGER } from "@/data/danger";
import { findCandidate } from "@/data/inaturalist";
import type { DangerLevel } from "@/lib/types";
import { SpeciesDetailSheet } from "./SpeciesDetailSheet";
import { C, F } from "./theme";

function venomousTone(v: VenomousLabel): { bg: string; tone: string } {
  if (v === "VENOMOUS") return { bg: DANGER[5].bg, tone: DANGER[5].tone };
  if (v === "MILDLY VENOMOUS")
    return { bg: DANGER[2].bg, tone: DANGER[2].tone };
  return { bg: DANGER[1].bg, tone: DANGER[1].tone };
}

function DangerChip({ level }: { level: DangerLevel }) {
  const d = DANGER[level];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "2px 8px",
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
          width: 12,
          height: 12,
          borderRadius: 999,
          background: d.tone,
          color: d.bg,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 8,
          fontWeight: 700,
        }}
      >
        {level}
      </span>
      {d.short}
    </span>
  );
}

function VenomousChip({ value }: { value: VenomousLabel }) {
  const { bg, tone } = venomousTone(value);
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "2px 8px",
        borderRadius: 999,
        background: bg,
        color: tone,
        fontFamily: F.mono,
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: 0.4,
      }}
    >
      {value}
    </span>
  );
}

function Row({
  s,
  onClick,
}: {
  s: Species;
  onClick: () => void;
}) {
  const d = DANGER[s.danger];
  const candidate = findCandidate(s.sci);
  const photoUrl = s.localPhoto ?? candidate?.photo?.url;

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "flex",
        gap: 12,
        padding: "12px 14px",
        background: C.surface,
        border: `1px solid ${C.hair}`,
        borderRadius: 14,
        textAlign: "left",
        cursor: "pointer",
        width: "100%",
        color: "inherit",
        font: "inherit",
      }}
    >
      {photoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photoUrl}
          alt=""
          loading="lazy"
          style={{
            width: 56,
            height: 56,
            borderRadius: 12,
            objectFit: "cover",
            flexShrink: 0,
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.15)",
          }}
        />
      ) : (
        <div
          aria-hidden
          style={{
            width: 56,
            height: 56,
            borderRadius: 12,
            background: d.bg,
            display: "grid",
            placeItems: "center",
            fontSize: 26,
            flexShrink: 0,
          }}
        >
          {s.emoji}
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 6,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: F.ui,
              fontSize: 15,
              fontWeight: 600,
              color: C.ink,
              letterSpacing: -0.2,
            }}
          >
            {s.en}
          </span>
          <span
            style={{
              fontFamily: F.ui,
              fontSize: 12,
              color: C.ink2,
            }}
          >
            · {s.th}
          </span>
        </div>
        <div
          style={{
            fontFamily: F.ui,
            fontSize: 11.5,
            fontStyle: "italic",
            color: C.ink3,
            marginTop: 1,
          }}
        >
          {s.sci}
        </div>

        <div
          style={{
            marginTop: 6,
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
          }}
        >
          <DangerChip level={s.danger} />
          <VenomousChip value={s.venomous} />
        </div>

        <div
          style={{
            marginTop: 6,
            fontFamily: F.mono,
            fontSize: 10,
            color: C.ink3,
            letterSpacing: 0.4,
            lineHeight: 1.4,
          }}
        >
          📍 {s.region}
        </div>

        <div
          style={{
            marginTop: 8,
            fontFamily: F.mono,
            fontSize: 10,
            color: C.moss2,
            letterSpacing: 0.6,
            textTransform: "uppercase",
          }}
        >
          Tap for details →
        </div>
      </div>
    </button>
  );
}

type Filter = "all" | "deadly" | "mild" | "safe";

const FILTER_LABEL: Record<Filter, string> = {
  all: "All",
  deadly: "Deadly",
  mild: "Mild",
  safe: "Safe",
};

function FilterBar({
  filter,
  setFilter,
  counts,
}: {
  filter: Filter;
  setFilter: (f: Filter) => void;
  counts: Record<Filter, number>;
}) {
  return (
    <div
      style={{
        margin: "0 0 12px",
        display: "flex",
        gap: 6,
        overflowX: "auto",
      }}
    >
      {(Object.keys(FILTER_LABEL) as Filter[]).map((key) => {
        const active = filter === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              border: active
                ? `1px solid ${C.moss2}`
                : `1px solid ${C.hair}`,
              background: active ? "rgba(126,91,196,0.18)" : C.surface,
              color: active ? C.ink : C.ink2,
              fontFamily: F.ui,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: -0.1,
              cursor: "pointer",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {FILTER_LABEL[key]} · {counts[key]}
          </button>
        );
      })}
    </div>
  );
}

export function SpeciesList() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Species | null>(null);

  const counts = useMemo<Record<Filter, number>>(
    () => ({
      all: species.length,
      deadly: species.filter((s) => s.danger >= 4).length,
      mild: species.filter((s) => s.danger === 2 || s.danger === 3).length,
      safe: species.filter((s) => s.danger === 1).length,
    }),
    [],
  );

  const filtered = useMemo(() => {
    if (filter === "all") return species;
    if (filter === "deadly") return species.filter((s) => s.danger >= 4);
    if (filter === "mild")
      return species.filter((s) => s.danger === 2 || s.danger === 3);
    return species.filter((s) => s.danger === 1);
  }, [filter]);

  return (
    <div style={{ padding: "0 16px 24px" }}>
      <div
        style={{
          fontFamily: F.disp,
          fontStyle: "italic",
          fontSize: 24,
          color: C.ink,
          marginBottom: 4,
        }}
      >
        Thai snake reference
      </div>
      <div
        style={{
          fontFamily: F.mono,
          fontSize: 10,
          color: C.ink3,
          letterSpacing: 0.6,
          textTransform: "uppercase",
          marginBottom: 14,
        }}
      >
        {species.length} species · curated for Thailand
      </div>

      <FilterBar filter={filter} setFilter={setFilter} counts={counts} />

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.map((s) => (
          <Row key={s.id} s={s} onClick={() => setSelected(s)} />
        ))}
      </div>

      <SpeciesDetailSheet
        species={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
