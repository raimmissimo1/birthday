import { useMemo, useState } from "react";
import { businessConfig, defaultGift } from "./giftConfig";

type OrderFormState = {
  recipientName: string;
  senderName: string;
  greeting: string;
  cakeStyle: string;
  backgroundStyle: string;
  musicMood: string;
  deadline: string;
};

const packages = [
  {
    name: "Basic",
    price: "2999",
    description: "Готовый 3D-сюрприз, 4 фото, текст поздравления и личная ссылка.",
  },
  {
    name: "Premium",
    price: "3999",
    description: "Выбор фона, стиля торта, музыки и более детальная открытка.",
  },
];

const cakeOptions = [
  {
    label: "Романтичный розовый торт",
    description: "Нежный стиль для девушки, пары или признания.",
    className: "romantic-cake",
  },
  {
    label: "Классический birthday-торт",
    description: "Яркий праздничный вариант для друзей и семьи.",
    className: "classic-cake",
  },
  {
    label: "Минималистичный luxury-торт",
    description: "Темный, дорогой и более спокойный визуал.",
    className: "luxury-cake",
  },
];

const backgroundOptions = [
  {
    label: "Ночной город",
    description: "Кинематографичный вечерний фон с огнями.",
    className: "night-bg",
  },
  {
    label: "Розовая dream-сцена",
    description: "Мягкий романтичный фон для cute-подарка.",
    className: "pink-bg",
  },
  {
    label: "Звездное небо",
    description: "Спокойный космический фон с сиянием.",
    className: "stars-bg",
  },
  {
    label: "Париж",
    description: "Фото-фон с атмосферой Paris для romantic birthday.",
    className: "paris-bg",
  },
  {
    label: "Рим",
    description: "Теплый city-фон Rome для дорогого сюрприза.",
    className: "rome-bg",
  },
  {
    label: "Фото клиента",
    description: "Персональный фон из фотографии клиента.",
    className: "photo-bg",
  },
];

const musicOptions = [
  {
    label: "Happy birthday",
    description: "Более праздничное настроение для классического сюрприза.",
  },
];

const initialForm: OrderFormState = {
  recipientName: "",
  senderName: "",
  greeting: "",
  cakeStyle: "Минималистичный luxury-торт",
  backgroundStyle: "Париж",
  musicMood: "Happy birthday",
  deadline: "",
};

async function copyText(text: string) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.append(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    return copied;
  } catch {
    return false;
  }
}

export function LandingPage() {
  const [form, setForm] = useState<OrderFormState>(initialForm);
  const [copied, setCopied] = useState(false);

  const orderText = useMemo(
    () =>
      [
        "New CakeWish order",
        `Recipient: ${form.recipientName || "not provided"}`,
        `Sender: ${form.senderName || "not provided"}`,
        `Greeting: ${form.greeting || "not provided"}`,
        `Cake: ${form.cakeStyle}`,
        `Background: ${form.backgroundStyle}`,
        `Music: ${form.musicMood}`,
        `Deadline: ${form.deadline || "not provided"}`,
        "Photos: attach in chat",
      ].join("\n"),
    [form]
  );

  const contactReady = !businessConfig.orderContactUrl.includes("your_username");

  const updateField =
    (field: keyof OrderFormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
      setCopied(false);
    };

  const selectOption = (field: keyof OrderFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setCopied(false);
  };

  const copyOrder = async () => {
    setCopied(await copyText(orderText));
  };

  const submitOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await copyOrder();

    if (contactReady) {
      window.open(businessConfig.orderContactUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <main className="landing-page">
      <section className="hero-section">
        <nav className="site-nav" aria-label="Main navigation">
          <a className="brand" href="/">
            {businessConfig.brandName}
          </a>
          <div className="nav-links">
            <a href={`/${defaultGift.slug === "demo" ? "g/demo" : `g/${defaultGift.slug}`}`}>
              Demo
            </a>
            <a href="#order">Order</a>
          </div>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Digital birthday surprise</p>
            <h1>Персональный 3D-торт по ссылке для дня рождения</h1>
            <p className="hero-description">
              Клиент отправляет фото, музыку и поздравление, ты собираешь интерактивный подарок,
              а именинник открывает готовый результат по домену с телефона.
            </p>
            <div className="hero-actions">
              <a className="primary-action" href="/g/demo">
                Посмотреть demo
              </a>
              <a className="secondary-action" href="#order">
                Заказать подарок
              </a>
            </div>
          </div>

          <div className="hero-preview" aria-label="Example gift link">
            <div className="phone-frame">
              <div className="phone-url">{businessConfig.domainExample}/g/amina</div>
              <div className="cake-orb">🎂</div>
              <p>Tap to start</p>
              <span>photos + cake + message</span>
            </div>
          </div>
        </div>
      </section>

      <section className="packages-section" aria-label="Packages">
        {packages.map((item) => (
          <article className="package-card" key={item.name}>
            <div>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
            </div>
            <strong>{item.price}</strong>
          </article>
        ))}
      </section>

      <section className="requirements-section">
        <article>
          <h2>Что нужно от клиента</h2>
          <p>
            Имя получателя, 4-8 фото, поздравительная речь, желаемый стиль торта,
            фон, музыка от клиента и дата дедлайна.
          </p>
        </article>
      </section>

      <section className="style-preview-section" aria-label="Style previews">
        <div className="section-heading">
          <p className="eyebrow">Выбор перед заказом</p>
          <h2>Клиент сразу видит торт, фон и музыку</h2>
          <p>
            Не нужно объяснять в переписке: варианты можно показать на сайте, а выбранный
            стиль автоматически попадет в заявку.
          </p>
        </div>

        <div className="preview-group">
          <h3>Вид торта</h3>
          <div className="preview-card-grid">
            {cakeOptions.map((option) => (
              <button
                className={`option-preview ${option.className} ${
                  form.cakeStyle === option.label ? "is-selected" : ""
                }`}
                key={option.label}
                type="button"
                aria-pressed={form.cakeStyle === option.label}
                onClick={() => selectOption("cakeStyle", option.label)}
              >
                <span className="option-visual cake-visual" aria-hidden="true" />
                <span className="option-title">{option.label}</span>
                <span className="option-description">{option.description}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="preview-group">
          <h3>Фон</h3>
          <div className="preview-card-grid">
            {backgroundOptions.map((option) => (
              <button
                className={`option-preview ${option.className} ${
                  form.backgroundStyle === option.label ? "is-selected" : ""
                }`}
                key={option.label}
                type="button"
                aria-pressed={form.backgroundStyle === option.label}
                onClick={() => selectOption("backgroundStyle", option.label)}
              >
                <span className="option-visual background-visual" aria-hidden="true" />
                <span className="option-title">{option.label}</span>
                <span className="option-description">{option.description}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="preview-group">
          <h3>Музыка</h3>
          <div className="preview-card-grid music-preview-grid">
            {musicOptions.map((option) => (
              <article
                className={`option-preview music-option ${
                  form.musicMood === option.label ? "is-selected" : ""
                }`}
                key={option.label}
              >
                <div>
                  <span className="option-title">{option.label}</span>
                  <span className="option-description">{option.description}</span>
                </div>
                <button
                  className="secondary-action"
                  type="button"
                  aria-pressed={form.musicMood === option.label}
                  onClick={() => selectOption("musicMood", option.label)}
                >
                  Выбрать
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="order-section" id="order">
        <div className="order-copy">
          <p className="eyebrow">Заявка</p>
          <h2>Форма для первых заказов</h2>
          <p>
            Пока без backend: форма готовит текст заказа. После отправки клиент прикрепляет
            фото в чате, а ты вручную создаешь ссылку.
          </p>
          {!contactReady && (
            <p className="setup-warning">
              Замени <code>orderContactUrl</code> в <code>src/giftConfig.ts</code> на свой Telegram.
            </p>
          )}
        </div>

        <form className="order-form" onSubmit={submitOrder}>
          <label>
            Имя получателя
            <input
              value={form.recipientName}
              onChange={updateField("recipientName")}
              placeholder="Например, Амина"
              required
            />
          </label>
          <label>
            От кого подарок
            <input
              value={form.senderName}
              onChange={updateField("senderName")}
              placeholder="Например, от Данияра"
            />
          </label>
          <label>
            Поздравительная речь
            <textarea
              value={form.greeting}
              onChange={updateField("greeting")}
              placeholder="Текст, который должен появиться в сюрпризе"
              rows={5}
              required
            />
          </label>
          <div className="form-row">
            <label>
              Вид торта
              <select value={form.cakeStyle} onChange={updateField("cakeStyle")}>
                {cakeOptions.map((option) => (
                  <option key={option.label}>{option.label}</option>
                ))}
              </select>
            </label>
            <label>
              Фон
              <select value={form.backgroundStyle} onChange={updateField("backgroundStyle")}>
                {backgroundOptions.map((option) => (
                  <option key={option.label}>{option.label}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-row">
            <label>
              Музыка
              <select value={form.musicMood} onChange={updateField("musicMood")}>
                {musicOptions.map((option) => (
                  <option key={option.label}>{option.label}</option>
                ))}
              </select>
            </label>
            <label>
              Дедлайн
              <input type="date" value={form.deadline} onChange={updateField("deadline")} />
            </label>
          </div>
          <label>
            Фото для рамок
            <input type="file" accept="image/*" multiple />
            <span className="field-note">В MVP фото прикрепляются в Telegram после заявки.</span>
          </label>

          <div className="form-actions">
            <button className="primary-action" type="submit">
              {contactReady ? "Скопировать и открыть Telegram" : "Скопировать заказ"}
            </button>
            <button className="secondary-action" type="button" onClick={copyOrder}>
              {copied ? "Скопировано" : "Скопировать текст"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
