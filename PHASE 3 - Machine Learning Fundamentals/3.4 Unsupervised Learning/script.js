const topics = [
  {
    "title": "K-Means clustering",
    "questions": [
      [
        "What is K-Means clustering, and what does it optimize?",
        "<p>K-Means partitions unlabeled data into K groups around mean-based centroids.</p><ul><li><strong>Assignment:</strong> Put each point in the cluster with the nearest centroid.</li><li><strong>Objective:</strong> Minimize the within-cluster sum of squared Euclidean distances.</li><li><strong>Labels:</strong> Cluster numbers identify groups; they are not known target classes.</li></ul><div class=\"formula\">\\[J=\\sum_{i=1}^{n}\\lVert x_i-\\mu_{c_i}\\rVert^2\\]</div><p><strong>Symbols:</strong> x_i is a data point, c_i is its assigned cluster, and mu is that cluster's mean centroid.</p><p><strong>Remember:</strong> K-Means groups points by distance to K means.</p>"
      ],
      [
        "How do the assignment and centroid-update steps work?",
        "<p>K-Means alternates between assigning points and recomputing cluster means.</p><ol><li><strong>Initialize:</strong> Choose K starting centroids, often with K-Means++.</li><li><strong>Assign and update:</strong> Assign points to their nearest centroids, then recompute each mean.</li><li><strong>Repeat:</strong> Stop when assignments stabilize or a limit is reached; multiple starts can improve the solution.</li></ol><p><strong>Remember:</strong> Assign, average, repeat; the solution can depend on initialization.</p>"
      ],
      [
        "Can you calculate one K-Means update?",
        "<p>For points 1, 2, 8, and 9, centroids 1 and 8 update to 1.5 and 8.5.</p><ol><li><strong>Assign:</strong> The initial groups are [1, 2] and [8, 9].</li><li><strong>Average:</strong> Their means are 1.5 and 8.5.</li><li><strong>Check:</strong> Assignments stay unchanged in the next round; total squared distance is 1.</li></ol><div class=\"formula\">\\[\\mu_1=(1+2)/2=1.5,\\qquad\\mu_2=(8+9)/2=8.5\\]</div><p><strong>Remember:</strong> New centroids are the means of their assigned points.</p>"
      ],
      [
        "How do I choose K?",
        "<p>Choose K using cluster quality, stability, and usefulness rather than inertia alone.</p><ul><li><strong>Elbow:</strong> Look for diminishing improvement as K increases.</li><li><strong>Silhouette:</strong> Compare within-cluster cohesion with separation.</li><li><strong>Validation:</strong> Inspect examples and stability; a good score does not guarantee meaningful groups.</li></ul><p><strong>Remember:</strong> A useful cluster count needs evidence beyond a pretty elbow.</p>"
      ],
      [
        "Why do feature scale and distance matter for K-Means?",
        "<p>Feature scaling matters because K-Means uses squared Euclidean distances.</p><ul><li><strong>Magnitude:</strong> Large-scale features can dominate distance calculations.</li><li><strong>Preprocessing:</strong> Scale features when comparable units are appropriate.</li><li><strong>Embeddings:</strong> Match preprocessing to the intended similarity; ordinary K-Means is not automatically cosine clustering.</li></ul><p><strong>Remember:</strong> Distance only makes sense after checking feature scales.</p>"
      ],
      [
        "When does K-Means struggle?",
        "<p>K-Means struggles when clusters do not match compact groups around mean centroids.</p><ul><li><strong>Shape:</strong> Curved or strongly unequal groups can be split incorrectly.</li><li><strong>Outliers:</strong> Extreme values can shift mean centroids.</li><li><strong>Noise:</strong> Every point receives a cluster; there is no built-in noise label.</li></ul><p><strong>Remember:</strong> K-Means expects centroid-friendly groups and assigns every point.</p>"
      ],
      [
        "How do I fit K-Means and inspect its centroids in Python?",
        "<p>Fit K-Means to unlabeled features, then inspect cluster assignments and centroids.</p><ol><li><strong>Configure:</strong> Choose K, multiple initializations, and a reproducible random seed.</li><li><strong>Fit:</strong> Use fit_predict to obtain cluster IDs.</li><li><strong>Inspect:</strong> Check cluster_centers_ and inertia_; cluster ID order can swap.</li></ol><pre><code class=\"language-python\">import numpy as np\nfrom sklearn.cluster import KMeans\n\nX = np.array([[1.], [2.], [8.], [9.]])\nmodel = KMeans(n_clusters=2, n_init=10, random_state=42)\nlabels = model.fit_predict(X)\nprint(labels)  # Cluster IDs may be swapped\nprint(np.sort(model.cluster_centers_.ravel()))  # [1.5, 8.5]\nprint(model.inertia_)  # 1.0</code></pre><p><strong>Remember:</strong> Cluster IDs name groups; centroids describe their centers.</p><p><a href=\"https://scikit-learn.org/stable/modules/generated/sklearn.cluster.KMeans.html\" target=\"_blank\" rel=\"noopener noreferrer\">Reference: KMeans</a></p>"
      ]
    ]
  },
  {
    "title": "DBSCAN",
    "questions": [
      [
        "What is DBSCAN, and how does it discover clusters?",
        "<p>DBSCAN forms clusters from connected dense regions and can label isolated points as noise.</p><ul><li><strong>Neighborhood:</strong> Define nearby points using a radius and distance metric.</li><li><strong>Density:</strong> A minimum neighbor count identifies core points.</li><li><strong>Clusters:</strong> Connected core regions determine the number of groups without choosing K.</li></ul><p><strong>Remember:</strong> DBSCAN finds dense regions and leaves sparse points as noise.</p>"
      ],
      [
        "What do eps and min_samples mean?",
        "<p>DBSCAN uses eps for neighborhood radius and min_samples for the core-point density threshold.</p><ul><li><strong>eps:</strong> Defines how close points must be to count as neighbors.</li><li><strong>min_samples:</strong> Counts required nearby points, including the point itself in scikit-learn.</li><li><strong>Extent:</strong> The radius is not a maximum cluster diameter; connected neighborhoods can extend farther.</li></ul><p><strong>Remember:</strong> eps sets closeness; min_samples sets density.</p>"
      ],
      [
        "What is the difference between core, border, and noise points?",
        "<p>DBSCAN distinguishes core points, border points, and noise by neighborhood density.</p><ul><li><strong>Core:</strong> Has at least min_samples points, including itself, within eps.</li><li><strong>Border:</strong> Is not core but lies within eps of a core point.</li><li><strong>Noise:</strong> Belongs to no cluster; scikit-learn uses label -1.</li></ul><p><strong>Remember:</strong> Core points grow clusters; border points join; noise stays out.</p>"
      ],
      [
        "Can you work through a DBSCAN neighborhood example?",
        "<p>With points 0, 0.1, 0.2, and 3, only 0.1 is core when eps is 0.15 and min_samples is 3.</p><ol><li><strong>Count:</strong> The neighborhood of 0.1 contains 0, 0.1, and 0.2.</li><li><strong>Join:</strong> Points 0 and 0.2 are border points in the same cluster.</li><li><strong>Noise:</strong> Point 3 has no qualifying dense connection and is labeled -1.</li></ol><p><strong>Remember:</strong> Count the point itself, then distinguish core from border.</p>"
      ],
      [
        "What happens if eps is too small or too large?",
        "<p>A small eps can fragment clusters; a large eps can merge distinct groups.</p><ul><li><strong>Too small:</strong> Many points fail the density threshold and become noise.</li><li><strong>Too large:</strong> Neighborhoods can connect groups that should remain separate.</li><li><strong>Selection:</strong> Choose eps together with scaling, distance metric, and min_samples.</li></ul><p><strong>Remember:</strong> Small radius fragments; large radius merges.</p>"
      ],
      [
        "How do scaling and high-dimensional embeddings affect DBSCAN?",
        "<p>Scaling and high dimensionality change which points DBSCAN considers neighbors.</p><ul><li><strong>Scaling:</strong> eps must match feature units and preprocessing.</li><li><strong>Dimensions:</strong> Distances can become less discriminative in high dimensions.</li><li><strong>Embeddings:</strong> Choose an appropriate representation and metric, then validate neighborhoods.</li></ul><p><strong>Remember:</strong> A radius is meaningful only relative to the feature space.</p>"
      ],
      [
        "How do I identify DBSCAN clusters and noise in Python?",
        "<p>Use DBSCAN's fitted labels and core-point indices to inspect clusters and noise.</p><ol><li><strong>Fit:</strong> Run fit_predict with chosen eps and min_samples.</li><li><strong>Inspect:</strong> core_sample_indices_ identifies core points.</li><li><strong>Noise:</strong> Rows with label -1 are unassigned noise points.</li></ol><pre><code class=\"language-python\">import numpy as np\nfrom sklearn.cluster import DBSCAN\n\nX = np.array([[0.], [0.1], [0.2], [3.]])\nmodel = DBSCAN(eps=0.15, min_samples=3)\nlabels = model.fit_predict(X)\nprint(labels)  # [0, 0, 0, -1]\nprint(model.core_sample_indices_)  # [1]\nprint(X[labels == -1])  # [[3.]]</code></pre><p><strong>Remember:</strong> Cluster labels show membership; core indices show density anchors.</p><p><a href=\"https://scikit-learn.org/stable/modules/generated/sklearn.cluster.DBSCAN.html\" target=\"_blank\" rel=\"noopener noreferrer\">Reference: DBSCAN</a></p>"
      ]
    ]
  },
  {
    "title": "PCA - dimensionality reduction and embeddings",
    "questions": [
      [
        "What is PCA, and how does it reduce dimensions?",
        "<p>PCA reduces dimensions by projecting data onto directions of maximum variance.</p><ul><li><strong>Components:</strong> New coordinates are linear combinations of original features.</li><li><strong>Order:</strong> The first component captures the most variance; later ones capture remaining orthogonal variation.</li><li><strong>Compression:</strong> Keeping fewer components discards variation outside their subspace.</li></ul><p><strong>Remember:</strong> PCA keeps high-variance directions, not necessarily task-relevant ones.</p>"
      ],
      [
        "How is a point projected onto principal components?",
        "<p>Project a point in PCA by centering it and applying the fitted component directions.</p><ol><li><strong>Center:</strong> Subtract the mean learned during fitting.</li><li><strong>Project:</strong> Take dot products with the retained principal-component directions.</li><li><strong>Reuse:</strong> Transform new data with the same fitted mean and components.</li></ol><div class=\"formula\">\\[Z=(X-\\mathbf{1}\\mu^{\\mathsf T})W_k\\]</div><p><strong>Symbols:</strong> Subtract the fitted mean from each input; multiply by the transpose of the matrix whose columns are retained component directions.</p><p><strong>Remember:</strong> Subtract the training mean, then project.</p>"
      ],
      [
        "Can you show a simple PCA projection?",
        "<p>For points on the line x equals y, PCA can represent their variation with one diagonal component.</p><ol><li><strong>Center:</strong> Points (1,1), (2,2), and (3,3) have mean (2,2).</li><li><strong>Direction:</strong> Use the unit direction (1,1) divided by square root of two.</li><li><strong>Projection:</strong> The coordinates are negative square root of two, zero, and positive square root of two.</li></ol><div class=\"formula\">\\[-\\sqrt{2},\\quad0,\\quad\\sqrt{2}\\]</div><p><strong>Remember:</strong> Data on a straight line can have two features but one varying dimension.</p>"
      ],
      [
        "How do I choose the number of PCA components?",
        "<p>Choose PCA component count using retained variance and downstream performance.</p><ul><li><strong>Variance:</strong> Inspect the cumulative explained-variance ratio.</li><li><strong>Budget:</strong> Balance storage and computation against information loss.</li><li><strong>Task:</strong> Validate performance; preserving variance does not guarantee preserving useful signal.</li></ul><div class=\"formula\">\\[r_k=\\frac{\\sum_{j=1}^{k}\\lambda_j}{\\sum_{j=1}^{d}\\lambda_j}\\]</div><p><strong>Symbols:</strong> Lambda values are component variances in descending order; r_k is the fraction of total variance retained by the first k components.</p><p><strong>Remember:</strong> Keep enough components for the task, not just a variance target.</p>"
      ],
      [
        "Should I standardize features before PCA?",
        "<p>PCA centers features, but scaling to unit variance is a separate decision.</p><ul><li><strong>Different units:</strong> Standardization can prevent large-scale features from dominating.</li><li><strong>Meaningful scales:</strong> Preserve them when their magnitudes carry useful information.</li><li><strong>Embeddings:</strong> Do not assume per-coordinate standardization is always appropriate.</li></ul><p><strong>Remember:</strong> Centering is built into PCA; scaling requires judgment.</p>"
      ],
      [
        "How does PCA compress embeddings, and what can be lost?",
        "<p>PCA compresses embeddings by retaining only selected linear directions.</p><ul><li><strong>Benefit:</strong> Fewer coordinates can reduce storage and distance-computation cost.</li><li><strong>Loss:</strong> Information outside the retained subspace is discarded.</li><li><strong>Evaluation:</strong> Check retrieval or downstream performance after compression.</li></ul><p><strong>Remember:</strong> Less storage can mean lost signal; measure the tradeoff.</p>"
      ],
      [
        "How do I fit PCA and reuse the projection for new embeddings?",
        "<p>Fit PCA once and reuse its learned projection for incoming embeddings.</p><ol><li><strong>Fit:</strong> Learn the mean and component directions on suitable training data.</li><li><strong>Transform:</strong> Apply the same fitted model to new vectors.</li><li><strong>Check:</strong> Compare input and output shapes; the demo uses random vectors, not semantic embeddings.</li></ol><pre><code class=\"language-python\">import numpy as np\nfrom sklearn.decomposition import PCA\n\nrng = np.random.default_rng(42)\nreference_embeddings = rng.normal(size=(200, 384))\nnew_embeddings = rng.normal(size=(5, 384))\n\npca = PCA(n_components=50, svd_solver=\"full\")\nreference_reduced = pca.fit_transform(reference_embeddings)\nnew_reduced = pca.transform(new_embeddings)\nprint(reference_reduced.shape)  # (200, 50)\nprint(new_reduced.shape)  # (5, 50)\nprint(pca.explained_variance_ratio_.sum())</code></pre><p><strong>Remember:</strong> Fit once; reuse the same coordinate system.</p><p><a href=\"https://scikit-learn.org/stable/modules/generated/sklearn.decomposition.PCA.html\" target=\"_blank\" rel=\"noopener noreferrer\">Reference: PCA</a></p>"
      ]
    ]
  },
  {
    "title": "t-SNE / UMAP - high-dimensional embedding visualization",
    "questions": [
      [
        "Why use t-SNE or UMAP to visualize high-dimensional embeddings?",
        "<p>t-SNE and UMAP create low-dimensional views for inspecting high-dimensional neighborhood patterns.</p><ul><li><strong>Purpose:</strong> Turn many coordinates into a two- or three-dimensional visualization.</li><li><strong>Limitation:</strong> A projection cannot preserve every original-space relationship.</li><li><strong>Validation:</strong> Inspect original examples and neighbors before interpreting visible groups.</li></ul><p><strong>Remember:</strong> A visualization summarizes geometry; it does not prove clusters.</p>"
      ],
      [
        "What does UMAP do differently from PCA?",
        "<p>UMAP models neighborhood relationships nonlinearly, while PCA uses a linear projection.</p><ul><li><strong>PCA:</strong> Retains high-variance linear directions.</li><li><strong>UMAP:</strong> Optimizes a lower-dimensional layout based on neighborhood structure.</li><li><strong>Interpretation:</strong> UMAP can reveal nonlinear structure but depends on settings and randomness.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Concept</th><th scope=\"col\">Explanation</th></tr></thead><tbody><tr><th scope=\"row\">PCA</th><td>Retains high-variance linear directions.</td></tr><tr><th scope=\"row\">UMAP</th><td>Optimizes a lower-dimensional layout based on neighborhood structure.</td></tr><tr><th scope=\"row\">Interpretation</th><td>UMAP can reveal nonlinear structure but depends on settings and randomness.</td></tr></tbody></table></div><p><strong>Remember:</strong> PCA projects linearly; UMAP organizes neighborhoods.</p>"
      ],
      [
        "What does t-SNE perplexity control?",
        "<p>t-SNE perplexity controls the effective neighborhood scale used in the visualization.</p><ul><li><strong>Smaller values:</strong> Emphasize finer local relationships.</li><li><strong>Larger values:</strong> Consider broader neighborhoods; perplexity must remain below sample count.</li><li><strong>Comparison:</strong> Try multiple valid settings and seeds before trusting a pattern.</li></ul><p><strong>Remember:</strong> Perplexity changes the neighborhood view, not the true number of clusters.</p>"
      ],
      [
        "What do UMAP n_neighbors, min_dist, and metric control?",
        "<p>UMAP's n_neighbors, min_dist, and metric control neighborhoods, packing, and input similarity.</p><ul><li><strong>n_neighbors:</strong> Balances finer local detail against broader neighborhood structure.</li><li><strong>min_dist:</strong> Controls how tightly points can pack in the low-dimensional layout.</li><li><strong>metric:</strong> Defines input-space similarity; choose one suited to the embeddings.</li></ul><p><strong>Remember:</strong> Neighbors choose context; minimum distance affects packing; metric defines closeness.</p><p><a href=\"https://umap-learn.readthedocs.io/en/latest/parameters.html\" target=\"_blank\" rel=\"noopener noreferrer\">Reference: UMAP parameters</a></p>"
      ],
      [
        "Should I use PCA, t-SNE, or UMAP for new incoming embeddings?",
        "<p>For new vectors, use a fitted method that supports transforming unseen data.</p><ul><li><strong>PCA:</strong> Applies a fixed fitted linear projection.</li><li><strong>UMAP:</strong> The standard implementation supports transforming new vectors.</li><li><strong>t-SNE:</strong> scikit-learn TSNE has no transform method; refitting can move existing points.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Concept / approach</th><th scope=\"col\">Explanation</th></tr></thead><tbody><tr><th scope=\"row\">PCA</th><td>has a fixed fitted linear projection and supports transforming new vectors.</td></tr><tr><th scope=\"row\">UMAP</th><td>the standard umap-learn implementation can transform new vectors using a fitted model.</td></tr><tr><th scope=\"row\">t-SNE</th><td>scikit-learn TSNE has <strong>no transform method</strong> for new samples. Refitting with new data can move existing points, making maps difficult to compare directly.</td></tr></tbody></table></div><p><strong>Remember:</strong> Stable incoming-data maps need a reusable fitted transformation.</p>"
      ],
      [
        "Can I treat separated islands in a 2D plot as proven clusters?",
        "<p>Separated islands in a two-dimensional projection are not proof of real clusters.</p><ul><li><strong>Distortion:</strong> Projection settings can create, compress, or separate groups.</li><li><strong>Inspection:</strong> Check neighbors and example contents in the original space.</li><li><strong>Evidence:</strong> Evaluate clustering separately if reliable cluster assignments are needed.</li></ul><p><strong>Remember:</strong> Visible separation is a hypothesis to investigate, not a conclusion.</p><p><a href=\"https://scikit-learn.org/stable/modules/manifold.html#t-sne\" target=\"_blank\" rel=\"noopener noreferrer\">Reference: t-SNE</a></p>"
      ],
      [
        "How do I plot the same high-dimensional vectors with t-SNE and UMAP?",
        "<p>Plot the same vectors with t-SNE and UMAP to compare their neighborhood visualizations.</p><ol><li><strong>Prepare:</strong> Use the same input vectors and optional PCA preprocessing.</li><li><strong>Project:</strong> Fit both methods with recorded settings and random seeds.</li><li><strong>Interpret:</strong> Labels color the demonstration only; apparent islands still need validation.</li></ol><pre><code class=\"language-python\">import matplotlib.pyplot as plt\nimport umap\nfrom sklearn.datasets import make_blobs\nfrom sklearn.decomposition import PCA\nfrom sklearn.manifold import TSNE\n\nX, labels = make_blobs(\n    n_samples=200, n_features=64, centers=4, random_state=42)\nX_small = PCA(n_components=30).fit_transform(X)\n\nlayouts = {\n    \"t-SNE\": TSNE(\n        n_components=2, perplexity=30, init=\"pca\",\n        learning_rate=\"auto\", random_state=42\n    ).fit_transform(X_small),\n    \"UMAP\": umap.UMAP(\n        n_components=2, n_neighbors=15, min_dist=0.1,\n        metric=\"euclidean\", random_state=42\n    ).fit_transform(X_small),\n}\nfig, axes = plt.subplots(1, 2, figsize=(10, 4))\nfor ax, (name, coordinates) in zip(axes, layouts.items()):\n    ax.scatter(coordinates[:, 0], coordinates[:, 1],\n               c=labels, s=14, cmap=\"tab10\")\n    ax.set_title(name)\nplt.tight_layout()\nplt.show()</code></pre><p><strong>Remember:</strong> Compare maps, then check the original data.</p>"
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
