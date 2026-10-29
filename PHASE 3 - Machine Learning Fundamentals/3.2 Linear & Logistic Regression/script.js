const topics = [
  {
    "title": "Linear regression - closed form and gradient descent",
    "questions": [
      [
        "What is linear regression?",
        "<p>Linear regression predicts a numerical value using a weighted sum of input features.</p><ul><li><strong>Target:</strong> Predict a continuous quantity, such as price.</li><li><strong>Coefficients:</strong> Weights describe how features contribute to the prediction.</li><li><strong>Training:</strong> Closed-form solvers and gradient descent can fit the weights.</li></ul><div class=\"formula\">\\[\\hat{y} = b + w_1x_1 + \\cdots + w_px_p\\]</div><p class=\"example\">Example: predicting house price from area and number of bedrooms.</p><p><strong>Remember:</strong> Linear regression learns weights for numerical predictions.</p>"
      ],
      [
        "How does the closed-form solution train linear regression?",
        "<p>A closed-form least-squares solution calculates coefficients without iterative gradient updates.</p><ul><li><strong>Objective:</strong> Minimize the sum of squared prediction errors.</li><li><strong>Condition:</strong> The displayed inverse requires independent columns in the design matrix.</li><li><strong>Practice:</strong> Use a stable least-squares solver; a pseudoinverse handles rank deficiency.</li></ul><div class=\"formula\">\\[\\hat{\\boldsymbol{\\theta}} = (X^{\\mathsf T}X)^{-1}X^{\\mathsf T}\\mathbf{y}\\]</div><p><strong>Symbols:</strong> X is the feature matrix with an intercept column; y contains targets; theta contains the fitted coefficients.</p><p><strong>Remember:</strong> Solve least squares directly; avoid explicitly inverting matrices.</p>"
      ],
      [
        "How does gradient descent train linear regression?",
        "<p>Gradient descent repeatedly changes coefficients in the direction that reduces loss.</p><ol><li><strong>Initialize:</strong> Start with coefficient values.</li><li><strong>Differentiate:</strong> Compute predictions, loss, and the gradient at the current values.</li><li><strong>Update:</strong> Move opposite the gradient and repeat with a suitable learning rate.</li></ol><div class=\"formula\">\\[J = \\frac{1}{n}\\sum_{i=1}^{n}(\\hat{y}_i-y_i)^2\\]\\[\\boldsymbol{\\theta} \\leftarrow \\boldsymbol{\\theta} - \\alpha\\frac{2}{n}X^{\\mathsf T}(X\\boldsymbol{\\theta}-\\mathbf{y})\\]</div><p><strong>Symbols:</strong> J is mean squared error, n is the number of examples, theta contains coefficients, and alpha is the learning rate.</p><p><strong>Remember:</strong> Gradient points uphill; take a step the other way.</p>"
      ],
      [
        "How does the learning rate affect linear regression training?",
        "<p>The learning rate controls the size of each gradient descent update.</p><ul><li><strong>Too small:</strong> Training progresses slowly.</li><li><strong>Too large:</strong> Updates may overshoot or diverge.</li><li><strong>Monitoring:</strong> Track loss and scale features when their magnitudes differ substantially.</li></ul><p><strong>Remember:</strong> Choose steps large enough to learn but small enough to remain stable.</p>"
      ],
      [
        "What happens in one gradient descent update?",
        "<p>A gradient descent update subtracts the learning rate times the current gradient.</p><ul><li><strong>Setup:</strong> For x = 1 and y = 3, start with weight and bias both zero.</li><li><strong>Calculation:</strong> Squared loss gives both gradients as -6; use learning rate 0.1.</li><li><strong>Result:</strong> Both parameters become 0.6; the new prediction is 1.2.</li></ul><div class=\"formula\">\\[w_{\\mathrm{new}}=0-0.1(-6)=0.6,\\qquad b_{\\mathrm{new}}=0.6\\]</div><p><strong>Remember:</strong> Calculate all gradients at the old parameters before updating.</p>"
      ],
      [
        "When should I use closed form versus gradient descent?",
        "<p>Closed-form solvers fit least squares directly; gradient descent approaches the solution iteratively.</p><ul><li><strong>Closed form:</strong> Useful when matrix operations fit the time and memory budget.</li><li><strong>Gradient descent:</strong> Useful when direct solving is expensive.</li><li><strong>Convergence:</strong> Iteration needs an appropriate learning rate and stopping rule.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Approach / concept</th><th scope=\"col\">Explanation</th></tr></thead><tbody><tr><th scope=\"row\">Closed form</th><td>directly solve the least-squares problem; suitable when the matrix computations fit your time and memory budget. Use a stable least-squares solver.</td></tr><tr><th scope=\"row\">Gradient descent</th><td>iteratively reduce the same loss; useful when direct solving is expensive. It needs a learning rate and a stopping rule.</td></tr></tbody></table></div><p><strong>Remember:</strong> Direct solve for manageable problems; iterate when scale demands it.</p>"
      ],
      [
        "How do I solve the same linear regression with NumPy least squares and gradient descent?",
        "<p>NumPy can fit the same least-squares model using a direct solver or gradient descent.</p><ol><li><strong>Prepare:</strong> Add an intercept column to the input matrix.</li><li><strong>Fit:</strong> Compare np.linalg.lstsq with repeated MSE-gradient updates.</li><li><strong>Check:</strong> Both should approach intercept 1 and slope 2 in this toy example.</li></ol><pre><code class=\"language-python\">import numpy as np\n\nx = np.array([1., 2., 3.])\ny = np.array([3., 5., 7.])\nX = np.column_stack([np.ones(len(x)), x])\n\n# Stable direct least-squares solution\nclosed, *_ = np.linalg.lstsq(X, y, rcond=None)\n\n# Gradient descent on mean squared error\ntheta = np.zeros(2)\nfor _ in range(5000):\n    gradient = 2 / len(y) * X.T @ (X @ theta - y)\n    theta -= 0.05 * gradient\n\nprint(closed)  # [1., 2.]\nprint(theta)   # approximately [1., 2.]\nprint(np.array([1., 4.]) @ theta)  # approximately 9</code></pre><p><strong>Remember:</strong> Different fitting methods can learn the same least-squares line.</p>"
      ]
    ]
  },
  {
    "title": "Logistic regression - sigmoid output and binary classification",
    "questions": [
      [
        "What is logistic regression, and how does it perform binary classification?",
        "<p>Logistic regression predicts a binary-class probability from a linear score.</p><ul><li><strong>Score:</strong> Combine inputs using weights and an intercept.</li><li><strong>Sigmoid:</strong> Convert the score to an estimated positive-class probability.</li><li><strong>Threshold:</strong> Convert that probability to a class label using a chosen cutoff.</li></ul><p class=\"example\">If the spam probability is 0.8 and the threshold is 0.5, the prediction is spam.</p><p><strong>Remember:</strong> Score, sigmoid, then threshold.</p>"
      ],
      [
        "What is the sigmoid function?",
        "<p>Sigmoid maps any real-valued score to a value between zero and one.</p><ul><li><strong>Midpoint:</strong> A score of zero gives probability 0.5.</li><li><strong>Direction:</strong> Large positive scores approach one; large negative scores approach zero.</li><li><strong>Role:</strong> Logistic regression uses this output as the positive-class probability.</li></ul><div class=\"formula\">\\[\\sigma(z) = \\frac{1}{1+e^{-z}}\\]</div><p><strong>Remember:</strong> Sigmoid squashes scores into probabilities.</p>"
      ],
      [
        "How does a probability threshold determine the binary class?",
        "<p>A probability threshold converts a predicted probability into a binary label.</p><ul><li><strong>Rule:</strong> Predict class 1 when the probability is at least the threshold.</li><li><strong>Example:</strong> A probability of 0.65 gives class 1 at cutoff 0.5, but class 0 at 0.8.</li><li><strong>Effect:</strong> Changing the cutoff changes the decision, not the estimated probability.</li></ul><p><strong>Remember:</strong> Same probability, different threshold, possibly different label.</p>"
      ],
      [
        "What probabilities does sigmoid produce for scores -2, 0, and 2?",
        "<p>Sigmoid gives approximately 0.119, 0.5, and 0.881 for scores -2, 0, and 2.</p><ul><li><strong>Negative score:</strong> -2 gives a low positive-class probability.</li><li><strong>Zero score:</strong> 0 gives 0.5, the midpoint.</li><li><strong>Decision:</strong> With the rule probability at least 0.5, the labels are 0, 1, and 1.</li></ul><div class=\"formula\">\\[\\sigma(-2)\\approx0.119,\\qquad\\sigma(0)=0.5,\\qquad\\sigma(2)\\approx0.881\\]</div><p><strong>Remember:</strong> Negative below half, zero at half, positive above half.</p>"
      ],
      [
        "How do I calculate sigmoid probability and a binary label in NumPy?",
        "<p>Compute a linear score, apply sigmoid, and compare its probability with a threshold.</p><ol><li><strong>Score:</strong> Multiply features by their weights and add the bias.</li><li><strong>Probability:</strong> Use a numerically stable sigmoid calculation.</li><li><strong>Label:</strong> Return whether the probability reaches the cutoff; these weights are supplied, not trained.</li></ol><pre><code class=\"language-python\">import numpy as np\n\ndef predict(x, w, b, threshold=0.5):\n    z = b + np.dot(w, x)\n    # Stable sigmoid for very large positive/negative scores\n    p = np.exp(-np.logaddexp(0, -z))\n    return float(p), int(p &gt;= threshold)\n\nprobability, label = predict([2.0], [1.0], 0.0)\nprint(round(probability, 3), label)  # 0.881 1</code></pre><p><strong>Remember:</strong> Prediction uses learned or supplied weights; it does not fit them.</p>"
      ]
    ]
  },
  {
    "title": "Cost functions - MSE and Binary Cross-Entropy",
    "questions": [
      [
        "What is a cost function, and how does MSE measure error?",
        "<p>A cost function summarizes prediction error; MSE averages squared numerical errors.</p><ul><li><strong>Calculation:</strong> Square each prediction error and average across examples.</li><li><strong>Effect:</strong> Large errors receive disproportionately larger penalties.</li><li><strong>Use:</strong> MSE is commonly used to train linear regression.</li></ul><div class=\"formula\">\\[\\operatorname{MSE}=\\frac{1}{n}\\sum_{i=1}^{n}(\\hat{y}_i-y_i)^2\\]</div><p class=\"example\">Actual values [2, 4], predictions [3, 2]: \\(\\operatorname{MSE}=\\frac{1+4}{2}=2.5\\).</p><p><strong>Remember:</strong> MSE means average squared prediction error.</p>"
      ],
      [
        "What is Binary Cross-Entropy (BCE)?",
        "<p>Binary cross-entropy measures how well predicted probabilities match binary targets.</p><ul><li><strong>Targets:</strong> Each label is zero or one.</li><li><strong>Penalty:</strong> Confident wrong predictions produce large losses.</li><li><strong>Optimization:</strong> Lower BCE is better; it is the standard binary logistic-regression loss.</li></ul><div class=\"formula\">\\[\\operatorname{BCE}=-\\frac{1}{n}\\sum_{i=1}^{n}\\left[y_i\\log(p_i)+(1-y_i)\\log(1-p_i)\\right]\\]</div><p class=\"example\">For \\(y=1\\) and \\(p=0.9\\), loss \\(=-\\log(0.9)\\approx 0.105\\), using natural logarithms.</p><p><strong>Symbols:</strong> y is the binary target and p is the predicted probability of class 1; the formula uses natural logarithms.</p><p><strong>Remember:</strong> BCE punishes confidence in the wrong class.</p>"
      ],
      [
        "Why use MSE for linear regression and BCE for logistic regression?",
        "<p>MSE suits numerical prediction errors; BCE suits binary probability predictions.</p><ul><li><strong>Linear regression:</strong> MSE measures squared differences in numerical values.</li><li><strong>Logistic regression:</strong> BCE is the negative log-likelihood of binary labels.</li><li><strong>Optimization:</strong> BCE with a linear score and sigmoid gives a convex objective; sigmoid plus MSE generally does not.</li></ul><p><strong>Remember:</strong> Use the loss that matches the target and model.</p>"
      ],
      [
        "Why does BCE strongly penalize a confident wrong prediction?",
        "<p>BCE grows sharply when a model assigns almost zero probability to the correct class.</p><ul><li><strong>Positive target:</strong> The loss is negative log of the predicted positive probability.</li><li><strong>Negative target:</strong> The loss is negative log of one minus that probability.</li><li><strong>Comparison:</strong> For target 1, probability 0.01 is penalized much more than 0.9.</li></ul><div class=\"formula\">\\[p=0.9:\\; -\\log(0.9)\\approx0.105\\qquad p=0.01:\\; -\\log(0.01)\\approx4.605\\]</div><p><strong>Remember:</strong> Be wrong with high confidence, pay a large loss.</p>"
      ],
      [
        "How do I avoid log(0) when computing BCE?",
        "<p>Avoid log of zero by clipping probabilities or using a stable logits-based loss.</p><ul><li><strong>Probability inputs:</strong> Clip away from exactly zero and one before taking logarithms.</li><li><strong>Raw scores:</strong> Prefer a stable BCE-with-logits calculation during training.</li><li><strong>Numerics:</strong> Stable formulations avoid extreme sigmoid values causing numerical problems.</li></ul><div class=\"formula\">\\[\\ell(z,y)=\\max(z,0)-yz+\\log(1+e^{-|z|})\\]</div><p><strong>Remember:</strong> Use stable loss calculations rather than taking log of zero.</p>"
      ],
      [
        "How do I calculate MSE and BCE for a batch in NumPy?",
        "<p>Calculate MSE from numerical residuals and BCE from binary-label probabilities.</p><ol><li><strong>MSE:</strong> Square numerical prediction errors and average them.</li><li><strong>BCE:</strong> Average negative log-probabilities assigned to the correct labels.</li><li><strong>Stability:</strong> Clip probabilities in this simple demonstration before applying logarithms.</li></ol><pre><code class=\"language-python\">import numpy as np\n\ny = np.array([2., 4.])\npred = np.array([3., 2.])\nprint(np.mean((pred - y) ** 2))  # 2.5\n\nlabels = np.array([1., 0.])\np = np.clip(np.array([0.9, 0.2]), 1e-12, 1 - 1e-12)\nbce = -np.mean(labels * np.log(p) + (1-labels) * np.log1p(-p))\nprint(round(bce, 3))  # 0.164</code></pre><p><strong>Remember:</strong> Numerical targets use squared errors; binary probabilities use log loss.</p>"
      ]
    ]
  },
  {
    "title": "Regularization - Ridge (L2) and Lasso (L1)",
    "questions": [
      [
        "What is regularization, and how does Ridge (L2) apply it?",
        "<p>Regularization penalizes model complexity; Ridge applies a squared-coefficient penalty.</p><ul><li><strong>Penalty:</strong> Add the sum of squared weights multiplied by a strength parameter.</li><li><strong>Effect:</strong> Shrink coefficients toward zero, usually without making them exactly zero.</li><li><strong>Practice:</strong> Scale features and tune strength using validation data; the intercept is usually excluded.</li></ul><div class=\"formula\">\\[J_{\\mathrm{Ridge}}=\\operatorname{MSE}+\\lambda\\sum_{j=1}^{p}w_j^2\\]</div><p><strong>Symbols:</strong> Lambda sets penalty strength; w contains feature coefficients.</p><p><strong>Remember:</strong> Ridge shrinks weights to reduce sensitivity and overfitting.</p>"
      ],
      [
        "What is Lasso regression (L1 regularization)?",
        "<p>Lasso regularization adds an absolute-coefficient penalty to the training loss.</p><ul><li><strong>Penalty:</strong> Add the sum of absolute weights multiplied by a strength parameter.</li><li><strong>Sparsity:</strong> Some coefficients can become exactly zero, selecting features.</li><li><strong>Tradeoff:</strong> Excessive regularization can cause underfitting; the intercept is usually excluded.</li></ul><div class=\"formula\">\\[J_{\\mathrm{Lasso}}=\\operatorname{MSE}+\\lambda\\sum_{j=1}^{p}|w_j|\\]</div><p><strong>Symbols:</strong> Lambda sets penalty strength; w contains feature coefficients.</p><p><strong>Remember:</strong> Lasso can shrink some features out of the model.</p>"
      ],
      [
        "What is the difference between Ridge and Lasso?",
        "<p>Ridge uses squared weights; Lasso uses absolute weights and can produce sparse models.</p><ul><li><strong>Ridge:</strong> Typically shrinks coefficients without eliminating them.</li><li><strong>Lasso:</strong> Can set coefficients exactly to zero.</li><li><strong>Selection:</strong> Scale features and choose penalty strength using validation data.</li></ul><div class=\"table-wrap\"><table><thead><tr><th></th><th>Ridge (L2)</th><th>Lasso (L1)</th></tr></thead><tbody><tr><th>Penalty</th><td>\\(\\sum_j w_j^2\\)</td><td>\\(\\sum_j |w_j|\\)</td></tr><tr><th>Coefficients</th><td>Shrinks toward zero</td><td>Can become exactly zero</td></tr><tr><th>Feature selection</th><td>Typically retains all features</td><td>Can remove features</td></tr></tbody></table></div><p><strong>Remember:</strong> Ridge shrinks; Lasso can also remove.</p>"
      ],
      [
        "What changes when the regularization strength increases?",
        "<p>Stronger regularization puts more emphasis on keeping model coefficients small.</p><ul><li><strong>Ridge:</strong> Usually shrinks weights without making them exactly zero.</li><li><strong>Lasso:</strong> Can drive some weights exactly to zero.</li><li><strong>Tradeoff:</strong> Too much penalty can underfit; zero strength removes the penalty.</li></ul><p><strong>Remember:</strong> More penalty means less freedom to fit.</p>"
      ],
      [
        "Why should features be scaled before Ridge or Lasso?",
        "<p>Scale features before Ridge or Lasso so feature units do not distort coefficient penalties.</p><ul><li><strong>Units:</strong> The same information expressed in different units needs different weights.</li><li><strong>Penalty:</strong> Unequal scales can make equally useful features receive unequal penalties.</li><li><strong>Preprocessing:</strong> Fit the scaler on training data inside the fitting pipeline.</li></ul><p><strong>Remember:</strong> Comparable scales make coefficient penalties more comparable.</p>"
      ],
      [
        "How do I calculate the L1 and L2 penalties for weights [3, 4]?",
        "<p>For weights 3 and 4, the L1 penalty sum is 7 and the L2 penalty sum is 25.</p><ul><li><strong>L1:</strong> Add absolute values: 3 plus 4 equals 7.</li><li><strong>L2:</strong> Add squares: 9 plus 16 equals 25.</li><li><strong>Objective:</strong> With MSE 2 and strength 0.1, Lasso gives 2.7 and Ridge gives 4.5.</li></ul><div class=\"formula\">\\[J_{\\mathrm{Ridge}}=2+0.1(3^2+4^2)=4.5\\]\\[J_{\\mathrm{Lasso}}=2+0.1(|3|+|4|)=2.7\\]</div><p><strong>Remember:</strong> Penalty values at fixed weights do not tell which model generalizes better.</p>"
      ],
      [
        "How do I fit Ridge and Lasso with feature scaling in scikit-learn?",
        "<p>Use a pipeline to fit feature scaling and Ridge or Lasso together.</p><ol><li><strong>Prepare:</strong> Build a StandardScaler and regression-estimator pipeline.</li><li><strong>Fit:</strong> Let the pipeline learn scaling statistics only from training data.</li><li><strong>Evaluate:</strong> Tune each model separately; equal alpha values need not mean equal objective scaling.</li></ol><pre><code class=\"language-python\">from sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import Ridge, Lasso\n\nX = [[1, 2], [2, 1], [3, 4], [4, 3], [5, 6], [6, 5]]\ny = [3, 4, 7, 8, 11, 12]\n\nfor estimator in [Ridge(alpha=1.0), Lasso(alpha=0.1)]:\n    model = make_pipeline(StandardScaler(), estimator)\n    model.fit(X, y)\n    print(type(estimator).__name__, model.predict([[7, 6]]))</code></pre><p><strong>Remember:</strong> Keep learned preprocessing inside the training procedure.</p>"
      ]
    ]
  },
  {
    "title": "Multi-class classification - One-vs-Rest",
    "questions": [
      [
        "What is One-vs-Rest, and how does it extend binary classification?",
        "<p>One-vs-Rest extends binary classification by training one classifier for each class.</p><ul><li><strong>Training:</strong> Each classifier separates its own class from all remaining classes.</li><li><strong>Count:</strong> K classes require K binary classifiers.</li><li><strong>Prediction:</strong> For a single-label task, choose the class with the highest score.</li></ul><p><strong>Remember:</strong> One class versus every other class, repeated K times.</p>"
      ],
      [
        "How are training labels created for each One-vs-Rest classifier?",
        "<p>Each One-vs-Rest classifier receives a binary target for its own class.</p><ul><li><strong>Cat model:</strong> Cat is 1; Dog and Bird are 0.</li><li><strong>Dog model:</strong> Dog is 1; Cat and Bird are 0.</li><li><strong>Bird model:</strong> Bird is 1; Cat and Dog are 0.</li></ul><p><strong>Remember:</strong> Same inputs, different positive class for each model.</p>"
      ],
      [
        "How does One-vs-Rest choose a class from scores 0.7, 0.2, and 0.4?",
        "<p>Choose the class with the largest One-vs-Rest score for a single-label prediction.</p><ul><li><strong>Scores:</strong> Cat = 0.7, Dog = 0.2, Bird = 0.4.</li><li><strong>Decision:</strong> Predict Cat because 0.7 is the highest score.</li><li><strong>Probabilities:</strong> Independent sigmoid outputs do not have to sum to one.</li></ul><p><strong>Remember:</strong> Pick the highest score, not every class above 0.5.</p>"
      ],
      [
        "Must One-vs-Rest sigmoid outputs sum to 1?",
        "<p>Independent One-vs-Rest sigmoid outputs do not need to sum to one.</p><ul><li><strong>Independence:</strong> Each classifier solves its own binary problem.</li><li><strong>Single-label prediction:</strong> Choose the class with the highest score.</li><li><strong>Library output:</strong> Some implementations normalize reported probabilities; distinguish these from raw outputs.</li></ul><div class=\"formula\">\\[\\hat y=\\operatorname*{arg\\,max}_{k\\in\\{1,\\ldots,K\\}}s_k(x)\\]</div><p><strong>Remember:</strong> Independent binary probabilities are not automatically a normalized class distribution.</p>"
      ],
      [
        "How do I train One-vs-Rest logistic classifiers in scikit-learn?",
        "<p>Wrap logistic regression in OneVsRestClassifier and fit it inside a scaling pipeline.</p><ol><li><strong>Split:</strong> Keep a held-out test set separate from training.</li><li><strong>Train:</strong> Fit scaling and binary classifiers using only training data.</li><li><strong>Evaluate:</strong> Predict labels and measure performance on the held-out examples.</li></ol><pre><code class=\"language-python\">from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.multiclass import OneVsRestClassifier\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\n\nX, y = load_iris(return_X_y=True)\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, stratify=y, random_state=42)\nmodel = make_pipeline(StandardScaler(),\n    OneVsRestClassifier(LogisticRegression(max_iter=1000)))\nmodel.fit(X_train, y_train)\nprint(model.predict(X_test[:3]))\nprint(model.score(X_test, y_test))</code></pre><p><strong>Remember:</strong> One binary logistic model per class; test after training.</p>"
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
