const topics = [
  {
    "title": "Linear regression - closed form and gradient descent",
    "questions": [
      [
        "What is linear regression?",
        "<p>Linear regression predicts a continuous value using a weighted sum of input features.</p><div class=\"formula\">\\[\\hat{y} = b + w_1x_1 + \\cdots + w_px_p\\]</div><p>Here \\(b\\) is the intercept and \\(w_j\\) are learned coefficients.</p><p class=\"example\">Example: predicting house price from area and number of bedrooms.</p>"
      ],
      [
        "How does the closed-form solution train linear regression?",
        "<p>It directly calculates coefficients that minimize squared error, without repeated gradient updates.</p><div class=\"formula\">\\[\\hat{\\boldsymbol{\\theta}} = (X^{\\mathsf T}X)^{-1}X^{\\mathsf T}\\mathbf{y}\\]</div><p>\\(X\\) contains the input features and a column of ones for the intercept; \\(\\mathbf{y}\\) contains targets. This formula requires \\(X\\) to have independent columns. In practice, use a least-squares solver rather than explicitly computing the inverse; a pseudoinverse can handle rank-deficient data.</p>"
      ],
      [
        "How does gradient descent train linear regression?",
        "<p>Start with initial coefficients, calculate predictions and the loss gradient, then repeatedly update coefficients opposite the gradient.</p><div class=\"formula\">\\[J = \\frac{1}{n}\\sum_{i=1}^{n}(\\hat{y}_i-y_i)^2\\]\\[\\boldsymbol{\\theta} \\leftarrow \\boldsymbol{\\theta} - \\alpha\\frac{2}{n}X^{\\mathsf T}(X\\boldsymbol{\\theta}-\\mathbf{y})\\]</div><p>\\(\\alpha\\) is the learning rate. Too large a value can cause divergence; too small a value makes training slow. Gradient descent is useful when a direct matrix solution is too expensive.</p>"
      ],
      [
        "What happens in one gradient descent update?",
        "<p>For one example \\(x=1,y=3\\), start with \\(w=b=0\\) and squared loss \\((wx+b-y)^2\\). The prediction is 0 and both gradients are \\(-6\\).</p><div class=\"formula\">\\[w_{\\mathrm{new}}=0-0.1(-6)=0.6,\\qquad b_{\\mathrm{new}}=0.6\\]</div><p>Update both parameters using the old values. The new prediction is 1.2, closer to the target 3.</p>"
      ],
      [
        "When should I use closed form versus gradient descent?",
        "<p><strong>Closed form:</strong> directly solve the least-squares problem; suitable when the matrix computations fit your time and memory budget. Use a stable least-squares solver.</p><p><strong>Gradient descent:</strong> iteratively reduce the same loss; useful when direct solving is expensive. It needs a learning rate and a stopping rule.</p><p>Both target a least-squares minimum. Gradient descent approaches it when the step size is suitable and training runs long enough.</p>"
      ],
      [
        "How does the learning rate affect linear regression training?",
        "<p>The learning rate controls the size of each gradient descent update. A very small value makes progress slow; a very large value can overshoot the minimum or make the loss diverge.</p><p>Track MSE across updates. Scaling features can make gradient descent easier to tune when their magnitudes differ greatly.</p>"
      ],
      [
        "How do I solve the same linear regression with NumPy least squares and gradient descent?",
        "<p>Python + NumPy ka toy example: dono methods same line ke paas pahunchte hain. Yeh learning demo hai; evaluation ke liye alag test data chahiye.</p><pre><code class=\"language-python\">import numpy as np\n\nx = np.array([1., 2., 3.])\ny = np.array([3., 5., 7.])\nX = np.column_stack([np.ones(len(x)), x])\n\n# Stable direct least-squares solution\nclosed, *_ = np.linalg.lstsq(X, y, rcond=None)\n\n# Gradient descent on mean squared error\ntheta = np.zeros(2)\nfor _ in range(5000):\n    gradient = 2 / len(y) * X.T @ (X @ theta - y)\n    theta -= 0.05 * gradient\n\nprint(closed)  # [1., 2.]\nprint(theta)   # approximately [1., 2.]\nprint(np.array([1., 4.]) @ theta)  # approximately 9</code></pre>"
      ]
    ]
  },
  {
    "title": "Logistic regression - sigmoid output and binary classification",
    "questions": [
      [
        "What is logistic regression, and how does it perform binary classification?",
        "<p>Logistic regression estimates the probability of one of two classes, such as spam (1) or not spam (0).</p><p>It computes a linear score \\(z=b+\\mathbf{w}^{\\mathsf T}\\mathbf{x}\\) and passes it through a sigmoid. Predict class 1 when the resulting probability reaches a chosen threshold, commonly 0.5; otherwise predict class 0.</p><p class=\"example\">If the spam probability is 0.8 and the threshold is 0.5, the prediction is spam.</p>"
      ],
      [
        "What is the sigmoid function?",
        "<p>The sigmoid converts a real-valued score into an output between 0 and 1, used as the estimated positive-class probability.</p><div class=\"formula\">\\[\\sigma(z) = \\frac{1}{1+e^{-z}}\\]</div><p>At \\(z=0\\), the output is 0.5. Large positive scores approach 1, and large negative scores approach 0.</p>"
      ],
      [
        "What probabilities does sigmoid produce for scores -2, 0, and 2?",
        "<div class=\"formula\">\\[\\sigma(-2)\\approx0.119,\\qquad\\sigma(0)=0.5,\\qquad\\sigma(2)\\approx0.881\\]</div><p>These are probabilities of class 1. With the rule \\(p\\geq0.5\\), the predicted labels are 0, 1, and 1.</p>"
      ],
      [
        "How does a probability threshold determine the binary class?",
        "<p>Predict class 1 when \\(p\\geq t\\), otherwise class 0. The threshold \\(t\\) is often 0.5.</p><p>For \\(p=0.65\\), threshold 0.5 gives class 1; threshold 0.8 gives class 0. Changing the threshold changes the decision, not the model's probability.</p>"
      ],
      [
        "How do I calculate sigmoid probability and a binary label in NumPy?",
        "<p>Python + NumPy se score, sigmoid aur threshold ko seedha dekho. Weights yahan pehle se diye gaye hain; training nahi ho rahi.</p><pre><code class=\"language-python\">import numpy as np\n\ndef predict(x, w, b, threshold=0.5):\n    z = b + np.dot(w, x)\n    # Stable sigmoid for very large positive/negative scores\n    p = np.exp(-np.logaddexp(0, -z))\n    return float(p), int(p &gt;= threshold)\n\nprobability, label = predict([2.0], [1.0], 0.0)\nprint(round(probability, 3), label)  # 0.881 1</code></pre>"
      ]
    ]
  },
  {
    "title": "Cost functions - MSE and Binary Cross-Entropy",
    "questions": [
      [
        "What is Mean Squared Error (MSE)?",
        "<p>MSE is the average squared difference between predicted and actual numerical values. It is commonly used to train linear regression.</p><div class=\"formula\">\\[\\operatorname{MSE}=\\frac{1}{n}\\sum_{i=1}^{n}(\\hat{y}_i-y_i)^2\\]</div><p class=\"example\">Actual values [2, 4], predictions [3, 2]: \\(\\operatorname{MSE}=\\frac{1+4}{2}=2.5\\).</p><p>Squaring makes large errors contribute more strongly.</p>"
      ],
      [
        "What is Binary Cross-Entropy (BCE)?",
        "<p>BCE measures the error of predicted probabilities for binary labels. It is the standard loss for binary logistic regression.</p><div class=\"formula\">\\[\\operatorname{BCE}=-\\frac{1}{n}\\sum_{i=1}^{n}\\left[y_i\\log(p_i)+(1-y_i)\\log(1-p_i)\\right]\\]</div><p>\\(y_i\\) is 0 or 1, and \\(p_i\\) is the predicted probability of class 1. Lower is better; confident wrong predictions receive large penalties.</p><p class=\"example\">For \\(y=1\\) and \\(p=0.9\\), loss \\(=-\\log(0.9)\\approx 0.105\\), using natural logarithms.</p>"
      ],
      [
        "Why use MSE for linear regression and BCE for logistic regression?",
        "<p><strong>Linear regression:</strong> predicts numerical values; MSE penalizes squared numerical errors.</p><p><strong>Logistic regression:</strong> predicts a binary class probability; BCE is the negative log-likelihood of the binary labels. With a linear score and sigmoid, BCE gives a convex objective.</p><p>MSE can be applied to probabilities, but combining it with sigmoid generally loses that convexity.</p>"
      ],
      [
        "Why does BCE strongly penalize a confident wrong prediction?",
        "<p>For an actual label \\(y=1\\), BCE is \\(-\\log p\\).</p><div class=\"formula\">\\[p=0.9:\\; -\\log(0.9)\\approx0.105\\qquad p=0.01:\\; -\\log(0.01)\\approx4.605\\]</div><p>Assigning almost zero probability to the true class produces a much larger loss. For \\(y=0\\), the loss is \\(-\\log(1-p)\\).</p>"
      ],
      [
        "How do I avoid log(0) when computing BCE?",
        "<p>For a simple probability-based implementation, clip probabilities to \\([\\varepsilon,1-\\varepsilon]\\) before taking logarithms.</p><p>When training from raw scores, use a stable BCE-with-logits calculation instead of computing sigmoid and logs separately.</p><div class=\"formula\">\\[\\ell(z,y)=\\max(z,0)-yz+\\log(1+e^{-|z|})\\]</div><p>This is the binary logistic loss for one score \\(z\\) and label \\(y\\).</p>"
      ],
      [
        "How do I calculate MSE and BCE for a batch in NumPy?",
        "<p>Python + NumPy se dono losses calculate karo.</p><pre><code class=\"language-python\">import numpy as np\n\ny = np.array([2., 4.])\npred = np.array([3., 2.])\nprint(np.mean((pred - y) ** 2))  # 2.5\n\nlabels = np.array([1., 0.])\np = np.clip(np.array([0.9, 0.2]), 1e-12, 1 - 1e-12)\nbce = -np.mean(labels * np.log(p) + (1-labels) * np.log1p(-p))\nprint(round(bce, 3))  # 0.164</code></pre>"
      ]
    ]
  },
  {
    "title": "Regularization - Ridge (L2) and Lasso (L1)",
    "questions": [
      [
        "What is Ridge regression (L2 regularization)?",
        "<p>Ridge adds a squared-coefficient penalty to the regression loss, discouraging large weights and helping reduce overfitting.</p><div class=\"formula\">\\[J_{\\mathrm{Ridge}}=\\operatorname{MSE}+\\lambda\\sum_{j=1}^{p}w_j^2\\]</div><p>\\(\\lambda\\) controls penalty strength. Ridge shrinks coefficients toward zero but typically does not make them exactly zero. The intercept is usually not penalized.</p>"
      ],
      [
        "What is Lasso regression (L1 regularization)?",
        "<p>Lasso adds the sum of absolute coefficient values to the regression loss.</p><div class=\"formula\">\\[J_{\\mathrm{Lasso}}=\\operatorname{MSE}+\\lambda\\sum_{j=1}^{p}|w_j|\\]</div><p>It can set some coefficients exactly to zero, so it can also select features. A larger \\(\\lambda\\) strengthens the penalty; excessive regularization can cause underfitting. The intercept is usually not penalized.</p>"
      ],
      [
        "What is the difference between Ridge and Lasso?",
        "<div class=\"table-wrap\"><table><thead><tr><th></th><th>Ridge (L2)</th><th>Lasso (L1)</th></tr></thead><tbody><tr><th>Penalty</th><td>\\(\\sum_j w_j^2\\)</td><td>\\(\\sum_j |w_j|\\)</td></tr><tr><th>Coefficients</th><td>Shrinks toward zero</td><td>Can become exactly zero</td></tr><tr><th>Feature selection</th><td>Typically retains all features</td><td>Can remove features</td></tr></tbody></table></div><p>Scale features before comparing coefficient penalties, and choose penalty strength using validation data.</p>"
      ],
      [
        "What changes when the regularization strength increases?",
        "<p>In \\(J=\\mathrm{MSE}+\\lambda\\,\\mathrm{penalty}\\), larger \\(\\lambda\\) puts more weight on keeping coefficients small.</p><p>Ridge usually shrinks coefficients without setting them exactly to zero. Lasso can set coefficients exactly to zero. Excessive regularization can underfit; \\(\\lambda=0\\) removes the penalty.</p><p>The intercept is usually excluded from the penalty.</p>"
      ],
      [
        "Why should features be scaled before Ridge or Lasso?",
        "<p>Coefficient size depends on feature units. A feature measured in thousands may need a much smaller coefficient than the same feature measured in single units.</p><p>Ridge and Lasso penalize coefficients, so different feature scales can make the penalty uneven. Standardize features using training-data statistics before fitting these models.</p>"
      ],
      [
        "How do I calculate the L1 and L2 penalties for weights [3, 4]?",
        "<p>Let MSE = 2 and \\(\\lambda=0.1\\).</p><div class=\"formula\">\\[J_{\\mathrm{Ridge}}=2+0.1(3^2+4^2)=4.5\\]\\[J_{\\mathrm{Lasso}}=2+0.1(|3|+|4|)=2.7\\]</div><p>These compare penalties at the same fixed weights. The lower numerical objective here does not establish that one model predicts better.</p>"
      ],
      [
        "How do I fit Ridge and Lasso with feature scaling in scikit-learn?",
        "<p>Python + scikit-learn: scaler training data par hi fit hota hai. Dono models ke liye alpha ki numeric value directly equivalent objective strength nahi maanni chahiye.</p><pre><code class=\"language-python\">from sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import Ridge, Lasso\n\nX = [[1, 2], [2, 1], [3, 4], [4, 3], [5, 6], [6, 5]]\ny = [3, 4, 7, 8, 11, 12]\n\nfor estimator in [Ridge(alpha=1.0), Lasso(alpha=0.1)]:\n    model = make_pipeline(StandardScaler(), estimator)\n    model.fit(X, y)\n    print(type(estimator).__name__, model.predict([[7, 6]]))</code></pre>"
      ]
    ]
  },
  {
    "title": "Multi-class classification - One-vs-Rest",
    "questions": [
      [
        "How does One-vs-Rest (OvR) handle multiclass classification?",
        "<p>For K classes, train K binary classifiers. Each classifier treats its own class as positive and every other class as negative.</p><p>At prediction time, obtain a score from each model and select the highest-scoring class for a single-label prediction.</p>"
      ],
      [
        "How are training labels created for each One-vs-Rest classifier?",
        "<p>For classes Cat, Dog, and Bird, train three binary classifiers:</p><ul><li><strong>Cat model:</strong> Cat = 1; Dog and Bird = 0.</li><li><strong>Dog model:</strong> Dog = 1; Cat and Bird = 0.</li><li><strong>Bird model:</strong> Bird = 1; Cat and Dog = 0.</li></ul><p>Each model receives the same input examples, with a different binary target. K classes require K classifiers.</p>"
      ],
      [
        "How does One-vs-Rest choose a class from scores 0.7, 0.2, and 0.4?",
        "<p>For Cat, Dog, and Bird, train three models:</p><ul><li>Cat vs Dog and Bird.</li><li>Dog vs Cat and Bird.</li><li>Bird vs Cat and Dog.</li></ul><p class=\"example\">If their positive-class scores are Cat = 0.7, Dog = 0.2, and Bird = 0.4, predict <strong>Cat</strong>.</p><p>Independent sigmoid outputs do not necessarily sum to 1.</p>"
      ],
      [
        "Must One-vs-Rest sigmoid outputs sum to 1?",
        "<p>No. Each binary classifier estimates its own class-versus-rest probability independently, so the raw sigmoid outputs need not sum to 1.</p><p>For single-label classification, choose the class with the highest score, even if several scores exceed 0.5.</p><div class=\"formula\">\\[\\hat y=\\operatorname*{arg\\,max}_{k\\in\\{1,\\ldots,K\\}}s_k(x)\\]</div><p>Some libraries normalize the reported multiclass probabilities; distinguish those from the independent binary model outputs.</p>"
      ],
      [
        "How do I train One-vs-Rest logistic classifiers in scikit-learn?",
        "<p>Python + scikit-learn: Iris dataset ki teen classes par OvR model. Test split training se alag hai.</p><pre><code class=\"language-python\">from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.multiclass import OneVsRestClassifier\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\n\nX, y = load_iris(return_X_y=True)\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, stratify=y, random_state=42)\nmodel = make_pipeline(StandardScaler(),\n    OneVsRestClassifier(LogisticRegression(max_iter=1000)))\nmodel.fit(X_train, y_train)\nprint(model.predict(X_test[:3]))\nprint(model.score(X_test, y_test))</code></pre>"
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
