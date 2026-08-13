import { useState } from "react";
import { Modal, Offcanvas } from "bootstrap";
import { PRODUCTS } from "./data/products.js";

import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import CategoryStrip from "./components/CategoryStrip.jsx";
import ProductCard from "./components/ProductCard.jsx";
import ShopPage from "./components/ShopPage.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import CheckoutPage from "./components/CheckoutPage.jsx";
import LoyaltyPage from "./components/LoyaltyPage.jsx";
import AdminPage from "./components/AdminPage.jsx";
import Footer from "./components/Footer.jsx";
import CartPanel from "./components/CartPanel.jsx";
import AuthModal from "./components/AuthModal.jsx";

// المكوّن الجذر للتطبيق: يحتفظ بكل الحالة العامة (الصفحة الحالية، السلة،
// المفضلة، المستخدم، الطلبات) ويحدد أي صفحة تُعرض حسب قيمة "page".
export default function App() {
  const [page, setPage] = useState("home");
  const [category, setCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  // إضافة منتج للسلة: لو نفس المنتج/اللون/السعة موجود مسبقًا نزيد الكمية،
  // غير كذا نضيف سطر جديد للسلة.
  const addToCart = (product, color, storage, qty) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.product.id === product.id && i.color.hex === color.hex && i.storage === storage);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
        return copy;
      }
      return [...prev, { product, color, storage, qty }];
    });
    showToast(`تمت إضافة ${product.name} إلى السلة`);
  };

  const updateQty = (idx, delta) =>
    setCart((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], qty: Math.max(1, copy[idx].qty + delta) };
      return copy;
    });
  const removeItem = (idx) => setCart((prev) => prev.filter((_, i) => i !== idx));
  const toggleWish = (id) => setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const openProduct = (p) => {
    setSelectedProduct(p);
    setPage("product");
    window.scrollTo(0, 0);
  };
  const nav = (p) => {
    setPage(p);
    window.scrollTo(0, 0);
  };
  const placeOrder = (payment, id, total) => {
    setOrders((prev) => [...prev, { id, payment, total, status: "قيد المعالجة" }]);
    setCart([]);
  };
  const updateOrderStatus = (idx, status) =>
    setOrders((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], status };
      return copy;
    });

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const openAuth = () => {
    const modal = new Modal(document.getElementById("authModal"));
    modal.show();
  };
  const openCart = () => {
    const oc = new Offcanvas(document.getElementById("cartOffcanvas"));
    oc.show();
  };

  return (
    <>
      <Header cartCount={cartCount} onNav={nav} page={page} onOpenCart={openCart} onOpenAuth={openAuth} user={user} />

      <main>

      {page === "home" && (
        <>
          <Hero onShop={() => nav("shop")} />
          <CategoryStrip
            active={category}
            onPick={(c) => {
              setCategory(c);
              nav("shop");
            }}
          />
          <section className="container">
            <section className="offer-banner p-4 p-md-5 d-flex flex-wrap justify-content-between align-items-center gap-3 mb-5">
              <section>
                <span className="badge-nabd badge-sale mb-2 d-inline-block">عروض محدودة</span>
                <h4 className="mb-1">وفّر حتى 800 ر.س على تشكيلة مختارة</h4>
                <p className="text-muted-2 mb-0">عروض هذا الأسبوع على آيفون وسامسونج وريدمي — لفترة محدودة.</p>
              </section>
              <button className="btn btn-pulse rounded-3 px-4" onClick={() => nav("shop")}>
                تسوّق العروض
              </button>
            </section>
            <section className="section-title mb-4">
              <h3 className="mb-0">الأكثر رواجًا بين شبابنا</h3>
              <span className="tag mono">مختارة لك</span>
            </section>
            <ul className="row row-cols-1 row-cols-sm-2 row-cols-xl-4 g-4 mb-5 list-unstyled">
              {PRODUCTS.filter((p) => p.badge).map((p) => (
                <li className="col" key={p.id}>
                  <ProductCard p={p} onOpen={openProduct} onAddCart={addToCart} wished={wishlist.includes(p.id)} onToggleWish={toggleWish} />
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      {page === "shop" && <ShopPage category={category} onOpen={openProduct} onAddCart={addToCart} wishlist={wishlist} onToggleWish={toggleWish} />}

      {page === "deals" && (
        <section className="container py-4">
          <h3 className="mb-4">العروض والخصومات</h3>
          <ul className="row row-cols-1 row-cols-sm-2 row-cols-xl-3 g-4 list-unstyled">
            {PRODUCTS.filter((p) => p.oldPrice).map((p) => (
              <li className="col" key={p.id}>
                <ProductCard p={p} onOpen={openProduct} onAddCart={addToCart} wished={wishlist.includes(p.id)} onToggleWish={toggleWish} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {page === "loyalty" && <LoyaltyPage />}

      {page === "product" && selectedProduct && <ProductDetail product={selectedProduct} onBack={() => nav("shop")} onAddCart={addToCart} />}

      {page === "checkout" && <CheckoutPage cart={cart} onPlaceOrder={placeOrder} onBack={() => nav("home")} />}

      {page === "admin" && <AdminPage orders={orders} updateStatus={updateOrderStatus} />}

      {page === "profile" && user && (
        <section className="container py-5">
          <h3 className="mb-4">مرحبًا، {user.name}</h3>
          <section className="filter-card">
            <p className="mb-1">
              <span className="text-muted-2">البريد الإلكتروني: </span>
              {user.email}
            </p>
            <p className="mb-0">
              <span className="text-muted-2">نقاط الولاء: </span>
              <span className="mono">{Math.floor(orders.reduce((s, o) => s + o.total, 0) / 10)}</span>
            </p>
          </section>
        </section>
      )}

      </main>

      <Footer onNav={nav} />
      <CartPanel cart={cart} updateQty={updateQty} removeItem={removeItem} onCheckout={() => nav("checkout")} />
      <AuthModal onLogin={setUser} />

      {toast && (
        <section className="position-fixed bottom-0 end-0 m-4 filter-card" style={{ zIndex: 2000 }}>
          <span style={{ color: "var(--mint)" }}>✔</span> {toast}
        </section>
      )}
    </>
  );
}
