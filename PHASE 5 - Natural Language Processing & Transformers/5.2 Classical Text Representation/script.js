const topics = [
  {
    "title": "Bag of Words (BoW)",
    "questions": [
      [
        "What is a Bag of Words representation?",
        "<p>Bag of Words represents text using counts or presence of vocabulary items.</p><ul><li><strong>Vocabulary:</strong> Assign one feature position to each known term.</li><li><strong>Values:</strong> Store how often a term appears, or whether it appears.</li><li><strong>Limitation:</strong> Ordinary unigram BoW does not preserve word order.</li></ul><p class=\"example\"><strong>Example:</strong> With vocabulary [cat, dog], the document cat cat dog has count vector [2, 1].</p><p><strong>Remember:</strong> BoW counts what appears, not the sequence it appears in.</p>"
      ],
      [
        "Can Bag of Words distinguish sentences with the same words in different orders?",
        "<p>Unigram BoW cannot distinguish them when their word counts are identical.</p><ul><li><strong>Example:</strong> Dog bites man and man bites dog contain the same unigram counts.</li><li><strong>Missing information:</strong> The representation loses who acted on whom.</li><li><strong>Extension:</strong> Word n-grams can preserve some local ordering information.</li></ul><p><strong>Remember:</strong> Identical counts can hide different meanings.</p>"
      ]
    ]
  },
  {
    "title": "TF-IDF - formula and intuition",
    "questions": [
      [
        "What is TF-IDF?",
        "<p>TF-IDF weights a term by its frequency in a document and its rarity across documents.</p><ul><li><strong>TF:</strong> Measure how strongly the term occurs within the document.</li><li><strong>IDF:</strong> Give less weight to terms found in many documents.</li><li><strong>Variants:</strong> Implementations can use smoothing, logarithmic TF, and vector normalization.</li></ul><p class=\"formula\"><strong>Formula:</strong> <code>TF-IDF(term, doc) = TF(term, doc) * IDF(term)</code></p><p><strong>Remember:</strong> Frequent here but rare across documents often means informative.</p>"
      ],
      [
        "Why does TF-IDF downweight words that appear in nearly every document?",
        "<p>Such words usually help less with distinguishing one document from another.</p><ul><li><strong>Document frequency:</strong> Count documents containing the term, not all occurrences.</li><li><strong>Rarity:</strong> Terms in fewer documents receive a larger rarity weight.</li><li><strong>Caution:</strong> Informative for retrieval does not automatically mean semantically important.</li></ul><p class=\"formula\"><strong>Formula:</strong> <code>One simple unsmoothed choice: IDF(term) = log(N / df(term)); N is document count and df counts documents containing the term.</code></p><p><strong>Remember:</strong> IDF rewards document-level rarity, not raw repetition.</p><p><a href=\"https://scikit-learn.org/stable/modules/feature_extraction.html#text-feature-extraction\" target=\"_blank\" rel=\"noopener noreferrer\">scikit-learn text features</a></p>"
      ]
    ]
  },
  {
    "title": "N-grams - capturing context",
    "questions": [
      [
        "What are n-grams?",
        "<p>N-grams are contiguous sequences of n units, such as words or characters.</p><ul><li><strong>Unigram:</strong> One unit, such as machine.</li><li><strong>Bigram:</strong> Two consecutive units, such as machine learning.</li><li><strong>Context:</strong> Larger n captures more local order but can create many sparse features.</li></ul><p><strong>Remember:</strong> N tells you how many adjacent units form one feature.</p>"
      ],
      [
        "How do n-grams improve a simple text representation?",
        "<p>They add local word-order patterns that individual-word counts cannot capture.</p><ul><li><strong>Phrases:</strong> Treat not good differently from the separate words not and good.</li><li><strong>Order:</strong> Distinguish some phrases with the same individual words.</li><li><strong>Cost:</strong> More possible features require careful vocabulary and data management.</li></ul><p><strong>Remember:</strong> N-grams add local context at the cost of more features.</p>"
      ]
    ]
  },
  {
    "title": "One-hot encoding - and why it fails at scale",
    "questions": [
      [
        "What is one-hot encoding for tokens?",
        "<p>One-hot encoding represents a token with a vector containing one active position and zeros elsewhere.</p><ul><li><strong>Vocabulary:</strong> Give each token a separate coordinate.</li><li><strong>Identity:</strong> The active position identifies which token occurred.</li><li><strong>Limitation:</strong> It does not encode graded semantic similarity between different tokens.</li></ul><p class=\"example\"><strong>Example:</strong> For vocabulary [cat, dog, bird], the one-hot vector for dog is [0, 1, 0].</p><p><strong>Remember:</strong> One-hot represents identity, not meaning.</p>"
      ],
      [
        "Why is a large one-hot vocabulary inconvenient?",
        "<p>Vocabulary-sized representations grow large and provide no shared semantic structure by themselves.</p><ul><li><strong>Dimensions:</strong> Each additional vocabulary item needs another coordinate.</li><li><strong>Semantics:</strong> Different token vectors are equally orthogonal in the basic representation.</li><li><strong>Storage:</strong> Sparse storage saves zeros, but does not create useful semantic relationships.</li></ul><p><strong>Remember:</strong> Sparse storage reduces memory; learned embeddings add shared structure.</p>"
      ]
    ]
  },
  {
    "title": "Sparse vs dense representations",
    "questions": [
      [
        "What is the difference between sparse and dense text representations?",
        "<p>Sparse vectors contain mostly zero entries; dense vectors typically use many nonzero coordinates.</p><ul><li><strong>Sparse:</strong> BoW and TF-IDF often have vocabulary-sized feature spaces.</li><li><strong>Dense:</strong> Embeddings often use a smaller learned coordinate space.</li><li><strong>Meaning:</strong> Dense does not automatically mean good; usefulness depends on training and the task.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Representation</th><th scope=\"col\">Typical feature space</th><th scope=\"col\">Examples</th></tr></thead><tbody><tr><th scope=\"row\">Sparse</th><td>Many zero entries, often vocabulary-sized</td><td>BoW, TF-IDF</td></tr><tr><th scope=\"row\">Dense</th><td>Learned coordinates, often much smaller</td><td>Word and sentence embeddings</td></tr></tbody></table></div><p><strong>Remember:</strong> Sparse describes many zeros; dense describes filled coordinates.</p>"
      ],
      [
        "Are dense embeddings always better than sparse text features?",
        "<p>No; performance depends on the task, data, and evaluation conditions.</p><ul><li><strong>Exact terms:</strong> Sparse methods can be strong for keyword matching.</li><li><strong>Semantics:</strong> Suitable dense models can help with paraphrases and related meanings.</li><li><strong>Combination:</strong> Hybrid systems can benefit from both types of evidence.</li></ul><p><strong>Remember:</strong> Choose by measured task performance, not by vector type alone.</p>"
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
