const topics = [
  {
    "title": "Task-Based Routing",
    "questions": [
      [
        "How do you implement task-based routing from the roadmap's model map?",
        "<p>Classify the required capability, filter eligible models, and select a tested candidate for that category.</p><ul><li><strong>Categories:</strong> Separate extraction, reasoning, code, multimodal requests, and embeddings where their contracts differ.</li><li><strong>Configuration:</strong> Store available model IDs and capabilities in a registry instead of hard-coding the historical diagram.</li><li><strong>Validation:</strong> Evaluate the classifier and final answer together because a routing mistake can send work to an unsuitable model.</li></ul><p><strong>Remember:</strong> The diagram teaches a policy pattern rather than a current model recommendation.</p><pre><code class=\"language-python\"># Offline policy example; model IDs come from your capability registry.\ndef eligible_models(models, request):\n    return [m for m in models\n            if m[&quot;provider&quot;] in request[&quot;allowed_providers&quot;]\n            and request[&quot;task&quot;] in m[&quot;tasks&quot;]\n            and m[&quot;context_limit&quot;] &gt;= request[&quot;required_tokens&quot;]]\n\ndef route(models, request):\n    eligible = eligible_models(models, request)\n    if not eligible:\n        raise ValueError(&quot;No permitted model satisfies the request&quot;)\n    # Demonstration only: production scoring also evaluates latency and quality.\n    return min(eligible, key=lambda m: m[&quot;estimated_cost&quot;])</code></pre><p><strong>Roadmap example:</strong> Named models illustrate the supplied architecture; configure supported model IDs and evaluate them for your task.</p><pre><code>Simple query   → Mistral 7B / GPT-3.5    (cheap, fast)\nReasoning      → GPT-4 / Claude 3 Opus   (expensive, accurate)\nLong context   → Claude 3.5 Sonnet       (200K context)\nCode           → GPT-4 / CodeLlama       (specialized)\nMultimodal     → Gemini Pro / GPT-4V     (vision)\nEmbeddings     → text-embedding-3-small  (cost-effective)\nFast inference → Groq (LLaMA 3)          (ultra-low latency)</code></pre>"
      ]
    ]
  },
  {
    "title": "User tier check: free → cheap models, premium → GPT-4",
    "questions": [
      [
        "How should free and premium user tiers change model access?",
        "<p>Map an authenticated subscription tier to explicit model, quota, and feature entitlements.</p><ul><li><strong>Enforcement:</strong> Read the tier from trusted backend state rather than a client-supplied field.</li><li><strong>Quality:</strong> Define a minimum acceptable result for every tier and avoid silently promising unavailable capabilities.</li><li><strong>Budget:</strong> Limit concurrency and usage as well as the set of permitted models.</li></ul><p><strong>Remember:</strong> Subscription routing is an authorization and product-policy decision.</p>"
      ]
    ]
  },
  {
    "title": "Token budget monitoring",
    "questions": [
      [
        "How do you monitor token budgets before and after a request?",
        "<p>Reserve estimated capacity before dispatch and reconcile it with reported usage after completion.</p><ul><li><strong>Estimate:</strong> Count the input and reserve an appropriate output allowance for the selected model.</li><li><strong>Atomicity:</strong> Prevent concurrent requests from all spending the same remaining allowance.</li><li><strong>Reconcile:</strong> Record actual usage, release unused reservations, and handle failed or interrupted calls conservatively.</li></ul><p><strong>Remember:</strong> Post-request logging alone cannot prevent a burst from overspending a budget.</p>"
      ]
    ]
  },
  {
    "title": "Dynamic routing based on monthly spend",
    "questions": [
      [
        "How should monthly spend change a routing policy?",
        "<p>Use a versioned budget policy to adjust allowed spending without violating the task's minimum requirements.</p><ul><li><strong>Thresholds:</strong> Define soft limits for cheaper routing and hard limits for rejecting or deferring work.</li><li><strong>Signals:</strong> Include outstanding reservations and delayed usage reports when calculating remaining capacity.</li><li><strong>Transparency:</strong> Return a clear limit or reduced-service response when no eligible model fits the budget.</li></ul><p><strong>Remember:</strong> A cheaper model should not be substituted when it cannot satisfy the required contract.</p>"
      ]
    ]
  },
  {
    "title": "Cache hit rate optimization",
    "questions": [
      [
        "How can cache hit rate inform cost-based routing?",
        "<p>Reusing an authorized valid result can avoid generation, but the cache must fit the request's semantics and freshness needs.</p><ul><li><strong>Lookup:</strong> Check a tenant-scoped cache before paying for task classification or model calls when practical.</li><li><strong>Identity:</strong> Include prompt version, model settings, output schema, and relevant source versions in exact-match keys.</li><li><strong>Evaluation:</strong> Track avoided cost alongside stale answers, incorrect matches, and user-visible quality.</li></ul><p><strong>Remember:</strong> A high hit rate is harmful if the returned answers are wrong or unauthorized.</p>"
      ]
    ]
  },
  {
    "title": "Track response quality per model per task type",
    "questions": [
      [
        "How should response quality be tracked per model and task?",
        "<p>Record task-specific evaluation outcomes with the exact model and configuration used.</p><ul><li><strong>Metrics:</strong> Use schema validity, factual support, task accuracy, or execution results as appropriate.</li><li><strong>Segmentation:</strong> Compare models within task type, language, document size, and other meaningful workload groups.</li><li><strong>Drift:</strong> Re-evaluate when prompts, data, model versions, or serving settings change.</li></ul><p><strong>Remember:</strong> A single average score can hide serious failures on important request types.</p>"
      ]
    ]
  },
  {
    "title": "A/B testing models in production",
    "questions": [
      [
        "How do you A/B test model-routing choices in production?",
        "<p>Assign eligible traffic to controlled variants and compare predefined outcomes.</p><ul><li><strong>Assignment:</strong> Randomize consistently by user or task while preserving tenant restrictions.</li><li><strong>Measurement:</strong> Track quality, latency, cost, failure rate, and fallback use over comparable samples.</li><li><strong>Rollout:</strong> Start with limited exposure, define rollback thresholds, and avoid using the same evaluation data to tune and judge the policy.</li></ul><p><strong>Remember:</strong> Changing several routing variables together makes causal conclusions harder.</p>"
      ]
    ]
  },
  {
    "title": "Feedback loop - user ratings inform routing",
    "questions": [
      [
        "How can user ratings improve a router safely?",
        "<p>Treat ratings as noisy feedback that complements objective evaluation rather than replacing it.</p><ul><li><strong>Attribution:</strong> Attach feedback to the model, prompt version, route, and task outcome.</li><li><strong>Bias:</strong> Correct for sparse feedback, abusive ratings, and the tendency of unhappy users to respond more often.</li><li><strong>Updates:</strong> Test policy changes offline and roll them out gradually instead of updating routes after every vote.</li></ul><p><strong>Remember:</strong> Users can like a confident answer that is still incorrect.</p>"
      ]
    ]
  },
  {
    "title": "Latency SLA enforcement",
    "questions": [
      [
        "How should a router enforce a latency SLA?",
        "<p>Give the workflow an overall deadline and allocate its remaining time across routing, providers, validation, and fallbacks.</p><ul><li><strong>Percentiles:</strong> Monitor tail latency for each route rather than only an average.</li><li><strong>Scheduling:</strong> Reject, queue, or choose another eligible route before the remaining deadline becomes impossible.</li><li><strong>Cancellation:</strong> Stop upstream work when the caller cancels or the workflow deadline expires.</li></ul><p><strong>Remember:</strong> Separate timeouts on several calls do not automatically enforce one end-to-end deadline.</p>"
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
