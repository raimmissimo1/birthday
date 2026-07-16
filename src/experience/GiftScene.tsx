import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";
import { BirthdayCard } from "../components/BirthdayCard";
import { Fireworks } from "../components/Fireworks";
import { ProceduralCake } from "../cakes/ProceduralCake";
import type { CakePreset } from "../cakes/types";
import type { GiftConfig } from "../giftConfig";
import { PictureFrame } from "../models/pictureFrame";
import { Table } from "../models/table";

type Props = { gift: GiftConfig; preset: CakePreset; lit: boolean; stage: "intro" | "scene" | "candle" | "finale"; onEntranceComplete: () => void; activeCardId: string | null; onToggleCard: (cardId: string) => void };
export function GiftScene({ gift, preset, lit, stage, onEntranceComplete, activeCardId, onToggleCard }: Props) {
  const group = useRef<Group>(null); const started = useRef<number | null>(null); const notified = useRef(false);
  useFrame(({ clock }) => { if (stage !== "scene" || !group.current) return; if (started.current === null) started.current = clock.elapsedTime; const progress = Math.min((clock.elapsedTime - started.current) / 2.6, 1); group.current.position.y = 7 * (1 - Math.pow(progress, 3)); group.current.rotation.y = progress * Math.PI * 2; if (progress === 1 && !notified.current) { group.current.position.y = 0; group.current.rotation.y = 0; notified.current = true; onEntranceComplete(); } });
  return <><group ref={group} position={[0, 7, 0]}><Table />{gift.frames.map(({ id, image, position, rotation, scale }) => <PictureFrame key={id} image={image} position={position} rotation={rotation} scale={scale} />)}{gift.cards.map((card) => <BirthdayCard key={card.id} id={card.id} image={card.image} tablePosition={card.position} tableRotation={card.rotation} isActive={activeCardId === card.id} onToggle={onToggleCard} />)}<ProceduralCake preset={preset} candleLit={lit} /></group><Fireworks isActive={stage === "finale"} origin={[0, 3, -3]} /></>;
}
