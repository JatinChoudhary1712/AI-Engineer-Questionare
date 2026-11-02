const topics = [
  {
    "title": "Autonomy - agents make decisions without human input per step",
    "questions": [
      [
        "What does autonomy mean in a production agentic system?",
        "<p>It means choosing some intermediate steps without requiring a human decision at every step, within an explicit scope.</p><ul><li><strong>Delegation:</strong> Define what the user has authorized and which actions the system may take independently.</li><li><strong>Boundaries:</strong> Enforce permissions and confirmation rules outside the model.</li><li><strong>Visibility:</strong> Provide status and a way to cancel or intervene as work proceeds.</li></ul><p><strong>Remember:</strong> Autonomy is bounded delegation rather than unrestricted authority.</p><p><strong>Chapter context:</strong> AskAI Framework is retained as the supplied roadmap heading. These questions explain the listed agentic principles and production patterns without assuming a particular AskAI package or undocumented API.</p>"
      ]
    ]
  },
  {
    "title": "Goal-directedness - agents work toward specified objectives",
    "questions": [
      [
        "How should an agent's goal be defined?",
        "<p>Specify the desired outcome, constraints, and evidence that will establish completion.</p><ul><li><strong>Outcome:</strong> Use concrete deliverables instead of a vague instruction such as improve everything.</li><li><strong>Constraints:</strong> State resource limits, permitted actions, and requirements that must remain true.</li><li><strong>Completion:</strong> Verify acceptance criteria against artifacts and observations rather than the agent's confidence.</li></ul><p><strong>Remember:</strong> Goal-directedness requires a testable definition of done.</p>"
      ]
    ]
  },
  {
    "title": "Persistence - agents maintain state across interactions",
    "questions": [
      [
        "What state should persist across agent interactions?",
        "<p>Persist the information necessary to resume authorized work and understand what has already happened.</p><ul><li><strong>Task state:</strong> Keep the goal, plan version, completed steps, pending decisions, and artifact references.</li><li><strong>Execution:</strong> Store tool outcomes and idempotency references for consequential actions.</li><li><strong>Lifecycle:</strong> Scope access, define retention, and revalidate stale data on resumption.</li></ul><p><strong>Remember:</strong> Persistence should preserve verified state without blindly preserving every generated statement.</p>"
      ]
    ]
  },
  {
    "title": "Adaptability - agents adjust based on feedback",
    "questions": [
      [
        "How should an agent adapt when feedback contradicts its plan?",
        "<p>Update the relevant assumptions and next steps while preserving the original authorized objective and constraints.</p><ul><li><strong>Feedback:</strong> Distinguish a user's correction, new evidence, and an unreliable external claim.</li><li><strong>Revision:</strong> Record what changed and reconsider dependent work that relied on the invalid assumption.</li><li><strong>Scope:</strong> Ask for a necessary decision when new requirements conflict or exceed the delegated authority.</li></ul><p><strong>Remember:</strong> Adaptability is controlled replanning rather than silent goal drift.</p>"
      ]
    ]
  },
  {
    "title": "Task decomposition - breaking complex tasks into subtasks",
    "questions": [
      [
        "How should a complex agent task be decomposed?",
        "<p>Break it into bounded steps with clear dependencies, outputs, and validation points.</p><ul><li><strong>Structure:</strong> Separate information gathering, decisions, and consequential actions.</li><li><strong>Ownership:</strong> Assign each deliverable or side effect to a specific stage or agent.</li><li><strong>Granularity:</strong> Keep steps small enough to inspect and recover without creating excessive coordination overhead.</li></ul><p><strong>Remember:</strong> A useful task breakdown makes progress and failure states observable.</p>"
      ]
    ]
  },
  {
    "title": "Progress tracking - monitoring multi-step completion",
    "questions": [
      [
        "What should progress tracking show during a multi-step run?",
        "<p>Track verified task states and concrete artifacts rather than presenting guesses as completed work.</p><ul><li><strong>States:</strong> Distinguish pending, running, waiting for input, failed, canceled, and completed.</li><li><strong>Evidence:</strong> Associate completion with a validated result or recorded tool outcome.</li><li><strong>Communication:</strong> Surface useful status updates and unresolved decisions without exposing private internal reasoning or secrets.</li></ul><p><strong>Remember:</strong> Attempted work and completed work must remain different states.</p><pre><code class=\"language-json\">{\n  &quot;run_id&quot;: &quot;run-42&quot;,\n  &quot;task_id&quot;: &quot;verify-report&quot;,\n  &quot;status&quot;: &quot;waiting_for_input&quot;,\n  &quot;completed_artifacts&quot;: [&quot;draft-report-v2&quot;],\n  &quot;pending_decision&quot;: &quot;Approve the exact publication target&quot;,\n  &quot;attempt_count&quot;: 1\n}</code></pre>"
      ]
    ]
  },
  {
    "title": "Error recovery - retrying failed steps",
    "questions": [
      [
        "How should an agent recover from a failed step?",
        "<p>Classify the failure, inspect prior effects, and choose a bounded retry, repair, replan, or escalation.</p><ul><li><strong>Transient failures:</strong> Retry with backoff and a remaining deadline when the operation permits it.</li><li><strong>Ambiguous effects:</strong> Reconcile whether a write or send already occurred before repeating it.</li><li><strong>Validation:</strong> Recheck the result and stop when repeated attempts no longer make progress.</li></ul><p><strong>Remember:</strong> Retrying an entire workflow can duplicate effects that already succeeded.</p>"
      ]
    ]
  },
  {
    "title": "Human escalation - when to pause and ask for input",
    "questions": [
      [
        "When should an agent pause for human input?",
        "<p>Pause when a required decision, missing authorization, or unresolved ambiguity prevents safe progress within the agreed task.</p><ul><li><strong>Information:</strong> Ask for the smallest missing detail rather than reopening settled decisions.</li><li><strong>Approval:</strong> Present the concrete action and expected consequences when confirmation is required.</li><li><strong>Continuity:</strong> Save the current state and continue independent authorized work where that remains useful.</li></ul><p><strong>Remember:</strong> Escalation should resolve a specific blocker, not substitute for routine agent judgment.</p>"
      ]
    ]
  },
  {
    "title": "Audit trails - logging every agent decision",
    "questions": [
      [
        "What belongs in an audit trail for agent decisions and actions?",
        "<p>Record observable decisions, inputs, policy outcomes, tool calls, and results with useful correlation identifiers.</p><ul><li><strong>Attribution:</strong> Link user, tenant, run, agent, task, tool, and artifact identities.</li><li><strong>Explanation:</strong> Store concise decision factors or policy reasons when useful, rather than assuming access to hidden model reasoning.</li><li><strong>Protection:</strong> Redact secrets, restrict access, define retention, and protect records against inappropriate modification.</li></ul><p><strong>Remember:</strong> An audit log should support reconstruction of events without becoming another sensitive-data leak.</p>"
      ]
    ]
  },
  {
    "title": "Action confirmation for irreversible operations",
    "questions": [
      [
        "How should confirmation work for an irreversible operation?",
        "<p>Ask for confirmation of the concrete action when the task's policy or delegated authority requires it.</p><ul><li><strong>Reviewability:</strong> Show the exact target, payload, timing, cost, and expected effect.</li><li><strong>Binding:</strong> Ensure approval applies to that proposed action and does not silently authorize materially changed parameters.</li><li><strong>Execution:</strong> Recheck permission and relevant state before performing the operation and record the result.</li></ul><p><strong>Remember:</strong> General willingness to use an agent is not blanket approval for every irreversible action.</p>"
      ]
    ]
  },
  {
    "title": "Scope limitation - what agents can and cannot do",
    "questions": [
      [
        "How should an agent's scope be limited?",
        "<p>Define allowlisted capabilities and resource boundaries and enforce them at runtime.</p><ul><li><strong>Tools:</strong> Grant only the operations and credentials needed for the current task.</li><li><strong>Data:</strong> Restrict tenants, accounts, destinations, files, and records independently of model-generated arguments.</li><li><strong>Evolution:</strong> Require a valid policy change or additional authorization before expanding scope.</li></ul><p><strong>Remember:</strong> A sentence in a system prompt is not a complete scope boundary.</p>"
      ]
    ]
  },
  {
    "title": "Cost controls - maximum spend per agent run",
    "questions": [
      [
        "How can a maximum spending limit be enforced per run?",
        "<p>Reserve and reconcile costs across model calls and tools before permitting more work.</p><ul><li><strong>Coverage:</strong> Include retries, parallel branches, search, embeddings, execution, and other billable operations.</li><li><strong>Concurrency:</strong> Use atomic shared budget checks so multiple workers cannot each spend the same remaining allowance.</li><li><strong>Exhaustion:</strong> Stop or return a clear partial result when the remaining budget cannot support the next required step.</li></ul><p><strong>Remember:</strong> Reporting spend afterward cannot enforce a hard limit by itself.</p>"
      ]
    ]
  },
  {
    "title": "Sandboxing code execution",
    "questions": [
      [
        "Why is sandboxing still needed for an agent with good prompts?",
        "<p>Prompt compliance does not guarantee that generated code or external content will behave safely.</p><ul><li><strong>Defense:</strong> Execute untrusted work within restricted resources and permissions.</li><li><strong>Secrets:</strong> Keep production credentials, sensitive host files, and privileged network access outside the sandbox.</li><li><strong>Verification:</strong> Test isolation, enforce limits, and reset execution state according to the workload.</li></ul><p><strong>Remember:</strong> Sandboxing limits consequences even when model instructions fail.</p>"
      ]
    ]
  },
  {
    "title": "Input/output validation",
    "questions": [
      [
        "What should be validated at an agent system's input and output boundaries?",
        "<p>Validate requests, tool arguments, observations, and final results according to their structure and trust level.</p><ul><li><strong>Inputs:</strong> Check identity, scope, types, size, and operation-specific constraints.</li><li><strong>Observations:</strong> Treat retrieved documents, tool output, and other agents' messages as untrusted evidence.</li><li><strong>Outputs:</strong> Verify schemas, supported claims, requested artifacts, and action results before declaring success.</li></ul><p><strong>Remember:</strong> Validation is needed at every handoff, not just before the first model call.</p>"
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
