import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, type ReactNode } from "react";
import { ErrorBoundary } from "../components/ErrorBoundary";
import type { CakePreset } from "../cakes/types";
import type { GiftConfig } from "../giftConfig";
import { GiftScene } from "./GiftScene";

type Props = { gift: GiftConfig; preset: CakePreset; lit: boolean; stage: "intro" | "scene" | "candle" | "finale"; onEntranceComplete: () => void; ambientIntensity: number; fallback: ReactNode };
export default function GiftCanvas({ gift, preset, lit, stage, onEntranceComplete, ambientIntensity, fallback }: Props) {
  return <ErrorBoundary fallback={fallback}><Canvas dpr={[1, 1.5]} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }} camera={{ position: [3.8, 2.6, 5.4], fov: 42 }}><Suspense fallback={null}><GiftScene gift={gift} preset={preset} lit={lit} stage={stage} onEntranceComplete={onEntranceComplete} /><ambientLight intensity={ambientIntensity} /><directionalLight position={[4, 7, 4]} intensity={1.2} color="#fff2dd" /><OrbitControls enablePan={false} target={[0, 1, 0]} minDistance={3} maxDistance={8} maxPolarAngle={Math.PI / 2} /></Suspense></Canvas></ErrorBoundary>;
}
