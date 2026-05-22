"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { C, F } from "./theme";
import { CameraSimpleIcon, ChevronDownIcon, ListIcon } from "./icons";

export type TabKey = "snakes" | "species" | "ask";

interface TabOption {
  key: TabKey;
  label: string;
  subtitle: string;
  icon: (color: string) => ReactNode;
}

const TABS: TabOption[] = [
  {
    key: "snakes",
    label: "Snakes",
    subtitle: "Camera identifier",
    icon: (c) => <CameraSimpleIcon size={16} color={c} />,
  },
  {
    key: "species",
    label: "Species",
    subtitle: "Snake reference list",
    icon: (c) => <ListIcon size={16} color={c} />,
  },
];

interface TabMenuProps {
  active: TabKey;
  onChange: (key: TabKey) => void;
}

export function TabMenu({ active, onChange }: TabMenuProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = TABS.find((t) => t.key === active) ?? TABS[0];

  return (
    <div
      ref={wrapperRef}
      style={{ position: "relative", margin: "8px 16px 12px" }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 14px",
          borderRadius: 999,
          background: C.surface,
          border: `1px solid ${C.hair}`,
          color: C.ink,
          fontFamily: F.ui,
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        {current.icon(C.moss2)}
        <span>{current.label}</span>
        <span
          style={{
            color: C.ink3,
            display: "inline-flex",
            transition: "transform 200ms ease",
            transform: open ? "rotate(180deg)" : "none",
          }}
        >
          <ChevronDownIcon size={14} color={C.ink3} />
        </span>
      </button>

      {open && (
        <div
          role="listbox"
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            zIndex: 25,
            background: C.surface,
            border: `1px solid ${C.hair}`,
            borderRadius: 14,
            padding: 6,
            boxShadow: "0 18px 40px -20px rgba(0,0,0,0.6)",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            animation: "sid-fade-in 120ms ease",
          }}
        >
          {TABS.map((tab) => {
            const isActive = tab.key === active;
            return (
              <button
                key={tab.key}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  onChange(tab.key);
                  setOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 12px",
                  borderRadius: 10,
                  background: isActive ? "rgba(126,91,196,0.15)" : "transparent",
                  border: isActive
                    ? "1px solid rgba(163,139,216,0.30)"
                    : "1px solid transparent",
                  color: C.ink,
                  fontFamily: F.ui,
                  textAlign: "left",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                <span
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    background: isActive ? C.moss : C.paper,
                    color: "#FFFFFF",
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                  }}
                >
                  {tab.icon("#FFFFFF")}
                </span>
                <span style={{ flex: 1 }}>
                  <span
                    style={{
                      display: "block",
                      fontSize: 14,
                      fontWeight: 600,
                      color: isActive ? C.ink : C.ink,
                    }}
                  >
                    {tab.label}
                  </span>
                  <span
                    style={{
                      display: "block",
                      fontFamily: F.mono,
                      fontSize: 10,
                      color: C.ink3,
                      letterSpacing: 0.4,
                      textTransform: "uppercase",
                      marginTop: 2,
                    }}
                  >
                    {tab.subtitle}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
