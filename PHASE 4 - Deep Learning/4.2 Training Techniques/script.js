const topics = [
  {
    "title": "Batch normalization - stabilizing training",
    "questions": [
      [
        "What is batch normalization, and how does it help stabilize training?",
        "<p>Batch normalization normalizes intermediate features using batch statistics and a learned scale and shift.</p><ul><li><strong>Statistics:</strong> During training, compute means and variances for each feature or channel; CNN versions also include spatial positions.</li><li><strong>Learned adjustment:</strong> Gamma scales and beta shifts the normalized values.</li><li><strong>Evaluation:</strong> Standard BatchNorm uses running statistics at inference; tiny effective sample counts can give noisy training estimates.</li></ul><p class=\"formula\"><strong>Formula:</strong> <code>x_normalized = (x - mean) / sqrt(variance + epsilon); y = gamma * x_normalized + beta</code></p><p><strong>Symbols:</strong> Epsilon is a small positive number for numerical stability; gamma and beta are learned parameters.</p><p><strong>Remember:</strong> BatchNorm normalizes features across the batch, then learns their scale and shift.</p><p><a href=\"https://docs.pytorch.org/docs/stable/generated/torch.nn.BatchNorm1d.html\" target=\"_blank\" rel=\"noopener noreferrer\">PyTorch BatchNorm</a></p>"
      ],
      [
        "How does BatchNorm differ between training and evaluation?",
        "<p>Standard BatchNorm uses current batch statistics during training and stored running statistics during evaluation.</p><ul><li><strong>Training:</strong> Normalize with batch-derived means and variances.</li><li><strong>Running estimates:</strong> Update estimates that summarize training statistics.</li><li><strong>Evaluation:</strong> Normally reuse those stored estimates instead of the current batch.</li></ul><p><strong>Remember:</strong> Batch statistics for training; running statistics for ordinary evaluation.</p><p><a href=\"https://docs.pytorch.org/docs/stable/generated/torch.nn.BatchNorm1d.html\" target=\"_blank\" rel=\"noopener noreferrer\">PyTorch BatchNorm</a></p>"
      ]
    ]
  },
  {
    "title": "Layer normalization - used in transformers",
    "questions": [
      [
        "What is layer normalization, and why is it used in transformers?",
        "<p>Layer normalization normalizes selected features within each example, independently of other batch examples.</p><ul><li><strong>Axes:</strong> In a typical transformer, normalize the hidden-feature dimension separately for each token.</li><li><strong>Consistency:</strong> Use input statistics during both training and inference; no batch running averages are needed.</li><li><strong>Sequences:</strong> Avoid dependence on batch size and other examples, which is useful for variable-length sequence work.</li></ul><p><strong>Remember:</strong> LayerNorm normalizes within a token; BatchNorm typically uses other batch examples.</p><p><a href=\"https://docs.pytorch.org/docs/stable/generated/torch.nn.LayerNorm.html\" target=\"_blank\" rel=\"noopener noreferrer\">PyTorch LayerNorm</a></p>"
      ],
      [
        "How is LayerNorm different from BatchNorm?",
        "<p>LayerNorm normalizes features within an example; BatchNorm typically normalizes each feature across examples.</p><ul><li><strong>LayerNorm:</strong> In transformers, usually normalize each token's hidden features.</li><li><strong>BatchNorm:</strong> Use statistics across the batch and, for CNNs, relevant spatial positions.</li><li><strong>Dependence:</strong> LayerNorm does not depend on other examples in the batch.</li></ul><p><strong>Remember:</strong> LayerNorm works within an example; BatchNorm uses the batch.</p><p><a href=\"https://docs.pytorch.org/docs/stable/generated/torch.nn.LayerNorm.html\" target=\"_blank\" rel=\"noopener noreferrer\">PyTorch LayerNorm</a></p>"
      ]
    ]
  },
  {
    "title": "Dropout - stochastic regularization",
    "questions": [
      [
        "What is dropout, and how does it help reduce overfitting?",
        "<p>Dropout randomly zeros some activations during training to reduce overfitting.</p><ul><li><strong>Training:</strong> Drop activations with probability p so the model cannot rely on exactly the same pathways every time.</li><li><strong>Scaling:</strong> Inverted dropout multiplies surviving activations by 1 divided by one minus p.</li><li><strong>Inference:</strong> Standard dropout is disabled; it does not guarantee better generalization.</li></ul><p class=\"formula\"><strong>Formula:</strong> <code>training_output = mask * x / (1 - p); inference_output = x</code></p><p class=\"example\"><strong>Example:</strong> With p = 0.5, each surviving activation is multiplied by 2 during training.</p><p><strong>Remember:</strong> Randomly drop during training; use all activations during ordinary inference.</p><p><a href=\"https://docs.pytorch.org/docs/stable/generated/torch.nn.Dropout.html\" target=\"_blank\" rel=\"noopener noreferrer\">PyTorch Dropout</a></p>"
      ],
      [
        "How does dropout behave during training and inference?",
        "<p>Standard dropout randomly masks activations during training and is disabled during ordinary inference.</p><ul><li><strong>Training:</strong> Set selected activations to zero.</li><li><strong>Scaling:</strong> Inverted dropout scales surviving values to preserve their expected value.</li><li><strong>Inference:</strong> Use activations without random dropout masking.</li></ul><p><strong>Remember:</strong> Mask while learning; disable the mask for ordinary prediction.</p><p><a href=\"https://docs.pytorch.org/docs/stable/generated/torch.nn.Dropout.html\" target=\"_blank\" rel=\"noopener noreferrer\">PyTorch Dropout</a></p>"
      ]
    ]
  },
  {
    "title": "Residual connections (skip connections) - used in every modern model",
    "questions": [
      [
        "What is a residual or skip connection, and why is it useful?",
        "<p>A residual connection adds a block's input to its transformed output.</p><ul><li><strong>Shortcut:</strong> The identity path carries information alongside the learned transformation.</li><li><strong>Optimization:</strong> The block can learn a correction to its input, with an additional path for gradient flow.</li><li><strong>Shapes:</strong> Input and output must match for addition; use a projection when needed.</li></ul><p class=\"formula\"><strong>Formula:</strong> <code>y = F(x) + x; with a projection: y = F(x) + P(x)</code></p><p><strong>Remember:</strong> Learn a correction and add it to the original input.</p>"
      ],
      [
        "How do skip connections help gradients flow?",
        "<p>A skip connection creates an additional path through which information and gradients can pass.</p><ul><li><strong>Identity path:</strong> Bypass the block's learned transformation.</li><li><strong>Correction:</strong> Let the block learn a change relative to its input.</li><li><strong>Optimization:</strong> Make deep networks easier to train without guaranteeing success.</li></ul><p><strong>Remember:</strong> A shortcut gives gradients another route through the network.</p>"
      ]
    ]
  },
  {
    "title": "Gradient clipping",
    "questions": [
      [
        "What is gradient clipping, and why is it used during training?",
        "<p>Gradient clipping limits gradient magnitude before the optimizer update.</p><ul><li><strong>Norm clipping:</strong> Rescale a gradient vector when its norm exceeds a threshold, preserving its direction when uniformly scaled.</li><li><strong>Value clipping:</strong> Clamp individual gradient elements to a chosen range.</li><li><strong>Purpose:</strong> Reduce exploding-gradient updates; clipping does not solve vanishing gradients or every cause of instability.</li></ul><p class=\"formula\"><strong>Formula:</strong> <code>g_clipped = g * min(1, max_norm / norm(g))</code></p><p><strong>Symbols:</strong> For a zero gradient norm, leave the gradient unchanged.</p><p class=\"example\"><strong>Example:</strong> If the gradient norm is 10 and the allowed norm is 1, multiply the gradient by 0.1.</p><p><strong>Remember:</strong> Compute gradients, clip them, then update weights.</p>"
      ],
      [
        "Does gradient clipping fix vanishing gradients?",
        "<p>Gradient clipping limits large gradients; it does not make tiny gradients larger.</p><ul><li><strong>Exploding gradients:</strong> Clipping can reduce unusually large gradient updates.</li><li><strong>Vanishing gradients:</strong> Better signal flow requires other architectural or initialization choices.</li><li><strong>Timing:</strong> Apply clipping after backpropagation and before the optimizer step.</li></ul><p><strong>Remember:</strong> Clipping caps oversized signals; it does not amplify weak ones.</p>"
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
