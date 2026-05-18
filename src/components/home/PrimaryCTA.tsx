"use client";

import { F } from "./theme";
import { SnapIcon, SpinnerIcon, UploadIcon } from "./icons";

export type CTAMode = "idle" | "camera" | "analyzing";

interface PrimaryCTAProps {
  mode: CTAMode;
  onClick: () => void;
}

const COPY: Record<CTAMode, { label: string; sub: string; tail: string }> = {
  idle: {
    label: "Scan now",
    sub: "Tap to upload a photo from your device",
    tail: "PICK →",
  },
  camera: {
    label: "Take picture",
    sub: "Center the animal in frame",
    tail: "SNAP",
  },
  analyzing: {
    label: "Identifying…",
    sub: "Asking Claude vision",
    tail: "WAIT",
  },
};

export function PrimaryCTA({ mode, onClick }: PrimaryCTAProps) {
  const { label, sub, tail } = COPY[mode];
  const disabled = mode === "analyzing";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{
        margin: "18px 16px 0",
        width: "calc(100% - 32px)",
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 18px",
        background: disabled
          ? "var(--sid-bg-cta-loading)"
          : "var(--sid-bg-cta)",
        color: "#FFFFFF",
        border: "none",
        borderRadius: 18,
        cursor: disabled ? "wait" : "pointer",
        boxShadow: disabled
          ? "none"
          : "0 18px 32px -14px rgba(40,10,80,0.85), 0 4px 10px -4px rgba(0,0,0,0.6), inset 0 1px 0 rgba(200,170,240,0.25), inset 0 -1px 0 rgba(0,0,0,0.4)",
        transition: "transform 120ms ease, background 200ms ease",
        textAlign: "left",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          background: "rgba(255,255,255,0.15)",
          color: "#FFFFFF",
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.18)",
        }}
      >
        {mode === "analyzing" ? (
          <SpinnerIcon size={22} color="#FFFFFF" />
        ) : mode === "camera" ? (
          <SnapIcon size={22} color="#FFFFFF" />
        ) : (
          <UploadIcon size={22} color="#FFFFFF" />
        )}
      </div>
      <div style={{ flex: 1, lineHeight: 1.15 }}>
        <div
          style={{
            fontFamily: F.ui,
            fontSize: 19,
            fontWeight: 600,
            letterSpacing: -0.3,
            color: "#FFFFFF",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 10.5,
            color: "rgba(255,255,255,0.78)",
            letterSpacing: 0.6,
            marginTop: 3,
            textTransform: "uppercase",
          }}
        >
          {sub}
        </div>
      </div>
      <div
        style={{
          fontFamily: F.mono,
          fontSize: 11,
          color: "rgba(255,255,255,0.7)",
          letterSpacing: 1,
        }}
      >
        {tail}
      </div>
    </button>
  );
}
