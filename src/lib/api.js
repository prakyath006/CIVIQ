import { SYSTEM_PROMPT } from './prompts';

/**
 * Gemini API Integration Layer
 * Uses Google Cloud's Generative Language API with automatic model fallback.
 * Implements input sanitization, rate limiting, and structured JSON responses.
 */

// Google Gemini models — ordered by speed (fastest first)
const MODELS = [
  'gemini-3.1-flash-lite-preview',
  'gemini-3-flash-preview',
  'gemini-2.5-flash',
];

// Simple rate limiter: max 5 requests per 60 seconds
const rateLimiter = {
  timestamps: [],
  MAX_REQUESTS: 5,
  WINDOW_MS: 60000,

  canProceed() {
    const now = Date.now();
    this.timestamps = this.timestamps.filter(t => now - t < this.WINDOW_MS);
    if (this.timestamps.length >= this.MAX_REQUESTS) return false;
    this.timestamps.push(now);
    return true;
  }
};

/**
 * Sanitize user input to prevent prompt injection and XSS
 * @param {string} text - Raw user input
 * @returns {string} Sanitized text
 */
function sanitizeInput(text) {
  if (typeof text !== 'string') return '';
  return text
    .trim()
    .slice(0, 2000) // Max 2000 chars
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Strip scripts
    .replace(/[<>]/g, c => c === '<' ? '&lt;' : '&gt;'); // Escape HTML
}

/**
 * Attempt to call a specific Gemini model
 * @param {string} model - Model identifier
 * @param {Array} contents - Formatted message history
 * @param {string} apiKey - Google API key
 * @returns {Promise<Object>} Raw API response
 */
async function tryModel(model, contents, apiKey) {
  const payload = {
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1024,
      responseMimeType: "application/json"
    }
  };

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000); // 30s timeout

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`${model} → ${response.status}: ${errText.slice(0, 150)}`);
    }

    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Parse raw model output into structured JSON
 * Handles markdown code fences and validates shape
 * @param {string} raw - Raw text from model
 * @returns {Object} Parsed response object
 */
function parseResponse(raw) {
  let cleaned = raw.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
  }

  const parsed = JSON.parse(cleaned);

  // Validate required fields with defaults
  return {
    message: parsed.message || "I'm here to help with your election questions.",
    stage: typeof parsed.stage === 'number' ? parsed.stage : undefined,
    quick_replies: Array.isArray(parsed.quick_replies) ? parsed.quick_replies : undefined,
    next_action: typeof parsed.next_action === 'string' ? parsed.next_action : undefined,
    timeline_items: Array.isArray(parsed.timeline_items) ? parsed.timeline_items : undefined,
  };
}

/**
 * Main API entry point — calls Google Gemini with automatic model fallback
 * @param {Array} messages - Chat history in {role, content} format
 * @param {number} currentStage - Current voter journey stage (1-5)
 * @returns {Promise<Object>} Structured response with message, stage, chips, etc.
 */
export async function callGemini(messages, currentStage) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey || apiKey === 'your_key_here') {
    throw new Error('NO_KEY');
  }

  // Rate limiting check
  if (!rateLimiter.canProceed()) {
    throw new Error('RATE_LIMIT: Too many requests. Please wait a moment.');
  }

  // Sanitize and format messages for Gemini
  const contents = messages.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: sanitizeInput(msg.content) }]
  }));

  // Try each model in order until one succeeds
  let lastError;
  for (const model of MODELS) {
    try {
      console.log(`CIVIQ: Trying ${model}...`);
      const data = await tryModel(model, contents, apiKey);

      if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error('Empty response');
      }

      const parsed = parseResponse(data.candidates[0].content.parts[0].text);
      console.log(`CIVIQ: ✓ ${model}`);
      return parsed;
    } catch (err) {
      console.warn(`CIVIQ: ✗ ${model}:`, err.message?.slice(0, 100));
      lastError = err;
    }
  }

  throw new Error('QUOTA: All models failed. ' + (lastError?.message || ''));
}
