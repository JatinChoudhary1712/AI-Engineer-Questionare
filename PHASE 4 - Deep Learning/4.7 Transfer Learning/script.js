const topics = [
  {
    "title": "What is pretraining and why it matters",
    "questions": [
      [
        "What is pretraining, and why is it useful for downstream tasks?",
        "<p>Pretraining learns reusable model parameters on a source dataset before adapting to a downstream task.</p><ul><li><strong>Knowledge:</strong> The model learns representations useful beyond its original training objective.</li><li><strong>Adaptation:</strong> Reuse it as a feature extractor or fine-tune selected parameters.</li><li><strong>Limits:</strong> Transfer depends on task and data similarity; a pretrained model does not always beat training from scratch.</li></ul><p class=\"example\"><strong>Example:</strong> A model trained on large image data provides visual features for a smaller flower-classification dataset.</p><p><strong>Remember:</strong> Learn reusable patterns first, then adapt them to the task.</p>"
      ]
    ]
  },
  {
    "title": "Fine-tuning vs feature extraction",
    "questions": [
      [
        "What is the difference between fine-tuning and feature extraction?",
        "<p>Feature extraction freezes a pretrained backbone; fine-tuning updates some or all of its parameters.</p><ul><li><strong>Feature extraction:</strong> Train a new head while keeping backbone weights fixed.</li><li><strong>Fine-tuning:</strong> Continue training selected pretrained layers along with the task head.</li><li><strong>Choice:</strong> Frozen features are a useful small-data baseline; fine-tuning offers more adaptation but can overfit.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Strategy</th><th scope=\"col\">Backbone weights</th><th scope=\"col\">Typical use</th></tr></thead><tbody><tr><th scope=\"row\">Feature extraction</th><td>Frozen</td><td>Fast baseline with limited labeled data</td></tr><tr><th scope=\"row\">Fine-tuning</th><td>Some or all trainable</td><td>Adapt representations when validation supports it</td></tr></tbody></table></div><p><strong>Remember:</strong> Feature extraction reuses fixed features; fine-tuning adapts them.</p>"
      ]
    ]
  },
  {
    "title": "Freezing layers",
    "questions": [
      [
        "What does freezing a layer mean, and why do we freeze pretrained layers?",
        "<p>Freezing a layer prevents its parameters from being updated while other layers learn.</p><ul><li><strong>Purpose:</strong> Preserve useful pretrained features and reduce trainable parameter count.</li><li><strong>Adaptation:</strong> Train a new head first, then optionally unfreeze selected layers with a smaller learning rate.</li><li><strong>Caution:</strong> Freezing parameters does not automatically set BatchNorm or dropout to evaluation mode.</li></ul><pre><code class=\"language-python\">import torch\n\nbackbone = torch.nn.Linear(4, 8)  # Substitute your pretrained backbone.\nfor parameter in backbone.parameters():\n    parameter.requires_grad_(False)\n\nhead = torch.nn.Linear(8, 2)\nmodel = torch.nn.Sequential(backbone, torch.nn.ReLU(), head)\noptimizer = torch.optim.Adam(head.parameters(), lr=0.001)</code></pre><p><strong>Remember:</strong> Frozen weights stay fixed; model mode is a separate decision.</p>"
      ]
    ]
  },
  {
    "title": "ImageNet moment for NLP",
    "questions": [
      [
        "What does the ImageNet moment for NLP refer to, and which models helped establish it?",
        "<p>The ImageNet moment for NLP refers to the rise of broadly reusable pretrained language representations.</p><ul><li><strong>ELMo:</strong> Made contextual word representations from a pretrained language model useful across tasks.</li><li><strong>ULMFiT and GPT:</strong> Helped establish language-model pretraining followed by task adaptation.</li><li><strong>BERT:</strong> Made bidirectional transformer pretraining and fine-tuning widely influential; the phrase describes a transition, not one official event.</li></ul><p><strong>Remember:</strong> Large-scale pretraining became a reusable starting point for language tasks.</p><p><a href=\"https://arxiv.org/abs/1802.05365\" target=\"_blank\" rel=\"noopener noreferrer\">ELMo paper</a> / <a href=\"https://arxiv.org/abs/1801.06146\" target=\"_blank\" rel=\"noopener noreferrer\">ULMFiT paper</a> / <a href=\"https://arxiv.org/abs/1810.04805\" target=\"_blank\" rel=\"noopener noreferrer\">BERT paper</a></p>"
      ]
    ]
  },
  {
    "title": "Using HuggingFace pretrained models",
    "questions": [
      [
        "How do you use a pretrained HuggingFace model and tokenizer for a downstream task?",
        "<p>Use a tokenizer matched to a pretrained checkpoint and a model head suited to the downstream task.</p><ol><li><strong>Load:</strong> Select a compatible tokenizer and a task-specific model or pipeline.</li><li><strong>Prepare:</strong> Tokenize text into the input tensors expected by the checkpoint.</li><li><strong>Adapt:</strong> A task-tuned checkpoint can predict directly; a new or changed task head needs training on labeled data.</li></ol><pre><code class=\"language-python\"># Requires torch, transformers, and a first-time checkpoint download.\nfrom transformers import pipeline\n\nclassifier = pipeline(\n    'sentiment-analysis',\n    model='distilbert/distilbert-base-uncased-finetuned-sst-2-english',\n    device=-1,\n)\nprint(classifier('This course is useful.'))\n# This checkpoint is already fine-tuned for English sentiment classification.\n# A new label set requires training an appropriate task head.</code></pre><p><strong>Remember:</strong> Match tokenizer, checkpoint, and task head before making predictions.</p><p><a href=\"https://huggingface.co/docs/transformers/tasks/sequence_classification\" target=\"_blank\" rel=\"noopener noreferrer\">Hugging Face text classification</a></p>"
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
let number = 40;
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
