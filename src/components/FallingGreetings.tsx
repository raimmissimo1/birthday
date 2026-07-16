import { useEffect, useMemo, useState } from "react";

type FallingItem = {
  id: number;
  text: string;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotate: number;
};

const MESSAGES = [
  "С днём рождения 💖",
  "С Днём Рождения 💗",
  "Пусть желания сбываются 💕",
  "Самый счастливый день 💞",
  "🎂",
  "🎉",
  "💖",
  "💗",
  "💕",
  "💞",
  "✨",
];

export default function FallingGreetings({ active }: { active: boolean }) {
  const [items, setItems] = useState<FallingItem[]>([]);

  const generatedItems = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        text: MESSAGES[Math.floor(Math.random() * MESSAGES.length)],
        left: Math.random() * 92,
        delay: Math.random() * 2.5,
        duration: 3.5 + Math.random() * 2.5,
        size: 20 + Math.random() * 22,
        rotate: -25 + Math.random() * 50,
      })),
    []
  );

  useEffect(() => {
    if (!active) {
      setItems([]);
      return;
    }

    setItems(generatedItems);
  }, [active, generatedItems]);

  if (!active) return null;

  return (
    <div className="falling-container">
      {items.map((item) => (
        <span
          key={item.id}
          className="falling-text"
          style={{
            left: `${item.left}%`,
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
            fontSize: `${item.size}px`,
            ["--fall-rotate" as string]: `${item.rotate}deg`,
          }}
        >
          {item.text}
        </span>
      ))}
    </div>
  );
}
