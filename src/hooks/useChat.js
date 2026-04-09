import { useState, useCallback } from 'react';
import { callGemini } from '../lib/api';
import { WELCOME_MESSAGE, INITIAL_CHIPS, INITIAL_QUICK_REPLIES } from '../lib/prompts';

export function useChat() {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [chips, setChips] = useState(INITIAL_CHIPS);
  const [quickReplies, setQuickReplies] = useState(INITIAL_QUICK_REPLIES);
  const [isTyping, setIsTyping] = useState(false);
  const [history, setHistory] = useState([]);
  const [stage, setStage] = useState(1);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || isTyping) return;

    const userMsg = {
      id: crypto.randomUUID(),
      role: 'user',
      text: text.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    const newHistory = [
      ...history,
      {
        role: 'user',
        content: `[User Stage: ${stage}] [Country: India]\n\n${text.trim()}`
      }
    ];

    try {
      const parsed = await callGemini(newHistory, stage);

      setStage(parsed.stage || stage);
      setChips(parsed.quick_replies || chips);
      setQuickReplies(parsed.quick_replies || quickReplies);

      const botMsg = {
        id: crypto.randomUUID(),
        role: 'bot',
        text: parsed.message,
        nextAction: parsed.next_action,
        timeline: parsed.timeline_items,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
      setHistory([
        ...newHistory,
        { role: 'assistant', content: JSON.stringify(parsed) }
      ]);
    } catch (error) {
      console.error('CIVIQ API Error:', error);
      let errorText = "I encountered an issue. Please try again.";
      if (error.message?.startsWith('QUOTA')) {
        errorText = "The Gemini API quota has been temporarily exceeded. Please wait about a minute and try again, or update your API key in the .env.local file with a key from a different Google Cloud project.";
      } else if (error.message?.startsWith('NO_KEY')) {
        errorText = "No API key configured. Please add your Gemini API key to the .env.local file as VITE_GEMINI_API_KEY.";
      }
      const errorMsg = {
        id: crypto.randomUUID(),
        role: 'bot',
        text: errorText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  }, [history, stage, isTyping, chips, quickReplies]);

  const resetChat = useCallback(() => {
    setMessages([WELCOME_MESSAGE]);
    setChips(INITIAL_CHIPS);
    setQuickReplies(INITIAL_QUICK_REPLIES);
    setHistory([]);
    setStage(1);
    setIsTyping(false);
  }, []);

  return { messages, chips, quickReplies, isTyping, stage, sendMessage, resetChat };
}
