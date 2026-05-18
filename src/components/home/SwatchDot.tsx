interface SwatchDotProps {
  colors: readonly [string, string, string];
  size?: number;
}

export function SwatchDot({ colors, size = 44 }: SwatchDotProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 12,
        overflow: "hidden",
        position: "relative",
        flexShrink: 0,
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: colors[0] }} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(135deg, transparent 33%, ${colors[1]} 33% 66%, ${colors[2]} 66%)`,
        }}
      />
    </div>
  );
}
