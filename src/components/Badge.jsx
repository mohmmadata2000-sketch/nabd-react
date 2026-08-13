export default function Badge({ product }) {
  if (!product.badge) return null;
  const cls =
    product.badgeType === "sale" ? "badge-sale" : product.badgeType === "new" ? "badge-new" : "badge-hot";
  return <span className={`badge-nabd ${cls} position-absolute top-0 start-0 m-3`}>{product.badge}</span>;
}
