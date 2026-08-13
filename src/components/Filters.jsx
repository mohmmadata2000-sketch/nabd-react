import { PRODUCTS, BRANDS, money, CURRENCY } from "../data/products.js";

// فلاتر صفحة المتجر: الماركة (اختيار متعدد)، السعر الأقصى (شريط تمرير)،
// وخيار "فقط العروض" لإظهار المنتجات المخفضة فقط.
export default function Filters({ filters, setFilters }) {
  const brandKeys = [...new Set(PRODUCTS.map((p) => p.brandKey))];
  const toggleBrand = (b) =>
    setFilters((f) => ({
      ...f,
      brands: f.brands.includes(b) ? f.brands.filter((x) => x !== b) : [...f.brands, b],
    }));
  return (
    <section className="filter-card sticky-top" style={{ top: "90px" }}>
      <h6 className="fw-bold mb-3">تصفية النتائج</h6>
      <fieldset className="mb-4">
        <legend className="text-muted-2 small mb-2 h6">الماركة</legend>
        {brandKeys.map((b) => (
          <section className="form-check" key={b}>
            <input
              className="form-check-input"
              type="checkbox"
              checked={filters.brands.includes(b)}
              onChange={() => toggleBrand(b)}
              id={`b-${b}`}
            />
            <label className="form-check-label small" htmlFor={`b-${b}`}>
              {BRANDS[b]}
            </label>
          </section>
        ))}
      </fieldset>
      <section className="mb-4">
        <section className="text-muted-2 small mb-2 d-flex justify-content-between">
          <span>السعر الأقصى</span>
          <span className="mono">
            {money(filters.maxPrice)} {CURRENCY}
          </span>
        </section>
        <input
          type="range"
          className="form-range"
          min="900"
          max="5800"
          step="100"
          value={filters.maxPrice}
          onChange={(e) => setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) }))}
        />
      </section>
      <section className="mb-2">
        <section className="text-muted-2 small mb-2">فقط العروض</section>
        <section className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            checked={filters.onlyDeals}
            onChange={(e) => setFilters((f) => ({ ...f, onlyDeals: e.target.checked }))}
            id="onlyDeals"
          />
          <label className="form-check-label small" htmlFor="onlyDeals">
            عرض المنتجات المخفضة فقط
          </label>
        </section>
      </section>
      <button
        className="btn btn-outline-nabd w-100 mt-3 rounded-3"
        onClick={() => setFilters({ brands: [], maxPrice: 5800, onlyDeals: false })}
      >
        إعادة ضبط
      </button>
    </section>
  );
}
