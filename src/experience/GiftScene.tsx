import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type { Group } from "three";
import { BirthdayCard } from "../components/BirthdayCard";
import { Fireworks } from "../components/Fireworks";
import { GiftCake } from "../cakes/GiftCake";
import type { CakePreset } from "../cakes/types";
import type { GiftConfig } from "../giftConfig";
import { PictureFrame } from "../models/pictureFrame";
import { Table } from "../models/table";

type Props = { gift: GiftConfig; preset: CakePreset; lit: boolean; stage: "message" | "scene" | "candle" | "finale"; onEntranceComplete: () => void; activeCardId: string | null; onToggleCard: (cardId: string) => void };
const ENTRANCE_HEIGHT = 3.8;
const ENTRANCE_DURATION = 1.1;
export function GiftScene({ gift, preset, lit, stage, onEntranceComplete, activeCardId, onToggleCard }: Props) {
  const group = useRef<Group>(null); const started = useRef<number | null>(null); const notified = useRef(false);
  useEffect(() => {
    if (stage !== "scene") return;
    started.current = null;
    notified.current = false;
    group.current?.position.set(0, ENTRANCE_HEIGHT, 0);
    if (group.current) group.current.rotation.y = 0;
  }, [stage]);
  useFrame(({ clock }) => { if (stage !== "scene" || !group.current) return; if (started.current === null) started.current = clock.elapsedTime; const progress = Math.min((clock.elapsedTime - started.current) / ENTRANCE_DURATION, 1); const easedProgress = 1 - Math.pow(1 - progress, 3); group.current.position.y = ENTRANCE_HEIGHT * (1 - easedProgress); group.current.rotation.y = easedProgress * Math.PI * 2; if (progress === 1 && !notified.current) { group.current.position.y = 0; group.current.rotation.y = 0; notified.current = true; onEntranceComplete(); } });
   return <><group ref={group} position={[0, ENTRANCE_HEIGHT, 0]}><Table />{gift.frames.map(({ id, image, position, rotation, scale }) => <PictureFrame key={id} image={image} position={position} rotation={rotation} scale={scale * 1.28} />)}{gift.cards.map((card) => <BirthdayCard key={card.id} id={card.id} image={card.image} tablePosition={card.position} tableRotation={card.rotation} isActive={activeCardId === card.id} onToggle={onToggleCard} />)}<GiftCake preset={preset} candleLit={lit} /></group><Fireworks isActive={stage === "finale"} origin={[0, 3, -3]} /></>;
}
