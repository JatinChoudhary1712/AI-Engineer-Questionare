const topics = [
  {
    "title": "Encoder → latent space → decoder",
    "questions": [
      [
        "How does a variational autoencoder connect an encoder, latent space, and decoder?",
        "<p>A VAE learns a probabilistic representation of data and a decoder that generates observations from latent variables.</p><ul><li><strong>Encoder:</strong> Maps an input to parameters of an approximate posterior, often a mean and variance.</li><li><strong>Latent sample:</strong> Draw a representation from that posterior during reconstruction training.</li><li><strong>Decoder:</strong> Maps the latent representation to a distribution over outputs; new generation usually starts from the prior.</li></ul><p><strong>Remember:</strong> A VAE learns distributions over representations and outputs rather than only a deterministic compressed code.</p><p><a href=\"https://arxiv.org/abs/1312.6114\" target=\"_blank\" rel=\"noopener noreferrer\">Auto-Encoding Variational Bayes</a></p>"
      ]
    ]
  },
  {
    "title": "KL divergence loss + reconstruction loss",
    "questions": [
      [
        "Why does a VAE combine reconstruction and KL-divergence terms?",
        "<p>The objective balances explaining the observed data with keeping the approximate posterior related to a chosen prior.</p><ul><li><strong>Reconstruction:</strong> A negative log-likelihood encourages the decoder to explain the input; its form depends on the output distribution.</li><li><strong>Regularization:</strong> KL divergence penalizes deviation of the approximate posterior from the prior.</li><li><strong>Balance:</strong> Different weights and reductions change the tradeoff; too much pressure can make the latent code uninformative.</li></ul><p><strong>Remember:</strong> Reconstruction error alone does not provide a well-behaved latent space for sampling.</p><p class=\"formula\"><strong>Formula:</strong> <code>Loss = E_q[-log p(x | z)] + KL(q(z | x) || p(z))</code></p>"
      ]
    ]
  },
  {
    "title": "Reparameterization trick",
    "questions": [
      [
        "How does the reparameterization trick enable VAE training?",
        "<p>Express a random latent sample as a differentiable transformation of encoder outputs and independent noise.</p><ul><li><strong>Gaussian example:</strong> Sample epsilon from a standard normal and compute z as mu plus sigma times epsilon.</li><li><strong>Gradients:</strong> Backpropagate through mu and sigma while the noise distribution itself does not depend on encoder parameters.</li><li><strong>Parameterization:</strong> Predicting log variance can help represent positive variance through exponentiation.</li></ul><p><strong>Remember:</strong> The trick separates the source of randomness from the parameters being optimized.</p><p class=\"formula\"><strong>Formula:</strong> <code>z = mu + exp(0.5 * log_variance) * epsilon, epsilon ~ N(0, I)</code></p><pre><code class=\"language-python\">from math import exp\n\ndef reparameterize(mu, log_variance, epsilon):\n    if not (len(mu) == len(log_variance) == len(epsilon)):\n        raise ValueError(&quot;Latent dimensions must match&quot;)\n    return [m + exp(0.5 * v) * noise\n            for m, v, noise in zip(mu, log_variance, epsilon)]\n\n# Offline illustration; training needs differentiable tensor operations.\nassert reparameterize([0.0], [0.0], [1.0]) == [1.0]</code></pre>"
      ]
    ]
  },
  {
    "title": "Applications: image generation, anomaly detection",
    "questions": [
      [
        "How can a VAE support image generation and anomaly detection?",
        "<p>It can generate samples from its learned latent model and assign reconstruction-based or probabilistic signals to inputs.</p><ul><li><strong>Generation:</strong> Sample from the prior and decode, evaluating diversity and quality against the task.</li><li><strong>Detection:</strong> Inputs that are poorly explained may be anomaly candidates, subject to calibration.</li><li><strong>Limits:</strong> Reconstruction or likelihood is not a universal anomaly test; some unusual inputs can still be reconstructed well.</li></ul><p><strong>Remember:</strong> Evaluate anomaly thresholds and false positives on representative data rather than assuming errors identify every anomaly.</p>"
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
