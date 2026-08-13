// شريط التنقل العلوي: يعرض الشعار وروابط الصفحات وأزرار الحساب والسلة.
// القائمة الجانبية للجوال (mobileNav) تُرسم كعنصر شقيق لـ<header> عمدًا،
// لأن خاصية backdrop-filter على الهيدر تحبس العناصر ذات position:fixed بداخله.
export default function Header({ cartCount, onNav, page, onOpenCart, onOpenAuth, user }) {
  const navItems = [
    { key: "home", label: "الرئيسية" },
    { key: "shop", label: "الجوالات" },
    { key: "deals", label: "العروض" },
    { key: "loyalty", label: "برنامج الولاء" },
  ];
  return (
    <>
      <header className="navbar navbar-nabd navbar-expand-lg py-3">
        <section className="container">
          <a
            className="logo-mark"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNav("home");
            }}
          >
            نبض
          </a>
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileNav"
            aria-label="فتح القائمة"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <nav className="d-none d-lg-flex align-items-center gap-1 mx-auto" aria-label="التنقل الرئيسي">
            <ul className="d-flex align-items-center gap-1 list-unstyled mb-0">
              {navItems.map((n) => (
                <li key={n.key}>
                  <a
                    className={`nav-link-nabd ${page === n.key ? "active" : ""}`}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onNav(n.key);
                    }}
                  >
                    {n.label}
                  </a>
                </li>
              ))}
              {user && user.isAdmin && (
                <li>
                  <a
                    className={`nav-link-nabd ${page === "admin" ? "active" : ""}`}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onNav("admin");
                    }}
                  >
                    لوحة الطلبات
                  </a>
                </li>
              )}
            </ul>
          </nav>

          <section className="d-flex align-items-center gap-2">
            <button
              className="icon-btn"
              onClick={() => (user ? onNav("profile") : onOpenAuth())}
              title="حسابي"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c1.5-4 6-6 8-6s6.5 2 8 6" />
              </svg>
            </button>
            <button className="icon-btn" onClick={onOpenCart} title="عربة التسوق">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3h2l2.4 12.2a2 2 0 002 1.8h8.2a2 2 0 002-1.6L21 8H6" />
                <circle cx="9" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
              </svg>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </section>
        </section>
      </header>

      {/* Rendered as a sibling of <header>, not a child — the navbar's backdrop-filter
          creates a containing block that would otherwise trap this fixed-position offcanvas. */}
      <section className="offcanvas offcanvas-start" tabIndex="-1" id="mobileNav">
        <section className="offcanvas-header">
          <span className="logo-mark">نبض</span>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
        </section>
        <nav className="offcanvas-body" aria-label="قائمة التنقل للجوال">
          <ul className="d-flex flex-column gap-2 list-unstyled mb-0">
            {navItems.map((n) => (
              <li key={n.key}>
                <a
                  className="nav-link-nabd"
                  data-bs-dismiss="offcanvas"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onNav(n.key);
                  }}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </>
  );
}
