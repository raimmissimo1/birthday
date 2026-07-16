import type { CakePreset } from "./types";
import { CakeLayer } from "./CakeLayer";
import { RomanticCakeDecorations } from "./CakeDecorations";

type Props = { preset: CakePreset; candleLit: boolean };

const sprinklePositions = Array.from({ length: 20 }, (_, index) => ({
  angle: (index / 24) * Math.PI * 2,
  height: 0.36 + (index % 3) * 0.18,
  radius: 1.08 - (index % 2) * 0.18,
}));

export function ProceduralCake({ preset, candleLit }: Props) {
  const isRomantic = preset.id === "romantic";
  const layers = isRomantic ? preset.layers : [...preset.layers].reverse();
  const layerHeights = isRomantic ? [0.66, 0.48] : layers.map(() => 0.42);
  const layerRadii = isRomantic ? [1.28, 0.84] : layers.map((_, index) => 1.32 - index * 0.18);
  const baseY = 0.31;
  const upperLayerY = baseY + layerHeights[0] / 2 + layerHeights[1] / 2 - 0.02;
  const layerY = (index: number) => isRomantic ? (index === 0 ? baseY : upperLayerY) : 0.25 + index * 0.45;
  const lastLayer = layers.length - 1;
  const topY = layerY(lastLayer) + layerHeights[lastLayer] / 2 + 0.06;
  const candleHeight = isRomantic ? 0.82 : 0.48;
  const candleRadius = isRomantic ? 0.048 : 0.05;
  const candleY = topY + candleHeight / 2;
  return (
    <group scale={preset.scale}>
      {layers.map((color, index) => <CakeLayer key={color} radius={layerRadii[index]} height={layerHeights[index]} y={layerY(index)} cakeColor={color} frostingColor={preset.frosting} showDrips={isRomantic && index === 0} />)}
      {isRomantic && <RomanticCakeDecorations topY={topY} />}
      {!isRomantic && sprinklePositions.slice(0, preset.decoration === "gold" ? 10 : 20).map((item, index) => (
        <mesh key={index} position={[Math.cos(item.angle) * item.radius, item.height + 0.16, Math.sin(item.angle) * item.radius]} rotation={[item.angle, 0.5, 0]}>
          <sphereGeometry args={[preset.decoration === "flowers" ? 0.08 : 0.045, 8, 8]} /><meshStandardMaterial color={index % 3 === 0 && preset.decoration === "rainbow" ? "#55b6ee" : preset.decorationColor} emissive={preset.decoration === "stars" ? preset.decorationColor : "#000000"} emissiveIntensity={preset.glow * 0.35} />
        </mesh>
      ))}
      {Array.from({ length: preset.candleCount }, (_, index) => {
        const angle = preset.candleCount === 1 ? 0 : (index / preset.candleCount) * Math.PI * 2;
        const radius = preset.candleCount === 1 ? 0 : 0.34;
        return <group key={index} position={[Math.cos(angle) * radius, candleY, Math.sin(angle) * radius]}>
          <mesh><cylinderGeometry args={[candleRadius, candleRadius, candleHeight, 16]} /><meshStandardMaterial color={isRomantic ? "#f3b5ca" : preset.candleColor} roughness={0.38} /></mesh>
          {isRomantic && [-0.18, 0.14].map((offset) => <mesh key={offset} position={[0, offset, 0]}><torusGeometry args={[candleRadius + 0.004, 0.009, 6, 16]} /><meshStandardMaterial color="#e6bf68" roughness={0.25} metalness={0.7} /></mesh>)}
          <mesh position={[0, candleHeight / 2 + 0.035, 0]}><cylinderGeometry args={[0.012, 0.012, 0.07, 8]} /><meshStandardMaterial color="#3b2630" roughness={0.9} /></mesh>
          {candleLit && <><mesh position={[0, candleHeight / 2 + 0.12, 0]} scale={[0.58, 1, 0.58]}><sphereGeometry args={[0.07, 12, 12]} /><meshStandardMaterial color={preset.flameColor} emissive={preset.flameColor} emissiveIntensity={1.2} transparent opacity={0.92} /></mesh><pointLight position={[0, candleHeight / 2 + 0.12, 0]} color={preset.flameColor} intensity={preset.glow} distance={2.1} /></>}
        </group>;
      })}
    </group>
  );
}
