const topics = [
  {
    "title": "OpenAI Whisper - speech-to-text",
    "questions": [
      [
        "What does Whisper do, and what can go wrong in transcription?",
        "<p>Whisper is a speech-recognition model family that maps audio to text and supports related speech tasks.</p><ul><li><strong>Inputs:</strong> Use the expected audio preprocessing and distinguish local model execution from a hosted transcription API.</li><li><strong>Evaluation:</strong> Test accents, noise, language, terminology, timestamps, and silence handling on your own recordings.</li><li><strong>Reliability:</strong> Check uncertain or hallucinated transcripts against the audio before using them for important decisions.</li></ul><p><strong>Remember:</strong> Speech-to-text produces an interpretation of audio rather than a perfect verbatim record.</p><p><a href=\"https://github.com/openai/whisper\" target=\"_blank\" rel=\"noopener noreferrer\">Whisper model code and documentation</a></p>"
      ]
    ]
  },
  {
    "title": "TTS: OpenAI TTS, ElevenLabs, Coqui",
    "questions": [
      [
        "How should OpenAI TTS, ElevenLabs, and Coqui-based TTS be compared?",
        "<p>Compare the exact service or model for intelligibility, voice options, language, latency, and deployment needs.</p><ul><li><strong>Output:</strong> Choose supported formats and sample rates for the playback or downstream processing path.</li><li><strong>Operations:</strong> Hosted services and locally deployed software have different credential, scaling, and maintenance responsibilities.</li><li><strong>Compatibility:</strong> Check current model access, project status, voice permissions, and licensing before reusing a roadmap example.</li></ul><p><strong>Remember:</strong> Text-to-speech quality and operating constraints both matter for a usable voice product.</p><p><a href=\"https://developers.openai.com/api/docs/guides/text-to-speech\" target=\"_blank\" rel=\"noopener noreferrer\">OpenAI text-to-speech documentation</a></p><p><a href=\"https://elevenlabs.io/docs/overview/capabilities/voices\" target=\"_blank\" rel=\"noopener noreferrer\">ElevenLabs voice capabilities</a></p><p><a href=\"https://github.com/coqui-ai/TTS\" target=\"_blank\" rel=\"noopener noreferrer\">Coqui TTS project</a></p>"
      ]
    ]
  },
  {
    "title": "Music generation: Suno, Udio",
    "questions": [
      [
        "How is music generation different from ordinary text-to-speech?",
        "<p>It models musical structure and sound rather than merely reading supplied text aloud.</p><ul><li><strong>Conditioning:</strong> A request may specify instrumentation, mood, tempo, structure, or lyrics depending on the product.</li><li><strong>Evaluation:</strong> Listen for coherence, timing, audio quality, and whether the output matches the creative brief.</li><li><strong>Integration:</strong> Suno and Udio are product examples; verify supported access, export behavior, and usage terms instead of assuming a public API.</li></ul><p><strong>Remember:</strong> A generated track is an audio artifact that needs listening and workflow checks, not just a text response.</p>"
      ]
    ]
  },
  {
    "title": "Voice cloning",
    "questions": [
      [
        "What is voice cloning, and what boundaries should a product establish?",
        "<p>Voice cloning conditions synthesis on recordings or a representation of a particular speaker's vocal characteristics.</p><ul><li><strong>Permission:</strong> Use authorized recordings and obtain the required speaker consent for the intended use.</li><li><strong>Protection:</strong> Restrict enrollment, voice access, and retained recordings, and distinguish synthetic output where appropriate.</li><li><strong>Limits:</strong> A similar-sounding voice is not proof of identity or authority and should not be used as an authentication guarantee.</li></ul><p><strong>Remember:</strong> Voice similarity is a generation feature, not permission to impersonate a person.</p>"
      ]
    ]
  },
  {
    "title": "Real-time speech processing",
    "questions": [
      [
        "What makes real-time speech processing operationally different?",
        "<p>The system must process changing audio incrementally while meeting interactive timing and turn-taking needs.</p><ul><li><strong>Pipeline:</strong> Coordinate capture, voice activity detection, transcription or speech-model processing, and playback.</li><li><strong>State:</strong> Distinguish partial and final transcripts and handle interruption or barge-in without replaying stale output.</li><li><strong>Latency:</strong> Measure buffering, networking, model processing, and output audio rather than only generation speed.</li></ul><p><strong>Remember:</strong> A responsive conversation needs correct streaming state as well as a fast model.</p>"
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
