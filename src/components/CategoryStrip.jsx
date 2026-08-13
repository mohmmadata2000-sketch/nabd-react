import { BRANDS, CATEGORY_KEYS } from "../data/products.js";

const ICONS = { all: "◆", apple: "", samsung: "◐", xiaomi: "⬢" };

export default function CategoryStrip({ active, onPick }) {
  return (
    <section className="container py-4" aria-label="تصفح حسب الفئة">
      <ul className="row row-cols-3 row-cols-md-4 g-2 list-unstyled">
        {CATEGORY_KEYS.map((key) => (
          <li className="col" key={key}>
            <button
              type="button"
              className={`cat-chip w-100 ${active === key ? "active" : ""}`}
              onClick={() => onPick(key)}
            >
              <span className="fs-4 mb-1 d-block">{ICONS[key]}</span>
              <span className="small fw-semibold">{key === "all" ? "الكل" : BRANDS[key]}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
