import { useState } from 'react';

export default function TopBar({ tabLabel, onNewChat, onMenuClick, showNewChat }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    const shareData = {
      title: 'CIVIQ — Democracy, Demystified',
      text: 'Check out CIVIQ — an AI-powered civic guide for Indian elections!',
      url
    };

    try {
      // Use Web Share API if available (mobile/supported browsers)
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy URL to clipboard
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      // User cancelled share or clipboard failed
      console.log('Share cancelled');
    }
  };

  return (
    <div className="top-bar">
      <button className="hamburger-btn" onClick={onMenuClick} aria-label="Open menu">
        ☰
      </button>
      <span className="top-bar-breadcrumb">
        CIVIQ <span className="sep">›</span> {tabLabel || 'Chat'}
      </span>
      <span className="top-bar-topic">Election Guide</span>
      <div className="top-bar-actions">
        {showNewChat && (
          <>
            <button
              className="btn-share"
              onClick={handleShare}
              aria-label="Share this page"
              title="Share CIVIQ"
            >
              {copied ? '✓ Copied!' : 'Share'}
            </button>
            <button className="btn-new-chat" onClick={onNewChat}>New Chat</button>
          </>
        )}
      </div>
    </div>
  );
}
