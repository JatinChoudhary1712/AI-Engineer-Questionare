const topics = [
  {
    "title": "No single model is best for all tasks",
    "questions": [
      [
        "Why is no single language model best for every task?",
        "<p>Model quality depends on the task, inputs, serving configuration, and constraints.</p><ul><li><strong>Specialization:</strong> A model that extracts structured fields well may perform differently on coding or long-document reasoning.</li><li><strong>Evaluation:</strong> Compare candidate models using the same held-out tasks and measurable success criteria.</li><li><strong>Tradeoff:</strong> Quality, cost, latency, context capacity, and permitted data handling can favor different choices.</li></ul><p><strong>Remember:</strong> Choose from evidence on your workload rather than a universal model ranking.</p>"
      ]
    ]
  },
  {
    "title": "Cost optimization - use expensive models only when needed",
    "questions": [
      [
        "How does multi-model routing reduce cost without sacrificing required quality?",
        "<p>Send a request to the least expensive eligible model that meets the task's acceptance criteria.</p><ul><li><strong>Baseline:</strong> Measure a smaller model on representative tasks before deciding where it is adequate.</li><li><strong>Escalation:</strong> Use a stronger model when explicit complexity rules or validated failure signals justify it.</li><li><strong>Total cost:</strong> Include routing, retries, validation, retrieval, and fallback calls in the comparison.</li></ul><p><strong>Remember:</strong> A low price per call is useful only if the overall workflow still succeeds.</p><p class=\"example\"><strong>Example:</strong> Classify short support tickets with a smaller evaluated model; escalate ambiguous tickets to a stronger eligible model. Measure total cost and resolution quality across both routes.</p>"
      ]
    ]
  },
  {
    "title": "Reliability - fallback when one provider is down",
    "questions": [
      [
        "How can multiple providers improve reliability?",
        "<p>An independently operated provider can serve eligible requests when the primary dependency fails.</p><ul><li><strong>Failure domains:</strong> Separate providers may avoid the same service outage, but your gateway, network, or shared dependency can still fail.</li><li><strong>Compatibility:</strong> Check that the fallback supports the required context, tools, modalities, and output contract.</li><li><strong>Policy:</strong> Route only to providers permitted for that tenant's data.</li></ul><p><strong>Remember:</strong> Redundancy helps when failover is both operationally tested and authorized.</p>"
      ]
    ]
  },
  {
    "title": "Latency - route to fastest model for simple queries",
    "questions": [
      [
        "How should a router optimize latency for simple queries?",
        "<p>Prefer a model and execution path that meet the request's quality requirement within its deadline.</p><ul><li><strong>Measurements:</strong> Track time to first useful output and full completion time under actual load.</li><li><strong>Admission:</strong> Account for queue delay, current capacity, and rate limits before sending work.</li><li><strong>Overhead:</strong> Keep task classification and retrieval costs small enough that they do not erase the benefit.</li></ul><p><strong>Remember:</strong> Fast token generation does not automatically mean a fast end-to-end response.</p>"
      ]
    ]
  },
  {
    "title": "Compliance - some enterprise customers can't use certain providers",
    "questions": [
      [
        "How should enterprise provider restrictions affect routing?",
        "<p>Treat a tenant's provider and data-handling restrictions as hard eligibility rules.</p><ul><li><strong>Identity:</strong> Determine the authenticated tenant and its policy before selecting a model.</li><li><strong>Filtering:</strong> Exclude disallowed regions, providers, or data flows before optimizing quality or cost.</li><li><strong>Enforcement:</strong> Recheck the same policy for fallback, logging, caching, and tool calls.</li></ul><p><strong>Remember:</strong> A provider outage is not permission to bypass a customer's restrictions.</p>"
      ]
    ]
  },
  {
    "title": "Context window - route to Claude for long docs, GPT-4 for reasoning",
    "questions": [
      [
        "How should context-window requirements influence model selection?",
        "<p>Count the complete request and reserve output space before choosing from eligible models.</p><ul><li><strong>Budget:</strong> Include instructions, retrieved documents, history, tool schemas, and model-specific overhead.</li><li><strong>Quality:</strong> Test long-document recall and reasoning rather than assuming a large context window guarantees either.</li><li><strong>Roadmap names:</strong> Claude and GPT-4 illustrate routing categories; actual limits and strengths depend on the selected version.</li></ul><p><strong>Remember:</strong> Route by measured capabilities and documented limits, not a permanent provider label.</p>"
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
