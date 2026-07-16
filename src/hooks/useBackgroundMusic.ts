import { useEffect, useRef, useState } from "react";

export function useBackgroundMusic(url?: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => { if (!url) return; const audio = new Audio(url); audio.loop = true; audio.preload = "metadata"; audio.addEventListener("error", () => setError(true)); audioRef.current = audio; return () => { audio.pause(); audio.src = ""; audioRef.current = null; }; }, [url]);
  const toggle = async () => { const audio = audioRef.current; if (!audio) return; if (audio.paused) { try { await audio.play(); setIsPlaying(true); } catch { setError(true); } } else { audio.pause(); setIsPlaying(false); } };
  return { isPlaying, error, toggle };
}
