import { useState } from "react";
import { PRODUCTS, BRANDS, money, CURRENCY } from "../data/products.js";
import ProductImage from "./ProductImage.jsx";
import Stars from "./Stars.jsx";
import ProductCard from "./ProductCard.jsx";

export default function ProductDetail({ product, onBack, onAddCart }) {
  const [color, setColor] = useState(product.colors[0]);
  const [storage, setStorage] = useState(product.storages[0]);
  const [qty, setQty] = useState(1);
  const related = PRODUCTS.filter((p) => p.brandKey === product.brandKey && p.id !== product.id).slice(0, 3);

  return (
    <article className="container py-4">
      <button type="button" className="btn btn-outline-nabd btn-sm rounded-3 mb-4" onClick={onBack}>
        → رجوع للمتجر
      </button>
      <section className="row g-5">
        <figure className="col-lg-5 text-center m-0">
          <section className="product-media rounded-xl" style={{ minHeight: "420px" }}>
            <ProductImage src={product.image} alt={product.name} />
          </section>
        </figure>
        <section className="col-lg-7">
          <p className="text-muted-2 mb-1">{BRANDS[product.brandKey]}</p>
          <h2 className="mb-2">{product.name}</h2>
          <p className="d-flex align-items-center gap-2 mb-3">
            <Stars rating={product.rating} />
            <span className="text-muted-2 mono small">
              {product.rating} · {product.reviews} تقييم
            </span>
          </p>
          <p className="d-flex align-items-baseline gap-3 mb-4">
            <span className="price-mono fs-2">
              {money(product.price)} {CURRENCY}
            </span>
            {product.oldPrice && (
              <span className="price-old fs-6 mono">
                {money(product.oldPrice)} {CURRENCY}
              </span>
            )}
          </p>

          <fieldset className="mb-4 border-0 p-0">
            <legend className="fw-semibold mb-2 h6">
              اللون: <span className="text-muted-2">{color.name}</span>
            </legend>
            <p className="d-flex gap-2">
              {product.colors.map((c) => (
                <button
                  type="button"
                  key={c.hex}
                  className={`swatch ${color.hex === c.hex ? "active" : ""}`}
                  style={{ background: c.hex }}
                  onClick={() => setColor(c)}
                  aria-label={c.name}
                ></button>
              ))}
            </p>
          </fieldset>

          <fieldset className="mb-4 border-0 p-0">
            <legend className="fw-semibold mb-2 h6">السعة التخزينية</legend>
            <p className="d-flex gap-2 flex-wrap">
              {product.storages.map((s) => (
                <button
                  type="button"
                  key={s}
                  className={`btn btn-sm rounded-3 ${storage === s ? "btn-nabd" : "btn-outline-nabd"}`}
                  onClick={() => setStorage(s)}
                >
                  {s}
                </button>
              ))}
            </p>
          </fieldset>

          <p className="d-flex align-items-center gap-3 mb-4">
            <span className="fw-semibold">الكمية</span>
            <span className="d-flex align-items-center gap-2">
              <button type="button" className="qty-btn" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                −
              </button>
              <span className="mono">{qty}</span>
              <button type="button" className="qty-btn" onClick={() => setQty((q) => q + 1)}>
                +
              </button>
            </span>
          </p>

          <p className="d-flex gap-3">
            <button type="button" className="btn btn-nabd btn-lg rounded-3 px-4" onClick={() => onAddCart(product, color, storage, qty)}>
              أضف للسلة
            </button>
            <button type="button" className="btn btn-outline-nabd btn-lg rounded-3 px-4">♡ للمفضلة</button>
          </p>

          <section className="filter-card mt-5">
            <h6 className="fw-bold mb-3">المواصفات التقنية</h6>
            <table className="table table-nabd table-borderless mb-0">
              <tbody>
                {product.specs.map((s, i) => (
                  <tr key={i}>
                    <th className="w-25">{s.label}</th>
                    <td className="mono">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </section>
      </section>

      {related.length > 0 && (
        <section className="mt-5">
          <h5 className="mb-3">أجهزة مشابهة من {BRANDS[product.brandKey]}</h5>
          <ul className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 list-unstyled">
            {related.map((p) => (
              <li className="col" key={p.id}>
                <ProductCard p={p} onOpen={onBack} onAddCart={onAddCart} wished={false} onToggleWish={() => {}} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
