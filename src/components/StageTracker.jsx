import { motion } from 'framer-motion';
import { STAGES } from '../lib/prompts';

export default function StageTracker({ currentStage }) {
  const getStatus = (stageId) => {
    if (stageId < currentStage) return 'done';
    if (stageId === currentStage) return 'active';
    return 'upcoming';
  };

  return (
    <div className="stage-section">
      <div className="nav-label">Your Journey</div>
      <div className="stage-list">
        {STAGES.map((s, i) => {
          const status = getStatus(s.id);
          return (
            <div className="stage-item" key={s.id}>
              <div className="stage-dot-col">
                <motion.div
                  className={`stage-dot ${status}`}
                  initial={status === 'active' ? { scale: 0.8, opacity: 0 } : {}}
                  animate={status === 'active' ? { scale: 1, opacity: 1 } : {}}
                  transition={status === 'active' ? { type: 'spring', stiffness: 300, damping: 20 } : {}}
                >
                  {status === 'done' && <span className="stage-check">✓</span>}
                  {status === 'active' && <span className="stage-inner" />}
                </motion.div>
                {i < STAGES.length - 1 && <div className="stage-connector" />}
              </div>
              <div className="stage-info">
                <div className={`stage-name ${status === 'upcoming' ? 'upcoming' : ''}`}>
                  {s.name}
                </div>
                <div className="stage-date">{s.date}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
