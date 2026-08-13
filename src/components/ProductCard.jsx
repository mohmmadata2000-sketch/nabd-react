import { useState } from "react";
import { BRANDS, money, CURRENCY } from "../data/products.js";
import ProductImage from "./ProductImage.jsx";
import Badge from "./Badge.jsx";
import Stars from "./Stars.jsx";

// بطاقة منتج واحدة تُستخدم في كل شبكات عرض المنتجات (الرئيسية، المتجر، العروض).
// تسمح باختيار اللون قبل الإضافة للسلة مباشرة من البطاقة.
export default function ProductCard({ p, onOpen, onAddCart, wished, onToggleWish }) {
  const [color, setColor] = useState(p.colors[0]);
  return (
    <article className="product-card">
      <figure className="product-media cursor-pointer m-0" onClick={() => onOpen(p)}>
        <Badge product={p} />
        <button
          type="button"
          className="icon-btn wishlist-btn"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWish(p.id);
          }}
          aria-label={wished ? "إزالة من المفضلة" : "إضافة للمفضلة"}
        >
          <span style={{ color: wished ? "var(--pulse)" : "var(--muted)" }}>{wished ? "♥" : "♡"}</span>
        </button>
        <ProductImage src={p.image} alt={p.name} size="sm" />
      </figure>
      <section className="p-3 d-flex flex-column flex-grow-1">
        <p className="mb-1">
          <span className="text-muted-2 small d-block">{BRANDS[p.brandKey]}</span>
          <span className="fw-bold cursor-pointer" onClick={() => onOpen(p)}>
            {p.name}
          </span>
        </p>
        <p className="d-flex align-items-center gap-2 mb-2">
          <Stars rating={p.rating} />
          <span className="text-muted-2 small mono">
            {p.rating} ({p.reviews})
          </span>
        </p>
        <p className="d-flex gap-1 mb-3">
          {p.colors.map((c) => (
            <button
              type="button"
              key={c.hex}
              className={`swatch ${color.hex === c.hex ? "active" : ""}`}
              style={{ width: 18, height: 18, background: c.hex }}
              onClick={() => setColor(c)}
              title={c.name}
              aria-label={c.name}
            ></button>
          ))}
        </p>
        <p className="mt-auto mb-0">
          <span className="d-flex align-items-baseline gap-2 mb-2">
            <span className="price-mono fs-5">
              {money(p.price)} {CURRENCY}
            </span>
            {p.oldPrice && <span className="price-old mono">{money(p.oldPrice)}</span>}
          </span>
          <button type="button" className="btn btn-nabd w-100 rounded-3" onClick={() => onAddCart(p, color, p.storages[0], 1)}>
            أضف للسلة
          </button>
        </p>
      </section>
    </article>
  );
}
