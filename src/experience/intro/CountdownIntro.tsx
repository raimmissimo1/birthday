import { useEffect, useRef, useState } from "react";
import type { IntroProps } from "./introTypes";
const steps = ["3", "2", "1", "Сегодня твой день!"];
export function CountdownIntro({ onComplete, reducedMotion = false }: IntroProps) { const [index, setIndex] = useState(0); const completed = useRef(false); useEffect(() => { const timer = window.setTimeout(() => { if (index === steps.length - 1) { if (!completed.current) { completed.current = true; onComplete(); } } else setIndex(index + 1); }, reducedMotion ? 0 : index === steps.length - 1 ? 700 : 700); return () => clearTimeout(timer); }, [index, onComplete, reducedMotion]); return <section className="countdown-intro" aria-live="assertive"><p key={index}>{steps[index]}</p></section>; }
