import { motion } from 'framer-motion';
import TimelineCard from './TimelineCard';
import NextActionBanner from './NextActionBanner';

export default function Message({ message }) {
  const isBot = message.role === 'bot';

  // Split text into paragraphs
  const paragraphs = message.text.split('\n\n').filter(Boolean);

  return (
    <motion.div
      className={`message ${isBot ? 'bot' : 'user'}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className={`msg-avatar ${isBot ? 'bot' : 'user'}`} aria-hidden="true">
        {isBot ? '🗳' : 'U'}
      </div>
      <div className="msg-content">
        <div className="msg-label">{isBot ? 'CIVIQ' : 'You'}</div>
        <div className={`msg-bubble ${isBot ? 'bot' : 'user'}`}>
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          {isBot && message.timeline && <TimelineCard items={message.timeline} />}
        </div>
        {isBot && message.nextAction && <NextActionBanner text={message.nextAction} />}
      </div>
    </motion.div>
  );
}
