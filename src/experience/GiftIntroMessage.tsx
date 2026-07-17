import { useEffect, useRef, useState } from "react";

type GiftIntroMessageProps = { lines: string[]; accentColor?: string; onComplete: () => void };
const CHARACTER_DELAY_MS = 38;
const LINE_DELAY_MS = 280;
const FINAL_DELAY_MS = 500;

export function GiftIntroMessage({ lines, accentColor = "#ff9bc8", onComplete }: GiftIntroMessageProps) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [characters, setCharacters] = useState(0);
  const completed = useRef(false);

  useEffect(() => {
    if (!lines.length) {
      onComplete();
      return;
    }
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const line = lines[lineIndex];
    if (characters < line.length) {
      const timer = window.setTimeout(() => setCharacters(reducedMotion ? line.length : characters + 1), reducedMotion ? LINE_DELAY_MS : CHARACTER_DELAY_MS);
      return () => window.clearTimeout(timer);
    }
    if (lineIndex === lines.length - 1 && completed.current) return;
    const timer = window.setTimeout(() => {
      setVisibleLines((current) => [...current, line]);
      if (lineIndex === lines.length - 1) {
        if (!completed.current) {
          completed.current = true;
          window.setTimeout(onComplete, FINAL_DELAY_MS);
        }
      } else {
        setLineIndex((current) => current + 1);
        setCharacters(0);
      }
    }, LINE_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [characters, lineIndex, lines, onComplete]);

  if (!lines.length) return null;
  const currentLine = lines[lineIndex]?.slice(0, characters) ?? "";
  return <section className="gift-intro-message" style={{ "--intro-accent": accentColor } as React.CSSProperties} aria-live="polite">
    <div className="intro-copy">{visibleLines.map((line, index) => <p key={`${line}-${index}`}>{formatLine(line)}</p>)}<p className="intro-current">{formatLine(currentLine)}<span className="intro-cursor" aria-hidden="true">|</span></p></div>
  </section>;
}

function formatLine(line: string) {
  return line.startsWith(">") ? <><span className="intro-prompt">&gt;</span>{line.slice(1)}</> : line;
}
