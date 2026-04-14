export default function TypingIndicator() {
  return (
    <div className="typing-indicator" aria-label="CIVIQ is typing" role="status">
      <div className="msg-avatar bot" aria-hidden="true">🗳</div>
      <div className="typing-dots">
        <div className="typing-dot" />
        <div className="typing-dot" />
        <div className="typing-dot" />
      </div>
    </div>
  );
}
