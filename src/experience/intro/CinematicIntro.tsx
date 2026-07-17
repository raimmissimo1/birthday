import { useEffect, useRef, useState } from "react";
import type { IntroProps } from "./introTypes";
export function CinematicIntro({ lines, onComplete, reducedMotion = false }: IntroProps) {
  const [index, setIndex] = useState(0); const completed = useRef(false);
  useEffect(() => { if (!lines.length) { onComplete(); return; } const duration = reducedMotion ? 50 : 1450; const timer = window.setTimeout(() => { if (index >= lines.length - 1) { if (!completed.current) { completed.current = true; onComplete(); } } else setIndex(index + 1); }, duration); return () => clearTimeout(timer); }, [index, lines.length, onComplete, reducedMotion]);
  return <section className="cinematic-intro" aria-live="polite"><span className="ambient-dot" /><p key={index}>{lines[index]}</p></section>;
}
