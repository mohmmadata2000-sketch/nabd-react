export default function PulseDivider() {
  return (
    <section className="pulse-line-wrap">
      <svg className="pulse-line" viewBox="0 0 800 34" preserveAspectRatio="none">
        <polyline
          points="0,17 60,17 80,4 100,30 120,17 700,17 720,4 740,30 760,17 1600,17"
          fill="none"
          stroke="url(#pulseGrad)"
          strokeWidth="2"
        />
        <defs>
          <linearGradient id="pulseGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="#4F7CFF" />
            <stop offset="100%" stopColor="#FF5D73" />
          </linearGradient>
        </defs>
      </svg>
    </section>
  );
}
