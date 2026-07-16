# CakeWish

Mini-business MVP for selling personal interactive birthday surprises by link.

Users order a custom 3D birthday page with photos, music, cake scene and greeting text. You deliver a ready URL like:

```txt
https://your-domain.com/g/amina
```

## Run Locally

```bash
npm install
npm run dev
```

Open:

```txt
http://localhost:5173/
http://localhost:5173/g/demo
```

## Build

```bash
npm run build
npm run preview
```

## Docker

The production image builds the application and serves it through Nginx with
SPA fallback enabled, so gift links such as `/g/demo` work after a direct visit.

```bash
docker build -t cakewish .
docker run --rm -p 8080:80 cakewish
```

Open `http://localhost:8080/`.

## MVP Flow

1. Customer opens the landing page.
2. Customer fills the order form.
3. The form copies an order summary.
4. Customer sends the text and photos in Telegram.
5. You create a new gift config and deploy.
6. Customer receives a private link.

## Configure Orders

Main config file:

```txt
src/giftConfig.ts
```

Change your Telegram link:

```ts
export const businessConfig = {
  brandName: "CakeWish",
  domainExample: "cakewish.app",
  orderContactUrl: "https://t.me/your_username",
};
```

Create a new gift by adding an item to `gifts`:

```ts
{
  id: "amina-birthday",
  slug: "amina",
  recipientName: "Amina",
  senderName: "Daniyar",
  occasion: "Birthday",
  introLines: [
    "> Amina",
    "...",
    "> today is your birthday",
    "...",
    "> this surprise was made just for you",
  ],
  finalMessage: "Happy birthday, Amina",
  music: "/orders/amina/music.mp3",
  environment: "/shanghai_bund_4k.hdr",
  frames: [...],
  cards: [...],
}
```

Then the link will be:

```txt
/g/amina
```

## Assets

Default assets are in `public/`.

Recommended customer structure:

```txt
public/orders/amina/frame1.jpg
public/orders/amina/frame2.jpg
public/orders/amina/frame3.jpg
public/orders/amina/frame4.jpg
public/orders/amina/card.png
public/orders/amina/music.mp3
```

## Deployment Notes

Use one main domain and per-order paths:

```txt
your-domain.com/g/amina
your-domain.com/g/dana-20
your-domain.com/g/mom-birthday
```

For Vercel/Netlify/static hosting, enable SPA fallback so `/g/demo` opens `index.html` directly.

## Important Optimization TODO

Before paid traffic, reduce asset weight:

1. Replace or compress `public/shanghai_bund_4k.hdr` because it is about 25 MB.
2. Compress `.glb` models with Draco or mesh optimization.
3. Compress customer photos before adding them.
4. Keep music short and compressed.
5. Add a backend/storage flow only after the first paid orders.
