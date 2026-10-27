const topics = [
  {
    "title": "Decision trees & splitting criteria",
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
        "What problem does decision trees solve?",
        "<p>Jab data mein rule-based ya nonlinear patterns hon, ek single straight-line relationship enough nahi hota. Decision tree inputs ko step-by-step groups mein baant kar prediction karta hai.</p>"
      ],
      [
        "How can I understand decision trees intuitively?",
        "<p>Meri soch: twenty questions game jaisa hai. Har sawaal kuch possibilities hata deta hai. Achha sawaal woh hai jo mixed examples ko zyada pure groups mein divide kare.</p>"
      ],
      [
        "What is the formal definition of decision trees?",
        "<p>Decision tree ek supervised model hai jisme internal nodes feature tests, branches unke outcomes, aur leaves predictions represent karte hain. Classification impurity ke common measures:</p><div class=\"formula\">\\[G=1-\\sum_{k=1}^{K}p_k^2\\qquad H=-\\sum_{k=1}^{K}p_k\\log_2p_k\\]</div><p>\\(p_k\\) node mein class \\(k\\) ka proportion hai. Gini aur entropy dono pure node par zero hote hain; entropy mein zero-probability term ka contribution zero maante hain.</p>"
      ],
      [
        "How does decision trees work step by step?",
        "<p>Candidate feature aur threshold try karo. Har split ke baad children ki weighted impurity nikalo. Jo allowed split sabse zyada impurity reduce kare, use choose karo; stopping condition tak repeat karo.</p><div class=\"formula\">\\[\\Delta I=I_{\\mathrm{parent}}-\\frac{n_L}{n}I_L-\\frac{n_R}{n}I_R\\]</div><p>Entropy reduction ko information gain kehte hain. Regression tree usually squared-error reduction use karta hai.</p>"
      ],
      [
        "Can you show a worked example of decision trees?",
        "<p>Parent mein 4 examples: 2 positive, 2 negative. Gini \\(1-0.5^2-0.5^2=0.5\\), entropy 1 bit. Ek split left mein dono positives aur right mein dono negatives rakh deta hai. Dono children pure, impurity 0; Gini gain 0.5 aur entropy gain 1 bit.</p>"
      ],
      [
        "How can I implement decision trees in Python?",
        "<p>Python + scikit-learn: ek feature threshold se classes separate hoti hain. Gini ki jagah entropy bhi try karo.</p><pre><code class=\"language-python\">from sklearn.tree import DecisionTreeClassifier\n\nX = [[1], [2], [3], [4]]\ny = [0, 0, 1, 1]\nfor criterion in ['gini', 'entropy']:\n    tree = DecisionTreeClassifier(\n        criterion=criterion, max_depth=1, random_state=42)\n    tree.fit(X, y)\n    print(criterion, tree.predict([[1.5], [3.5]]))\n    # [0 1]</code></pre>"
      ],
      [
        "What are the limitations and alternatives to decision trees?",
        "<p>Deep tree training data memorize kar sakta hai; chhote data changes se structure badal sakta hai. Depth aur minimum leaf size control karo. Random forest variance kam karne ka alternative hai; boosting sequential corrections se prediction improve karta hai.</p>"
      ],
      [
        "Where is decision trees used in practice?",
        "<p>Loan-default prediction ya customer churn mein income, usage, aur payment-history rules. Single shallow tree ka decision path inspect karna aasaan hota hai; rule ko causal conclusion mat samjho.</p>"
      ],
      [
        "How can I check my understanding of decision trees?",
        "<p><strong>Bina notes dekhe bolo:</strong> node, branch, leaf kya hain? Gini aur entropy kya measure karte hain? Four-example split ka gain khud calculate karo.</p>"
      ]
    ]
  },
  {
    "title": "Random forests & bagging",
    "questions": [
      [
        "What is bagging, and how does a random forest use it?",
        "<p><strong>Bagging</strong> (bootstrap aggregating) trains models on different samples drawn with replacement from the training set, then combines their predictions.</p><p>A standard bagged random forest trains many decision trees this way and also considers a random subset of features at each split. This extra randomness helps make the trees less correlated.</p><p>Combining diverse trees reduces variance compared with a single deep tree.</p>"
      ],
      [
        "How does a random forest combine tree predictions?",
        "<p>For regression, average the predictions of all \\(T\\) trees:</p><div class=\"formula\">\\[\\hat{y}(\\mathbf{x})=\\frac{1}{T}\\sum_{t=1}^{T}h_t(\\mathbf{x})\\]</div><p>For classification, implementations may use majority voting or average the trees' class probabilities and choose the class with the highest average probability.</p><p class=\"example\">If three regression trees predict 100, 110, and 120, the forest predicts 110.</p>"
      ],
      [
        "What problem does random forests solve?",
        "<p>Ek deep tree training sample ke small changes par kaafi badal sakta hai. Random forest multiple diverse trees ko combine karke prediction ki variance kam karne ki koshish karta hai.</p>"
      ],
      [
        "How can I understand random forests intuitively?",
        "<p>Meri soch: ek expert ke answer par depend karne ke bajay thode alag experience wale experts se poochho. Unki combined judgement zyada stable ho sakti hai, especially jab sab exactly same galti na kar rahe hon.</p>"
      ],
      [
        "What is the formal definition of random forests?",
        "<p>Random forest ek tree ensemble hai. Standard bagged version mein har tree bootstrap sample par train hota hai, aur har split par random feature subset consider karta hai. Bagging ka matlab bootstrap aggregating hai.</p>"
      ],
      [
        "How does random forests work step by step?",
        "<p>Training data se replacement ke saath samples banao: ek row repeat ho sakti hai aur kuch rows sample mein na aayen. Har tree independently train karo. Feature randomness trees ki correlation kam karne mein help karti hai.</p><p>Regression mein average:</p><div class=\"formula\">\\[\\hat y(x)=\\frac1T\\sum_{t=1}^{T}h_t(x)\\]</div><p>Classification mein class votes ya averaged class probabilities combine karte hain; scikit-learn forest average probabilities use karta hai.</p>"
      ],
      [
        "Can you show a worked example of random forests?",
        "<p>Original rows A, B, C, D hain. Ek bootstrap sample A, A, C, D ho sakta hai; doosra B, C, C, D. Teen regression trees predictions 100, 110, 120 dein, toh forest answer (100 + 110 + 120)/3 = 110.</p>"
      ],
      [
        "How can I implement random forests in Python?",
        "<p>Python + scikit-learn: held-out split par forest evaluate karo. Trees training mein bootstrap samples use karte hain.</p><pre><code class=\"language-python\">from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\n\nX, y = load_iris(return_X_y=True)\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, stratify=y, random_state=42)\nforest = RandomForestClassifier(\n    n_estimators=100, max_depth=4, bootstrap=True, random_state=42)\nforest.fit(X_train, y_train)\nprint(forest.score(X_test, y_test))</code></pre>"
      ],
      [
        "What are the limitations and alternatives to random forests?",
        "<p>Forest ek tree se zyada memory aur prediction time leta hai; poora model explain karna harder hota hai. Bahut correlated trees ka average limited improvement dega. Simpler explanation ke liye shallow tree, ya tuned tabular performance ke liye gradient boosting compare kar sakte ho.</p>"
      ],
      [
        "Where is random forests used in practice?",
        "<p>Customer churn, fraud-risk classification, aur demand prediction jaise tabular tasks mein useful baseline. Numeric features ko standardize karna tree splitting ke liye generally necessary nahi hota.</p>"
      ],
      [
        "How can I check my understanding of random forests?",
        "<p><strong>Bina notes dekhe bolo:</strong> bootstrap sample kya hai? Sirf bahut trees banana aur random forest mein kya extra difference hai? Predictions 100, 110, 120 ka final answer nikalo.</p>"
      ]
    ]
  },
  {
    "title": "Gradient boosting: XGBoost & LightGBM",
    "questions": [
      [
        "How does gradient boosting work?",
        "<p>Gradient boosting builds trees sequentially. Each new tree learns a correction to the current ensemble, guided by the loss function's negative gradients.</p><div class=\"formula\">\\[F_m(\\mathbf{x})=F_{m-1}(\\mathbf{x})+\\eta h_m(\\mathbf{x})\\]</div><p>\\(h_m\\) is the new tree and \\(\\eta\\) is the learning rate. For squared-error regression, fitting negative gradients corresponds to fitting residuals. Other losses use their own gradient-based corrections.</p><p>The model improves by adding small corrections, rather than averaging independently trained trees.</p>"
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
        "How do random forests and gradient boosting differ?",
        "<div class=\"table-wrap\"><table><thead><tr><th></th><th>Random forest</th><th>Gradient boosting</th></tr></thead><tbody><tr><th>Training</th><td>Trees can be trained independently</td><td>New trees depend on the current ensemble</td></tr><tr><th>Combination</th><td>Average predictions or combine class votes/probabilities</td><td>Add successive corrections</td></tr><tr><th>Main idea</th><td>Reduce variance through diverse trees</td><td>Improve the objective through sequential updates</td></tr></tbody></table></div><p>XGBoost and LightGBM implement gradient boosting. Their performance depends on the data and settings; neither is universally best.</p>"
      ],
      [
        "What problem does gradient boosting solve?",
        "<p>Current model jo patterns miss kar raha hai, unhe next model se correct karna hai. Boosting chhote corrections jod kar ensemble ki loss reduce karta hai.</p>"
      ],
      [
        "How can I understand gradient boosting intuitively?",
        "<p>Meri soch: pehla draft banao, uski mistakes dekho, phir next draft mein targeted correction add karo. Har naya tree previous ensemble ko improve karne ki direction mein train hota hai.</p>"
      ],
      [
        "What is the formal definition of gradient boosting?",
        "<p>Gradient boosting ek additive learning method hai jo loss ke negative gradients se guided learners sequentially add karta hai.</p><div class=\"formula\">\\[F_m(x)=F_{m-1}(x)+\\eta h_m(x)\\]</div><p>\\(F_{m-1}\\): current model, \\(h_m\\): new tree, \\(\\eta\\): learning rate. Squared loss mein correction residual fitting se related hoti hai; doosre losses ke gradients alag hote hain.</p>"
      ],
      [
        "How does gradient boosting work step by step?",
        "<p>Initial prediction se start karo, gradients nikalo, correction tree fit karo, scaled output add karo, repeat. <strong>XGBoost</strong> tree booster gradient aur second-order information ke saath regularization use karta hai. <strong>LightGBM</strong> histogram-based split search aur leaf-wise growth ke liye jaana jaata hai. Depth, leaves, learning rate, aur validation-based stopping overfitting control karne mein useful hain.</p><p>Random forest trees independently train karta hai; boosting ka next tree current ensemble par depend karta hai.</p>"
      ],
      [
        "Can you show a worked example of gradient boosting?",
        "<p>Ek example ka target 10, current prediction 6: residual 4. Maan lo correction tree is point par 4 predict kare aur \\(\\eta=0.25\\). Naya output \\(6+0.25(4)=7\\). Agla correction 7 se aage improve karega. Yeh squared-loss intuition ka one-point demo hai.</p>"
      ],
      [
        "How can I implement gradient boosting in Python?",
        "<p>Python + scikit-learn aur xgboost/lightgbm packages. Dono libraries same train/test split par fit hoti hain; yeh basic comparison hai, tuning experiment nahi.</p><pre><code class=\"language-python\">from sklearn.datasets import load_breast_cancer\nfrom sklearn.model_selection import train_test_split\nfrom xgboost import XGBClassifier\nfrom lightgbm import LGBMClassifier\n\nX, y = load_breast_cancer(return_X_y=True)\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, stratify=y, random_state=42)\nmodels = [\n    XGBClassifier(n_estimators=50, max_depth=3,\n                  learning_rate=0.05, random_state=42, n_jobs=1),\n    LGBMClassifier(n_estimators=50, num_leaves=7,\n                   learning_rate=0.05, random_state=42,\n                   n_jobs=1, verbosity=-1)\n]\nfor model in models:\n    model.fit(X_train, y_train)\n    print(type(model).__name__, model.score(X_test, y_test))</code></pre>"
      ],
      [
        "What are the limitations and alternatives to gradient boosting?",
        "<p>Depth, learning rate aur tree count carefully choose karne padte hain. Repeated corrections noise bhi fit kar sakti hain. LightGBM ki leaf-wise growth small data par deep branches bana sakti hai. XGBoost ya LightGBM mein universal winner nahi; simpler baseline ke liye logistic regression ya random forest compare karo.</p>"
      ],
      [
        "Where is gradient boosting used in practice?",
        "<p>Fraud scores, churn probabilities, aur sales forecasts jaise structured-feature tasks. Engineered counts, recent activity, aur numeric/category features ke patterns learn karne mein commonly use hote hain.</p><p>References: <a href=\"https://arxiv.org/abs/1603.02754\" target=\"_blank\" rel=\"noopener noreferrer\">XGBoost paper</a>, <a href=\"https://lightgbm.readthedocs.io/en/stable/Features.html\" target=\"_blank\" rel=\"noopener noreferrer\">LightGBM features</a>.</p>"
      ],
      [
        "How can I check my understanding of gradient boosting?",
        "<p><strong>Bina notes dekhe bolo:</strong> next tree kis cheez ko correct karta hai? Prediction 6, correction 4, learning rate 0.25 par output kya hoga? XGBoost aur LightGBM ki ek-ek key property batao.</p>"
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
        "How can permutation importance help, and what are its limitations?",
        "<p>First measure a fitted model on held-out data. Shuffle one feature, score the model again, and measure the performance drop. Repeat the shuffle to estimate variability. A larger drop suggests greater reliance on that feature for the chosen metric.</p><p>Split-based importance can favor features with many possible split points. Held-out permutation importance avoids that particular training-split bias, but correlated features can substitute for one another and hide individual importance. Shuffling can also create unrealistic combinations.</p><p>Use importance to understand a model that already performs adequately on unseen data; it does not prove causation.</p>"
      ],
      [
        "What problem does feature importance solve?",
        "<p>Model bahut inputs use karta hai. Humein samajhna hota hai ki fitted model ki predictions kin features par zyada depend karti hain.</p>"
      ],
      [
        "How can I understand feature importance intuitively?",
        "<p>Meri soch: kisi input ki useful information hataane par model ka score kitna girta hai? Ya training mein us feature ne splits ko kitna improve kiya? Dono importance ke alag nazariye hain.</p>"
      ],
      [
        "What is the formal definition of feature importance?",
        "<p>Feature importance ek chosen method ke according fitted model mein input ki contribution ka summary hai. Yeh universal property ya causal effect nahi hai.</p><p><strong>Impurity importance:</strong> split impurity reductions ka total. <strong>Gain:</strong> boosting objective improvement ka summary. <strong>Split count:</strong> feature kitni baar split mein aaya.</p>"
      ],
      [
        "How does feature importance work step by step?",
        "<p><strong>Permutation importance:</strong> held-out data par baseline score nikalo, ek feature shuffle karo, phir score dubara nikalo. Shuffle repeat karke average aur variability dekho.</p><div class=\"formula\">\\[\\mathrm{Importance}_j=s_{\\mathrm{baseline}}-\\frac1R\\sum_{r=1}^{R}s_{j,r}^{\\mathrm{shuffled}}\\]</div><p>Yahan score higher-is-better hai. Bada drop matlab model us feature ki information par zyada rely karta hai. Score kabhi improve bhi ho sakta hai, jisse negative estimate aata hai.</p>"
      ],
      [
        "Can you show a worked example of feature importance?",
        "<p>Baseline accuracy 0.90. Income shuffle karne par scores 0.79 aur 0.81: mean 0.80, importance 0.10 ya 10 percentage points. Age shuffle karne par mean 0.89: importance 0.01. Is model aur dataset par income shuffle ka impact zyada tha.</p>"
      ],
      [
        "How can I implement feature importance in Python?",
        "<p>Python + scikit-learn: model train data par fit hota hai, importance held-out data par measure hoti hai. Agar results se features select karo, final evaluation ke liye ek aur untouched test set rakho.</p><pre><code class=\"language-python\">from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.inspection import permutation_importance\n\ndata = load_iris()\nX_train, X_eval, y_train, y_eval = train_test_split(\n    data.data, data.target, test_size=0.3,\n    stratify=data.target, random_state=42)\nmodel = RandomForestClassifier(n_estimators=100, random_state=42)\nmodel.fit(X_train, y_train)\nresult = permutation_importance(\n    model, X_eval, y_eval, scoring='accuracy',\n    n_repeats=10, random_state=42)\nfor name, mean, std in zip(data.feature_names,\n        result.importances_mean, result.importances_std):\n    print(name, round(mean, 3), round(std, 3))</code></pre>"
      ],
      [
        "What are the limitations and alternatives to feature importance?",
        "<p>Impurity importance many possible split points wale features ko favor kar sakti hai. Correlated features ek doosre ki information replace karke permutation importance kam dikha sakte hain; shuffling unrealistic combinations bhi bana sakti hai. Grouped permutation ya SHAP complementary views hain, causal proof nahi.</p>"
      ],
      [
        "Where is feature importance used in practice?",
        "<p>Churn model mein tenure, recent usage, aur complaints mein se model kis signal par rely karta hai, yeh inspect karna. Feature importance data quality aur model debugging mein useful hai; important feature ka matlab usko change karne se outcome zaroor badlega, aisa nahi.</p><p><a href=\"https://scikit-learn.org/stable/modules/permutation_importance.html\" target=\"_blank\" rel=\"noopener noreferrer\">Reference: permutation importance</a>.</p>"
      ],
      [
        "How can I check my understanding of feature importance?",
        "<p><strong>Bina notes dekhe bolo:</strong> impurity aur permutation importance mein difference kya hai? Baseline 0.90 aur shuffled mean 0.80 ka drop kya hai? Correlated features ranking ko misleading kaise bana sakte hain?</p>"
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
