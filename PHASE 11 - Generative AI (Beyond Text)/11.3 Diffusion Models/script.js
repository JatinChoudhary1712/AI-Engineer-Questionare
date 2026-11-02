const topics = [
  {
    "title": "Forward process - adding noise to data",
    "questions": [
      [
        "What happens during the forward process of a diffusion model?",
        "<p>A defined noise process gradually corrupts training data according to a schedule.</p><ul><li><strong>Timesteps:</strong> Each noise level specifies how much signal remains and how much randomness is added.</li><li><strong>Training pairs:</strong> Sample a timestep and construct a noisy example from a clean sample and noise.</li><li><strong>Endpoint:</strong> The process is commonly designed to approach a simple distribution such as Gaussian noise.</li></ul><p><strong>Remember:</strong> The forward corruption process provides the supervised denoising problem used in training.</p><p class=\"formula\"><strong>Formula:</strong> <code>x_t = sqrt(alpha_bar_t) * x_0 + sqrt(1 - alpha_bar_t) * epsilon</code></p>"
      ]
    ]
  },
  {
    "title": "Reverse process - learning to denoise",
    "questions": [
      [
        "How does the reverse diffusion process generate a sample?",
        "<p>A learned model guides a sequence of denoising or generative updates from an initial noisy state.</p><ul><li><strong>Prediction:</strong> Depending on the parameterization, predict noise, a clean sample, velocity, or another equivalent training target.</li><li><strong>Sampling:</strong> A scheduler or solver uses those predictions to move through noise levels.</li><li><strong>Output:</strong> In latent diffusion, decode the final latent representation into the image space.</li></ul><p><strong>Remember:</strong> The reverse process is learned generation, not exact recovery of the particular training image that supplied the noise.</p>"
      ]
    ]
  },
  {
    "title": "DDPM (Denoising Diffusion Probabilistic Models)",
    "questions": [
      [
        "What is the central training idea in DDPM?",
        "<p>Denoising Diffusion Probabilistic Models learn a reverse generative process matched to a noise-corruption process.</p><ul><li><strong>Inputs:</strong> Train a denoiser on noisy data with timestep information.</li><li><strong>Objective:</strong> A commonly used simplified loss compares sampled noise with predicted noise.</li><li><strong>Inference:</strong> Generate by repeatedly applying the model through a chosen reverse sampling schedule.</li></ul><p><strong>Remember:</strong> Training objectives and inference schedulers are related choices but need not be the same implementation.</p><p><a href=\"https://arxiv.org/abs/2006.11239\" target=\"_blank\" rel=\"noopener noreferrer\">DDPM original paper</a></p>"
      ]
    ]
  },
  {
    "title": "Score matching",
    "questions": [
      [
        "What does score matching mean in diffusion modeling?",
        "<p>The score is the gradient of the log density with respect to the data variable, not a classification confidence score.</p><ul><li><strong>Learning:</strong> Estimate score information for noisy data distributions.</li><li><strong>Denoising connection:</strong> Under Gaussian corruption, noise prediction and score estimation are related through the noise scale.</li><li><strong>Sampling:</strong> Use the learned direction field within a suitable stochastic or deterministic generation procedure.</li></ul><p><strong>Remember:</strong> A learned score describes local density structure; it is not an image-quality rating.</p>"
      ]
    ]
  },
  {
    "title": "DDIM - faster sampling",
    "questions": [
      [
        "How can DDIM sampling reduce diffusion generation time?",
        "<p>DDIM introduces a family of sampling procedures that can use fewer steps with a compatible trained denoiser.</p><ul><li><strong>Reuse:</strong> Common DDPM-style training can support a DDIM sampling procedure.</li><li><strong>Determinism:</strong> A particular zero-stochasticity setting can make sampling deterministic for fixed inputs and configuration.</li><li><strong>Tradeoff:</strong> Fewer steps can reduce latency while changing fidelity, diversity, or prompt adherence.</li></ul><p><strong>Remember:</strong> Faster sampling is a measured quality-versus-compute choice rather than a promise that every reduced schedule works equally well.</p><p><a href=\"https://arxiv.org/abs/2010.02502\" target=\"_blank\" rel=\"noopener noreferrer\">DDIM original paper</a></p>"
      ]
    ]
  },
  {
    "title": "Classifier-free guidance",
    "questions": [
      [
        "How does classifier-free guidance steer a diffusion model?",
        "<p>It combines conditioned and unconditioned predictions to change the strength of conditioning during sampling.</p><ul><li><strong>Training:</strong> A common setup teaches a model both conditional and unconditional predictions through condition dropping.</li><li><strong>Inference:</strong> Move the unconditional prediction toward the conditional one using a guidance scale.</li><li><strong>Tradeoff:</strong> Strong guidance can improve prompt adherence while reducing diversity or creating artifacts.</li></ul><p><strong>Remember:</strong> Guidance settings are model- and scheduler-dependent, and some modern pipelines expose different controls.</p><p class=\"formula\"><strong>Formula:</strong> <code>epsilon_guided = epsilon_uncond + s * (epsilon_cond - epsilon_uncond)</code></p><p><a href=\"https://arxiv.org/abs/2207.12598\" target=\"_blank\" rel=\"noopener noreferrer\">Classifier-free guidance paper</a></p>"
      ]
    ]
  },
  {
    "title": "Stable Diffusion architecture",
    "questions": [
      [
        "What are the main parts of a classic Stable Diffusion pipeline?",
        "<p>Classic Stable Diffusion combines text conditioning, latent-space denoising, and an image autoencoder.</p><ul><li><strong>Conditioning:</strong> A text encoder produces a representation used to condition generation.</li><li><strong>Latent denoising:</strong> A denoiser, commonly a U-Net in classic versions, iteratively updates image latents with a scheduler.</li><li><strong>Decoding:</strong> The autoencoder's decoder converts final latents to pixels.</li></ul><p><strong>Remember:</strong> Stable Diffusion is a family; do not assume every later checkpoint has the same text encoders, denoiser, or latent configuration.</p><pre><code>Prompt -> Text encoder -> Conditioning\n                                  |\nNoise latents -> Denoiser + scheduler (repeat) -> Final latents\n                                                       |\n                                                 VAE decoder\n                                                       |\n                                                     Image</code></pre><p><a href=\"https://arxiv.org/abs/2112.10752\" target=\"_blank\" rel=\"noopener noreferrer\">Latent diffusion paper</a></p>"
      ]
    ]
  },
  {
    "title": "ControlNet - conditional generation",
    "questions": [
      [
        "What does ControlNet add to text-to-image diffusion?",
        "<p>It adds a way to condition generation on structured controls such as edges, depth, or pose in a compatible pipeline.</p><ul><li><strong>Input:</strong> Prepare the control representation expected by the trained ControlNet model.</li><li><strong>Conditioning:</strong> Combine spatial guidance with the underlying generation model's other inputs.</li><li><strong>Tuning:</strong> Adjust control strength and schedule while checking preservation of required structure.</li></ul><p><strong>Remember:</strong> A control image guides generation but does not guarantee exact reconstruction or semantic correctness.</p><p><a href=\"https://arxiv.org/abs/2302.05543\" target=\"_blank\" rel=\"noopener noreferrer\">ControlNet original paper</a></p>"
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
