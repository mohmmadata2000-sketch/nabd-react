export default function PhoneMockup({ color, size, label }) {
  const cls = size === "sm" ? "phone-mockup sm" : size === "xs" ? "phone-mockup xs" : "phone-mockup";
  const bg = `linear-gradient(155deg, ${color}dd, ${color}88)`;
  return (
    <figure className={`${cls} m-0`} style={{ background: bg }}>
      <span className="notch"></span>
      <span className="screen">
        {size !== "xs" && <span className="phone-brand-txt">{label || "نبض"}</span>}
      </span>
    </figure>
  );
}
