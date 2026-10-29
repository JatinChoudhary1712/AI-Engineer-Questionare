const topics = [
  {
    "title": "Attention as 'soft' alignment",
    "questions": [
      [
        "What is attention, and what does soft alignment mean?",
        "<p>Soft attention forms a context by assigning continuous weights to relevant encoder states.</p><ol><li><strong>Scores:</strong> Compare the decoder's current needs with each encoder state.</li><li><strong>Weights:</strong> Softmax converts scores into non-negative weights that sum to one.</li><li><strong>Context:</strong> Take a weighted sum so several source positions can contribute and gradients can flow through the computation.</li></ol><p class=\"formula\"><strong>Formula:</strong> <code>attention_weights = softmax(scores); context = sum(weight_i * encoder_state_i)</code></p><p class=\"example\"><strong>Example:</strong> When translating a word, the decoder can emphasize the source words most relevant to that step.</p><p><strong>Remember:</strong> Soft alignment is a weighted mixture, not one forced position.</p>"
      ]
    ]
  },
  {
    "title": "Additive vs multiplicative attention",
    "questions": [
      [
        "What are additive and multiplicative attention, and how do they differ at a basic level?",
        "<p>Additive and multiplicative attention differ in how they score the match between two representations.</p><ul><li><strong>Additive:</strong> Learn projections and combine them through a small non-linear scoring network.</li><li><strong>Multiplicative:</strong> Compare representations using a dot product or a learned bilinear transformation.</li><li><strong>Dimensions:</strong> Raw dot products require equal dimensions; learned projections can make unequal original dimensions compatible.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Attention</th><th scope=\"col\">Scoring idea</th></tr></thead><tbody><tr><th scope=\"row\">Additive</th><td>score = v^T * tanh(W_s * decoder_state + W_h * encoder_state + b)</td></tr><tr><th scope=\"row\">Multiplicative</th><td>score = decoder_state^T * W * encoder_state</td></tr></tbody></table></div><p><strong>Symbols:</strong> The matrices W_s and W_h project states into a shared space; v maps the combined features to a scalar. The multiplicative matrix W makes compatible projected dimensions.</p><p><strong>Remember:</strong> Additive learns a small scoring network; multiplicative compares through products.</p>"
      ]
    ]
  },
  {
    "title": "Bahdanau attention for seq2seq",
    "questions": [
      [
        "What is Bahdanau attention, and how does it help a Seq2Seq decoder?",
        "<p>Bahdanau attention gives a Seq2Seq decoder a newly weighted source context for each output step.</p><ol><li><strong>Score:</strong> Compare encoder states with a decoder state using additive attention.</li><li><strong>Normalize:</strong> Apply softmax across source positions to obtain attention weights.</li><li><strong>Combine:</strong> Form a weighted context and use it with decoder information to generate the next output.</li></ol><p><strong>Remember:</strong> Score, normalize, combine, then decode.</p>"
      ]
    ]
  },
  {
    "title": "Why attention solved the bottleneck problem",
    "questions": [
      [
        "What is the fixed-context bottleneck in Seq2Seq, and how does attention address it?",
        "<p>Attention relaxes the bottleneck of compressing an entire input into one fixed-size context vector.</p><ul><li><strong>Plain Seq2Seq:</strong> The decoder depends on a single summary that may lose details from long inputs.</li><li><strong>Attention:</strong> Keep encoder states available and build a new weighted context for each output step.</li><li><strong>Benefit:</strong> Provide more direct access to relevant positions; it does not remove every long-sequence difficulty.</li></ul><p><strong>Remember:</strong> Instead of remembering everything in one vector, revisit useful source states.</p>"
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
let number = 24;
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
