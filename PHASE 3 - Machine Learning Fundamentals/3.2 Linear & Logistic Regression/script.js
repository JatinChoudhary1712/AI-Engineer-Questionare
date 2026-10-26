const topics = [
  {
    "title": "Linear regression",
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
      ]
    ]
  },
  {
    "title": "Logistic regression",
    "questions": [
      [
        "What is logistic regression, and how does it perform binary classification?",
        "<p>Logistic regression estimates the probability of one of two classes, such as spam (1) or not spam (0).</p><p>It computes a linear score \\(z=b+\\mathbf{w}^{\\mathsf T}\\mathbf{x}\\) and passes it through a sigmoid. Predict class 1 when the resulting probability reaches a chosen threshold, commonly 0.5; otherwise predict class 0.</p><p class=\"example\">If the spam probability is 0.8 and the threshold is 0.5, the prediction is spam.</p>"
      ],
      [
        "What is the sigmoid function?",
        "<p>The sigmoid converts a real-valued score into an output between 0 and 1, used as the estimated positive-class probability.</p><div class=\"formula\">\\[\\sigma(z) = \\frac{1}{1+e^{-z}}\\]</div><p>At \\(z=0\\), the output is 0.5. Large positive scores approach 1, and large negative scores approach 0.</p>"
      ]
    ]
  },
  {
    "title": "Cost functions",
    "questions": [
      [
        "What is Mean Squared Error (MSE)?",
        "<p>MSE is the average squared difference between predicted and actual numerical values. It is commonly used to train linear regression.</p><div class=\"formula\">\\[\\operatorname{MSE}=\\frac{1}{n}\\sum_{i=1}^{n}(\\hat{y}_i-y_i)^2\\]</div><p class=\"example\">Actual values [2, 4], predictions [3, 2]: \\(\\operatorname{MSE}=\\frac{1+4}{2}=2.5\\).</p><p>Squaring makes large errors contribute more strongly.</p>"
      ],
      [
        "What is Binary Cross-Entropy (BCE)?",
        "<p>BCE measures the error of predicted probabilities for binary labels. It is the standard loss for binary logistic regression.</p><div class=\"formula\">\\[\\operatorname{BCE}=-\\frac{1}{n}\\sum_{i=1}^{n}\\left[y_i\\log(p_i)+(1-y_i)\\log(1-p_i)\\right]\\]</div><p>\\(y_i\\) is 0 or 1, and \\(p_i\\) is the predicted probability of class 1. Lower is better; confident wrong predictions receive large penalties.</p><p class=\"example\">For \\(y=1\\) and \\(p=0.9\\), loss \\(=-\\log(0.9)\\approx 0.105\\), using natural logarithms.</p>"
      ]
    ]
  },
  {
    "title": "Regularization: Ridge & Lasso",
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
      ]
    ]
  },
  {
    "title": "One-vs-Rest classification",
    "questions": [
      [
        "How does One-vs-Rest (OvR) handle multiclass classification?",
        "<p>For K classes, train K binary classifiers. Each classifier treats its own class as positive and every other class as negative.</p><p>At prediction time, obtain a score from each model and select the highest-scoring class for a single-label prediction.</p>"
      ],
      [
        "Can you give an example of One-vs-Rest?",
        "<p>For Cat, Dog, and Bird, train three models:</p><ul><li>Cat vs Dog and Bird.</li><li>Dog vs Cat and Bird.</li><li>Bird vs Cat and Dog.</li></ul><p class=\"example\">If their positive-class scores are Cat = 0.7, Dog = 0.2, and Bird = 0.4, predict <strong>Cat</strong>.</p><p>Independent sigmoid outputs do not necessarily sum to 1.</p>"
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
  document.querySelector('#count').textContent = `${visible} of ${entries.length} questions · Click a question to reveal its answer`;
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
  renderMathInElement(questions, {
    delimiters: [
      { left: '\\[', right: '\\]', display: true },
      { left: '\\(', right: '\\)', display: false }
    ],
    throwOnError: false
  });
} else {
  document.querySelector('#math-status').hidden = false;
}
