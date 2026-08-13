import { useState } from "react";
import { money, CURRENCY } from "../data/products.js";

// صفحة الدفع: عنوان الشحن وطريقة الدفع وملخص الطلب في صفحة واحدة،
// وتنتهي بشاشة تأكيد بعد الضغط على "تأكيد الطلب".
export default function CheckoutPage({ cart, onPlaceOrder, onBack }) {
  const [payment, setPayment] = useState("card");
  const subtotal = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const shipping = subtotal > 300 ? 0 : 25;
  const total = subtotal + shipping;
  const [placed, setPlaced] = useState(false);
  const orderId = "NBD-" + Math.floor(10000 + Math.random() * 89999);

  if (cart.length === 0 && !placed) {
    return (
      <section className="container py-5 text-center text-muted-2">
        لا توجد عناصر في السلة لإتمام الشراء.{" "}
        <button type="button" className="btn btn-nabd rounded-3 ms-2" onClick={onBack}>
          عودة للتسوق
        </button>
      </section>
    );
  }

  if (placed) {
    return (
      <section className="container py-5 text-center">
        <p className="fs-1 mb-3" style={{ color: "var(--mint)" }}>
          ✔
        </p>
        <h3 className="mb-2">تم استلام طلبك بنجاح!</h3>
        <p className="text-muted-2 mb-1">
          رقم الطلب: <span className="mono">{orderId}</span>
        </p>
        <p className="text-muted-2">سنرسل تحديثات حالة الشحن عبر البريد الإلكتروني.</p>
        <button type="button" className="btn btn-nabd rounded-3 mt-3" onClick={onBack}>
          متابعة التسوق
        </button>
      </section>
    );
  }

  return (
    <section className="container py-4">
      <h3 className="mb-4">إتمام الشراء</h3>
      <section className="row g-4">
        <section className="col-lg-7">
          <fieldset className="filter-card mb-4 border-0">
            <legend className="fw-bold mb-3 h6">عنوان الشحن</legend>
            <span className="row g-3">
              <span className="col-md-6 d-block">
                <input className="form-control rounded-3" placeholder="الاسم الكامل" />
              </span>
              <span className="col-md-6 d-block">
                <input className="form-control rounded-3" placeholder="رقم الجوال" />
              </span>
              <span className="col-md-6 d-block">
                <input className="form-control rounded-3" placeholder="المدينة" />
              </span>
              <span className="col-md-6 d-block">
                <input className="form-control rounded-3" placeholder="الحي" />
              </span>
              <span className="col-12 d-block">
                <input className="form-control rounded-3" placeholder="تفاصيل العنوان (شارع، مبنى)" />
              </span>
            </span>
          </fieldset>

          <fieldset className="filter-card border-0">
            <legend className="fw-bold mb-3 h6">طريقة الدفع</legend>
            {[
              { id: "card", label: "بطاقة ائتمان / مدى", hint: "فيزا، ماستركارد، مدى" },
              { id: "applepay", label: "Apple Pay", hint: "دفع سريع وآمن" },
              { id: "cod", label: "الدفع عند الاستلام", hint: "نقدًا عند وصول الطلب" },
            ].map((opt) => (
              <label
                key={opt.id}
                className="d-flex align-items-center gap-3 border-soft rounded-3 p-3 mb-2 cursor-pointer"
                style={{ background: payment === opt.id ? "var(--surface-2)" : "transparent" }}
              >
                <input type="radio" name="pay" checked={payment === opt.id} onChange={() => setPayment(opt.id)} />
                <span>
                  <span className="fw-semibold d-block">{opt.label}</span>
                  <span className="text-muted-2 small d-block">{opt.hint}</span>
                </span>
              </label>
            ))}
          </fieldset>
        </section>

        <section className="col-lg-5">
          <section className="filter-card">
            <h6 className="fw-bold mb-3">ملخص الطلب</h6>
            <dl className="mb-0">
              {cart.map((item, idx) => (
                <span className="d-flex justify-content-between small mb-2" key={idx}>
                  <dt className="text-muted-2 fw-normal">
                    {item.product.name} × {item.qty}
                  </dt>
                  <dd className="mono mb-0">{money(item.product.price * item.qty)}</dd>
                </span>
              ))}
              <hr className="border-soft" />
              <span className="d-flex justify-content-between small mb-1">
                <dt className="fw-normal">الشحن</dt>
                <dd className="mono mb-0">{shipping === 0 ? "مجاني" : money(shipping) + " " + CURRENCY}</dd>
              </span>
              <span className="d-flex justify-content-between fs-5 fw-bold mt-2 mb-3">
                <dt>الإجمالي</dt>
                <dd className="price-mono mb-0">
                  {money(total)} {CURRENCY}
                </dd>
              </span>
            </dl>
            <button
              type="button"
              className="btn btn-pulse w-100 rounded-3"
              onClick={() => {
                onPlaceOrder(payment, orderId, total);
                setPlaced(true);
              }}
            >
              تأكيد الطلب ({money(total)} {CURRENCY})
            </button>
          </section>
        </section>
      </section>
    </section>
  );
}
