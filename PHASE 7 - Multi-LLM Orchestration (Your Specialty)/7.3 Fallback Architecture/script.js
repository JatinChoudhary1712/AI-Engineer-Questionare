const topics = [
  {
    "title": "Fallback Architecture",
    "questions": [
      [
        "How should a cascading fallback architecture decide what to try next?",
        "<p>Try a bounded ordered list of compatible, authorized alternatives for errors that justify failover.</p><ul><li><strong>Classification:</strong> Distinguish transient service failures from invalid input, authentication errors, and policy rejections.</li><li><strong>Budget:</strong> Stop when attempts, cost, or remaining time reach a defined limit.</li><li><strong>Results:</strong> Validate each response and label stale cached content or service-unavailable output honestly.</li></ul><p><strong>Remember:</strong> A fallback chain should preserve the task contract and never replay completed side effects blindly.</p><p class=\"example\"><strong>Example:</strong> If the primary times out, use a permitted fallback only when enough deadline and budget remain. A cached response is eligible only if it matches the tenant, task, and freshness policy.</p><p><strong>Roadmap example:</strong> Named models illustrate the supplied architecture; configure supported model IDs and evaluate them for your task.</p><pre><code>Primary:   GPT-4o           (preferred, best quality)\n    ↓ fail\nSecondary: Claude 3.5 Sonnet (similar quality)\n    ↓ fail\nTertiary:  GPT-3.5 Turbo    (cheaper, still capable)\n    ↓ fail\nCache:     Last known response (stale but something)\n    ↓ miss\nDefault:   Static template response</code></pre>"
      ]
    ]
  },
  {
    "title": "Track failure rate per provider",
    "questions": [
      [
        "What failure information should a provider circuit breaker track?",
        "<p>Track dependency failures within a defined observation window for the relevant model endpoint or failure domain.</p><ul><li><strong>Signals:</strong> Record timeouts and selected service errors with enough context to diagnose the cause.</li><li><strong>Exclusions:</strong> User input errors and permission denials should not generally count as provider outages.</li><li><strong>Scope:</strong> Keep routing and breaker state consistent across workers where a shared view is needed.</li></ul><p><strong>Remember:</strong> An error counter is useful only when it measures the failure you intend to isolate.</p>"
      ]
    ]
  },
  {
    "title": "Open circuit after N failures in M seconds",
    "questions": [
      [
        "When should a circuit breaker open?",
        "<p>Open the circuit when a configured failure condition shows that further calls are likely to waste time or capacity.</p><ul><li><strong>Threshold:</strong> Use a minimum sample count and a rate or count over a time window appropriate to the workload.</li><li><strong>Behavior:</strong> Fail fast or route to an eligible alternative while the circuit is open.</li><li><strong>Cooldown:</strong> Wait for a defined interval before permitting recovery probes.</li></ul><p><strong>Remember:</strong> N failures in M seconds is a policy example, not a universally correct threshold.</p>"
      ]
    ]
  },
  {
    "title": "Half-open state - test with single request",
    "questions": [
      [
        "What should happen in a half-open circuit state?",
        "<p>Permit a small controlled number of probe requests to test whether the dependency has recovered.</p><ul><li><strong>Concurrency:</strong> Use shared coordination so many workers do not all send recovery probes at once.</li><li><strong>Success:</strong> Require the configured recovery evidence before allowing normal traffic.</li><li><strong>Failure:</strong> Reopen the circuit and extend or restart the cooldown when probes fail.</li></ul><p><strong>Remember:</strong> Half-open means cautious recovery, not an immediate return to full load.</p>"
      ]
    ]
  },
  {
    "title": "Close circuit on success",
    "questions": [
      [
        "When is it safe to close a recovering circuit?",
        "<p>Close it after the recovery policy's required successful probes, then monitor the return to normal traffic.</p><ul><li><strong>Criteria:</strong> Define what counts as a healthy result, including valid completion within a deadline.</li><li><strong>Ramp-up:</strong> Increase traffic gradually when a sudden full load could recreate the outage.</li><li><strong>Monitoring:</strong> Continue tracking latency and error rates after closing.</li></ul><p><strong>Remember:</strong> One successful request is sufficient only if that is the explicitly chosen recovery policy.</p>"
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
