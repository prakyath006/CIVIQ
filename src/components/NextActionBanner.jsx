export default function NextActionBanner({ text }) {
  if (!text) return null;

  return (
    <div className="next-action" role="note" aria-label="Next step">
      <span className="next-action-arrow" aria-hidden="true">→</span>
      Your next step: {text}
    </div>
  );
}
