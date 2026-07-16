import { useCallback, useEffect, useRef, useState } from "react";

export function useBlowDetection(onBlow: () => void) {
  const [status, setStatus] = useState<"idle" | "listening" | "denied" | "unsupported">("idle");
  const resources = useRef<{ stream: MediaStream; context: AudioContext; frame: number } | null>(null);
  const stop = useCallback(() => { const current = resources.current; if (!current) return; cancelAnimationFrame(current.frame); current.stream.getTracks().forEach((track) => track.stop()); void current.context.close(); resources.current = null; setStatus("idle"); }, []);
  const start = useCallback(async () => { if (!navigator.mediaDevices?.getUserMedia) { setStatus("unsupported"); return; } try { const stream = await navigator.mediaDevices.getUserMedia({ audio: true }); const context = new AudioContext(); const analyser = context.createAnalyser(); analyser.fftSize = 512; context.createMediaStreamSource(stream).connect(analyser); const data = new Uint8Array(analyser.fftSize); let loudFrames = 0; const check = () => { analyser.getByteTimeDomainData(data); let peak = 0; for (const sample of data) peak = Math.max(peak, Math.abs(sample - 128)); loudFrames = peak > 30 ? loudFrames + 1 : 0; if (loudFrames > 5) { stop(); onBlow(); return; } resources.current!.frame = requestAnimationFrame(check); }; resources.current = { stream, context, frame: requestAnimationFrame(check) }; setStatus("listening"); } catch { setStatus("denied"); } }, [onBlow, stop]);
  useEffect(() => stop, [stop]);
  return { status, start, stop };
}
