import { useState } from "react";
import PulseDivider from "./PulseDivider.jsx";

export default function Footer({ onNav }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = (e) => {
    e.preventDefault();
    if (email.trim().length === 0) return;
    setSubscribed(true);
  };

  return (
    <footer className="footer-nabd pt-5 pb-4 mt-5">
      <section className="container">
        <section className="row g-4">
          <section className="col-md-5">
            <section className="logo-mark mb-2">نبض</section>
            <p className="text-muted-2 small">متجرك الموثوق للأجهزة الذكية — نختار لك الأفضل بأسعار تنافسية وضمان حقيقي.</p>
          </section>
          <section className="col-md-3">
            <h6 className="fw-bold mb-3">المتجر</h6>
            <section className="d-flex flex-column gap-2 text-muted-2 small">
              <a
                href="#"
                className="text-muted-2"
                onClick={(e) => {
                  e.preventDefault();
                  onNav("shop");
                }}
              >
                الجوالات
              </a>
              <a
                href="#"
                className="text-muted-2"
                onClick={(e) => {
                  e.preventDefault();
                  onNav("deals");
                }}
              >
                العروض
              </a>
              <a
                href="#"
                className="text-muted-2"
                onClick={(e) => {
                  e.preventDefault();
                  onNav("loyalty");
                }}
              >
                الولاء
              </a>
            </section>
          </section>
          <section className="col-md-4">
            <h6 className="fw-bold mb-3">اشترك للعروض</h6>
            {subscribed ? (
              <section className="small" style={{ color: "var(--mint)" }}>
                ✔ تم الاشتراك بنجاح!
              </section>
            ) : (
              <form className="d-flex gap-2" onSubmit={subscribe}>
                <input
                  type="email"
                  required
                  className="form-control rounded-3"
                  placeholder="بريدك الإلكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className="btn btn-nabd rounded-3" type="submit">
                  اشترك
                </button>
              </form>
            )}
          </section>
        </section>
        <PulseDivider />
        <section className="text-center text-muted-2 small mt-3">© 2026 نبض. جميع الحقوق محفوظة.</section>
      </section>
    </footer>
  );
}
