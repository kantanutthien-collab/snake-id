import type { OtherCreature } from "@/lib/types";

export const others: OtherCreature[] = [
  { id: "human", label: "Human", emoji: "人" },
  { id: "dog", label: "Dog", emoji: "犬" },
  { id: "cat", label: "Cat", emoji: "猫" },
  { id: "bird", label: "Bird", emoji: "鳥" },
  { id: "lizard", label: "Lizard", emoji: "蜥" },
];

export function findOther(id: string): OtherCreature | undefined {
  return others.find((o) => o.id === id);
}
