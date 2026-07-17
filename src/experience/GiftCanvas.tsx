import { OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { ErrorBoundary } from "../components/ErrorBoundary";
import type { CakePreset } from "../cakes/types";
import type { GiftConfig } from "../giftConfig";
import { DEFAULT_CAMERA_FOV, DEFAULT_CAMERA_POSITION, DEFAULT_CAMERA_TARGET } from "./cameraConfig";
import { GiftScene } from "./GiftScene";

type Props = { gift: GiftConfig; preset: CakePreset; lit: boolean; stage: "message" | "scene" | "candle" | "finale"; onReady?: () => void; onEntranceComplete: () => void; ambientIntensity: number; fallback: ReactNode };

function InitialCamera({ controlsRef }: { controlsRef: React.RefObject<OrbitControlsImpl | null> }) {
  const { camera } = useThree();

  useLayoutEffect(() => {
    camera.position.set(...DEFAULT_CAMERA_POSITION);
    if ("fov" in camera) {
      camera.fov = DEFAULT_CAMERA_FOV;
      camera.updateProjectionMatrix();
    }

    const controls = controlsRef.current;
    if (controls) {
      controls.target.set(...DEFAULT_CAMERA_TARGET);
      controls.update();
      controls.saveState();
    }
  }, [camera, controlsRef]);

  return null;
}

function SceneReady({ onReady }: { onReady?: () => void }) {
  useEffect(() => { onReady?.(); }, [onReady]);
  return null;
}

export default function GiftCanvas({ gift, preset, lit, stage, onReady, onEntranceComplete, ambientIntensity, fallback }: Props) {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const controlsRef = useRef<OrbitControlsImpl>(null);
  return <ErrorBoundary fallback={fallback}><Canvas dpr={[1, 1.5]} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }} camera={{ position: DEFAULT_CAMERA_POSITION, fov: DEFAULT_CAMERA_FOV }}><Suspense fallback={null}><InitialCamera controlsRef={controlsRef} /><GiftScene gift={gift} preset={preset} lit={lit} stage={stage} onEntranceComplete={onEntranceComplete} activeCardId={activeCardId} onToggleCard={(cardId) => setActiveCardId((current) => current === cardId ? null : cardId)} /><ambientLight intensity={ambientIntensity} /><directionalLight position={[4, 7, 4]} intensity={1.2} color="#fff2dd" /><OrbitControls ref={controlsRef} enabled={activeCardId === null} enablePan={false} enableDamping dampingFactor={0.08} autoRotate={false} minDistance={5.8} maxDistance={10.5} minPolarAngle={Math.PI * 0.2} maxPolarAngle={Math.PI * 0.46} /><SceneReady onReady={onReady} /></Suspense></Canvas></ErrorBoundary>;
}
