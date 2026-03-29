import { motion } from 'framer-motion';
import Logo from './Logo';
import Navigation from './Navigation';
import StageTracker from './StageTracker';
import UserFooter from './UserFooter';

export default function Sidebar({ stage, isOpen, onClose, activeTab, onTabChange }) {
  return (
    <motion.aside
      className={`sidebar ${isOpen ? 'mobile-open' : ''}`}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="sidebar-dot-grid" />
      <div className="sidebar-gold-glow" />
      <Logo />
      <Navigation activeTab={activeTab} onTabChange={onTabChange} />
      <StageTracker currentStage={stage} />
      <UserFooter />
    </motion.aside>
  );
}
