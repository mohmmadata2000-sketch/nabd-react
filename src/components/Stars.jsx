export default function Stars({ rating }) {
  const full = Math.round(rating);
  return (
    <span className="stars">
      {"★".repeat(full)}
      {"☆".repeat(5 - full)}
    </span>
  );
}
