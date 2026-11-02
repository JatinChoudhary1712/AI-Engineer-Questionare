const topics = [
  {
    "title": "Sora (OpenAI) - text-to-video",
    "questions": [
      [
        "How should the roadmap's Sora text-to-video topic be studied now?",
        "<p>Study the generation concept while checking the named product and API's lifecycle before planning an integration.</p><ul><li><strong>Historical capability:</strong> Text-to-video generation produces a temporally structured visual sequence from conditioning inputs.</li><li><strong>Availability:</strong> OpenAI's deprecation page lists the Videos API and Sora 2 shutdown as September 24, 2026.</li><li><strong>Integration lesson:</strong> Use supported documented services and evaluate motion, consistency, duration, and artifact handling rather than copying a retired endpoint.</li></ul><p><strong>Remember:</strong> A model's research or product history is different from current developer access.</p><p><a href=\"https://developers.openai.com/api/docs/deprecations\" target=\"_blank\" rel=\"noopener noreferrer\">Official OpenAI deprecations: Sora and Videos API</a></p>"
      ]
    ]
  },
  {
    "title": "Runway ML, Pika Labs",
    "questions": [
      [
        "What should you evaluate when integrating Runway or Pika video generation?",
        "<p>Evaluate the exact product, model, and supported integration path against the intended video workflow.</p><ul><li><strong>Inputs:</strong> Check prompt, reference image, clip, duration, and output requirements supported by the chosen model.</li><li><strong>Jobs:</strong> Handle asynchronous status, failures, cancellation, downloads, and retention where relevant.</li><li><strong>Quality:</strong> Inspect temporal consistency, motion, subject identity, and prompt adherence across the whole clip.</li></ul><p><strong>Remember:</strong> A convincing single frame is not enough to validate a generated video.</p><p><a href=\"https://docs.dev.runwayml.com/\" target=\"_blank\" rel=\"noopener noreferrer\">Runway developer documentation</a></p><p><a href=\"https://pika.art/\" target=\"_blank\" rel=\"noopener noreferrer\">Pika official product and developer entry points</a></p>"
      ]
    ]
  },
  {
    "title": "Video understanding with Gemini",
    "questions": [
      [
        "How can Gemini support video understanding?",
        "<p>Supported Gemini workflows process video input to answer questions or extract information about its content.</p><ul><li><strong>Preparation:</strong> Follow the selected model's media-upload, duration, resolution, and context requirements.</li><li><strong>Time:</strong> Preserve timestamps and evaluate whether sampling captures the events the question depends on.</li><li><strong>Evidence:</strong> Verify important claims against the original clip and do not assume an understanding model also offers video generation.</li></ul><p><strong>Remember:</strong> Video input support does not guarantee that every brief event is observed or interpreted correctly.</p><p><a href=\"https://ai.google.dev/gemini-api/docs/video-understanding\" target=\"_blank\" rel=\"noopener noreferrer\">Gemini video-understanding documentation</a></p>"
      ]
    ]
  },
  {
    "title": "Frame-by-frame analysis",
    "questions": [
      [
        "What are the strengths and limitations of frame-by-frame video analysis?",
        "<p>It reduces video processing to selected images, making some tasks simpler while losing continuous temporal and audio information.</p><ul><li><strong>Sampling:</strong> Choose frames by time interval or events and retain their timestamps.</li><li><strong>Analysis:</strong> Use image tasks such as OCR, scene description, or object detection on the chosen frames.</li><li><strong>Limits:</strong> Brief actions, motion direction, continuity, and audio cues may be missed; avoid treating sparse frames as complete evidence.</li></ul><p><strong>Remember:</strong> Frame sampling is an explicit information tradeoff that must fit the question.</p><pre><code class=\"language-python\">from math import ceil, isfinite\n\ndef frame_times(duration_seconds, interval_seconds):\n    if not (isfinite(duration_seconds) and isfinite(interval_seconds)):\n        raise ValueError(&quot;Times must be finite&quot;)\n    if duration_seconds &lt; 0 or interval_seconds &lt;= 0:\n        raise ValueError(&quot;Duration must be nonnegative and interval positive&quot;)\n    count = ceil(duration_seconds / interval_seconds)\n    return [i * interval_seconds for i in range(count)]\n\nassert frame_times(2.5, 1.0) == [0.0, 1.0, 2.0]\n# Illustration only: decode frames at these times and retain their timestamps.</code></pre>"
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
