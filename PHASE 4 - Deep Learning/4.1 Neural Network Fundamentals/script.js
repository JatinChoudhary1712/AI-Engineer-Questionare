const topics = [
  {
    "title": "Neuron, Perceptron, MLP",
    "questions": [
      [
        "What are a neuron, a perceptron, and a multilayer perceptron (MLP)?",
        "<p>A neuron computes a weighted input; a perceptron makes a simple decision; an MLP connects neurons in multiple layers.</p><ul><li><strong>Neuron:</strong> Multiply inputs by weights, add a bias, then apply an activation.</li><li><strong>Perceptron:</strong> A classical single-layer perceptron uses a threshold and can separate linearly separable classes.</li><li><strong>MLP:</strong> Hidden layers with non-linear activations learn more complex input-output relationships.</li></ul><p class=\"formula\"><strong>Formula:</strong> <code>z = sum(w_i * x_i) + b; output = activation(z)</code></p><p class=\"example\"><strong>Example:</strong> A simple perceptron can separate some categories with a straight boundary; an MLP can learn more complex boundaries.</p><p><strong>Remember:</strong> Neuron computes; perceptron decides; MLP learns layered patterns.</p>"
      ]
    ]
  },
  {
    "title": "Activation functions: Sigmoid, Tanh, ReLU, GELU, SwiGLU",
    "questions": [
      [
        "What are activation functions, and what are the basic differences between Sigmoid, Tanh, ReLU, GELU, and SwiGLU?",
        "<p>Activation functions transform neuron outputs and let networks learn non-linear patterns.</p><ul><li><strong>Non-linearity:</strong> Without it, stacked affine layers collapse into one affine transformation.</li><li><strong>Choice:</strong> Match the activation to the layer and task; no activation is always best.</li><li><strong>Gating:</strong> SwiGLU multiplies learned branches to control feature contributions, rather than applying only one scalar activation.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Function</th><th scope=\"col\">Basic behavior</th><th scope=\"col\">Common role</th></tr></thead><tbody><tr><th scope=\"row\">Sigmoid</th><td>Output between 0 and 1; can saturate</td><td>Binary probability outputs</td></tr><tr><th scope=\"row\">Tanh</th><td>Output between -1 and 1; zero-centered; can saturate</td><td>Some recurrent hidden states</td></tr><tr><th scope=\"row\">ReLU</th><td>max(0, x); zero for negative inputs</td><td>Hidden layers in many MLPs and CNNs</td></tr><tr><th scope=\"row\">GELU</th><td>Smoothly weights x using a Gaussian cumulative probability</td><td>Hidden activations in transformer feed-forward blocks</td></tr><tr><th scope=\"row\">SwiGLU</th><td>Multiply two learned projections, with SiLU (x * sigmoid(x)) applied to one branch</td><td>Gated transformer feed-forward blocks</td></tr></tbody></table></div><p><strong>Remember:</strong> Activations add non-linearity; gates control information flow.</p><p><a href=\"https://arxiv.org/abs/1606.08415\" target=\"_blank\" rel=\"noopener noreferrer\">GELU paper</a> / <a href=\"https://arxiv.org/abs/2002.05202\" target=\"_blank\" rel=\"noopener noreferrer\">SwiGLU paper</a></p>"
      ]
    ]
  },
  {
    "title": "Forward pass - how information flows",
    "questions": [
      [
        "What is a forward pass, and how does information flow through a neural network?",
        "<p>A forward pass computes predictions by sending inputs through the network's layers.</p><ol><li><strong>Input:</strong> Feed a batch of feature values into the first layer.</li><li><strong>Layers:</strong> Each layer transforms its inputs using weights, bias, and any activation.</li><li><strong>Output:</strong> The final layer produces values used for prediction or loss calculation.</li></ol><p class=\"formula\"><strong>Formula:</strong> <code>a_next = activation(W * a_previous + b)</code></p><p class=\"example\"><strong>Example:</strong> Image pixels pass through hidden layers to produce class scores.</p><p><strong>Remember:</strong> Forward means inputs become predictions.</p>"
      ]
    ]
  },
  {
    "title": "Backpropagation - how gradients flow backward",
    "questions": [
      [
        "What is backpropagation, and how do gradients flow backward through a neural network?",
        "<p>Backpropagation computes loss gradients by applying the chain rule backward through the network.</p><ol><li><strong>Start:</strong> Compute a loss from the forward-pass prediction and target.</li><li><strong>Chain rule:</strong> Combine local derivatives to find how each parameter affects the loss.</li><li><strong>Update:</strong> Backpropagation computes gradients; the optimizer uses them to change parameters.</li></ol><p class=\"formula\"><strong>Formula:</strong> <code>dL/dw = (dL/da) * (da/dz) * (dz/dw)</code></p><p><strong>Symbols:</strong> L is the loss, w is a weight, z is a pre-activation value, and a is its activated output.</p><p><strong>Remember:</strong> Backward finds gradients; the optimizer changes weights.</p>"
      ]
    ]
  },
  {
    "title": "Weight initialization strategies",
    "questions": [
      [
        "What is weight initialization, and what are Xavier and He initialization?",
        "<p>Weight initialization chooses starting parameter values before training.</p><ul><li><strong>Symmetry:</strong> Different random weights help hidden neurons learn different features; identical zero weights can keep them identical.</li><li><strong>Xavier:</strong> Balances signal scale using fan-in and fan-out; commonly suits tanh or roughly linear activations.</li><li><strong>He:</strong> Accounts for rectification and commonly suits ReLU-like activations.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Initialization</th><th scope=\"col\">Typical variance</th><th scope=\"col\">Typical match</th></tr></thead><tbody><tr><th scope=\"row\">Xavier / Glorot</th><td>2 / (fan_in + fan_out), before optional gain adjustments</td><td>Tanh or roughly linear activations</td></tr><tr><th scope=\"row\">He / Kaiming</th><td>2 / fan_in for ReLU, fan-in mode</td><td>ReLU-like activations</td></tr></tbody></table></div><p><strong>Symbols:</strong> fan_in counts incoming connections; fan_out counts outgoing connections. Exact scaling depends on the activation and initialization variant.</p><p><strong>Remember:</strong> Start with appropriately scaled random weights, not identical hidden weights.</p>"
      ]
    ]
  },
  {
    "title": "Vanishing / exploding gradient problem",
    "questions": [
      [
        "What are vanishing and exploding gradients, and how do they affect learning?",
        "<p>Vanishing gradients become too small to learn effectively; exploding gradients become excessively large.</p><ul><li><strong>Vanishing:</strong> Earlier layers may learn very slowly because their gradients are tiny.</li><li><strong>Exploding:</strong> Large gradients can cause unstable updates, huge losses, or non-finite values.</li><li><strong>Control:</strong> Suitable initialization and architecture help; clipping specifically limits large gradients.</li></ul><p><strong>Remember:</strong> Too small means weak learning; too large means unstable learning.</p>"
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
