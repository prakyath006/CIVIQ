import { motion } from 'framer-motion';

const STEPS = [
  {
    num: 1,
    title: "Check Your Eligibility",
    desc: "You must be an Indian citizen, at least 18 years old on the qualifying date (January 1 of the year of electoral roll revision), and a resident of the constituency.",
    tip: "Even NRIs can vote! You can register under Section 20A of the RP Act.",
    icon: "✅"
  },
  {
    num: 2,
    title: "Register as a Voter",
    desc: "Apply for Voter ID (EPIC) through Form 6 on the NVSP portal (nvsp.in) or the Voter Helpline App. You'll need proof of age, address, and a passport-size photo.",
    tip: "Track your application status online using the reference number provided.",
    icon: "📝"
  },
  {
    num: 3,
    title: "Get Your Voter ID (EPIC)",
    desc: "The Electors Photo Identity Card is your primary voting document. Collect it from your local ERO office or download the e-EPIC from the Voter Helpline App.",
    tip: "Lost your Voter ID? Apply for a duplicate through Form 002 on NVSP.",
    icon: "🪪"
  },
  {
    num: 4,
    title: "Find Your Polling Booth",
    desc: "Use the Voter Helpline App or the 'Know Your Polling Station' feature on ECI's website. Your booth is assigned based on your registered address.",
    tip: "Polling booth details are also printed on your voter slip, distributed before elections.",
    icon: "📍"
  },
  {
    num: 5,
    title: "Know Your Candidates",
    desc: "Review candidate affidavits on the ECI website. These include criminal records, assets, education, and other details. Study party manifestos and local issues.",
    tip: "Use the 'Know Your Candidate' app by ECI for complete affidavit details.",
    icon: "🔍"
  },
  {
    num: 6,
    title: "What to Carry on Polling Day",
    desc: "Carry your Voter ID (EPIC) or any of the 12 approved photo IDs: Aadhaar, PAN card, driving license, passport, bank passbook with photo, and others.",
    tip: "You do NOT need to carry your voter slip — it's for reference only.",
    icon: "📦"
  },
  {
    num: 7,
    title: "Cast Your Vote",
    desc: "At the booth: get your finger inked, receive a ballot slip, press the button next to your candidate on the EVM, and verify on the VVPAT paper slip (visible for 7 seconds).",
    tip: "NOTA (None of the Above) is always the last option on the EVM if you don't support any candidate.",
    icon: "🗳"
  }
];

export default function VoterGuideView() {
  return (
    <motion.div
      className="view-content"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="view-header">
        <h1 className="view-title">Voter Guide</h1>
        <p className="view-subtitle">Your complete step-by-step guide to voting in Indian elections — from eligibility to casting your ballot.</p>
      </div>

      <div className="guide-steps">
        {STEPS.map((step, i) => (
          <motion.div
            className="guide-card"
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: i * 0.06 }}
          >
            <div className="guide-num">{step.num}</div>
            <div className="guide-body">
              <div className="guide-title">
                <span className="guide-icon">{step.icon}</span>
                {step.title}
              </div>
              <p className="guide-desc">{step.desc}</p>
              <div className="guide-tip">
                <span className="guide-tip-label">💡 Tip:</span> {step.tip}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
