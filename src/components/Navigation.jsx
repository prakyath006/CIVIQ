import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { id: 'chat', icon: '💬', label: 'Chat', badge: 'Live' },
  { id: 'timeline', icon: '📅', label: 'Timeline', badge: null },
  { id: 'guide', icon: '📋', label: 'Voter Guide', badge: null },
  { id: 'faq', icon: '❓', label: 'FAQ', badge: null },
  { id: 'about', icon: 'ℹ️', label: 'About', badge: null },
];

export default function Navigation({ activeTab, onTabChange }) {
  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onTabChange(id);
    }
  };

  return (
    <nav className="nav-section" aria-label="Main navigation">
      <div className="nav-label" id="nav-menu-label">Menu</div>
      <div role="tablist" aria-labelledby="nav-menu-label">
        {NAV_ITEMS.map((item, i) => (
          <motion.div
            key={item.id}
            role="tab"
            tabIndex={0}
            aria-selected={activeTab === item.id}
            aria-controls={`panel-${item.id}`}
            id={`tab-${item.id}`}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => onTabChange(item.id)}
            onKeyDown={(e) => handleKeyDown(e, item.id)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
          >
            <div className="nav-icon-wrap" aria-hidden="true">{item.icon}</div>
            <span className="nav-item-label">{item.label}</span>
            {item.badge && (
              <span className="nav-badge" aria-label={`${item.label} is ${item.badge}`}>
                {item.badge}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </nav>
  );
}
