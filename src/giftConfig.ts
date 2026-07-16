export type Vector3Tuple = [number, number, number];

export type PictureFrameConfig = {
  id: string;
  image: string;
  position: Vector3Tuple;
  rotation: Vector3Tuple;
  scale: number;
};

export type BirthdayCardConfig = {
  id: string;
  image: string;
  position: Vector3Tuple;
  rotation: Vector3Tuple;
};

export type GiftConfig = {
  id: string;
  slug: string;
  recipientName: string;
  senderName: string;
  occasion: string;
  introLines: string[];
  finalMessage: string;
  music: string;
  environment: string;
  backgroundImage?: string;
  frames: PictureFrameConfig[];
  cards: BirthdayCardConfig[];
};

export const businessConfig = {
  brandName: "CakeWish",
  domainExample: "cakewish.app",
  orderContactUrl: "https://t.me/futuretop1developer",
};

export const gifts: GiftConfig[] = [
  {
    id: "demo-zhanym",
    slug: "demo",
    recipientName: "Акберен",
    senderName: "Райымбек",
    occasion: "Birthday",
    introLines: [
      "> Акберен",
      "...",
      "> сегодня твой день",
      "...",
      "> Поздравляю с днем рождения",
      "...",
      "<3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3 <3 ",
    ],
    finalMessage: "Поздравляю с днем рождения",
    music: "/music.mp3",
    environment: "/shanghai_bund_4k.hdr",
    backgroundImage: "/paris.jpg",
    frames: [
      {
        id: "front",
        image: "/demo-girl.jpeg",
        position: [0, 0.735, 3],
        rotation: [0, 5.6, 0],
        scale: 0.75,
      },
      {
        id: "back",
        image: "/demo-girl.jpeg",
        position: [0, 0.735, -3],
        rotation: [0, 4.0, 0],
        scale: 0.75,
      },
      {
        id: "left-front",
        image: "/demo-girl.jpeg",
        position: [-1.5, 0.735, 2.5],
        rotation: [0, 5.4, 0],
        scale: 0.75,
      },
      {
        id: "left-back",
        image: "/demo-girl.jpeg",
        position: [-1.5, 0.735, -2.5],
        rotation: [0, 4.2, 0],
        scale: 0.75,
      },
    ],
    cards: [
      {
        id: "confetti",
        image: "/card.png",
        position: [1, 0.081, -2],
        rotation: [-Math.PI / 2, 0, Math.PI / 3],
      },
    ],
  },
];

export const defaultGift = gifts[0];

export function getGiftBySlug(slug: string) {
  return gifts.find((gift) => gift.slug === slug);
}
