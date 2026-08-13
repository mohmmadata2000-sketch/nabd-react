import { money, CURRENCY } from "../data/products.js";
import ProductImage from "./ProductImage.jsx";

// اللوحة الجانبية (offcanvas) لعربة التسوق: تعديل الكميات، حذف عناصر،
// وحساب نقاط الولاء (نقطة واحدة عن كل 10 ر.س) قبل الانتقال للدفع.
export default function CartPanel({ cart, updateQty, removeItem, onCheckout }) {
  const subtotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const points = Math.floor(subtotal / 10);
  return (
    <section className="offcanvas offcanvas-end" tabIndex="-1" id="cartOffcanvas">
      <header className="offcanvas-header border-bottom border-soft">
        <h5 className="mb-0">عربة التسوق</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
      </header>
      <section className="offcanvas-body d-flex flex-column">
        {cart.length === 0 ? (
          <p className="text-center text-muted-2 py-5">
            <span className="fs-1 mb-2 d-block">🛒</span>
            عربتك فارغة — أضف جهازك المفضل الآن.
          </p>
        ) : (
          <>
            <ul className="flex-grow-1 overflow-auto list-unstyled">
              {cart.map((item, idx) => (
                <li className="d-flex gap-3 border-bottom border-soft pb-3 mb-3" key={idx}>
                  <ProductImage src={item.product.image} alt={item.product.name} size="xs" />
                  <p className="flex-grow-1 mb-0">
                    <span className="fw-semibold small d-block">{item.product.name}</span>
                    <span className="text-muted-2 small d-block">
                      {item.color.name} · {item.storage}
                    </span>
                    <span className="d-flex align-items-center justify-content-between mt-2">
                      <span className="d-flex align-items-center gap-2">
                        <button type="button" className="qty-btn" onClick={() => updateQty(idx, -1)}>
                          −
                        </button>
                        <span className="mono small">{item.qty}</span>
                        <button type="button" className="qty-btn" onClick={() => updateQty(idx, 1)}>
                          +
                        </button>
                      </span>
                      <span className="price-mono small">
                        {money(item.product.price * item.qty)} {CURRENCY}
                      </span>
                    </span>
                  </p>
                  <button type="button" className="btn-close btn-close-white align-self-start" onClick={() => removeItem(idx)} aria-label="حذف من السلة"></button>
                </li>
              ))}
            </ul>
            <footer className="border-top border-soft pt-3">
              <p className="d-flex justify-content-between mb-1 text-muted-2 small">
                <span>نقاط الولاء المكتسبة</span>
                <span className="mono" style={{ color: "var(--mint)" }}>
                  +{points}
                </span>
              </p>
              <p className="d-flex justify-content-between fs-5 fw-bold mb-3">
                <span>الإجمالي</span>
                <span className="price-mono">
                  {money(subtotal)} {CURRENCY}
                </span>
              </p>
              <button type="button" className="btn btn-nabd w-100 rounded-3 py-2" data-bs-dismiss="offcanvas" onClick={onCheckout}>
                إتمام الشراء
              </button>
            </footer>
          </>
        )}
      </section>
    </section>
  );
}
