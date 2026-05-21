import { C, F } from "./theme";
import { GearIcon, PinIcon } from "./icons";

interface TopBarProps {
  city: string;
}

export function TopBar({ city }: TopBarProps) {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        background: "#3A1F62",
        paddingTop: "env(safe-area-inset-top)",
        borderBottom: "1px solid rgba(200,170,240,0.18)",
        boxShadow: "0 8px 18px -10px rgba(0,0,0,0.7)",
      }}
    >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 20px 18px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/snake-logo-id.png"
          alt="Snake·ID"
          width={34}
          height={34}
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            objectFit: "cover",
            flexShrink: 0,
          }}
        />
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
            background: "#4A2B7A",
            border: "1px solid rgba(200,170,240,0.22)",
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
            background: C.paper,
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
    </div>
  );
}
