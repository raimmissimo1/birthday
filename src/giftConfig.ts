import type { BackgroundPresetId } from "./backgrounds/backgroundPresets";
import type { CakePresetId } from "./cakes/types";

export type Vector3Tuple = [number, number, number];
export type PictureFrameConfig = { id: string; image: string; position: Vector3Tuple; rotation: Vector3Tuple; scale: number };
export type BirthdayCardConfig = { id: string; image: string; position: Vector3Tuple; rotation: Vector3Tuple };
export type GiftTheme = { cake: CakePresetId; background: BackgroundPresetId; accentColor?: string; customBackgroundUrl?: string };
export type GiftConfig = { id: string; slug: string; recipient: string; sender?: string; introLines: string[]; finalMessage: string; musicUrl?: string; theme: GiftTheme; frames: PictureFrameConfig[]; cards: BirthdayCardConfig[] };

export const businessConfig = { brandName: "CakeWish", domainExample: "cakewish.app", orderContactUrl: "https://t.me/futuretop1developer" };

const demoFrames: PictureFrameConfig[] = [
  { id: "front", image: "/demo-girl.jpeg", position: [0, .735, 3], rotation: [0, 5.6, 0], scale: .75 },
  { id: "back", image: "/frame1.jpg", position: [0, .735, -3], rotation: [0, 4, 0], scale: .75 },
  { id: "left", image: "/frame2.jpg", position: [-1.5, .735, 2.5], rotation: [0, 5.4, 0], scale: .75 },
  { id: "right", image: "/frame3.jpg", position: [-1.5, .735, -2.5], rotation: [0, 4.2, 0], scale: .75 },
];

export const gifts: GiftConfig[] = [
  { id: "demo-romantic", slug: "demo", recipient: "Акберен", sender: "Райымбек", introLines: ["> Акберен", "...", "> сегодня твой день", "...", "> этот сюрприз создан для тебя"], finalMessage: "С днём рождения! Пусть этот год будет светлым и счастливым.", musicUrl: "/music.mp3", theme: { cake: "romantic", background: "paris", accentColor: "#ff9bc8" }, frames: demoFrames, cards: [{ id: "confetti", image: "/card.png", position: [1, .081, -2], rotation: [-Math.PI / 2, 0, Math.PI / 3] }] },
  { id: "demo-cosmic", slug: "cosmic-demo", recipient: "Алия", introLines: ["> Алия", "...", "> для тебя - немного звёзд", "...", "> и много тёплых пожеланий"], finalMessage: "С днём рождения! Смело загадывай самое большое желание.", musicUrl: "/music.mp3", theme: { cake: "cosmic", background: "stars", accentColor: "#9ee7ff" }, frames: [{ ...demoFrames[0], image: "/frame4.jpg" }, { ...demoFrames[1], image: "/photo.jpeg" }], cards: [{ id: "card", image: "/card.png", position: [1, .081, -2], rotation: [-Math.PI / 2, 0, Math.PI / 3] }] },
];

export const defaultGift = gifts[0];
export function getGiftBySlug(slug: string) { return gifts.find((gift) => gift.slug === slug); }
