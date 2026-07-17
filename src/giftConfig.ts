import type { BackgroundPresetId } from "./backgrounds/backgroundPresets";
import type { CakePresetId } from "./cakes/types";
import type { ExperienceSection } from "./experience/timeline/timelineTypes";

export type Vector3Tuple = [number, number, number];
export type PictureFrameConfig = { id: string; image: string; position: Vector3Tuple; rotation: Vector3Tuple; scale: number };
export type BirthdayCardConfig = { id: string; image: string; position: Vector3Tuple; rotation: Vector3Tuple; variant?: "flat" | "folded" | "envelope" };
export type GiftTheme = { cake: CakePresetId; background: BackgroundPresetId; accentColor?: string; customBackgroundUrl?: string };
export type GiftExperienceConfig = { template: "romantic-3d" | "cinematic"; allowSkipIntro: boolean; sections: ExperienceSection[] };
export type GiftGalleryConfig = { variant: "four-frames-3d" | "polaroid" | "carousel" | "memory-grid"; captions?: string[] };
export type GiftEffectsConfig = { ambient: Array<"stars" | "fireflies" | "orbs">; finale: Array<"fireworks" | "confetti" | "hearts" | "balloons">; intensity: "low" | "medium" | "high" };
export type GiftCakeConfig = { preset: CakePresetId };
export type GiftConfig = { id: string; slug: string; recipient: string; sender?: string; introLines: string[]; finalMessage: string; musicUrl?: string; theme: GiftTheme; experience: GiftExperienceConfig; gallery: GiftGalleryConfig; effects: GiftEffectsConfig; cake: GiftCakeConfig; frames: PictureFrameConfig[]; cards: BirthdayCardConfig[] };

export const businessConfig = { brandName: "CakeWish", domainExample: "cakewish.app", orderContactUrl: "https://t.me/futuretop1developer" };

const frameLayout: Omit<PictureFrameConfig, "id" | "image">[] = [
  { position: [1.78, 0.735, 1.62], rotation: [0, -1.7, 0], scale: 0.74 },
  { position: [-1.45, 0.735, 1.7], rotation: [0, -1.3, 0], scale: 0.7 },
  { position: [-1.45, 0.735, -1.7], rotation: [0, -1.84, 0], scale: 0.7 },
  { position: [1.78, 0.735, -1.62], rotation: [0, -1.44, 0], scale: 0.74 },
];

/** The current tabletop scene is intentionally designed for exactly four frames. */
export function normalizeGiftFrames(frames: PictureFrameConfig[]): PictureFrameConfig[] {
  return frameLayout.map((layout, index) => {
    const frame = frames[index];
    return frame ? { ...layout, ...frame } : { id: `placeholder-${index + 1}`, image: "/demo/photo-placeholder.svg", ...layout };
  });
}
export function isGiftConfig(value: unknown): value is GiftConfig { const gift = value as Partial<GiftConfig>; return Boolean(gift && typeof gift.id === "string" && typeof gift.slug === "string" && typeof gift.recipient === "string" && Array.isArray(gift.introLines) && gift.theme && Array.isArray(gift.frames) && Array.isArray(gift.cards) && gift.experience && Array.isArray(gift.experience.sections)); }
const defaultExperience = (lines: string[], variant: "terminal" | "cinematic" | "fake-chat" | "countdown" = "terminal"): GiftExperienceConfig => ({ template: "romantic-3d", allowSkipIntro: true, sections: [{ id: "opening", type: variant === "terminal" ? "typed-message" : variant === "cinematic" ? "cinematic-text" : variant === "fake-chat" ? "fake-chat" : "countdown", variant, lines, skippable: true }, { id: "cake", type: "cake-reveal" }, { id: "candles", type: "candle-interaction" }, { id: "finale", type: "fireworks" }, { id: "ending", type: "final-message" }] });

const demoFrames: PictureFrameConfig[] = [
  { id: "advertisement-1", image: "/demo/advertisement-1.svg", ...frameLayout[0] },
  { id: "advertisement-2", image: "/demo/advertisement-2.svg", ...frameLayout[1] },
  { id: "advertisement-3", image: "/demo/advertisement-3.svg", ...frameLayout[2] },
  { id: "advertisement-4", image: "/demo/advertisement-4.svg", ...frameLayout[3] },
];

export const gifts: GiftConfig[] = [
  { id: "demo-romantic", slug: "demo", recipient: "Акберен", sender: "Райымбек", introLines: ["> Акберен", "...", "> сегодня твой день", "...", "> этот сюрприз создан для тебя"], finalMessage: "С днём рождения! Пусть этот год будет светлым и счастливым.", musicUrl: "/music.mp3", theme: { cake: "romantic", background: "paris", accentColor: "#ff9bc8" }, experience: defaultExperience(["> Акберен", "...", "> сегодня твой день", "...", "> этот сюрприз создан для тебя"]), gallery: { variant: "four-frames-3d" }, effects: { ambient: ["fireflies"], finale: ["fireworks", "confetti"], intensity: "medium" }, cake: { preset: "romantic" }, frames: demoFrames, cards: [{ id: "confetti", image: "/demo/birthday-card.svg", position: [1.42, .11, 0.85], rotation: [-Math.PI / 2, 0.18, 0] }] },
  { id: "demo-cosmic", slug: "cosmic-demo", recipient: "Алия", introLines: ["Для тебя", "немного звёзд", "и много тёплых пожеланий"], finalMessage: "С днём рождения! Смело загадывай самое большое желание.", musicUrl: "/music.mp3", theme: { cake: "cosmic", background: "stars", accentColor: "#9ee7ff" }, experience: defaultExperience(["Для тебя", "немного звёзд", "и много тёплых пожеланий"], "cinematic"), gallery: { variant: "polaroid" }, effects: { ambient: ["stars"], finale: ["fireworks"], intensity: "medium" }, cake: { preset: "cosmic" }, frames: [{ ...demoFrames[0], image: "/frame4.jpg" }, { ...demoFrames[1], image: "/photo.jpeg" }], cards: [{ id: "card", image: "/card.png", position: [1, .081, -2], rotation: [-Math.PI / 2, 0, Math.PI / 3] }] },
  { id: "birthday-for-crush", slug: "birthday-for-crush", recipient: "Акберен", introLines: ["Привет", "У меня есть сюрприз", "Сегодня твой день"], finalMessage: "С днём рождения! Пусть этот день будет таким же ярким и красивым, как ты.", musicUrl: "/music.mp3", theme: { cake: "romantic", background: "paris", accentColor: "#ff9bc8" }, experience: defaultExperience(["Привет", "У меня есть сюрприз", "Сегодня твой день"], "fake-chat"), gallery: { variant: "carousel" }, effects: { ambient: ["fireflies"], finale: ["hearts"], intensity: "low" }, cake: { preset: "romantic" }, frames: [{ id: "dinner", image: "/orders/birthday-for-crush/dinner.jpg", ...frameLayout[0] }, { id: "blue-car", image: "/orders/birthday-for-crush/blue-car.jpg", ...frameLayout[1] }, { id: "white-dress", image: "/orders/birthday-for-crush/white-dress.jpg", ...frameLayout[2] }, { id: "placeholder", image: "/demo/photo-placeholder.svg", ...frameLayout[3] }], cards: [] },
];

export const defaultGift = gifts[0];
export function getGiftBySlug(slug: string) { return gifts.find((gift) => gift.slug === slug); }
