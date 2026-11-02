const topics = [
  {
    "title": "LLMs have knowledge cutoffs",
    "questions": [
      [
        "How does retrieval help with an LLM's knowledge cutoff?",
        "<p>Retrieval can supply current documents at request time without changing the model's weights.</p><ul><li><strong>Freshness:</strong> Ingest and refresh authoritative sources before expecting the system to know about a change.</li><li><strong>Separation:</strong> Distinguish retrieved evidence from the model's pretrained associations.</li><li><strong>Limits:</strong> A recent document can still be irrelevant, incorrect, or too incomplete to answer the question.</li></ul><p><strong>Remember:</strong> RAG supplies external evidence; it does not automatically keep that evidence current.</p>"
      ]
    ]
  },
  {
    "title": "LLMs can't access private/proprietary data",
    "questions": [
      [
        "How can an LLM answer questions about private company documents?",
        "<p>An authorized retrieval service selects relevant private content and includes it in the model's request context.</p><ul><li><strong>Ingestion:</strong> Extract, chunk, and index documents while retaining source identity and access rules.</li><li><strong>Authorization:</strong> Filter by the caller's permissions before returning content to the generation step.</li><li><strong>Data handling:</strong> Choose approved model services and avoid leaking private content through prompts, logs, or caches.</li></ul><p><strong>Remember:</strong> A model does not gain access to your private data unless an application supplies it or grants tools access.</p>"
      ]
    ]
  },
  {
    "title": "LLMs hallucinate when they don't know",
    "questions": [
      [
        "Does RAG eliminate hallucinations?",
        "<p>No; RAG can improve grounding, but the generator can still invent claims or misread retrieved evidence.</p><ul><li><strong>Retrieval failures:</strong> Missing or irrelevant chunks can leave the request unsupported.</li><li><strong>Generation failures:</strong> A model may ignore qualifications, merge conflicting sources, or fabricate citations.</li><li><strong>Controls:</strong> Check evidence support, preserve provenance, and allow a clear insufficient-evidence response.</li></ul><p><strong>Remember:</strong> Retrieved text is useful evidence, not a guarantee of a correct answer.</p>"
      ]
    ]
  },
  {
    "title": "RAG = Embedding-based search + Prompt-based generation",
    "questions": [
      [
        "What are the retrieval and generation stages of RAG?",
        "<p>Retrieval finds relevant external evidence, and generation uses it to answer the user's request.</p><ul><li><strong>Search:</strong> Dense embeddings are common, but keyword, hybrid, and other retrieval methods can also support RAG.</li><li><strong>Context:</strong> Select a bounded set of authorized passages and identify their sources.</li><li><strong>Generation:</strong> Ask the model to answer from that evidence and handle missing support explicitly.</li></ul><p><strong>Remember:</strong> RAG is broader than one particular vector database or embedding model.</p>"
      ]
    ]
  },
  {
    "title": "RAG vs Fine-tuning - when to use which",
    "questions": [
      [
        "When should you use RAG, fine-tuning, or both?",
        "<p>Use retrieval for external knowledge access and fine-tuning to adapt model behavior when training data and evaluation justify it.</p><ul><li><strong>RAG:</strong> Useful for changing documents, source citations, and user-specific information.</li><li><strong>Fine-tuning:</strong> Useful for recurring output style, task behavior, or specialized patterns; it does not guarantee exact recall of training facts.</li><li><strong>Combined:</strong> A tuned model can still retrieve up-to-date authorized evidence at inference time.</li></ul><p><strong>Remember:</strong> Choose based on the failure you need to solve rather than treating these techniques as substitutes.</p><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Need</th><th scope=\"col\">Starting approach</th></tr></thead><tbody><tr><th scope=\"row\">Changing private policies with citations</th><td>Authorized retrieval plus generation</td></tr><tr><th scope=\"row\">Repeatable output behavior or style</th><td>Prompting and evaluation, then fine-tuning if justified</td></tr><tr><th scope=\"row\">Both knowledge access and adapted behavior</th><td>Evaluate a combined approach</td></tr></tbody></table></div>"
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
