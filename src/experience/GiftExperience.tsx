import { lazy, Suspense, useCallback, useEffect, useState, type CSSProperties } from "react";
import { cakePresets } from "../cakes/cakePresets";
import { backgroundPresets } from "../backgrounds/backgroundPresets";
import FallingGreetings from "../components/FallingGreetings";
import { useBackgroundMusic } from "../hooks/useBackgroundMusic";
import { useBlowDetection } from "../hooks/useBlowDetection";
import type { GiftConfig } from "../giftConfig";
import { text } from "../i18n";

const GiftCanvas = lazy(() => import("./GiftCanvas"));

type Props = { gift: GiftConfig };
type Stage = "intro" | "scene" | "candle" | "finale";

function supportsWebGL() { try { return Boolean(document.createElement("canvas").getContext("webgl2") || document.createElement("canvas").getContext("webgl")); } catch { return false; } }

export default function GiftExperience({ gift }: Props) {
  const [stage, setStage] = useState<Stage>("intro");
  const [webgl] = useState(supportsWebGL);
  const [lit, setLit] = useState(true);
  const { isPlaying, error: musicError, toggle } = useBackgroundMusic(gift.musicUrl);
  const blowOut = useCallback(() => { if (stage !== "candle" || !lit) return; setLit(false); setStage("finale"); }, [lit, stage]);
  const blow = useBlowDetection(blowOut);
  const preset = cakePresets[gift.theme.cake] ?? cakePresets.classic;
  const background = backgroundPresets[gift.theme.background] ?? backgroundPresets.stars;
  const backgroundImage = gift.theme.background === "custom" ? gift.theme.customBackgroundUrl : undefined;
  useEffect(() => { const onKey = (event: KeyboardEvent) => { if (event.code === "Space") { event.preventDefault(); if (stage === "intro") { setStage("scene"); void toggle(); } else blowOut(); } }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, [blowOut, stage, toggle]);
  const start = () => { setStage("scene"); void toggle(); };
  const finishEntrance = () => setStage("candle");
  const backgroundStyle = backgroundImage ? { backgroundImage: `linear-gradient(${background.overlay}, ${background.overlay}), url(${backgroundImage}), ${background.fallbackGradient}` } : { background: background.fallbackGradient };
  return <main className="gift-experience" style={{ "--accent": gift.theme.accentColor ?? "#ff9bc8" } as CSSProperties}>
    <div className="gift-background" style={backgroundStyle} aria-hidden="true" />
    <p className="orientation-hint">Для более полного эффекта можно повернуть телефон</p>
    {stage === "intro" && <section className="start-gate"><p className="eyebrow">Для {gift.recipient}</p><h1>Твой интерактивный сюрприз готов</h1><p>Фото, музыка и торт уже ждут тебя.</p><button className="primary-action" type="button" onClick={start}>{text.openGift}</button><a className="start-back-link" href="/">Заказать такой же</a></section>}
    {stage !== "intro" && <button className="music-toggle" type="button" aria-label={isPlaying ? "Остановить музыку" : text.musicOn} onClick={() => void toggle()}>{isPlaying ? "Музыка: вкл" : text.musicOn}</button>}
    {musicError && <p className="media-notice">Музыка недоступна. Сюрприз продолжится без неё.</p>}
    {webgl && stage !== "intro" ? <Suspense fallback={<div className="scene-loading">Готовим 3D-сцену...</div>}><GiftCanvas gift={gift} preset={preset} lit={lit} stage={stage} onEntranceComplete={finishEntrance} ambientIntensity={background.ambientLightIntensity} fallback={<GiftFallback gift={gift} style={backgroundStyle} />} /></Suspense> : stage !== "intro" ? <GiftFallback gift={gift} style={backgroundStyle} /> : null}
    {stage === "candle" && <div className="hint-overlay"><button className="blow-button" type="button" onClick={blowOut}>{text.blowCandle}</button><button className="secondary-action" type="button" onClick={() => void blow.start()}>{blow.status === "listening" ? "Слушаем..." : "Задуть в микрофон"}</button><span>Микрофон нужен только для распознавания выдоха. Можно нажать кнопку или Space.</span>{blow.status === "denied" && <span>Доступ к микрофону не получен.</span>}</div>}
    {stage === "finale" && <><FallingGreetings active /><div className="final-message"><div className="final-message-subtitle">{gift.finalMessage}</div></div></>}
  </main>;
}

function GiftFallback({ gift, style }: { gift: GiftConfig; style: CSSProperties }) { return <section className="gift-fallback" style={style}><div className="fallback-cake" aria-hidden="true">🎂</div><p>Для {gift.recipient}</p><h2>{gift.finalMessage}</h2><div className="fallback-photos">{gift.frames.slice(0, 3).map((frame) => <img key={frame.id} src={frame.image} alt="Памятный момент" />)}</div></section>; }
