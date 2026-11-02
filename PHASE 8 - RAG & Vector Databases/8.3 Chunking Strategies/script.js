const topics = [
  {
    "title": "Fixed-size chunking - simple but naive",
    "questions": [
      [
        "What are the advantages and risks of fixed-size chunking?",
        "<p>It divides text into units of a chosen size, giving a simple and predictable baseline.</p><ul><li><strong>Units:</strong> Define whether size means characters, words, or model tokens.</li><li><strong>Risk:</strong> Boundaries can split definitions, sentences, tables, or code needed to interpret a passage.</li><li><strong>Baseline:</strong> Measure retrieval and answer quality before adding more elaborate splitting logic.</li></ul><p><strong>Remember:</strong> A predictable chunk length does not guarantee a meaningful evidence unit.</p>"
      ]
    ]
  },
  {
    "title": "Sentence-based chunking - respects natural boundaries",
    "questions": [
      [
        "When is sentence-based chunking useful?",
        "<p>It groups complete sentences so retrieval units are less likely to cut natural prose mid-thought.</p><ul><li><strong>Segmentation:</strong> Use a language-appropriate sentence splitter that handles abbreviations and punctuation.</li><li><strong>Packing:</strong> Combine sentences within a target budget and handle unusually long sentences explicitly.</li><li><strong>Limitation:</strong> Sentence boundaries alone do not preserve sections, tables, or relationships across paragraphs.</li></ul><p><strong>Remember:</strong> Natural boundaries help readability but still need size and context controls.</p>"
      ]
    ]
  },
  {
    "title": "Recursive character text splitting - LangChain default",
    "questions": [
      [
        "How does recursive character splitting work?",
        "<p>It tries a hierarchy of separators, using smaller boundaries when larger text units exceed the target size.</p><ul><li><strong>Hierarchy:</strong> Prefer paragraphs or line breaks before falling back to finer separators.</li><li><strong>Measurement:</strong> Configure the length function; a character-counting splitter does not automatically enforce a model-token budget.</li><li><strong>Scope:</strong> It is a common LangChain text-splitting option, not a universal default for every loader, framework, or document.</li></ul><p><strong>Remember:</strong> Configure the splitter for the actual document structure and tokenizer.</p>"
      ]
    ]
  },
  {
    "title": "Semantic chunking - split on topic change",
    "questions": [
      [
        "How does semantic chunking identify topic changes?",
        "<p>It uses a semantic signal, often sentence embeddings, to detect boundaries between related groups of text.</p><ul><li><strong>Method:</strong> Compare neighboring segments or windows and split where their relationship changes sufficiently.</li><li><strong>Cost:</strong> Additional embedding calls and threshold tuning increase ingestion work.</li><li><strong>Evaluation:</strong> Check whether the boundaries improve retrieval and answer support on your documents.</li></ul><p><strong>Remember:</strong> A semantic boundary detector can make mistakes and should be tested against simpler baselines.</p>"
      ]
    ]
  },
  {
    "title": "Document-based chunking - by headers, sections",
    "questions": [
      [
        "How should document structure influence chunk boundaries?",
        "<p>Use headings, sections, paragraphs, tables, and other structural units when they carry useful meaning.</p><ul><li><strong>Hierarchy:</strong> Retain the heading path so a chunk can be interpreted within its parent section.</li><li><strong>Exceptions:</strong> Split oversized sections while keeping labels, table headers, and code context where needed.</li><li><strong>Extraction:</strong> Preserve source order and handle noisy PDF or OCR output before trusting detected structure.</li></ul><p><strong>Remember:</strong> The best structural splitter depends on the quality of the extracted document.</p>"
      ]
    ]
  },
  {
    "title": "Chunk size vs overlap tradeoff",
    "questions": [
      [
        "How do chunk size and overlap affect retrieval?",
        "<p>Size controls how much context each result contains; overlap reduces boundary loss while increasing duplication.</p><ul><li><strong>Small chunks:</strong> Can retrieve precise passages but may omit necessary surrounding context.</li><li><strong>Large chunks:</strong> Preserve more context but can dilute similarity and consume more generation tokens.</li><li><strong>Overlap:</strong> Improves continuity at boundaries but adds indexing cost and repeated evidence that should be deduplicated.</li></ul><p><strong>Remember:</strong> Tune size and overlap jointly using retrieval and answer-level evaluation.</p><p class=\"example\"><strong>Example:</strong> If the only refund exception lies across a split boundary, some overlap or a parent-section lookup may recover it. Excessive overlap can return the same paragraph repeatedly.</p>"
      ]
    ]
  },
  {
    "title": "Chunk metadata - source, page, section",
    "questions": [
      [
        "Which metadata should accompany a chunk?",
        "<p>Store enough provenance and access information to retrieve, cite, refresh, and authorize the chunk.</p><ul><li><strong>Identity:</strong> Include document ID, chunk ID, source version, and model/index version where relevant.</li><li><strong>Location:</strong> Record page, section, heading path, or source offsets appropriate to the document.</li><li><strong>Access:</strong> Preserve tenant and permission scope and enforce them at retrieval time.</li></ul><p><strong>Remember:</strong> Metadata is operational infrastructure, not just a citation label.</p>"
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
