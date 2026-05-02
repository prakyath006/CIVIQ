# CIVIQ — Democracy, Demystified 🗳

An AI-powered **Civic Journey Engine** that guides Indian citizens through the election process step-by-step. Built for the PromptWars Hackathon.

**🔴 Live Demo:** [https://civiq-704569764751.asia-south1.run.app](https://civiq-704569764751.asia-south1.run.app)

## 🌟 What Makes CIVIQ Different

CIVIQ is not a generic chatbot. It detects where a user is in their **voter journey** across 5 stages and guides them forward:

| Stage | Focus |
|-------|-------|
| 1. Awareness | Understanding Indian democracy & elections |
| 2. Registration | Getting Voter ID (EPIC) & electoral roll enrollment |
| 3. Research | Studying parties, candidates & manifestos |
| 4. Preparation | Polling booth, documents & voting process |
| 5. Voting Day | Casting your vote via EVM & VVPAT |

The AI response drives **live UI state changes** — the sidebar stage tracker updates in real-time as you chat. Each response includes structured timeline data and contextual next actions.

## 🏗 Architecture

### Three-Layer Prompt System
1. **System Prompt** — Full civic persona with Indian election knowledge (ECI, NVSP, EVM, VVPAT, NOTA)
2. **Context Payload** — User's current stage and location injected per request
3. **Structured JSON Response** — Every AI response returns `stage`, `message`, `next_action`, `timeline_items`, and `quick_replies` driving the entire UI

### Google Services Integration
- **Google Gemini API** — Primary AI engine via Generative Language API with `responseMimeType: "application/json"` for structured output and automatic multi-model fallback (gemini-3.1-flash-lite → gemini-3-flash → gemini-2.5-flash)
- **Google Cloud Agent Platform** — API key authentication and model management
- **Google Fonts** — Playfair Display + DM Sans + DM Mono for editorial civic typography

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set your Gemini API key
# Edit .env.local and add: VITE_GEMINI_API_KEY=your_key

# Start development server
npm run dev

# Run tests
npm test
```

Get a Gemini API key from [Google Cloud Agent Platform](https://console.cloud.google.com) → API Keys.

## 🔐 Security

- **Input Sanitization** — All user input is stripped of script tags, HTML-escaped, and truncated to 2000 characters to prevent XSS and prompt injection
- **Rate Limiting** — Client-side rate limiter (5 requests per 60 seconds) protects against abuse and quota exhaustion
- **Request Timeouts** — 30-second AbortController timeout on all API calls prevents hanging connections
- **API Key Isolation** — Keys stored in `.env.local` (gitignored), never exposed in client bundle
- **Response Validation** — All AI responses are validated for expected shape (type-checked stage, array-checked quick_replies) before rendering

## ✅ Testing

Run the test suite with `npm test`:

```
╔════════════════════════════════════════╗
║        CIVIQ Test Suite v1.0           ║
╚════════════════════════════════════════╝

── Input Sanitization ──
  ✓ Strip script tags
  ✓ Escape HTML brackets
  ✓ Truncate input to 2000 chars
  ✓ Handle undefined input

── Rate Limiter ──
  ✓ Request 1-3 allowed
  ✓ Request 4 blocked (rate limited)

── Response Parsing ──
  ✓ Parse clean JSON
  ✓ Parse markdown-fenced JSON
  ✓ Reject non-numeric stage
  ✓ Default message fallback

── Accessibility ──
  ✓ All nav items defined
  ✓ Tab/panel ID linkage

Total: 18 | Passed: 18 | Failed: 0
```

Tests cover: input sanitization, rate limiting, response parsing edge cases, and accessibility contract validation.

## ♿ Accessibility

- **Skip-to-content link** — Hidden link (visible on Tab) for keyboard users to bypass navigation
- **ARIA roles** — `tablist/tab` on navigation, `tabpanel` on views, `role="log"` on chat with `aria-live="polite"`
- **Keyboard navigation** — All nav items focusable with Enter/Space activation, Tab key traversal
- **Focus indicators** — Gold `focus-visible` outline on all interactive elements
- **Screen reader support** — `aria-label` on inputs, buttons, regions; `aria-selected` on active tabs; `aria-hidden` on decorative icons
- **Semantic HTML** — `<main>`, `<nav>`, `<form>` elements with proper hierarchy; single `<h1>` per view
- **High contrast** — WCAG AA compliant text contrast on all backgrounds
- **`.sr-only` utility** — Available for screen-reader-only content

## 📁 Project Structure

```
src/
  __tests__/
    civiq.test.js    # Test suite (sanitization, rate limiter, parsing, a11y)
  components/        # 19 focused React components
    AppShell.jsx     # Rounded card container
    Sidebar.jsx      # Navy sidebar with overlays
    Logo.jsx         # CIVIQ branding
    Navigation.jsx   # 5 nav items with ARIA tablist
    StageTracker.jsx # Live 5-stage journey tracker ⭐
    UserFooter.jsx   # User profile footer
    MainArea.jsx     # Semantic <main> with tabpanel routing
    TopBar.jsx       # Breadcrumb & actions
    QuickChips.jsx   # Dynamic contextual chips
    ChatMessages.jsx # Scrollable message list (role="log")
    Message.jsx      # Bot/user message bubbles
    TimelineCard.jsx # Inline election timeline
    TimelineView.jsx # Full timeline page
    VoterGuideView   # 7-step voting guide
    FAQView.jsx      # Expandable FAQ accordion
    AboutView.jsx    # About page with resource links
    NextActionBanner # Action strip
    TypingIndicator  # Bouncing dots
    InputBar.jsx     # Text input + send
  hooks/
    useChat.js       # Chat state & API management
  lib/
    api.js           # Gemini API integration (sanitization, rate limiting, fallback)
    prompts.js       # System prompt & constants
  App.jsx            # Root component with tab state management
  main.jsx           # Entry point
  index.css          # Complete design system (900+ lines)
```

## 🎨 Design System

- **Colors:** Navy (#07111f) + Gold (#f5c842) — presidential, distinct
- **Typography:** Playfair Display (headings) + DM Sans (body) + DM Mono (dates)
- **Layout:** Single rounded card (980px max) with 2-column grid
- **Animations:** Framer Motion for message reveals, stage transitions, view changes
- **Responsive:** Sidebar overlay on mobile with hamburger toggle

## 🛠 Tech Stack

- **React 19 + Vite 8** — Fast build, HMR development
- **Framer Motion** — Smooth animations & view transitions
- **Google Gemini API** — AI engine with structured JSON output via Generative Language API
- **Google Cloud Agent Platform** — API key management and model access
- **Google Fonts** — Premium typography (Playfair Display, DM Sans, DM Mono)
- **Vanilla CSS** — Custom design system with CSS variables (no dependencies)

## 📝 License

Built for PromptWars Hackathon 2026.
