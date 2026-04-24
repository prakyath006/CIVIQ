import { motion } from 'framer-motion';

export default function AboutView() {
  return (
    <motion.div
      className="view-content"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="view-header">
        <h1 className="view-title">About CIVIQ</h1>
        <p className="view-subtitle">Democracy, Demystified.</p>
      </div>

      <div className="about-section">
        <div className="about-card">
          <div className="about-card-icon">🗳</div>
          <h2 className="about-card-title">What is CIVIQ?</h2>
          <p className="about-card-text">
            CIVIQ is an AI-powered Civic Journey Engine designed to guide Indian citizens through the complete election process. Unlike a simple chatbot, CIVIQ detects where you are in your voter journey and guides you step-by-step through five stages — from awareness to casting your ballot.
          </p>
        </div>

        <div className="about-card">
          <div className="about-card-icon">🤖</div>
          <h2 className="about-card-title">Powered by Google Gemini</h2>
          <p className="about-card-text">
            CIVIQ uses Google's Gemini 2.0 Flash AI to understand your questions and provide accurate, contextual guidance about Indian elections. Every response is structured to update your journey tracker and provide actionable next steps.
          </p>
        </div>

        <div className="about-card">
          <div className="about-card-icon">⚖️</div>
          <h2 className="about-card-title">Politically Neutral</h2>
          <p className="about-card-text">
            CIVIQ is completely non-partisan. We never endorse candidates or political parties. Our mission is to empower every citizen with knowledge about the democratic process, their rights, and how to exercise their vote.
          </p>
        </div>

        <div className="about-card">
          <div className="about-card-icon">🇮🇳</div>
          <h2 className="about-card-title">Built for India</h2>
          <p className="about-card-text">
            CIVIQ covers Lok Sabha, Vidhan Sabha, and local body elections. We reference the Election Commission of India (ECI), NVSP portal, Voter Helpline App, EVM/VVPAT technology, and all relevant Indian electoral laws and procedures.
          </p>
        </div>
      </div>

      <div className="about-links">
        <h3 className="about-links-title">Useful Resources</h3>
        <div className="about-link-grid">
          <a href="https://www.eci.gov.in" target="_blank" rel="noopener noreferrer" className="about-link">
            <span className="about-link-icon">🏛</span>
            <span>Election Commission of India</span>
            <span className="about-link-arrow">↗</span>
          </a>
          <a href="https://www.nvsp.in" target="_blank" rel="noopener noreferrer" className="about-link">
            <span className="about-link-icon">📋</span>
            <span>NVSP Portal</span>
            <span className="about-link-arrow">↗</span>
          </a>
          <a href="https://voters.eci.gov.in" target="_blank" rel="noopener noreferrer" className="about-link">
            <span className="about-link-icon">🗳</span>
            <span>Voter Services</span>
            <span className="about-link-arrow">↗</span>
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.eci.citizen" target="_blank" rel="noopener noreferrer" className="about-link">
            <span className="about-link-icon">📱</span>
            <span>Voter Helpline App</span>
            <span className="about-link-arrow">↗</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
