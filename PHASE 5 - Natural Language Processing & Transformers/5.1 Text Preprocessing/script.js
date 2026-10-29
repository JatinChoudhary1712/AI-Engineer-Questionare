const topics = [
  {
    "title": "Tokenization - words, subwords, characters",
    "questions": [
      [
        "What is tokenization in NLP?",
        "<p>Tokenization splits text into units that a model can process.</p><ul><li><strong>Words:</strong> Use whole words as units when the tokenizer supports them.</li><li><strong>Subwords:</strong> Split words into reusable pieces to balance vocabulary size and coverage.</li><li><strong>Characters:</strong> Use individual characters, usually producing longer sequences.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Unit</th><th scope=\"col\">Example idea</th><th scope=\"col\">Tradeoff</th></tr></thead><tbody><tr><th scope=\"row\">Word</th><td>Whole vocabulary words</td><td>Larger vocabulary, unfamiliar-word issues</td></tr><tr><th scope=\"row\">Subword</th><td>Reusable pieces inside words</td><td>Balance sequence length and vocabulary</td></tr><tr><th scope=\"row\">Character</th><td>Individual characters</td><td>Small inventory, longer sequences</td></tr></tbody></table></div><p><strong>Remember:</strong> A token is a processing unit, not necessarily a word.</p>"
      ],
      [
        "How do word, subword, and character tokenization differ?",
        "<p>They choose different-sized units and therefore different vocabulary and sequence lengths.</p><ul><li><strong>Word tokens:</strong> Easy to interpret but can leave unfamiliar words outside the vocabulary.</li><li><strong>Subword tokens:</strong> Reuse pieces to represent many unfamiliar words.</li><li><strong>Character tokens:</strong> Need a small character inventory but usually create more steps.</li></ul><p><strong>Remember:</strong> Smaller units improve coverage but often lengthen sequences.</p>"
      ]
    ]
  },
  {
    "title": "Lowercasing, punctuation removal, whitespace normalization",
    "questions": [
      [
        "What is text normalization?",
        "<p>Text normalization makes selected text variations consistent before processing.</p><ul><li><strong>Case:</strong> Lowercasing can merge words that differ only in capitalization.</li><li><strong>Punctuation:</strong> Remove it only if the task does not need its information.</li><li><strong>Whitespace:</strong> Standardize spaces or line breaks when their differences are irrelevant.</li></ul><p><strong>Remember:</strong> Normalize what is irrelevant; preserve what carries meaning.</p>"
      ],
      [
        "Should every NLP pipeline lowercase text and remove punctuation?",
        "<p>No; preprocessing must match the task and the model's expected inputs.</p><ul><li><strong>Meaning:</strong> Capitalization and punctuation can change interpretation.</li><li><strong>Pretrained models:</strong> Follow the checkpoint's tokenizer rather than cleaning blindly.</li><li><strong>Validation:</strong> Compare preprocessing choices on representative examples.</li></ul><p class=\"example\"><strong>Example:</strong> Removing punctuation from C++ or lowercasing a named entity can discard information the task needs.</p><p><strong>Remember:</strong> Cleaning is a task-dependent choice, not a universal checklist.</p>"
      ]
    ]
  },
  {
    "title": "Stopword removal - when to and when not to",
    "questions": [
      [
        "What are stopwords, and why might we remove them?",
        "<p>Stopwords are frequent words that some traditional pipelines exclude to reduce unhelpful features.</p><ul><li><strong>Examples:</strong> Lists often include words such as the, a, and is.</li><li><strong>Traditional uses:</strong> Removal may help some keyword-search or bag-of-words tasks.</li><li><strong>Decision:</strong> Frequency alone does not prove a word is irrelevant.</li></ul><p><strong>Remember:</strong> A common word can still carry important information.</p>"
      ],
      [
        "When should we keep stopwords?",
        "<p>Keep stopwords when they affect meaning or are expected by the model.</p><ul><li><strong>Negation:</strong> Removing not can reverse a sentiment statement.</li><li><strong>Sequence models:</strong> Pretrained language models usually expect natural text with function words.</li><li><strong>Tasks:</strong> Translation and grammatical analysis depend on words that a stopword list may remove.</li></ul><p class=\"example\"><strong>Example:</strong> I like it and I do not like it should not become equivalent because not was removed.</p><p><strong>Remember:</strong> Keep small words when the meaning depends on them.</p>"
      ]
    ]
  },
  {
    "title": "Stemming vs Lemmatization",
    "questions": [
      [
        "What is the difference between stemming and lemmatization?",
        "<p>Stemming applies word-cutting rules; lemmatization aims to return a word's dictionary form.</p><ul><li><strong>Stemming:</strong> Can produce fragments that are not real words.</li><li><strong>Lemmatization:</strong> Uses vocabulary and often grammatical information.</li><li><strong>Tradeoff:</strong> Choose according to language, task, and available linguistic tools.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Method</th><th scope=\"col\">How it works</th><th scope=\"col\">Typical output</th></tr></thead><tbody><tr><th scope=\"row\">Stemming</th><td>Apply string-cutting rules</td><td>A stem that may not be a dictionary word</td></tr><tr><th scope=\"row\">Lemmatization</th><td>Use linguistic information and vocabulary</td><td>A dictionary base form</td></tr></tbody></table></div><p><strong>Remember:</strong> A stem is a rule-based shortcut; a lemma is a linguistic base form.</p>"
      ],
      [
        "Why can grammatical context matter for lemmatization?",
        "<p>The correct dictionary form can depend on the word's grammatical role and meaning.</p><ul><li><strong>Part of speech:</strong> The same spelling can belong to different grammatical categories.</li><li><strong>Ambiguity:</strong> Saw can be a noun or a past-tense verb with lemma see.</li><li><strong>Tools:</strong> A lemmatizer's result depends on its language resources and supplied context.</li></ul><p><strong>Remember:</strong> The right base form may require knowing how the word is used.</p>"
      ]
    ]
  },
  {
    "title": "Sentence segmentation",
    "questions": [
      [
        "What is sentence segmentation?",
        "<p>Sentence segmentation identifies sentence boundaries within a text.</p><ul><li><strong>Purpose:</strong> Break documents into units for later processing.</li><li><strong>Cues:</strong> Use punctuation, abbreviations, and learned or rule-based context.</li><li><strong>Uses:</strong> Support document analysis, sentence embeddings, and sentence-level evaluation.</li></ul><p><strong>Remember:</strong> Sentence segmentation decides where one sentence ends and the next begins.</p>"
      ],
      [
        "Why is splitting on every period unreliable for sentence segmentation?",
        "<p>A period does not always mark the end of a sentence.</p><ul><li><strong>Abbreviations:</strong> Dr. and similar forms can occur inside a sentence.</li><li><strong>Numbers:</strong> Decimal points are not sentence boundaries.</li><li><strong>Context:</strong> Quotations and language-specific conventions need appropriate handling.</li></ul><p><strong>Remember:</strong> A period is a clue, not a complete boundary rule.</p>"
      ]
    ]
  },
  {
    "title": "Handling special tokens: URLs, emails, hashtags",
    "questions": [
      [
        "How should a preprocessing pipeline handle URLs, emails, and hashtags?",
        "<p>Choose whether to preserve, replace, or split these patterns according to the task.</p><ul><li><strong>Preserve:</strong> Keep exact values when they carry useful information.</li><li><strong>Replace:</strong> Use consistent placeholders when only the pattern matters.</li><li><strong>Hashtags:</strong> Consider whether the marker, text, or both matter for the task.</li></ul><p><strong>Remember:</strong> Handle patterns intentionally instead of deleting them blindly.</p>"
      ],
      [
        "Why might we replace a URL with a placeholder?",
        "<p>A placeholder can retain the presence of a link without treating every address as a separate feature.</p><ul><li><strong>Generalization:</strong> Merge many task-irrelevant link strings.</li><li><strong>Information:</strong> Keep that a URL occurred in the message.</li><li><strong>Limitation:</strong> Replacement loses address details that could matter for phishing or domain analysis.</li></ul><p><strong>Remember:</strong> A placeholder keeps the pattern but removes its specific value.</p>"
      ]
    ]
  },
  {
    "title": "Unicode and encoding issues (utf-8)",
    "questions": [
      [
        "What is the difference between Unicode and UTF-8?",
        "<p>Unicode defines characters and code points; UTF-8 encodes those code points as bytes.</p><ul><li><strong>Characters:</strong> A visible symbol may involve one or several code points.</li><li><strong>Encoding:</strong> UTF-8 represents code points with variable-length byte sequences.</li><li><strong>Reading:</strong> Decode files with the encoding that was actually used to write them.</li></ul><pre><code class=\"language-python\"># Standard-library example: choose the known encoding explicitly.\nfrom pathlib import Path\n\n# text = Path('document.txt').read_text(encoding='utf-8')\ntext = 'Hello'\nraw_bytes = text.encode('utf-8')\nassert raw_bytes.decode('utf-8') == text</code></pre><p><strong>Remember:</strong> Unicode describes characters; UTF-8 stores them as bytes.</p>"
      ],
      [
        "What causes garbled text or decoding errors?",
        "<p>Encoding mismatches and damaged byte sequences can make text unreadable or invalid.</p><ul><li><strong>Mismatch:</strong> Decoding bytes with the wrong encoding can produce incorrect characters.</li><li><strong>Errors:</strong> Invalid byte sequences can raise exceptions instead of yielding text.</li><li><strong>Handling:</strong> Use the correct encoding and inspect errors rather than silently discarding data.</li></ul><p><strong>Remember:</strong> Decode with the right encoding before cleaning the text.</p>"
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
