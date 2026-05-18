"use client";

import { useEffect } from "react";
import type { CSSProperties, ReactNode } from "react";
import { DANGER } from "@/data/danger";
import type { CCPhoto, ScanResult } from "@/lib/types";
import { C, F } from "./theme";

interface ResultPeekProps {
  result: ScanResult | null;
  userPhotoDataUrl: string | null;
  onClose: () => void;
}

const btnPrimary: CSSProperties = {
  flex: 1,
  padding: "12px 14px",
  borderRadius: 12,
  border: "none",
  cursor: "pointer",
  background: "var(--sid-bg-cta)",
  color: "#FFFFFF",
  fontFamily: F.ui,
  fontSize: 14,
  fontWeight: 600,
  letterSpacing: -0.1,
  boxShadow: "var(--sid-shadow-cta)",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
};

const btnGhost: CSSProperties = {
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
  textAlign: "center" as const,
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
};

function Chip({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        padding: "3px 8px",
        borderRadius: 999,
        background: C.surface,
        border: `1px solid ${C.hair}`,
        fontFamily: F.mono,
        fontSize: 10,
        color: C.ink2,
        letterSpacing: 0.4,
      }}
    >
      {children}
    </span>
  );
}

function Section({
  title,
  children,
  emphasis,
}: {
  title: string;
  children: ReactNode;
  emphasis?: boolean;
}) {
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
          color: emphasis ? "#F4D2C8" : C.ink,
          lineHeight: 1.45,
          padding: emphasis ? "10px 12px" : 0,
          background: emphasis ? "rgba(242,93,93,0.10)" : "transparent",
          border: emphasis ? "1px solid rgba(242,93,93,0.30)" : "none",
          borderRadius: emphasis ? 12 : 0,
          fontWeight: emphasis ? 500 : 400,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function HeroPhoto({
  userPhotoDataUrl,
  referencePhoto,
}: {
  userPhotoDataUrl: string | null;
  referencePhoto?: CCPhoto;
}) {
  if (!userPhotoDataUrl && !referencePhoto) return null;
  return (
    <div style={{ padding: "0 18px 12px" }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "4/3",
          borderRadius: 16,
          overflow: "hidden",
          background: C.paper,
          boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.15)",
        }}
      >
        {userPhotoDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={userPhotoDataUrl}
            alt="Your scan"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : referencePhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={referencePhoto.url}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : null}
        <span
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            padding: "4px 8px",
            borderRadius: 999,
            background: "rgba(10,4,20,0.65)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            fontFamily: F.mono,
            fontSize: 9.5,
            color: "#EAD9FF",
            letterSpacing: 0.8,
            textTransform: "uppercase",
          }}
        >
          {userPhotoDataUrl ? "Your photo" : "Reference"}
        </span>
      </div>
    </div>
  );
}

function StatusBadge({
  label,
  tone,
  bg,
  level,
}: {
  label: string;
  tone: string;
  bg: string;
  level?: number;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 12px",
        borderRadius: 999,
        background: bg,
        color: tone,
        fontFamily: F.ui,
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: -0.1,
      }}
    >
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: 999,
          background: tone,
          boxShadow: `0 0 8px ${tone}`,
        }}
      />
      {label}
      {typeof level === "number" && (
        <span
          style={{
            marginLeft: 2,
            opacity: 0.85,
            fontFamily: F.mono,
            fontSize: 10.5,
            letterSpacing: 0.6,
          }}
        >
          ({level}/5)
        </span>
      )}
    </span>
  );
}

function ConfidenceBadge({ pct }: { pct: number }) {
  const tone =
    pct >= 80 ? "#A8DCB0" : pct >= 60 ? "#E5D58F" : "#F0846B";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 10px",
        borderRadius: 999,
        background: C.surface,
        border: `1px solid ${C.hair}`,
        fontFamily: F.mono,
        fontSize: 11,
        color: C.ink2,
        letterSpacing: 0.4,
      }}
    >
      <span style={{ color: tone, fontWeight: 600 }}>{pct}%</span>
      confidence
    </span>
  );
}

export function ResultPeek({
  result,
  userPhotoDataUrl,
  onClose,
}: ResultPeekProps) {
  useEffect(() => {
    if (!result) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [result, onClose]);

  if (!result) return null;

  const isSnake = result.kind === "snake";

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

        {isSnake ? (
          <SnakeResult
            result={result}
            userPhotoDataUrl={userPhotoDataUrl}
            onClose={onClose}
          />
        ) : (
          <OtherResult
            result={result}
            userPhotoDataUrl={userPhotoDataUrl}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
}

function buildShareText(result: ScanResult): string {
  if (result.kind === "snake") {
    const s = result.snake;
    const danger = DANGER[s.danger];
    return `Snake·ID — ${s.en} (${s.th})\n${s.sci}\nStatus: ${danger.label} (${s.danger}/5) · ${s.venom}\nFirst aid: ${s.firstAid}\n\nThai emergency: 1669`;
  }
  return `Snake·ID — Not a snake: ${result.other.label}`;
}

function lineShareUrl(text: string): string {
  return `https://line.me/R/msg/text/?${encodeURIComponent(text)}`;
}

function SnakeResult({
  result,
  userPhotoDataUrl,
  onClose,
}: {
  result: Extract<ScanResult, { kind: "snake" }>;
  userPhotoDataUrl: string | null;
  onClose: () => void;
}) {
  const { snake, photo, wikipediaUrl, confidence, draft } = result;
  const confidencePct =
    typeof confidence === "number" ? Math.round(confidence * 100) : null;
  const danger = DANGER[snake.danger];
  const isDeadly = snake.danger >= 4;
  const shareText = buildShareText(result);

  return (
    <>
      <HeroPhoto
        userPhotoDataUrl={userPhotoDataUrl}
        referencePhoto={photo}
      />
      <div style={{ padding: "0 18px" }}>
        {/* Title block */}
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 10,
            color: C.ink3,
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          Identified
          {confidencePct !== null ? ` · ${confidencePct}% confidence` : ""}
        </div>
        <div
          style={{
            fontFamily: F.disp,
            fontStyle: "italic",
            fontSize: 30,
            lineHeight: 1.05,
            color: C.ink,
            marginTop: 2,
          }}
        >
          {snake.en}
        </div>
        <div
          style={{
            fontFamily: F.ui,
            fontSize: 14,
            color: C.ink2,
            marginTop: 4,
          }}
        >
          {snake.th && snake.th !== "—" ? `${snake.th} · ` : ""}
          <span style={{ fontStyle: "italic", color: C.ink3 }}>
            {snake.sci}
          </span>
        </div>

        {/* Status row */}
        <div
          style={{
            marginTop: 14,
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <StatusBadge
            label={danger.label}
            tone={danger.tone}
            bg={danger.bg}
            level={snake.danger}
          />
          {confidencePct !== null && <ConfidenceBadge pct={confidencePct} />}
        </div>

        {/* Headline / handling tagline */}
        <div
          style={{
            marginTop: 14,
            padding: "12px 14px",
            borderRadius: 14,
            background: isDeadly
              ? "rgba(242,93,93,0.12)"
              : "rgba(126,91,196,0.10)",
            border: isDeadly
              ? "1px solid rgba(242,93,93,0.30)"
              : "1px solid rgba(163,139,216,0.20)",
            fontFamily: F.ui,
            fontSize: 14,
            fontWeight: 500,
            lineHeight: 1.45,
            color: isDeadly ? "#F4D2C8" : C.ink,
          }}
        >
          {snake.handle}
        </div>

        {/* Quick facts */}
        <div
          style={{
            marginTop: 12,
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
          }}
        >
          <Chip>{snake.family}</Chip>
          <Chip>{snake.venom}</Chip>
          <Chip>{snake.size}</Chip>
        </div>

        {/* Draft warning */}
        {draft && (
          <div
            style={{
              marginTop: 12,
              padding: "8px 12px",
              borderRadius: 10,
              background: "rgba(240,165,0,0.10)",
              border: "1px solid rgba(240,165,0,0.30)",
              fontFamily: F.mono,
              fontSize: 10.5,
              color: "#F0A500",
              letterSpacing: 0.4,
              lineHeight: 1.45,
            }}
          >
            ⚠ Partial data only. Treat unknown snakes as venomous and consult a
            local expert.
          </div>
        )}

        {/* Details */}
        {snake.idCues.length > 0 && (
          <Section title="ID cues">
            <ul
              style={{
                margin: 0,
                padding: 0,
                listStyle: "none",
                display: "grid",
                gap: 6,
              }}
            >
              {snake.idCues.map((cue, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    gap: 8,
                    fontFamily: F.ui,
                    fontSize: 13,
                    color: C.ink,
                    lineHeight: 1.35,
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      marginTop: 6,
                      width: 6,
                      height: 6,
                      borderRadius: 999,
                      background: danger.tone,
                    }}
                  />
                  {cue}
                </li>
              ))}
            </ul>
          </Section>
        )}
        <Section title="Habitat">{snake.habitat}</Section>
        <Section title="First aid" emphasis={isDeadly}>
          {snake.firstAid}
        </Section>

        {/* Emergency call (only when deadly) */}
        {isDeadly && (
          <a
            href="tel:1669"
            style={{
              marginTop: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "12px 14px",
              borderRadius: 12,
              background: "var(--sid-bg-emergency)",
              color: "var(--sid-emerg-ink)",
              textDecoration: "none",
              fontFamily: F.ui,
              fontWeight: 600,
              fontSize: 14,
              boxShadow: "var(--sid-shadow-emergency)",
            }}
          >
            🚨 Call 1669 · Thai ambulance
          </a>
        )}

        {/* Photo attribution */}
        {photo && (
          <div
            style={{
              marginTop: 14,
              fontFamily: F.mono,
              fontSize: 9.5,
              color: C.ink3,
              letterSpacing: 0.4,
              lineHeight: 1.5,
            }}
          >
            Reference photo: {photo.attribution} ({photo.license}) ·{" "}
            <a
              href={photo.source}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: C.moss2 }}
            >
              source
            </a>
          </div>
        )}

        {/* Actions */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginTop: 18,
            flexWrap: "wrap",
          }}
        >
          <button type="button" onClick={onClose} style={btnGhost}>
            Dismiss
          </button>
          <a
            href={lineShareUrl(shareText)}
            target="_blank"
            rel="noopener noreferrer"
            style={btnPrimary}
          >
            💬 Share via LINE
          </a>
          {wikipediaUrl && (
            <a
              href={wikipediaUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...btnGhost, flex: "1 0 100%", marginTop: 4 }}
            >
              📖 Wikipedia →
            </a>
          )}
        </div>
      </div>
    </>
  );
}

function OtherResult({
  result,
  userPhotoDataUrl,
  onClose,
}: {
  result: Extract<ScanResult, { kind: "other" }>;
  userPhotoDataUrl: string | null;
  onClose: () => void;
}) {
  const { other, confidence } = result;
  const confidencePct =
    typeof confidence === "number" ? Math.round(confidence * 100) : null;

  return (
    <>
      <HeroPhoto userPhotoDataUrl={userPhotoDataUrl} />
      <div style={{ padding: "0 18px", textAlign: "center" }}>
        {!userPhotoDataUrl && (
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 24,
              background: C.paper,
              margin: "0 auto",
              display: "grid",
              placeItems: "center",
              fontFamily: F.disp,
              fontSize: 46,
              color: C.moss,
            }}
          >
            {other.emoji}
          </div>
        )}
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 10,
            color: C.ink3,
            letterSpacing: 1,
            textTransform: "uppercase",
            marginTop: 12,
          }}
        >
          Identified · Not a snake
          {confidencePct !== null ? ` · ${confidencePct}%` : ""}
        </div>
        <div
          style={{
            fontFamily: F.disp,
            fontStyle: "italic",
            fontSize: 40,
            color: C.ink,
            marginTop: 2,
            lineHeight: 1,
          }}
        >
          {other.label}
        </div>
        <div
          style={{
            fontFamily: F.ui,
            fontSize: 13,
            color: C.ink3,
            marginTop: 10,
            maxWidth: 280,
            marginInline: "auto",
            lineHeight: 1.4,
          }}
        >
          Snake-ID only stores full profiles for snakes. Other animals are just
          labelled.
        </div>
        <button
          type="button"
          onClick={onClose}
          style={{ ...btnPrimary, marginTop: 18, width: "100%" }}
        >
          Got it
        </button>
      </div>
    </>
  );
}
