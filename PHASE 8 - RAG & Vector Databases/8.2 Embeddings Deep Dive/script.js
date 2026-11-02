const topics = [
  {
    "title": "What are embeddings - dense, semantic vector representations",
    "questions": [
      [
        "What does a text embedding represent?",
        "<p>A text embedding is a learned numeric vector that can make useful relationships measurable in a vector space.</p><ul><li><strong>Meaning:</strong> Similar texts often have similar vectors under the model's intended task and metric.</li><li><strong>Dependence:</strong> The representation reflects training data, pooling, normalization, and any query/document instructions.</li><li><strong>Limits:</strong> Negation, exact identifiers, domain-specific terms, or rare languages may not behave as you expect.</li></ul><p><strong>Remember:</strong> Embedding similarity is a learned signal, not a verified measure of factual equivalence.</p>"
      ]
    ]
  },
  {
    "title": "Embedding models: text-embedding-3-small, text-embedding-3-large (OpenAI)",
    "questions": [
      [
        "How should you compare OpenAI's text-embedding-3-small and text-embedding-3-large?",
        "<p>Compare retrieval quality, cost, dimensions, and latency on a representative corpus rather than selecting by name alone.</p><ul><li><strong>Compatibility:</strong> Keep query and stored document vectors in the same model/configuration space.</li><li><strong>Dimensions:</strong> These embedding families support a dimensions setting; the chosen output size must match the index configuration.</li><li><strong>Migration:</strong> Re-embed and evaluate when changing models or settings instead of mixing incompatible vectors.</li></ul><p><strong>Remember:</strong> A larger embedding model is worthwhile only when its measured benefit justifies its resource use.</p><p><a href=\"https://developers.openai.com/api/docs/guides/embeddings\" target=\"_blank\" rel=\"noopener noreferrer\">OpenAI embedding documentation</a></p>"
      ]
    ]
  },
  {
    "title": "all-MiniLM-L6-v2, bge-large (open source, HuggingFace)",
    "questions": [
      [
        "How do all-MiniLM-L6-v2 and BGE fit into a retrieval system?",
        "<p>They illustrate locally deployable embedding-model choices with different model sizes, training, and retrieval conventions.</p><ul><li><strong>Artifact:</strong> all-MiniLM-L6-v2 is a specific model; bge-large is a family shorthand, so select a precise checkpoint such as bge-large-en-v1.5.</li><li><strong>Instructions:</strong> Follow the checkpoint's query formatting, normalization, and length limits.</li><li><strong>Evaluation:</strong> Test your language and domain with the actual model version, hardware, and serving configuration.</li></ul><p><strong>Remember:</strong> Open model hosting still requires compatible preprocessing and good retrieval evaluation.</p><p><a href=\"https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2\" target=\"_blank\" rel=\"noopener noreferrer\">all-MiniLM-L6-v2 model card</a></p><p><a href=\"https://huggingface.co/BAAI/bge-large-en-v1.5\" target=\"_blank\" rel=\"noopener noreferrer\">BGE large English v1.5 model card</a></p>"
      ]
    ]
  },
  {
    "title": "embed-english-v3 (Cohere) - tuned for RAG",
    "questions": [
      [
        "What should you know about Cohere's Embed v3 naming and retrieval modes?",
        "<p>The roadmap's embed-english-v3 refers to the versioned Embed family; use the exact supported model ID from its documentation.</p><ul><li><strong>Identifier:</strong> Versioned examples use embed-english-v3.0 rather than assuming the shorthand is an API model ID.</li><li><strong>Purpose:</strong> Use the documented search-query and search-document input types for their respective roles when required.</li><li><strong>Compatibility:</strong> Keep model, dimensions, and preprocessing consistent across indexing and query embedding.</li></ul><p><strong>Remember:</strong> Query and document modes can be different parts of the same compatible retrieval model.</p><p><a href=\"https://docs.cohere.com/docs/models\" target=\"_blank\" rel=\"noopener noreferrer\">Cohere model identifiers and embedding guidance</a></p>"
      ]
    ]
  },
  {
    "title": "Embedding dimensions - tradeoff between quality and storage",
    "questions": [
      [
        "How do embedding dimensions affect storage and quality?",
        "<p>More dimensions increase vector storage and distance-computation work, but do not universally improve your retrieval task.</p><ul><li><strong>Estimate:</strong> Raw storage is approximately vector count times dimensions times bytes per component, before metadata and index overhead.</li><li><strong>Compression:</strong> Reduced dimensions or quantization can save space but may change recall and require an index rebuild.</li><li><strong>Evaluation:</strong> Compare quality, memory, latency, and total cost using the actual corpus.</li></ul><p><strong>Remember:</strong> Dimension count is one design parameter rather than a standalone quality score.</p><p class=\"formula\"><strong>Raw vector bytes:</strong> <code>N × d × b</code>. One million 768-dimensional float32 vectors use about 3.07 GB before index, metadata, replication, and other overhead.</p>"
      ]
    ]
  },
  {
    "title": "Batch embedding for efficiency",
    "questions": [
      [
        "How do you batch document embeddings safely?",
        "<p>Group compatible inputs within provider or runtime limits while preserving each chunk's identity and failure state.</p><ul><li><strong>Limits:</strong> Budget tokens, item count, concurrency, and payload size instead of sending an unbounded batch.</li><li><strong>Mapping:</strong> Associate each returned vector with its source chunk and model version.</li><li><strong>Recovery:</strong> Retry only failed work where possible and make upserts idempotent to avoid duplicate records.</li></ul><p><strong>Remember:</strong> Batching improves throughput when limits, attribution, and partial failures are handled deliberately.</p>"
      ]
    ]
  },
  {
    "title": "Embedding similarity: cosine, dot product, Euclidean",
    "questions": [
      [
        "How do cosine similarity, dot product, and Euclidean distance differ?",
        "<p>They compare vector direction, alignment with magnitude, and geometric separation respectively.</p><ul><li><strong>Cosine:</strong> Divide the dot product by both vector lengths; zero vectors need explicit handling.</li><li><strong>Dot product:</strong> Magnitude affects scores unless vectors are normalized.</li><li><strong>Euclidean:</strong> Smaller distance means closer vectors; for unit vectors, squared distance equals two minus twice their dot product.</li></ul><p><strong>Remember:</strong> Select the metric and normalization expected by the embedding model and index.</p><pre><code class=\"language-python\">from math import sqrt\n\ndef cosine(a, b):\n    if len(a) != len(b) or not a:\n        raise ValueError(&quot;Vectors need the same nonzero dimension&quot;)\n    dot = sum(x * y for x, y in zip(a, b))\n    norm_a = sqrt(sum(x * x for x in a))\n    norm_b = sqrt(sum(y * y for y in b))\n    if norm_a == 0 or norm_b == 0:\n        raise ValueError(&quot;Cosine is undefined for a zero vector&quot;)\n    return dot / (norm_a * norm_b)\n\nassert abs(cosine([1, 0], [1, 0]) - 1) &lt; 1e-9</code></pre>"
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
