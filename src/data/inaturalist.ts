import type { SnakeCandidate } from "@/lib/types";
import { snakeCandidates } from "@/data/snake-candidates";

export { snakeCandidates };

export function findCandidate(sci: string): SnakeCandidate | undefined {
  const needle = sci.trim().toLowerCase();
  return snakeCandidates.find((c) => c.sci.trim().toLowerCase() === needle);
}
