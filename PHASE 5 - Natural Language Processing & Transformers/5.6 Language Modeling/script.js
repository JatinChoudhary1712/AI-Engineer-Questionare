const topics = [
  {
    "title": "P(next token | previous tokens)",
    "questions": [
      [
        "What does next-token probability mean?",
        "<p>It is a model's distribution over the token that follows the current prefix.</p><ul><li><strong>Conditioning:</strong> Use the previous tokens as context.</li><li><strong>Vocabulary:</strong> Assign probability mass across candidate next tokens.</li><li><strong>Uncertainty:</strong> Several continuations can be plausible even when one has the largest score.</li></ul><p class=\"formula\"><strong>Formula:</strong> <code>P(x_t given x_1, ..., x_(t-1))</code></p><p><strong>Remember:</strong> A language model predicts a distribution, not one inevitable next word.</p>"
      ],
      [
        "Is the next token always a complete word?",
        "<p>No; token boundaries depend on the tokenizer.</p><ul><li><strong>Pieces:</strong> A token may represent a word, part of a word, punctuation, or other text.</li><li><strong>Generation:</strong> Append one selected vocabulary item at each ordinary decoding step.</li><li><strong>Decoding:</strong> Convert the resulting token sequence back into text.</li></ul><p><strong>Remember:</strong> Next-token prediction is not necessarily next-word prediction.</p>"
      ]
    ]
  },
  {
    "title": "Autoregressive language modeling",
    "questions": [
      [
        "What is autoregressive language modeling?",
        "<p>Autoregressive modeling factors a sequence into predictions conditioned on earlier tokens.</p><ul><li><strong>Order:</strong> Predict each next token using a prefix.</li><li><strong>Training:</strong> Learn from examples where the correct next tokens are known.</li><li><strong>Generation:</strong> Feed generated tokens back as context for following predictions.</li></ul><p class=\"formula\"><strong>Formula:</strong> <code>P(x_1, ..., x_T) = product over t of P(x_t given x_&lt;t)</code></p><p><strong>Remember:</strong> Predict, append, and predict again.</p>"
      ],
      [
        "How does an autoregressive model generate a sentence?",
        "<p>It repeatedly selects a next token from the distribution conditioned on its growing prefix.</p><ol><li><strong>Start:</strong> Supply a prompt or beginning-of-sequence context.</li><li><strong>Continue:</strong> Run the model, choose a token, and append it.</li><li><strong>Stop:</strong> End on a stopping condition such as EOS or a token limit.</li></ol><p><strong>Remember:</strong> Generation builds the continuation one step at a time.</p>"
      ]
    ]
  },
  {
    "title": "Masked language modeling (MLM)",
    "questions": [
      [
        "What is masked language modeling?",
        "<p>MLM trains a model to recover selected hidden or corrupted tokens from their surrounding context.</p><ul><li><strong>Input:</strong> Hide or replace selected token information according to the training recipe.</li><li><strong>Context:</strong> The model can often use both left and right context.</li><li><strong>Objective:</strong> Predict the selected original tokens rather than always predicting the next token.</li></ul><p><strong>Remember:</strong> MLM learns by recovering missing information.</p>"
      ],
      [
        "How is MLM different from autoregressive next-token training?",
        "<p>MLM recovers selected tokens from context; autoregressive training predicts a continuation from its prefix.</p><ul><li><strong>MLM:</strong> Commonly support bidirectional representation learning.</li><li><strong>Autoregressive:</strong> Enforce a causal boundary for prediction.</li><li><strong>Evaluation:</strong> The objectives differ, so their probability-based metrics are not automatically interchangeable.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Objective</th><th scope=\"col\">Information available</th><th scope=\"col\">Prediction target</th></tr></thead><tbody><tr><th scope=\"row\">Masked language modeling</th><td>Allowed surrounding context, often both directions</td><td>Selected hidden or corrupted tokens</td></tr><tr><th scope=\"row\">Autoregressive modeling</th><td>A causal prefix</td><td>Next token in the sequence</td></tr></tbody></table></div><p><strong>Remember:</strong> Recover hidden tokens versus continue a prefix.</p>"
      ]
    ]
  },
  {
    "title": "Perplexity - evaluating language models",
    "questions": [
      [
        "What is language-model perplexity?",
        "<p>Perplexity exponentiates average negative log-probability of reference tokens under a probabilistic language model.</p><ul><li><strong>Interpretation:</strong> Lower perplexity means the model assigns higher likelihood to those reference tokens.</li><li><strong>Evaluation:</strong> Measure on appropriate held-out data using a stated context and masking protocol.</li><li><strong>Comparison:</strong> Match tokenizer and evaluation setup; different token units distort direct comparisons.</li></ul><p class=\"formula\"><strong>Formula:</strong> <code>Perplexity = exp(-(1 / N) * sum(log p(reference_token_t given allowed context)))</code></p><p class=\"example\"><strong>Example:</strong> N counts scored reference tokens. This form uses natural logarithms and a stated autoregressive evaluation setup.</p><p><strong>Remember:</strong> Perplexity measures reference-token predictability, not overall answer quality.</p>"
      ],
      [
        "Does lower perplexity guarantee better factual or helpful answers?",
        "<p>No; predicting reference text well is different from meeting every product-quality goal.</p><ul><li><strong>Factuality:</strong> A likely continuation can still contain incorrect claims.</li><li><strong>Helpfulness:</strong> Following a user's needs requires evaluation beyond token likelihood.</li><li><strong>Scope:</strong> Use perplexity with task metrics and human assessment where appropriate.</li></ul><p><strong>Remember:</strong> Good likelihood is useful evidence, not a complete quality verdict.</p>"
      ]
    ]
  },
  {
    "title": "Temperature, Top-k, Top-p (nucleus) sampling",
    "questions": [
      [
        "What do temperature, top-k, and top-p control during generation?",
        "<p>They adjust the distribution or candidate set used to select a next token.</p><ul><li><strong>Temperature:</strong> Rescale logits before sampling to alter concentration.</li><li><strong>Top-k:</strong> Keep a fixed number of the highest-probability candidates.</li><li><strong>Top-p:</strong> Keep a high-probability set whose cumulative mass reaches the chosen threshold.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Control</th><th scope=\"col\">What changes</th></tr></thead><tbody><tr><th scope=\"row\">Temperature</th><td>Concentration of the probability distribution</td></tr><tr><th scope=\"row\">Top-k</th><td>Fixed number of leading candidates retained</td></tr><tr><th scope=\"row\">Top-p</th><td>Adaptive set reaching a probability-mass threshold</td></tr></tbody></table></div><p class=\"formula\"><strong>Formula:</strong> <code>For temperature T &gt; 0: sampling_probabilities = softmax(logits / T)</code></p><p><strong>Remember:</strong> Temperature changes concentration; top-k and top-p restrict candidates.</p>"
      ],
      [
        "How do top-k and top-p sampling differ?",
        "<p>Top-k fixes the number of candidates; top-p adapts that number to the distribution.</p><ul><li><strong>Fixed count:</strong> Top-k can retain many or few probability-mass units depending on the scores.</li><li><strong>Adaptive set:</strong> Top-p retains enough leading candidates to meet the probability threshold.</li><li><strong>Selection:</strong> Sample from the retained set after the appropriate normalization.</li></ul><p><strong>Remember:</strong> Top-k fixes a count; top-p fixes a probability-mass target.</p>"
      ]
    ]
  },
  {
    "title": "Greedy vs sampling vs beam search",
    "questions": [
      [
        "How do greedy decoding, sampling, and beam search differ?",
        "<p>They choose continuations through local maximization, random selection, or a limited sequence search.</p><ul><li><strong>Greedy:</strong> Pick the highest-scoring next token.</li><li><strong>Sampling:</strong> Randomly choose from a configured next-token distribution.</li><li><strong>Beam search:</strong> Keep several high-scoring partial sequences and expand them.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Method</th><th scope=\"col\">Core rule</th><th scope=\"col\">Typical tradeoff</th></tr></thead><tbody><tr><th scope=\"row\">Greedy</th><td>Choose the highest-scoring next token</td><td>Simple and fast, commits locally</td></tr><tr><th scope=\"row\">Sampling</th><td>Draw from a configured distribution</td><td>Allows variation; results depend on settings</td></tr><tr><th scope=\"row\">Beam search</th><td>Retain several partial sequences</td><td>More search and computation, not guaranteed better text</td></tr></tbody></table></div><p><strong>Remember:</strong> One best local choice, a random choice, or several search paths.</p>"
      ],
      [
        "Is beam search or a lower temperature always better?",
        "<p>No; decoding quality depends on the task, model, scoring rule, and desired variation.</p><ul><li><strong>Search:</strong> Higher sequence scores do not guarantee more useful text.</li><li><strong>Variation:</strong> Lower temperature usually concentrates sampling but does not make claims true.</li><li><strong>Evaluation:</strong> Compare decoding settings with representative task examples.</li></ul><p><strong>Remember:</strong> Choose decoding for the task, not a universal quality rule.</p>"
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
