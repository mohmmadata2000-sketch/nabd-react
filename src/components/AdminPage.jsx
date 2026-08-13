import { money, CURRENCY } from "../data/products.js";

const STATUSES = ["قيد المعالجة", "تم الشحن", "تم التسليم", "ملغي"];
const payLabel = (p) => (p === "card" ? "بطاقة" : p === "applepay" ? "Apple Pay" : "عند الاستلام");

// لوحة إدارة الطلبات (تظهر فقط لمستخدم admin) لتحديث حالة كل طلب.
export default function AdminPage({ orders, updateStatus }) {
  return (
    <section className="container py-4">
      <h3 className="mb-4">لوحة إدارة الطلبات</h3>
      {orders.length === 0 ? (
        <p className="text-muted-2">لا توجد طلبات بعد.</p>
      ) : (
        <section className="table-responsive filter-card">
          <table className="table table-nabd align-middle mb-0">
            <thead>
              <tr>
                <th>رقم الطلب</th>
                <th>المبلغ</th>
                <th>طريقة الدفع</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, idx) => (
                <tr key={idx}>
                  <td className="mono">{o.id}</td>
                  <td className="mono">
                    {money(o.total)} {CURRENCY}
                  </td>
                  <td>{payLabel(o.payment)}</td>
                  <td>
                    <select className="form-select form-select-sm rounded-3" value={o.status} onChange={(e) => updateStatus(idx, e.target.value)}>
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </section>
  );
}
