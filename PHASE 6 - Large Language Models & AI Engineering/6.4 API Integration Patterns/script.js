const topics = [
  {
    "title": "Count tokens before sending",
    "questions": [
      [
        "How should a backend budget tokens before making a request?",
        "<p>Estimate the complete request and reserve enough space for the intended output.</p><ul><li><strong>Counting:</strong> Use the selected model's tokenizer or provider token-counting endpoint, including supported media and tools.</li><li><strong>Reservation:</strong> Subtract generation and model-specific overhead from the available context.</li><li><strong>Reconciliation:</strong> Compare estimates with reported usage to improve budgeting.</li></ul><p><strong>Remember:</strong> An Anthropic request should not be counted with an unrelated OpenAI tokenizer.</p>"
      ]
    ]
  },
  {
    "title": "Truncation strategies",
    "questions": [
      [
        "What can be safely removed when a conversation is too long?",
        "<p>Remove low-value context using explicit priorities rather than slicing an arbitrary string.</p><ul><li><strong>Preserve:</strong> Keep high-priority instructions, the current request, and facts needed to answer it.</li><li><strong>Structure:</strong> Keep tool calls and results paired and avoid splitting structured records.</li><li><strong>Policy:</strong> Drop old irrelevant turns or reduce retrieved passages before removing essential constraints.</li></ul><p><strong>Remember:</strong> Truncation must preserve meaning and valid conversation structure.</p>"
      ]
    ]
  },
  {
    "title": "Context window management",
    "questions": [
      [
        "What belongs in a context-management policy?",
        "<p>Define how instructions, history, retrieved evidence, and output share a finite token budget.</p><ul><li><strong>Allocation:</strong> Set budgets per content source and request type.</li><li><strong>Selection:</strong> Rank passages by relevance and remove duplicate evidence.</li><li><strong>Failure:</strong> Reject or ask for a narrower task when essential input cannot fit safely.</li></ul><p><strong>Remember:</strong> Context management should be deliberate and observable.</p>"
      ]
    ]
  },
  {
    "title": "Summarization of old history",
    "questions": [
      [
        "What should a conversation summary preserve?",
        "<p>A summary should retain durable facts and unresolved work while discarding conversational repetition.</p><ul><li><strong>Contents:</strong> Record decisions, constraints, identifiers, and pending questions.</li><li><strong>Provenance:</strong> Distinguish user-provided facts from assistant guesses or external claims.</li><li><strong>Recovery:</strong> Keep source history separately when permitted because summaries can omit or distort details.</li></ul><p><strong>Remember:</strong> A summary is a lossy derived artifact, not an infallible memory.</p>"
      ]
    ]
  },
  {
    "title": "SSE - streaming text chunks",
    "questions": [
      [
        "How is an SSE stream different from arbitrary network chunks?",
        "<p>SSE frames text events using a defined format, while network chunks can split an event anywhere.</p><ul><li><strong>Parsing:</strong> Buffer until complete event boundaries rather than treating each read as one message.</li><li><strong>Transport:</strong> Set appropriate content type and avoid proxy buffering that delays delivery.</li><li><strong>Lifecycle:</strong> Handle cancellation, terminal events, disconnects, and errors explicitly.</li></ul><p><strong>Remember:</strong> Network chunk boundaries are not semantic event boundaries.</p>"
      ]
    ]
  },
  {
    "title": "Handling partial responses",
    "questions": [
      [
        "What should happen when a model stream stops midway?",
        "<p>Mark the response as incomplete and keep downstream actions from using unfinished output.</p><ul><li><strong>Detection:</strong> Track successful completion separately from stream closure.</li><li><strong>Recovery:</strong> Offer a controlled retry or continuation appropriate to the task.</li><li><strong>Actions:</strong> Do not execute partial tool arguments or blindly replay side effects after a reconnect.</li></ul><p><strong>Remember:</strong> Partial text can be shown, but it must not masquerade as a completed result.</p>"
      ]
    ]
  },
  {
    "title": "Client-side streaming rendering",
    "questions": [
      [
        "How should streamed text be rendered safely in a browser?",
        "<p>Append text incrementally while keeping the interface responsive and accessible.</p><ul><li><strong>Security:</strong> Use textContent or a sanitized Markdown renderer instead of inserting raw model HTML.</li><li><strong>Performance:</strong> Buffer short updates and render at a reasonable cadence to avoid excessive layout work.</li><li><strong>Access:</strong> Provide a stop control and avoid announcing every token to screen readers.</li></ul><p><strong>Remember:</strong> Streamed content is untrusted output just like a completed answer.</p>"
      ]
    ]
  },
  {
    "title": "Perceived latency reduction",
    "questions": [
      [
        "Why does streaming make a response feel faster?",
        "<p>Streaming exposes early output while the remainder is still being generated.</p><ul><li><strong>Metric:</strong> Measure time to first meaningful content as well as total completion time.</li><li><strong>Limitation:</strong> Streaming does not necessarily reduce total generation time.</li><li><strong>UX:</strong> Show activity, allow cancellation, and make completion state clear.</li></ul><p><strong>Remember:</strong> Perceived responsiveness and full-request latency are different metrics.</p>"
      ]
    ]
  },
  {
    "title": "Exponential backoff with jitter",
    "questions": [
      [
        "How should retries handle temporary provider failures?",
        "<p>Retry selected transient failures using increasing delays with random jitter and a strict budget.</p><ul><li><strong>Formula:</strong> A common delay is a random value between zero and min(cap, base times 2 to the attempt).</li><li><strong>Guidance:</strong> Respect Retry-After and use maximum attempts plus an overall deadline.</li><li><strong>Scope:</strong> Avoid retrying invalid input, authentication failures, or non-idempotent actions blindly.</li></ul><p><strong>Remember:</strong> Coordinate application and SDK retries so they do not multiply unexpectedly.</p>"
      ]
    ]
  },
  {
    "title": "Respect provider quotas",
    "questions": [
      [
        "How can an application prevent a burst from exhausting shared limits?",
        "<p>Apply admission control before requests reach the provider.</p><ul><li><strong>Accounting:</strong> Track both request and token capacity, plus concurrency where relevant.</li><li><strong>Fairness:</strong> Reserve capacity per tenant or feature so one user cannot consume everything.</li><li><strong>Backpressure:</strong> Queue within a deadline or return a clear retry response when saturated.</li></ul><p><strong>Remember:</strong> Provider quotas and your own user-facing rate limits solve different problems.</p>"
      ]
    ]
  },
  {
    "title": "Queue-based request management",
    "questions": [
      [
        "When should API requests go through a queue?",
        "<p>Queue work when processing can happen asynchronously or must be smoothed across provider capacity.</p><ul><li><strong>Jobs:</strong> Store a stable ID, input reference, deadline, and retry state.</li><li><strong>Workers:</strong> Limit concurrency and acknowledge only after the result is durably recorded.</li><li><strong>Reliability:</strong> Use deduplication and dead-letter handling for repeated failures.</li></ul><p><strong>Remember:</strong> Queue delivery can repeat, so job processing should be idempotent where possible.</p>"
      ]
    ]
  },
  {
    "title": "Circuit breaker pattern",
    "questions": [
      [
        "How does a circuit breaker help during a provider outage?",
        "<p>It temporarily stops calls to a failing dependency instead of letting every request wait and fail.</p><ul><li><strong>Closed:</strong> Send calls and observe failures against a defined threshold.</li><li><strong>Open:</strong> Fail fast or use a permitted fallback during a cooldown.</li><li><strong>Half-open:</strong> Allow limited probes and restore traffic only after recovery.</li></ul><p><strong>Remember:</strong> Count relevant dependency failures rather than treating user validation errors as an outage.</p>"
      ]
    ]
  },
  {
    "title": "Log token usage per user/feature",
    "questions": [
      [
        "What usage data supports reliable cost control?",
        "<p>Record provider-reported token and request usage with the tenant, feature, and configuration.</p><ul><li><strong>Breakdown:</strong> Track input, output, cached tokens, and other billed units when available.</li><li><strong>Estimation:</strong> Apply the correct versioned prices for the actual model and billing category.</li><li><strong>Privacy:</strong> Prefer metadata and redacted content with defined retention.</li></ul><p><strong>Remember:</strong> Cost attribution must survive model changes and failed requests.</p>"
      ]
    ]
  },
  {
    "title": "GPT-3.5 vs GPT-4 routing by task complexity",
    "questions": [
      [
        "How should cost-based model routing work today?",
        "<p>The roadmap's GPT-3.5 versus GPT-4 pair illustrates a general pattern: route to a cheaper adequate model and escalate when justified.</p><ul><li><strong>Selection:</strong> Use configured, supported model IDs and evaluate them on the real task.</li><li><strong>Routing:</strong> Use explicit task criteria or a tested classifier rather than unreliable self-reported confidence alone.</li><li><strong>Quality:</strong> Measure escalation rate, final success, latency, and total cost including retries.</li></ul><p><strong>Remember:</strong> A cheaper call is not cheaper if it creates more failures.</p>"
      ]
    ]
  },
  {
    "title": "Prompt compression - whitespace and summaries",
    "questions": [
      [
        "Is stripping whitespace a safe universal cost optimization?",
        "<p>No; compression should remove redundancy without changing code, tables, or task-critical meaning.</p><ul><li><strong>Tokenization:</strong> Whitespace changes do not have a predictable universal relationship to token counts.</li><li><strong>Context:</strong> Prefer selecting relevant evidence and concise instructions.</li><li><strong>Evaluation:</strong> Verify behavior and token savings with the actual tokenizer and test set.</li></ul><p><strong>Remember:</strong> Preserve semantics before optimizing prompt length.</p>"
      ]
    ]
  },
  {
    "title": "Caching with SHA-256 fingerprinting",
    "questions": [
      [
        "What should be included in a response-cache key?",
        "<p>Hash a canonical representation of every input that can affect the authorized result.</p><ul><li><strong>Fields:</strong> Include model, prompt version, parameters, schema, messages, and relevant source versions.</li><li><strong>Isolation:</strong> Include tenant or access scope and apply authorization before returning a cached answer.</li><li><strong>Invalidation:</strong> Set a suitable TTL and expire entries when source data or permissions change.</li></ul><p><strong>Remember:</strong> SHA-256 creates a fingerprint, not encryption or access control.</p><pre><code class=\"language-python\">import hashlib\nimport json\n\ndef cache_key(request, tenant_id, prompt_version, source_version):\n    payload = {\n        &quot;tenant&quot;: tenant_id,\n        &quot;prompt_version&quot;: prompt_version,\n        &quot;source_version&quot;: source_version,\n        &quot;request&quot;: request,  # Include model, settings, schema, and messages.\n    }\n    canonical = json.dumps(payload, sort_keys=True, separators=(&quot;,&quot;, &quot;:&quot;))\n    return hashlib.sha256(canonical.encode(&quot;utf-8&quot;)).hexdigest()\n\n# Authorize access before lookup; set TTL and invalidate on permission changes.</code></pre>"
      ]
    ]
  },
  {
    "title": "Async pipelines for non-realtime tasks",
    "questions": [
      [
        "How should an asynchronous LLM workflow report progress?",
        "<p>Return a job identifier quickly and process work separately from the interactive request.</p><ul><li><strong>Lifecycle:</strong> Store queued, running, succeeded, failed, and canceled states.</li><li><strong>Delivery:</strong> Expose authenticated polling or verify webhook signatures before accepting completion events.</li><li><strong>Recovery:</strong> Make retries bounded and record results durably before marking success.</li></ul><p><strong>Remember:</strong> A successful enqueue means accepted for processing, not completed.</p>"
      ]
    ]
  },
  {
    "title": "Error Handling & Fallback",
    "questions": [
      [
        "What is wrong with catching APIError before RateLimitError?",
        "<p>In SDKs where RateLimitError inherits from APIError, the broader handler catches it first and prevents the intended rate-limit path.</p><ul><li><strong>Order:</strong> Catch specific exceptions before their parent classes.</li><li><strong>Coverage:</strong> Handle exceptions raised inside fallback calls too; sibling except clauses do not catch those failures.</li><li><strong>Policy:</strong> Use bounded retries and authorized, compatible cached or alternate-model results.</li></ul><p><strong>Remember:</strong> Preserve failure categories instead of hiding every error behind an apparently successful answer.</p><pre><code class=\"language-python\"># Illustrative server-side control flow; SDK exception types vary.\n# Helpers must enforce deadlines, authorization, and compatible output schemas.\nfrom openai import APIError, RateLimitError\n\ndef answer(prompt):\n    try:\n        return call_primary_with_bounded_retries(prompt)\n    except RateLimitError:  # Specific exception before APIError.\n        cached = get_authorized_fresh_cache(prompt)\n        return cached if cached is not None else SERVICE_UNAVAILABLE\n    except APIError as error:\n        if not is_transient(error) or not fallback_allowed(prompt):\n            return SERVICE_UNAVAILABLE\n        try:\n            return call_compatible_fallback(prompt)\n        except APIError:\n            return SERVICE_UNAVAILABLE\n\n# Unexpected programming errors go to the server error handler and monitoring.</code></pre>"
      ]
    ]
  },
  {
    "title": "Fallback safety and compatibility",
    "questions": [
      [
        "What should be checked before switching to a fallback provider?",
        "<p>A fallback must preserve the task contract and the user's data-handling requirements.</p><ul><li><strong>Capability:</strong> Verify context, modality, tools, output schema, and quality requirements.</li><li><strong>Permission:</strong> Do not send data to an alternate provider unless the application's policy allows it.</li><li><strong>Honesty:</strong> Distinguish stale cached content, partial results, and service-unavailable responses.</li></ul><p><strong>Remember:</strong> Fallback is a designed product behavior, not just another API call.</p>"
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
