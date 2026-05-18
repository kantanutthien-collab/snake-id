import type { DangerLevel } from "@/lib/types";

export interface DangerStyle {
  label: string;
  short: string;
  tone: string;
  bg: string;
}

export const DANGER: Record<DangerLevel, DangerStyle> = {
  1: { label: "Non-venomous", short: "Safe", tone: "#A8DCB0", bg: "rgba(168,220,176,0.14)" },
  2: { label: "Mildly venomous", short: "Mild", tone: "#E5D58F", bg: "rgba(229,213,143,0.14)" },
  3: { label: "Venomous", short: "Venomous", tone: "#F0B377", bg: "rgba(240,179,119,0.16)" },
  4: { label: "Dangerous", short: "Dangerous", tone: "#F0846B", bg: "rgba(240,132,107,0.18)" },
  5: { label: "Deadly", short: "DEADLY", tone: "#F25D5D", bg: "rgba(242,93,93,0.20)" },
};
