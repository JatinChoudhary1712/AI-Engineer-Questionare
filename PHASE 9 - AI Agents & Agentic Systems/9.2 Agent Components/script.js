const topics = [
  {
    "title": "Web search tools (Tavily, SerpAPI, Bing)",
    "questions": [
      [
        "What should an agent's web-search tool return?",
        "<p>Return useful search results with source URLs and enough metadata to assess relevance and freshness.</p><ul><li><strong>Query:</strong> Validate the requested search and limit result count, response size, and spending.</li><li><strong>Sources:</strong> Distinguish snippets from fetched page content and inspect supporting pages before citing claims.</li><li><strong>Providers:</strong> Tavily, SerpAPI, and Bing are roadmap examples; verify the chosen provider's supported endpoints and access requirements.</li></ul><p><strong>Remember:</strong> Search supplies candidates for evidence, not automatically correct facts.</p>"
      ]
    ]
  },
  {
    "title": "Code interpreter / execution",
    "questions": [
      [
        "What responsibilities belong to a code-execution tool?",
        "<p>Execute explicitly permitted code in a controlled environment and report concrete results.</p><ul><li><strong>Inputs:</strong> Define the runtime, permitted files, dependencies, and resource limits.</li><li><strong>Outputs:</strong> Return exit status, bounded stdout/stderr, and authorized artifact references.</li><li><strong>Isolation:</strong> Keep credentials and host resources outside the execution boundary unless deliberately granted.</li></ul><p><strong>Remember:</strong> Generated code is untrusted even when the model describes it confidently.</p>"
      ]
    ]
  },
  {
    "title": "Calculator",
    "questions": [
      [
        "Why give an agent a calculator instead of relying on generated arithmetic?",
        "<p>A deterministic calculator can check numerical operations without depending on a language model's arithmetic accuracy.</p><ul><li><strong>Contract:</strong> Accept typed operands and an allowlisted operation rather than arbitrary code.</li><li><strong>Validation:</strong> Reject unsupported operations, non-finite inputs, invalid units, or division by zero as appropriate.</li><li><strong>Interpretation:</strong> The model still needs to choose the correct calculation and explain its units.</li></ul><p><strong>Remember:</strong> A correct numeric operation cannot fix an incorrectly formulated problem.</p><pre><code class=\"language-python\">from math import isfinite\nfrom operator import add, sub, mul, truediv\n\nOPERATIONS = {&quot;add&quot;: add, &quot;subtract&quot;: sub, &quot;multiply&quot;: mul, &quot;divide&quot;: truediv}\n\ndef calculate(operation, a, b):\n    if operation not in OPERATIONS:\n        raise ValueError(&quot;Unsupported operation&quot;)\n    for value in (a, b):\n        if isinstance(value, bool) or not isinstance(value, (int, float)):\n            raise ValueError(&quot;Operands must be numbers&quot;)\n        if not isfinite(value):\n            raise ValueError(&quot;Operands must be finite&quot;)\n    if operation == &quot;divide&quot; and b == 0:\n        raise ValueError(&quot;Division by zero&quot;)\n    result = OPERATIONS[operation](a, b)\n    if not isfinite(result):\n        raise ValueError(&quot;Result is not finite&quot;)\n    return result</code></pre>"
      ]
    ]
  },
  {
    "title": "Database query tool",
    "questions": [
      [
        "How should a database-query tool restrict agent access?",
        "<p>Expose narrow authorized queries rather than unrestricted database credentials or arbitrary SQL execution.</p><ul><li><strong>Scope:</strong> Derive tenant and row-access restrictions from authenticated application state.</li><li><strong>Inputs:</strong> Prefer named operations with parameterized values and bounded result sizes.</li><li><strong>Operations:</strong> Use read-only permissions where possible and separate approved write workflows.</li></ul><p><strong>Remember:</strong> A model-generated query must not bypass the database's access policy.</p>"
      ]
    ]
  },
  {
    "title": "File read/write tool",
    "questions": [
      [
        "How should a file read/write tool handle paths and changes?",
        "<p>Validate each operation against authorized roots and a defined write policy before touching the filesystem.</p><ul><li><strong>Paths:</strong> Resolve and check canonical targets, including traversal and symlink-related boundary cases.</li><li><strong>Reads:</strong> Limit file types, content size, and exposure of sensitive files.</li><li><strong>Writes:</strong> Distinguish creating, replacing, moving, and deleting; record results and use recoverable changes where practical.</li></ul><p><strong>Remember:</strong> An agent-supplied path is data to validate, not permission to access it.</p>"
      ]
    ]
  },
  {
    "title": "API call tools",
    "questions": [
      [
        "What should a general API-call tool allow?",
        "<p>Offer specific permitted operations with explicit input and output contracts.</p><ul><li><strong>Destinations:</strong> Allowlist upstream services and prevent arbitrary internal-network or credential-bearing requests.</li><li><strong>Secrets:</strong> Inject scoped credentials on the server instead of accepting or exposing them in model text.</li><li><strong>Reliability:</strong> Bound retries, timeouts, payload size, and side effects using request identifiers where supported.</li></ul><p><strong>Remember:</strong> A tool should expose the needed capability rather than becoming an unrestricted HTTP proxy.</p>"
      ]
    ]
  },
  {
    "title": "Web scraping tools",
    "questions": [
      [
        "How should a web-scraping tool handle retrieved pages?",
        "<p>Fetch permitted content with bounded requests and treat the returned page as untrusted data.</p><ul><li><strong>Fetching:</strong> Apply destination controls, request limits, and the application's site-access policy.</li><li><strong>Extraction:</strong> Return relevant text, provenance, and useful structural information rather than every page byte.</li><li><strong>Trust:</strong> Page instructions cannot change the user's goal or grant the agent additional permissions.</li></ul><p><strong>Remember:</strong> Scraped content is evidence to inspect, not an instruction source with authority over the application.</p>"
      ]
    ]
  },
  {
    "title": "Calendar, email, calendar tools (via MCP)",
    "questions": [
      [
        "How should calendar and email actions work through MCP?",
        "<p>MCP can expose those integrations, while the application controls identity, access, and action authorization.</p><ul><li><strong>Separation:</strong> Distinguish reading availability or messages from creating events, sending mail, or deleting records.</li><li><strong>Validation:</strong> Check recipients, dates, time zones, resource ownership, and the concrete proposed change.</li><li><strong>Execution:</strong> Apply required confirmation rules and use idempotency or reconciliation to avoid duplicate sends and bookings.</li></ul><p><strong>Remember:</strong> Connecting an MCP server does not grant blanket authority to act for the user.</p>"
      ]
    ]
  },
  {
    "title": "In-context memory - conversation history in prompt",
    "questions": [
      [
        "What does in-context memory retain?",
        "<p>It retains information included in the current model request, such as selected conversation history and tool observations.</p><ul><li><strong>Scope:</strong> A stateless model call only sees what the application sends.</li><li><strong>Budget:</strong> History competes with instructions, retrieved evidence, tools, and output space.</li><li><strong>Selection:</strong> Keep relevant decisions and constraints while removing redundant or obsolete material.</li></ul><p><strong>Remember:</strong> A larger context window is a capacity limit, not a guarantee of perfect recall.</p>"
      ]
    ]
  },
  {
    "title": "External memory - vector store of past interactions",
    "questions": [
      [
        "How does external memory differ from conversation history?",
        "<p>External memory persists selected information outside a single model context and retrieves it when relevant.</p><ul><li><strong>Storage:</strong> A vector store is one retrieval option; structured databases can hold facts, preferences, and task state.</li><li><strong>Access:</strong> Scope memories to the correct user, tenant, and allowed purpose.</li><li><strong>Lifecycle:</strong> Track provenance, freshness, correction, deletion, and retention rather than keeping every interaction indefinitely.</li></ul><p><strong>Remember:</strong> Retrieved memories can be stale or wrong and must not override authoritative current input.</p>"
      ]
    ]
  },
  {
    "title": "Entity memory - tracking mentioned entities",
    "questions": [
      [
        "What should entity memory store about a mentioned person or object?",
        "<p>Store explicit facts and relationships linked to a stable entity identity with provenance.</p><ul><li><strong>Resolution:</strong> Distinguish people or items with similar names instead of merging them automatically.</li><li><strong>Updates:</strong> Record when facts were observed and handle conflicting or corrected information.</li><li><strong>Privacy:</strong> Keep only necessary information and enforce access and retention rules.</li></ul><p><strong>Remember:</strong> Recognizing an entity is different from verifying every fact associated with it.</p>"
      ]
    ]
  },
  {
    "title": "Summary memory - compress old conversation",
    "questions": [
      [
        "What are the risks of summary memory?",
        "<p>A summary saves context space by losing detail, so it can omit or distort information needed later.</p><ul><li><strong>Preserve:</strong> Keep decisions, constraints, identifiers, unresolved work, and important qualifiers.</li><li><strong>Provenance:</strong> Distinguish user facts, external evidence, and earlier assistant guesses.</li><li><strong>Recovery:</strong> Retain authorized source history or references when the summary needs verification.</li></ul><p><strong>Remember:</strong> A concise summary is a derived record rather than infallible memory.</p>"
      ]
    ]
  },
  {
    "title": "Episodic memory - remember specific past events",
    "questions": [
      [
        "What is episodic memory in an agent system?",
        "<p>It records particular past events or task episodes so later work can retrieve relevant experience.</p><ul><li><strong>Structure:</strong> Store what happened, when, in what context, and the verified outcome.</li><li><strong>Reuse:</strong> Retrieve similar episodes as examples while checking whether their assumptions still apply.</li><li><strong>Boundaries:</strong> Isolate users and tenants and apply correction, deletion, and retention policies.</li></ul><p><strong>Remember:</strong> A past success is context for a decision, not proof that repeating it is appropriate.</p>"
      ]
    ]
  },
  {
    "title": "ReAct (Reason + Act) - interleave thinking and action",
    "questions": [
      [
        "How does a ReAct-style execution loop use observations?",
        "<p>The workflow selects an action, receives an observation, and uses the updated state to decide its next step.</p><ul><li><strong>Grounding:</strong> Tools can supply evidence or results that change the next action.</li><li><strong>Verification:</strong> Check tool outcomes and progress rather than trusting a generated explanation.</li><li><strong>Bounds:</strong> Limit iterations, resources, permissions, and repeated failures in the application.</li></ul><p><strong>Remember:</strong> Evaluate actions and outcomes; visible reasoning prose alone does not establish correctness.</p><p><a href=\"https://arxiv.org/abs/2210.03629\" target=\"_blank\" rel=\"noopener noreferrer\">ReAct original paper</a></p>"
      ]
    ]
  },
  {
    "title": "Plan-and-execute - generate full plan first, then execute",
    "questions": [
      [
        "When is plan-and-execute helpful?",
        "<p>It helps organize a task whose main dependencies can be described before execution starts.</p><ul><li><strong>Plan:</strong> Define bounded steps, expected outputs, and completion checks.</li><li><strong>Execute:</strong> Validate each result before dependent work begins.</li><li><strong>Revise:</strong> Replan when evidence changes instead of mechanically following assumptions that are no longer true.</li></ul><p><strong>Remember:</strong> A plan guides execution but does not authorize every action it mentions.</p>"
      ]
    ]
  },
  {
    "title": "Tree of Thoughts - explore multiple reasoning paths",
    "questions": [
      [
        "What does Tree of Thoughts add to simple sequential generation?",
        "<p>It explores multiple candidate reasoning steps and evaluates which branches to continue.</p><ul><li><strong>Search:</strong> Generate alternatives and use task criteria to retain promising paths.</li><li><strong>Backtracking:</strong> Revisit earlier choices when a branch fails or a better option appears.</li><li><strong>Cost:</strong> Limit branching and evaluate whether the extra calls improve final task outcomes.</li></ul><p><strong>Remember:</strong> Search and verification matter more than producing a longer explanation.</p><p><a href=\"https://arxiv.org/abs/2305.10601\" target=\"_blank\" rel=\"noopener noreferrer\">Tree of Thoughts original paper</a></p>"
      ]
    ]
  },
  {
    "title": "MRKL (Modular Reasoning, Knowledge, Language)",
    "questions": [
      [
        "What is the idea behind MRKL systems?",
        "<p>MRKL combines language-model capabilities with specialized knowledge and reasoning modules in a modular architecture.</p><ul><li><strong>Routing:</strong> Direct different parts of a request to appropriate components.</li><li><strong>Specialization:</strong> Use a calculator, database, symbolic module, or model where its contract fits the task.</li><li><strong>Integration:</strong> Validate module inputs and outputs and handle failures explicitly.</li></ul><p><strong>Remember:</strong> Modular Reasoning, Knowledge and Language is an architectural idea, not a requirement to use multiple conversational agents.</p><p><a href=\"https://arxiv.org/abs/2205.00445\" target=\"_blank\" rel=\"noopener noreferrer\">MRKL original paper</a></p>"
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
