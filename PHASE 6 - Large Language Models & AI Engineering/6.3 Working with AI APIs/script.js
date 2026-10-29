const topics = [
  {
    "title": "OpenAI: Chat Completions - messages array",
    "questions": [
      [
        "How is a Chat Completions request structured?",
        "<p>A Chat Completions request supplies a model and an ordered messages array.</p><ul><li><strong>Roles:</strong> Use the supported instruction roles, user input, assistant history, and tool results.</li><li><strong>Configuration:</strong> Set only parameters supported by the selected model and reserve output budget.</li><li><strong>Evolution:</strong> Learn this format for existing integrations; consult the Responses API migration guide for newer application patterns.</li></ul><p><strong>Remember:</strong> Message roles convey structure, not automatic trust in their contents.</p><p><a href=\"https://developers.openai.com/api/docs/guides/migrate-to-responses\" target=\"_blank\" rel=\"noopener noreferrer\">Official OpenAI documentation: Responses migration</a></p>"
      ]
    ]
  },
  {
    "title": "OpenAI: Function calling / Tool use",
    "questions": [
      [
        "What happens during an API tool-calling round trip?",
        "<p>The model proposes a named function and arguments; your backend decides whether and how to execute it.</p><ul><li><strong>Definition:</strong> Supply tool names, descriptions, and argument schemas.</li><li><strong>Execution:</strong> Validate arguments and user permissions, then run an allowlisted function.</li><li><strong>Continuation:</strong> Return the tool result with the correct call identifier so the model can produce a final answer.</li></ul><p><strong>Remember:</strong> A function call proposal is not permission to perform an action.</p>"
      ]
    ]
  },
  {
    "title": "OpenAI: JSON mode / Structured outputs",
    "questions": [
      [
        "How do JSON mode and Structured Outputs differ?",
        "<p>JSON mode targets valid JSON, while Structured Outputs can enforce a supported JSON Schema.</p><ul><li><strong>Schema:</strong> Define field types, required properties, and allowed values explicitly.</li><li><strong>Validation:</strong> Still check business rules and facts after parsing.</li><li><strong>Edge cases:</strong> Handle refusals and interrupted or incomplete responses separately from successful output.</li></ul><p><strong>Remember:</strong> Schema compliance is stronger than valid JSON but does not establish truth.</p><p><a href=\"https://developers.openai.com/api/docs/guides/structured-outputs\" target=\"_blank\" rel=\"noopener noreferrer\">Official OpenAI documentation: Structured Outputs</a></p>"
      ]
    ]
  },
  {
    "title": "OpenAI: Streaming responses (SSE)",
    "questions": [
      [
        "How do you consume a streamed API response?",
        "<p>Enable streaming and process the provider's event stream incrementally.</p><ul><li><strong>Events:</strong> Text deltas, tool arguments, usage, and completion indicators may use different event types.</li><li><strong>Assembly:</strong> Buffer fragments in order and do not parse partial tool JSON as a complete action.</li><li><strong>Completion:</strong> Distinguish a successful finish from disconnection or an error event.</li></ul><p><strong>Remember:</strong> A received text chunk is only part of a response.</p>"
      ]
    ]
  },
  {
    "title": "OpenAI: Embeddings API",
    "questions": [
      [
        "What is an embedding API used for?",
        "<p>An embedding API maps text to vectors that support similarity-based search and retrieval.</p><ul><li><strong>Indexing:</strong> Chunk documents and store vectors with source metadata.</li><li><strong>Querying:</strong> Embed the query with a compatible model and compare using the index's configured metric.</li><li><strong>Compatibility:</strong> Model and dimension changes may require rebuilding the index.</li></ul><p><strong>Remember:</strong> Similarity helps retrieve candidates; it does not verify their correctness.</p>"
      ]
    ]
  },
  {
    "title": "OpenAI: Vision API (GPT-4V)",
    "questions": [
      [
        "How do vision-capable model inputs differ from text-only inputs?",
        "<p>A multimodal request includes supported image content alongside text instructions.</p><ul><li><strong>Roadmap name:</strong> GPT-4V is a historical reference, so choose an available vision-capable model from the provider catalog.</li><li><strong>Input:</strong> Follow the model's image format, size, and detail requirements.</li><li><strong>Reliability:</strong> Check uncertain OCR, small details, and spatial interpretations against the original image.</li></ul><p><strong>Remember:</strong> Vision is a model capability, not a guarantee of accurate image reading.</p>"
      ]
    ]
  },
  {
    "title": "OpenAI: Assistants API with file search",
    "questions": [
      [
        "How should file-search workflows be understood alongside the Assistants API?",
        "<p>The roadmap's Assistants API is a legacy workflow; study retrieval concepts and the official migration path to Responses.</p><ul><li><strong>Retrieval:</strong> Index files and search for relevant passages before generating an answer.</li><li><strong>Migration:</strong> Conversation state, tools, and orchestration need explicit mapping rather than a renamed endpoint.</li><li><strong>Access:</strong> Scope retrieved files to the authenticated user and preserve source references.</li></ul><p><strong>Remember:</strong> Build new work against supported interfaces and treat Assistants examples as historical.</p><p><a href=\"https://developers.openai.com/api/docs/assistants/migration\" target=\"_blank\" rel=\"noopener noreferrer\">Official OpenAI documentation: Assistants migration</a></p>"
      ]
    ]
  },
  {
    "title": "OpenAI: Batch API for bulk processing",
    "questions": [
      [
        "When should a workload use batch processing?",
        "<p>Batch processing suits many independent requests that do not need immediate interactive responses.</p><ul><li><strong>Inputs:</strong> Assign stable request IDs so outputs can be matched even if returned out of order.</li><li><strong>Lifecycle:</strong> Submit, monitor, retrieve results, and retry only failed items.</li><li><strong>Tradeoff:</strong> Check supported endpoints, completion windows, and pricing before choosing batch execution.</li></ul><p><strong>Remember:</strong> Batch optimizes throughput and scheduling, not live chat latency.</p>"
      ]
    ]
  },
  {
    "title": "OpenAI: Token counting with tiktoken",
    "questions": [
      [
        "How can tiktoken help estimate a request's size?",
        "<p>tiktoken encodes text using a selected OpenAI tokenizer to count token IDs.</p><ul><li><strong>Selection:</strong> Use the encoding associated with the model where supported.</li><li><strong>Overhead:</strong> Messages, tools, images, and provider formatting can add costs beyond raw text encoding.</li><li><strong>Accounting:</strong> Use provider-reported usage for final billing and model-aware budgeting before requests.</li></ul><p><strong>Remember:</strong> A raw string count is not the complete request cost.</p><pre><code class=\"language-python\">import tiktoken\n\n# Example encoding; use the encoding appropriate to your model.\nencoding = tiktoken.get_encoding(&quot;cl100k_base&quot;)\ntext_tokens = len(encoding.encode(&quot;Summarize this document.&quot;))\nprint(text_tokens)  # Counts this string, not the complete API request.</code></pre>"
      ]
    ]
  },
  {
    "title": "OpenAI: Rate limits and quotas",
    "questions": [
      [
        "What is the difference between rate limits and quotas?",
        "<p>Rate limits bound request or token throughput; quotas or spending limits bound broader consumption.</p><ul><li><strong>Dimensions:</strong> Request count, input/output tokens, concurrency, and account tier can constrain traffic.</li><li><strong>Response:</strong> Inspect provider errors and retry guidance instead of guessing a universal limit.</li><li><strong>Control:</strong> Enforce your own per-user budgets and queue work before exceeding shared capacity.</li></ul><p><strong>Remember:</strong> Limits vary by model and account and should be configuration, not prompt text.</p>"
      ]
    ]
  },
  {
    "title": "Anthropic: Messages API structure",
    "questions": [
      [
        "What is the basic structure of a Claude Messages request?",
        "<p>Claude's Messages API uses a model, message history, an output token limit, and optional system instructions.</p><ul><li><strong>Content:</strong> Messages can contain typed blocks such as text, images, tool use, and tool results.</li><li><strong>State:</strong> Supply relevant prior messages when constructing a stateless request.</li><li><strong>Parsing:</strong> Inspect block types rather than assuming the whole response is a single text string.</li></ul><p><strong>Remember:</strong> Provider adapters must preserve each API's content structure.</p>"
      ]
    ]
  },
  {
    "title": "Anthropic: System prompts",
    "questions": [
      [
        "How are Claude system instructions supplied?",
        "<p>Use the API's top-level system instruction field rather than assuming an OpenAI-style system message.</p><ul><li><strong>Purpose:</strong> Describe stable application behavior and constraints.</li><li><strong>Separation:</strong> Keep user data in the appropriate message content.</li><li><strong>Portability:</strong> Map instruction semantics explicitly when switching providers.</li></ul><p><strong>Remember:</strong> Similar model capabilities can have different request schemas.</p>"
      ]
    ]
  },
  {
    "title": "Anthropic: Long context (200K tokens)",
    "questions": [
      [
        "How should a long-context Claude integration be budgeted?",
        "<p>The roadmap's 200K figure describes a context configuration, not a universal limit for every Claude model or account.</p><ul><li><strong>Verification:</strong> Check the chosen model's documented context and output limits.</li><li><strong>Selection:</strong> Send relevant evidence rather than filling the window by default.</li><li><strong>Testing:</strong> Measure retrieval, latency, and accuracy across document lengths.</li></ul><p><strong>Remember:</strong> A context limit is a capacity bound, not a recall guarantee.</p>"
      ]
    ]
  },
  {
    "title": "Anthropic: Vision support",
    "questions": [
      [
        "How should images be handled in a Claude request?",
        "<p>Supply images as supported typed content blocks with a clear question about them.</p><ul><li><strong>Preparation:</strong> Use supported formats and avoid unnecessary image size.</li><li><strong>Context:</strong> Identify which image or region the user is asking about.</li><li><strong>Verification:</strong> Treat uncertain visual interpretations as uncertain and check consequential details.</li></ul><p><strong>Remember:</strong> Multimodal requests still need model-specific input and token budgeting.</p>"
      ]
    ]
  },
  {
    "title": "Anthropic: Tool use",
    "questions": [
      [
        "How does Claude tool use return results to the model?",
        "<p>Define tools, inspect tool_use blocks, execute validated calls, and return corresponding tool_result blocks.</p><ul><li><strong>Identification:</strong> Match each result to its tool-use identifier.</li><li><strong>Validation:</strong> Check schema, authorization, and action boundaries before execution.</li><li><strong>Loop:</strong> Continue until the model responds without further permitted tool calls or reaches a limit.</li></ul><p><strong>Remember:</strong> Preserve tool-result structure in a multi-provider adapter.</p>"
      ]
    ]
  },
  {
    "title": "Anthropic: Streaming",
    "questions": [
      [
        "What makes streamed Claude responses more than plain text chunks?",
        "<p>The stream contains structured events describing message and content-block progress.</p><ul><li><strong>Types:</strong> Text and partial tool arguments need different handling.</li><li><strong>Assembly:</strong> Reconstruct blocks and recognize stop or error conditions.</li><li><strong>UX:</strong> Cancel upstream work when the user stops and mark interrupted output clearly.</li></ul><p><strong>Remember:</strong> Use a provider-aware event parser rather than concatenating every payload.</p>"
      ]
    ]
  },
  {
    "title": "Gemini: Pro / Ultra model names",
    "questions": [
      [
        "How should Gemini Pro and Ultra names from the roadmap be interpreted?",
        "<p>They are model-family references from earlier product naming, not permanent endpoint identifiers.</p><ul><li><strong>Selection:</strong> Resolve an available model ID and check its supported modalities.</li><li><strong>Comparison:</strong> Evaluate quality, latency, context, and cost on your task.</li><li><strong>Configuration:</strong> Keep model IDs outside business logic so they can be updated deliberately.</li></ul><p><strong>Remember:</strong> Product names and API model availability change over time.</p>"
      ]
    ]
  },
  {
    "title": "Gemini: Multimodal text, image, video, audio",
    "questions": [
      [
        "What should a multimodal Gemini adapter account for?",
        "<p>It must construct the selected model's supported content parts and handle non-text outputs where applicable.</p><ul><li><strong>Inputs:</strong> Validate media formats, sizes, duration, and upload requirements.</li><li><strong>Budget:</strong> Account for media tokenization and processing latency.</li><li><strong>Output:</strong> Inspect typed results and safety or completion metadata.</li></ul><p><strong>Remember:</strong> Multimodal support varies by model and endpoint.</p>"
      ]
    ]
  },
  {
    "title": "Gemini: Real-time search grounding",
    "questions": [
      [
        "What does search grounding add to an answer?",
        "<p>Search grounding lets supported workflows use retrieved web evidence when answering.</p><ul><li><strong>Freshness:</strong> Retrieval can supply information absent from model training.</li><li><strong>Sources:</strong> Display grounding references and verify that they support the answer.</li><li><strong>Trust:</strong> Web content remains untrusted and may be incomplete or malicious.</li></ul><p><strong>Remember:</strong> Search-backed answers still need source checking.</p>"
      ]
    ]
  },
  {
    "title": "Gemini: Context caching",
    "questions": [
      [
        "How can context caching reduce repeated input costs?",
        "<p>Provider caching can reuse computation for shared input prefixes instead of processing all repeated content from scratch.</p><ul><li><strong>Layout:</strong> Put stable shared material before changing per-request content.</li><li><strong>Modes:</strong> Implicit versus explicit cache support depends on the model and endpoint; check current documentation.</li><li><strong>Measurement:</strong> Track cached-token usage and any applicable storage or expiration costs.</li></ul><p><strong>Remember:</strong> Context caching reuses input computation; it does not reuse a final answer.</p><p><a href=\"https://ai.google.dev/gemini-api/docs/caching\" target=\"_blank\" rel=\"noopener noreferrer\">Gemini API: Context caching</a></p>"
      ]
    ]
  },
  {
    "title": "Mistral: 7B, Mixtral 8x7B (MoE), Large",
    "questions": [
      [
        "How do dense and mixture-of-experts Mistral models differ?",
        "<p>Mistral 7B and Mixtral 8x7B illustrate dense versus sparse mixture-of-experts designs; Large refers to a separate model family.</p><ul><li><strong>Dense:</strong> A dense model uses its full transformer path for each token.</li><li><strong>MoE:</strong> Mixtral routes tokens through selected feed-forward experts, activating a subset per token.</li><li><strong>Memory:</strong> Inactive experts still need storage, so active parameter count is not total memory usage.</li></ul><p><strong>Remember:</strong> Named roadmap models illustrate architecture rather than a current availability ranking.</p>"
      ]
    ]
  },
  {
    "title": "Mistral: Function calling",
    "questions": [
      [
        "How should Mistral function calling fit into a shared API abstraction?",
        "<p>Normalize tool definitions and results while preserving the selected model's supported schema.</p><ul><li><strong>Capability:</strong> Confirm that the model supports tool calling.</li><li><strong>Execution:</strong> Validate proposed calls before running backend functions.</li><li><strong>Adapter:</strong> Map tool-call identifiers and results correctly across provider-specific formats.</li></ul><p><strong>Remember:</strong> A shared interface must not silently drop tool semantics.</p>"
      ]
    ]
  },
  {
    "title": "Mistral: JSON mode",
    "questions": [
      [
        "What should an application check when using Mistral JSON output?",
        "<p>Request the supported JSON output mode and validate the result before consuming it.</p><ul><li><strong>Contract:</strong> Specify the expected fields and types.</li><li><strong>Capability:</strong> Distinguish basic JSON generation from model-specific schema constraints.</li><li><strong>Recovery:</strong> Handle invalid, truncated, or refused output with a bounded repair or error path.</li></ul><p><strong>Remember:</strong> Never assume all models enforce the same schema features.</p>"
      ]
    ]
  },
  {
    "title": "Mistral: Open-weight models via Ollama",
    "questions": [
      [
        "What changes when a Mistral model runs through Ollama?",
        "<p>Ollama serves compatible local model artifacts rather than calling Mistral's hosted service.</p><ul><li><strong>Resources:</strong> Match quantization, memory, and context settings to the machine.</li><li><strong>Capabilities:</strong> Tool calling and output formatting depend on both model and serving support.</li><li><strong>License:</strong> Review the exact artifact's license rather than assuming all family members share one.</li></ul><p><strong>Remember:</strong> Local hosting transfers operational responsibility to you.</p>"
      ]
    ]
  },
  {
    "title": "Meta: LLaMA 3 models",
    "questions": [
      [
        "What should you compare when choosing a LLaMA 3 artifact?",
        "<p>Compare size, base versus instruction tuning, quantization, context settings, and license conditions.</p><ul><li><strong>Base:</strong> A pretrained model may need task adaptation and an appropriate completion format.</li><li><strong>Instruct:</strong> An instruction-tuned artifact expects the correct chat template.</li><li><strong>Runtime:</strong> Evaluate memory, throughput, and quality under your actual serving configuration.</li></ul><p><strong>Remember:</strong> Model weights, tokenizer, and chat template should match.</p>"
      ]
    ]
  },
  {
    "title": "Meta: Running locally with Ollama",
    "questions": [
      [
        "How do you approach local LLaMA inference with Ollama?",
        "<p>Select a compatible model tag, load it in Ollama, and call the local service from your application.</p><ul><li><strong>Hardware:</strong> Reserve memory for weights, KV cache, and concurrent requests.</li><li><strong>Access:</strong> Keep the service private or protect it with authentication and network controls.</li><li><strong>Evaluation:</strong> Check latency and quality using the exact quantization you plan to deploy.</li></ul><p><strong>Remember:</strong> Local inference does not automatically make an exposed endpoint secure.</p>"
      ]
    ]
  },
  {
    "title": "Meta: Fine-tuning LLaMA with PEFT",
    "questions": [
      [
        "What does PEFT change during fine-tuning?",
        "<p>Parameter-efficient fine-tuning updates a small set of additional or selected parameters instead of all model weights.</p><ul><li><strong>LoRA:</strong> Train low-rank adapter matrices while keeping the base weights frozen.</li><li><strong>Resources:</strong> QLoRA combines a quantized base with adapter training to reduce memory needs.</li><li><strong>Deployment:</strong> Preserve the compatible base model, tokenizer, adapter, and configuration.</li></ul><p><strong>Remember:</strong> Efficient adaptation still requires good data and held-out evaluation.</p>"
      ]
    ]
  },
  {
    "title": "Cohere - enterprise embeddings and RAG",
    "questions": [
      [
        "Where does Cohere fit in a retrieval architecture?",
        "<p>Cohere offers model services used for embeddings, reranking, and generation in retrieval workflows.</p><ul><li><strong>Retrieval:</strong> Embed queries and documents using the model's appropriate input modes.</li><li><strong>Reranking:</strong> Score retrieved candidates for relevance before generating an answer.</li><li><strong>Evaluation:</strong> Measure retrieval quality and access-control correctness on enterprise data.</li></ul><p><strong>Remember:</strong> A strong generator cannot recover evidence that retrieval failed to find.</p>"
      ]
    ]
  },
  {
    "title": "NVIDIA NIM - GPU-optimized inference",
    "questions": [
      [
        "What problem does NVIDIA NIM address?",
        "<p>NIM packages model inference services for deployment on supported infrastructure.</p><ul><li><strong>Operations:</strong> Check GPU compatibility, image requirements, and model configuration.</li><li><strong>Serving:</strong> Measure batching, concurrency, and latency under expected load.</li><li><strong>Responsibility:</strong> You still manage access, scaling, updates, and deployment costs.</li></ul><p><strong>Remember:</strong> A packaged inference service reduces setup work but does not replace operations.</p>"
      ]
    ]
  },
  {
    "title": "Groq - LPU inference",
    "questions": [
      [
        "What should you evaluate when considering Groq inference?",
        "<p>Groq provides hosted inference on its LPU architecture for supported models.</p><ul><li><strong>Latency:</strong> Measure time to first token and output rate on representative requests.</li><li><strong>Constraints:</strong> Check supported models, context sizes, tool behavior, and quotas.</li><li><strong>Workload:</strong> Compare end-to-end latency including network, retrieval, and application overhead.</li></ul><p><strong>Remember:</strong> Fast token generation is only one part of a fast product.</p>"
      ]
    ]
  },
  {
    "title": "Together AI - open-model hosting",
    "questions": [
      [
        "Why use a hosted open-model provider such as Together AI?",
        "<p>Hosted inference lets an application use supported open models without operating the serving hardware itself.</p><ul><li><strong>Selection:</strong> Check exact model versions, licenses, endpoint types, and capabilities.</li><li><strong>Integration:</strong> Validate tool schemas, streaming behavior, and error formats.</li><li><strong>Tradeoff:</strong> Compare usage cost, data policies, reliability, and migration effort.</li></ul><p><strong>Remember:</strong> Open weights and self-hosting are separate choices.</p>"
      ]
    ]
  },
  {
    "title": "Replicate - model API hosting",
    "questions": [
      [
        "How does a prediction-oriented model hosting API fit into a workflow?",
        "<p>Replicate exposes hosted models through prediction jobs and model-specific inputs and outputs.</p><ul><li><strong>Lifecycle:</strong> Track job creation, status, completion, and failure where execution is asynchronous.</li><li><strong>Artifacts:</strong> Store needed outputs according to retention rules rather than assuming hosted URLs last forever.</li><li><strong>Reproducibility:</strong> Pin model versions and record inputs without leaking sensitive data.</li></ul><p><strong>Remember:</strong> A model job may need polling or verified webhooks instead of a chat response loop.</p>"
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
