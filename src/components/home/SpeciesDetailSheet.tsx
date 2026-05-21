"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import type { Species, VenomousLabel } from "@/data/species";
import { DANGER } from "@/data/danger";
import { findCandidate } from "@/data/inaturalist";
import { findSnake } from "@/data/snakes";
import type { DangerLevel } from "@/lib/types";
import { C, F } from "./theme";

interface SpeciesDetailSheetProps {
  species: Species | null;
  onClose: () => void;
}

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
        gap: 6,
        padding: "4px 10px",
        borderRadius: 999,
        background: d.bg,
        color: d.tone,
        fontFamily: F.mono,
        fontSize: 11,
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

function VenomousChip({ value }: { value: VenomousLabel }) {
  const { bg, tone } = venomousTone(value);
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 10px",
        borderRadius: 999,
        background: bg,
        color: tone,
        fontFamily: F.mono,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: 0.4,
      }}
    >
      {value}
    </span>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ marginTop: 16 }}>
      <div
        style={{
          fontFamily: F.mono,
          fontSize: 9.5,
          color: C.ink3,
          letterSpacing: 1.2,
          textTransform: "uppercase",
          marginBottom: 6,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: F.ui,
          fontSize: 13.5,
          color: C.ink,
          lineHeight: 1.5,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function formatNumber(n: number): string {
  return n.toLocaleString();
}

export function SpeciesDetailSheet({
  species,
  onClose,
}: SpeciesDetailSheetProps) {
  useEffect(() => {
    if (!species) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [species, onClose]);

  if (!species) return null;

  const candidate = findCandidate(species.sci);
  const curated = findSnake(species.sci);
  const photoUrl = species.localPhoto ?? candidate?.photo?.url;
  const observations = candidate?.observationsThailand;
  const wikipediaSummary = candidate?.wikipediaSummary ?? null;
  const habitat = curated?.habitat ?? null;
  const handle = curated?.handle ?? null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 30,
        background: "rgba(10,4,20,0.55)",
        display: "flex",
        alignItems: "flex-end",
        animation: "sid-fade-in 200ms ease",
      }}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        style={{
          background: C.cream,
          width: "100%",
          maxWidth: 480,
          marginInline: "auto",
          borderTopLeftRadius: 26,
          borderTopRightRadius: 26,
          padding: "14px 0 22px",
          boxShadow: "var(--sid-shadow-sheet)",
          animation: "sid-rise 280ms var(--sid-ease-sheet)",
          maxHeight: "90%",
          overflow: "auto",
          paddingBottom: "max(22px, env(safe-area-inset-bottom))",
        }}
      >
        <div
          style={{
            width: 38,
            height: 4,
            borderRadius: 4,
            background: C.hair,
            margin: "0 auto 12px",
          }}
        />

        {photoUrl && (
          <div style={{ padding: "0 18px 12px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoUrl}
              alt=""
              style={{
                width: "100%",
                aspectRatio: "4/3",
                borderRadius: 16,
                objectFit: "cover",
                background: C.paper,
                boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.15)",
              }}
            />
          </div>
        )}

        <div style={{ padding: "0 18px" }}>
          <div
            style={{
              fontFamily: F.disp,
              fontStyle: "italic",
              fontSize: 28,
              lineHeight: 1.05,
              color: C.ink,
            }}
          >
            {species.en}
          </div>
          <div
            style={{
              fontFamily: F.ui,
              fontSize: 14,
              color: C.ink2,
              marginTop: 4,
            }}
          >
            {species.th} ·{" "}
            <span style={{ fontStyle: "italic", color: C.ink3 }}>
              {species.sci}
            </span>
          </div>

          <div
            style={{
              marginTop: 12,
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
            }}
          >
            <DangerChip level={species.danger} />
            <VenomousChip value={species.venomous} />
          </div>

          <Section title="📍 Where to find">
            <div>{species.region}</div>
            {typeof observations === "number" && observations > 0 && (
              <div
                style={{
                  marginTop: 6,
                  fontFamily: F.mono,
                  fontSize: 11,
                  color: C.moss2,
                  letterSpacing: 0.4,
                }}
              >
                {formatNumber(observations)} iNaturalist observations in
                Thailand
              </div>
            )}
          </Section>

          {habitat && <Section title="Habitat">{habitat}</Section>}

          {handle && <Section title="How to handle">{handle}</Section>}

          {wikipediaSummary && (
            <Section title="About">{wikipediaSummary}</Section>
          )}

          <div
            style={{
              display: "flex",
              gap: 8,
              marginTop: 18,
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: "12px 14px",
                borderRadius: 12,
                cursor: "pointer",
                background: "transparent",
                color: C.ink,
                border: `1px solid ${C.hair}`,
                fontFamily: F.ui,
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Close
            </button>
            <a
              href={species.wikiUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: "12px 14px",
                borderRadius: 12,
                background: "var(--sid-bg-cta)",
                color: "#FFFFFF",
                fontFamily: F.ui,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: "var(--sid-shadow-cta)",
              }}
            >
              📖 Read on Wikipedia
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
