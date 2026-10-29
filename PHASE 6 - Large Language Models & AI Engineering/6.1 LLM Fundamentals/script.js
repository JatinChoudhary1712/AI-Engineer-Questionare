const topics = [
  {
    "title": "Transformer at scale - from 1B to 100B parameters",
    "questions": [
      [
        "What changes when a transformer grows from 1B to 100B parameters?",
        "<p>Larger models need more memory, training compute, data, and coordination across devices.</p><ul><li><strong>Weights:</strong> At two bytes per parameter, 100B weights alone occupy roughly 200 GB before caches or runtime overhead.</li><li><strong>Training:</strong> Gradients, optimizer states, and activations add substantial memory; distributed parallelism becomes essential.</li><li><strong>Quality:</strong> More capacity can improve performance with suitable data and training, but parameter count alone does not guarantee quality.</li></ul><p><strong>Remember:</strong> Scale the data and infrastructure along with the model.</p>"
      ]
    ]
  },
  {
    "title": "Context window - how it works and limitations",
    "questions": [
      [
        "What is a context window, and why does a larger one not guarantee perfect recall?",
        "<p>The context window bounds the tokens a model can use for a request, including relevant input and generation budgets.</p><ul><li><strong>Contents:</strong> Instructions, history, retrieved documents, and tool results compete for space.</li><li><strong>Limits:</strong> Reserve output tokens and any model-specific reasoning budget; a maximum input limit may also apply.</li><li><strong>Reliability:</strong> Models can overlook relevant details even when the text fits, especially in long or noisy inputs.</li></ul><p><strong>Remember:</strong> Fitting in context is different from being used reliably.</p>"
      ]
    ]
  },
  {
    "title": "KV Cache - how it speeds up inference",
    "questions": [
      [
        "How does the KV cache speed up autoregressive generation?",
        "<p>It stores attention keys and values for previous tokens so decoding can reuse them.</p><ul><li><strong>Prefill:</strong> Process the input prompt and create the initial cache.</li><li><strong>Decode:</strong> Compute the new token's states and attend to cached keys and values instead of recomputing the whole prefix.</li><li><strong>Tradeoff:</strong> Cache memory grows with sequence length, batch size, layers, and the number of key/value heads.</li></ul><p><strong>Remember:</strong> KV caching saves repeated computation but consumes serving memory.</p><p class=\"formula\"><strong>Approximate cache bytes:</strong> <code>2 × layers × batch × sequence_length × kv_heads × head_dimension × bytes_per_element</code></p>"
      ]
    ]
  },
  {
    "title": "Tokenization at scale",
    "questions": [
      [
        "Why does tokenization matter for multilingual LLMs and production costs?",
        "<p>A tokenizer maps text into vocabulary token IDs that the model processes.</p><ul><li><strong>Variation:</strong> Different tokenizers split the same text differently, and code or non-English text can have very different token counts.</li><li><strong>Tradeoff:</strong> A larger vocabulary may shorten sequences while enlarging embedding and output layers.</li><li><strong>Practice:</strong> Use the model's actual tokenizer or provider counting endpoint rather than a universal characters-per-token rule.</li></ul><p><strong>Remember:</strong> Tokens are model-dependent units, not words.</p>"
      ]
    ]
  },
  {
    "title": "Positional encodings: Absolute, Relative, RoPE, ALiBi",
    "questions": [
      [
        "How do Absolute, Relative, RoPE, and ALiBi positional methods differ?",
        "<p>Attention needs positional information to distinguish order in a sequence.</p><ul><li><strong>Absolute and relative:</strong> Absolute methods attach positions to tokens; relative methods encode distances or relations between positions.</li><li><strong>RoPE:</strong> Rotate query and key vectors by position so their dot products express relative position information.</li><li><strong>ALiBi:</strong> Add head-specific distance biases to attention scores; extrapolation still needs evaluation.</li></ul><p><strong>Remember:</strong> A positional scheme influences long-context behavior but does not remove trained context limits.</p>"
      ]
    ]
  },
  {
    "title": "Flash Attention - memory-efficient attention",
    "questions": [
      [
        "Why is FlashAttention more memory-efficient than naive attention?",
        "<p>FlashAttention computes exact attention using tiling and online softmax to reduce GPU memory traffic.</p><ul><li><strong>Bottleneck:</strong> Naive attention materializes large score and probability matrices in high-bandwidth memory.</li><li><strong>Method:</strong> Compute blocks in fast on-chip memory and avoid storing the full attention matrix.</li><li><strong>Scope:</strong> Dense attention still has quadratic arithmetic in sequence length; speedups depend on hardware and workload.</li></ul><p><strong>Remember:</strong> FlashAttention changes how attention is computed, without approximating attention itself.</p>"
      ]
    ]
  },
  {
    "title": "Grouped Query Attention (GQA) - used in LLaMA 3",
    "questions": [
      [
        "How does GQA reduce KV-cache memory?",
        "<p>Grouped Query Attention lets several query heads share one key/value head pair.</p><ul><li><strong>Comparison:</strong> Multi-head attention gives each query head its own K/V heads; multi-query attention shares one pair across all queries.</li><li><strong>Benefit:</strong> Fewer K/V heads reduce cache storage and memory bandwidth during decoding.</li><li><strong>Example:</strong> LLaMA 3 uses GQA; the exact head counts depend on the model configuration.</li></ul><p><strong>Remember:</strong> GQA trades some head independence for more efficient inference.</p>"
      ]
    ]
  },
  {
    "title": "Sliding window attention - used in Mistral",
    "questions": [
      [
        "What does sliding window attention change?",
        "<p>A token directly attends to a bounded neighborhood of earlier tokens rather than the entire history.</p><ul><li><strong>Efficiency:</strong> A window of size W can reduce attention work toward O(sequence length times W).</li><li><strong>Reach:</strong> Information can propagate across stacked layers, but distant tokens are not all directly accessible in each layer.</li><li><strong>Example:</strong> Mistral 7B introduced this pattern; do not assume every Mistral model uses the same attention design.</li></ul><p><strong>Remember:</strong> Local attention saves work but changes access to distant context.</p>"
      ]
    ]
  },
  {
    "title": "Pretraining - learning from internet-scale text",
    "questions": [
      [
        "What does pretraining teach a language model?",
        "<p>Pretraining learns statistical language patterns from a large corpus, often through next-token prediction.</p><ul><li><strong>Data:</strong> Curate, deduplicate, and filter text rather than indiscriminately using everything online.</li><li><strong>Objective:</strong> Predict tokens from preceding context, updating weights to reduce prediction loss.</li><li><strong>Limitation:</strong> Learned associations can include errors and biases; training does not create a verified database.</li></ul><p><strong>Remember:</strong> Pretraining supplies broad capability before task-specific alignment.</p>"
      ]
    ]
  },
  {
    "title": "Instruction tuning - following user instructions",
    "questions": [
      [
        "How does instruction tuning differ from pretraining?",
        "<p>Instruction tuning trains on examples of requests and desirable responses.</p><ul><li><strong>Dataset:</strong> Include diverse tasks, formats, and instruction-response pairs.</li><li><strong>Objective:</strong> Supervised fine-tuning teaches response behavior using demonstrated answers.</li><li><strong>Evaluation:</strong> Check general capability, instruction following, and regressions on held-out tasks.</li></ul><p><strong>Remember:</strong> Instruction tuning teaches how to respond using capabilities learned during pretraining.</p>"
      ]
    ]
  },
  {
    "title": "RLHF (Reinforcement Learning from Human Feedback)",
    "questions": [
      [
        "What are the main stages of RLHF?",
        "<p>RLHF uses human preference feedback to optimize a model toward preferred behavior.</p><ul><li><strong>Feedback:</strong> Collect comparisons or ratings of candidate responses.</li><li><strong>Reward:</strong> Train a reward model to predict preferences, often after supervised instruction tuning.</li><li><strong>Optimization:</strong> Apply reinforcement learning with constraints to avoid drifting too far from a reference policy.</li></ul><p><strong>Remember:</strong> A reward proxy can be exploited, so evaluation and feedback quality matter.</p>"
      ]
    ]
  },
  {
    "title": "Constitutional AI (Anthropic's approach)",
    "questions": [
      [
        "What is Constitutional AI?",
        "<p>Constitutional AI uses written principles to guide model critiques, revisions, and preference feedback.</p><ul><li><strong>Principles:</strong> A constitution states behaviors to encourage or avoid.</li><li><strong>Supervision:</strong> Models can critique and revise responses against those principles to create training signals.</li><li><strong>Alignment:</strong> AI-generated preferences can support reinforcement learning, while humans still choose principles and evaluate outcomes.</li></ul><p><strong>Remember:</strong> Written principles reduce some labeling work but do not remove value judgments.</p>"
      ]
    ]
  },
  {
    "title": "DPO (Direct Preference Optimization)",
    "questions": [
      [
        "How does DPO differ from reward-model-based RLHF?",
        "<p>DPO optimizes a policy directly from preferred and rejected response pairs using a reference model.</p><ul><li><strong>Data:</strong> Each training item identifies a chosen response and a rejected response for the same prompt.</li><li><strong>Objective:</strong> Increase the relative likelihood of preferred answers with a reference-based constraint.</li><li><strong>Difference:</strong> Standard DPO avoids a separate learned reward model and online reinforcement-learning rollout loop.</li></ul><p><strong>Remember:</strong> DPO is a preference-optimization alternative, not proof that preferences are correct.</p>"
      ]
    ]
  },
  {
    "title": "Scaling laws - model size, data, compute",
    "questions": [
      [
        "What do LLM scaling laws tell us about allocating training compute?",
        "<p>Scaling laws describe empirical relationships between loss, model size, training data, and compute.</p><ul><li><strong>Balance:</strong> A larger model trained on too few tokens can waste a fixed compute budget.</li><li><strong>Planning:</strong> Fit trends to estimate useful model and token allocations for a training regime.</li><li><strong>Limits:</strong> Loss trends do not directly guarantee downstream usefulness, safety, or a specific emergent skill.</li></ul><p><strong>Remember:</strong> Scaling laws are empirical planning tools, not universal guarantees.</p>"
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
