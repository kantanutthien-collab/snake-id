"use client";

import type { ReactNode } from "react";
import { C, F } from "./theme";
import { CameraSimpleIcon, ListIcon } from "./icons";
import type { TabKey } from "./TabMenu";

export const BOTTOM_BAR_HEIGHT = 64;

interface TabOption {
  key: TabKey;
  label: string;
  icon: (color: string) => ReactNode;
}

const TABS: TabOption[] = [
  {
    key: "snakes",
    label: "Snakes",
    icon: (c) => <CameraSimpleIcon size={22} color={c} />,
  },
  {
    key: "species",
    label: "Species",
    icon: (c) => <ListIcon size={22} color={c} />,
  },
];

interface BottomTabBarProps {
  active: TabKey;
  onChange: (key: TabKey) => void;
}

function Tab({
  active,
  label,
  renderIcon,
  onClick,
}: {
  active: boolean;
  label: string;
  renderIcon: (color: string) => ReactNode;
  onClick: () => void;
}) {
  const iconColor = active ? "#FFFFFF" : C.ink2;
  const labelColor = active ? C.ink : C.ink2;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        padding: "8px 0 4px",
        background: "transparent",
        border: "none",
        cursor: "pointer",
      }}
    >
      <span
        style={{
          padding: "7px 22px",
          borderRadius: 999,
          background: active
            ? "linear-gradient(180deg, #A38BD8 0%, #7E5BC4 100%)"
            : "transparent",
          boxShadow: active
            ? "0 8px 18px -6px rgba(163,139,216,0.6), inset 0 1px 0 rgba(241,235,255,0.3)"
            : "none",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 160ms ease, box-shadow 160ms ease",
        }}
      >
        {renderIcon(iconColor)}
      </span>
      <span
        style={{
          fontFamily: F.ui,
          fontSize: 11.5,
          color: labelColor,
          fontWeight: active ? 700 : 500,
          letterSpacing: -0.1,
        }}
      >
        {label}
      </span>
    </button>
  );
}

export function BottomTabBar({ active, onChange }: BottomTabBarProps) {
  return (
    <nav
      aria-label="Primary"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          background: "#3A1F62",
          borderTop: "1px solid rgba(200,170,240,0.18)",
          paddingBottom: "env(safe-area-inset-bottom)",
          pointerEvents: "auto",
          boxShadow: "0 -8px 18px -10px rgba(0,0,0,0.7)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "stretch",
            padding: "0 8px",
          }}
        >
          {TABS.map((tab) => (
            <Tab
              key={tab.key}
              active={tab.key === active}
              label={tab.label}
              renderIcon={tab.icon}
              onClick={() => onChange(tab.key)}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}
