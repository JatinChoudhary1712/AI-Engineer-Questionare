const topics = [
  {
    "title": "Vision-Language Models (VLMs)",
    "questions": [
      [
        "What is a vision-language model?",
        "<p>It is a model that connects visual information and language for tasks such as describing, querying, or reasoning about images.</p><ul><li><strong>Representation:</strong> Visual features must be connected to a language representation or generation component.</li><li><strong>Inputs:</strong> Supported image formats, resolution, and media limits depend on the model and serving interface.</li><li><strong>Limits:</strong> Fine text, counting, spatial relationships, and unusual images can still cause mistakes.</li></ul><p><strong>Remember:</strong> Multimodal capability does not make every visual interpretation reliable.</p>"
      ]
    ]
  },
  {
    "title": "GPT-4V / GPT-4o - text + image input",
    "questions": [
      [
        "How should GPT-4V and GPT-4o image-input examples be interpreted?",
        "<p>They illustrate vision-capable model interfaces from particular model generations, not permanent availability guarantees.</p><ul><li><strong>Request:</strong> Provide images using the supported typed input format with a clear task instruction.</li><li><strong>Budget:</strong> Account for image processing, context limits, latency, and privacy.</li><li><strong>Compatibility:</strong> Check the actual selected model's supported modalities and lifecycle before copying an older example.</li></ul><p><strong>Remember:</strong> Image understanding and image generation are separate capabilities to verify.</p>"
      ]
    ]
  },
  {
    "title": "Claude 3 Vision",
    "questions": [
      [
        "What should an application consider when using Claude vision?",
        "<p>Match the chosen Claude model and API's image support to a concrete visual task.</p><ul><li><strong>Preparation:</strong> Supply supported image content with appropriate resolution and relevant surrounding instructions.</li><li><strong>Reasoning:</strong> Identify the image or region being discussed when multiple visual inputs are present.</li><li><strong>Verification:</strong> Check uncertain OCR, tiny details, charts, or consequential interpretations against source data.</li></ul><p><strong>Remember:</strong> Claude 3 Vision is a roadmap-era reference; deployment depends on the exact supported model and request format.</p>"
      ]
    ]
  },
  {
    "title": "Gemini (text + image + video + audio)",
    "questions": [
      [
        "How does a multimodal Gemini workflow differ from a text-only workflow?",
        "<p>It must prepare supported media inputs and interpret outputs according to the selected model's modality capabilities.</p><ul><li><strong>Media:</strong> Text, images, video, and audio can have different upload, size, duration, and tokenization rules.</li><li><strong>Task:</strong> Decide whether the user needs understanding, transcription, generation, or a combination.</li><li><strong>Evaluation:</strong> Test cross-modal questions and timing or source alignment rather than only text fluency.</li></ul><p><strong>Remember:</strong> A provider's multimodal family does not imply identical capabilities across all model versions and endpoints.</p>"
      ]
    ]
  },
  {
    "title": "LLaVA - open-source VLM",
    "questions": [
      [
        "What is the main idea behind LLaVA-style visual instruction models?",
        "<p>They connect visual representations to a language model and train the system to follow instructions involving images.</p><ul><li><strong>Components:</strong> A vision encoder and a learned connection to the language model support image-conditioned responses.</li><li><strong>Checkpoints:</strong> Architecture, training, context, licensing, and serving requirements vary across releases.</li><li><strong>Evaluation:</strong> Compare actual visual-task performance and hardware costs rather than assuming an open checkpoint is interchangeable with a hosted model.</li></ul><p><strong>Remember:</strong> Loading compatible weights, preprocessing, and conversation formatting is essential.</p>"
      ]
    ]
  },
  {
    "title": "CLIP - connecting text and images",
    "questions": [
      [
        "How does CLIP connect images and text?",
        "<p>CLIP learns image and text representations that can be compared in a shared embedding space.</p><ul><li><strong>Training:</strong> Contrastive learning encourages matching image-text pairs to align relative to other pairs.</li><li><strong>Uses:</strong> Similarity supports retrieval or scoring candidate text labels for zero-shot classification.</li><li><strong>Distinction:</strong> CLIP itself is not a conversational text decoder or an image generator.</li></ul><p><strong>Remember:</strong> Shared embedding similarity is useful but can reflect dataset biases and wording choices.</p><p><a href=\"https://arxiv.org/abs/2103.00020\" target=\"_blank\" rel=\"noopener noreferrer\">CLIP original paper</a></p>"
      ]
    ]
  },
  {
    "title": "Applications: image captioning, visual QA, document understanding",
    "questions": [
      [
        "How do captioning, visual question answering, and document understanding differ?",
        "<p>They ask different questions of visual content and need different evaluation criteria.</p><ul><li><strong>Captioning:</strong> Summarize important visible content without inventing unsupported details.</li><li><strong>Visual QA:</strong> Answer a specific question that may require localization, counting, or relating objects.</li><li><strong>Documents:</strong> Preserve text, layout, tables, reading order, and source references rather than relying on a generic image description.</li></ul><p><strong>Remember:</strong> Choose preprocessing and checks for the actual output, not just the presence of an image input.</p><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Task</th><th scope=\"col\">Useful checks</th></tr></thead><tbody><tr><th scope=\"row\">Image captioning</th><td>Visible facts and important omissions</td></tr><tr><th scope=\"row\">Visual question answering</th><td>Question-specific correctness and evidence</td></tr><tr><th scope=\"row\">Document extraction</th><td>Text accuracy, layout, fields, tables, and source location</td></tr></tbody></table></div>"
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
