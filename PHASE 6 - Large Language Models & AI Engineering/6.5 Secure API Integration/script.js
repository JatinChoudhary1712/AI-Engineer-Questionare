const topics = [
  {
    "title": "Never expose API keys to frontend",
    "questions": [
      [
        "Why must provider API keys stay out of frontend code?",
        "<p>Browser code and bundled environment variables can be inspected by users, exposing any embedded secret.</p><ul><li><strong>Boundary:</strong> Keep keys in a backend process that makes provider calls.</li><li><strong>Identity:</strong> Authenticate users with application credentials rather than distributing a shared provider secret.</li><li><strong>Response:</strong> If a key leaks, revoke it and investigate usage; deleting it from the latest bundle is insufficient.</li></ul><p><strong>Remember:</strong> Frontend build-time environment variables are not a secret store.</p>"
      ]
    ]
  },
  {
    "title": ".env locally, Secret Manager in production",
    "questions": [
      [
        "How should API secrets be stored across environments?",
        "<p>Use a local environment file for development and an access-controlled secret service in production.</p><ul><li><strong>Local:</strong> Ignore .env files in version control and publish only placeholder names in .env.example.</li><li><strong>Production:</strong> Give the runtime identity access only to the secrets it needs.</li><li><strong>Hygiene:</strong> Keep secrets out of logs, prompts, screenshots, client responses, and build artifacts.</li></ul><p><strong>Remember:</strong> A .env file is a convenience, not encryption or an authorization boundary.</p>"
      ]
    ]
  },
  {
    "title": "Backend proxy - frontend to your API to provider",
    "questions": [
      [
        "What must an LLM backend proxy enforce?",
        "<p>The backend authenticates the user, validates the request, and calls approved provider operations using server-side credentials.</p><ul><li><strong>Validation:</strong> Allowlist models and options, cap input/output size, and reject arbitrary upstream URLs.</li><li><strong>Authorization:</strong> Check access to uploaded files, conversation history, cached results, and tools.</li><li><strong>Response:</strong> Stream or return sanitized provider results without leaking secrets or internal errors.</li></ul><p><strong>Remember:</strong> A proxy that forwards any request with your key remains open to abuse.</p>"
      ]
    ]
  },
  {
    "title": "Per-user rate limiting with Redis",
    "questions": [
      [
        "How can Redis enforce per-user AI request limits?",
        "<p>Use shared atomic counters or a token bucket keyed by authenticated user and policy window.</p><ul><li><strong>Atomicity:</strong> Apply increment and expiry or token consumption in a transaction or script to avoid races.</li><li><strong>Budgets:</strong> Enforce requests, concurrency, and token or cost reservations where needed.</li><li><strong>Failures:</strong> Choose explicit behavior when Redis is unavailable and avoid silently allowing unlimited traffic.</li></ul><p><strong>Remember:</strong> Do not trust a client-supplied user ID as the rate-limit identity.</p>"
      ]
    ]
  },
  {
    "title": "API key rotation strategy",
    "questions": [
      [
        "How do you rotate an API key with minimal disruption?",
        "<p>Create a replacement credential, deploy its secret reference, verify traffic, then revoke the old credential.</p><ul><li><strong>Scope:</strong> Separate environments and services so each credential has a limited blast radius.</li><li><strong>Rollout:</strong> Refresh workers and long-running processes that may cache old secrets.</li><li><strong>Incident:</strong> Revoke a compromised key promptly and audit usage rather than waiting for routine rotation.</li></ul><p><strong>Remember:</strong> Verify old credentials are no longer in use before normal retirement.</p>"
      ]
    ]
  },
  {
    "title": "Logging and monitoring",
    "questions": [
      [
        "What should an AI API service log and alert on?",
        "<p>Monitor request outcomes and resource use without unnecessarily recording private prompts or credentials.</p><ul><li><strong>Metadata:</strong> Record request IDs, tenant/feature, model, prompt version, latency, usage, and categorized errors.</li><li><strong>Alerts:</strong> Watch error spikes, stalled streams, quota exhaustion, abnormal spend, and repeated authorization failures.</li><li><strong>Privacy:</strong> Redact secrets and personal data, restrict log access, and set retention rules.</li></ul><p><strong>Remember:</strong> Observability should help diagnose failures without becoming another sensitive-data leak.</p>"
      ]
    ]
  }
];

function escapeText(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const questions = document.querySelector('#questions');
const filters = document.querySelector('#filters');
const search = document.querySelector('#search');
let activeTopic = 'All topics';
let number = 0;
const entries = [];

for (const [index, topic] of topics.entries()) {
  const section = document.createElement('section');
  section.className = 'topic';
  const heading = document.createElement('h2');
  heading.id = `topic-${index}`;
  heading.innerHTML = `<span class="topic-number">${String(index + 1).padStart(2, '0')}</span>${escapeText(topic.title)}`;
  section.setAttribute('aria-labelledby', heading.id);
  section.append(heading);
  for (const [question, answer] of topic.questions) {
    const detail = document.createElement('details');
    number++;
    detail.innerHTML = `<summary><span class="q-number">${String(number).padStart(2, '0')}</span><span>${escapeText(question)}</span></summary><div class="answer">${answer}</div>`;
    section.append(detail);
    entries.push({ detail, section, topic: topic.title, text: `${topic.title} ${detail.textContent}`.toLowerCase() });
  }
  questions.append(section);
}

for (const title of ['All topics', ...topics.map(topic => topic.title)]) {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = title;
  button.setAttribute('aria-pressed', String(title === activeTopic));
  button.addEventListener('click', () => {
    activeTopic = title;
    for (const item of filters.children) item.setAttribute('aria-pressed', String(item === button));
    updateResults();
  });
  filters.append(button);
}

function updateResults() {
  const terms = search.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
  let visible = 0;
  for (const entry of entries) {
    entry.detail.hidden = !(activeTopic === 'All topics' || entry.topic === activeTopic) || !terms.every(term => entry.text.includes(term));
    if (!entry.detail.hidden) visible++;
  }
  for (const section of questions.children) {
    section.hidden = !entries.some(entry => entry.section === section && !entry.detail.hidden);
  }
  document.querySelector('#count').textContent = `${visible} of ${entries.length} questions`;
  document.querySelector('#empty').hidden = visible !== 0;
}

search.addEventListener('input', updateResults);
document.querySelector('#expand').addEventListener('click', () => {
  for (const { detail } of entries) if (!detail.hidden) detail.open = true;
});
document.querySelector('#collapse').addEventListener('click', () => {
  for (const { detail } of entries) if (!detail.hidden) detail.open = false;
});
updateResults();
