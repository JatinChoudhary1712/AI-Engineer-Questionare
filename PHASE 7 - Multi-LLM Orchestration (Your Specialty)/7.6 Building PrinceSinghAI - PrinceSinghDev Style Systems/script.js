const topics = [
  {
    "title": "Multi-LLM Gateway Architecture",
    "questions": [
      [
        "How should a multi-LLM gateway process a request from end to end?",
        "<p>Authenticate the request, enforce policy, select an eligible route, execute bounded calls, validate the result, and return it with usage metadata.</p><ul><li><strong>Order:</strong> Check authorization, input size, budget, and an applicable cache before spending on generation when possible.</li><li><strong>Execution:</strong> Use sequential fallback or parallel calls only when their cost and result policy are justified.</li><li><strong>Output:</strong> Preserve source and completion metadata, record safe traces, and cache only eligible validated results.</li></ul><p><strong>Remember:</strong> The roadmap diagram is conceptual; a cache lookup usually belongs before expensive model work as well as a write afterward.</p><p><strong>Roadmap example:</strong> Named models illustrate the supplied architecture; configure supported model IDs and evaluate them for your task.</p><pre><code>Client Request\n    ↓\nAPI Gateway (Auth, Rate Limit, Logging)\n    ↓\nRouter Service (Task Classification)\n    ↓ ↓ ↓\nOpenAI  Claude  Gemini  Mistral  (parallel or cascading)\n    ↓\nResponse Aggregator\n    ↓\nCache Layer (Redis)\n    ↓\nClient Response</code></pre>"
      ]
    ]
  },
  {
    "title": "Provider abstraction layer - unified interface for all LLMs",
    "questions": [
      [
        "What should a provider abstraction layer normalize?",
        "<p>Present a shared request and response contract while keeping important provider capabilities visible.</p><ul><li><strong>Request:</strong> Normalize task input, model configuration, output requirements, deadline, and permitted tools.</li><li><strong>Response:</strong> Return text or typed content, tool calls, usage, finish status, provider identity, and normalized errors.</li><li><strong>Escape hatch:</strong> Expose unsupported features explicitly instead of silently dropping them.</li></ul><p><strong>Remember:</strong> A unified interface should make differences manageable rather than pretending they do not exist.</p>"
      ]
    ]
  },
  {
    "title": "Intelligent router - classify task, select optimal model",
    "questions": [
      [
        "How should an intelligent router choose a model?",
        "<p>Separate hard eligibility checks from scoring eligible options for quality, latency, and cost.</p><ul><li><strong>Filter:</strong> Apply tenant policy, modality, context, tool, and output-schema requirements first.</li><li><strong>Score:</strong> Use task evaluations, budget, current capacity, and deadline to rank remaining candidates.</li><li><strong>Audit:</strong> Record the chosen route and decision factors without storing sensitive payloads unnecessarily.</li></ul><p><strong>Remember:</strong> Optimization happens only inside the set of allowed and capable choices.</p>"
      ]
    ]
  },
  {
    "title": "Token counter - per-provider, per-user",
    "questions": [
      [
        "How does a token counter support per-provider and per-user control?",
        "<p>Estimate requests using the selected model's counting rules and attribute reported usage to the authenticated user.</p><ul><li><strong>Before dispatch:</strong> Reserve input and output capacity against user, tenant, and provider budgets.</li><li><strong>After completion:</strong> Reconcile actual input, output, cached, and other usage categories where available.</li><li><strong>Compatibility:</strong> Avoid assuming one tokenizer accurately counts every provider or multimodal input.</li></ul><p><strong>Remember:</strong> A token estimate and a provider's final usage record serve different purposes.</p>"
      ]
    ]
  },
  {
    "title": "Cost tracker - real-time spend monitoring",
    "questions": [
      [
        "What should a real-time cost tracker include?",
        "<p>Track the full cost of the workflow and remaining reservations using the price configuration for each billable operation.</p><ul><li><strong>Attribution:</strong> Associate model calls, retries, embeddings, reranking, and background work with the tenant and feature.</li><li><strong>Reservations:</strong> Include in-flight work so simultaneous requests cannot all spend the same budget.</li><li><strong>Updates:</strong> Version prices and reconcile delayed usage instead of assuming reported spend is instantly final.</li></ul><p><strong>Remember:</strong> Real-time monitoring requires admission control as well as a dashboard.</p>"
      ]
    ]
  },
  {
    "title": "Response validator - schema validation, quality checks",
    "questions": [
      [
        "How should a response validator check an LLM result?",
        "<p>Validate structure, completion status, and task-specific requirements before returning or acting on the output.</p><ul><li><strong>Syntax:</strong> Parse the expected schema and reject missing fields, wrong types, or incomplete tool arguments.</li><li><strong>Semantics:</strong> Check source support, allowed values, calculations, or executable tests where the task permits them.</li><li><strong>Recovery:</strong> Use a bounded repair, compatible fallback, or explicit failure rather than silently accepting bad output.</li></ul><p><strong>Remember:</strong> A schema-valid answer can still be factually or operationally wrong.</p>"
      ]
    ]
  },
  {
    "title": "Fallback manager - cascade through providers",
    "questions": [
      [
        "What responsibilities belong to a fallback manager?",
        "<p>It owns failure classification, eligible alternatives, retry budgets, and the final outcome when providers fail.</p><ul><li><strong>Policy:</strong> Recheck tenant permissions and capability requirements for every candidate.</li><li><strong>Control:</strong> Coordinate SDK retries, circuit breakers, and the remaining deadline to avoid retry multiplication.</li><li><strong>Side effects:</strong> Deduplicate actions and avoid replaying completed writes when only generation needs recovery.</li></ul><p><strong>Remember:</strong> Failover should be observable and bounded, not an unending cascade.</p>"
      ]
    ]
  },
  {
    "title": "Cache manager - semantic caching with embeddings",
    "questions": [
      [
        "How does semantic caching differ from exact-response caching?",
        "<p>Semantic caching retrieves a reusable result for a sufficiently similar request rather than only an identical fingerprint.</p><ul><li><strong>Retrieval:</strong> Embed the query and search within the caller's authorized cache scope.</li><li><strong>Acceptance:</strong> Check similarity, task intent, source version, parameters, and freshness before reusing an answer.</li><li><strong>Risk:</strong> Similar wording can hide different dates, entities, permissions, or requested actions.</li></ul><p><strong>Remember:</strong> A similarity threshold is not proof that two requests deserve the same response.</p><pre><code class=\"language-python\"># A semantic-cache hit must pass more than vector similarity.\ndef reusable(entry, request, minimum_similarity):\n    return (entry[&quot;tenant_id&quot;] == request[&quot;tenant_id&quot;]\n            and entry[&quot;source_version&quot;] == request[&quot;source_version&quot;]\n            and entry[&quot;schema_version&quot;] == request[&quot;schema_version&quot;]\n            and entry[&quot;similarity&quot;] &gt;= minimum_similarity\n            and not entry[&quot;expired&quot;])\n\n# Also validate task equivalence, authorization, model settings, and freshness.</code></pre>"
      ]
    ]
  },
  {
    "title": "Observability - traces, metrics, logs",
    "questions": [
      [
        "Which traces, metrics, and logs should a multi-LLM gateway expose?",
        "<p>Observe the whole request path with enough context to explain routing, quality, cost, and failures.</p><ul><li><strong>Traces:</strong> Link classification, retrieval, provider attempts, tool calls, validation, and cache decisions to one run.</li><li><strong>Metrics:</strong> Track latency percentiles, quality outcomes, usage, spend, cache effectiveness, and error categories.</li><li><strong>Logs:</strong> Record useful request identifiers and decisions with redaction, restricted access, and retention limits.</li></ul><p><strong>Remember:</strong> Observability should explain the workflow without leaking its private inputs.</p>"
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
