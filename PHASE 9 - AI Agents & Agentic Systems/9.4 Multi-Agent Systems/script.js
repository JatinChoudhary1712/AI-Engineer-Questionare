const topics = [
  {
    "title": "Supervisor → Worker agents (hierarchical)",
    "questions": [
      [
        "How does a supervisor-worker agent pattern coordinate work?",
        "<p>A supervisor assigns bounded tasks to workers and decides how their results contribute to the goal.</p><ul><li><strong>Responsibilities:</strong> Define worker inputs, deliverables, tool scope, and completion checks.</li><li><strong>Aggregation:</strong> Validate returned evidence and reconcile conflicting results.</li><li><strong>Limits:</strong> Prevent recursive delegation or a supervisor bottleneck from consuming the run budget.</li></ul><p><strong>Remember:</strong> A central coordinator improves structure only when its authority and stopping rules are clear.</p>"
      ]
    ]
  },
  {
    "title": "Peer-to-peer agents (collaborative)",
    "questions": [
      [
        "When is peer-to-peer agent collaboration appropriate?",
        "<p>It can fit work where specialists need to exchange information without every message passing through one supervisor.</p><ul><li><strong>Protocol:</strong> Define who may ask whom for work and how responsibility transfers.</li><li><strong>Coordination:</strong> Prevent duplicate actions, circular delegation, and uncontrolled context sharing.</li><li><strong>Evaluation:</strong> Compare the communication cost and task outcome with a simpler centralized design.</li></ul><p><strong>Remember:</strong> Removing a supervisor does not remove the need for coordination rules.</p>"
      ]
    ]
  },
  {
    "title": "Pipeline agents (sequential specialists)",
    "questions": [
      [
        "How do sequential specialist agents form a pipeline?",
        "<p>Each specialist produces a defined artifact that the next stage validates and consumes.</p><ul><li><strong>Example:</strong> An extractor produces structured facts for an analyst, whose result feeds a writer.</li><li><strong>Contracts:</strong> Specify schemas, provenance, and acceptance criteria at each handoff.</li><li><strong>Recovery:</strong> Retry or repair the failed stage without repeating completed side effects.</li></ul><p><strong>Remember:</strong> A pipeline is useful when task dependencies and stage boundaries are explicit.</p>"
      ]
    ]
  },
  {
    "title": "Adversarial agents (critic + generator)",
    "questions": [
      [
        "What can a critic-generator pattern improve, and what can it miss?",
        "<p>A critic can identify issues in a draft and guide revision, but it can also share the generator's mistakes.</p><ul><li><strong>Criteria:</strong> Give the critic explicit checks and access to relevant evidence or executable tests.</li><li><strong>Iteration:</strong> Bound revisions and stop when the result passes validation or further progress stalls.</li><li><strong>Independence:</strong> Treat agreement between similar models as limited evidence rather than proof.</li></ul><p><strong>Remember:</strong> A critique is useful when it finds verifiable failures, not merely more polished wording.</p>"
      ]
    ]
  },
  {
    "title": "Stateful graphs with shared state",
    "questions": [
      [
        "How should LangGraph shared state be designed for multiple agents?",
        "<p>Define a state schema and explicit update behavior so agents can coordinate without corrupting one another's work.</p><ul><li><strong>Contents:</strong> Track task inputs, artifacts, evidence references, ownership, and run status.</li><li><strong>Updates:</strong> Specify how concurrent contributions merge and which fields may be replaced.</li><li><strong>Isolation:</strong> Scope state to the correct run and avoid distributing unnecessary private information to every node.</li></ul><p><strong>Remember:</strong> Shared state needs a contract rather than unrestricted writes by every agent.</p><p><a href=\"https://docs.langchain.com/oss/python/langgraph/graph-api\" target=\"_blank\" rel=\"noopener noreferrer\">LangGraph graph and state concepts</a></p>"
      ]
    ]
  },
  {
    "title": "Conditional edges - dynamic routing",
    "questions": [
      [
        "How do conditional edges support dynamic routing?",
        "<p>They choose subsequent workflow steps from the current validated state.</p><ul><li><strong>Conditions:</strong> Route on meaningful outcomes such as missing evidence, failed tests, or a required human decision.</li><li><strong>Outputs:</strong> Validate any model-generated route label against allowed destinations.</li><li><strong>Termination:</strong> Include success, failure, and budget-exhausted destinations so the graph can finish.</li></ul><p><strong>Remember:</strong> Dynamic routing should remain constrained by an explicit graph and policy.</p>"
      ]
    ]
  },
  {
    "title": "Parallel execution of agents",
    "questions": [
      [
        "What must be coordinated when graph agents execute in parallel?",
        "<p>Parallel branches need independent work, bounded resource use, and defined result-merging behavior.</p><ul><li><strong>Scheduling:</strong> Respect data dependencies and cap total concurrency and spending.</li><li><strong>Merging:</strong> Apply suitable reducers or aggregation rules rather than allowing accidental last-write wins.</li><li><strong>Side effects:</strong> Assign action ownership and deduplicate writes before combining results.</li></ul><p><strong>Remember:</strong> Parallel execution is beneficial only when coordination costs and races are controlled.</p>"
      ]
    ]
  },
  {
    "title": "Human-in-the-loop checkpoints",
    "questions": [
      [
        "How do human-in-the-loop checkpoints support an agent workflow?",
        "<p>They preserve state so execution can pause for a decision and resume with the right context.</p><ul><li><strong>Presentation:</strong> Show the concrete proposed action, expected effect, and relevant evidence.</li><li><strong>Resume:</strong> Correlate the decision with the correct run and revalidate stale permissions or assumptions.</li><li><strong>Replay:</strong> Design pre-interruption work and side effects so resumption does not unintentionally repeat them.</li></ul><p><strong>Remember:</strong> A stored checkpoint supports pausing; it does not itself authorize an action or guarantee exactly-once execution.</p><p><a href=\"https://docs.langchain.com/oss/python/langgraph/interrupts\" target=\"_blank\" rel=\"noopener noreferrer\">LangGraph interrupts and resumption</a></p>"
      ]
    ]
  },
  {
    "title": "Agent communication protocols",
    "questions": [
      [
        "What should an agent-to-agent message protocol define?",
        "<p>Define the meaning and structure of requests, results, errors, and responsibility transfers.</p><ul><li><strong>Identity:</strong> Include run/task identifiers, sender, recipient, and allowed data scope.</li><li><strong>Contracts:</strong> Specify artifact formats, evidence references, deadlines, and failure states.</li><li><strong>Trust:</strong> Validate incoming messages and separate another agent's claim from verified execution results.</li></ul><p><strong>Remember:</strong> A shared chat transcript is not a complete coordination protocol.</p>"
      ]
    ]
  },
  {
    "title": "Code review system: Writer + Reviewer + Tester agents",
    "questions": [
      [
        "How should Writer, Reviewer, and Tester agents cooperate on code?",
        "<p>Separate implementation, critique, and executable verification while keeping a clear owner for the final change.</p><ul><li><strong>Writer:</strong> Produce a bounded patch against the requested requirements.</li><li><strong>Reviewer:</strong> Check correctness, scope, maintainability, and risks using the actual diff.</li><li><strong>Tester:</strong> Run relevant checks and return reproducible evidence, including failures and limitations.</li></ul><p><strong>Remember:</strong> A model saying tests passed is not equivalent to recorded test execution.</p>"
      ]
    ]
  },
  {
    "title": "Research system: Planner + Researcher + Synthesizer agents",
    "questions": [
      [
        "How should a research team of agents maintain evidence quality?",
        "<p>Preserve source provenance and validate important claims as work moves from planning to synthesis.</p><ul><li><strong>Planner:</strong> Define answerable sub-questions and useful source criteria.</li><li><strong>Researcher:</strong> Retrieve relevant primary evidence, record references, and distinguish facts from inference.</li><li><strong>Synthesizer:</strong> Reconcile contradictions, cite support, and identify gaps instead of smoothing them over.</li></ul><p><strong>Remember:</strong> More researchers do not automatically create independent or trustworthy evidence.</p>"
      ]
    ]
  },
  {
    "title": "Software development: PM + Engineer + QA agents (Devin-style)",
    "questions": [
      [
        "How should a PM-Engineer-QA agent workflow handle software delivery?",
        "<p>Use explicit requirements, reviewable changes, and verified acceptance criteria rather than relying on role names.</p><ul><li><strong>Product role:</strong> Clarify user outcomes and constraints without inventing scope.</li><li><strong>Engineering role:</strong> Implement bounded changes and expose artifacts for review.</li><li><strong>Quality role:</strong> Check acceptance criteria and regressions and report what was actually verified.</li></ul><p><strong>Remember:</strong> Devin-style is a workflow analogy here, not a guarantee of any particular product's capabilities.</p>"
      ]
    ]
  },
  {
    "title": "Customer support: Classifier + Specialist + Escalation agents",
    "questions": [
      [
        "How can a customer-support agent system route and escalate cases?",
        "<p>Classify the request, direct it to an authorized specialist, and escalate when evidence or authority is insufficient.</p><ul><li><strong>Classification:</strong> Use tested categories and handle ambiguous requests explicitly.</li><li><strong>Specialist:</strong> Retrieve the customer's permitted data and apply policy consistently.</li><li><strong>Escalation:</strong> Preserve the case summary, actions already attempted, and the precise decision needed from a human.</li></ul><p><strong>Remember:</strong> An escalation handoff should reduce repetition without hiding uncertainty or prior actions.</p>"
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
