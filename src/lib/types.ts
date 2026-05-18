export type DangerLevel = 1 | 2 | 3 | 4 | 5;

export interface Snake {
  id: string;
  en: string;
  th: string;
  sci: string;
  family: string;
  danger: DangerLevel;
  venom: string;
  size: string;
  swatch: [string, string, string];
  idCues: string[];
  habitat: string;
  handle: string;
  firstAid: string;
}

export interface SnakeCandidate {
  id: string;
  sci: string;
  en: string | null;
  th: string | null;
  family: string | null;
  genus: string | null;
  inatId: number;
  observationsThailand: number;
  wikipediaUrl: string | null;
  wikipediaSummary: string | null;
  photo: {
    url: string;
    license: string;
    attribution: string;
    source: string;
  } | null;
  danger?: DangerLevel;
  venom?: string;
  size?: string;
  swatch?: [string, string, string];
  idCues?: string[];
  habitat?: string;
  handle?: string;
  firstAid?: string;
  draft: boolean;
}

export interface OtherCreature {
  id: string;
  label: string;
  emoji: string;
}

export type Recent =
  | { kind: "snake"; ref: string; when: string; where: string }
  | { kind: "other"; ref: string; when: string; where: string };

export interface CCPhoto {
  url: string;
  license: string;
  attribution: string;
  source: string;
}

export type ScanResult =
  | {
      kind: "snake";
      snake: Snake;
      photo?: CCPhoto;
      wikipediaUrl?: string;
      confidence?: number;
      draft?: boolean;
    }
  | { kind: "other"; other: OtherCreature; confidence?: number };

export type PreviewKey =
  | "auto"
  | "pit-viper"
  | "krait"
  | "racer"
  | "dog"
  | "human";

export interface IdentifyApiResponse {
  result?: ScanResult;
  error?: string;
}
