import { useState } from 'react';

export default function InputBar({ onSend, disabled }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    onSend(text);
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="input-bar" onSubmit={handleSubmit}>
      <div className="input-icon" aria-hidden="true">🏛</div>
      <input
        id="chat-input"
        className="chat-input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about Indian elections..."
        disabled={disabled}
        autoComplete="off"
        aria-label="Type your message"
      />
      <button
        type="submit"
        className="send-btn"
        disabled={disabled || !text.trim()}
        aria-label="Send message"
        title="Send"
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      </button>
    </form>
  );
}
