import { useMemo } from "react";
import type { CakePreset } from "./types";

type Props = { preset: CakePreset; candleLit: boolean };

const sprinklePositions = Array.from({ length: 24 }, (_, index) => ({
  angle: (index / 24) * Math.PI * 2,
  height: 0.36 + (index % 3) * 0.18,
  radius: 1.08 - (index % 2) * 0.18,
}));

export function ProceduralCake({ preset, candleLit }: Props) {
  const layers = useMemo(() => [...preset.layers].reverse(), [preset.layers]);
  const candleY = layers.length * 0.45 + 0.28;
  return (
    <group scale={preset.scale}>
      {layers.map((color, index) => {
        const radius = 1.32 - index * 0.18;
        const y = 0.25 + index * 0.45;
        return <group key={color} position={[0, y, 0]}>
          <mesh castShadow receiveShadow><cylinderGeometry args={[radius, radius + 0.03, 0.42, 32]} /><meshStandardMaterial color={color} roughness={0.62} /></mesh>
          <mesh position={[0, 0.23, 0]}><torusGeometry args={[radius * 0.94, 0.055, 8, 32]} /><meshStandardMaterial color={preset.frosting} roughness={0.42} /></mesh>
        </group>;
      })}
      <mesh position={[0, candleY - 0.08, 0]}><cylinderGeometry args={[0.85, 0.98, 0.13, 32]} /><meshStandardMaterial color={preset.frosting} roughness={0.38} /></mesh>
      {sprinklePositions.slice(0, preset.decoration === "gold" ? 10 : 20).map((item, index) => (
        <mesh key={index} position={[Math.cos(item.angle) * item.radius, item.height + 0.16, Math.sin(item.angle) * item.radius]} rotation={[item.angle, 0.5, 0]}>
          <sphereGeometry args={[preset.decoration === "flowers" ? 0.08 : 0.045, 8, 8]} /><meshStandardMaterial color={index % 3 === 0 && preset.decoration === "rainbow" ? "#55b6ee" : preset.decorationColor} emissive={preset.decoration === "stars" ? preset.decorationColor : "#000000"} emissiveIntensity={preset.glow * 0.35} />
        </mesh>
      ))}
      {Array.from({ length: preset.candleCount }, (_, index) => {
        const angle = preset.candleCount === 1 ? 0 : (index / preset.candleCount) * Math.PI * 2;
        const radius = preset.candleCount === 1 ? 0 : 0.34;
        return <group key={index} position={[Math.cos(angle) * radius, candleY + 0.24, Math.sin(angle) * radius]}>
          <mesh><cylinderGeometry args={[0.045, 0.055, 0.48, 12]} /><meshStandardMaterial color={preset.candleColor} /></mesh>
          {candleLit && <><mesh position={[0, 0.34, 0]}><sphereGeometry args={[0.12, 12, 12]} /><meshBasicMaterial color={preset.flameColor} transparent opacity={0.9} /></mesh><pointLight position={[0, 0.35, 0]} color={preset.flameColor} intensity={preset.glow} distance={2.4} /></>}
        </group>;
      })}
    </group>
  );
}
