const topics = [
  {
    "title": "Incremental indexing - adding new documents without reindexing",
    "questions": [
      [
        "How can documents be added without rebuilding the entire index?",
        "<p>Incremental ingestion embeds and writes only new or changed records under a compatible index configuration.</p><ul><li><strong>Identity:</strong> Use stable IDs and content hashes to detect repeated or changed chunks.</li><li><strong>Compatibility:</strong> A model, dimension, or preprocessing change may require a larger migration rather than an incremental append.</li><li><strong>Reliability:</strong> Make writes idempotent and record job status so partial failures can resume safely.</li></ul><p><strong>Remember:</strong> Incremental indexing still needs change detection and deletion handling.</p>"
      ]
    ]
  },
  {
    "title": "Document versioning - handling document updates",
    "questions": [
      [
        "How should a RAG index handle document updates and deletions?",
        "<p>Track source versions and replace or retire all affected chunks consistently.</p><ul><li><strong>Versioning:</strong> Record document and chunk versions so results can be tied to the correct source state.</li><li><strong>Rollout:</strong> Use a staged replacement or version filter when partially updated documents must not appear together.</li><li><strong>Cleanup:</strong> Remove obsolete chunks and invalidate caches, citations, and derived summaries as required.</li></ul><p><strong>Remember:</strong> Updating one vector does not update every derived artifact of a document.</p>"
      ]
    ]
  },
  {
    "title": "Multi-tenant isolation - per-user, per-org vector spaces",
    "questions": [
      [
        "Where must multi-tenant isolation be enforced in production RAG?",
        "<p>Enforce it throughout the data path rather than only at the final model call.</p><ul><li><strong>Ingestion:</strong> Attribute documents and permissions to the correct tenant and prevent cross-tenant writes.</li><li><strong>Retrieval:</strong> Apply mandatory authorization before content is exposed to rerankers or generation.</li><li><strong>Derived data:</strong> Scope caches, traces, parent lookups, evaluations, and exports to the same access policy.</li></ul><p><strong>Remember:</strong> A tenant field is useful only when every relevant operation enforces it.</p>"
      ]
    ]
  },
  {
    "title": "Caching - cache embeddings, cache query results",
    "questions": [
      [
        "Which parts of a RAG pipeline are suitable for caching?",
        "<p>Cache reusable computations or results when their identity, authorization, and freshness can be checked.</p><ul><li><strong>Embeddings:</strong> Key by content plus model, dimensions, and preprocessing configuration.</li><li><strong>Retrieval:</strong> Include query, filters, tenant/access scope, index version, and search settings in the key.</li><li><strong>Answers:</strong> Include generation settings and evidence versions, and expire results when sources or permissions change.</li></ul><p><strong>Remember:</strong> Cache hits must preserve the same access and freshness guarantees as uncached work.</p><pre><code class=\"language-python\">import hashlib\nimport json\n\ndef retrieval_cache_key(query, tenant_id, access_version, index_version, filters):\n    payload = {\n        &quot;query&quot;: query,\n        &quot;tenant_id&quot;: tenant_id,\n        &quot;access_version&quot;: access_version,\n        &quot;index_version&quot;: index_version,\n        &quot;filters&quot;: filters,\n    }\n    raw = json.dumps(payload, sort_keys=True, separators=(&quot;,&quot;, &quot;:&quot;))\n    return hashlib.sha256(raw.encode(&quot;utf-8&quot;)).hexdigest()\n\n# Production keys also include embedding/search settings. Authorize before lookup.</code></pre>"
      ]
    ]
  },
  {
    "title": "Monitoring - retrieval quality, latency, hit rates",
    "questions": [
      [
        "What should production RAG monitoring track?",
        "<p>Measure quality and operational behavior across ingestion, retrieval, and generation.</p><ul><li><strong>Quality:</strong> Track relevance, evidence coverage, supported claims, abstentions, and user feedback on representative samples.</li><li><strong>Performance:</strong> Break down embedding, search, reranking, model latency, errors, and cost.</li><li><strong>Freshness:</strong> Monitor ingestion lag, failed updates, deleted-document leakage, and cache effectiveness.</li></ul><p><strong>Remember:</strong> Good service latency can hide a retrieval system that returns the wrong evidence.</p>"
      ]
    ]
  },
  {
    "title": "Fallback - \"I don't know\" when context is insufficient",
    "questions": [
      [
        "When should a RAG system say it does not have enough information?",
        "<p>Abstain or ask a clarifying question when the authorized evidence does not adequately support the requested answer.</p><ul><li><strong>Signals:</strong> Use validated coverage and support checks rather than a universal similarity cutoff or the model's confidence alone.</li><li><strong>Response:</strong> Explain the missing information and cite any useful partial evidence without inventing a complete answer.</li><li><strong>Recovery:</strong> Offer a narrower question, another authorized source, or a human handoff where appropriate.</li></ul><p><strong>Remember:</strong> Returning fewer unsupported claims is better than forcing every query into an answer.</p>"
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
