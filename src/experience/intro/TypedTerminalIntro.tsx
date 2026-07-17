import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { IntroProps } from "./introTypes";

export function TypedTerminalIntro({ lines, accentColor, onComplete, reducedMotion = false, characterDelayMs = 38, lineDelayMs = 280, finalDelayMs = 500 }: IntroProps) {
  const [visible, setVisible] = useState<string[]>([]); const completed = useRef(false);
  useEffect(() => {
    let cancelled = false; let timer = 0;
    const done = () => { if (!cancelled && !completed.current) { completed.current = true; onComplete(); } };
    if (!lines.length || reducedMotion) { setVisible(lines); timer = window.setTimeout(done, reducedMotion ? 0 : finalDelayMs); return () => { cancelled = true; clearTimeout(timer); }; }
    let line = 0; let character = 0;
    const type = () => { if (cancelled) return; const current = lines[line] ?? ""; setVisible((old) => [...old.slice(0, line), current.slice(0, character)]); if (character < current.length) { character += 1; timer = window.setTimeout(type, characterDelayMs); } else if (line < lines.length - 1) { line += 1; character = 0; timer = window.setTimeout(type, lineDelayMs); } else timer = window.setTimeout(done, finalDelayMs); };
    type(); return () => { cancelled = true; clearTimeout(timer); };
  }, [characterDelayMs, finalDelayMs, lineDelayMs, lines, onComplete, reducedMotion]);
  return <section className="gift-intro-message" style={{ "--intro-accent": accentColor ?? "#ff9bc8" } as CSSProperties} aria-live="polite"><div className="intro-copy">{visible.map((line, index) => <p key={`${index}-${line}`}>{line}</p>)}<span className="intro-cursor" aria-hidden="true">|</span></div></section>;
}
