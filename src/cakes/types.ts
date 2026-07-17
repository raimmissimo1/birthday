export type CakePresetId = "romantic" | "classic" | "luxury" | "cosmic" | "rainbow";
export type CakeRenderMode = "model" | "procedural";
export type CakeVariant = CakePresetId;

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
  renderMode?: CakeRenderMode;
  modelUrl?: string;
  fallbackPreset?: CakePresetId;
  position?: [number, number, number];
  candleAnchors?: Array<[number, number, number]>;
  colors?: { base: string; frosting: string; accent: string; decoration: string; candle: string[] };
  decorations?: { berries?: boolean; hearts?: boolean; flowers?: boolean; gold?: boolean; sprinkles?: boolean; stars?: boolean };
};
