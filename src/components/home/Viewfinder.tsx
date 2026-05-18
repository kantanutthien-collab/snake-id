"use client";

import type { RefObject } from "react";
import { F } from "./theme";
import { CloseIcon } from "./icons";

export type ViewfinderMode = "idle" | "live" | "analyzing";

interface ViewfinderProps {
  mode: ViewfinderMode;
  videoRef: RefObject<HTMLVideoElement | null>;
  onTap?: () => void;
  onClose?: () => void;
}

interface CornerPos {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  rotation: number;
}

const CORNERS: CornerPos[] = [
  { top: 18, left: 18, rotation: 0 },
  { top: 18, right: 18, rotation: 90 },
  { bottom: 18, right: 18, rotation: 180 },
  { bottom: 18, left: 18, rotation: 270 },
];

export function Viewfinder({
  mode,
  videoRef,
  onTap,
  onClose,
}: ViewfinderProps) {
  const tappable = mode === "idle" && !!onTap;
  const scanning = mode === "analyzing";

  return (
    <div
      role={tappable ? "button" : undefined}
      tabIndex={tappable ? 0 : undefined}
      onClick={tappable ? onTap : undefined}
      onKeyDown={
        tappable
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onTap?.();
              }
            }
          : undefined
      }
      style={{
        margin: "0 16px",
        borderRadius: 22,
        overflow: "hidden",
        position: "relative",
        aspectRatio: "4 / 5",
        cursor: tappable ? "pointer" : "default",
        background:
          "radial-gradient(120% 80% at 50% 30%, #2E1C52 0%, #170A2E 60%, #08031A 100%)",
        boxShadow:
          "0 18px 40px -20px rgba(50,20,90,0.6), inset 0 0 0 1px rgba(190,160,240,0.10)",
      }}
    >
      {/* live video — hidden when mode !== "live" but kept mounted so ref is stable */}
      <video
        ref={videoRef}
        playsInline
        muted
        autoPlay
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: mode === "live" ? 1 : 0,
          transition: "opacity 200ms ease",
        }}
      />

      {/* texture overlay — only on non-live */}
      {mode !== "live" && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.2,
            backgroundImage:
              "repeating-linear-gradient(115deg, rgba(200,170,240,0.20) 0 2px, transparent 2px 9px), repeating-linear-gradient(35deg, rgba(120,80,180,0.22) 0 1px, transparent 1px 7px)",
            mixBlendMode: "screen",
          }}
        />
      )}

      {/* vignette */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(120% 80% at 50% 60%, transparent 50%, rgba(8,3,26,0.6) 100%)",
        }}
      />

      {/* corner brackets */}
      {CORNERS.map((p, i) => (
        <div
          key={i}
          aria-hidden
          style={{
            position: "absolute",
            top: p.top,
            left: p.left,
            right: p.right,
            bottom: p.bottom,
            width: 26,
            height: 26,
            borderTop: "2px solid rgba(255,255,255,0.85)",
            borderLeft: "2px solid rgba(255,255,255,0.85)",
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}

      {/* scan line */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 6,
          right: 6,
          height: 2,
          borderRadius: 2,
          background:
            "linear-gradient(90deg, transparent, rgba(190,150,240,0.9), transparent)",
          boxShadow: "0 0 16px 2px rgba(170,120,230,0.6)",
          top: scanning ? "50%" : 0,
          animation: scanning
            ? "sid-scan-fast 1.1s linear infinite"
            : "sid-scan-slow 4.5s ease-in-out infinite",
        }}
      />

      {/* idle/analyzing center text — hidden in live mode */}
      {mode !== "live" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            color: "rgba(241,235,255,0.92)",
            padding: 24,
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/snake-icon.png"
            alt=""
            width={72}
            height={72}
            style={{
              width: 72,
              height: 72,
              objectFit: "contain",
              filter: "brightness(0) invert(1)",
              opacity: 0.95,
            }}
          />
          <div
            style={{
              fontFamily: F.disp,
              fontStyle: "italic",
              fontSize: 26,
              lineHeight: 1.1,
              color: "#F1EBFF",
            }}
          >
            {scanning ? "Reading the scales…" : "Point camera at any animal"}
          </div>
          <div
            style={{
              fontFamily: F.mono,
              fontSize: 10.5,
              letterSpacing: 1.4,
              textTransform: "uppercase",
              color: "rgba(200,180,240,0.65)",
            }}
          >
            {scanning
              ? "Analyzing · Claude vision"
              : "Tap to open camera · Or use Scan now to upload"}
          </div>
        </div>
      )}

      {/* top-left mode chip */}
      <div
        style={{
          position: "absolute",
          top: 14,
          left: 14,
          padding: "5px 9px",
          borderRadius: 999,
          background: "rgba(40,20,70,0.55)",
          border: "1px solid rgba(200,170,240,0.22)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          fontFamily: F.mono,
          fontSize: 9.5,
          letterSpacing: 1,
          textTransform: "uppercase",
          color: "#EAD9FF",
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: 999,
            background: mode === "live" ? "#3FB950" : "#C9A7F5",
            boxShadow: `0 0 8px ${mode === "live" ? "#3FB950" : "#C9A7F5"}`,
          }}
        />
        {mode === "live" ? "Live · Camera" : "Live · Auto-focus"}
      </div>

      {/* top-right close button (camera mode only) */}
      {mode === "live" && onClose && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
          aria-label="Close camera"
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            padding: 6,
            borderRadius: 999,
            background: "rgba(40,20,70,0.65)",
            border: "1px solid rgba(200,170,240,0.22)",
            color: "#EAD9FF",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
          }}
        >
          <CloseIcon size={14} color="#EAD9FF" />
        </button>
      )}

      {/* top-right info hint (non-live) */}
      {mode !== "live" && (
        <div
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            padding: "5px 9px",
            borderRadius: 999,
            background: "rgba(40,20,70,0.45)",
            fontFamily: F.mono,
            fontSize: 9.5,
            color: "rgba(234,217,255,0.75)",
            letterSpacing: 0.8,
          }}
        >
          3 m · 1/250s
        </div>
      )}
    </div>
  );
}
