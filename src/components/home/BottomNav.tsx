import type { ReactNode } from "react";
import { C, F } from "./theme";
import { BookIcon, HomeIcon, MapIcon, UserIcon } from "./icons";

type TabId = "home" | "library" | "map" | "profile";

interface TabProps {
  id: TabId;
  active: TabId;
  label: string;
  renderIcon: (color: string) => ReactNode;
}

function Tab({ id, active, label, renderIcon }: TabProps) {
  const on = id === active;
  const color = on ? C.ink : C.ink3;
  return (
    <button
      type="button"
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: "8px 0",
      }}
    >
      {renderIcon(color)}
      <span
        style={{
          fontFamily: F.mono,
          fontSize: 9.5,
          letterSpacing: 0.8,
          textTransform: "uppercase",
          color,
          fontWeight: on ? 600 : 400,
        }}
      >
        {label}
      </span>
    </button>
  );
}

interface BottomNavProps {
  active?: TabId;
}

export function BottomNav({ active = "home" }: BottomNavProps) {
  return (
    <div
      style={{
        marginTop: 18,
        padding: "8px 8px 4px",
        borderTop: `1px solid ${C.hair}`,
        background: C.cream,
        display: "flex",
        alignItems: "stretch",
        paddingBottom: "max(4px, env(safe-area-inset-bottom))",
      }}
    >
      <Tab
        id="home"
        active={active}
        label="Home"
        renderIcon={(c) => <HomeIcon color={c} />}
      />
      <Tab
        id="library"
        active={active}
        label="Library"
        renderIcon={(c) => <BookIcon color={c} />}
      />
      <Tab
        id="map"
        active={active}
        label="Map"
        renderIcon={(c) => <MapIcon color={c} />}
      />
      <Tab
        id="profile"
        active={active}
        label="Profile"
        renderIcon={(c) => <UserIcon color={c} />}
      />
    </div>
  );
}
