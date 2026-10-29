const topics = [
  {
    "title": "Accuracy, Precision, Recall, F1",
    "questions": [
      [
        "How do accuracy, precision, recall, and F1 apply to NLP tasks?",
        "<p>They measure classification or labeling performance according to defined positive classes or label sets.</p><ul><li><strong>Accuracy:</strong> Measure the fraction of correct predictions.</li><li><strong>Precision and recall:</strong> Measure correctness among predicted positives and coverage of actual positives.</li><li><strong>F1:</strong> Combine precision and recall; specify class averaging and evaluation units.</li></ul><p class=\"formula\"><strong>Formula:</strong> <code>Accuracy = correct / total; Precision = TP / (TP + FP); Recall = TP / (TP + FN); F1 = 2 * Precision * Recall / (Precision + Recall)</code></p><p class=\"example\"><strong>Example:</strong> For entity extraction, a benchmark may require both the correct entity span and the correct entity type.</p><p><strong>Remember:</strong> Define the labels, units, and averaging before reporting a score.</p>"
      ],
      [
        "Why can an NLP system have high accuracy but poor useful performance?",
        "<p>Class imbalance and mismatched evaluation units can hide important errors.</p><ul><li><strong>Majority class:</strong> Predicting the frequent label may produce a high overall score.</li><li><strong>Rare classes:</strong> Inspect per-class precision, recall, and F1.</li><li><strong>NER:</strong> Token accuracy is different from exact entity-span evaluation.</li></ul><p><strong>Remember:</strong> A high aggregate score can hide failures on important examples.</p>"
      ]
    ]
  },
  {
    "title": "BLEU - machine translation",
    "questions": [
      [
        "What is BLEU?",
        "<p>BLEU compares generated translations with reference text using modified n-gram precision and a brevity penalty.</p><ul><li><strong>Overlap:</strong> Reward matching n-gram occurrences with clipped counts.</li><li><strong>Length:</strong> Penalize translations that are too short relative to references.</li><li><strong>Scope:</strong> Corpus BLEU is a traditional comparison measure, not a guarantee of semantic correctness.</li></ul><p><strong>Remember:</strong> BLEU measures reference overlap while discouraging overly short outputs.</p><p><a href=\"https://aclanthology.org/P02-1040/\" target=\"_blank\" rel=\"noopener noreferrer\">BLEU paper</a></p>"
      ],
      [
        "Why can BLEU miss a good translation?",
        "<p>Several valid translations can express the same meaning using different wording.</p><ul><li><strong>References:</strong> A limited reference set cannot list every correct phrasing.</li><li><strong>Overlap:</strong> Different synonyms or word order may reduce matches.</li><li><strong>Assessment:</strong> Combine automatic scores with suitable human or semantic evaluation.</li></ul><p><strong>Remember:</strong> Low overlap can reflect different wording rather than wrong meaning.</p>"
      ]
    ]
  },
  {
    "title": "ROUGE - summarization",
    "questions": [
      [
        "What is ROUGE?",
        "<p>ROUGE is a family of measures comparing generated summaries with reference summaries through overlap patterns.</p><ul><li><strong>ROUGE-N:</strong> Compare n-gram matches such as unigrams or bigrams.</li><li><strong>ROUGE-L:</strong> Use a longest-common-subsequence relationship.</li><li><strong>Reporting:</strong> State the variant and whether precision, recall, or F1 is reported.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Variant</th><th scope=\"col\">Overlap pattern</th></tr></thead><tbody><tr><th scope=\"row\">ROUGE-1</th><td>Unigram matches</td></tr><tr><th scope=\"row\">ROUGE-2</th><td>Bigram matches</td></tr><tr><th scope=\"row\">ROUGE-L</th><td>Longest common subsequence</td></tr></tbody></table></div><p><strong>Remember:</strong> ROUGE is a metric family, not one single number with one interpretation.</p><p><a href=\"https://aclanthology.org/W04-1013/\" target=\"_blank\" rel=\"noopener noreferrer\">ROUGE paper</a></p>"
      ],
      [
        "Does high ROUGE prove a summary is factually correct?",
        "<p>No; overlap with reference wording does not verify every statement in the summary.</p><ul><li><strong>Facts:</strong> A summary can reuse many reference words yet alter a critical detail.</li><li><strong>Coverage:</strong> A correct paraphrase may receive lower overlap.</li><li><strong>Evaluation:</strong> Check factual consistency and usefulness separately.</li></ul><p><strong>Remember:</strong> Reference overlap is different from factual verification.</p>"
      ]
    ]
  },
  {
    "title": "Perplexity - language models",
    "questions": [
      [
        "How should perplexity be used when evaluating language models?",
        "<p>Use it to measure reference-token likelihood under a clearly defined probabilistic evaluation setup.</p><ul><li><strong>Held-out data:</strong> Avoid evaluating memorized training examples as generalization evidence.</li><li><strong>Comparability:</strong> Match tokenizer, dataset, and context-handling protocol.</li><li><strong>Limits:</strong> Perplexity does not directly measure factuality, safety, or instruction following.</li></ul><p class=\"formula\"><strong>Formula:</strong> <code>Perplexity = exp(average negative log-probability of the evaluated reference tokens)</code></p><p><strong>Remember:</strong> Comparable perplexity needs comparable token units and evaluation conditions.</p>"
      ],
      [
        "Can we directly compare perplexities from models with different tokenizers?",
        "<p>Usually not meaningfully without accounting for the different units and evaluation protocol.</p><ul><li><strong>Units:</strong> One model token may represent a different amount of text from another.</li><li><strong>Averaging:</strong> Per-token negative log-likelihood changes with segmentation.</li><li><strong>Alternatives:</strong> Use a stated common normalization when justified and compare task outcomes as well.</li></ul><p><strong>Remember:</strong> Different tokenization changes what one unit of perplexity measures.</p>"
      ]
    ]
  },
  {
    "title": "BERTScore - semantic similarity",
    "questions": [
      [
        "What is BERTScore?",
        "<p>BERTScore compares candidate and reference text using contextual token-embedding similarities.</p><ul><li><strong>Representations:</strong> Encode token occurrences using a selected contextual model.</li><li><strong>Matching:</strong> Align token similarities to summarize candidate-reference agreement.</li><li><strong>Variants:</strong> Scores depend on the model, settings, and any normalization choices.</li></ul><p><strong>Remember:</strong> BERTScore uses contextual similarity instead of only exact word overlap.</p><p><a href=\"https://arxiv.org/abs/1904.09675\" target=\"_blank\" rel=\"noopener noreferrer\">BERTScore paper</a></p>"
      ],
      [
        "Does BERTScore verify factual correctness?",
        "<p>No; contextual similarity can remain high even when an important fact changes.</p><ul><li><strong>Similarity:</strong> Measure representational agreement with the reference.</li><li><strong>Errors:</strong> Negation, quantities, or entity substitutions can need separate checks.</li><li><strong>Use:</strong> Combine it with task-specific validation and human judgment when needed.</li></ul><p><strong>Remember:</strong> Semantic similarity is not automatic fact checking.</p>"
      ]
    ]
  },
  {
    "title": "Human evaluation",
    "questions": [
      [
        "Why is human evaluation useful for NLP systems?",
        "<p>People can assess task qualities that a single automatic metric may miss.</p><ul><li><strong>Criteria:</strong> Define dimensions such as correctness, relevance, clarity, and faithfulness.</li><li><strong>Procedure:</strong> Use representative examples and clear rating instructions.</li><li><strong>Reliability:</strong> Compare raters and review disagreements rather than assuming one judgment is universal.</li></ul><p><strong>Remember:</strong> Human evaluation needs a rubric, not just an impression.</p>"
      ],
      [
        "How can we make human evaluation more consistent?",
        "<p>Use explicit criteria, calibrated examples, and a controlled comparison procedure.</p><ul><li><strong>Rubric:</strong> Define what good and bad performance look like.</li><li><strong>Blinding:</strong> Hide model identities when appropriate to reduce expectation bias.</li><li><strong>Agreement:</strong> Use multiple raters or adjudication to understand inconsistent judgments.</li></ul><p><strong>Remember:</strong> Consistent instructions make human judgments easier to compare.</p>"
      ]
    ]
  },
  {
    "title": "Exact Match (EM) - QA tasks",
    "questions": [
      [
        "What is Exact Match in question answering?",
        "<p>Exact Match scores whether a predicted answer matches an accepted reference under the benchmark's normalization rules.</p><ul><li><strong>Binary result:</strong> Each example commonly receives a match or non-match score.</li><li><strong>Normalization:</strong> Rules may ignore case, punctuation, or articles, depending on the benchmark.</li><li><strong>Aggregation:</strong> Average these outcomes across examples.</li></ul><p class=\"formula\"><strong>Formula:</strong> <code>EM = mean(match(prediction, any accepted reference after specified normalization))</code></p><p><strong>Remember:</strong> Exact means exact under the stated evaluation rules.</p>"
      ],
      [
        "Why can Exact Match be harsh on a valid answer?",
        "<p>A correct answer can use a different acceptable form not captured by the references or normalization.</p><ul><li><strong>Wording:</strong> Equivalent paraphrases may differ as strings.</li><li><strong>References:</strong> Multiple accepted answers improve coverage but cannot cover every case.</li><li><strong>Complement:</strong> Token-overlap or semantic checks can add context without replacing correctness assessment.</li></ul><p><strong>Remember:</strong> An exact string mismatch is not always a meaning mismatch.</p>"
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
