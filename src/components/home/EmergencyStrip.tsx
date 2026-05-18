import { F } from "./theme";
import { PhoneIcon } from "./icons";

export function EmergencyStrip() {
  return (
    <a
      href="tel:1669"
      style={{
        margin: "18px 16px 0",
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 14px",
        borderRadius: 14,
        background: "linear-gradient(180deg, #8C2A1B, #6E1D12)",
        color: "#F6E8D6",
        textDecoration: "none",
        boxShadow: "0 12px 24px -16px rgba(140,42,27,0.7)",
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          background: "rgba(255,255,255,0.12)",
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
        }}
      >
        <PhoneIcon size={16} color="#F6E8D6" />
      </div>
      <div style={{ flex: 1, lineHeight: 1.15 }}>
        <div style={{ fontFamily: F.ui, fontSize: 14, fontWeight: 600 }}>
          Snakebite emergency?
        </div>
        <div
          style={{
            fontFamily: F.mono,
            fontSize: 10.5,
            color: "rgba(246,232,214,0.75)",
            letterSpacing: 0.6,
            marginTop: 3,
            textTransform: "uppercase",
          }}
        >
          Tap to call 1669 · Thai ambulance
        </div>
      </div>
      <div
        style={{
          fontFamily: F.disp,
          fontStyle: "italic",
          fontSize: 24,
          letterSpacing: 1,
          marginRight: 4,
        }}
      >
        1669
      </div>
    </a>
  );
}
