const topics = [
  {
    "title": "Neuron, Perceptron, MLP",
    "questions": [
      [
        "What are a neuron, a perceptron, and a multilayer perceptron (MLP)?",
        "<p>A neuron computes a weighted input; a perceptron makes a simple decision; an MLP connects neurons in multiple layers.</p><ul><li><strong>Neuron:</strong> Multiply inputs by weights, add a bias, then apply an activation.</li><li><strong>Perceptron:</strong> A classical single-layer perceptron uses a threshold and can separate linearly separable classes.</li><li><strong>MLP:</strong> Hidden layers with non-linear activations learn more complex input-output relationships.</li></ul><p class=\"formula\"><strong>Formula:</strong> <code>z = sum(w_i * x_i) + b; output = activation(z)</code></p><p class=\"example\"><strong>Example:</strong> A simple perceptron can separate some categories with a straight boundary; an MLP can learn more complex boundaries.</p><p><strong>Remember:</strong> Neuron computes; perceptron decides; MLP learns layered patterns.</p>"
      ],
      [
        "What is an artificial neuron?",
        "<p>An artificial neuron transforms weighted inputs into an output.</p><ul><li><strong>Inputs:</strong> Receive feature values or outputs from earlier neurons.</li><li><strong>Weights and bias:</strong> Control each input's contribution and shift the combined value.</li><li><strong>Activation:</strong> Transform the combined value before passing it onward.</li></ul><p class=\"formula\"><strong>Formula:</strong> <code>output = activation(sum(weight_i * input_i) + bias)</code></p><p><strong>Remember:</strong> Multiply, add, then activate.</p>"
      ],
      [
        "What is a perceptron?",
        "<p>A classical perceptron is a simple binary classifier using a weighted sum and a threshold.</p><ul><li><strong>Score:</strong> Combine inputs with learned weights and a bias.</li><li><strong>Decision:</strong> Output one of two classes according to the threshold.</li><li><strong>Limit:</strong> A single perceptron can only separate linearly separable classes.</li></ul><p><strong>Remember:</strong> A perceptron makes a threshold-based decision.</p>"
      ],
      [
        "What is an MLP, and what do hidden layers do?",
        "<p>An MLP is a feed-forward network with learned layers between its input and output.</p><ul><li><strong>Input layer:</strong> Receives the features.</li><li><strong>Hidden layers:</strong> Transform features using weights and non-linear activations.</li><li><strong>Output layer:</strong> Produces task-specific predictions or scores.</li></ul><p><strong>Remember:</strong> Hidden layers learn useful intermediate representations.</p>"
      ]
    ]
  },
  {
    "title": "Activation functions: Sigmoid, Tanh, ReLU, GELU, SwiGLU",
    "questions": [
      [
        "What are activation functions, and what are the basic differences between Sigmoid, Tanh, ReLU, GELU, and SwiGLU?",
        "<p>Activation functions transform neuron outputs and let networks learn non-linear patterns.</p><ul><li><strong>Non-linearity:</strong> Without it, stacked affine layers collapse into one affine transformation.</li><li><strong>Choice:</strong> Match the activation to the layer and task; no activation is always best.</li><li><strong>Gating:</strong> SwiGLU multiplies learned branches to control feature contributions, rather than applying only one scalar activation.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Function</th><th scope=\"col\">Basic behavior</th><th scope=\"col\">Common role</th></tr></thead><tbody><tr><th scope=\"row\">Sigmoid</th><td>Output between 0 and 1; can saturate</td><td>Binary probability outputs</td></tr><tr><th scope=\"row\">Tanh</th><td>Output between -1 and 1; zero-centered; can saturate</td><td>Some recurrent hidden states</td></tr><tr><th scope=\"row\">ReLU</th><td>max(0, x); zero for negative inputs</td><td>Hidden layers in many MLPs and CNNs</td></tr><tr><th scope=\"row\">GELU</th><td>Smoothly weights x using a Gaussian cumulative probability</td><td>Hidden activations in transformer feed-forward blocks</td></tr><tr><th scope=\"row\">SwiGLU</th><td>Multiply two learned projections, with SiLU (x * sigmoid(x)) applied to one branch</td><td>Gated transformer feed-forward blocks</td></tr></tbody></table></div><p><strong>Remember:</strong> Activations add non-linearity; gates control information flow.</p><p><a href=\"https://arxiv.org/abs/1606.08415\" target=\"_blank\" rel=\"noopener noreferrer\">GELU paper</a> / <a href=\"https://arxiv.org/abs/2002.05202\" target=\"_blank\" rel=\"noopener noreferrer\">SwiGLU paper</a></p>"
      ],
      [
        "What is the sigmoid activation function?",
        "<p>Sigmoid maps a real-valued input to a number between zero and one.</p><ul><li><strong>Range:</strong> Outputs lie between zero and one.</li><li><strong>Use:</strong> Often converts a binary-classification score into a probability.</li><li><strong>Limitation:</strong> Very positive or negative inputs have small derivatives.</li></ul><p class=\"formula\"><strong>Formula:</strong> <code>sigmoid(x) = 1 / (1 + exp(-x))</code></p><p><strong>Remember:</strong> Sigmoid squashes a score into the zero-to-one range.</p><p><a href=\"https://arxiv.org/abs/1606.08415\" target=\"_blank\" rel=\"noopener noreferrer\">GELU paper</a> / <a href=\"https://arxiv.org/abs/2002.05202\" target=\"_blank\" rel=\"noopener noreferrer\">SwiGLU paper</a></p>"
      ],
      [
        "What is the tanh activation function?",
        "<p>Tanh maps a real-valued input to a number between minus one and one.</p><ul><li><strong>Range:</strong> Allows both negative and positive outputs.</li><li><strong>Center:</strong> Zero input gives zero output.</li><li><strong>Limitation:</strong> Large input magnitudes can saturate and give small derivatives.</li></ul><p><strong>Remember:</strong> Tanh is zero-centered but can still saturate.</p><p><a href=\"https://arxiv.org/abs/1606.08415\" target=\"_blank\" rel=\"noopener noreferrer\">GELU paper</a> / <a href=\"https://arxiv.org/abs/2002.05202\" target=\"_blank\" rel=\"noopener noreferrer\">SwiGLU paper</a></p>"
      ],
      [
        "What is ReLU?",
        "<p>ReLU returns the input when it is positive and zero otherwise.</p><ul><li><strong>Positive inputs:</strong> Pass through unchanged.</li><li><strong>Negative inputs:</strong> Become zero.</li><li><strong>Limitation:</strong> A unit that stays on the negative side can stop receiving useful gradients.</li></ul><p class=\"formula\"><strong>Formula:</strong> <code>ReLU(x) = max(0, x)</code></p><p><strong>Remember:</strong> ReLU keeps positives and zeros negatives.</p><p><a href=\"https://arxiv.org/abs/1606.08415\" target=\"_blank\" rel=\"noopener noreferrer\">GELU paper</a> / <a href=\"https://arxiv.org/abs/2002.05202\" target=\"_blank\" rel=\"noopener noreferrer\">SwiGLU paper</a></p>"
      ],
      [
        "What is GELU?",
        "<p>GELU smoothly scales an input using the cumulative probability of a standard normal distribution.</p><ul><li><strong>Near zero:</strong> Changes smoothly rather than using ReLU's sharp cutoff.</li><li><strong>Negative inputs:</strong> Small negative values can produce nonzero negative outputs.</li><li><strong>Use:</strong> Appears in the feed-forward layers of many transformers.</li></ul><p><strong>Remember:</strong> GELU smoothly weights an input instead of sharply clipping it.</p><p><a href=\"https://arxiv.org/abs/1606.08415\" target=\"_blank\" rel=\"noopener noreferrer\">GELU paper</a> / <a href=\"https://arxiv.org/abs/2002.05202\" target=\"_blank\" rel=\"noopener noreferrer\">SwiGLU paper</a></p>"
      ],
      [
        "What is SwiGLU?",
        "<p>SwiGLU is a gated feed-forward construction that multiplies two learned projections.</p><ul><li><strong>Branches:</strong> Compute two transformations of the same input.</li><li><strong>Gate:</strong> Apply SiLU to one branch, then multiply it element by element with the other.</li><li><strong>Role:</strong> Lets learned features modulate other features in a feed-forward block.</li></ul><p class=\"formula\"><strong>Formula:</strong> <code>SiLU(x) = x * sigmoid(x); gated_features = SiLU(branch_a) * branch_b</code></p><p><strong>Remember:</strong> SwiGLU combines non-linearity with learned feature gating.</p><p><a href=\"https://arxiv.org/abs/1606.08415\" target=\"_blank\" rel=\"noopener noreferrer\">GELU paper</a> / <a href=\"https://arxiv.org/abs/2002.05202\" target=\"_blank\" rel=\"noopener noreferrer\">SwiGLU paper</a></p>"
      ]
    ]
  },
  {
    "title": "Forward pass - how information flows",
    "questions": [
      [
        "What is a forward pass, and how does information flow through a neural network?",
        "<p>A forward pass computes predictions by sending inputs through the network's layers.</p><ol><li><strong>Input:</strong> Feed a batch of feature values into the first layer.</li><li><strong>Layers:</strong> Each layer transforms its inputs using weights, bias, and any activation.</li><li><strong>Output:</strong> The final layer produces values used for prediction or loss calculation.</li></ol><p class=\"formula\"><strong>Formula:</strong> <code>a_next = activation(W * a_previous + b)</code></p><p class=\"example\"><strong>Example:</strong> Image pixels pass through hidden layers to produce class scores.</p><p><strong>Remember:</strong> Forward means inputs become predictions.</p>"
      ],
      [
        "Does a forward pass update the model's weights?",
        "<p>A forward pass computes outputs; it does not normally update learned weights by itself.</p><ul><li><strong>Prediction:</strong> Evaluate the model using its current parameters.</li><li><strong>Training:</strong> Compare the prediction with a target to obtain a loss.</li><li><strong>Update:</strong> An optimizer changes parameters after gradients are computed; some layers can update non-parameter state during a training forward pass.</li></ul><p><strong>Remember:</strong> Forward predicts; the optimizer updates weights.</p>"
      ]
    ]
  },
  {
    "title": "Backpropagation - how gradients flow backward",
    "questions": [
      [
        "What is backpropagation, and how do gradients flow backward through a neural network?",
        "<p>Backpropagation computes loss gradients by applying the chain rule backward through the network.</p><ol><li><strong>Start:</strong> Compute a loss from the forward-pass prediction and target.</li><li><strong>Chain rule:</strong> Combine local derivatives to find how each parameter affects the loss.</li><li><strong>Update:</strong> Backpropagation computes gradients; the optimizer uses them to change parameters.</li></ol><p class=\"formula\"><strong>Formula:</strong> <code>dL/dw = (dL/da) * (da/dz) * (dz/dw)</code></p><p><strong>Symbols:</strong> L is the loss, w is a weight, z is a pre-activation value, and a is its activated output.</p><p><strong>Remember:</strong> Backward finds gradients; the optimizer changes weights.</p>"
      ],
      [
        "What is the difference between backpropagation and an optimizer?",
        "<p>Backpropagation computes gradients; an optimizer uses them to update parameters.</p><ul><li><strong>Backpropagation:</strong> Find how changes in parameters affect the loss.</li><li><strong>Optimizer:</strong> Choose and apply an update using those gradients.</li><li><strong>Order:</strong> Compute the loss, backpropagate, then take the optimizer step.</li></ul><p><strong>Remember:</strong> Backward calculates the direction; the optimizer takes the step.</p>"
      ]
    ]
  },
  {
    "title": "Weight initialization strategies",
    "questions": [
      [
        "What is weight initialization, and what are Xavier and He initialization?",
        "<p>Weight initialization chooses starting parameter values before training.</p><ul><li><strong>Symmetry:</strong> Different random weights help hidden neurons learn different features; identical zero weights can keep them identical.</li><li><strong>Xavier:</strong> Balances signal scale using fan-in and fan-out; commonly suits tanh or roughly linear activations.</li><li><strong>He:</strong> Accounts for rectification and commonly suits ReLU-like activations.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Initialization</th><th scope=\"col\">Typical variance</th><th scope=\"col\">Typical match</th></tr></thead><tbody><tr><th scope=\"row\">Xavier / Glorot</th><td>2 / (fan_in + fan_out), before optional gain adjustments</td><td>Tanh or roughly linear activations</td></tr><tr><th scope=\"row\">He / Kaiming</th><td>2 / fan_in for ReLU, fan-in mode</td><td>ReLU-like activations</td></tr></tbody></table></div><p><strong>Symbols:</strong> fan_in counts incoming connections; fan_out counts outgoing connections. Exact scaling depends on the activation and initialization variant.</p><p><strong>Remember:</strong> Start with appropriately scaled random weights, not identical hidden weights.</p>"
      ],
      [
        "What is Xavier initialization?",
        "<p>Xavier initialization chooses random weight scales based on the incoming and outgoing connections.</p><ul><li><strong>Goal:</strong> Keep signals from growing or shrinking too quickly across layers.</li><li><strong>Scale:</strong> Use fan-in and fan-out to set the initial variance.</li><li><strong>Match:</strong> Commonly used with tanh or roughly linear activations, with appropriate gain settings.</li></ul><p><strong>Remember:</strong> Xavier balances the connections entering and leaving a layer.</p>"
      ],
      [
        "What is He initialization?",
        "<p>He initialization scales random weights to suit rectifying activations such as ReLU.</p><ul><li><strong>Reason:</strong> ReLU removes the negative part of its input.</li><li><strong>Scale:</strong> A common fan-in configuration uses weight variance 2 divided by fan-in.</li><li><strong>Purpose:</strong> Help maintain useful signal scales through many layers.</li></ul><p><strong>Remember:</strong> He initialization accounts for ReLU-like rectification.</p>"
      ]
    ]
  },
  {
    "title": "Vanishing / exploding gradient problem",
    "questions": [
      [
        "What are vanishing and exploding gradients, and how do they affect learning?",
        "<p>Vanishing gradients become too small to learn effectively; exploding gradients become excessively large.</p><ul><li><strong>Vanishing:</strong> Earlier layers may learn very slowly because their gradients are tiny.</li><li><strong>Exploding:</strong> Large gradients can cause unstable updates, huge losses, or non-finite values.</li><li><strong>Control:</strong> Suitable initialization and architecture help; clipping specifically limits large gradients.</li></ul><p><strong>Remember:</strong> Too small means weak learning; too large means unstable learning.</p>"
      ],
      [
        "What is a vanishing gradient?",
        "<p>A vanishing gradient is a backward learning signal that becomes very small.</p><ul><li><strong>Cause:</strong> Repeated derivative multiplications can shrink the signal.</li><li><strong>Effect:</strong> Earlier layers or distant sequence steps may learn slowly.</li><li><strong>Help:</strong> Suitable activations, initialization, shortcuts, or gated architectures can improve gradient flow.</li></ul><p><strong>Remember:</strong> A tiny gradient gives a weak learning signal.</p>"
      ],
      [
        "What is an exploding gradient?",
        "<p>An exploding gradient is a backward learning signal that becomes excessively large.</p><ul><li><strong>Cause:</strong> Repeated transformations can amplify derivatives.</li><li><strong>Effect:</strong> Large updates can make loss unstable or non-finite.</li><li><strong>Help:</strong> Gradient clipping and suitable initialization or training settings can improve stability.</li></ul><p><strong>Remember:</strong> An oversized gradient can produce an unstable update.</p>"
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
