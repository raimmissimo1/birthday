export type CakePresetId = "romantic" | "classic" | "luxury" | "cosmic" | "rainbow";

export type CakePreset = {
  id: CakePresetId;
  name: string;
  description: string;
  tier: "standard" | "premium";
  layers: readonly string[];
  frosting: string;
  decoration: "flowers" | "sprinkles" | "gold" | "stars" | "rainbow";
  decorationColor: string;
  candleCount: number;
  candleColor: string;
  flameColor: string;
  glow: number;
  scale: number;
};
