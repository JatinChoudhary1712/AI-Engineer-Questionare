const topics = [
  {
    "title": "DALL-E 3 API - OpenAI",
    "questions": [
      [
        "How should a DALL-E 3 lesson be used in a current OpenAI image integration?",
        "<p>Treat DALL-E 3 as a historical API topic and use the official migration and image-generation documentation before implementing a new integration.</p><ul><li><strong>Availability:</strong> OpenAI's deprecation page lists the DALL-E 3 API shutdown as May 12, 2026.</li><li><strong>Architecture:</strong> Keep provider credentials on the backend and validate image requests and outputs.</li><li><strong>Migration:</strong> Select a supported image model and recheck its parameters, capabilities, response format, and costs instead of only changing a model string.</li></ul><p><strong>Remember:</strong> A historical endpoint example should not be presented as a working current API recipe.</p><p><a href=\"https://developers.openai.com/api/docs/deprecations\" target=\"_blank\" rel=\"noopener noreferrer\">Official OpenAI deprecations</a></p><p><a href=\"https://developers.openai.com/api/docs/guides/image-generation\" target=\"_blank\" rel=\"noopener noreferrer\">Supported OpenAI image-generation workflows</a></p>"
      ]
    ]
  },
  {
    "title": "Stable Diffusion via Replicate / HuggingFace",
    "questions": [
      [
        "How do you integrate Stable Diffusion through Replicate or Hugging Face?",
        "<p>Choose an exact supported model or checkpoint and follow the serving platform's input, output, and execution contract.</p><ul><li><strong>Configuration:</strong> Pin useful version and generation settings, including dimensions and seed where supported.</li><li><strong>Lifecycle:</strong> Handle synchronous results or asynchronous jobs, failures, cancellation, and artifact retention as the platform requires.</li><li><strong>Deployment:</strong> Distinguish hosted inference from running Diffusers locally, which makes you responsible for hardware, memory, and runtime setup.</li></ul><p><strong>Remember:</strong> A model family name is not a complete reproducible deployment configuration.</p><p><a href=\"https://huggingface.co/docs/diffusers/using-diffusers/conditional_image_generation\" target=\"_blank\" rel=\"noopener noreferrer\">Diffusers text-to-image guide</a></p><p><a href=\"https://replicate.com/docs/topics/predictions/create-a-prediction\" target=\"_blank\" rel=\"noopener noreferrer\">Replicate prediction lifecycle</a></p>"
      ]
    ]
  },
  {
    "title": "Midjourney (no API, UI-based)",
    "questions": [
      [
        "What should you check before treating Midjourney as an API provider?",
        "<p>Verify official developer access rather than assuming that a third-party wrapper is an official supported interface.</p><ul><li><strong>Roadmap context:</strong> The official FAQ describes the service without a public API offering.</li><li><strong>Workflow:</strong> Use supported interfaces and current provider guidance for the intended integration.</li><li><strong>Alternatives:</strong> If the application requires programmatic generation, compare providers with documented suitable APIs.</li></ul><p><strong>Remember:</strong> A UI product and a supported developer API are different integration contracts.</p><p><a href=\"https://github.com/midjourney/docs/blob/main/data/faq.txt\" target=\"_blank\" rel=\"noopener noreferrer\">Official Midjourney FAQ</a></p>"
      ]
    ]
  },
  {
    "title": "Ideogram, Flux - newer models",
    "questions": [
      [
        "How should Ideogram and FLUX models be compared for a product?",
        "<p>Compare exact model versions and integration contracts on the outputs your application needs.</p><ul><li><strong>Quality:</strong> Evaluate composition, text rendering, editing behavior, and consistency where relevant.</li><li><strong>Operations:</strong> Measure latency, output formats, supported inputs, and repeatability with your settings.</li><li><strong>Access:</strong> Check provider documentation and model licenses rather than assuming all checkpoints or hosted services have identical terms.</li></ul><p><strong>Remember:</strong> Newer is not a substitute for task-specific evaluation.</p><p><a href=\"https://developer.ideogram.ai/\" target=\"_blank\" rel=\"noopener noreferrer\">Ideogram developer documentation</a></p><p><a href=\"https://docs.bfl.ai/\" target=\"_blank\" rel=\"noopener noreferrer\">Black Forest Labs documentation</a></p>"
      ]
    ]
  },
  {
    "title": "Prompt engineering for image generation",
    "questions": [
      [
        "What makes an image-generation prompt clear and testable?",
        "<p>Describe the subject, composition, visual treatment, and required constraints in concrete terms.</p><ul><li><strong>Scene:</strong> State what should be present and the important relationships among elements.</li><li><strong>Appearance:</strong> Specify lighting, viewpoint, medium, palette, and framing when they matter.</li><li><strong>Evaluation:</strong> Change a small number of variables at a time and record the model and settings with each comparison.</li></ul><p><strong>Remember:</strong> Clear visual requirements are easier to assess than a long list of vague quality adjectives.</p><p class=\"example\"><strong>Example:</strong> A ceramic mug on a pale wooden table, side-lit by a window, close-up product photograph, neutral background, subject centered with space above for a headline. Review composition and lighting separately from whether the object looks plausible.</p>"
      ]
    ]
  },
  {
    "title": "Negative prompts",
    "questions": [
      [
        "What does a negative prompt do, and when is it supported?",
        "<p>It supplies undesired concepts through a pipeline-specific conditioning mechanism when that model and interface support it.</p><ul><li><strong>Mechanism:</strong> In common diffusion workflows, negative conditioning can affect the guidance prediction rather than acting as a guaranteed exclusion filter.</li><li><strong>Compatibility:</strong> Check the selected model and API; not every generator accepts a negative_prompt parameter.</li><li><strong>Limits:</strong> Negative wording can be ignored or have side effects, so inspect results against the actual requirements.</li></ul><p><strong>Remember:</strong> A negative prompt is a generation control, not a reliable safety or validation boundary.</p>"
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
