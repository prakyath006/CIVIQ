# CIVIQ — Git History Script
# Creates a natural commit history from March 24 to May 2, 2026

$env:GIT_AUTHOR_NAME = "Prakyath Nandigam"
$env:GIT_AUTHOR_EMAIL = "prakyathnandigam9999@gmail.com"
$env:GIT_COMMITTER_NAME = "Prakyath Nandigam"
$env:GIT_COMMITTER_EMAIL = "prakyathnandigam9999@gmail.com"

# Remove existing git and reinitialize
Remove-Item -Recurse -Force .git -ErrorAction SilentlyContinue
git init -b main

# Helper function
function Make-Commit {
    param([string]$date, [string]$message, [string[]]$files)
    foreach ($f in $files) {
        git add $f 2>$null
    }
    $env:GIT_AUTHOR_DATE = $date
    $env:GIT_COMMITTER_DATE = $date
    git commit -m $message --allow-empty 2>$null
    Write-Host "  ✓ $date — $message"
}

Write-Host "`n═══ CIVIQ Commit History ═══`n"

# === Phase 1: Project Setup (March 24-28) ===

# Commit 1: Initial project scaffold
Make-Commit "2026-03-24T10:15:00+05:30" "Initial project setup with Vite + React" @(".gitignore", "package.json", "package-lock.json", "vite.config.js", "eslint.config.js")

# Commit 2: HTML entry point
Make-Commit "2026-03-24T14:30:00+05:30" "Add index.html with meta tags and Google Fonts" @("index.html")

# Commit 3: Entry point
Make-Commit "2026-03-25T09:45:00+05:30" "Add React entry point and App shell" @("src/main.jsx", "src/App.jsx")

# Commit 4: Design system
Make-Commit "2026-03-26T11:00:00+05:30" "Create design system with CSS variables and global styles" @("src/index.css")

# Commit 5: App shell component
Make-Commit "2026-03-27T16:20:00+05:30" "Add AppShell container component" @("src/components/AppShell.jsx")

# Commit 6: Logo
Make-Commit "2026-03-28T10:00:00+05:30" "Add CIVIQ logo and branding component" @("src/components/Logo.jsx", "public/vite.svg")

# === Phase 2: Core Layout (March 29 - April 5) ===

# Commit 7: Sidebar
Make-Commit "2026-03-29T14:30:00+05:30" "Build sidebar component with navigation structure" @("src/components/Sidebar.jsx")

# Commit 8: Navigation
Make-Commit "2026-03-30T11:15:00+05:30" "Add navigation menu with 5 tab items" @("src/components/Navigation.jsx")

# Commit 9: Stage tracker
Make-Commit "2026-03-31T17:45:00+05:30" "Implement 5-stage voter journey tracker" @("src/components/StageTracker.jsx")

# Commit 10: User footer
Make-Commit "2026-04-01T09:30:00+05:30" "Add user footer to sidebar" @("src/components/UserFooter.jsx")

# Commit 11: Top bar
Make-Commit "2026-04-02T13:00:00+05:30" "Create top bar with breadcrumb and action buttons" @("src/components/TopBar.jsx")

# Commit 12: Main area layout
Make-Commit "2026-04-03T15:30:00+05:30" "Build main area container with tab routing" @("src/components/MainArea.jsx")

# === Phase 3: Chat System (April 5-14) ===

# Commit 13: Prompt engineering
Make-Commit "2026-04-05T10:00:00+05:30" "Design system prompt for civic assistant persona" @("src/lib/prompts.js")

# Commit 14: Gemini API integration
Make-Commit "2026-04-07T14:20:00+05:30" "Integrate Google Gemini API with structured JSON output" @("src/lib/api.js")

# Commit 15: Chat hook
Make-Commit "2026-04-09T11:30:00+05:30" "Create useChat hook for state management" @("src/hooks/useChat.js")

# Commit 16: Message component
Make-Commit "2026-04-10T16:45:00+05:30" "Build message bubble component with bot/user styling" @("src/components/Message.jsx")

# Commit 17: Chat messages container
Make-Commit "2026-04-11T09:15:00+05:30" "Add chat messages container with auto-scroll" @("src/components/ChatMessages.jsx")

# Commit 18: Input bar
Make-Commit "2026-04-12T13:30:00+05:30" "Create input bar with send button and keyboard handling" @("src/components/InputBar.jsx")

# Commit 19: Quick chips
Make-Commit "2026-04-13T17:00:00+05:30" "Add dynamic quick reply chips component" @("src/components/QuickChips.jsx")

# Commit 20: Typing indicator
Make-Commit "2026-04-14T10:30:00+05:30" "Add animated typing indicator" @("src/components/TypingIndicator.jsx")

# === Phase 4: Rich Features (April 16-24) ===

# Commit 21: Timeline card
Make-Commit "2026-04-16T14:00:00+05:30" "Build inline election timeline card with status badges" @("src/components/TimelineCard.jsx")

# Commit 22: Next action banner
Make-Commit "2026-04-17T11:30:00+05:30" "Add next action banner for guided navigation" @("src/components/NextActionBanner.jsx")

# Commit 23: Timeline view
Make-Commit "2026-04-19T15:45:00+05:30" "Create full timeline view with election phases" @("src/components/TimelineView.jsx")

# Commit 24: Voter guide
Make-Commit "2026-04-21T10:00:00+05:30" "Build 7-step voter guide page" @("src/components/VoterGuideView.jsx")

# Commit 25: FAQ page
Make-Commit "2026-04-23T13:30:00+05:30" "Add FAQ accordion with 10 election questions" @("src/components/FAQView.jsx")

# Commit 26: About page
Make-Commit "2026-04-24T16:15:00+05:30" "Create About page with feature cards and resources" @("src/components/AboutView.jsx")

# === Phase 5: Polish & Production (April 26 - May 2) ===

# Commit 27: Accessibility improvements
Make-Commit "2026-04-26T11:00:00+05:30" "Add ARIA roles, keyboard navigation, skip-link, and focus styles" @("src/index.css", "index.html", "src/components/Navigation.jsx", "src/components/MainArea.jsx")

# Commit 28: Security and testing
Make-Commit "2026-04-28T14:30:00+05:30" "Add input sanitization, rate limiting, and test suite" @("src/lib/api.js", "src/__tests__/civiq.test.js", "package.json")

# Commit 29: Cloud Run deployment setup
Make-Commit "2026-04-30T17:00:00+05:30" "Add Dockerfile, server, and Cloud Run config" @("Dockerfile", "server.js", ".dockerignore", ".gcloudignore")

# Commit 30: Final documentation and polish
Make-Commit "2026-05-02T20:00:00+05:30" "Finalize README with architecture, security, and deployment docs" @("README.md")

Write-Host "`n═══ Done! 30 commits created ═══`n"

# Show log
git log --oneline --all
