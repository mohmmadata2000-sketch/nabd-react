import { useState, useMemo } from "react";
import { PRODUCTS, BRANDS } from "../data/products.js";
import Filters from "./Filters.jsx";
import ProductCard from "./ProductCard.jsx";

// صفحة "تسوّق الجوالات": فيها بحث، فرز، وفلاتر (ماركة/سعر/عروض)
// تُطبَّق كلها معًا على قائمة المنتجات عبر useMemo لتفادي إعادة الحساب الزائد.
export default function ShopPage({ category, onOpen, onAddCart, wishlist, onToggleWish }) {
  const [filters, setFilters] = useState({ brands: [], maxPrice: 5800, onlyDeals: false });
  const [sort, setSort] = useState("popular");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      if (category !== "all" && p.brandKey !== category) return false;
      if (filters.brands.length && !filters.brands.includes(p.brandKey)) return false;
      if (p.price > filters.maxPrice) return false;
      if (filters.onlyDeals && !p.oldPrice) return false;
      if (search) {
        if (!p.name.includes(search) && !BRANDS[p.brandKey].includes(search)) return false;
      }
      return true;
    });
    if (sort === "priceAsc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "priceDesc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [category, filters, sort, search]);

  return (
    <section className="container py-4">
      <section className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <section className="section-title">
          <h3 className="mb-0">تسوّق الجوالات</h3>
          <span className="tag mono">{filtered.length} منتج</span>
        </section>
        <section className="d-flex gap-2 flex-wrap">
          <input
            className="form-control rounded-3"
            style={{ width: "220px" }}
            placeholder="ابحث عن جهاز..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="form-select rounded-3" style={{ width: "180px" }} value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="popular">الأكثر شهرة</option>
            <option value="priceAsc">السعر: الأقل أولاً</option>
            <option value="priceDesc">السعر: الأعلى أولاً</option>
            <option value="rating">الأعلى تقييمًا</option>
          </select>
        </section>
      </section>
      <section className="row g-4">
        <section className="col-lg-3">
          <Filters filters={filters} setFilters={setFilters} />
        </section>
        <section className="col-lg-9">
          {filtered.length === 0 ? (
            <section className="text-center py-5 text-muted-2">لا توجد نتائج مطابقة لبحثك — جرّب تعديل الفلاتر.</section>
          ) : (
            <ul className="row row-cols-1 row-cols-sm-2 row-cols-xl-3 g-4 list-unstyled">
              {filtered.map((p) => (
                <li className="col" key={p.id}>
                  <ProductCard p={p} onOpen={onOpen} onAddCart={onAddCart} wished={wishlist.includes(p.id)} onToggleWish={onToggleWish} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </section>
    </section>
  );
}
