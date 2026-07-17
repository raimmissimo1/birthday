import { cakePresets } from "./cakePresets"; import type { CakePresetId } from "./types"; export function getCakePreset(id: string) { return cakePresets[id as CakePresetId] ?? cakePresets.classic; }
