import { useState } from "react";
import { TICKER_ITEMS } from "../data/products.js";
import PhoneMockup from "./PhoneMockup.jsx";

export default function Hero({ onShop }) {
  const heroColors = [
    { hex: "#4F7CFF", name: "أزرق نبض" },
    { hex: "#FF5D73", name: "وردي طاقة" },
    { hex: "#232430", name: "أسود نصف الليل" },
  ];
  const [color, setColor] = useState(heroColors[0]);
  return (
    <section className="hero-wrap pb-4">
      <section className="container">
        <section className="row align-items-center gy-5">
          <section className="col-lg-6 order-2 order-lg-1">
            <span className="hero-eyebrow">
              <span className="pulse-dot">●</span> إصدارات 2026 متوفرة الآن
            </span>
            <h1 className="hero-title mt-3 mb-3">
              جوالك الجديد،
              <br />
              <span className="accent">نبضة</span> طاقة <span className="pulse-word">مختلفة</span>
            </h1>
            <p className="text-muted-2 fs-5 mb-4" style={{ maxWidth: "520px" }}>
              أحدث الأجهزة من آبل وسامسونج وشاومي، بأسعار تنافسية وتقسيط مريح وضمان رسمي — كل ما يحتاجه جيل يعيش على هاتفه.
            </p>
            <p className="d-flex gap-3 flex-wrap mb-4">
              <button type="button" className="btn btn-nabd btn-lg px-4 rounded-3" onClick={onShop}>
                تسوّق الآن
              </button>
              <button type="button" className="btn btn-outline-nabd btn-lg px-4 rounded-3" onClick={onShop}>
                استعرض العروض
              </button>
            </p>
            <p className="d-flex gap-2 align-items-center">
              {heroColors.map((c) => (
                <button
                  type="button"
                  key={c.hex}
                  className={`swatch ${color.hex === c.hex ? "active" : ""}`}
                  style={{ background: c.hex }}
                  onClick={() => setColor(c)}
                  title={c.name}
                  aria-label={c.name}
                ></button>
              ))}
              <span className="text-muted-2 small ms-2">{color.name}</span>
            </p>
          </section>
          <section className="col-lg-6 order-1 order-lg-2 text-center">
            <PhoneMockup color={color.hex} label="نبض 26" />
          </section>
        </section>
      </section>
      <section className="ticker-wrap mt-5" aria-label="مزايا سريعة">
        <p className="ticker-track mb-0">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
            <span key={i} className="ticker-item">
              {t}
            </span>
          ))}
        </p>
      </section>
    </section>
  );
}
