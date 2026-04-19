import { motion } from 'framer-motion';

const TIMELINE_DATA = [
  {
    phase: "Pre-Election",
    items: [
      { title: "Electoral Roll Revision", desc: "ECI updates voter lists. Check your name on the electoral roll via NVSP portal or Voter Helpline App.", date: "Jan – Feb", icon: "📋" },
      { title: "Delimitation & Reservation", desc: "Constituency boundaries and seat reservations (SC/ST) are finalized by the Delimitation Commission.", date: "Feb", icon: "🗺️" },
      { title: "Election Announcement", desc: "Election Commission announces schedule, Model Code of Conduct comes into effect immediately.", date: "Mar", icon: "📢" },
    ]
  },
  {
    phase: "Nomination & Campaign",
    items: [
      { title: "Nomination Filing", desc: "Candidates file nomination papers with the Returning Officer. Security deposit of ₹25,000 (General) or ₹12,500 (SC/ST) required.", date: "Mar – Apr", icon: "📝" },
      { title: "Scrutiny of Nominations", desc: "Returning Officer examines all nominations. Invalid nominations are rejected.", date: "Apr", icon: "🔍" },
      { title: "Campaign Period", desc: "Candidates and parties campaign. Campaigning stops 48 hours before polling (silence period).", date: "Apr – May", icon: "📣" },
    ]
  },
  {
    phase: "Polling & Results",
    items: [
      { title: "Polling Day", desc: "Voting via EVM and VVPAT at designated polling stations. Polling hours typically 7 AM – 6 PM. Indelible ink applied on left index finger.", date: "May", icon: "🗳" },
      { title: "Vote Counting", desc: "EVMs transported to counting centers under strict security. Counting begins with postal ballots, then EVM rounds.", date: "May", icon: "📊" },
      { title: "Results Declaration", desc: "Results declared constituency-wise. Winning candidates receive certificate of election from Returning Officer.", date: "May", icon: "🏆" },
    ]
  }
];

export default function TimelineView() {
  return (
    <motion.div
      className="view-content"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="view-header">
        <h1 className="view-title">Election Timeline</h1>
        <p className="view-subtitle">Key milestones in the Indian election process — from electoral roll revision to results declaration.</p>
      </div>

      {TIMELINE_DATA.map((phase, pi) => (
        <div className="tl-phase" key={pi}>
          <div className="tl-phase-label">{phase.phase}</div>
          <div className="tl-items">
            {phase.items.map((item, ii) => (
              <motion.div
                className="tl-card"
                key={ii}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: (pi * 3 + ii) * 0.06 }}
              >
                <div className="tl-card-icon">{item.icon}</div>
                <div className="tl-card-body">
                  <div className="tl-card-top">
                    <span className="tl-card-title">{item.title}</span>
                    <span className="tl-card-date">{item.date}</span>
                  </div>
                  <p className="tl-card-desc">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
