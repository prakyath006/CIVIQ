export default function TimelineCard({ items }) {
  if (!items || items.length === 0) return null;

  const badgeLabel = (status) => {
    switch (status) {
      case 'done': return 'Done ✓';
      case 'now':  return 'Now →';
      default:     return 'Next';
    }
  };

  return (
    <div className="timeline-card" role="table" aria-label="Election Timeline">
      <div className="timeline-header">Election Timeline</div>
      {items.map((item, i) => (
        <div className="timeline-row" key={i} role="row">
          <div className="timeline-step-num" aria-hidden="true">{i + 1}</div>
          <span className="timeline-step-label">{item.step}</span>
          <span className="timeline-step-date">{item.date}</span>
          <span className={`timeline-badge ${item.status}`}>
            {badgeLabel(item.status)}
          </span>
        </div>
      ))}
    </div>
  );
}
