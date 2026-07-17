import { useEffect, useRef, useState } from "react";
import type { IntroProps } from "./introTypes";
export function FakeChatIntro({ lines, onComplete, reducedMotion = false }: IntroProps) {
  const [count, setCount] = useState(0); const completed = useRef(false);
  useEffect(() => { if (!lines.length) { onComplete(); return; } const timer = window.setTimeout(() => { if (count >= lines.length) { if (!completed.current) { completed.current = true; onComplete(); } } else setCount(count + 1); }, reducedMotion ? 0 : count === lines.length ? 450 : 800); return () => clearTimeout(timer); }, [count, lines.length, onComplete, reducedMotion]);
  return <section className="chat-intro" aria-live="polite"><div className="chat-avatar" aria-hidden="true">CW</div><div className="chat-thread">{lines.slice(0, count).map((line, index) => <p key={`${index}-${line}`} className="chat-bubble">{line}</p>)}{count < lines.length && <p className="chat-typing">печатает<span>...</span></p>}</div></section>;
}
