const topics = [
  {
    "title": "Model comparison",
    "questions": [
      [
        "How should we compare the pretrained models in this roadmap?",
        "<p>Compare documented architecture, input-output capabilities, access, and measured task performance rather than assuming one universal best model.</p><ul><li><strong>Architecture:</strong> Encoder, decoder, and encoder-decoder describe structural patterns, not a complete quality ranking.</li><li><strong>Evidence:</strong> For proprietary families, distinguish documented capabilities from undisclosed implementation details.</li><li><strong>Version:</strong> Treat the named models as learning references; availability, licenses, and capabilities vary by version.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Model reference</th><th scope=\"col\">Documented framing</th><th scope=\"col\">Common uses</th></tr></thead><tbody><tr><th scope=\"row\">BERT</th><td>Encoder-only transformer</td><td>Classification, NER, extractive QA</td></tr><tr><th scope=\"row\">GPT-4</th><td>Proprietary GPT-family generative model; full internals not inferred here</td><td>Historical generation and instruction-following reference</td></tr><tr><th scope=\"row\">Claude 3.5/4</th><td>Proprietary model generations; consult version documentation</td><td>Language assistance, analysis, coding; evaluate safety explicitly</td></tr><tr><th scope=\"row\">Gemini</th><td>Multimodal transformer family; original report uses decoder foundations</td><td>Version-specific multimodal tasks</td></tr><tr><th scope=\"row\">T5</th><td>Encoder-decoder transformer</td><td>Text-to-text and sequence transformation</td></tr><tr><th scope=\"row\">LLaMA 3</th><td>Decoder-only, open weights under a custom license</td><td>Adaptation and self-hosted language tasks when permitted</td></tr><tr><th scope=\"row\">Mistral 7B</th><td>Decoder-style model; distinguish base and instruct releases</td><td>Language-model deployment and adaptation</td></tr><tr><th scope=\"row\">Qwen 2.5</th><td>Causal language-model family with multilingual coverage</td><td>Multilingual generation and adaptation</td></tr></tbody></table></div><p><strong>Remember:</strong> Choose using verified model details and representative evaluation.</p><p><a href=\"https://developers.openai.com/api/docs/models/gpt-4\" target=\"_blank\" rel=\"noopener noreferrer\">GPT-4 official documentation</a> / <a href=\"https://arxiv.org/html/2312.11805v1\" target=\"_blank\" rel=\"noopener noreferrer\">Gemini technical report</a></p>"
      ]
    ]
  },
  {
    "title": "BERT",
    "questions": [
      [
        "What is BERT commonly used for?",
        "<p>BERT is an encoder-only transformer family used to build contextual representations for language-understanding tasks.</p><ul><li><strong>Context:</strong> Use bidirectional input context during representation learning.</li><li><strong>Tasks:</strong> Add suitable heads for classification, named entities, or extractive question answering.</li><li><strong>Training:</strong> The original BERT uses masked-language-model pretraining among its objectives.</li></ul><p><strong>Remember:</strong> BERT represents an input using context from both directions.</p><p><a href=\"https://arxiv.org/abs/1810.04805\" target=\"_blank\" rel=\"noopener noreferrer\">BERT paper</a></p>"
      ],
      [
        "Does a pretrained BERT checkpoint automatically solve every classification task?",
        "<p>No; a task-specific head and appropriate training or adaptation are usually needed.</p><ul><li><strong>Backbone:</strong> Reuse pretrained language representations.</li><li><strong>Head:</strong> Match outputs to the target labels and task.</li><li><strong>Evaluation:</strong> Check performance on held-out target-domain data.</li></ul><p><strong>Remember:</strong> Pretrained representations are a starting point, not a finished custom classifier.</p>"
      ]
    ]
  },
  {
    "title": "GPT-4",
    "questions": [
      [
        "What does GPT-4 illustrate in this NLP roadmap?",
        "<p>GPT-4 is a historical example of a proprietary GPT-family model used for generative language tasks.</p><ul><li><strong>Generation:</strong> Produce continuations or responses conditioned on input.</li><li><strong>Applications:</strong> Study generation, instruction following, and conversational interaction.</li><li><strong>Scope:</strong> This roadmap reference is not a claim about current API availability or a recommendation to deploy that exact version.</li></ul><p><strong>Remember:</strong> Use GPT-4 as a model-family learning example, not a current availability assumption.</p><p><a href=\"https://developers.openai.com/api/docs/models/gpt-4\" target=\"_blank\" rel=\"noopener noreferrer\">GPT-4 official documentation</a></p>"
      ],
      [
        "Should we infer a proprietary model's full architecture from its product name?",
        "<p>No; a family label and visible behavior do not establish every internal implementation detail.</p><ul><li><strong>Known information:</strong> Use the provider's actual technical documentation.</li><li><strong>Unknown details:</strong> Do not invent layer counts, parameter counts, or exact hidden design choices.</li><li><strong>Study pattern:</strong> Learn causal decoder-style generation separately from undocumented claims about a product.</li></ul><p><strong>Remember:</strong> Teach the documented concept and label unknown internals as unknown.</p>"
      ]
    ]
  },
  {
    "title": "Claude 3.5/4",
    "questions": [
      [
        "What are Claude 3.5 and Claude 4 in this roadmap?",
        "<p>They are generations of Anthropic's proprietary model family used for language assistance and related tasks.</p><ul><li><strong>Capabilities:</strong> Documented releases describe tasks such as writing, analysis, coding, and tool use.</li><li><strong>Versions:</strong> Context limits and supported features depend on the particular model and deployment.</li><li><strong>Evaluation:</strong> Safety and long-context quality require explicit tests, not a best-for label.</li></ul><p><strong>Remember:</strong> A family name does not replace a version-specific model card.</p><p><a href=\"https://www.anthropic.com/news/claude-4\" target=\"_blank\" rel=\"noopener noreferrer\">Claude 4 release</a></p>"
      ],
      [
        "Does a safety-focused model guarantee safe and correct outputs?",
        "<p>No; safety training and evaluations reduce some risks but do not guarantee every output is safe or factual.</p><ul><li><strong>Model behavior:</strong> Performance can vary with inputs and operating conditions.</li><li><strong>Application:</strong> Product controls and task-specific evaluation still matter.</li><li><strong>Claims:</strong> Separate documented test results from universal guarantees.</li></ul><p><strong>Remember:</strong> Safety is evaluated behavior, not an absolute model property.</p>"
      ]
    ]
  },
  {
    "title": "Gemini",
    "questions": [
      [
        "What is Gemini commonly used to illustrate?",
        "<p>Gemini illustrates a multimodal model family that can work with more than text, depending on the version.</p><ul><li><strong>Modalities:</strong> Particular versions support specified combinations of text, images, audio, or other inputs.</li><li><strong>Architecture:</strong> The original Gemini report describes transformer-decoder foundations.</li><li><strong>Version:</strong> Do not assume all releases share identical internals or capabilities.</li></ul><p><strong>Remember:</strong> Multimodal describes supported information types, not automatically an encoder-decoder design.</p><p><a href=\"https://arxiv.org/html/2312.11805v1\" target=\"_blank\" rel=\"noopener noreferrer\">Gemini technical report</a></p>"
      ],
      [
        "Is every multimodal model an encoder-decoder transformer?",
        "<p>No; multimodal inputs can be supported by several architectural designs.</p><ul><li><strong>Input handling:</strong> Images or audio may use specialized representation components.</li><li><strong>Language backbone:</strong> A system can still use a decoder-style generative transformer.</li><li><strong>Evidence:</strong> Read the technical report for the specific version instead of guessing from modality.</li></ul><p><strong>Remember:</strong> Multiple modalities do not imply one architecture category.</p>"
      ]
    ]
  },
  {
    "title": "T5",
    "questions": [
      [
        "What is T5's main idea?",
        "<p>T5 uses an encoder-decoder transformer and expresses many NLP tasks as text-to-text transformations.</p><ul><li><strong>Input:</strong> Represent a task and its source information as text.</li><li><strong>Output:</strong> Generate a textual target such as a translation, summary, or label.</li><li><strong>Pretraining:</strong> Learn reusable representations using a text-corruption objective.</li></ul><p><strong>Remember:</strong> T5 turns many tasks into text in, text out.</p><p><a href=\"https://arxiv.org/abs/1910.10683\" target=\"_blank\" rel=\"noopener noreferrer\">T5 paper</a></p>"
      ],
      [
        "How is T5 different from a BERT-style encoder model?",
        "<p>T5 has a generative decoder, while BERT primarily provides encoder representations for suitable heads.</p><ul><li><strong>BERT-style setup:</strong> Encode input and use a task-specific prediction head.</li><li><strong>T5-style setup:</strong> Encode source input and generate a target sequence.</li><li><strong>Choice:</strong> Use the architecture and training objective that suit the task.</li></ul><p><strong>Remember:</strong> T5 includes a decoder for generating conditioned text.</p>"
      ]
    ]
  },
  {
    "title": "LLaMA 3",
    "questions": [
      [
        "What is LLaMA 3?",
        "<p>LLaMA 3 is a decoder-only language-model family with released weights under Meta's model-specific license.</p><ul><li><strong>Base models:</strong> Learn general continuation behavior through pretraining.</li><li><strong>Instruction variants:</strong> Receive additional adaptation for instruction-style interaction.</li><li><strong>Access:</strong> Weight availability does not imply unrestricted use or identical licensing to every open-source project.</li></ul><p><strong>Remember:</strong> LLaMA 3 offers open weights subject to its license terms.</p><p><a href=\"https://huggingface.co/meta-llama/Meta-Llama-3-8B\" target=\"_blank\" rel=\"noopener noreferrer\">Meta Llama 3 model card and license</a></p>"
      ],
      [
        "What is the difference between open weights and open source?",
        "<p>Open weights means model parameters are available; open source makes a broader claim about access and licensing.</p><ul><li><strong>Weights:</strong> Allow eligible users to run or adapt the released parameter values.</li><li><strong>Other materials:</strong> Training data, full training code, or processes may remain unavailable.</li><li><strong>Terms:</strong> Inspect the exact release license rather than treating all weight releases alike.</li></ul><p><strong>Remember:</strong> Available weights are one part of openness, not the whole definition.</p>"
      ]
    ]
  },
  {
    "title": "Mistral 7B",
    "questions": [
      [
        "What is Mistral 7B?",
        "<p>Mistral 7B is a released decoder-style language model designed to offer strong capability at a relatively modest parameter count.</p><ul><li><strong>Scale:</strong> The family name refers to roughly seven billion parameters.</li><li><strong>Architecture:</strong> Its original design uses techniques such as grouped-query and sliding-window attention.</li><li><strong>Use:</strong> A base checkpoint and an instruction-tuned checkpoint are different starting points.</li></ul><p><strong>Remember:</strong> Check the specific Mistral 7B variant and model card.</p><p><a href=\"https://huggingface.co/mistralai/Mistral-7B-v0.1\" target=\"_blank\" rel=\"noopener noreferrer\">Mistral 7B v0.1 model card</a></p>"
      ],
      [
        "Does a smaller model always make inference cheap or fast?",
        "<p>No; parameter count is only one factor in serving cost and latency.</p><ul><li><strong>Memory:</strong> Precision, context length, and cached attention states affect usage.</li><li><strong>Compute:</strong> Hardware, batching, and implementation change throughput.</li><li><strong>Quality:</strong> A smaller model may need different adaptation or fail some tasks.</li></ul><p><strong>Remember:</strong> Size matters, but deployment performance must be measured.</p>"
      ]
    ]
  },
  {
    "title": "Qwen 2.5",
    "questions": [
      [
        "What is Qwen 2.5?",
        "<p>Qwen 2.5 is a family of causal language models with multilingual capabilities and multiple model sizes.</p><ul><li><strong>Family:</strong> Distinguish the exact size and checkpoint variant.</li><li><strong>Base versus instruct:</strong> A pretrained continuation model differs from an instruction-adapted one.</li><li><strong>Languages:</strong> Evaluate target-language performance rather than assuming equal quality across languages.</li></ul><p><strong>Remember:</strong> A multilingual family still needs language-specific evaluation.</p><p><a href=\"https://huggingface.co/Qwen/Qwen2.5-7B\" target=\"_blank\" rel=\"noopener noreferrer\">Qwen2.5-7B model card</a></p>"
      ],
      [
        "Does multilingual support mean equal performance in every language?",
        "<p>No; quality can differ across languages, scripts, domains, and tasks.</p><ul><li><strong>Training:</strong> Data coverage can vary across languages.</li><li><strong>Tokenization:</strong> Some scripts or spellings may use longer token sequences.</li><li><strong>Evaluation:</strong> Use representative examples in the languages your application needs.</li></ul><p><strong>Remember:</strong> Supported does not mean equally accurate everywhere.</p>"
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
