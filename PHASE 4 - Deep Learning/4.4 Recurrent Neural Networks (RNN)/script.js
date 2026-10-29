const topics = [
  {
    "title": "RNN - processing sequences one step at a time",
    "questions": [
      [
        "What is an RNN, and how does it process a sequence one step at a time?",
        "<p>An RNN processes ordered inputs while updating a hidden state at each step.</p><ol><li><strong>Read:</strong> Take the current input and the previous hidden state.</li><li><strong>Update:</strong> Apply the same learned recurrent transformation at each time step.</li><li><strong>Output:</strong> Use the new state for a prediction or pass it to the next step.</li></ol><p class=\"formula\"><strong>Formula:</strong> <code>h_t = tanh(W_x * x_t + W_h * h_previous + b)</code></p><p><strong>Symbols:</strong> x_t is the current input, h_t is the new hidden state, and W_x, W_h, b are shared across time steps.</p><p class=\"example\"><strong>Example:</strong> Read a sentence word by word, updating a summary after each word.</p><p><strong>Remember:</strong> Current input plus previous state produces the next state.</p>"
      ]
    ]
  },
  {
    "title": "Hidden state - memory across time steps",
    "questions": [
      [
        "What is a hidden state, and how does it carry information across time steps?",
        "<p>A hidden state is a learned numerical summary of the sequence processed so far.</p><ul><li><strong>Carry:</strong> Pass the state from one time step to the next.</li><li><strong>Combine:</strong> Update it using the previous summary and the current input.</li><li><strong>Limit:</strong> Its finite size and training dynamics can make distant details hard to preserve.</li></ul><p class=\"example\"><strong>Example:</strong> In next-word prediction, the state may carry subject information needed to choose a later verb.</p><p><strong>Remember:</strong> Hidden state is a changing summary, not a perfect transcript.</p>"
      ]
    ]
  },
  {
    "title": "Vanishing gradient in RNNs",
    "questions": [
      [
        "Why do basic RNNs struggle with vanishing gradients and long-term dependencies?",
        "<p>Basic RNN gradients can shrink through repeated backward multiplications across time steps.</p><ul><li><strong>Cause:</strong> Repeated small derivative factors can make gradients from distant steps tiny.</li><li><strong>Effect:</strong> Earlier inputs receive a weak learning signal, making long-range dependencies harder to learn.</li><li><strong>Alternatives:</strong> Gated models such as LSTMs and GRUs improve information flow but do not guarantee perfect memory.</li></ul><p><strong>Remember:</strong> A weak backward signal makes distant context hard to learn.</p>"
      ]
    ]
  },
  {
    "title": "LSTM - cell state, forget/input/output gates",
    "questions": [
      [
        "What is an LSTM, and what do its cell state, forget gate, input gate, and output gate do?",
        "<p>An LSTM is a gated recurrent network with a cell state designed to preserve information over time.</p><ul><li><strong>Cell state:</strong> Carries memory through an additive update path; the hidden state is the exposed output at each step.</li><li><strong>Forget gate:</strong> Controls how much previous cell memory is retained.</li><li><strong>Input gate:</strong> Controls how much new candidate information is written.</li><li><strong>Output gate:</strong> Controls how much of the transformed cell state is exposed as the hidden state.</li></ul><p class=\"formula\"><strong>Formula:</strong> <code>cell_new = forget_gate * cell_previous + input_gate * candidate; hidden_new = output_gate * tanh(cell_new)</code></p><p><strong>Remember:</strong> Forget old information selectively; write new information; expose useful memory.</p>"
      ]
    ]
  },
  {
    "title": "GRU - simpler LSTM alternative",
    "questions": [
      [
        "What is a GRU, and how is it a simpler alternative to an LSTM?",
        "<p>A GRU is a gated recurrent network that uses one state and two main gates.</p><ul><li><strong>Update gate:</strong> Balances retaining previous state against using new candidate information.</li><li><strong>Reset gate:</strong> Controls how much previous state influences the candidate computation.</li><li><strong>Comparison:</strong> A standard GRU has fewer parameters than an LSTM of the same input and hidden sizes; neither always performs better.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Model</th><th scope=\"col\">Main gates</th><th scope=\"col\">State</th></tr></thead><tbody><tr><th scope=\"row\">LSTM</th><td>Forget, input, output</td><td>Cell state plus hidden state</td></tr><tr><th scope=\"row\">GRU</th><td>Reset, update</td><td>One hidden state</td></tr></tbody></table></div><p><strong>Remember:</strong> GRU combines memory and output in one gated state.</p>"
      ]
    ]
  },
  {
    "title": "Bidirectional RNNs",
    "questions": [
      [
        "What is a bidirectional RNN, and when is it useful?",
        "<p>A bidirectional RNN processes an available sequence in both forward and backward directions.</p><ul><li><strong>Forward state:</strong> Encodes context from earlier positions.</li><li><strong>Backward state:</strong> Encodes context from later positions in the available sequence.</li><li><strong>Use:</strong> Useful when the full sequence is available; future tokens are unavailable in causal generation.</li></ul><p class=\"example\"><strong>Example:</strong> In named-entity recognition, surrounding words on both sides can help identify a person's name.</p><p><strong>Remember:</strong> Use both directions when both sides of the context are available.</p>"
      ]
    ]
  },
  {
    "title": "Seq2Seq: encoder + decoder",
    "questions": [
      [
        "What is a Seq2Seq model, and what do its encoder and decoder do?",
        "<p>A Seq2Seq model uses an encoder to represent an input sequence and a decoder to generate an output sequence.</p><ol><li><strong>Encode:</strong> Read the source sequence and form useful representations.</li><li><strong>Decode:</strong> Generate output tokens using the encoded information and previous output context.</li><li><strong>Attention:</strong> Let the decoder use different source positions instead of only one fixed-size summary.</li></ol><p class=\"example\"><strong>Example:</strong> A translation encoder reads an English sentence; its decoder generates the corresponding French sentence.</p><p><strong>Remember:</strong> Encoder reads the source; decoder writes the target.</p>"
      ]
    ]
  },
  {
    "title": "Beam search decoding",
    "questions": [
      [
        "What is beam search, and how does it differ from choosing one word greedily at each step?",
        "<p>Beam search keeps several promising partial output sequences instead of one greedy choice.</p><ul><li><strong>Greedy:</strong> At each step, keep only the highest-scoring next-token choice.</li><li><strong>Beam:</strong> Expand several partial sequences and keep a limited number of the best candidates.</li><li><strong>Tradeoff:</strong> A wider search costs more and may find higher-scoring outputs, but does not guarantee better text.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Decoding</th><th scope=\"col\">Candidates retained</th><th scope=\"col\">Tradeoff</th></tr></thead><tbody><tr><th scope=\"row\">Greedy</th><td>One partial sequence</td><td>Fast, but commits early</td></tr><tr><th scope=\"row\">Beam search</th><td>Several partial sequences</td><td>Broader search with more computation; quality is not guaranteed</td></tr></tbody></table></div><p><strong>Remember:</strong> Greedy follows one path; beam search keeps several paths open.</p>"
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
let number = 16;
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
