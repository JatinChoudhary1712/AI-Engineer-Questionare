const topics = [
  {
    "title": "Why transformers replaced RNNs - parallelism and long-range attention",
    "questions": [
      [
        "Why did transformers become popular for language modeling?",
        "<p>Transformers allow direct attention across positions and parallel computation across training tokens.</p><ul><li><strong>Parallel training:</strong> Process many positions together instead of recurrently updating one state at a time.</li><li><strong>Connections:</strong> Attention can link distant tokens without a long recurrent chain.</li><li><strong>Tradeoff:</strong> Standard full attention can be expensive for long sequences; RNNs still have useful applications.</li></ul><p><strong>Remember:</strong> Transformers improve training parallelism and direct context access.</p><p><a href=\"https://arxiv.org/abs/1706.03762\" target=\"_blank\" rel=\"noopener noreferrer\">Original transformer paper</a></p>"
      ],
      [
        "Are transformer generation steps all parallel?",
        "<p>Ordinary autoregressive generation still produces new tokens sequentially.</p><ul><li><strong>Training:</strong> Known target sequences allow parallel token-position computation with causal masks.</li><li><strong>Generation:</strong> Each next token depends on the previously generated tokens.</li><li><strong>Distinction:</strong> Parallel work within a step is different from generating all unknown future tokens at once.</li></ul><p><strong>Remember:</strong> Parallel training does not imply fully parallel autoregressive generation.</p>"
      ]
    ]
  },
  {
    "title": "Self-attention - every token attending to every other",
    "questions": [
      [
        "What is self-attention?",
        "<p>Self-attention updates token representations by combining information from positions in the same sequence.</p><ul><li><strong>Queries:</strong> Each position asks what information is relevant.</li><li><strong>Weights:</strong> Scores determine how much each allowed position contributes.</li><li><strong>Masks:</strong> Causal or padding masks restrict which positions can contribute.</li></ul><p><strong>Remember:</strong> Self-attention lets sequence positions exchange relevant information.</p>"
      ],
      [
        "Can every token always attend to every other token?",
        "<p>Only positions allowed by the model's attention pattern and masks can contribute.</p><ul><li><strong>Encoder attention:</strong> Often lets a real token access both left and right context.</li><li><strong>Causal attention:</strong> Blocks access to future positions.</li><li><strong>Padding:</strong> Masks can exclude padded positions from attention.</li></ul><p><strong>Remember:</strong> Attention access is defined by masks, not assumed to be unrestricted.</p>"
      ]
    ]
  },
  {
    "title": "Query, Key, Value (Q, K, V) - intuition and matrix formulation",
    "questions": [
      [
        "What do queries, keys, and values represent in attention?",
        "<p>Queries ask for information, keys indicate relevance, and values contain the information to combine.</p><ul><li><strong>Query:</strong> A learned representation of what the current position needs.</li><li><strong>Key:</strong> A learned representation used to score a candidate position.</li><li><strong>Value:</strong> A learned representation added to the weighted context.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Role</th><th scope=\"col\">Simple intuition</th></tr></thead><tbody><tr><th scope=\"row\">Query</th><td>What information does this position need?</td></tr><tr><th scope=\"row\">Key</th><td>How relevant is this candidate position?</td></tr><tr><th scope=\"row\">Value</th><td>What information can this position contribute?</td></tr></tbody></table></div><p><strong>Remember:</strong> Query asks, key matches, value supplies.</p>"
      ],
      [
        "How are Q, K, and V computed in self-attention?",
        "<p>Learned linear projections transform the input representations into queries, keys, and values.</p><ul><li><strong>Shared input:</strong> Start with the current sequence representation matrix X.</li><li><strong>Parameters:</strong> Use different learned projection matrices for the three roles.</li><li><strong>Heads:</strong> Different heads can use different projected representation spaces.</li></ul><p class=\"formula\"><strong>Formula:</strong> <code>Q = X * W_Q; K = X * W_K; V = X * W_V</code></p><p><strong>Remember:</strong> Same input representations, three learned projections.</p>"
      ]
    ]
  },
  {
    "title": "Attention score: softmax(QKᵀ / √d_k) * V",
    "questions": [
      [
        "How does scaled dot-product attention combine Q, K, and V?",
        "<p>It scores query-key matches, scales and normalizes the scores, then combines value vectors.</p><ol><li><strong>Scores:</strong> Multiply queries by transposed keys to compare positions.</li><li><strong>Scaling:</strong> Divide by the square root of key dimension to moderate score magnitudes.</li><li><strong>Combination:</strong> Apply softmax across allowed key positions and multiply by values.</li></ol><p class=\"formula\"><strong>Formula:</strong> <code>Attention(Q, K, V) = softmax(Q * transpose(K) / sqrt(d_k) + mask) * V</code></p><p class=\"example\"><strong>Example:</strong> d_k is the key dimension. The mask excludes forbidden positions; softmax runs across the candidate key positions.</p><p><strong>Remember:</strong> Match, scale, normalize, then mix values.</p>"
      ],
      [
        "Why divide attention scores by the square root of key dimension?",
        "<p>Scaling helps prevent dot-product magnitudes from growing too large as key dimension increases.</p><ul><li><strong>Magnitude:</strong> More terms in a dot product can increase its variance under common assumptions.</li><li><strong>Softmax:</strong> Very large differences can make weights excessively concentrated.</li><li><strong>Training:</strong> Better-scaled scores can make gradients easier to use.</li></ul><p><strong>Remember:</strong> Scaling keeps attention scores in a more manageable range.</p>"
      ]
    ]
  },
  {
    "title": "Multi-head attention - attending to different aspects",
    "questions": [
      [
        "What is multi-head attention?",
        "<p>Multi-head attention computes several attention outputs using different learned projections and then combines them.</p><ul><li><strong>Heads:</strong> Learn multiple representation subspaces.</li><li><strong>Parallel outputs:</strong> Each head can emphasize different relationships.</li><li><strong>Combination:</strong> Concatenate or otherwise assemble the outputs and apply a learned projection.</li></ul><p class=\"formula\"><strong>Formula:</strong> <code>MultiHead(X) = Concat(head_1, ..., head_h) * W_output</code></p><p><strong>Remember:</strong> Multiple heads provide multiple learned views of the sequence.</p>"
      ],
      [
        "Do different attention heads always learn clearly different linguistic roles?",
        "<p>No; separate projections allow specialization but do not guarantee distinct interpretable roles.</p><ul><li><strong>Possibility:</strong> A head may emphasize position, syntax, or another useful pattern.</li><li><strong>Overlap:</strong> Different heads can learn similar or redundant behavior.</li><li><strong>Interpretation:</strong> Inspect behavior instead of assigning fixed meanings to heads.</li></ul><p><strong>Remember:</strong> Separate heads allow diversity; they do not guarantee neat explanations.</p>"
      ]
    ]
  },
  {
    "title": "Positional encoding - injecting order",
    "questions": [
      [
        "Why does a transformer need positional information?",
        "<p>Attention alone does not provide an intrinsic sequence order, so the model needs position information.</p><ul><li><strong>Problem:</strong> The same token collection can express different meanings in different orders.</li><li><strong>Approaches:</strong> Add position embeddings or use relative or rotary position mechanisms.</li><li><strong>Use:</strong> Let the model distinguish where tokens occur and how positions relate.</li></ul><p><strong>Remember:</strong> Attention supplies content relationships; positional methods supply order.</p>"
      ],
      [
        "Are sinusoidal position encodings the only way to represent order?",
        "<p>No; transformers use several positional approaches.</p><ul><li><strong>Sinusoidal:</strong> Use fixed wave-based patterns, as in the original transformer.</li><li><strong>Learned positions:</strong> Train position-specific embedding values.</li><li><strong>Other approaches:</strong> Relative position biases and rotary embeddings encode positional relationships differently.</li></ul><p><strong>Remember:</strong> Position information is essential; its implementation can vary.</p>"
      ]
    ]
  },
  {
    "title": "Feed-forward sublayer",
    "questions": [
      [
        "What does the transformer feed-forward sublayer do?",
        "<p>It applies a learned non-linear feature transformation to each token representation.</p><ul><li><strong>Per position:</strong> Process each token separately within this sublayer.</li><li><strong>Parameters:</strong> Usually share the same feed-forward weights across positions.</li><li><strong>Activation:</strong> Use a non-linear function or gated construction between projections.</li></ul><p class=\"formula\"><strong>Formula:</strong> <code>PositionWiseFFN(x) = activation(x * W_1 + b_1) * W_2 + b_2</code></p><p><strong>Remember:</strong> Attention mixes positions; feed-forward layers transform features.</p>"
      ],
      [
        "Does the standard feed-forward sublayer directly exchange information between tokens?",
        "<p>No; the standard position-wise sublayer transforms each position independently.</p><ul><li><strong>Input:</strong> Receive token representations already influenced by earlier layers.</li><li><strong>Transformation:</strong> Apply the same network to each position.</li><li><strong>Contrast:</strong> Attention is the sublayer that directly mixes information across allowed positions.</li></ul><p><strong>Remember:</strong> Position-wise means shared computation without direct cross-token mixing.</p>"
      ]
    ]
  },
  {
    "title": "Layer normalization and residual connections",
    "questions": [
      [
        "Why do transformer blocks use normalization and residual connections?",
        "<p>They help manage representation scales and make deep networks easier to optimize.</p><ul><li><strong>Residual path:</strong> Add a learned change to a shortcut representation.</li><li><strong>Normalization:</strong> Stabilize feature scales within a position.</li><li><strong>Variants:</strong> Placement and normalization type vary; some models use RMSNorm instead of LayerNorm.</li></ul><p class=\"formula\"><strong>Formula:</strong> <code>Example pre-norm residual pattern: output = input + Sublayer(Norm(input))</code></p><p><strong>Remember:</strong> Shortcuts help information flow; normalization helps control scales.</p>"
      ],
      [
        "Does every transformer place LayerNorm in the same location?",
        "<p>No; pre-normalization and post-normalization designs place it differently.</p><ul><li><strong>Pre-norm:</strong> Normalize inputs before a block's attention or feed-forward transformation.</li><li><strong>Post-norm:</strong> Normalize after combining the transformation and residual path.</li><li><strong>Model dependence:</strong> Follow the architecture definition rather than assuming one universal block order.</li></ul><p><strong>Remember:</strong> The normalization idea is shared; block layout can differ.</p>"
      ]
    ]
  },
  {
    "title": "Encoder-only (BERT-style) - understanding tasks",
    "questions": [
      [
        "What is an encoder-only transformer?",
        "<p>An encoder-only transformer builds contextual input representations, usually with access to both directions.</p><ul><li><strong>Context:</strong> Each allowed input position can use left and right information.</li><li><strong>Tasks:</strong> Add suitable heads for classification, token labeling, or extractive question answering.</li><li><strong>Example:</strong> BERT is a widely used encoder-only design.</li></ul><p><strong>Remember:</strong> Encoder-only models are a natural fit for input-understanding tasks.</p><p><a href=\"https://arxiv.org/abs/1810.04805\" target=\"_blank\" rel=\"noopener noreferrer\">BERT paper</a></p>"
      ],
      [
        "How does an encoder-only model perform classification?",
        "<p>A task head maps a suitable sequence representation to class scores.</p><ul><li><strong>Representation:</strong> Obtain token-level contextual states from the encoder.</li><li><strong>Pooling:</strong> Select or combine states according to the model's training design.</li><li><strong>Head:</strong> Train a classifier on the chosen representation.</li></ul><p><strong>Remember:</strong> An encoder represents the input; a classifier head predicts its label.</p>"
      ]
    ]
  },
  {
    "title": "Decoder-only (GPT-style) - generation tasks",
    "questions": [
      [
        "What is a decoder-only transformer?",
        "<p>A decoder-only language model uses causal attention to predict tokens from preceding context.</p><ul><li><strong>Mask:</strong> Prevent a position from accessing future tokens during training.</li><li><strong>Prediction:</strong> Produce a distribution for the next token.</li><li><strong>Generation:</strong> Repeatedly select a token and extend the context.</li></ul><p><strong>Remember:</strong> Decoder-only language models generate by continuing a prefix.</p>"
      ],
      [
        "Can decoder-only models be used for tasks other than open-ended generation?",
        "<p>Yes; many tasks can be expressed as conditioned outputs or supported by suitable heads.</p><ul><li><strong>Prompting:</strong> Ask for a label, answer, or structured response.</li><li><strong>Training:</strong> Adapt the model to a specific task when appropriate.</li><li><strong>Limits:</strong> Evaluate correctness and output constraints rather than assuming generation guarantees success.</li></ul><p><strong>Remember:</strong> An architecture's common use is not its only possible use.</p>"
      ]
    ]
  },
  {
    "title": "Encoder-Decoder (T5-style) - seq2seq tasks",
    "questions": [
      [
        "What is an encoder-decoder transformer?",
        "<p>It uses an encoder to represent source input and a decoder to generate a conditioned output sequence.</p><ul><li><strong>Encoder:</strong> Process the input using its allowed context.</li><li><strong>Decoder:</strong> Generate target tokens with causal self-attention.</li><li><strong>Cross-attention:</strong> Let decoder positions access encoder representations.</li></ul><p><strong>Remember:</strong> The encoder reads the source; the decoder writes a conditioned target.</p><p><a href=\"https://arxiv.org/abs/1910.10683\" target=\"_blank\" rel=\"noopener noreferrer\">T5 paper</a></p>"
      ],
      [
        "Why is an encoder-decoder model useful for translation or summarization?",
        "<p>It separates source understanding from target generation while linking them through attention.</p><ul><li><strong>Source:</strong> Encode the document or sentence before producing the target.</li><li><strong>Target:</strong> Generate an output of a potentially different length.</li><li><strong>Conditioning:</strong> Revisit useful source representations through cross-attention.</li></ul><p><strong>Remember:</strong> One component represents the input; another generates the requested output.</p>"
      ]
    ]
  },
  {
    "title": "Causal masking in decoders",
    "questions": [
      [
        "What is a causal attention mask?",
        "<p>A causal mask blocks attention to future sequence positions.</p><ul><li><strong>Training:</strong> Prevent a position from seeing information it is supposed to predict.</li><li><strong>Allowed context:</strong> Usually include the current representation and preceding positions under the model's shifted training setup.</li><li><strong>Mechanism:</strong> Exclude forbidden attention scores before softmax.</li></ul><p><strong>Remember:</strong> Causal masking prevents future-token leakage.</p>"
      ],
      [
        "Why is causal masking needed when training positions are computed in parallel?",
        "<p>The full target sequence is present during training, so unrestricted attention would reveal future answers.</p><ul><li><strong>Parallel inputs:</strong> Many positions are processed together.</li><li><strong>Leakage:</strong> Future tokens must not become evidence for earlier predictions.</li><li><strong>Consistency:</strong> Match the left-to-right information available during generation.</li></ul><p><strong>Remember:</strong> Parallel computation still needs a causal information boundary.</p>"
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
