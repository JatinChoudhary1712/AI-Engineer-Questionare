const topics = [
  {
    "title": "FAISS",
    "questions": [
      [
        "What does FAISS provide, and what must an application add around it?",
        "<p>FAISS is a library for efficient vector similarity search and clustering rather than a complete managed database service.</p><ul><li><strong>Indexes:</strong> Choose exact or approximate search structures for the accuracy, memory, and latency you need.</li><li><strong>Integration:</strong> Maintain vector-to-document mappings, metadata, persistence, and update workflows around the index.</li><li><strong>Operations:</strong> Implement authorization, backups, concurrency handling, and service access if your deployment needs them.</li></ul><p><strong>Remember:</strong> Distinguish a vector-search engine from the database and service responsibilities around it.</p><p><a href=\"https://faiss.ai/\" target=\"_blank\" rel=\"noopener noreferrer\">FAISS documentation</a></p>"
      ]
    ]
  },
  {
    "title": "Chroma",
    "questions": [
      [
        "What should you evaluate when using Chroma for RAG?",
        "<p>Evaluate its document, embedding, metadata, and query workflows against your required deployment and workload.</p><ul><li><strong>Data:</strong> Keep stable document IDs, embeddings, source text, and useful metadata together.</li><li><strong>Retrieval:</strong> Test filtering and relevance using your embedding configuration and chosen search features.</li><li><strong>Deployment:</strong> Choose the appropriate supported deployment mode and verify persistence, access control, and capacity.</li></ul><p><strong>Remember:</strong> A local prototype and a production service require different operating checks.</p><p><a href=\"https://docs.trychroma.com/docs/overview/introduction\" target=\"_blank\" rel=\"noopener noreferrer\">Chroma documentation</a></p>"
      ]
    ]
  },
  {
    "title": "Pinecone",
    "questions": [
      [
        "What changes when vector search is handled by a managed service such as Pinecone?",
        "<p>The service operates the vector-search infrastructure while your application still owns ingestion, authorization, and result quality.</p><ul><li><strong>Configuration:</strong> Select compatible vector dimensions, metrics, and index settings.</li><li><strong>Isolation:</strong> Apply the documented namespace and metadata policies for the authenticated tenant.</li><li><strong>Operations:</strong> Measure query costs, ingestion behavior, latency, deletion, and recovery requirements.</li></ul><p><strong>Remember:</strong> Managed infrastructure does not remove application-level responsibilities.</p><p><a href=\"https://docs.pinecone.io/guides/get-started/overview\" target=\"_blank\" rel=\"noopener noreferrer\">Pinecone documentation</a></p>"
      ]
    ]
  },
  {
    "title": "Weaviate",
    "questions": [
      [
        "How should you assess Weaviate for a retrieval application?",
        "<p>Evaluate its data model, retrieval features, filtering, and deployment options on the actual task.</p><ul><li><strong>Modeling:</strong> Design collections and properties so content and access metadata remain connected.</li><li><strong>Search:</strong> Test the desired vector, keyword, or hybrid workflow and its filtering behavior.</li><li><strong>Deployment:</strong> Consider supported self-managed or cloud options rather than treating it as self-hosted only.</li></ul><p><strong>Remember:</strong> The roadmap's category is a starting point, not an exclusive deployment limit.</p><p><a href=\"https://docs.weaviate.io/weaviate\" target=\"_blank\" rel=\"noopener noreferrer\">Weaviate documentation</a></p>"
      ]
    ]
  },
  {
    "title": "Qdrant",
    "questions": [
      [
        "What matters when choosing Qdrant for filtered vector search?",
        "<p>Measure relevance and latency together with payload filtering and tenant-isolation requirements.</p><ul><li><strong>Records:</strong> Store vectors and payload fields needed for source lookup, filters, and permissions.</li><li><strong>Indexes:</strong> Configure vector and relevant payload indexes based on measured query behavior.</li><li><strong>Deployment:</strong> Check supported local, self-managed, or managed options and their operational limits.</li></ul><p><strong>Remember:</strong> High performance is workload-dependent and must be tested with real filters and updates.</p><p><a href=\"https://qdrant.tech/documentation/manage-data/multitenancy/\" target=\"_blank\" rel=\"noopener noreferrer\">Qdrant multitenancy</a></p>"
      ]
    ]
  },
  {
    "title": "LanceDB",
    "questions": [
      [
        "Where can LanceDB fit into a retrieval system?",
        "<p>It provides vector-oriented data storage and retrieval options that can suit embedded or service-based applications.</p><ul><li><strong>Data:</strong> Store vectors alongside the data and metadata needed to interpret results.</li><li><strong>Operations:</strong> Evaluate index creation, updates, storage access, and concurrency for the chosen deployment.</li><li><strong>Serverless:</strong> Verify persistence and startup behavior rather than assuming local files survive an ephemeral runtime.</li></ul><p><strong>Remember:</strong> Embedded deployment simplifies some operations but still needs a durable storage plan.</p><p><a href=\"https://docs.lancedb.com/\" target=\"_blank\" rel=\"noopener noreferrer\">LanceDB documentation</a></p>"
      ]
    ]
  },
  {
    "title": "pgvector",
    "questions": [
      [
        "When is pgvector a useful choice for vector search?",
        "<p>It adds vector storage and similarity search to PostgreSQL so retrieval can work alongside existing relational data.</p><ul><li><strong>Integration:</strong> Combine vectors with document IDs, metadata, transactions, and application permissions.</li><li><strong>Indexes:</strong> Compare exact scans and supported approximate indexes using your dimensions, filters, and workload.</li><li><strong>Capacity:</strong> Monitor query plans, maintenance, memory, and write load rather than assuming existing database resources are sufficient.</li></ul><p><strong>Remember:</strong> Keeping vectors in Postgres can simplify integration without eliminating performance design.</p><p><a href=\"https://github.com/pgvector/pgvector\" target=\"_blank\" rel=\"noopener noreferrer\">pgvector documentation</a></p>"
      ]
    ]
  },
  {
    "title": "MongoDB Atlas",
    "questions": [
      [
        "How does MongoDB Vector Search relate to document data?",
        "<p>It supports indexing and searching vectors alongside fields in MongoDB documents.</p><ul><li><strong>Modeling:</strong> Retain embedding configuration, source text or references, and metadata on related records.</li><li><strong>Queries:</strong> Combine supported vector retrieval with suitable filters and evaluate any hybrid-search workflow.</li><li><strong>Operations:</strong> Check index configuration, freshness, capacity, and permissions for the chosen deployment.</li></ul><p><strong>Remember:</strong> Reusing a document database is useful when its search and operational contracts fit the application.</p><p><a href=\"https://www.mongodb.com/docs/vector-search/\" target=\"_blank\" rel=\"noopener noreferrer\">MongoDB Vector Search</a></p>"
      ]
    ]
  },
  {
    "title": "Supabase",
    "questions": [
      [
        "How does Supabase support Postgres-backed vector retrieval?",
        "<p>Supabase exposes Postgres-based workflows where pgvector can store and search embeddings alongside application data.</p><ul><li><strong>Schema:</strong> Match the vector column's dimensions and metric to the embedding configuration.</li><li><strong>Access:</strong> Enforce row-level or application-level permissions consistently through the retrieval query.</li><li><strong>Integration:</strong> Connect ingestion, database functions, and authentication without exposing privileged service credentials to clients.</li></ul><p><strong>Remember:</strong> A managed Postgres platform still needs a carefully authorized retrieval path.</p><p><a href=\"https://supabase.com/docs/guides/ai/vector-columns\" target=\"_blank\" rel=\"noopener noreferrer\">Supabase vector columns</a></p>"
      ]
    ]
  },
  {
    "title": "Indexing - storing embeddings with metadata",
    "questions": [
      [
        "What should an indexing operation store besides a vector?",
        "<p>Index a stable record that connects each embedding to its content, provenance, configuration, and access rules.</p><ul><li><strong>Identity:</strong> Use repeatable document/chunk IDs so retries update the intended record.</li><li><strong>Compatibility:</strong> Record the embedding model and relevant preprocessing or index versions.</li><li><strong>Lifecycle:</strong> Plan for updates, deletions, and failures that occur after only part of a document is written.</li></ul><p><strong>Remember:</strong> An embedding without its source and lifecycle metadata is hard to operate reliably.</p>"
      ]
    ]
  },
  {
    "title": "Similarity search - finding nearest neighbors",
    "questions": [
      [
        "What does a top-K nearest-neighbor search return?",
        "<p>It returns the index's K closest candidates under the configured metric and search policy.</p><ul><li><strong>Ranking:</strong> Interpret score direction and scale correctly for similarity versus distance.</li><li><strong>Approximation:</strong> An approximate index trades exact-neighbor recall for resource or latency benefits.</li><li><strong>Evidence:</strong> Rerank or reject weak candidates rather than treating the top result as an answer.</li></ul><p><strong>Remember:</strong> Top-K is a retrieval budget, not a guarantee that K relevant passages exist.</p>"
      ]
    ]
  },
  {
    "title": "Filtered search - metadata + vector similarity",
    "questions": [
      [
        "Why must metadata filtering be part of retrieval design?",
        "<p>Filters restrict the eligible search set according to business criteria and the caller's permissions.</p><ul><li><strong>Authorization:</strong> Derive tenant and access constraints from trusted identity data.</li><li><strong>Search behavior:</strong> Test how restrictive filters interact with approximate search and candidate counts.</li><li><strong>Enforcement:</strong> Ensure excluded content never reaches generation, reranking, logs, or caches through an alternate path.</li></ul><p><strong>Remember:</strong> A user-requested filter and a mandatory access-control filter serve different roles.</p><p class=\"example\"><strong>Example:</strong> Every query includes a tenant constraint derived from the signed-in user. A model-generated date filter may narrow that scope, but must never replace or remove it.</p>"
      ]
    ]
  },
  {
    "title": "Hybrid search - keyword + vector (BM25 + embeddings)",
    "questions": [
      [
        "How does hybrid search combine BM25 and vector retrieval?",
        "<p>It combines lexical matching with semantic similarity to cover different kinds of relevance signals.</p><ul><li><strong>Lexical:</strong> Useful for exact names, identifiers, and important terms that embeddings may blur.</li><li><strong>Dense:</strong> Useful for paraphrases and meaning-based matches.</li><li><strong>Fusion:</strong> Use a tested rank-fusion or score-calibration method rather than adding incompatible raw scores blindly.</li></ul><p><strong>Remember:</strong> Hybrid retrieval is valuable when the signals complement each other on your data.</p>"
      ]
    ]
  },
  {
    "title": "Namespace/collection isolation - multi-tenant",
    "questions": [
      [
        "Do namespaces or collections automatically guarantee tenant isolation?",
        "<p>No; isolation depends on how the application selects, authorizes, and accesses those storage boundaries.</p><ul><li><strong>Scope:</strong> Bind the namespace, collection, shard, or mandatory filter to authenticated tenant policy.</li><li><strong>Coverage:</strong> Apply the boundary to ingestion, retrieval, reranking, caching, exports, and deletion.</li><li><strong>Validation:</strong> Test cross-tenant access attempts, including empty filters and administrative credentials.</li></ul><p><strong>Remember:</strong> Naming conventions are not an authorization mechanism.</p>"
      ]
    ]
  },
  {
    "title": "HNSW index - Hierarchical Navigable Small World (algorithm behind most vector DBs)",
    "questions": [
      [
        "How does HNSW accelerate vector retrieval?",
        "<p>HNSW builds a layered proximity graph that guides approximate nearest-neighbor exploration.</p><ul><li><strong>Navigation:</strong> Start with coarse graph connections and refine the search through nearer candidates.</li><li><strong>Tuning:</strong> Graph connectivity and construction/search exploration parameters trade memory, build time, recall, and latency.</li><li><strong>Alternatives:</strong> Exact scans, inverted-file methods, and other indexes may fit different workloads; not every database uses HNSW for every query.</li></ul><p><strong>Remember:</strong> HNSW is a useful index choice, not a universal or exact-search guarantee.</p>"
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
