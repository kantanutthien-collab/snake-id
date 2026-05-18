import { C, F } from "./theme";
import { GearIcon, PinIcon } from "./icons";

interface TopBarProps {
  city: string;
}

export function TopBar({ city }: TopBarProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "6px 20px 14px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            background: C.moss,
            display: "grid",
            placeItems: "center",
            color: "#FFFFFF",
            fontFamily: F.disp,
            fontSize: 20,
            lineHeight: 1,
            fontStyle: "italic",
          }}
        >
          S
        </div>
        <div style={{ lineHeight: 1.05 }}>
          <div
            style={{
              fontFamily: F.ui,
              fontSize: 15,
              fontWeight: 600,
              color: C.ink,
              letterSpacing: -0.2,
            }}
          >
            Snake<span style={{ color: C.ink3 }}>·</span>ID
          </div>
          <div
            style={{
              fontFamily: F.mono,
              fontSize: 9.5,
              color: C.ink3,
              letterSpacing: 1,
              textTransform: "uppercase",
              marginTop: 2,
            }}
          >
            Field assistant · TH
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            padding: "6px 10px",
            borderRadius: 999,
            background: C.surface,
            border: `1px solid ${C.hair}`,
            fontFamily: F.mono,
            fontSize: 10.5,
            color: C.ink2,
            letterSpacing: 0.4,
          }}
        >
          <PinIcon size={11} color={C.moss2} /> {city}
        </div>
        <button
          type="button"
          aria-label="Settings"
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            border: `1px solid ${C.hair}`,
            background: C.surface,
            color: C.ink2,
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
          }}
        >
          <GearIcon size={16} color={C.ink2} />
        </button>
      </div>
    </div>
  );
}
