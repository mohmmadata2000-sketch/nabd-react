import { useState } from "react";

export default function AuthModal({ onLogin }) {
  const [tab, setTab] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onLogin({
      name: name || "عميل نبض",
      email: email || "guest@nabd.sa",
      isAdmin: email.includes("admin"),
    });
  };

  return (
    <section className="modal fade" id="authModal" tabIndex="-1">
      <section className="modal-dialog modal-dialog-centered">
        <section className="modal-content rounded-xl border-soft">
          <header className="modal-header border-soft">
            <h5 className="modal-title">{tab === "login" ? "تسجيل الدخول" : "إنشاء حساب جديد"}</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </header>
          <section className="modal-body">
            <ul className="nav nav-pills mb-4 gap-2">
              <li className="nav-item">
                <button type="button" className={`btn btn-sm rounded-3 ${tab === "login" ? "btn-nabd" : "btn-outline-nabd"}`} onClick={() => setTab("login")}>
                  دخول
                </button>
              </li>
              <li className="nav-item">
                <button type="button" className={`btn btn-sm rounded-3 ${tab === "register" ? "btn-nabd" : "btn-outline-nabd"}`} onClick={() => setTab("register")}>
                  حساب جديد
                </button>
              </li>
            </ul>
            <form onSubmit={submit} className="d-flex flex-column gap-3">
              {tab === "register" && (
                <p className="mb-0">
                  <label className="form-label small text-muted-2">الاسم الكامل</label>
                  <input
                    className="form-control rounded-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: سارة العتيبي"
                    required
                  />
                </p>
              )}
              <p className="mb-0">
                <label className="form-label small text-muted-2">البريد الإلكتروني</label>
                <input
                  type="email"
                  className="form-control rounded-3"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </p>
              <p className="mb-0">
                <label className="form-label small text-muted-2">كلمة المرور</label>
                <input type="password" className="form-control rounded-3" placeholder="••••••••" required />
              </p>
              <button type="submit" className="btn btn-nabd rounded-3 py-2 mt-2" data-bs-dismiss="modal">
                {tab === "login" ? "تسجيل الدخول" : "إنشاء الحساب"}
              </button>
              <p className="text-muted-2 small text-center mb-0">
                جرّب البريد "admin@nabd.sa" للدخول كمسؤول ومشاهدة لوحة إدارة الطلبات.
              </p>
            </form>
          </section>
        </section>
      </section>
    </section>
  );
}
