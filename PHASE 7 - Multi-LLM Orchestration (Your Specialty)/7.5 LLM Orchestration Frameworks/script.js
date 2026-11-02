const topics = [
  {
    "title": "Core concepts: Chains, Agents, Memory, Tools",
    "questions": [
      [
        "What do chains, agents, memory, and tools mean in an orchestration framework?",
        "<p>They describe different responsibilities in an application that combines model calls with data and actions.</p><ul><li><strong>Chains:</strong> Run a defined sequence; agents choose subsequent steps within a bounded execution policy.</li><li><strong>Memory:</strong> Retain selected conversation or application state with explicit scope and retention.</li><li><strong>Tools:</strong> Expose validated operations whose execution remains controlled by the application.</li></ul><p><strong>Remember:</strong> Understanding the responsibilities matters more than memorizing a framework's class names.</p>"
      ]
    ]
  },
  {
    "title": "LLMChain - basic prompt + LLM",
    "questions": [
      [
        "What does the roadmap's LLMChain pattern do?",
        "<p>It combines a prompt template and a model call into a reusable operation.</p><ul><li><strong>Inputs:</strong> Supply validated variables for a known prompt template.</li><li><strong>Outputs:</strong> Parse and validate the result before a later stage consumes it.</li><li><strong>Versioning:</strong> LLMChain is a legacy abstraction; consult the installed LangChain version's migration guidance.</li></ul><p><strong>Remember:</strong> Learn the prompt-to-model composition pattern while keeping API examples version-specific.</p><p><a href=\"https://docs.langchain.com/oss/python/migrate/langchain-v1\" target=\"_blank\" rel=\"noopener noreferrer\">LangChain version and migration guidance</a></p>"
      ]
    ]
  },
  {
    "title": "SequentialChain - chaining multiple LLMs",
    "questions": [
      [
        "How does sequential composition connect multiple model calls?",
        "<p>Each stage consumes an explicit input and passes a defined result to the next stage.</p><ul><li><strong>Example:</strong> Extract requirements, classify the task, and then draft the response.</li><li><strong>Contracts:</strong> Validate intermediate fields instead of passing arbitrary prose between every stage.</li><li><strong>Recovery:</strong> Record stage outcomes so a failure can be retried without unnecessarily repeating successful work.</li></ul><p><strong>Remember:</strong> SequentialChain is a roadmap-era name for a broader composition pattern.</p><p><a href=\"https://docs.langchain.com/oss/python/migrate/langchain-v1\" target=\"_blank\" rel=\"noopener noreferrer\">LangChain version and migration guidance</a></p>"
      ]
    ]
  },
  {
    "title": "ConversationalChain - with memory",
    "questions": [
      [
        "How should a conversational workflow manage memory?",
        "<p>Preserve the relevant conversation state and construct a bounded context for each new request.</p><ul><li><strong>Scope:</strong> Separate users and conversations so one session cannot read another's history.</li><li><strong>Budget:</strong> Trim or summarize old messages while keeping tool-call relationships and important constraints intact.</li><li><strong>Naming:</strong> The roadmap says ConversationalChain; older LangChain examples commonly use ConversationChain, and APIs vary by release.</li></ul><p><strong>Remember:</strong> Memory is a deliberate data-management policy, not unlimited context or automatic factual accuracy.</p><p><a href=\"https://docs.langchain.com/oss/python/migrate/langchain-v1\" target=\"_blank\" rel=\"noopener noreferrer\">LangChain version and migration guidance</a></p>"
      ]
    ]
  },
  {
    "title": "RetrievalQA - RAG chain",
    "questions": [
      [
        "What does a RetrievalQA-style chain add before generation?",
        "<p>It retrieves relevant evidence and includes it in the context used to answer a question.</p><ul><li><strong>Retrieval:</strong> Search an authorized index using the query or a validated query transformation.</li><li><strong>Generation:</strong> Ask the model to answer from retrieved evidence and retain useful source references.</li><li><strong>Evaluation:</strong> Measure retrieval relevance and answer support separately; check the installed version for legacy RetrievalQA replacements.</li></ul><p><strong>Remember:</strong> A fluent answer cannot compensate for missing or unauthorized evidence.</p><p><a href=\"https://docs.langchain.com/oss/python/migrate/langchain-v1\" target=\"_blank\" rel=\"noopener noreferrer\">LangChain version and migration guidance</a></p>"
      ]
    ]
  },
  {
    "title": "Tool calling with LangChain agents",
    "questions": [
      [
        "How do tool-calling agents differ from a fixed chain?",
        "<p>An agent can choose a next tool or response based on the evolving state instead of following one predetermined sequence.</p><ul><li><strong>Selection:</strong> Offer a bounded set of accurately described capabilities.</li><li><strong>Execution:</strong> Validate each proposed call and enforce permissions outside the model.</li><li><strong>Termination:</strong> Limit iterations, elapsed time, cost, and repeated ineffective actions.</li></ul><p><strong>Remember:</strong> More flexible control flow also requires stronger runtime limits.</p>"
      ]
    ]
  },
  {
    "title": "LCEL (LangChain Expression Language) - new composition syntax",
    "questions": [
      [
        "What does LCEL express?",
        "<p>LangChain Expression Language composes compatible operations into runnable workflows.</p><ul><li><strong>Composition:</strong> Connect prompt construction, model invocation, and output parsing through explicit inputs and outputs.</li><li><strong>Reuse:</strong> Shared runnable operations can support invocation and streaming where the components allow them.</li><li><strong>Compatibility:</strong> Check the installed release and integrations rather than assuming every runnable supports every execution mode.</li></ul><p><strong>Remember:</strong> Composition syntax should clarify data flow instead of hiding it.</p><p><a href=\"https://docs.langchain.com/oss/python/migrate/langchain-v1\" target=\"_blank\" rel=\"noopener noreferrer\">LangChain version and migration guidance</a></p>"
      ]
    ]
  },
  {
    "title": "LangSmith - observability and tracing",
    "questions": [
      [
        "How does tracing help debug a multi-model workflow?",
        "<p>A trace connects the stages and calls that contributed to a final response.</p><ul><li><strong>Diagnosis:</strong> Identify whether routing, retrieval, a model, or a tool introduced the error or delay.</li><li><strong>Attribution:</strong> Associate model settings, prompt versions, retries, and token use with the same run.</li><li><strong>Privacy:</strong> Redact sensitive payloads and enforce retention and access policies in LangSmith or any tracing service.</li></ul><p><strong>Remember:</strong> The final output alone rarely explains why a complex run failed.</p>"
      ]
    ]
  },
  {
    "title": "What LangGraph adds over LangChain - stateful, cyclical workflows",
    "questions": [
      [
        "When does a graph workflow help more than a simple chain?",
        "<p>Use a graph when execution requires branching, iteration, shared state, or resumable multi-step work.</p><ul><li><strong>Example:</strong> Draft, validate, revise, then either retry or return a final result.</li><li><strong>Simplicity:</strong> Keep a linear chain when its control flow already fits the task.</li><li><strong>Operations:</strong> Make state ownership, retries, time limits, and termination visible.</li></ul><p><strong>Remember:</strong> A graph is useful because of the control flow it models, not because every task needs an agent.</p>"
      ]
    ]
  },
  {
    "title": "Nodes - units of work (LLM calls, tools, conditions)",
    "questions": [
      [
        "What should a workflow node represent?",
        "<p>A node is one understandable unit of work that reads state and returns a defined update.</p><ul><li><strong>Examples:</strong> Perform retrieval, call a model, validate a response, or request a human decision.</li><li><strong>Boundaries:</strong> Keep inputs, outputs, error behavior, and side effects explicit.</li><li><strong>Recovery:</strong> Make repeated execution safe where possible and isolate non-idempotent actions.</li></ul><p><strong>Remember:</strong> A smaller well-defined node is easier to inspect and retry.</p>"
      ]
    ]
  },
  {
    "title": "Edges - connections between nodes (conditional, parallel)",
    "questions": [
      [
        "How do normal, conditional, and parallel edges differ?",
        "<p>Edges specify which work may run after the current step completes.</p><ul><li><strong>Normal:</strong> Continue to a known successor.</li><li><strong>Conditional:</strong> Choose a successor from validated state or a routing result.</li><li><strong>Parallel:</strong> Run independent branches and define how their updates join without silently overwriting one another.</li></ul><p><strong>Remember:</strong> Parallel branches need a clear merge rule and termination policy.</p>"
      ]
    ]
  },
  {
    "title": "State - shared state passed between nodes",
    "questions": [
      [
        "What should be stored in shared graph state?",
        "<p>Store the information required to coordinate the workflow, using a defined schema and update rules.</p><ul><li><strong>Contents:</strong> Include task inputs, evidence references, intermediate results, decisions, and run status.</li><li><strong>Updates:</strong> Define how concurrent writes combine, and avoid treating every node's output as a full replacement.</li><li><strong>Isolation:</strong> Scope state to the authorized run and avoid copying unnecessary secrets or large payloads.</li></ul><p><strong>Remember:</strong> State is an application contract, not just a bag of conversation messages.</p>"
      ]
    ]
  },
  {
    "title": "Building multi-agent workflows with LangGraph",
    "questions": [
      [
        "How should a multi-agent graph divide responsibilities?",
        "<p>Assign distinct tasks and bounded access, then use explicit handoff and validation rules.</p><ul><li><strong>Roles:</strong> Separate retrieval, analysis, generation, and checking when that division improves measured results.</li><li><strong>Coordination:</strong> Define which agent owns a decision or side effect and when another may act.</li><li><strong>Evaluation:</strong> Compare against a single-agent baseline because extra agents add cost and can repeat the same errors.</li></ul><p><strong>Remember:</strong> Adding agents is an architectural choice that must earn its complexity.</p>"
      ]
    ]
  },
  {
    "title": "Human-in-the-loop patterns",
    "questions": [
      [
        "Where should human-in-the-loop pauses be placed?",
        "<p>Pause before decisions or actions that require human judgment or approval under the application's policy.</p><ul><li><strong>Context:</strong> Present the proposed action and the evidence needed to assess it.</li><li><strong>Persistence:</strong> Save enough state to resume the intended run after the decision.</li><li><strong>Revalidation:</strong> Check permissions and stale assumptions again before carrying out an approved action.</li></ul><p><strong>Remember:</strong> A pause is useful only if the human can understand what they are approving.</p>"
      ]
    ]
  },
  {
    "title": "Streaming from LangGraph",
    "questions": [
      [
        "What should a graph's streaming interface expose?",
        "<p>Stream typed updates that let the client distinguish progress, output, tool activity, and completion.</p><ul><li><strong>Types:</strong> Keep token fragments separate from state changes and final validated results.</li><li><strong>Assembly:</strong> Merge updates in the right order and mark interrupted runs clearly.</li><li><strong>Cancellation:</strong> Propagate a stop request through active nodes and provider calls where possible.</li></ul><p><strong>Remember:</strong> A workflow event is not necessarily user-facing answer text.</p>"
      ]
    ]
  },
  {
    "title": "Persistence and checkpointing",
    "questions": [
      [
        "How do checkpointers and stores support persistence?",
        "<p>Checkpoints retain thread-scoped graph state; stores can retain application data across threads.</p><ul><li><strong>Recovery:</strong> Checkpointed state supports continuing a conversation or resuming an interrupted workflow.</li><li><strong>Memory:</strong> A store can hold longer-lived data such as preferences outside an individual thread's state.</li><li><strong>Side effects:</strong> Restoring state does not by itself guarantee that a payment, message, or write will execute only once.</li></ul><p><strong>Remember:</strong> Persist state and design safe replay separately.</p><p><a href=\"https://docs.langchain.com/oss/python/langgraph/persistence\" target=\"_blank\" rel=\"noopener noreferrer\">LangGraph persistence: checkpointers and stores</a></p>"
      ]
    ]
  },
  {
    "title": "Data connectors - loading documents",
    "questions": [
      [
        "What should a document connector preserve during ingestion?",
        "<p>A connector loads source data and records enough metadata to retrieve, update, and authorize it later.</p><ul><li><strong>Identity:</strong> Keep stable source IDs, versions, timestamps, and access scope.</li><li><strong>Transformation:</strong> Extract and chunk content without losing important structure or provenance.</li><li><strong>Refresh:</strong> Handle changed and deleted documents rather than treating an index as permanently current.</li></ul><p><strong>Remember:</strong> Ingestion quality and permissions affect every later retrieval result.</p>"
      ]
    ]
  },
  {
    "title": "Index types: VectorStore, Summary, Knowledge Graph",
    "questions": [
      [
        "How do vector, summary, and knowledge-graph indexes differ?",
        "<p>They organize information for different retrieval and reasoning needs.</p><ul><li><strong>Vector:</strong> Find semantically similar chunks through embedding similarity.</li><li><strong>Summary:</strong> Store condensed representations that can support broad overview queries.</li><li><strong>Graph:</strong> Represent entities and relationships to support connected queries, subject to extraction quality.</li></ul><p><strong>Remember:</strong> Choose an index for the question and evidence structure, not just because a framework offers it.</p>"
      ]
    ]
  },
  {
    "title": "Query engines",
    "questions": [
      [
        "What responsibilities belong to a query engine?",
        "<p>A query engine coordinates retrieval and response generation for a defined information source.</p><ul><li><strong>Input:</strong> Validate the query and enforce the caller's data access.</li><li><strong>Execution:</strong> Retrieve candidates, optionally rerank or transform them, and construct grounded context.</li><li><strong>Output:</strong> Return the answer with sources and useful completion metadata.</li></ul><p><strong>Remember:</strong> A query engine is a workflow boundary, not proof that every answer is supported.</p>"
      ]
    ]
  },
  {
    "title": "Sub-question decomposition",
    "questions": [
      [
        "When does sub-question decomposition help retrieval?",
        "<p>Split a complex request into smaller evidence-seeking questions when one retrieval query is unlikely to cover them all.</p><ul><li><strong>Example:</strong> Retrieve pricing and performance evidence separately before comparing two systems.</li><li><strong>Control:</strong> Limit the number of sub-questions and preserve the original user's scope.</li><li><strong>Synthesis:</strong> Reconcile conflicting results and retain provenance for each important claim.</li></ul><p><strong>Remember:</strong> Decomposition can improve coverage while also multiplying cost and failure opportunities.</p>"
      ]
    ]
  },
  {
    "title": "LlamaIndex vs LangChain - when to use which",
    "questions": [
      [
        "How should you choose between LlamaIndex and LangChain?",
        "<p>Compare how each fits the application's data workflow, control flow, integrations, and operating requirements.</p><ul><li><strong>Data:</strong> Evaluate ingestion, retrieval, source metadata, and query-engine needs.</li><li><strong>Orchestration:</strong> Evaluate model composition, tools, state, routing, and custom control flow.</li><li><strong>Evidence:</strong> Prototype the same small task and compare complexity, correctness, observability, and maintenance.</li></ul><p><strong>Remember:</strong> The frameworks overlap; choose based on the work rather than a universal winner.</p>"
      ]
    ]
  },
  {
    "title": "Multi-agent task decomposition",
    "questions": [
      [
        "How should work be decomposed into agent tasks?",
        "<p>Divide a goal into deliverables with explicit inputs, owners, and completion criteria.</p><ul><li><strong>Independence:</strong> Parallelize tasks only when they do not depend on one another's unfinished outputs.</li><li><strong>Contracts:</strong> Define how intermediate results are checked and passed onward.</li><li><strong>Scope:</strong> Avoid creating several agents to repeat the same task without a useful aggregation method.</li></ul><p><strong>Remember:</strong> Task decomposition should reduce coordination ambiguity.</p>"
      ]
    ]
  },
  {
    "title": "Agents with roles, backstories, goals",
    "questions": [
      [
        "What do agent roles, backstories, and goals contribute?",
        "<p>They can guide behavior and perspective, but concrete instructions and capabilities do the operational work.</p><ul><li><strong>Role:</strong> Describe the responsibility the agent should own.</li><li><strong>Goal:</strong> Define the expected result and acceptance criteria.</li><li><strong>Limits:</strong> A backstory does not grant expertise, private data, tool access, or permission to take actions.</li></ul><p><strong>Remember:</strong> Evaluate observable task performance rather than the richness of a persona.</p>"
      ]
    ]
  },
  {
    "title": "Tasks and process flows",
    "questions": [
      [
        "What should a multi-agent process flow define?",
        "<p>Define the order of work, dependencies, result contracts, and the conditions for finishing or retrying.</p><ul><li><strong>Sequential:</strong> Wait for required upstream work before running dependent tasks.</li><li><strong>Parallel:</strong> Merge independent results with a clear validation rule.</li><li><strong>Failure:</strong> Decide which errors retry, escalate, cancel remaining work, or terminate the run.</li></ul><p><strong>Remember:</strong> A process needs a completion policy as much as a task list.</p>"
      ]
    ]
  },
  {
    "title": "Tool integration",
    "questions": [
      [
        "How should tools be integrated into a CrewAI-style workflow?",
        "<p>Give each role a narrow set of operations and validate execution in application code.</p><ul><li><strong>Contracts:</strong> Describe tool purpose and input requirements accurately.</li><li><strong>Access:</strong> Apply user and tenant permissions independently of the agent's role description.</li><li><strong>Operations:</strong> Bound execution time, result size, and side effects; record traceable outcomes.</li></ul><p><strong>Remember:</strong> The same tool boundary principles apply regardless of agent framework.</p>"
      ]
    ]
  },
  {
    "title": "Multi-agent conversation patterns",
    "questions": [
      [
        "What is a multi-agent conversation pattern?",
        "<p>It is a controlled exchange in which different agents contribute messages or actions toward a shared task.</p><ul><li><strong>Patterns:</strong> Use explicit turn-taking, delegation, or specialist review when it helps the workflow.</li><li><strong>Context:</strong> Share the information needed for the task without broadcasting unnecessary private data.</li><li><strong>Control:</strong> Define stop conditions and an owner for the final result.</li></ul><p><strong>Remember:</strong> A longer conversation does not automatically improve the answer.</p>"
      ]
    ]
  },
  {
    "title": "AssistantAgent vs UserProxy",
    "questions": [
      [
        "How do AssistantAgent and UserProxy-style roles differ?",
        "<p>An assistant role performs model-backed work; a user-proxy role brings user interaction into the workflow.</p><ul><li><strong>Versions:</strong> AutoGen's historical and newer AgentChat APIs differ, so use documentation matching the installed package.</li><li><strong>Separation:</strong> Do not assume a user proxy automatically executes code or supplies authorization.</li><li><strong>Design:</strong> Treat model calls, user decisions, and code execution as separately controlled responsibilities.</li></ul><p><strong>Remember:</strong> A class name is not a stable cross-version security contract.</p><p><a href=\"https://microsoft.github.io/autogen/stable/user-guide/agentchat-user-guide/tutorial/agents.html\" target=\"_blank\" rel=\"noopener noreferrer\">AutoGen AgentChat agents and versioned APIs</a></p>"
      ]
    ]
  },
  {
    "title": "Code execution agents",
    "questions": [
      [
        "How should code-execution agents be isolated?",
        "<p>Treat generated code as untrusted and run it only within a deliberately constrained execution environment.</p><ul><li><strong>Isolation:</strong> Limit filesystem access, network access, available credentials, and writable resources.</li><li><strong>Limits:</strong> Cap execution time, memory, process count, and output size.</li><li><strong>Lifecycle:</strong> Review or authorize consequential actions and clean up execution environments between runs.</li></ul><p><strong>Remember:</strong> A container is useful isolation, but its configuration and mounted secrets still matter.</p>"
      ]
    ]
  },
  {
    "title": "Group chat patterns",
    "questions": [
      [
        "What prevents a group chat from running indefinitely?",
        "<p>Explicit termination and scheduling rules keep a conversation bounded and interpretable.</p><ul><li><strong>Limits:</strong> Set maximum turns, elapsed time, and spending.</li><li><strong>Completion:</strong> Require a validated final result or an agreed stop condition rather than any agent saying done.</li><li><strong>Coordination:</strong> Choose a speaker policy and handle repeated errors or circular delegation.</li></ul><p><strong>Remember:</strong> A group chat needs an application-level stopping rule.</p>"
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
