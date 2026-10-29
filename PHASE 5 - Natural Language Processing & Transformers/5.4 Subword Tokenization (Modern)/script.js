const topics = [
  {
    "title": "Byte Pair Encoding (BPE) - used in GPT",
    "questions": [
      [
        "What is Byte Pair Encoding in tokenization?",
        "<p>BPE builds a reusable subword vocabulary by repeatedly merging frequent adjacent pieces during training.</p><ul><li><strong>Start:</strong> Begin with small units, which may be characters or bytes depending on the tokenizer.</li><li><strong>Merge:</strong> Add frequent adjacent combinations to the learned vocabulary.</li><li><strong>Tokenize:</strong> Apply the learned tokenizer to new text using its own rules.</li></ul><p><strong>Remember:</strong> BPE learns useful larger pieces from smaller units.</p><p><a href=\"https://huggingface.co/docs/transformers/tokenizer_summary\" target=\"_blank\" rel=\"noopener noreferrer\">Subword tokenization guide</a></p>"
      ],
      [
        "Why is byte-level BPE useful for text coverage?",
        "<p>Byte-level BPE starts from a byte inventory that can encode arbitrary valid text bytes.</p><ul><li><strong>Coverage:</strong> Represent unfamiliar words without requiring a whole-word vocabulary entry.</li><li><strong>Efficiency:</strong> Learned merges compress common byte patterns into fewer tokens.</li><li><strong>Limit:</strong> An unfamiliar script or spelling may still require many tokens.</li></ul><p><strong>Remember:</strong> Byte coverage avoids missing word entries, not long token sequences.</p>"
      ]
    ]
  },
  {
    "title": "WordPiece - used in BERT",
    "questions": [
      [
        "What is WordPiece tokenization?",
        "<p>WordPiece is a subword tokenization approach used by the original BERT tokenizers.</p><ul><li><strong>Vocabulary:</strong> Reuse pieces rather than storing only whole words.</li><li><strong>Splitting:</strong> A word can map to several vocabulary entries.</li><li><strong>Convention:</strong> Original BERT-style tokenizers often mark continuation pieces with two hash characters.</li></ul><p class=\"example\"><strong>Example:</strong> A BERT-style continuation marker may turn a word into an initial piece plus a piece written with a ## prefix; the exact split depends on the vocabulary.</p><p><strong>Remember:</strong> WordPiece represents many words using a shared piece vocabulary.</p>"
      ],
      [
        "Does WordPiece always guarantee a representation for every word?",
        "<p>Not necessarily; coverage depends on the vocabulary and tokenizer rules.</p><ul><li><strong>Unknowns:</strong> Some WordPiece tokenizers return an unknown-token marker for an unsegmentable word.</li><li><strong>Vocabulary:</strong> Learned pieces determine which spellings can be represented.</li><li><strong>Comparison:</strong> Byte-level tokenizers can offer different coverage behavior.</li></ul><p><strong>Remember:</strong> Subword tokenization reduces unknowns but does not always eliminate them.</p>"
      ]
    ]
  },
  {
    "title": "SentencePiece - used in T5, LLaMA",
    "questions": [
      [
        "What is SentencePiece?",
        "<p>SentencePiece is a tokenizer toolkit that can train models such as unigram tokenization or BPE directly from raw text.</p><ul><li><strong>Toolkit:</strong> It is not one single tokenization algorithm.</li><li><strong>Text handling:</strong> It represents whitespace so segmentation need not depend on splitting at spaces first.</li><li><strong>Examples:</strong> T5 and earlier LLaMA versions use SentencePiece-based tokenizers.</li></ul><p><strong>Remember:</strong> SentencePiece is a toolkit; the checkpoint determines the actual algorithm.</p><p><a href=\"https://github.com/google/sentencepiece\" target=\"_blank\" rel=\"noopener noreferrer\">SentencePiece project</a></p>"
      ],
      [
        "Do all LLaMA versions use the same tokenizer?",
        "<p>No; tokenizer choices can change across model generations.</p><ul><li><strong>Earlier models:</strong> LLaMA 1 and 2 use SentencePiece-based tokenization.</li><li><strong>LLaMA 3:</strong> Uses a different BPE tokenizer based on tiktoken.</li><li><strong>Compatibility:</strong> Load the tokenizer matching the exact checkpoint.</li></ul><p><strong>Remember:</strong> A model-family name does not guarantee one tokenizer forever.</p><p><a href=\"https://huggingface.co/meta-llama/Meta-Llama-3-8B\" target=\"_blank\" rel=\"noopener noreferrer\">Meta Llama 3 model card</a></p>"
      ]
    ]
  },
  {
    "title": "Special tokens: [CLS], [SEP], [PAD], [MASK], <eos>, <bos>",
    "questions": [
      [
        "What are special tokens?",
        "<p>Special tokens are reserved vocabulary items that signal structure or a model-specific role.</p><ul><li><strong>BERT-style markers:</strong> CLS, SEP, and MASK have roles defined by the training setup.</li><li><strong>Padding:</strong> PAD fills unused positions in a batch and is commonly paired with an attention mask.</li><li><strong>Boundaries:</strong> BOS and EOS can mark sequence starts and ends when the tokenizer uses them.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Marker</th><th scope=\"col\">Typical role, when supported</th></tr></thead><tbody><tr><th scope=\"row\">[CLS]</th><td>Special sequence representation position in BERT-style setups</td></tr><tr><th scope=\"row\">[SEP]</th><td>Separate segments or mark an input boundary</td></tr><tr><th scope=\"row\">[PAD]</th><td>Fill unused batch positions</td></tr><tr><th scope=\"row\">[MASK]</th><td>Mark masked-token input in suitable training or prediction setups</td></tr><tr><th scope=\"row\">&lt;bos&gt;</th><td>Beginning-of-sequence marker</td></tr><tr><th scope=\"row\">&lt;eos&gt;</th><td>End-of-sequence marker</td></tr></tbody></table></div><p><strong>Remember:</strong> Special-token meaning depends on the model, not just its spelling.</p>"
      ],
      [
        "Why must we handle padding and attention masks together?",
        "<p>Padding makes batch shapes compatible, while the mask tells a model which positions should be ignored.</p><ul><li><strong>Batching:</strong> Shorter examples may be extended to the batch length.</li><li><strong>Mask:</strong> Distinguish real input positions from padding according to the API convention.</li><li><strong>Loss:</strong> Padded target positions may also need exclusion from the training objective.</li></ul><p><strong>Remember:</strong> Padding fills space; masks prevent that space from becoming evidence.</p>"
      ]
    ]
  },
  {
    "title": "Token IDs - how text maps to integers",
    "questions": [
      [
        "What is a token ID?",
        "<p>A token ID is the integer index assigned to a token in a particular tokenizer's vocabulary.</p><ul><li><strong>Mapping:</strong> A tokenizer converts text pieces into their corresponding indices.</li><li><strong>Embedding:</strong> The model looks up vectors using those indices.</li><li><strong>Meaning:</strong> The numerical size of an ID does not measure semantic importance.</li></ul><p class=\"example\"><strong>Example:</strong> In a toy vocabulary, cat might have ID 7. That number is only a lookup address; another tokenizer may use a completely different ID.</p><p><strong>Remember:</strong> Token IDs are vocabulary addresses, not meanings.</p>"
      ],
      [
        "Can the same text have different token IDs in different models?",
        "<p>Yes; different tokenizers can segment text differently and use different vocabulary mappings.</p><ul><li><strong>Pieces:</strong> One tokenizer may use one token where another uses several.</li><li><strong>Indices:</strong> Even equivalent pieces can have different IDs.</li><li><strong>Rule:</strong> Keep model weights and tokenizer configuration compatible.</li></ul><p><strong>Remember:</strong> The IDs belong to the tokenizer, not universally to the text.</p>"
      ]
    ]
  },
  {
    "title": "Vocabulary size tradeoffs",
    "questions": [
      [
        "What changes when a tokenizer's vocabulary size increases?",
        "<p>A larger vocabulary can shorten token sequences while increasing vocabulary-dependent model costs.</p><ul><li><strong>Sequence length:</strong> More common strings may fit into single tokens.</li><li><strong>Parameters:</strong> Embedding and output layers generally grow with vocabulary size.</li><li><strong>Coverage:</strong> Benefits vary across languages, domains, and the learned vocabulary.</li></ul><p><strong>Remember:</strong> More entries can mean fewer tokens but larger vocabulary layers.</p>"
      ],
      [
        "Is the largest possible tokenizer vocabulary always best?",
        "<p>No; vocabulary design balances sequence length, model size, coverage, and training efficiency.</p><ul><li><strong>Small vocabulary:</strong> Reuse many small units but often create longer sequences.</li><li><strong>Large vocabulary:</strong> Store more entries, including ones with fewer training examples.</li><li><strong>Choice:</strong> Evaluate the languages and domains the model must handle.</li></ul><p><strong>Remember:</strong> Choose an effective vocabulary, not simply the biggest one.</p>"
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
