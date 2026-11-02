const topics = [
  {
    "title": "Agent = LLM + Tools + Memory + Planning",
    "questions": [
      [
        "What makes an LLM application an agent?",
        "<p>An agent uses a model to select actions or next steps toward an objective within an application-controlled loop.</p><ul><li><strong>Tools:</strong> Operations let it inspect data or affect an environment.</li><li><strong>State:</strong> Relevant observations, history, and plans can inform later decisions; not every agent needs a separate long-term memory store.</li><li><strong>Control:</strong> The application defines permissions, execution, budgets, and stopping rules.</li></ul><p><strong>Remember:</strong> LLM plus tools, memory, and planning is a useful design sketch rather than a strict definition every implementation must satisfy.</p>"
      ]
    ]
  },
  {
    "title": "Difference between chain and agent - agents decide dynamically",
    "questions": [
      [
        "How does an agent differ from a fixed chain?",
        "<p>A chain follows a predefined workflow, while an agent can choose subsequent steps based on current information.</p><ul><li><strong>Chain:</strong> A known extraction, validation, and formatting sequence can be explicit and predictable.</li><li><strong>Agent:</strong> A changing investigation may require selecting among tools or revising the next action after an observation.</li><li><strong>Hybrid:</strong> A deterministic workflow can contain an agent step without making every stage dynamic.</li></ul><p><strong>Remember:</strong> Dynamic decisions introduce flexibility and additional evaluation and control requirements.</p><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Situation</th><th scope=\"col\">Starting design</th></tr></thead><tbody><tr><th scope=\"row\">Known extraction and formatting steps</th><td>Fixed chain with validation</td></tr><tr><th scope=\"row\">Next step depends on tool observations</th><td>Bounded agent loop</td></tr><tr><th scope=\"row\">Fixed process with one uncertain investigation</th><td>Workflow containing an agent step</td></tr></tbody></table></div>"
      ]
    ]
  },
  {
    "title": "Types: ReAct, Plan-and-Execute, Multi-agent",
    "questions": [
      [
        "How do ReAct, plan-and-execute, and multi-agent designs differ?",
        "<p>They organize decision-making and execution in different ways.</p><ul><li><strong>ReAct:</strong> Alternate action selection with observations from tools or the environment.</li><li><strong>Plan-and-execute:</strong> Produce a plan, carry out bounded steps, and revise it when new evidence requires changes.</li><li><strong>Multi-agent:</strong> Divide responsibilities among agents with explicit handoff and coordination rules.</li></ul><p><strong>Remember:</strong> These patterns can be combined, but extra components should solve a measured problem.</p>"
      ]
    ]
  },
  {
    "title": "When to use agents vs chains",
    "questions": [
      [
        "When should you choose an agent instead of a chain?",
        "<p>Use an agent when the path to a valid result needs meaningful decisions that cannot be captured simply in a fixed flow.</p><ul><li><strong>Fit:</strong> Open-ended research or diagnosis may need different tools depending on intermediate evidence.</li><li><strong>Baseline:</strong> Try a simpler workflow first and compare success, latency, cost, and operational complexity.</li><li><strong>Constraint:</strong> Prefer explicit code for predictable calculations, permissions, and fixed business rules.</li></ul><p><strong>Remember:</strong> Agent autonomy should address real uncertainty in the workflow.</p>"
      ]
    ]
  },
  {
    "title": "Risks: cost, hallucination, infinite loops",
    "questions": [
      [
        "What are the main failure risks in an agent loop?",
        "<p>Agents can spend too much, accept incorrect information, or repeat actions without making progress.</p><ul><li><strong>Cost:</strong> Limit model calls, tool use, elapsed time, and total spending.</li><li><strong>Reliability:</strong> Validate observations and results instead of trusting plausible text or self-reported success.</li><li><strong>Loops:</strong> Detect repeated ineffective actions and stop, revise, or escalate within a bounded policy.</li></ul><p><strong>Remember:</strong> A model deciding what to do next is not enough to make a dependable system.</p><pre><code class=\"language-python\"># Illustrative control loop: all helpers are application-defined.\n# Tool authorization, deadlines, validation, and budgets must be enforced.\ndef run_agent(state, choose_step, execute_checked, verify_done, max_steps=8):\n    for _ in range(max_steps):\n        if verify_done(state):\n            return {&quot;status&quot;: &quot;completed&quot;, &quot;state&quot;: state}\n        step = choose_step(state)\n        if step[&quot;kind&quot;] == &quot;needs_input&quot;:\n            return {&quot;status&quot;: &quot;waiting_for_input&quot;, &quot;state&quot;: state}\n        state = execute_checked(step, state)\n    status = &quot;completed&quot; if verify_done(state) else &quot;step_limit&quot;\n    return {&quot;status&quot;: status, &quot;state&quot;: state}</code></pre>"
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
