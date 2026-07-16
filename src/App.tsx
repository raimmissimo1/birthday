import { lazy, Suspense } from "react";
import { LandingPage } from "./LandingPage";
import { businessConfig, defaultGift, getGiftBySlug } from "./giftConfig";
import "./App.css";

const GiftExperience = lazy(() => import("./experience/GiftExperience"));

function GiftNotFound() {
  return <main className="not-found-page"><p className="eyebrow">Подарок не найден</p><h1>Эта ссылка могла устареть</h1><p>Проверьте адрес или свяжитесь с нами, чтобы получить актуальную ссылку.</p><div className="hero-actions"><a className="primary-action" href="/">На главную</a><a className="secondary-action" href={businessConfig.orderContactUrl}>Связаться</a></div></main>;
}

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const slug = path.startsWith("/g/") ? decodeURIComponent(path.slice(3)) : path === "/demo" ? defaultGift.slug : null;
  if (!slug) return <LandingPage />;
  const gift = getGiftBySlug(slug);
  return gift ? <Suspense fallback={<main className="scene-loading">Загружаем подарок...</main>}><GiftExperience gift={gift} /></Suspense> : <GiftNotFound />;
}
