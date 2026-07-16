export const ru = {
  openGift: "Открыть подарок",
  blowCandle: "Погасить свечу",
  musicOn: "Включить музыку",
  giftNotFound: "Подарок не найден",
  order: "Заказать",
} as const;

export type UiText = typeof ru;
// Future dictionaries (Kazakh and English) must implement this same shape.
export const text: UiText = ru;
