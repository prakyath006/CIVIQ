import { motion, AnimatePresence } from 'framer-motion';

export default function QuickChips({ chips, onChipClick }) {
  return (
    <div className="quick-chips">
      <AnimatePresence mode="popLayout">
        {chips.map((chip, i) => (
          <motion.button
            key={chip}
            className="chip"
            onClick={() => onChipClick(chip)}
            initial={{ opacity: 0, x: 4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -4 }}
            transition={{ duration: 0.2, delay: i * 0.04 }}
          >
            {chip}
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}
