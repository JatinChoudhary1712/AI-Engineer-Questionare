const topics = [
  {
    "title": "Basic RAG",
    "questions": [
      [
        "What are the indexing and query-time stages of a basic RAG pipeline?",
        "<p>Indexing prepares searchable evidence; query-time retrieval selects it for generation.</p><ul><li><strong>Ingestion:</strong> Load documents, preserve metadata, chunk, embed, and store records using a consistent model configuration.</li><li><strong>Retrieval:</strong> Authorize the caller, embed or otherwise formulate the query, and retrieve a bounded candidate set.</li><li><strong>Generation:</strong> Build a context with source references, ask for a grounded answer, and validate support before returning it.</li></ul><p><strong>Remember:</strong> Index quality, access control, retrieval, and generation are separate failure points.</p><pre><code>Document → Chunk → Embed → Store in Vector DB\n                                    ↓\nUser Query → Embed → Retrieve Top-K Chunks\n                                    ↓\n            Chunks + Query → LLM → Answer</code></pre>"
      ]
    ]
  },
  {
    "title": "Hypothetical Document Embeddings (HyDE) - generate hypothetical answer, embed it for retrieval",
    "questions": [
      [
        "How does HyDE use a hypothetical document for retrieval?",
        "<p>It generates a hypothetical answer-like document and embeds that text to retrieve real source documents.</p><ul><li><strong>Purpose:</strong> Bridge differences between a brief query and the kind of passage that could answer it.</li><li><strong>Evidence:</strong> Use retrieved real documents as evidence; the generated hypothetical text may contain false facts.</li><li><strong>Tradeoff:</strong> Measure added model latency and query drift against retrieval improvements.</li></ul><p><strong>Remember:</strong> A hypothetical document is a retrieval aid, not a trustworthy answer source.</p><p><a href=\"https://arxiv.org/abs/2212.10496\" target=\"_blank\" rel=\"noopener noreferrer\">HyDE original paper</a></p>"
      ]
    ]
  },
  {
    "title": "Query expansion - generate multiple query variants",
    "questions": [
      [
        "What does query expansion add to retrieval?",
        "<p>It introduces alternative terms or formulations that may retrieve evidence missed by the original wording.</p><ul><li><strong>Variants:</strong> Include useful synonyms, acronyms, or related formulations while retaining the user's intent.</li><li><strong>Control:</strong> Limit expansion count and reject invented entities or scope changes.</li><li><strong>Merge:</strong> Deduplicate and rank the combined candidates before allocating the context budget.</li></ul><p><strong>Remember:</strong> More query variants can increase recall while also introducing noise.</p>"
      ]
    ]
  },
  {
    "title": "Reranking - use a cross-encoder to rerank retrieved chunks (Cohere Rerank, BGE Reranker)",
    "questions": [
      [
        "Why rerank candidates after first-stage retrieval?",
        "<p>A reranker can score query-passage relevance more precisely on a smaller candidate set.</p><ul><li><strong>Cross-encoder:</strong> Jointly processes the query and candidate text rather than comparing only independent vectors.</li><li><strong>Pipeline:</strong> Retrieve broadly, rerank permitted candidates, then select the evidence that fits the generation budget.</li><li><strong>Cost:</strong> Evaluate latency, candidate count, truncation, and model quality on your actual task.</li></ul><p><strong>Remember:</strong> Reranking improves ordering but cannot recover evidence the first stage never retrieved.</p>"
      ]
    ]
  },
  {
    "title": "Multi-query retrieval - decompose complex question into sub-queries",
    "questions": [
      [
        "How does multi-query retrieval differ from decomposing a complex question?",
        "<p>Multiple query variants target the same information need; decomposition separates distinct information needs.</p><ul><li><strong>Variants:</strong> Search paraphrases of one question and merge overlapping candidates.</li><li><strong>Sub-questions:</strong> Retrieve separate evidence for each part of a comparison or multi-step request.</li><li><strong>Synthesis:</strong> Keep provenance and reconcile missing or conflicting evidence before producing a combined answer.</li></ul><p><strong>Remember:</strong> The roadmap groups related ideas; choose the strategy that matches the question's structure.</p>"
      ]
    ]
  },
  {
    "title": "Self-querying - LLM generates structured filter from natural language",
    "questions": [
      [
        "How can self-querying produce safe structured filters?",
        "<p>A model proposes a query and structured metadata constraints that the application validates before execution.</p><ul><li><strong>Schema:</strong> Restrict fields, operators, types, and allowable values.</li><li><strong>Authorization:</strong> Add mandatory tenant/access filters independently of any model-generated filter.</li><li><strong>Ambiguity:</strong> Ask for clarification or apply an explicit default when the user's natural-language condition is unclear.</li></ul><p><strong>Remember:</strong> A generated filter must never be allowed to weaken access policy.</p>"
      ]
    ]
  },
  {
    "title": "Contextual compression - compress retrieved context before sending to LLM",
    "questions": [
      [
        "What is contextual compression in a RAG workflow?",
        "<p>It reduces retrieved material to the portions useful for answering the question.</p><ul><li><strong>Selection:</strong> Remove irrelevant spans and duplicate evidence before using generation tokens.</li><li><strong>Fidelity:</strong> Preserve negation, dates, qualifiers, and source references needed to interpret the passage.</li><li><strong>Evaluation:</strong> Compare the compressed evidence with originals because summarization can remove or alter essential facts.</li></ul><p><strong>Remember:</strong> Saving tokens is useful only when the evidence remains faithful.</p>"
      ]
    ]
  },
  {
    "title": "Parent document retriever - retrieve small chunks, return parent document",
    "questions": [
      [
        "Why retrieve small chunks but return a parent section?",
        "<p>Small chunks can improve matching precision while their parent content restores useful context.</p><ul><li><strong>Mapping:</strong> Store stable child-to-parent references during ingestion.</li><li><strong>Retrieval:</strong> Rank child matches, then fetch and deduplicate authorized parent sections.</li><li><strong>Budget:</strong> Select or trim oversized parents so expansion does not overwhelm the context window.</li></ul><p><strong>Remember:</strong> Returning a whole document is optional; the right parent may be a bounded section.</p>"
      ]
    ]
  },
  {
    "title": "Multi-vector retriever - multiple embeddings per document (summary + full text)",
    "questions": [
      [
        "How does a multi-vector retriever represent one document?",
        "<p>It stores several searchable representations that map back to the same source document or parent unit.</p><ul><li><strong>Representations:</strong> Use passage vectors, summaries, or question-like representations where evaluation supports them.</li><li><strong>Mapping:</strong> Keep stable parent IDs and retrieve the permitted source content after matching a representation.</li><li><strong>Ranking:</strong> Aggregate and deduplicate results so a document with many vectors does not dominate merely by count.</li></ul><p><strong>Remember:</strong> Multiple vectors create more retrieval opportunities and more lifecycle work.</p>"
      ]
    ]
  },
  {
    "title": "Faithfulness - is the answer grounded in retrieved context?",
    "questions": [
      [
        "What does faithfulness measure in a generated answer?",
        "<p>It assesses whether the answer's claims are supported by the retrieved context.</p><ul><li><strong>Claim level:</strong> Check individual statements rather than only the overall tone or fluency.</li><li><strong>Limitation:</strong> A faithful answer can repeat an incorrect source or fail to answer the actual question.</li><li><strong>Evaluation:</strong> Calibrate automated judges with human-reviewed examples and inspect important failures.</li></ul><p><strong>Remember:</strong> Grounded in context is different from correct in the world.</p>"
      ]
    ]
  },
  {
    "title": "Answer relevance - does the answer address the question?",
    "questions": [
      [
        "How is answer relevance different from faithfulness?",
        "<p>Relevance asks whether the response addresses the user's request; faithfulness asks whether its claims are supported.</p><ul><li><strong>Example:</strong> A supported paragraph about refunds is unhelpful if the question asks about shipping deadlines.</li><li><strong>Coverage:</strong> Check requested subparts, scope, and required format.</li><li><strong>Evaluation:</strong> Use task-specific criteria and human review where generic similarity scores miss the user's intent.</li></ul><p><strong>Remember:</strong> An answer needs both useful relevance and adequate evidence support.</p>"
      ]
    ]
  },
  {
    "title": "Context precision - are the retrieved chunks relevant?",
    "questions": [
      [
        "What does context precision tell you about retrieval?",
        "<p>It measures how much of the retrieved context is relevant, with some metric variants also considering rank.</p><ul><li><strong>Noise:</strong> Irrelevant passages waste context and may distract the generator.</li><li><strong>Definitions:</strong> Document-level precision, ID-based precision, and judge-based rank-aware metrics are not interchangeable.</li><li><strong>Diagnosis:</strong> Inspect false positives and adjust ranking, filters, deduplication, or chunking using the chosen metric.</li></ul><p><strong>Remember:</strong> State the exact metric and reference data before comparing scores.</p><p><a href=\"https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/\" target=\"_blank\" rel=\"noopener noreferrer\">Ragas metric definitions and variants</a></p>"
      ]
    ]
  },
  {
    "title": "Context recall - did we retrieve all necessary information?",
    "questions": [
      [
        "What does context recall tell you about retrieval?",
        "<p>It measures how much of the required reference evidence or information the retrieved set covers.</p><ul><li><strong>Missing evidence:</strong> A precise but narrow result set can still omit a key fact needed for the answer.</li><li><strong>References:</strong> The metric needs a definition of what evidence or reference information should have been found.</li><li><strong>Tradeoff:</strong> Increasing candidate count may improve recall while adding latency and irrelevant context.</li></ul><p><strong>Remember:</strong> Precision and recall reveal different retrieval failures.</p>"
      ]
    ]
  },
  {
    "title": "Tools: RAGAs framework, LangSmith, TRULENS",
    "questions": [
      [
        "How should Ragas, LangSmith, or TruLens fit into RAG evaluation?",
        "<p>Use evaluation and tracing tools to run a repeatable dataset and inspect failures across the pipeline.</p><ul><li><strong>Dataset:</strong> Include representative questions, permitted source scope, expected evidence, and task-specific acceptance criteria.</li><li><strong>Configuration:</strong> Version prompts, embeddings, chunking, retrieval settings, and judge models with each experiment.</li><li><strong>Diagnosis:</strong> Combine automated metrics, traces, and human checks rather than trusting one tool's aggregate score.</li></ul><p><strong>Remember:</strong> Evaluation software measures a defined experiment; it does not certify a system as correct.</p><p><a href=\"https://docs.ragas.io/en/stable/concepts/metrics/available_metrics/\" target=\"_blank\" rel=\"noopener noreferrer\">Ragas evaluation metrics</a></p>"
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
