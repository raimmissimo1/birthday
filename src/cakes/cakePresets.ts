import type { CakePreset, CakePresetId } from "./types";

export const cakePresets: Record<CakePresetId, CakePreset> = {
  romantic: { id: "romantic", name: "Романтический", description: "Нежный крем, ягоды и цветы", tier: "standard", layers: ["#d85b88", "#f3b5ca"], frosting: "#fff2e8", decoration: "flowers", decorationColor: "#b93666", candleCount: 1, candleColor: "#f3b5ca", flameColor: "#ffd36a", glow: 0.7, scale: 1 },
  classic: { id: "classic", name: "Классический", description: "Светлый праздничный торт с посыпкой", tier: "standard", layers: ["#f7d995", "#ffeac3"], frosting: "#fffaf0", decoration: "sprinkles", decorationColor: "#50bce8", candleCount: 3, candleColor: "#67c9ec", flameColor: "#ffd65a", glow: 0.55, scale: 1 },
  luxury: { id: "luxury", name: "Люкс", description: "Тёмный шоколад и аккуратное золото", tier: "premium", layers: ["#24181c", "#3a2726"], frosting: "#e9d3a7", decoration: "gold", decorationColor: "#dcb55b", candleCount: 1, candleColor: "#dcb55b", flameColor: "#fff0a7", glow: 0.85, scale: 1.02 },
  cosmic: { id: "cosmic", name: "Космический", description: "Ночная палитра, звёзды и свечение", tier: "premium", layers: ["#171a4d", "#33246f"], frosting: "#a990e9", decoration: "stars", decorationColor: "#9ee7ff", candleCount: 2, candleColor: "#9ee7ff", flameColor: "#91dcff", glow: 1.1, scale: 1.02 },
  rainbow: { id: "rainbow", name: "Радужный", description: "Яркие слои и праздничная посыпка", tier: "standard", layers: ["#f35f8b", "#ffbd59", "#63c985"], frosting: "#fff9ed", decoration: "rainbow", decorationColor: "#9368df", candleCount: 3, candleColor: "#ffbf59", flameColor: "#fff17e", glow: 0.65, scale: 1 },
};
