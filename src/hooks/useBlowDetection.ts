import { useCallback, useEffect, useRef, useState } from "react";
export type BlowStatus = "idle" | "requesting" | "listening" | "blowing" | "denied" | "unsupported" | "error";
export function useBlowDetection(onBlow: () => void) {
  const [status, setStatus] = useState<BlowStatus>("idle"); const resources = useRef<{ stream: MediaStream; context: AudioContext; frame: number } | null>(null); const lastBlow = useRef(0);
  const stop = useCallback(() => { const active = resources.current; if (!active) return; cancelAnimationFrame(active.frame); active.stream.getTracks().forEach((track) => track.stop()); void active.context.close(); resources.current = null; setStatus("idle"); }, []);
  const start = useCallback(async () => { if (!navigator.mediaDevices?.getUserMedia) { setStatus("unsupported"); return; } if (resources.current) return; setStatus("requesting"); try { const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } }); const context = new AudioContext(); const analyser = context.createAnalyser(); analyser.fftSize = 512; analyser.smoothingTimeConstant = .82; context.createMediaStreamSource(stream).connect(analyser); const data = new Uint8Array(analyser.fftSize); let baseline = 0; let samples = 0; let loudFrames = 0;
    const check = () => { analyser.getByteTimeDomainData(data); let peak = 0; for (const sample of data) peak = Math.max(peak, Math.abs(sample - 128)); if (samples < 35) { baseline = (baseline * samples + peak) / (samples + 1); samples += 1; } const threshold = Math.max(14, baseline * 2.4 + 7); loudFrames = peak > threshold ? loudFrames + 1 : 0; if (loudFrames >= 7 && performance.now() - lastBlow.current > 1800) { lastBlow.current = performance.now(); setStatus("blowing"); stop(); onBlow(); return; } if (resources.current) resources.current.frame = requestAnimationFrame(check); };
    resources.current = { stream, context, frame: requestAnimationFrame(check) }; setStatus("listening");
  } catch (error) { setStatus(error instanceof DOMException && error.name === "NotAllowedError" ? "denied" : "error"); } }, [onBlow, stop]);
  useEffect(() => stop, [stop]); return { status, start, stop };
}
