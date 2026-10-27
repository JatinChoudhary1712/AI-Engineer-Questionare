const topics = [
  {
    "title": "K-Means clustering",
    "questions": [
      [
        "What is K-Means clustering, and what does it optimize?",
        "<p>K-Means groups unlabeled points into K clusters. Each cluster has a representative mean called a centroid; points are assigned by distance to those centroids.</p><p>K-Means partitions data into K groups, assigning each point to a nearby centroid. It minimizes within-cluster squared Euclidean distances:</p><div class=\"formula\">\\[J=\\sum_{i=1}^{n}\\lVert x_i-\\mu_{c_i}\\rVert^2\\]</div><p>Here \\(c_i\\) is the cluster assigned to point \\(x_i\\), and \\(\\mu_{c_i}\\) is that cluster's mean. Cluster numbers are identifiers, not known class labels.</p>"
      ],
      [
        "How do the assignment and centroid-update steps work?",
        "<ol><li>Initialize K centroids, often using K-Means++.</li><li>Assign each point to its nearest centroid.</li><li>Replace each centroid with the mean of its assigned points.</li><li>Repeat until assignments or centroids stabilize, or the iteration limit is reached.</li></ol><p>Different initializations can produce different local solutions. Multiple runs help; they do not guarantee the global optimum.</p>"
      ],
      [
        "Can you calculate one K-Means update?",
        "<p>For one-dimensional points [1, 2, 8, 9], take K = 2 and initial centroids 1 and 8.</p><p>Nearest-centroid assignment gives groups [1, 2] and [8, 9]. Updated centroids are:</p><div class=\"formula\">\\[\\mu_1=(1+2)/2=1.5,\\qquad\\mu_2=(8+9)/2=8.5\\]</div><p>The next assignment is unchanged. The final squared-distance sum is \\(4(0.5^2)=1\\).</p>"
      ],
      [
        "How do I choose K?",
        "<p>Try plausible values and inspect the data, cluster usefulness, and stability across runs. An elbow plot tracks how inertia decreases as K grows; a silhouette score compares within-cluster cohesion with separation.</p><p>Inertia alone always favors adding clusters. Neither a visible elbow nor a high silhouette score guarantees meaningful groups.</p>"
      ],
      [
        "Why do feature scale and distance matter for K-Means?",
        "<p>Euclidean distances can be dominated by features with large numerical scales. Standardize heterogeneous tabular features when equal scale is appropriate.</p><p>For learned embeddings, choose preprocessing to match the intended similarity. Ordinary K-Means uses squared Euclidean distance; it is not automatically a cosine-clustering method, even with normalized inputs.</p>"
      ],
      [
        "When does K-Means struggle?",
        "<p>It works best for reasonably compact, similarly sized groups under Euclidean distance. Curved clusters, uneven density, and outliers can give poor assignments.</p><p>Every point is assigned to a cluster, so K-Means has no built-in noise label. The mean centroid is also sensitive to extreme values.</p>"
      ],
      [
        "How do I fit K-Means and inspect its centroids in Python?",
        "<p>This small example clusters points directly; no labels are used during fitting.</p><pre><code class=\"language-python\">import numpy as np\nfrom sklearn.cluster import KMeans\n\nX = np.array([[1.], [2.], [8.], [9.]])\nmodel = KMeans(n_clusters=2, n_init=10, random_state=42)\nlabels = model.fit_predict(X)\nprint(labels)  # Cluster IDs may be swapped\nprint(np.sort(model.cluster_centers_.ravel()))  # [1.5, 8.5]\nprint(model.inertia_)  # 1.0</code></pre><p><a href=\"https://scikit-learn.org/stable/modules/generated/sklearn.cluster.KMeans.html\" target=\"_blank\" rel=\"noopener noreferrer\">Reference: KMeans</a></p>"
      ]
    ]
  },
  {
    "title": "DBSCAN",
    "questions": [
      [
        "What is DBSCAN, and how does it discover clusters?",
        "<p>DBSCAN is density-based clustering: dense connected regions form groups, while isolated points can remain noise. Unlike K-Means, it does not require a chosen number of clusters.</p><p>DBSCAN joins connected dense regions and marks isolated points as noise. It can follow curved cluster shapes rather than forcing points around a mean centroid.</p><p>You choose a neighborhood radius and a density threshold. The number of clusters emerges from those settings and the data.</p>"
      ],
      [
        "What do eps and min_samples mean?",
        "<p><strong>eps:</strong> the radius within which points count as neighbors, under the chosen distance metric.</p><p><strong>min_samples:</strong> the minimum neighborhood count required for a core point. In scikit-learn, the point itself counts.</p><p>eps is a local neighborhood radius, not a maximum cluster diameter. A chain of dense neighborhoods can span a much greater distance.</p>"
      ],
      [
        "What is the difference between core, border, and noise points?",
        "<ul><li><strong>Core:</strong> has at least min_samples points, including itself, within eps.</li><li><strong>Border:</strong> is not core but lies within eps of a core point.</li><li><strong>Noise:</strong> belongs to no cluster.</li></ul><p>Clusters expand through connected core points. A border point can join a cluster but does not extend it. scikit-learn labels noise as -1.</p>"
      ],
      [
        "Can you work through a DBSCAN neighborhood example?",
        "<p>Take one-dimensional points [0, 0.1, 0.2, 3], eps = 0.15, and min_samples = 3.</p><p>The point 0.1 has neighbors [0, 0.1, 0.2], so it is core. Points 0 and 0.2 each have only two neighbors including themselves, but both are near that core point: they are border points.</p><p>The first three points form one cluster. Point 3 is noise.</p>"
      ],
      [
        "What happens if eps is too small or too large?",
        "<p><strong>Too small:</strong> neighborhoods may fail the density threshold, producing many noise points or fragmented clusters.</p><p><strong>Too large:</strong> distinct groups may connect and merge. Raising min_samples makes the density requirement stricter.</p><p>Inspect neighbor-distance patterns and resulting groups. A single radius can struggle when different clusters have very different densities.</p>"
      ],
      [
        "How do scaling and high-dimensional embeddings affect DBSCAN?",
        "<p>Scaling changes which points fall within eps. The radius must match the preprocessing and distance metric.</p><p>In high dimensions, distances can become less discriminative, making density thresholds difficult to choose. For embeddings, evaluate a suitable metric and any dimensionality reduction rather than assuming DBSCAN will discover meaningful topics.</p>"
      ],
      [
        "How do I identify DBSCAN clusters and noise in Python?",
        "<pre><code class=\"language-python\">import numpy as np\nfrom sklearn.cluster import DBSCAN\n\nX = np.array([[0.], [0.1], [0.2], [3.]])\nmodel = DBSCAN(eps=0.15, min_samples=3)\nlabels = model.fit_predict(X)\nprint(labels)  # [0, 0, 0, -1]\nprint(model.core_sample_indices_)  # [1]\nprint(X[labels == -1])  # [[3.]]</code></pre><p><a href=\"https://scikit-learn.org/stable/modules/generated/sklearn.cluster.DBSCAN.html\" target=\"_blank\" rel=\"noopener noreferrer\">Reference: DBSCAN</a></p>"
      ]
    ]
  },
  {
    "title": "PCA - dimensionality reduction and embeddings",
    "questions": [
      [
        "What is PCA, and how does it reduce dimensions?",
        "<p>PCA compresses many numerical features into fewer new coordinates. These coordinates are linear combinations of the original features, chosen to retain as much variance as possible.</p><p>PCA finds orthogonal directions of variation in centered data. The first component captures the largest variance; later components capture the largest remaining variance subject to orthogonality.</p><p>Keeping the first k components gives a linear, lower-dimensional representation. High variance does not necessarily mean useful semantic information or class separation.</p>"
      ],
      [
        "How is a point projected onto principal components?",
        "<p>Center the features using the fitted mean, then project onto the selected component directions:</p><div class=\"formula\">\\[Z=(X-\\mathbf{1}\\mu^{\\mathsf T})W_k\\]</div><p>For n examples with d features, \\(X\\) is n by d, \\(W_k\\) is d by k, and \\(Z\\) is n by k. Components are weighted combinations of the original features, not a selection of k original columns.</p>"
      ],
      [
        "Can you show a simple PCA projection?",
        "<p>Points (1, 1), (2, 2), and (3, 3) have mean (2, 2). Their variation lies along the diagonal direction \\((1,1)/\\sqrt{2}\\).</p><p>Projecting onto that direction produces:</p><div class=\"formula\">\\[-\\sqrt{2},\\quad0,\\quad\\sqrt{2}\\]</div><p>One component retains all variance in this exact example because there is no variation perpendicular to the diagonal. A component's sign can flip without changing the solution.</p>"
      ],
      [
        "How do I choose the number of PCA components?",
        "<p>Inspect cumulative explained variance:</p><div class=\"formula\">\\[r_k=\\frac{\\sum_{j=1}^{k}\\lambda_j}{\\sum_{j=1}^{d}\\lambda_j}\\]</div><p>Here \\(\\lambda_j\\) are component variances in descending order. A threshold such as 95% is a compression target, not a guarantee of 95% predictive accuracy.</p><p>For embeddings, also check whether compression preserves useful nearest neighbors or downstream performance.</p>"
      ],
      [
        "Should I standardize features before PCA?",
        "<p>PCA centers the data; scikit-learn PCA does not automatically scale each feature to unit variance.</p><p>For tabular columns in different units, standardization can prevent a large-scale column from dominating. For embedding coordinates, per-coordinate standardization changes the learned geometry, so it should be a deliberate choice.</p>"
      ],
      [
        "How does PCA compress embeddings, and what can be lost?",
        "<p>A fitted projection can turn a 384-dimensional embedding into, for example, 50 dimensions. This may reduce storage and distance-computation cost, while discarding variation outside the selected subspace.</p><p>Semantic similarity is not guaranteed to survive. Fit the projection on the training or reference embeddings and reuse it for new embeddings; do not independently refit query and document projections.</p>"
      ],
      [
        "How do I fit PCA and reuse the projection for new embeddings?",
        "<p>The random vectors below demonstrate shapes and the API; they are not semantic embeddings. Replace them with your model outputs.</p><pre><code class=\"language-python\">import numpy as np\nfrom sklearn.decomposition import PCA\n\nrng = np.random.default_rng(42)\nreference_embeddings = rng.normal(size=(200, 384))\nnew_embeddings = rng.normal(size=(5, 384))\n\npca = PCA(n_components=50, svd_solver=\"full\")\nreference_reduced = pca.fit_transform(reference_embeddings)\nnew_reduced = pca.transform(new_embeddings)\nprint(reference_reduced.shape)  # (200, 50)\nprint(new_reduced.shape)  # (5, 50)\nprint(pca.explained_variance_ratio_.sum())</code></pre><p><a href=\"https://scikit-learn.org/stable/modules/generated/sklearn.decomposition.PCA.html\" target=\"_blank\" rel=\"noopener noreferrer\">Reference: PCA</a></p>"
      ]
    ]
  },
  {
    "title": "t-SNE / UMAP - high-dimensional embedding visualization",
    "questions": [
      [
        "Why use t-SNE or UMAP to visualize high-dimensional embeddings?",
        "<p>An embedding may contain hundreds of coordinates, which cannot be plotted directly. t-SNE and UMAP create two- or three-dimensional maps to inspect neighborhood patterns. These maps are visual summaries, not lossless copies of the original geometry.</p><p>t-SNE creates a low-dimensional map by matching neighborhood affinities between the original space and the map. It is mainly used for two- or three-dimensional visualization.</p><p>A point can represent a document, sentence, or image embedding. Nearby points may reveal local similarity; the map does not faithfully preserve all pairwise distances.</p>"
      ],
      [
        "What does UMAP do differently from PCA?",
        "<p>UMAP builds a neighborhood-based representation and optimizes a lower-dimensional layout. It can capture nonlinear relationships that a linear PCA projection cannot.</p><p>PCA seeks high-variance linear directions; UMAP seeks a neighborhood structure. A visually clearer UMAP plot does not prove that the underlying embeddings are better.</p>"
      ],
      [
        "What does t-SNE perplexity control?",
        "<p>Perplexity controls the effective neighborhood scale. Smaller values focus on finer local relationships; larger values consider broader neighborhoods.</p><p>It must be smaller than the number of samples. Compare several plausible values and seeds rather than treating a single layout as definitive.</p>"
      ],
      [
        "What do UMAP n_neighbors, min_dist, and metric control?",
        "<ul><li><strong>n_neighbors:</strong> trades fine local detail against broader neighborhood structure.</li><li><strong>min_dist:</strong> controls how tightly the low-dimensional layout packs points; smaller values encourage tighter groups.</li><li><strong>metric:</strong> defines similarity in the input space. Cosine distance is often relevant for semantic embeddings, depending on how they were trained.</li></ul><p>Changing these settings can change the apparent grouping.</p><p><a href=\"https://umap-learn.readthedocs.io/en/latest/parameters.html\" target=\"_blank\" rel=\"noopener noreferrer\">Reference: UMAP parameters</a></p>"
      ],
      [
        "Should I use PCA, t-SNE, or UMAP for new incoming embeddings?",
        "<p><strong>PCA:</strong> has a fixed fitted linear projection and supports transforming new vectors.</p><p><strong>UMAP:</strong> the standard umap-learn implementation can transform new vectors using a fitted model.</p><p><strong>t-SNE:</strong> scikit-learn TSNE has no transform method for new samples. Refitting with new data can move existing points, making maps difficult to compare directly.</p>"
      ],
      [
        "Can I treat separated islands in a 2D plot as proven clusters?",
        "<p>No. Projection settings can create, separate, or compress visible groups. Island sizes and distances between islands need not match those in the original embedding space.</p><p>Check original-space neighbors, inspect examples, and compare parameter settings. If you need cluster assignments, evaluate clustering in an appropriate representation; a pretty scatter plot is not validation.</p><p><a href=\"https://scikit-learn.org/stable/modules/manifold.html#t-sne\" target=\"_blank\" rel=\"noopener noreferrer\">Reference: t-SNE</a></p>"
      ],
      [
        "How do I plot the same high-dimensional vectors with t-SNE and UMAP?",
        "<p>This runnable demo uses synthetic 64-dimensional groups. Replace X with your embedding matrix; labels here are used only to color the plot. Requires scikit-learn, matplotlib, and umap-learn.</p><pre><code class=\"language-python\">import matplotlib.pyplot as plt\nimport umap\nfrom sklearn.datasets import make_blobs\nfrom sklearn.decomposition import PCA\nfrom sklearn.manifold import TSNE\n\nX, labels = make_blobs(\n    n_samples=200, n_features=64, centers=4, random_state=42)\nX_small = PCA(n_components=30).fit_transform(X)\n\nlayouts = {\n    \"t-SNE\": TSNE(\n        n_components=2, perplexity=30, init=\"pca\",\n        learning_rate=\"auto\", random_state=42\n    ).fit_transform(X_small),\n    \"UMAP\": umap.UMAP(\n        n_components=2, n_neighbors=15, min_dist=0.1,\n        metric=\"euclidean\", random_state=42\n    ).fit_transform(X_small),\n}\nfig, axes = plt.subplots(1, 2, figsize=(10, 4))\nfor ax, (name, coordinates) in zip(axes, layouts.items()):\n    ax.scatter(coordinates[:, 0], coordinates[:, 1],\n               c=labels, s=14, cmap=\"tab10\")\n    ax.set_title(name)\nplt.tight_layout()\nplt.show()</code></pre>"
      ]
    ]
  }
];

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
  heading.innerHTML = `<span class="topic-number">0${index + 1}</span>${topic.title}`;
  section.setAttribute('aria-labelledby', heading.id);
  section.append(heading);
  for (const [question, answer] of topic.questions) {
    const detail = document.createElement('details');
    number++;
    detail.innerHTML = `<summary><span class="q-number">${String(number).padStart(2, '0')}</span><span>${question}</span></summary><div class="answer">${answer}</div>`;
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

// Deferred KaTeX scripts execute before this file, after the HTML is parsed.
if (typeof renderMathInElement === 'function') {
  renderMathInElement(document.querySelector('main'), {
    delimiters: [
      { left: '\\[', right: '\\]', display: true },
      { left: '\\(', right: '\\)', display: false }
    ],
    throwOnError: false
  });
} else {
  document.querySelector('#math-status').hidden = false;
}
