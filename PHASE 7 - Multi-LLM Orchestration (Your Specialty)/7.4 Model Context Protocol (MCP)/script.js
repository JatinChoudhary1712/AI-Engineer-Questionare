const topics = [
  {
    "title": "What is MCP - Anthropic's open standard for AI-tool connectivity",
    "questions": [
      [
        "What problem does the Model Context Protocol solve?",
        "<p>MCP standardizes how AI applications discover and access capabilities exposed by external services.</p><ul><li><strong>Participants:</strong> A host application uses MCP clients to communicate with MCP servers.</li><li><strong>Reuse:</strong> A server can expose integration capabilities without a separate custom implementation for each host.</li><li><strong>Boundary:</strong> MCP connects applications to capabilities; it does not choose the best model or make returned data trustworthy.</li></ul><p><strong>Remember:</strong> A common protocol reduces integration differences without replacing application policy.</p><p><a href=\"https://modelcontextprotocol.io/docs/learn/architecture\" target=\"_blank\" rel=\"noopener noreferrer\">MCP architecture</a></p>"
      ]
    ]
  },
  {
    "title": "MCP vs function calling vs tool use",
    "questions": [
      [
        "How is MCP different from model function calling?",
        "<p>Function calling lets a model propose a structured action; MCP provides a protocol for discovering and invoking external capabilities.</p><ul><li><strong>Model interface:</strong> A provider returns a tool name and arguments that the application must inspect.</li><li><strong>Integration:</strong> An MCP client can discover server tools and pass appropriate schemas into that model interface.</li><li><strong>Control:</strong> The host still decides whether a proposed action is permitted and whether to execute it.</li></ul><p><strong>Remember:</strong> MCP and function calling can work together at different layers of the same application.</p>"
      ]
    ]
  },
  {
    "title": "MCP Servers - resources, tools, prompts",
    "questions": [
      [
        "What are MCP resources, tools, and prompts?",
        "<p>They are distinct server-provided capabilities for supplying context, performing operations, and offering reusable interaction templates.</p><ul><li><strong>Resources:</strong> Expose addressable content that a host can retrieve as context.</li><li><strong>Tools:</strong> Describe callable operations with input contracts and results.</li><li><strong>Prompts:</strong> Offer parameterized templates that an application can present or use.</li></ul><p><strong>Remember:</strong> Do not treat every exposed capability as an action the model may execute freely.</p><p><a href=\"https://modelcontextprotocol.io/docs/learn/architecture\" target=\"_blank\" rel=\"noopener noreferrer\">MCP capabilities and participants</a></p>"
      ]
    ]
  },
  {
    "title": "MCP Clients - Claude Desktop, IDEs, custom apps",
    "questions": [
      [
        "What is the relationship between an MCP host, client, and server?",
        "<p>The host owns the AI application experience; clients handle protocol communication with connected servers.</p><ul><li><strong>Host:</strong> Manages model interaction, user-facing decisions, and the application's access policy.</li><li><strong>Client:</strong> Communicates with an MCP server and negotiates supported capabilities.</li><li><strong>Server:</strong> Exposes a defined set of capabilities around a service or data source.</li></ul><p><strong>Remember:</strong> A desktop app, IDE, or custom backend may act as a host when it supports MCP.</p>"
      ]
    ]
  },
  {
    "title": "Building an MCP server in Python",
    "questions": [
      [
        "What are the steps to build an MCP server in Python?",
        "<p>Use a compatible official SDK release to define typed capabilities and run them over a supported transport.</p><ul><li><strong>Define:</strong> Start with a small operation with validated inputs and a predictable result.</li><li><strong>Implement:</strong> Connect the handler to application logic while enforcing authentication, authorization, and resource limits.</li><li><strong>Test:</strong> Use a compatible client to check discovery, valid calls, invalid inputs, errors, and cancellation.</li></ul><p><strong>Remember:</strong> Pin the SDK version and follow its matching examples; an exposed function still needs access controls.</p><p><a href=\"https://github.com/modelcontextprotocol/python-sdk\" target=\"_blank\" rel=\"noopener noreferrer\">Official MCP Python SDK and examples</a></p>"
      ]
    ]
  },
  {
    "title": "Building an MCP server in TypeScript",
    "questions": [
      [
        "What changes when building an MCP server in TypeScript?",
        "<p>The protocol concepts stay the same, while the SDK APIs and runtime conventions differ.</p><ul><li><strong>Contracts:</strong> Define input schemas and validate them at runtime rather than relying only on TypeScript's static types.</li><li><strong>Execution:</strong> Register handlers, await asynchronous work correctly, and return supported result types.</li><li><strong>Deployment:</strong> Choose a supported transport and handle startup, errors, shutdown, and secret injection deliberately.</li></ul><p><strong>Remember:</strong> Type checking improves development but does not validate an untrusted network request by itself.</p><p><a href=\"https://github.com/modelcontextprotocol/typescript-sdk\" target=\"_blank\" rel=\"noopener noreferrer\">Official MCP TypeScript SDK and examples</a></p>"
      ]
    ]
  },
  {
    "title": "Connecting MCP to databases, APIs, file systems",
    "questions": [
      [
        "How should MCP connect to a database, API, or file system?",
        "<p>Wrap narrowly scoped operations around the underlying service rather than exposing unrestricted access.</p><ul><li><strong>Database:</strong> Prefer constrained queries or named operations with parameterized inputs and tenant checks.</li><li><strong>API:</strong> Allowlist upstream destinations and limit credentials, timeouts, response sizes, and spending.</li><li><strong>Files:</strong> Resolve paths inside authorized roots and prevent traversal or unintended access to other directories.</li></ul><p><strong>Remember:</strong> The connector should enforce the same permission boundary as the underlying application.</p>"
      ]
    ]
  },
  {
    "title": "MCP for multi-agent systems",
    "questions": [
      [
        "How can multiple agents share MCP-backed capabilities?",
        "<p>Give each agent only the tool and resource access needed for its assigned responsibility.</p><ul><li><strong>Isolation:</strong> Separate agent identity, tenant context, and permissions even when the server is shared.</li><li><strong>Coordination:</strong> Use explicit state and action ownership to avoid duplicate writes or conflicting operations.</li><li><strong>Tracing:</strong> Attribute every call to the responsible run, agent, user, and resource scope.</li></ul><p><strong>Remember:</strong> Sharing a server does not require giving every agent identical privileges.</p>"
      ]
    ]
  },
  {
    "title": "Security considerations in MCP",
    "questions": [
      [
        "What security boundaries matter for MCP integrations?",
        "<p>Treat servers, descriptions, tool arguments, and returned content according to explicit trust and authorization rules.</p><ul><li><strong>Authorization:</strong> Validate identity, tenant scope, credentials, and requested resources on the server.</li><li><strong>Injection:</strong> Keep external content from overriding application instructions or granting tool permissions.</li><li><strong>Operations:</strong> Review server sources, scope secrets, record safe audit metadata, and enforce limits on each call.</li></ul><p><strong>Remember:</strong> MCP connectivity is not blanket permission to access every resource a server can reach.</p>"
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
