type Props = {
  radius: number;
  height: number;
  y: number;
  cakeColor: string;
  frostingColor: string;
  showDrips?: boolean;
};

const dripAngles = [0.25, 1.6, 3.35, 4.8];

export function CakeLayer({ radius, height, y, cakeColor, frostingColor, showDrips = false }: Props) {
  return (
    <group position={[0, y, 0]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[radius * 0.985, radius * 1.025, height, 48]} />
        <meshStandardMaterial color={cakeColor} roughness={0.62} metalness={0} />
      </mesh>
      <mesh position={[0, -height / 2 + 0.055, 0]}>
        <torusGeometry args={[radius * 0.98, 0.035, 8, 48]} />
        <meshStandardMaterial color={frostingColor} roughness={0.78} metalness={0} />
      </mesh>
      <mesh position={[0, height / 2 - 0.015, 0]}>
        <cylinderGeometry args={[radius * 0.985, radius * 0.985, 0.075, 48]} />
        <meshStandardMaterial color={frostingColor} roughness={0.75} metalness={0} />
      </mesh>
      <mesh position={[0, height / 2 + 0.025, 0]}>
        <torusGeometry args={[radius * 0.94, 0.065, 10, 48]} />
        <meshStandardMaterial color={frostingColor} roughness={0.75} metalness={0} />
      </mesh>
      {showDrips && dripAngles.map((angle, index) => {
        const dripHeight = index % 2 === 0 ? 0.2 : 0.13;
        const dripRadius = radius * 0.987;
        return (
          <mesh key={angle} position={[Math.cos(angle) * dripRadius, height / 2 - dripHeight / 2, Math.sin(angle) * dripRadius]}>
            <sphereGeometry args={[0.075, 12, 10]} />
            <meshStandardMaterial color={frostingColor} roughness={0.75} metalness={0} />
          </mesh>
        );
      })}
    </group>
  );
}
