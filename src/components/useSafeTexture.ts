import { useEffect, useMemo, useState } from "react";
import { CanvasTexture, SRGBColorSpace, Texture, TextureLoader } from "three";

function createFallbackTexture(kind: "advertisement" | "card") {
  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = kind === "advertisement" ? 1200 : 600;
  const context = canvas.getContext("2d");

  if (context) {
    const isAdvertisement = kind === "advertisement";
    context.fillStyle = isAdvertisement ? "#fff4df" : "#fff4fa";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = isAdvertisement ? "#b57442" : "#c94f83";
    context.lineWidth = 8;
    context.strokeRect(44, 44, canvas.width - 88, canvas.height - 88);
    context.fillStyle = isAdvertisement ? "#493126" : "#a93166";
    context.textAlign = "center";
    context.font = `700 ${isAdvertisement ? 58 : 64}px Arial`;
    context.fillText(isAdvertisement ? "Здесь может быть" : "Happy Birthday", 400, isAdvertisement ? 450 : 245);
    context.fillText(isAdvertisement ? "ваша реклама" : "С днём рождения!", 400, isAdvertisement ? 530 : 330);
    context.fillStyle = isAdvertisement ? "#6c5142" : "#513442";
    context.font = "30px Arial";
    context.fillText(isAdvertisement ? "Ваше фото или поздравление" : "Пусть желания сбываются", 400, isAdvertisement ? 660 : 415);
  }

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

/** Keeps display surfaces readable while an SVG or image is loading or unavailable. */
export function useSafeTexture(url: string, kind: "advertisement" | "card") {
  const fallback = useMemo(() => createFallbackTexture(kind), [kind]);
  const [texture, setTexture] = useState<Texture>(fallback);

  useEffect(() => {
    setTexture(fallback);
    const loader = new TextureLoader();
    let loadedTexture: Texture | null = null;
    let cancelled = false;

    loader.load(
      url,
      (nextTexture) => {
        nextTexture.colorSpace = SRGBColorSpace;
        nextTexture.anisotropy = 4;
        loadedTexture = nextTexture;
        if (!cancelled) setTexture(nextTexture);
      },
      undefined,
      () => {
        // The painted fallback remains visible instead of a black material.
      },
    );

    return () => {
      cancelled = true;
      loadedTexture?.dispose();
    };
  }, [fallback, url]);

  useEffect(() => () => fallback.dispose(), [fallback]);
  return texture;
}
