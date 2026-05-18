import { snakes } from "@/data/snakes";
import { others } from "@/data/others";
import { findCandidate } from "@/data/inaturalist";
import type {
  DangerLevel,
  OtherCreature,
  ScanResult,
  Snake,
  SnakeCandidate,
} from "@/lib/types";

export interface AiIdentification {
  kind: "snake" | "other";
  scientific?: string | null;
  common: string;
  thai?: string | null;
  confidence: number;
}

const FALLBACK_SWATCH: [string, string, string] = ["#3F2A60", "#5C3F88", "#A38BD8"];

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function findCuratedSnake(sci?: string | null, en?: string): Snake | undefined {
  if (sci) {
    const needle = normalize(sci);
    const bySci = snakes.find((s) => normalize(s.sci) === needle);
    if (bySci) return bySci;
  }
  if (en) {
    const needle = normalize(en);
    const byEn = snakes.find((s) => normalize(s.en) === needle);
    if (byEn) return byEn;
  }
  return undefined;
}

function candidateToSnake(c: SnakeCandidate): Snake {
  const en = c.en ?? c.sci;
  return {
    id: c.id,
    en,
    th: c.th ?? "—",
    sci: c.sci,
    family: c.family ?? "Unknown",
    danger: (c.danger ?? 3) as DangerLevel,
    venom: c.venom ?? "Unknown — treat as venomous",
    size: c.size ?? "Unknown",
    swatch: c.swatch ?? FALLBACK_SWATCH,
    idCues: c.idCues ?? [],
    habitat: c.habitat ?? "Unknown",
    handle: c.handle ?? "Keep distance until identification is verified.",
    firstAid:
      c.firstAid ?? "If bitten, call 1669 immediately and rush to hospital.",
  };
}

function synthesizeSnake(ai: AiIdentification): Snake {
  const sci = (ai.scientific ?? ai.common).trim();
  const slug = sci.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return {
    id: `ai:${slug || "unknown"}`,
    en: ai.common,
    th: ai.thai ?? "—",
    sci: ai.scientific ?? "Unknown",
    family: "Unknown",
    danger: 3,
    venom: "Unknown — treat as venomous",
    size: "Unknown",
    swatch: FALLBACK_SWATCH,
    idCues: ["Identification uncertain — verify before approaching."],
    habitat: "Unknown",
    handle: "Treat any unfamiliar snake as venomous. Back away slowly.",
    firstAid: "If bitten, call 1669 immediately and rush to hospital.",
  };
}

function findCuratedOther(label: string): OtherCreature | undefined {
  const needle = normalize(label);
  return others.find(
    (o) => normalize(o.label) === needle || normalize(o.id) === needle,
  );
}

function synthesizeOther(label: string): OtherCreature {
  const trimmed = label.trim();
  const slug = trimmed.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return {
    id: `ai:${slug || "other"}`,
    label: trimmed || "Unknown creature",
    emoji: "?",
  };
}

export function matchScan(ai: AiIdentification): ScanResult {
  if (ai.kind === "snake") {
    const curated = findCuratedSnake(ai.scientific, ai.common);
    if (curated) {
      return { kind: "snake", snake: curated, confidence: ai.confidence };
    }
    const candidate = ai.scientific ? findCandidate(ai.scientific) : undefined;
    if (candidate) {
      return {
        kind: "snake",
        snake: candidateToSnake(candidate),
        photo: candidate.photo ?? undefined,
        wikipediaUrl: candidate.wikipediaUrl ?? undefined,
        confidence: ai.confidence,
        draft: candidate.draft,
      };
    }
    return {
      kind: "snake",
      snake: synthesizeSnake(ai),
      confidence: ai.confidence,
      draft: true,
    };
  }

  const curated = findCuratedOther(ai.common);
  return {
    kind: "other",
    other: curated ?? synthesizeOther(ai.common),
    confidence: ai.confidence,
  };
}
