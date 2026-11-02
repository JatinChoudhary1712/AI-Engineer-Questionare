const topics = [
  {
    "title": "Generator vs Discriminator",
    "questions": [
      [
        "What are the roles of a GAN generator and discriminator?",
        "<p>A generator produces samples, while a discriminator learns to distinguish training examples from generated samples.</p><ul><li><strong>Generator:</strong> Transforms noise and any conditioning input into a candidate sample.</li><li><strong>Discriminator:</strong> Supplies a learned training signal about whether a sample resembles the training distribution.</li><li><strong>Interaction:</strong> Training alternates or coordinates their updates; the discriminator is not usually needed for generation afterward.</li></ul><p><strong>Remember:</strong> The discriminator is a training opponent, not a guaranteed detector of real-world authenticity.</p>"
      ]
    ]
  },
  {
    "title": "Minimax game",
    "questions": [
      [
        "What does the GAN minimax objective try to achieve?",
        "<p>The original objective trains opposing models so generated samples become difficult to distinguish from training data.</p><ul><li><strong>Discriminator:</strong> Improve discrimination between real examples and generator outputs.</li><li><strong>Generator:</strong> Improve samples against the discriminator's changing signal.</li><li><strong>Practice:</strong> Non-saturating and other losses can change optimization behavior from the original minimax formulation.</li></ul><p><strong>Remember:</strong> A theoretically motivated game can still be unstable under finite data, models, and optimization.</p><p class=\"formula\"><strong>Formula:</strong> <code>min_G max_D E_x[log D(x)] + E_z[log(1 - D(G(z)))]</code></p><p><a href=\"https://arxiv.org/abs/1406.2661\" target=\"_blank\" rel=\"noopener noreferrer\">Original GAN paper</a></p>"
      ]
    ]
  },
  {
    "title": "Mode collapse - the main challenge",
    "questions": [
      [
        "What is mode collapse, and how can it be detected?",
        "<p>Mode collapse occurs when a generator produces a limited range of outputs instead of covering the diversity of the data.</p><ul><li><strong>Symptom:</strong> Different latent inputs yield similar samples or omit important categories.</li><li><strong>Evaluation:</strong> Examine diversity and coverage as well as how realistic individual images look.</li><li><strong>Mitigation:</strong> Try appropriate objectives, regularization, architecture, and training balance, then test rather than assuming one fix always works.</li></ul><p><strong>Remember:</strong> Sharp-looking samples can hide poor distribution coverage.</p>"
      ]
    ]
  },
  {
    "title": "Conditional GANs (cGAN)",
    "questions": [
      [
        "How does a conditional GAN differ from an unconditional GAN?",
        "<p>A conditional GAN uses additional information to guide what is generated and how outputs are judged during training.</p><ul><li><strong>Conditions:</strong> Labels, text, or source images can specify the desired output category or transformation.</li><li><strong>Training:</strong> Provide the relevant condition to the generator and discriminator in the chosen design.</li><li><strong>Validation:</strong> Measure whether samples satisfy the condition while retaining realism and diversity.</li></ul><p><strong>Remember:</strong> Conditioning works through the trained architecture and data, not merely by adding an arbitrary label at inference time.</p>"
      ]
    ]
  },
  {
    "title": "StyleGAN, DCGAN",
    "questions": [
      [
        "What architectural ideas distinguish DCGAN and StyleGAN?",
        "<p>They illustrate different developments in GAN image synthesis rather than interchangeable model names.</p><ul><li><strong>DCGAN:</strong> Uses a convolutional generator/discriminator design and training conventions for image generation.</li><li><strong>StyleGAN:</strong> Uses a mapping network and style-based controls that influence generation across layers.</li><li><strong>Evaluation:</strong> Compare the exact model version, resolution, data, diversity, and controllability required by the task.</li></ul><p><strong>Remember:</strong> Model-family names identify design ideas, not a universal ranking for every dataset.</p>"
      ]
    ]
  },
  {
    "title": "Applications: image synthesis, style transfer",
    "questions": [
      [
        "When are GANs useful for image synthesis or style transfer?",
        "<p>They can learn to generate images or translate between visual domains when the training setup supports the intended transformation.</p><ul><li><strong>Synthesis:</strong> Learn a distribution of images and sample new examples.</li><li><strong>Translation:</strong> Train an appropriate conditional or image-to-image system for the desired source and target relationship.</li><li><strong>Limits:</strong> Not every GAN performs arbitrary style transfer, preserves identity, or maintains source geometry without additional design.</li></ul><p><strong>Remember:</strong> Choose the task-specific model and evaluate both visual quality and the information that must remain unchanged.</p>"
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
