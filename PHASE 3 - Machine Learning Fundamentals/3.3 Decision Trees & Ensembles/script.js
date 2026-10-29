const topics = [
  {
    "title": "Decision trees - splitting criteria (Gini and entropy)",
    "questions": [
      [
        "What is a decision tree?",
        "<p>A decision tree predicts by following feature-based rules from a root node to a leaf.</p><ul><li><strong>Nodes:</strong> Each internal node tests a feature condition.</li><li><strong>Branches:</strong> Each branch represents an outcome of that test.</li><li><strong>Leaves:</strong> A leaf gives a class prediction or a numerical estimate.</li></ul><p class=\"example\"><strong>Example:</strong> A loan-risk tree checks income and debt before predicting default risk.</p><p><strong>Remember:</strong> Ask feature questions until reaching a prediction.</p>"
      ],
      [
        "What is Gini impurity?",
        "<p>Gini impurity measures how mixed the classes are in a tree node.</p><ul><li><strong>Pure node:</strong> A node containing one class has impurity zero.</li><li><strong>Mixed node:</strong> More evenly distributed classes give higher impurity.</li><li><strong>Splitting:</strong> Prefer splits with larger reductions in weighted impurity.</li></ul><div class=\"formula\">\\[G=1-\\sum_{k=1}^{K}p_k^2\\]</div><p class=\"example\">For a binary node split evenly between classes, \\(G=1-0.5^2-0.5^2=0.5\\).</p><p><strong>Symbols:</strong> p_k is the fraction of samples at the node belonging to class k; K is the number of classes.</p><p><strong>Remember:</strong> Low Gini means a purer node.</p>"
      ],
      [
        "What is entropy in a decision tree?",
        "<p>Entropy measures uncertainty in a node's class distribution.</p><ul><li><strong>Pure node:</strong> One class gives entropy zero.</li><li><strong>Balanced binary node:</strong> Two equally likely classes give one bit with base-two logarithms.</li><li><strong>Zero probability:</strong> A class with probability zero contributes zero to the sum.</li></ul><div class=\"formula\">\\[H=-\\sum_{k=1}^{K}p_k\\log_2(p_k)\\]</div><p class=\"example\">For two equally likely classes, \\(H=-0.5\\log_2(0.5)-0.5\\log_2(0.5)=1\\) bit.</p><p><strong>Symbols:</strong> p_k is the fraction of samples belonging to class k; the base-two logarithm gives entropy in bits.</p><p><strong>Remember:</strong> Low entropy means less class uncertainty.</p>"
      ],
      [
        "How do Gini impurity and entropy differ?",
        "<p>Gini and entropy both measure class mixture but use different mathematical scales.</p><ul><li><strong>Gini:</strong> Uses squared class proportions.</li><li><strong>Entropy:</strong> Uses logarithms; base-two entropy is measured in bits.</li><li><strong>Comparison:</strong> Both favor purer children; neither always produces a better tree.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Concept</th><th scope=\"col\">Explanation</th></tr></thead><tbody><tr><th scope=\"row\">Gini</th><td>Uses squared class proportions.</td></tr><tr><th scope=\"row\">Entropy</th><td>Uses logarithms; base-two entropy is measured in bits.</td></tr><tr><th scope=\"row\">Comparison</th><td>Both favor purer children; neither always produces a better tree.</td></tr></tbody></table></div><p><strong>Remember:</strong> Different impurity formulas, same aim: purer nodes.</p>"
      ],
      [
        "How does a tree choose a split using Gini or entropy?",
        "<p>A classification tree chooses a split that reduces weighted child-node impurity.</p><ol><li><strong>Evaluate:</strong> Compare candidate feature thresholds.</li><li><strong>Weight:</strong> Multiply each child's impurity by its fraction of samples.</li><li><strong>Select:</strong> Choose the largest permitted impurity reduction; with entropy this is information gain.</li></ol><div class=\"formula\">\\[\\Delta I=I_{\\mathrm{parent}}-\\left(\\frac{n_L}{n}I_L+\\frac{n_R}{n}I_R\\right)\\]</div><p class=\"example\">A parent with Gini 0.5 split into two pure children has a Gini reduction of 0.5.</p><p><strong>Symbols:</strong> I denotes impurity; n_L and n_R are child sample counts, and n is their total.</p><p><strong>Remember:</strong> Judge a split by how much cleaner its children become.</p>"
      ],
      [
        "How do I calculate impurity reduction when child nodes have different sizes?",
        "<p>Weight child impurities by sample count before subtracting from the parent impurity.</p><ol><li><strong>Parent:</strong> Ten samples, five per class, give Gini 0.5.</li><li><strong>Children:</strong> Four positives form a pure left node; one positive and five negatives form the right.</li><li><strong>Reduction:</strong> Weighted child impurity is 1/6, giving a Gini reduction of 1/3.</li></ol><div class=\"formula\">\\[G_L=0,\\qquad G_R=1-(1/6)^2-(5/6)^2=5/18\\]\\[G_{\\mathrm{children}}=(4/10)(0)+(6/10)(5/18)=1/6\\]\\[\\Delta G=0.5-1/6=1/3\\]</div><p><strong>Remember:</strong> Larger children must contribute more to weighted impurity.</p>"
      ],
      [
        "How do I train a decision tree with Gini versus entropy in scikit-learn?",
        "<p>Set the decision tree's criterion to compare Gini and entropy on the same data.</p><ol><li><strong>Configure:</strong> Use criterion equal to gini or entropy.</li><li><strong>Fit:</strong> Keep data, depth, and random state consistent across runs.</li><li><strong>Compare:</strong> Check predictions on the same inputs; this toy example is not a general evaluation.</li></ol><pre><code class=\"language-python\">from sklearn.tree import DecisionTreeClassifier\n\nX = [[1], [2], [3], [4]]\ny = [0, 0, 1, 1]\nfor criterion in ['gini', 'entropy']:\n    tree = DecisionTreeClassifier(\n        criterion=criterion, max_depth=1, random_state=42)\n    tree.fit(X, y)\n    print(criterion, tree.predict([[1.5], [3.5]]))\n    # [0 1]</code></pre><p><strong>Remember:</strong> Change the impurity criterion while keeping the experiment comparable.</p>"
      ]
    ]
  },
  {
    "title": "Random forests - bagging of decision trees",
    "questions": [
      [
        "What is a random forest, and why does it use bagging?",
        "<p>A random forest combines diverse decision trees to produce more stable predictions.</p><ul><li><strong>Bagging:</strong> Trees learn from bootstrap samples drawn with replacement.</li><li><strong>Feature sampling:</strong> Candidate features vary across splits, reducing tree correlation.</li><li><strong>Combination:</strong> Averaging or combining class predictions can reduce variance.</li></ul><p><strong>Remember:</strong> Many diverse trees are more stable than one sensitive tree.</p>"
      ],
      [
        "What does sampling with replacement mean in bagging?",
        "<p>Sampling with replacement allows a training row to be drawn more than once.</p><ul><li><strong>Duplicates:</strong> The same row can occur repeatedly in a bootstrap sample.</li><li><strong>Omissions:</strong> Some original rows are not selected for a particular tree.</li><li><strong>Example:</strong> From A, B, C, D, a sample could be A, A, C, D.</li></ul><p><strong>Remember:</strong> Draw a row, put it back, then draw again.</p>"
      ],
      [
        "Why does a random forest also sample features at each split?",
        "<p>Random feature sampling makes trees less dependent on the same dominant features.</p><ul><li><strong>Correlation:</strong> Similar trees tend to make similar errors.</li><li><strong>Diversity:</strong> Different candidate features encourage different splits.</li><li><strong>Variance:</strong> Combining less-correlated trees can give more stable predictions.</li></ul><p><strong>Remember:</strong> A forest benefits from trees that make different mistakes.</p>"
      ],
      [
        "How does a random forest combine tree predictions?",
        "<p>A random forest combines its trees' outputs into one prediction.</p><ul><li><strong>Regression:</strong> Average the numerical predictions.</li><li><strong>Classification:</strong> Combine class votes or probabilities, depending on the implementation.</li><li><strong>Effect:</strong> Aggregation smooths individual-tree fluctuations.</li></ul><div class=\"formula\">\\[\\hat{y}(\\mathbf{x})=\\frac{1}{T}\\sum_{t=1}^{T}h_t(\\mathbf{x})\\]</div><p class=\"example\">If three regression trees predict 100, 110, and 120, the forest predicts 110.</p><p><strong>Remember:</strong> Average numbers; combine class evidence.</p>"
      ],
      [
        "Why can combining many trees reduce variance?",
        "<p>Averaging diverse trees reduces some of the prediction changes caused by training-sample noise.</p><ul><li><strong>Individual trees:</strong> Deep trees can have high variance.</li><li><strong>Averaging:</strong> Some individual fluctuations cancel out.</li><li><strong>Correlation:</strong> Highly correlated errors limit the benefit of adding trees.</li></ul><p><strong>Remember:</strong> Variance reduction needs diversity, not just more copies.</p>"
      ],
      [
        "What are out-of-bag samples in a random forest?",
        "<p>Out-of-bag samples are training rows omitted from a particular tree's bootstrap sample.</p><ul><li><strong>Tree-specific:</strong> A row can be out-of-bag for one tree but included for another.</li><li><strong>Prediction:</strong> Evaluate a row using only trees that did not train on it.</li><li><strong>Caution:</strong> OOB estimates do not fix leakage or replace a suitable final evaluation.</li></ul><p><strong>Remember:</strong> A tree can evaluate rows absent from its own bootstrap sample.</p>"
      ],
      [
        "How do I train a bagged random forest in scikit-learn?",
        "<p>Train a random forest on the training split and evaluate it on held-out examples.</p><ol><li><strong>Split:</strong> Separate training and test data before fitting.</li><li><strong>Fit:</strong> Enable bootstrap sampling and configure the forest.</li><li><strong>Evaluate:</strong> Predict only after fitting; compare predictions with held-out targets.</li></ol><pre><code class=\"language-python\">from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\n\nX, y = load_iris(return_X_y=True)\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, stratify=y, random_state=42)\nforest = RandomForestClassifier(\n    n_estimators=100, max_depth=4, bootstrap=True, random_state=42)\nforest.fit(X_train, y_train)\nprint(forest.score(X_test, y_test))</code></pre><p><strong>Remember:</strong> Bootstrap inside training; evaluate outside training.</p>"
      ]
    ]
  },
  {
    "title": "Gradient boosting - XGBoost and LightGBM",
    "questions": [
      [
        "What is gradient boosting, and how do its trees improve a model?",
        "<p>Gradient boosting builds a model by adding trees that correct the current ensemble.</p><ul><li><strong>Sequence:</strong> Each new tree depends on the current model.</li><li><strong>Direction:</strong> Fit corrections related to the negative gradient of the loss.</li><li><strong>Learning rate:</strong> Scale each correction before adding it.</li></ul><div class=\"formula\">\\[F_m(\\mathbf{x})=F_{m-1}(\\mathbf{x})+\\eta h_m(\\mathbf{x})\\]</div><p><strong>Remember:</strong> Boosting improves the current model one correction at a time.</p>"
      ],
      [
        "How does one boosting step update a prediction?",
        "<p>One boosting step adds a scaled correction to the current prediction.</p><ol><li><strong>Residual:</strong> With target 10 and current prediction 6, the residual is 4.</li><li><strong>Correction:</strong> Suppose a fitted tree predicts a correction of 4.</li><li><strong>Update:</strong> At learning rate 0.25, add 1 to get prediction 7.</li></ol><div class=\"formula\">\\[F_{\\mathrm{new}}=6+0.25(4)=7\\]</div><p><strong>Remember:</strong> Current prediction plus learning rate times correction.</p>"
      ],
      [
        "How does bagging in a random forest differ from gradient boosting?",
        "<p>Random forests combine independently trained trees; boosting adds dependent corrections sequentially.</p><ul><li><strong>Forest:</strong> Bootstrap and feature randomness create diverse trees.</li><li><strong>Boosting:</strong> Later trees improve the current ensemble's loss.</li><li><strong>Tradeoff:</strong> Forests emphasize variance reduction; boosting iteratively improves the objective.</li></ul><div class=\"table-wrap\"><table><thead><tr><th></th><th>Random forest</th><th>Gradient boosting</th></tr></thead><tbody><tr><th>Training</th><td>Trees can be trained independently</td><td>New trees depend on the current ensemble</td></tr><tr><th>Combination</th><td>Average predictions or combine class votes/probabilities</td><td>Add successive corrections</td></tr><tr><th>Main idea</th><td>Reduce variance through diverse trees</td><td>Improve the objective through sequential updates</td></tr></tbody></table></div><p><strong>Remember:</strong> Bagging combines different models; boosting corrects the current model.</p>"
      ],
      [
        "What is XGBoost?",
        "<p>XGBoost is an optimized gradient-boosting library often used with decision trees.</p><ul><li><strong>Updates:</strong> Its tree booster uses gradient and second-order loss information.</li><li><strong>Regularization:</strong> Penalties control tree complexity and leaf weights.</li><li><strong>Evaluation:</strong> Tune it on validation data rather than assuming it is always best.</li></ul><p><strong>Remember:</strong> XGBoost adds efficient, regularized tree corrections.</p><p><a href=\"https://arxiv.org/abs/1603.02754\" target=\"_blank\" rel=\"noopener noreferrer\">Reference: XGBoost paper</a></p>"
      ],
      [
        "What is LightGBM?",
        "<p>LightGBM is a gradient-boosting framework designed for efficient tree training.</p><ul><li><strong>Histograms:</strong> Bin feature values to reduce split-search work and memory.</li><li><strong>Growth:</strong> Leaf-wise growth chooses the leaf with the greatest gain.</li><li><strong>Control:</strong> Limit tree complexity because unrestricted growth can overfit.</li></ul><p><strong>Remember:</strong> LightGBM uses histogram splits and gain-driven leaf growth.</p><p><a href=\"https://lightgbm.readthedocs.io/en/stable/Features.html\" target=\"_blank\" rel=\"noopener noreferrer\">Reference: LightGBM features</a></p>"
      ],
      [
        "How do learning rate and tree count affect gradient boosting?",
        "<p>Learning rate scales each boosting correction; tree count sets how many are added.</p><ul><li><strong>Smaller rate:</strong> Usually needs more trees to make comparable progress.</li><li><strong>Too few trees:</strong> The ensemble may underfit.</li><li><strong>Too much fitting:</strong> Too many corrections can overfit; choose using validation results.</li></ul><p><strong>Remember:</strong> Tune correction size and correction count together.</p>"
      ],
      [
        "What distinguishes XGBoost from LightGBM?",
        "<p>XGBoost and LightGBM are different implementations of gradient boosting.</p><ul><li><strong>XGBoost:</strong> Uses gradient and second-order loss information with tree regularization.</li><li><strong>LightGBM:</strong> Is known for histogram-based split search and leaf-wise growth.</li><li><strong>Choice:</strong> Both have configurable behavior; compare them on the actual task.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Concept</th><th scope=\"col\">Explanation</th></tr></thead><tbody><tr><th scope=\"row\">XGBoost</th><td>Uses gradient and second-order loss information with tree regularization.</td></tr><tr><th scope=\"row\">LightGBM</th><td>Is known for histogram-based split search and leaf-wise growth.</td></tr><tr><th scope=\"row\">Choice</th><td>Both have configurable behavior; compare them on the actual task.</td></tr></tbody></table></div><p><strong>Remember:</strong> Implementation choices matter, but validation decides the winner.</p>"
      ],
      [
        "How do I train XGBoost and LightGBM classifiers on the same data?",
        "<p>Compare XGBoost and LightGBM by training both on the same training split.</p><ol><li><strong>Prepare:</strong> Use the same features, targets, and held-out split.</li><li><strong>Train:</strong> Fit each classifier with its own configuration.</li><li><strong>Evaluate:</strong> Use the same metric; a basic example is not a complete tuning experiment.</li></ol><pre><code class=\"language-python\">from sklearn.datasets import load_breast_cancer\nfrom sklearn.model_selection import train_test_split\nfrom xgboost import XGBClassifier\nfrom lightgbm import LGBMClassifier\n\nX, y = load_breast_cancer(return_X_y=True)\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, stratify=y, random_state=42)\nmodels = [\n    XGBClassifier(n_estimators=50, max_depth=3,\n                  learning_rate=0.05, random_state=42, n_jobs=1),\n    LGBMClassifier(n_estimators=50, num_leaves=7,\n                   learning_rate=0.05, random_state=42,\n                   n_jobs=1, verbosity=-1)\n]\nfor model in models:\n    model.fit(X_train, y_train)\n    print(type(model).__name__, model.score(X_test, y_test))</code></pre><p><strong>Remember:</strong> Compare libraries under the same evaluation conditions.</p>"
      ]
    ]
  },
  {
    "title": "Feature importance",
    "questions": [
      [
        "What is feature importance in tree models?",
        "<p>Feature importance summarizes how strongly a fitted model relies on each input under a chosen measure.</p><ul><li><strong>Measure:</strong> Impurity, gain, split count, and permutation importance answer different questions.</li><li><strong>Scope:</strong> Importance describes a fitted model and dataset.</li><li><strong>Causation:</strong> An important feature is not automatically a cause of the target.</li></ul><p><strong>Remember:</strong> Always ask how importance was measured.</p>"
      ],
      [
        "How do impurity, gain, and split-count importance differ?",
        "<p>Impurity, gain, and split count assign importance using different tree statistics.</p><ul><li><strong>Impurity:</strong> Sum sample-weighted impurity reductions for a feature.</li><li><strong>Gain:</strong> Aggregate improvement in the boosting objective from feature splits.</li><li><strong>Split count:</strong> Count how often a feature is used, regardless of improvement size.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Concept / approach</th><th scope=\"col\">Explanation</th></tr></thead><tbody><tr><th scope=\"row\">Impurity importance</th><td>sums sample-weighted impurity reductions attributed to each feature in a tree or forest.</td></tr><tr><th scope=\"row\">Gain importance</th><td>reports improvement in the boosting objective from splits using a feature. A library may report average gain or total gain; check the selected importance type.</td></tr><tr><th scope=\"row\">Split count</th><td>counts feature usage, regardless of how useful each split was. Frequent splitting and large improvements are different measures.</td></tr></tbody></table></div><p><strong>Remember:</strong> Reduction, improvement, and frequency are different measurements.</p>"
      ],
      [
        "How is permutation importance calculated?",
        "<p>Permutation importance measures the score change when one feature is shuffled.</p><ol><li><strong>Baseline:</strong> Score the fitted model on suitable held-out data.</li><li><strong>Shuffle:</strong> Randomly reorder one feature and score again.</li><li><strong>Repeat:</strong> Repeat shuffling to estimate the typical score drop and variability.</li></ol><div class=\"formula\">\\[I_j=s_{\\mathrm{baseline}}-\\frac{1}{R}\\sum_{r=1}^{R}s_{j,r}^{\\mathrm{shuffled}}\\]</div><p><strong>Remember:</strong> Break one feature's information and measure the damage.</p><p><a href=\"https://scikit-learn.org/stable/modules/permutation_importance.html\" target=\"_blank\" rel=\"noopener noreferrer\">Reference: permutation importance</a></p>"
      ],
      [
        "What is the importance if accuracy drops from 0.90 to 0.80 after shuffling?",
        "<p>If accuracy falls from 0.90 to 0.80 after shuffling, permutation importance is 0.10.</p><ul><li><strong>Calculation:</strong> Subtract the shuffled accuracy from the baseline accuracy.</li><li><strong>Units:</strong> A difference of 0.10 is ten percentage points.</li><li><strong>Comparison:</strong> A drop from 0.90 to 0.89 is one percentage point.</li></ul><div class=\"formula\">\\[I=0.90-0.80=0.10\\]</div><p><strong>Remember:</strong> Importance is the score drop, not the shuffled score.</p>"
      ],
      [
        "Why can feature-importance rankings be misleading?",
        "<p>Feature-importance rankings can be distorted by feature properties and dependencies.</p><ul><li><strong>Split bias:</strong> Impurity importance can favor features with many possible splits.</li><li><strong>Correlation:</strong> Related features can share or hide each other's importance.</li><li><strong>Interpretation:</strong> Results depend on the model, data, and metric and do not prove causation.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Concept / approach</th><th scope=\"col\">Explanation</th></tr></thead><tbody><tr><th scope=\"row\">Many possible splits</th><td>training-based impurity importance can favor features with many distinct values.</td></tr><tr><th scope=\"row\">Correlated features</th><td>one feature can substitute for another, reducing its measured permutation importance.</td></tr><tr><th scope=\"row\">Unrealistic shuffled rows</th><td>permutation can break relationships between features. Interpret rankings alongside model performance; importance is model reliance, not proof that changing an input causes an outcome.</td></tr></tbody></table></div><p><strong>Remember:</strong> Treat importance as model evidence, not a causal verdict.</p>"
      ],
      [
        "How do I calculate held-out permutation importance for a random forest?",
        "<p>Compute permutation importance on held-out examples after fitting the random forest.</p><ol><li><strong>Train:</strong> Fit the model using training data only.</li><li><strong>Measure:</strong> Shuffle features on held-out data with repeated evaluations.</li><li><strong>Protect:</strong> If importance guides feature selection, keep another untouched final evaluation set.</li></ol><pre><code class=\"language-python\">from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.inspection import permutation_importance\n\ndata = load_iris()\nX_train, X_eval, y_train, y_eval = train_test_split(\n    data.data, data.target, test_size=0.3,\n    stratify=data.target, random_state=42)\nmodel = RandomForestClassifier(n_estimators=100, random_state=42)\nmodel.fit(X_train, y_train)\nresult = permutation_importance(\n    model, X_eval, y_eval, scoring='accuracy',\n    n_repeats=10, random_state=42)\nfor name, mean, std in zip(data.feature_names,\n        result.importances_mean, result.importances_std):\n    print(name, round(mean, 3), round(std, 3))</code></pre><p><strong>Remember:</strong> Measure importance outside fitting and keep final evaluation independent.</p>"
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
