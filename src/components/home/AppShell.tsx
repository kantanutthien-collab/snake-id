"use client";

import type { ReactNode } from "react";
import { BOTTOM_BAR_HEIGHT, BottomTabBar } from "./BottomTabBar";
import type { TabKey } from "./TabMenu";
import { TopBar } from "./TopBar";
import { C } from "./theme";

interface AppShellProps {
  city: string;
  tab: TabKey;
  onTabChange: (tab: TabKey) => void;
  children: ReactNode;
}

export function AppShell({ city, tab, onTabChange, children }: AppShellProps) {
  return (
    <div
      style={{
        background: C.cream,
        color: C.ink,
        minHeight: "100vh",
        position: "relative",
        maxWidth: 480,
        margin: "0 auto",
      }}
    >
      <TopBar city={city} />

      <main>{children}</main>

      <div
        style={{
          height: `calc(${BOTTOM_BAR_HEIGHT}px + env(safe-area-inset-bottom))`,
        }}
      />

      <BottomTabBar active={tab} onChange={onTabChange} />
    </div>
  );
}
