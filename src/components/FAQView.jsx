import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    q: "What is the minimum age to vote in India?",
    a: "You must be at least 18 years old on the qualifying date (January 1 of the year the electoral roll is revised). For example, if the roll is revised in 2026, you must be 18 by January 1, 2026."
  },
  {
    q: "How do I apply for a Voter ID card (EPIC)?",
    a: "You can apply online through the NVSP portal (nvsp.in) or the Voter Helpline App by filling Form 6. You'll need proof of age (birth certificate, marksheet, etc.), proof of address, and a passport-size photo. The process typically takes 2-4 weeks."
  },
  {
    q: "What is an EVM and how does it work?",
    a: "An Electronic Voting Machine (EVM) is a portable device used for voting. It has two units: the Control Unit (with the presiding officer) and the Ballot Unit (in the voting compartment). You press the blue button next to your chosen candidate's name and symbol. Each EVM can record up to 2,000 votes."
  },
  {
    q: "What is VVPAT?",
    a: "Voter Verifiable Paper Audit Trail (VVPAT) is a machine attached to the EVM that prints a paper slip showing the candidate's name, serial number, and symbol. The slip is visible for 7 seconds through a transparent window before it drops into a sealed box. This allows you to verify your vote was recorded correctly."
  },
  {
    q: "What is NOTA?",
    a: "NOTA stands for 'None of the Above.' It's the last option on every EVM ballot. If you don't wish to vote for any candidate, you can press NOTA. However, even if NOTA gets the highest votes, the candidate with the most votes among all candidates still wins."
  },
  {
    q: "What documents can I use as ID at the polling booth?",
    a: "While the Voter ID (EPIC) is the primary document, the ECI accepts 12 alternative photo IDs: Aadhaar card, PAN card, driving license, passport, bank/post office passbook with photo, MNREGA job card, health insurance smart card, pension document with photo, MP/MLA/MLC identity card, service identity card from government, and student ID cards from universities."
  },
  {
    q: "Can I vote if I've moved to a new address?",
    a: "Yes, but you need to update your registration. Fill Form 6 for a new registration at your new address, or Form 8A to update your address within the same constituency. You can do this through NVSP portal or the Voter Helpline App."
  },
  {
    q: "What is the Model Code of Conduct?",
    a: "The Model Code of Conduct (MCC) is a set of guidelines issued by the ECI for political parties and candidates during elections. It comes into effect from the date of election announcement and remains until results are declared. It covers conduct of parties, meetings, processions, polling day behavior, and government activities."
  },
  {
    q: "Can NRIs vote in Indian elections?",
    a: "Yes! NRIs can register as overseas electors under Section 20A of the Representation of the People Act. You need to fill Form 6A on the NVSP portal with your passport details. Currently, NRIs must be physically present at their polling booth to vote — proxy voting legislation is pending."
  },
  {
    q: "What happens if my name is not on the voter list?",
    a: "If your name is missing, you cannot vote in that election. However, you should immediately apply via Form 6 on NVSP for the next revision. During special revision drives, you can also approach your local BLO (Booth Level Officer) for assistance."
  }
];

export default function FAQView() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <motion.div
      className="view-content"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="view-header">
        <h1 className="view-title">Frequently Asked Questions</h1>
        <p className="view-subtitle">Common questions about Indian elections, voter registration, EVM voting, and your rights as a citizen.</p>
      </div>

      <div className="faq-list">
        {FAQS.map((faq, i) => (
          <motion.div
            className={`faq-item ${openIdx === i ? 'open' : ''}`}
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: i * 0.04 }}
          >
            <button
              className="faq-question"
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              aria-expanded={openIdx === i}
            >
              <span className="faq-q-text">{faq.q}</span>
              <span className="faq-chevron">{openIdx === i ? '−' : '+'}</span>
            </button>
            <AnimatePresence>
              {openIdx === i && (
                <motion.div
                  className="faq-answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p>{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
