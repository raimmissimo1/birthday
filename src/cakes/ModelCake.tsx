import { Clone, useGLTF } from "@react-three/drei"; import { useMemo } from "react"; import type { CakePreset } from "./types";
export function ModelCake({ preset }: { preset: CakePreset }) { const gltf = useGLTF(preset.modelUrl!); const scene = useMemo(() => gltf.scene, [gltf.scene]); return <Clone object={scene} scale={preset.scale} />; }
