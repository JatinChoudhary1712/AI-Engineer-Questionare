const topics = [
  {
    "title": "Decision trees - splitting criteria (Gini and entropy)",
    "questions": [
      [
        "What is a decision tree?",
        "<p>A decision tree predicts by following a sequence of feature-based rules. Each internal node tests a condition, each branch represents an outcome, and each leaf gives a prediction.</p><p class=\"example\">Example: a tree might first ask whether income exceeds a threshold, then check debt to predict loan default.</p><p>Classification leaves estimate class probabilities or predict a class; regression leaves typically predict the mean target of their training examples.</p>"
      ],
      [
        "What is Gini impurity?",
        "<p>Gini impurity measures how mixed the classes are at a node. Lower values mean a purer node.</p><div class=\"formula\">\\[G=1-\\sum_{k=1}^{K}p_k^2\\]</div><p>\\(p_k\\) is the fraction of node examples belonging to class \\(k\\). A pure node has Gini impurity 0.</p><p class=\"example\">For a binary node split evenly between classes, \\(G=1-0.5^2-0.5^2=0.5\\).</p>"
      ],
      [
        "What is entropy in a decision tree?",
        "<p>Entropy measures uncertainty in the class distribution. Lower entropy means greater purity.</p><div class=\"formula\">\\[H=-\\sum_{k=1}^{K}p_k\\log_2(p_k)\\]</div><p>A pure node has entropy 0. A class with probability 0 contributes 0 to the sum.</p><p class=\"example\">For two equally likely classes, \\(H=-0.5\\log_2(0.5)-0.5\\log_2(0.5)=1\\) bit.</p>"
      ],
      [
        "How does a tree choose a split using Gini or entropy?",
        "<p>It compares candidate feature splits and chooses one with the largest reduction in weighted impurity, subject to its stopping rules.</p><div class=\"formula\">\\[\\Delta I=I_{\\mathrm{parent}}-\\left(\\frac{n_L}{n}I_L+\\frac{n_R}{n}I_R\\right)\\]</div><p>\\(I\\) is Gini impurity or entropy; \\(n_L\\) and \\(n_R\\) are child sample counts, and \\(n=n_L+n_R\\). With entropy, this reduction is called <strong>information gain</strong>.</p><p class=\"example\">A parent with Gini 0.5 split into two pure children has a Gini reduction of 0.5.</p><p>Both criteria favor purer children and often produce similar trees. These criteria apply to classification; regression trees commonly use squared-error reduction.</p>"
      ],
      [
        "How do I calculate impurity reduction when child nodes have different sizes?",
        "<p>A parent has 10 samples: 5 positive and 5 negative, so Gini is 0.5. A split gives a pure left child with 4 positives and a right child with 1 positive and 5 negatives.</p><div class=\"formula\">\\[G_L=0,\\qquad G_R=1-(1/6)^2-(5/6)^2=5/18\\]\\[G_{\\mathrm{children}}=(4/10)(0)+(6/10)(5/18)=1/6\\]\\[\\Delta G=0.5-1/6=1/3\\]</div><p>Weight each child's impurity by its share of samples; do not average the two child impurities equally.</p>"
      ],
      [
        "How do Gini impurity and entropy differ?",
        "<p>Both measure how mixed the class labels are and both equal zero at a pure node.</p><p><strong>Gini:</strong> uses squared class proportions. <strong>Entropy:</strong> uses logarithms and measures uncertainty in bits when the log base is 2.</p><p>For a balanced binary node, Gini is 0.5 and entropy is 1 bit. These are different scales, so compare candidate splits using the same criterion. Neither criterion always gives the better tree.</p>"
      ],
      [
        "How do I train a decision tree with Gini versus entropy in scikit-learn?",
        "<p>Python + scikit-learn: ek feature threshold se classes separate hoti hain. Gini ki jagah entropy bhi try karo.</p><pre><code class=\"language-python\">from sklearn.tree import DecisionTreeClassifier\n\nX = [[1], [2], [3], [4]]\ny = [0, 0, 1, 1]\nfor criterion in ['gini', 'entropy']:\n    tree = DecisionTreeClassifier(\n        criterion=criterion, max_depth=1, random_state=42)\n    tree.fit(X, y)\n    print(criterion, tree.predict([[1.5], [3.5]]))\n    # [0 1]</code></pre>"
      ]
    ]
  },
  {
    "title": "Random forests - bagging of decision trees",
    "questions": [
      [
        "What is bagging, and how does a random forest use it?",
        "<p><strong>Bagging</strong> (bootstrap aggregating) trains models on different samples drawn with replacement from the training set, then combines their predictions.</p><p>A standard bagged random forest trains many decision trees this way and also considers a random subset of features at each split. This extra randomness helps make the trees less correlated.</p><p>Combining diverse trees reduces variance compared with a single deep tree.</p>"
      ],
      [
        "What does sampling with replacement mean in bagging?",
        "<p>Draw training rows repeatedly, allowing the same row to appear more than once. For original rows A, B, C, D, one bootstrap sample of size four could be A, A, C, D.</p><p>Train each tree on a different bootstrap sample. A sample can contain repeated rows while leaving other original rows out.</p>"
      ],
      [
        "Why does a random forest also sample features at each split?",
        "<p>If every tree repeatedly chooses the same strong feature, their predictions and mistakes can be highly correlated.</p><p>Considering a random subset of features at each split encourages different trees to use different splits. Bagging randomizes rows; this additional feature sampling helps diversify the trees.</p>"
      ],
      [
        "How does a random forest combine tree predictions?",
        "<p>For regression, average the predictions of all \\(T\\) trees:</p><div class=\"formula\">\\[\\hat{y}(\\mathbf{x})=\\frac{1}{T}\\sum_{t=1}^{T}h_t(\\mathbf{x})\\]</div><p>For classification, implementations may use majority voting or average the trees' class probabilities and choose the class with the highest average probability.</p><p class=\"example\">If three regression trees predict 100, 110, and 120, the forest predicts 110.</p>"
      ],
      [
        "Why can combining many trees reduce variance?",
        "<p>A deep decision tree can change substantially when its training sample changes. Averaging trees smooths out some of those individual fluctuations.</p><p>The benefit depends on diversity: averaging trees that make nearly identical errors gives less improvement. Bootstrap sampling and random feature subsets help reduce that similarity.</p>"
      ],
      [
        "What are out-of-bag samples in a random forest?",
        "<p>For a particular tree, out-of-bag samples are training rows absent from its bootstrap sample.</p><p>For each training row, combine predictions only from trees that did not train on it. These predictions provide an out-of-bag performance estimate without a separate validation split. This requires bootstrap sampling and enough trees to cover the rows.</p>"
      ],
      [
        "How do I train a bagged random forest in scikit-learn?",
        "<p>Python + scikit-learn: held-out split par forest evaluate karo. Trees training mein bootstrap samples use karte hain.</p><pre><code class=\"language-python\">from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\n\nX, y = load_iris(return_X_y=True)\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, stratify=y, random_state=42)\nforest = RandomForestClassifier(\n    n_estimators=100, max_depth=4, bootstrap=True, random_state=42)\nforest.fit(X_train, y_train)\nprint(forest.score(X_test, y_test))</code></pre>"
      ]
    ]
  },
  {
    "title": "Gradient boosting - XGBoost and LightGBM",
    "questions": [
      [
        "How does gradient boosting work?",
        "<p>Gradient boosting builds trees sequentially. Each new tree learns a correction to the current ensemble, guided by the loss function's negative gradients.</p><div class=\"formula\">\\[F_m(\\mathbf{x})=F_{m-1}(\\mathbf{x})+\\eta h_m(\\mathbf{x})\\]</div><p>\\(h_m\\) is the new tree and \\(\\eta\\) is the learning rate. For squared-error regression, fitting negative gradients corresponds to fitting residuals. Other losses use their own gradient-based corrections.</p><p>The model improves by adding small corrections, rather than averaging independently trained trees.</p>"
      ],
      [
        "How does one boosting step update a prediction?",
        "<p>For squared-error regression, suppose the target is 10 and the current prediction is 6. The residual is 4.</p><p>If the next tree predicts a correction of 4 and the learning rate is 0.25:</p><div class=\"formula\">\\[F_{\\mathrm{new}}=6+0.25(4)=7\\]</div><p>The next tree is fitted using the updated ensemble. For other loss functions, corrections follow the loss gradients rather than simply the raw residuals.</p>"
      ],
      [
        "What is XGBoost?",
        "<p><strong>XGBoost</strong> is an efficient gradient-boosting library commonly used with decision trees. Its tree booster uses gradient and second-order loss information to choose updates, along with penalties that control tree complexity and leaf weights.</p><p>It supports classification and regression, and is widely used for structured, tabular prediction tasks such as fraud detection and churn prediction.</p><p><a href=\"https://arxiv.org/abs/1603.02754\" target=\"_blank\" rel=\"noopener noreferrer\">Reference: XGBoost paper</a></p>"
      ],
      [
        "What is LightGBM?",
        "<p><strong>LightGBM</strong> is a gradient-boosting framework designed for efficient training. It uses feature-value histograms to reduce split-search work and memory usage, and grows trees leaf-wise by choosing the leaf with the best gain.</p><p>Leaf-wise growth can create deep branches, so controls such as leaf count, minimum examples per leaf, and maximum depth help limit overfitting. LightGBM is often used for tabular classification and regression.</p><p><a href=\"https://lightgbm.readthedocs.io/en/stable/Features.html\" target=\"_blank\" rel=\"noopener noreferrer\">Reference: LightGBM features</a></p>"
      ],
      [
        "What distinguishes XGBoost from LightGBM?",
        "<p><strong>XGBoost:</strong> its tree booster uses first- and second-order loss information together with regularization on tree complexity and leaf weights.</p><p><strong>LightGBM:</strong> uses histogram-based split search and best-first, leaf-wise growth, which can create deep branches.</p><p>These are not exclusive lists of capabilities: XGBoost also supports histogram-based training. Neither library is always faster or more accurate; compare them on the same data and evaluation setup.</p>"
      ],
      [
        "How does bagging in a random forest differ from gradient boosting?",
        "<div class=\"table-wrap\"><table><thead><tr><th></th><th>Random forest</th><th>Gradient boosting</th></tr></thead><tbody><tr><th>Training</th><td>Trees can be trained independently</td><td>New trees depend on the current ensemble</td></tr><tr><th>Combination</th><td>Average predictions or combine class votes/probabilities</td><td>Add successive corrections</td></tr><tr><th>Main idea</th><td>Reduce variance through diverse trees</td><td>Improve the objective through sequential updates</td></tr></tbody></table></div><p>XGBoost and LightGBM implement gradient boosting. Their performance depends on the data and settings; neither is universally best.</p>"
      ],
      [
        "How do learning rate and tree count affect gradient boosting?",
        "<p>The learning rate scales each new tree contribution; tree count determines how many corrections are added.</p><p>A smaller learning rate often needs more trees. Too few trees can underfit, while too many or overly complex trees can fit noise. Use validation performance and early stopping to choose when to stop adding trees.</p>"
      ],
      [
        "How do I train XGBoost and LightGBM classifiers on the same data?",
        "<p>Python + scikit-learn aur xgboost/lightgbm packages. Dono libraries same train/test split par fit hoti hain; yeh basic comparison hai, tuning experiment nahi.</p><pre><code class=\"language-python\">from sklearn.datasets import load_breast_cancer\nfrom sklearn.model_selection import train_test_split\nfrom xgboost import XGBClassifier\nfrom lightgbm import LGBMClassifier\n\nX, y = load_breast_cancer(return_X_y=True)\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, stratify=y, random_state=42)\nmodels = [\n    XGBClassifier(n_estimators=50, max_depth=3,\n                  learning_rate=0.05, random_state=42, n_jobs=1),\n    LGBMClassifier(n_estimators=50, num_leaves=7,\n                   learning_rate=0.05, random_state=42,\n                   n_jobs=1, verbosity=-1)\n]\nfor model in models:\n    model.fit(X_train, y_train)\n    print(type(model).__name__, model.score(X_test, y_test))</code></pre>"
      ]
    ]
  },
  {
    "title": "Feature importance",
    "questions": [
      [
        "What is feature importance in tree models?",
        "<p>Feature importance summarizes how much each input contributes to a fitted model according to a chosen measure.</p><ul><li><strong>Impurity importance:</strong> accumulate the weighted impurity reductions from splits using each feature, often averaged across forest trees.</li><li><strong>Gain importance:</strong> summarize improvement in the boosting objective from splits using a feature.</li><li><strong>Split count:</strong> count how often a feature is used for splitting.</li></ul><p>The definition matters: these scores measure different things and can give different rankings. A high score describes model use, not a causal effect.</p>"
      ],
      [
        "How do impurity, gain, and split-count importance differ?",
        "<p><strong>Impurity importance:</strong> sums sample-weighted impurity reductions attributed to each feature in a tree or forest.</p><p><strong>Gain importance:</strong> reports improvement in the boosting objective from splits using a feature. A library may report average gain or total gain; check the selected importance type.</p><p><strong>Split count:</strong> counts feature usage, regardless of how useful each split was. Frequent splitting and large improvements are different measures.</p>"
      ],
      [
        "How is permutation importance calculated?",
        "<p>Measure a fitted model's baseline score on held-out data. Shuffle one feature, score again, and repeat the shuffle.</p><div class=\"formula\">\\[I_j=s_{\\mathrm{baseline}}-\\frac{1}{R}\\sum_{r=1}^{R}s_{j,r}^{\\mathrm{shuffled}}\\]</div><p>For a higher-is-better score, a larger drop means greater model reliance on that feature. A negative estimate means the shuffled score was higher.</p><p><a href=\"https://scikit-learn.org/stable/modules/permutation_importance.html\" target=\"_blank\" rel=\"noopener noreferrer\">Reference: permutation importance</a></p>"
      ],
      [
        "What is the importance if accuracy drops from 0.90 to 0.80 after shuffling?",
        "<div class=\"formula\">\\[I=0.90-0.80=0.10\\]</div><p>The drop is 10 percentage points. If shuffling another feature gives accuracy 0.89, its importance is 0.01, or 1 percentage point.</p><p>These values depend on the fitted model, evaluation data, and scoring metric. They do not establish causation.</p>"
      ],
      [
        "Why can feature-importance rankings be misleading?",
        "<p><strong>Many possible splits:</strong> training-based impurity importance can favor features with many distinct values.</p><p><strong>Correlated features:</strong> one feature can substitute for another, reducing its measured permutation importance.</p><p><strong>Unrealistic shuffled rows:</strong> permutation can break relationships between features. Interpret rankings alongside model performance; importance is model reliance, not proof that changing an input causes an outcome.</p>"
      ],
      [
        "How do I calculate held-out permutation importance for a random forest?",
        "<p>Python + scikit-learn: model train data par fit hota hai, importance held-out data par measure hoti hai. Agar results se features select karo, final evaluation ke liye ek aur untouched test set rakho.</p><pre><code class=\"language-python\">from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.inspection import permutation_importance\n\ndata = load_iris()\nX_train, X_eval, y_train, y_eval = train_test_split(\n    data.data, data.target, test_size=0.3,\n    stratify=data.target, random_state=42)\nmodel = RandomForestClassifier(n_estimators=100, random_state=42)\nmodel.fit(X_train, y_train)\nresult = permutation_importance(\n    model, X_eval, y_eval, scoring='accuracy',\n    n_repeats=10, random_state=42)\nfor name, mean, std in zip(data.feature_names,\n        result.importances_mean, result.importances_std):\n    print(name, round(mean, 3), round(std, 3))</code></pre>"
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
