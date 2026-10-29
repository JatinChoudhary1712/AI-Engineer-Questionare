const topics = [
  {
    "title": "Why embeddings - dense, semantic vectors",
    "questions": [
      [
        "What is a word embedding?",
        "<p>A word embedding is a learned dense vector representing a word in a numerical space.</p><ul><li><strong>Learning:</strong> Training determines which relationships the coordinates capture.</li><li><strong>Similarity:</strong> Related usages may produce nearby vectors.</li><li><strong>Use:</strong> Supply numerical inputs or similarity features for downstream tasks.</li></ul><p><strong>Remember:</strong> An embedding is a learned representation, not a dictionary definition.</p>"
      ],
      [
        "Why use embeddings instead of raw token IDs?",
        "<p>Embeddings provide learned feature values, while token IDs are only arbitrary identifiers.</p><ul><li><strong>IDs:</strong> A larger integer does not mean a word is more important.</li><li><strong>Lookup:</strong> An embedding table maps each known ID to a vector.</li><li><strong>Relationships:</strong> Training can make useful patterns available to the model.</li></ul><p><strong>Remember:</strong> IDs identify tokens; embeddings represent them.</p>"
      ]
    ]
  },
  {
    "title": "Word2Vec - CBOW vs Skip-gram",
    "questions": [
      [
        "What is Word2Vec, and how do CBOW and Skip-gram differ?",
        "<p>Word2Vec learns word vectors from local word-prediction tasks.</p><ul><li><strong>CBOW:</strong> Predict a target word using surrounding context words.</li><li><strong>Skip-gram:</strong> Predict surrounding context words using a target word.</li><li><strong>Result:</strong> Reuse learned vectors as static word representations.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Word2Vec variant</th><th scope=\"col\">Input signal</th><th scope=\"col\">Prediction target</th></tr></thead><tbody><tr><th scope=\"row\">CBOW</th><td>Surrounding context words</td><td>A target word</td></tr><tr><th scope=\"row\">Skip-gram</th><td>A target word</td><td>Surrounding context words</td></tr></tbody></table></div><p><strong>Remember:</strong> CBOW uses context to predict a word; Skip-gram uses a word to predict context.</p>"
      ],
      [
        "Are Word2Vec vectors contextual embeddings?",
        "<p>Ordinary Word2Vec assigns each vocabulary word one learned vector, regardless of the current sentence.</p><ul><li><strong>Static lookup:</strong> Reuse the same stored vector for each occurrence.</li><li><strong>Ambiguity:</strong> Bank has one vector even when used in different senses.</li><li><strong>Contrast:</strong> Contextual models compute representations that depend on surrounding text.</li></ul><p><strong>Remember:</strong> Word2Vec learns from context but stores static word vectors.</p>"
      ]
    ]
  },
  {
    "title": "GloVe - global co-occurrence statistics",
    "questions": [
      [
        "What is GloVe?",
        "<p>GloVe learns word vectors using global word co-occurrence statistics from a corpus.</p><ul><li><strong>Counts:</strong> Record which words appear near one another.</li><li><strong>Training:</strong> Fit vector relationships to information in the co-occurrence matrix.</li><li><strong>Output:</strong> Produce reusable static word embeddings.</li></ul><p><strong>Remember:</strong> GloVe turns corpus-wide co-occurrence patterns into vectors.</p><p><a href=\"https://nlp.stanford.edu/projects/glove/\" target=\"_blank\" rel=\"noopener noreferrer\">GloVe project</a></p>"
      ],
      [
        "How does GloVe differ from Word2Vec at a basic level?",
        "<p>GloVe explicitly fits global co-occurrence statistics, while Word2Vec trains local prediction tasks.</p><ul><li><strong>GloVe:</strong> Learn from a matrix summarizing corpus co-occurrences.</li><li><strong>Word2Vec:</strong> Learn through context-word prediction objectives.</li><li><strong>Common result:</strong> Both can yield useful static vectors with context-independent lookup.</li></ul><p><strong>Remember:</strong> Global statistics versus local prediction, both yielding word vectors.</p>"
      ]
    ]
  },
  {
    "title": "FastText - subword embeddings, handles OOV",
    "questions": [
      [
        "What is FastText's main idea for word embeddings?",
        "<p>FastText represents words using learned character n-gram information as well as word-level information.</p><ul><li><strong>Subwords:</strong> Reuse patterns inside related word spellings.</li><li><strong>Composition:</strong> Combine subword vectors to form a word representation.</li><li><strong>Coverage:</strong> Often construct vectors for words absent from the training vocabulary.</li></ul><p><strong>Remember:</strong> FastText shares information through pieces inside words.</p><p><a href=\"https://fasttext.cc/docs/en/unsupervised-tutorial.html\" target=\"_blank\" rel=\"noopener noreferrer\">FastText word vectors</a></p>"
      ],
      [
        "How can FastText represent an out-of-vocabulary word?",
        "<p>It can compose a representation from character n-grams with learned vectors.</p><ul><li><strong>Breakdown:</strong> Extract the unfamiliar word's character pieces.</li><li><strong>Reuse:</strong> Combine pieces that received useful training.</li><li><strong>Limit:</strong> A constructed vector is not guaranteed to capture the word's actual meaning.</li></ul><p><strong>Remember:</strong> Subword coverage helps with unfamiliar spellings, not perfect understanding.</p>"
      ]
    ]
  },
  {
    "title": "Cosine similarity on embeddings",
    "questions": [
      [
        "What does cosine similarity measure?",
        "<p>Cosine similarity measures how closely two nonzero vectors point in the same direction.</p><ul><li><strong>Direction:</strong> Compare alignment rather than raw vector length.</li><li><strong>Range:</strong> Mathematical values lie between minus one and one.</li><li><strong>Interpretation:</strong> A useful semantic comparison requires embeddings trained for that purpose.</li></ul><p class=\"formula\"><strong>Formula:</strong> <code>cosine(a, b) = dot(a, b) / (norm(a) * norm(b))</code></p><p><strong>Remember:</strong> Cosine compares direction, not magnitude.</p>"
      ],
      [
        "Does a high cosine similarity guarantee that two texts mean the same thing?",
        "<p>No; similarity reflects the embedding model and may miss important distinctions.</p><ul><li><strong>Negation:</strong> Similar wording with opposite meaning can still be close.</li><li><strong>Task:</strong> A retrieval embedding and a word embedding need not encode the same relationships.</li><li><strong>Edge case:</strong> Cosine is undefined when either vector has zero norm.</li></ul><p><strong>Remember:</strong> A similarity score is evidence to validate, not a semantic guarantee.</p>"
      ]
    ]
  },
  {
    "title": "Analogy tasks: king - man + woman = queen",
    "questions": [
      [
        "What is a word-embedding analogy task?",
        "<p>An analogy task tests whether vector offsets reflect a relationship between words.</p><ul><li><strong>Operation:</strong> Subtract one word vector and add another.</li><li><strong>Search:</strong> Find a nearby vocabulary vector to the resulting vector.</li><li><strong>Example:</strong> The classic king-minus-man-plus-woman illustration may retrieve queen for some embeddings.</li></ul><p class=\"formula\"><strong>Formula:</strong> <code>vector(king) - vector(man) + vector(woman) -&gt; search for a nearby word vector</code></p><p class=\"example\"><strong>Example:</strong> Queen is a classic illustrative retrieval result for some embeddings, not an identity guaranteed by the formula.</p><p><strong>Remember:</strong> Analogy arithmetic is an empirical pattern, not an exact language law.</p>"
      ],
      [
        "Why should we treat embedding analogy results cautiously?",
        "<p>They depend on training data, the evaluation method, and which relationships the model captures.</p><ul><li><strong>Reliability:</strong> Not every analogy is solved correctly or consistently.</li><li><strong>Bias:</strong> Learned vector relationships can reflect stereotypes in the corpus.</li><li><strong>Meaning:</strong> One successful result does not prove broad reasoning ability.</li></ul><p><strong>Remember:</strong> A neat analogy can coexist with errors and bias.</p>"
      ]
    ]
  },
  {
    "title": "Static vs contextual embeddings",
    "questions": [
      [
        "How do static and contextual embeddings differ?",
        "<p>Static embeddings reuse one vector per word; contextual embeddings vary with surrounding text.</p><ul><li><strong>Static:</strong> Word2Vec and GloVe usually return fixed vocabulary vectors.</li><li><strong>Contextual:</strong> A model such as BERT computes position-specific representations.</li><li><strong>Benefit:</strong> Context can help distinguish different uses of the same word.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Embedding</th><th scope=\"col\">Representation of a word</th><th scope=\"col\">Example family</th></tr></thead><tbody><tr><th scope=\"row\">Static</th><td>One vocabulary vector reused across occurrences</td><td>Word2Vec, GloVe</td></tr><tr><th scope=\"row\">Contextual</th><td>A vector computed for the current occurrence</td><td>BERT-style encoders</td></tr></tbody></table></div><p><strong>Remember:</strong> Static vectors identify a word; contextual vectors represent its current use.</p>"
      ],
      [
        "Why does context matter when representing an ambiguous word?",
        "<p>The same word can express different meanings in different sentences.</p><ul><li><strong>Example:</strong> Bank in a river description differs from bank in a finance discussion.</li><li><strong>Static limit:</strong> One stored word vector merges these usages.</li><li><strong>Contextual approach:</strong> Neighboring words influence the representation of that occurrence.</li></ul><p><strong>Remember:</strong> The sentence helps determine which meaning is relevant.</p>"
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
