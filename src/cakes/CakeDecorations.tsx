const berries = [[-0.55, 0.2], [-0.43, 0.35], [-0.35, 0.12], [0.52, -0.28], [0.61, -0.12]] as const;

const pearls = [0.65, 2.85, 3.55, 4.95];

export function RomanticCakeDecorations({ topY }: { topY: number }) {
  return (
    <group>
      {berries.map(([x, z], index) => (
        <group key={`${x}-${z}`} position={[x, topY + 0.085, z]}>
          <mesh castShadow>
            <sphereGeometry args={[0.105, 16, 12]} />
             <meshStandardMaterial color="#a92f5b" roughness={0.32} metalness={0} />
          </mesh>
          <mesh position={[0, 0.085, 0]} rotation={[0.35, index, 0]}>
            <coneGeometry args={[0.055, 0.075, 5]} />
            <meshStandardMaterial color="#577944" roughness={0.7} />
          </mesh>
        </group>
      ))}
      {pearls.map((angle) => (
        <mesh key={angle} position={[Math.cos(angle) * 0.57, topY + 0.09, Math.sin(angle) * 0.57]}>
          <sphereGeometry args={[0.055, 12, 12]} />
          <meshStandardMaterial color="#e6bf68" roughness={0.25} metalness={0.72} />
        </mesh>
      ))}
       {([[-0.68, -0.18], [-0.08, 0.58], [0.57, 0.3]] as const).map(([x, z]) => (
        <group key={`${x}-${z}`} position={[x, topY + 0.07, z]}>
          {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((angle) => <mesh key={angle} position={[Math.cos(angle) * 0.055, 0, Math.sin(angle) * 0.055]}><sphereGeometry args={[0.05, 10, 8]} /><meshStandardMaterial color="#f3b5ca" roughness={0.75} /></mesh>)}
          <mesh position={[0, 0.025, 0]}><sphereGeometry args={[0.025, 10, 8]} /><meshStandardMaterial color="#e6bf68" roughness={0.25} metalness={0.7} /></mesh>
        </group>
      ))}
    </group>
  );
}
