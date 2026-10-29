const topics = [
  {
    "title": "NLTK - classic NLP",
    "questions": [
      [
        "What is NLTK used for?",
        "<p>NLTK provides tools and language resources for classical NLP and education.</p><ul><li><strong>Processing:</strong> Use tokenization, stemming, tagging, and other linguistic utilities.</li><li><strong>Resources:</strong> Access corpora and lexical datasets such as WordNet when installed.</li><li><strong>Requirements:</strong> Some functions need separate resource downloads.</li></ul><pre><code class=\"language-python\"># Requires nltk; this tokenizer does not need a downloaded model.\nfrom nltk.tokenize import wordpunct_tokenize\n\nprint(wordpunct_tokenize('NLP is useful!'))</code></pre><p><strong>Remember:</strong> NLTK combines classical NLP algorithms with language-learning resources.</p><p><a href=\"https://www.nltk.org/\" target=\"_blank\" rel=\"noopener noreferrer\">NLTK documentation</a></p>"
      ],
      [
        "Does installing NLTK include every dataset and model it can use?",
        "<p>No; some resources must be obtained separately.</p><ul><li><strong>Library:</strong> The package supplies code and interfaces.</li><li><strong>Data:</strong> Particular tokenizers, taggers, or corpora may need additional files.</li><li><strong>Reproducibility:</strong> Record resource requirements alongside the code.</li></ul><p><strong>Remember:</strong> Package installation and language-resource installation are different steps.</p>"
      ]
    ]
  },
  {
    "title": "spaCy - production NLP: NER, parsing",
    "questions": [
      [
        "What is spaCy used for?",
        "<p>spaCy organizes NLP processing into pipelines with components such as tokenization, entity recognition, and parsing.</p><ul><li><strong>Pipeline:</strong> Process text into a Doc object with token and span annotations.</li><li><strong>Models:</strong> Trained pipeline packages provide particular language capabilities.</li><li><strong>Customization:</strong> Add or configure components according to application needs.</li></ul><pre><code class=\"language-python\"># Requires spacy. A blank pipeline does not provide trained NER or parsing.\nimport spacy\n\nnlp = spacy.blank('en')\nnlp.add_pipe('sentencizer')\ndoc = nlp('NLP is useful. Tokenization comes first.')\nprint([sentence.text for sentence in doc.sents])</code></pre><p><strong>Remember:</strong> spaCy structures NLP as a configurable processing pipeline.</p><p><a href=\"https://spacy.io/usage/spacy-101\" target=\"_blank\" rel=\"noopener noreferrer\">spaCy 101</a></p>"
      ],
      [
        "Does a blank spaCy language pipeline automatically perform NER and parsing?",
        "<p>No; a blank language object does not include all trained annotation components.</p><ul><li><strong>Tokenizer:</strong> Language rules can provide basic tokenization.</li><li><strong>Components:</strong> NER and dependency parsing need appropriate trained components.</li><li><strong>Loading:</strong> Select a pipeline package that includes the capabilities you require.</li></ul><p><strong>Remember:</strong> A blank pipeline is a foundation, not a fully trained analyzer.</p>"
      ]
    ]
  },
  {
    "title": "transformers (HuggingFace) - pretrained models",
    "questions": [
      [
        "What does the transformers library provide?",
        "<p>It provides model architectures, pretrained checkpoint loading, tokenizers, and task-oriented tools.</p><ul><li><strong>Checkpoint:</strong> Load parameters associated with a specific model release.</li><li><strong>Inputs:</strong> Use the compatible tokenizer or processor.</li><li><strong>Tasks:</strong> Pipelines offer convenient inference when the checkpoint supports the requested task.</li></ul><pre><code class=\"language-python\"># Requires transformers and torch; downloads the checkpoint on first use.\nfrom transformers import pipeline\n\nclassifier = pipeline(\n    'sentiment-analysis',\n    model='distilbert/distilbert-base-uncased-finetuned-sst-2-english',\n    device=-1,\n)\nprint(classifier('This lesson is clear.'))</code></pre><p><strong>Remember:</strong> Match the task, checkpoint, and preprocessing tools.</p><p><a href=\"https://huggingface.co/docs/transformers/quicktour\" target=\"_blank\" rel=\"noopener noreferrer\">Transformers quickstart</a></p>"
      ],
      [
        "Can any pretrained checkpoint be used directly for any NLP task?",
        "<p>No; the architecture, training objective, and prediction head must suit the task.</p><ul><li><strong>Base checkpoint:</strong> May need a task-specific head and adaptation.</li><li><strong>Task-tuned checkpoint:</strong> Can already include a head trained for a particular label set.</li><li><strong>Validation:</strong> Check the model card and measure the target task.</li></ul><p><strong>Remember:</strong> Pretrained does not mean already trained for every task.</p>"
      ]
    ]
  },
  {
    "title": "datasets (HuggingFace) - loading datasets",
    "questions": [
      [
        "What is the datasets library used for?",
        "<p>It provides structured loading, transformation, and iteration over datasets.</p><ul><li><strong>Loading:</strong> Read supported local files or dataset repositories.</li><li><strong>Transformation:</strong> Apply processing through methods such as map.</li><li><strong>Splits:</strong> Preserve train, validation, and test separation during the workflow.</li></ul><pre><code class=\"language-python\"># Requires datasets. This example uses in-memory data without a download.\nfrom datasets import Dataset\n\ndata = Dataset.from_dict({'text': ['good lesson', 'unclear lesson'], 'label': [1, 0]})\nprint(data[0])</code></pre><p><strong>Remember:</strong> Datasets manages examples and splits; it does not train the model.</p><p><a href=\"https://huggingface.co/docs/datasets/quickstart\" target=\"_blank\" rel=\"noopener noreferrer\">Datasets quickstart</a></p>"
      ],
      [
        "Why keep training and evaluation splits separate when using datasets?",
        "<p>Evaluation should measure the selected procedure on examples that did not guide fitting or tuning.</p><ul><li><strong>Training:</strong> Learn model parameters and learned preprocessing.</li><li><strong>Validation:</strong> Make configuration and selection decisions.</li><li><strong>Test:</strong> Reserve suitable untouched examples for the final evaluation.</li></ul><p><strong>Remember:</strong> Convenient data loading does not remove the need for clean evaluation boundaries.</p>"
      ]
    ]
  },
  {
    "title": "sentence-transformers - sentence embeddings",
    "questions": [
      [
        "What is sentence-transformers used for?",
        "<p>It provides tools and models that embed sentences or passages for tasks such as semantic search.</p><ul><li><strong>Encoding:</strong> Map texts into fixed-size vector representations.</li><li><strong>Comparison:</strong> Compare suitable embeddings to retrieve or group related texts.</li><li><strong>Choice:</strong> Follow the selected model's intended task, language, and input conventions.</li></ul><pre><code class=\"language-python\"># Requires sentence-transformers; downloads this model on first use.\nfrom sentence_transformers import SentenceTransformer\n\nmodel = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')\nvectors = model.encode(['A cat is sleeping.', 'A kitten is resting.'], normalize_embeddings=True)\ncosine_similarity = float(vectors[0] @ vectors[1])\nprint(cosine_similarity)</code></pre><p><strong>Remember:</strong> Sentence embeddings make whole-text similarity practical.</p><p><a href=\"https://sbert.net/docs/quickstart.html\" target=\"_blank\" rel=\"noopener noreferrer\">Sentence Transformers quickstart</a></p>"
      ],
      [
        "Should we assume every transformer checkpoint produces useful sentence-search vectors?",
        "<p>No; the representation and training objective must support the intended similarity task.</p><ul><li><strong>Pooling:</strong> Token states need an appropriate aggregation strategy.</li><li><strong>Training:</strong> Retrieval-oriented adaptation can make vector similarity more meaningful.</li><li><strong>Evaluation:</strong> Test retrieval or semantic matching on the target data.</li></ul><p><strong>Remember:</strong> A transformer backbone alone is not a guarantee of a good search embedding.</p>"
      ]
    ]
  },
  {
    "title": "tiktoken - OpenAI tokenizer (BPE)",
    "questions": [
      [
        "What is tiktoken?",
        "<p>tiktoken is a fast tokenizer library used to encode and decode text with supported OpenAI-style BPE encodings.</p><ul><li><strong>Encoding:</strong> Convert text to token IDs with a chosen encoding.</li><li><strong>Decoding:</strong> Reconstruct text from a valid sequence of IDs.</li><li><strong>Compatibility:</strong> Match the encoding to the intended model or explicitly document the encoding used.</li></ul><pre><code class=\"language-python\"># Requires tiktoken; the first use may download encoding data.\nimport tiktoken\n\nencoding = tiktoken.get_encoding('cl100k_base')  # An explicit encoding, not every model's tokenizer.\ntoken_ids = encoding.encode('Hello, NLP!')\nprint(token_ids, len(token_ids))\nassert encoding.decode(token_ids) == 'Hello, NLP!'</code></pre><p><strong>Remember:</strong> tiktoken converts text and token IDs; it does not run a language model.</p><p><a href=\"https://developers.openai.com/cookbook/examples/how_to_count_tokens_with_tiktoken\" target=\"_blank\" rel=\"noopener noreferrer\">Official tiktoken guide</a></p>"
      ],
      [
        "Does tokenizing visible text always give the full API request token count?",
        "<p>No; complete requests can include formatting, tools, modalities, and other model-specific input structure.</p><ul><li><strong>Plain text:</strong> Local tokenization can count tokens for the supplied string.</li><li><strong>Request structure:</strong> Message boundaries and other fields can add tokens.</li><li><strong>Verification:</strong> Use the provider's documented counting method for the actual request format.</li></ul><p><strong>Remember:</strong> Visible text tokens are not necessarily the entire request.</p><p><a href=\"https://developers.openai.com/api/docs/guides/token-counting\" target=\"_blank\" rel=\"noopener noreferrer\">Official request token-counting guidance</a></p>"
      ]
    ]
  },
  {
    "title": "evaluate - HuggingFace metrics",
    "questions": [
      [
        "What is the evaluate library used for?",
        "<p>evaluate supplies interfaces for loading and computing evaluation measurements, including supported NLP metrics.</p><ul><li><strong>Inputs:</strong> Provide predictions and references in the metric's required format.</li><li><strong>Computation:</strong> Use the selected metric implementation and its configuration.</li><li><strong>Reporting:</strong> Record the metric, variant, and preprocessing to make results comparable.</li></ul><pre><code class=\"language-python\"># Requires evaluate; the first load may download the selected metric.\nimport evaluate\n\nmetric = evaluate.load('accuracy')\nresult = metric.compute(predictions=[1, 0, 1], references=[1, 1, 1])\nprint(result)  # Accuracy is 2 / 3.</code></pre><p><strong>Remember:</strong> A metric interface helps calculate scores; it does not choose the right evaluation for you.</p><p><a href=\"https://huggingface.co/docs/evaluate/index\" target=\"_blank\" rel=\"noopener noreferrer\">Evaluate documentation</a></p>"
      ],
      [
        "Why must we document metric settings and input normalization?",
        "<p>Different implementations and preprocessing choices can produce different scores for the same outputs.</p><ul><li><strong>Settings:</strong> Specify averaging, tokenization, smoothing, or metric variants as relevant.</li><li><strong>Normalization:</strong> State how case, punctuation, and references are handled.</li><li><strong>Reproducibility:</strong> Keep the evaluation procedure consistent across candidate models.</li></ul><p><strong>Remember:</strong> A score is meaningful only with its evaluation procedure.</p>"
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
