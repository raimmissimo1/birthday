import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { cakePresets } from "../cakes/cakePresets";
import { backgroundPresets } from "../backgrounds/backgroundPresets";
import FallingGreetings from "../components/FallingGreetings";
import { EffectLayer } from "../effects/EffectLayer";
import { normalizeGiftFrames, type GiftConfig } from "../giftConfig";
import { GiftGallery } from "../gallery/GiftGallery";
import { useBackgroundMusic } from "../hooks/useBackgroundMusic";
import { useBlowDetection } from "../hooks/useBlowDetection";
import { FinaleRenderer } from "./finale/FinaleRenderer";
import { IntroRenderer } from "./intro/IntroRenderer";
import { GiftPreloader } from "./preload/GiftPreloader";
import { useExperienceTimeline } from "./timeline/useExperienceTimeline";
import type { ExperienceSection } from "./timeline/timelineTypes";
import { text } from "../i18n";

const GiftCanvas = lazy(() => import("./GiftCanvas"));
type Props = { gift: GiftConfig };
type GiftStage = "intro" | "message" | "scene" | "candle" | "finale";
function supportsWebGL() { try { return Boolean(document.createElement("canvas").getContext("webgl2") || document.createElement("canvas").getContext("webgl")); } catch { return false; } }
function prefersReducedMotion() { return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches; }

export default function GiftExperience({ gift }: Props) {
  const [stage, setStage] = useState<GiftStage>("intro"); const [messageComplete, setMessageComplete] = useState(false); const [preloadReady, setPreloadReady] = useState(false); const [canvasReady, setCanvasReady] = useState(false); const [webgl] = useState(supportsWebGL); const [lit, setLit] = useState(true); const [showGallery, setShowGallery] = useState(false); const [toast, setToast] = useState(""); const pressTimer = useRef(0); const [pressing, setPressing] = useState(false);
  const timeline = useExperienceTimeline(gift.experience.sections);
  const { isPlaying, error: musicError, toggle } = useBackgroundMusic(gift.musicUrl);
  const preset = cakePresets[gift.cake.preset] ?? cakePresets.classic; const background = backgroundPresets[gift.theme.background] ?? backgroundPresets.stars; const backgroundImage = gift.theme.background === "custom" ? gift.theme.customBackgroundUrl : undefined;
  const frames = useMemo(() => normalizeGiftFrames(gift.frames), [gift.frames]); const sceneGift = { ...gift, frames }; const sceneReady = preloadReady && (canvasReady || !webgl);
  const current = timeline.currentSection;
  const blowOut = useCallback(() => { if (stage !== "candle" || !lit) return; setLit(false); setStage("finale"); }, [lit, stage]);
  const blow = useBlowDetection(blowOut);
  const start = useCallback(() => { setMessageComplete(false); setStage("message"); timeline.start(); void toggle(); }, [timeline, toggle]);
  const completeIntro = useCallback(() => { setMessageComplete(true); timeline.next(); }, [timeline]);
  useEffect(() => { if (stage === "message" && messageComplete && sceneReady) setStage("scene"); }, [messageComplete, sceneReady, stage]);
  useEffect(() => { const onKey = (event: KeyboardEvent) => { if (event.code === "Escape") setShowGallery(false); if (event.code === "Space") { event.preventDefault(); if (stage === "intro") start(); else blowOut(); } }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, [blowOut, stage, start]);
  const share = async () => { const data = { title: "CakeWish", text: `Поздравление для ${gift.recipient}`, url: window.location.href }; try { if (navigator.share) await navigator.share(data); else { await navigator.clipboard.writeText(data.url); setToast("Ссылка скопирована"); } } catch { /* User cancellation needs no error. */ } };
  const backgroundStyle = backgroundImage ? { backgroundImage: `linear-gradient(${background.overlay}, ${background.overlay}), url(${backgroundImage}), ${background.fallbackGradient}` } : { background: background.fallbackGradient };
  const introSection = current?.type === "typed-message" || current?.type === "cinematic-text" || current?.type === "fake-chat" || current?.type === "countdown" ? current : undefined;
  return <main className="gift-experience" style={{ "--accent": gift.theme.accentColor ?? "#ff9bc8" } as CSSProperties}>
    <GiftPreloader gift={gift} onReady={() => setPreloadReady(true)} /><div className="gift-background" style={backgroundStyle} aria-hidden="true" /><EffectLayer effects={gift.effects} finale={stage === "finale"} />
    <p className="orientation-hint">Для полного эффекта можно повернуть телефон</p>
    {stage === "intro" && <section className="start-gate"><p className="eyebrow">Для {gift.recipient}</p><h1>Твой интерактивный сюрприз готов</h1><p>Фото, музыка и торт уже ждут тебя.</p><button className="primary-action" type="button" onClick={start}>{text.openGift}</button><a className="start-back-link" href="/">Заказать такой же</a></section>}
    {stage !== "intro" && <><button className="music-toggle" type="button" aria-label={isPlaying ? "Остановить музыку" : text.musicOn} onClick={() => void toggle()}>{isPlaying ? "Музыка: вкл" : text.musicOn}</button><button className="share-toggle" type="button" onClick={() => void share()}>Поделиться</button></>}
    {toast && <p className="share-toast" role="status">{toast}</p>}{musicError && <p className="media-notice">Музыка недоступна. Сюрприз продолжится без неё.</p>}
    {stage !== "intro" && <div className={`gift-scene-layer ${stage !== "message" ? "is-visible" : ""}`}>{webgl ? <Suspense fallback={<div className="scene-loading">Готовим сюрприз...</div>}><GiftCanvas gift={sceneGift} preset={preset} lit={lit} stage={stage} onReady={() => setCanvasReady(true)} onEntranceComplete={() => setStage("candle")} ambientIntensity={background.ambientLightIntensity} fallback={<GiftFallback gift={sceneGift} style={backgroundStyle} />} /></Suspense> : <GiftFallback gift={sceneGift} style={backgroundStyle} />}</div>}
    {stage === "message" && <div className="gift-message-layer">{introSection ? <SectionIntro section={introSection} gift={gift} onComplete={completeIntro} /> : <IntroRenderer variant="terminal" lines={gift.introLines} accentColor={gift.theme.accentColor} onComplete={completeIntro} reducedMotion={prefersReducedMotion()} />}{messageComplete && !sceneReady && <div className="message-preparing">Последние приготовления…<span /></div>}{gift.experience.allowSkipIntro && <button className="skip-intro" type="button" onClick={completeIntro}>Пропустить</button>}</div>}
    {stage === "scene" && gift.gallery.variant !== "four-frames-3d" && <button className="gallery-toggle" type="button" onClick={() => setShowGallery(true)}>Открыть воспоминания</button>}
    {showGallery && <div className="gallery-overlay" role="dialog" aria-modal="true" aria-label="Воспоминания"><button type="button" onClick={() => setShowGallery(false)}>Закрыть</button><GiftGallery variant={gift.gallery.variant} photos={frames.map((frame) => ({ id: frame.id, image: frame.image }))} /></div>}
    {stage === "candle" && <div className="hint-overlay"><button className={`blow-button ${pressing ? "is-pressing" : ""}`} type="button" onClick={blowOut} onPointerDown={() => { setPressing(true); pressTimer.current = window.setTimeout(blowOut, 850); }} onPointerUp={() => { clearTimeout(pressTimer.current); setPressing(false); }} onPointerCancel={() => { clearTimeout(pressTimer.current); setPressing(false); }}>{preset.candleCount === 1 ? text.blowCandle : "Погасить свечи"}</button><button className="secondary-action" type="button" onClick={() => void blow.start()}>{blow.status === "listening" ? "Слушаем..." : "Задуть в микрофон"}</button><span>Можно нажать кнопку, удерживать её на телефоне или нажать Space.</span>{blow.status === "denied" && <span>Доступ к микрофону не получен.</span>}</div>}
    {stage === "finale" && <><FinaleRenderer effects={gift.effects} /><FallingGreetings active /><div className="final-message"><div className="final-message-subtitle">{gift.finalMessage}</div><button type="button" className="secondary-action" onClick={() => { setLit(true); setStage("scene"); timeline.replay(); }}>Повторить</button></div></>}
  </main>;
}
function SectionIntro({ section, gift, onComplete }: { section: ExperienceSection; gift: GiftConfig; onComplete: () => void }) { const variant = section.type === "typed-message" ? "terminal" : section.type === "cinematic-text" ? "cinematic" : section.type === "fake-chat" ? "fake-chat" : "countdown"; const lines = "lines" in section && section.lines ? section.lines : gift.introLines; return <IntroRenderer variant={variant} lines={lines} accentColor={gift.theme.accentColor} onComplete={onComplete} reducedMotion={prefersReducedMotion()} {...(section.type === "typed-message" ? section : {})} />; }
function GiftFallback({ gift, style }: { gift: GiftConfig; style: CSSProperties }) { return <section className="gift-fallback" style={style}><div className="fallback-cake" aria-hidden="true">🎂</div><p>Для {gift.recipient}</p><h2>{gift.finalMessage}</h2><div className="fallback-photos">{gift.frames.map((frame) => <img key={frame.id} src={frame.image} alt="Памятный момент" />)}</div></section>; }
