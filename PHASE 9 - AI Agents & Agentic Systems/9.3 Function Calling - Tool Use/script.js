const topics = [
  {
    "title": "Define tools as JSON schemas",
    "questions": [
      [
        "What should an OpenAI function-tool schema define?",
        "<p>Describe a callable function's name, purpose, and argument structure using the selected API's supported tool schema.</p><ul><li><strong>Arguments:</strong> Specify types, required fields, and allowed values clearly.</li><li><strong>Constraints:</strong> Use supported strict-schema options where appropriate and validate business rules on the backend.</li><li><strong>Trust:</strong> A valid argument object does not establish permission to perform the operation.</li></ul><p><strong>Remember:</strong> A tool schema communicates a contract; the application still enforces it.</p><p><strong>Responses API definition example:</strong> The backend derives user identity separately and checks order access.</p><pre><code class=\"language-json\">{\n  &quot;type&quot;: &quot;function&quot;,\n  &quot;name&quot;: &quot;lookup_order&quot;,\n  &quot;description&quot;: &quot;Read the status of one order the authenticated user may access.&quot;,\n  &quot;parameters&quot;: {\n    &quot;type&quot;: &quot;object&quot;,\n    &quot;properties&quot;: {\n      &quot;order_id&quot;: {\n        &quot;type&quot;: &quot;string&quot;,\n        &quot;description&quot;: &quot;The order identifier.&quot;\n      }\n    },\n    &quot;required&quot;: [\n      &quot;order_id&quot;\n    ],\n    &quot;additionalProperties&quot;: false\n  },\n  &quot;strict&quot;: true\n}</code></pre><p><a href=\"https://developers.openai.com/api/docs/guides/function-calling\" target=\"_blank\" rel=\"noopener noreferrer\">Official OpenAI function-calling guide</a></p>"
      ]
    ]
  },
  {
    "title": "Attach to API call",
    "questions": [
      [
        "How are tools made available to an OpenAI model call?",
        "<p>Include the supported tool definitions in the request to the selected API and model.</p><ul><li><strong>Eligibility:</strong> Expose only operations permitted for this authenticated user and task.</li><li><strong>Compatibility:</strong> Follow the chosen API's request shape instead of mixing Responses and Chat Completions examples.</li><li><strong>Configuration:</strong> Set supported tool-selection options deliberately and reserve context for descriptions and results.</li></ul><p><strong>Remember:</strong> Attaching a tool allows the model to propose calls; it does not execute your function automatically.</p>"
      ]
    ]
  },
  {
    "title": "Parse tool call responses",
    "questions": [
      [
        "How should an application parse OpenAI tool-call output?",
        "<p>Inspect typed response items and collect each proposed call's identity, name, and completed arguments.</p><ul><li><strong>Dispatch:</strong> Reject unknown tool names rather than invoking arbitrary code from model output.</li><li><strong>Parsing:</strong> Decode and validate the argument payload before using any field.</li><li><strong>Streaming:</strong> Buffer partial arguments until a complete callable request is available.</li></ul><p><strong>Remember:</strong> Tool calls are structured proposals, not plain text to execute.</p>"
      ]
    ]
  },
  {
    "title": "Execute tool, return result",
    "questions": [
      [
        "What must happen before executing a proposed tool call?",
        "<p>Validate its contract and authorization, then invoke the allowlisted operation with runtime limits.</p><ul><li><strong>Identity:</strong> Derive user and tenant scope from trusted server state.</li><li><strong>Execution:</strong> Apply deadlines and protect non-idempotent operations from duplicate execution.</li><li><strong>Result:</strong> Return a bounded success or failure record tied to the original call.</li></ul><p><strong>Remember:</strong> Backend validation and permissions remain necessary even when schema enforcement is enabled.</p>"
      ]
    ]
  },
  {
    "title": "Continue conversation with tool result",
    "questions": [
      [
        "How does an OpenAI tool result continue the model conversation?",
        "<p>Return the completed operation's result using the selected API's matching call identifier and result structure.</p><ul><li><strong>Correlation:</strong> Associate every result with the call it answers.</li><li><strong>Context:</strong> Preserve required response or conversation items so the model can interpret the result.</li><li><strong>Loop:</strong> Continue until a final answer, a permitted next call, or a defined stopping condition is reached.</li></ul><p><strong>Remember:</strong> Producing a tool result is one step in a bounded application loop.</p><p><a href=\"https://developers.openai.com/api/docs/guides/function-calling\" target=\"_blank\" rel=\"noopener noreferrer\">Official OpenAI tool-call workflow</a></p>"
      ]
    ]
  },
  {
    "title": "Parallel tool calls",
    "questions": [
      [
        "When can multiple tool calls run in parallel?",
        "<p>Run them concurrently when their dependencies, permissions, and side effects allow independent execution.</p><ul><li><strong>Independence:</strong> Reading two unrelated sources can be parallel; a write that depends on a preceding lookup cannot.</li><li><strong>Limits:</strong> Bound concurrency, deadlines, and shared resource consumption.</li><li><strong>Results:</strong> Preserve call-to-result mapping and handle partial failure without duplicating successful actions.</li></ul><p><strong>Remember:</strong> A model proposing several calls does not prove they are safe to execute simultaneously.</p>"
      ]
    ]
  },
  {
    "title": "Tool definition format",
    "questions": [
      [
        "What does an Anthropic Messages tool definition contain?",
        "<p>A custom tool definition identifies a tool and describes its accepted input using an input_schema.</p><ul><li><strong>Description:</strong> Explain the operation and parameter meaning clearly.</li><li><strong>Schema:</strong> Define the supported JSON input structure and validate it when a tool_use block arrives.</li><li><strong>Permissions:</strong> Offer only the tools permitted for the request's authenticated scope.</li></ul><p><strong>Remember:</strong> Use the Messages API's own schema rather than copying another provider's tool wrapper.</p><p><a href=\"https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools\" target=\"_blank\" rel=\"noopener noreferrer\">Claude Messages: define tools</a></p>"
      ]
    ]
  },
  {
    "title": "Tool result format",
    "questions": [
      [
        "How is a tool result returned to Claude's Messages API?",
        "<p>Provide a tool_result content block correlated to the original tool_use identifier.</p><ul><li><strong>Identifier:</strong> Match tool_use_id to the request that was executed.</li><li><strong>Message structure:</strong> Return results in the supported user-message content structure while retaining the assistant's tool-use content.</li><li><strong>Errors:</strong> Mark failed execution appropriately and provide bounded useful details without leaking secrets.</li></ul><p><strong>Remember:</strong> A correctly correlated tool result is different from an unrelated user message containing similar text.</p><pre><code class=\"language-json\">{\n  &quot;type&quot;: &quot;tool_result&quot;,\n  &quot;tool_use_id&quot;: &quot;toolu_example&quot;,\n  &quot;content&quot;: &quot;{\\&quot;status\\&quot;:\\&quot;shipped\\&quot;}&quot;\n}</code></pre><p><a href=\"https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls\" target=\"_blank\" rel=\"noopener noreferrer\">Claude Messages: handle tool calls</a></p>"
      ]
    ]
  },
  {
    "title": "Multi-tool usage",
    "questions": [
      [
        "How should a Claude workflow handle multiple tool-use blocks?",
        "<p>Collect the requested operations, execute only permitted calls, and return their correlated results in the required structure.</p><ul><li><strong>Scheduling:</strong> Parallelize independent calls while respecting dependencies and runtime limits.</li><li><strong>Correlation:</strong> Produce a result for each handled tool-use identifier rather than losing failures silently.</li><li><strong>Continuation:</strong> Let the next model step inspect the combined outcomes before choosing further actions.</li></ul><p><strong>Remember:</strong> Multi-tool behavior still requires application-owned execution and failure policy.</p><p><a href=\"https://platform.claude.com/docs/en/agents-and-tools/tool-use/parallel-tool-use\" target=\"_blank\" rel=\"noopener noreferrer\">Claude parallel tool use</a></p>"
      ]
    ]
  },
  {
    "title": "Tool validation - input schema validation",
    "questions": [
      [
        "What should input validation check beyond JSON parsing?",
        "<p>Check both the data structure and the operation-specific meaning before running a tool.</p><ul><li><strong>Schema:</strong> Reject missing fields, wrong types, unsupported properties, and invalid enum values.</li><li><strong>Semantics:</strong> Check ranges, units, paths, dates, identifiers, and relationships between fields.</li><li><strong>Authorization:</strong> Validate resource access separately; a syntactically valid account ID may belong to another user.</li></ul><p><strong>Remember:</strong> Parseable JSON is not necessarily valid or authorized input.</p>"
      ]
    ]
  },
  {
    "title": "Tool error handling - graceful failure",
    "questions": [
      [
        "How should tool failures be communicated to an agent?",
        "<p>Return structured, actionable failure information while keeping secrets and internal details out of model context.</p><ul><li><strong>Categories:</strong> Distinguish invalid input, forbidden access, timeout, transient dependency failure, and a completed-but-unconfirmed action.</li><li><strong>Recovery:</strong> Explain whether a bounded retry, corrected input, or human decision is appropriate.</li><li><strong>Honesty:</strong> Do not format an error as a successful result that later stages may trust.</li></ul><p><strong>Remember:</strong> Graceful failure preserves the distinction between an attempted and completed action.</p>"
      ]
    ]
  },
  {
    "title": "Tool timeouts",
    "questions": [
      [
        "How should tool timeouts fit into the overall agent deadline?",
        "<p>Assign each call a bounded time budget within the run's remaining deadline.</p><ul><li><strong>Allocation:</strong> Include queueing, retries, and follow-up work rather than restarting a full timeout at every step.</li><li><strong>Cancellation:</strong> Stop underlying work when possible and record tasks that may still be running.</li><li><strong>Ambiguity:</strong> A timed-out write may have succeeded, so reconcile its status before attempting it again.</li></ul><p><strong>Remember:</strong> A timeout describes observation of a call, not proof that its side effect did not happen.</p><p class=\"example\"><strong>Example:</strong> A booking request times out after the upstream service receives it. Check the booking or idempotency key before retrying; otherwise one requested appointment could become two.</p>"
      ]
    ]
  },
  {
    "title": "Tool authorization - what can the agent do?",
    "questions": [
      [
        "Where should tool authorization be enforced?",
        "<p>Enforce it in the application or tool service using trusted user identity, resource ownership, and policy.</p><ul><li><strong>Scope:</strong> Restrict tool availability and recheck access at execution time.</li><li><strong>Decisions:</strong> Treat model-selected resources and external instructions as untrusted inputs.</li><li><strong>Audit:</strong> Record which policy allowed or denied the concrete action.</li></ul><p><strong>Remember:</strong> Prompt instructions and agent role descriptions are not access-control mechanisms.</p>"
      ]
    ]
  },
  {
    "title": "Sandboxed code execution",
    "questions": [
      [
        "What should a sandboxed execution environment restrict?",
        "<p>Limit the resources untrusted code can access and the effects it can create.</p><ul><li><strong>Isolation:</strong> Control filesystem mounts, network destinations, identities, secrets, and available commands.</li><li><strong>Quotas:</strong> Cap runtime, memory, CPU, process count, and result size.</li><li><strong>Operations:</strong> Patch and reset environments and verify that host credentials are not accidentally mounted inside.</li></ul><p><strong>Remember:</strong> A sandbox is an engineered boundary, not just a label applied to a process.</p>"
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
