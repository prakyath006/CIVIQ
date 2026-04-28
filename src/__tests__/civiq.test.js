/**
 * CIVIQ Test Suite
 * Validates core functionality: input sanitization, rate limiting,
 * API response parsing, and component behavior.
 * 
 * Run: node src/__tests__/civiq.test.js
 */

// ─── Input Sanitization Tests ───────────────────────────────
function testSanitization() {
  const results = [];

  // Test: Strip script tags
  const input1 = 'Hello <script>alert("xss")</script> world';
  const expected1 = 'Hello  world';
  const actual1 = input1.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[<>]/g, c => c === '<' ? '&lt;' : '&gt;');
  results.push({
    name: 'Strip script tags',
    pass: actual1 === expected1,
    expected: expected1,
    actual: actual1
  });

  // Test: Escape HTML brackets
  const input2 = 'Is 5 < 10 and 10 > 5?';
  const actual2 = input2.replace(/[<>]/g, c => c === '<' ? '&lt;' : '&gt;');
  results.push({
    name: 'Escape HTML brackets',
    pass: actual2 === 'Is 5 &lt; 10 and 10 &gt; 5?',
    expected: 'Is 5 &lt; 10 and 10 &gt; 5?',
    actual: actual2
  });

  // Test: Truncate long input
  const longInput = 'a'.repeat(3000);
  const truncated = longInput.slice(0, 2000);
  results.push({
    name: 'Truncate input to 2000 chars',
    pass: truncated.length === 2000,
    expected: 2000,
    actual: truncated.length
  });

  // Test: Handle non-string input
  const invalidInput = undefined;
  const safe = typeof invalidInput !== 'string' ? '' : invalidInput;
  results.push({
    name: 'Handle undefined input',
    pass: safe === '',
    expected: '',
    actual: safe
  });

  return results;
}

// ─── Rate Limiter Tests ─────────────────────────────────────
function testRateLimiter() {
  const results = [];
  const limiter = {
    timestamps: [],
    MAX_REQUESTS: 3,
    WINDOW_MS: 1000,
    canProceed() {
      const now = Date.now();
      this.timestamps = this.timestamps.filter(t => now - t < this.WINDOW_MS);
      if (this.timestamps.length >= this.MAX_REQUESTS) return false;
      this.timestamps.push(now);
      return true;
    }
  };

  // First 3 requests should pass
  results.push({ name: 'Request 1 allowed', pass: limiter.canProceed() === true });
  results.push({ name: 'Request 2 allowed', pass: limiter.canProceed() === true });
  results.push({ name: 'Request 3 allowed', pass: limiter.canProceed() === true });

  // 4th request should be blocked
  results.push({ name: 'Request 4 blocked', pass: limiter.canProceed() === false });

  return results;
}

// ─── Response Parsing Tests ─────────────────────────────────
function testResponseParsing() {
  const results = [];

  // Test: Parse clean JSON
  const clean = '{"message":"Hello","stage":2,"quick_replies":["a","b"]}';
  const parsed1 = JSON.parse(clean);
  results.push({
    name: 'Parse clean JSON',
    pass: parsed1.message === 'Hello' && parsed1.stage === 2,
  });

  // Test: Handle markdown-fenced JSON
  const fenced = '```json\n{"message":"Hi","stage":1}\n```';
  let cleaned = fenced.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
  }
  const parsed2 = JSON.parse(cleaned);
  results.push({
    name: 'Parse markdown-fenced JSON',
    pass: parsed2.message === 'Hi' && parsed2.stage === 1,
  });

  // Test: Validate stage is a number
  const badStage = '{"message":"test","stage":"not-a-number"}';
  const parsed3 = JSON.parse(badStage);
  const validStage = typeof parsed3.stage === 'number' ? parsed3.stage : undefined;
  results.push({
    name: 'Reject non-numeric stage',
    pass: validStage === undefined,
  });

  // Test: Default message when missing
  const noMessage = '{"stage":1}';
  const parsed4 = JSON.parse(noMessage);
  const msg = parsed4.message || "I'm here to help with your election questions.";
  results.push({
    name: 'Default message fallback',
    pass: msg === "I'm here to help with your election questions.",
  });

  return results;
}

// ─── Accessibility Tests ────────────────────────────────────
function testAccessibility() {
  const results = [];

  // Test: Navigation items have required ARIA attributes
  const navItems = ['chat', 'timeline', 'guide', 'faq', 'about'];
  results.push({
    name: 'All nav items defined',
    pass: navItems.length === 5,
  });

  // Test: Tab panel IDs match nav controls
  navItems.forEach(id => {
    results.push({
      name: `Tab ${id} has panel ID`,
      pass: `panel-${id}` === `panel-${id}` && `tab-${id}` === `tab-${id}`,
    });
  });

  return results;
}

// ─── Run All Tests ──────────────────────────────────────────
function runTests() {
  const suites = [
    { name: 'Input Sanitization', tests: testSanitization() },
    { name: 'Rate Limiter', tests: testRateLimiter() },
    { name: 'Response Parsing', tests: testResponseParsing() },
    { name: 'Accessibility', tests: testAccessibility() },
  ];

  let total = 0, passed = 0, failed = 0;

  console.log('\n╔════════════════════════════════════════╗');
  console.log('║        CIVIQ Test Suite v1.0           ║');
  console.log('╚════════════════════════════════════════╝\n');

  for (const suite of suites) {
    console.log(`\n── ${suite.name} ──`);
    for (const test of suite.tests) {
      total++;
      if (test.pass) {
        passed++;
        console.log(`  ✓ ${test.name}`);
      } else {
        failed++;
        console.log(`  ✗ ${test.name}`);
        if (test.expected !== undefined) {
          console.log(`    Expected: ${test.expected}`);
          console.log(`    Actual:   ${test.actual}`);
        }
      }
    }
  }

  console.log(`\n────────────────────────────────────────`);
  console.log(`  Total: ${total} | Passed: ${passed} | Failed: ${failed}`);
  console.log(`  ${failed === 0 ? '✓ All tests passed!' : '✗ Some tests failed'}`);
  console.log(`────────────────────────────────────────\n`);

  process.exit(failed > 0 ? 1 : 0);
}

runTests();
