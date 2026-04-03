import { motion, AnimatePresence } from 'framer-motion';
import TopBar from './TopBar';
import QuickChips from './QuickChips';
import ChatMessages from './ChatMessages';
import InputBar from './InputBar';
import TimelineView from './TimelineView';
import VoterGuideView from './VoterGuideView';
import FAQView from './FAQView';
import AboutView from './AboutView';

const viewTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] }
};

export default function MainArea({
  activeTab, tabLabel, messages, chips, isTyping,
  onSend, onChipClick, onNewChat, onMenuClick
}) {
  const isChatTab = activeTab === 'chat';

  return (
    <motion.main
      className="main-area"
      role="main"
      aria-label="Main content area"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
    >
      <TopBar
        tabLabel={tabLabel}
        onNewChat={onNewChat}
        onMenuClick={onMenuClick}
        showNewChat={isChatTab}
      />

      {isChatTab && <QuickChips chips={chips} onChipClick={onChipClick} />}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          id={`panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          style={{ display: 'contents' }}
          {...viewTransition}
        >
          {activeTab === 'chat' && (
            <ChatMessages messages={messages} isTyping={isTyping} />
          )}
          {activeTab === 'timeline' && <TimelineView />}
          {activeTab === 'guide' && <VoterGuideView />}
          {activeTab === 'faq' && <FAQView />}
          {activeTab === 'about' && <AboutView />}
        </motion.div>
      </AnimatePresence>

      {isChatTab && <InputBar onSend={onSend} disabled={isTyping} />}
    </motion.main>
  );
}
