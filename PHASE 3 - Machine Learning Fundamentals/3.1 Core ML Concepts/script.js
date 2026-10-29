const topics = [
  {
    "title": "Learning paradigms",
    "questions": [
      [
        "What is machine learning?",
        "<p>Machine learning learns patterns from data to make predictions or decisions.</p><ul><li><strong>Training:</strong> Examples help a model learn patterns.</li><li><strong>Generalization:</strong> The model should work on new data.</li><li><strong>Goal:</strong> Solve a task without hand-writing every rule.</li></ul><p class=\"example\"><strong>Example:</strong> A spam filter learns from past emails and classifies new messages.</p><p><strong>Remember:</strong> Learn patterns, then apply them to new examples.</p>"
      ],
      [
        "What is supervised learning?",
        "<p>Supervised learning learns an input-to-output mapping from labeled examples.</p><ul><li><strong>Labels:</strong> Each training input has a known target.</li><li><strong>Classification:</strong> Predict a category, such as spam or not spam.</li><li><strong>Regression:</strong> Predict a number, such as a house price.</li></ul><p class=\"example\">Examples: spam vs not spam (classification), predicting house prices (regression).</p><p><strong>Remember:</strong> Supervised means learning with known answers.</p>"
      ],
      [
        "What is unsupervised learning?",
        "<p>Unsupervised learning finds structure in data without target labels.</p><ul><li><strong>Clustering:</strong> Group similar examples together.</li><li><strong>Dimensionality reduction:</strong> Represent data using fewer features.</li><li><strong>Interpretation:</strong> Discovered groups need human interpretation.</li></ul><p class=\"example\"><strong>Example:</strong> Group customers by similar purchasing behavior.</p><p><strong>Remember:</strong> No target labels; discover the structure.</p>"
      ],
      [
        "What is reinforcement learning?",
        "<p>Reinforcement learning trains an agent to choose actions through rewards from an environment.</p><ul><li><strong>Interaction:</strong> Actions affect the environment and future observations.</li><li><strong>Reward:</strong> Feedback signals how useful an action or outcome is.</li><li><strong>Objective:</strong> Maximize expected cumulative reward, including delayed rewards.</li></ul><p class=\"example\"><strong>Example:</strong> A game-playing agent learns moves that improve its chance of winning.</p><p><strong>Remember:</strong> Act, observe rewards, and improve the policy.</p>"
      ],
      [
        "How do supervised, unsupervised, and reinforcement learning differ?",
        "<p>The three approaches differ in the feedback used for learning.</p><ul><li><strong>Supervised:</strong> Learn from known input-output pairs.</li><li><strong>Unsupervised:</strong> Discover patterns without target labels.</li><li><strong>Reinforcement:</strong> Learn actions from rewards over time.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Learning approach</th><th scope=\"col\">Data or feedback</th><th scope=\"col\">Goal</th></tr></thead><tbody><tr><th scope=\"row\">Supervised</th><td><strong>Labeled data</strong></td><td>Predict the correct output</td></tr><tr><th scope=\"row\">Unsupervised</th><td><strong>Unlabeled data</strong></td><td>Find patterns or groups</td></tr><tr><th scope=\"row\">Reinforcement</th><td><strong>Rewards through trial and error</strong></td><td><strong>Maximize long-term reward</strong></td></tr></tbody></table></div><p><strong>Remember:</strong> Labels teach predictions; structure reveals groups; rewards guide actions.</p>"
      ],
      [
        "Which learning approach fits these examples?",
        "<p>Choose the approach by checking the available feedback and task objective.</p><ul><li><strong>Known targets:</strong> Use supervised learning for prediction.</li><li><strong>No targets:</strong> Use unsupervised learning to explore structure.</li><li><strong>Actions and rewards:</strong> Use reinforcement learning for sequential decisions.</li></ul><p class=\"example\"><strong>Example:</strong> No specific scenarios were supplied; apply these rules to each scenario.</p><p><strong>Remember:</strong> Check the feedback before choosing the approach.</p>"
      ]
    ]
  },
  {
    "title": "Data splits",
    "questions": [
      [
        "Why split data into training, validation, and test sets?",
        "<p>Training, validation, and test sets separate learning, selection, and final evaluation.</p><ul><li><strong>Training set:</strong> Fit model parameters.</li><li><strong>Validation set:</strong> Tune hyperparameters and compare models.</li><li><strong>Test set:</strong> Evaluate the final selected procedure on unseen data.</li></ul><p><strong>Remember:</strong> Train to learn, validate to choose, test to evaluate.</p>"
      ],
      [
        "What split ratio should I use?",
        "<p>Choose a split ratio that leaves enough examples for reliable training and evaluation.</p><ul><li><strong>Starting points:</strong> 70/15/15 or 80/10/10 often work as initial choices.</li><li><strong>Large datasets:</strong> Smaller validation and test percentages may be sufficient.</li><li><strong>Small datasets:</strong> Cross-validation can use limited development data more effectively.</li></ul><p><strong>Remember:</strong> Enough representative examples matter more than a fixed ratio.</p>"
      ],
      [
        "What is data leakage, and how can I avoid it?",
        "<p>Data leakage is using information during training or selection that would be unavailable at prediction time.</p><ul><li><strong>Split first:</strong> Fit scalers, imputers, and feature selection only on training data.</li><li><strong>Use pipelines:</strong> Refit learned preprocessing inside each training fold.</li><li><strong>Check features:</strong> Remove future information and keep related records from leaking across splits.</li></ul><p class=\"example\"><strong>Example:</strong> Scaling the full dataset before splitting exposes training to test-set information.</p><p><strong>Remember:</strong> Train using only information available when predictions are made.</p>"
      ],
      [
        "When should I use stratified, group, or time-based splits?",
        "<p>Choose stratified, group, or time-based splits to match the data and deployment task.</p><ul><li><strong>Stratified:</strong> Approximately preserve class proportions across splits.</li><li><strong>Group:</strong> Keep related rows together when evaluating on new entities.</li><li><strong>Time-based:</strong> Train on earlier data and evaluate on later data.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Split type</th><th scope=\"col\">When to use it</th><th scope=\"col\">How to split</th></tr></thead><tbody><tr><th scope=\"row\">Stratified</th><td>When classes are imbalanced</td><td>Keep the <strong>same class ratio</strong> in each split.</td></tr><tr><th scope=\"row\">Group</th><td>When one entity has many rows (same patient, user, or document)</td><td>Keep the <strong>whole group in one split only</strong>.</td></tr><tr><th scope=\"row\">Time-based</th><td>When data has time order (forecasting, logs)</td><td><strong>Train on the past and test on the future</strong>.</td></tr></tbody></table></div><p><strong>Remember:</strong> Preserve classes, separate entities, respect time.</p>"
      ],
      [
        "Why should I avoid repeatedly checking the test set?",
        "<p>Repeatedly changing a model after checking test results turns the test set into tuning data.</p><ul><li><strong>Selection:</strong> Use validation data or cross-validation for iteration.</li><li><strong>Optimism:</strong> Test-guided changes can inflate the reported final score.</li><li><strong>Final check:</strong> Evaluate after freezing the procedure; reuse requires a fresh independent test.</li></ul><p><strong>Remember:</strong> If test results guide changes, they are no longer an independent check.</p>"
      ]
    ]
  },
  {
    "title": "Overfitting & underfitting",
    "questions": [
      [
        "What is overfitting, and how does it differ from underfitting?",
        "<p>Overfitting learns training-specific details; underfitting fails to capture enough of the underlying pattern.</p><ul><li><strong>Overfitting:</strong> Training performance is strong but unseen-data performance is worse.</li><li><strong>Underfitting:</strong> Both training and unseen-data performance are poor.</li><li><strong>Diagnosis:</strong> Compare with a baseline; a performance gap alone is not proof.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Concept</th><th scope=\"col\">What happens</th><th scope=\"col\">Training score</th><th scope=\"col\">Test score</th></tr></thead><tbody><tr><th scope=\"row\"><strong>Overfitting</strong></th><td>The model learns the training data too well, <strong>including noise</strong>.</td><td>High</td><td>Low</td></tr><tr><th scope=\"row\"><strong>Underfitting</strong></th><td>The model is <strong>too simple to learn the pattern</strong>.</td><td>Low</td><td>Low</td></tr></tbody></table></div><p><strong>Remember:</strong> Overfit learns noise; underfit misses signal.</p>"
      ],
      [
        "What is underfitting?",
        "<p>Underfitting happens when a model fails to capture important patterns even in its training data.</p><ul><li><strong>Capacity:</strong> An overly restricted model may be too simple.</li><li><strong>Training:</strong> Insufficient optimization can also cause underfitting.</li><li><strong>Bias:</strong> High bias is commonly associated with underfitting.</li></ul><p class=\"example\"><strong>Example:</strong> A straight line cannot fit a strongly curved relationship without suitable features.</p><p><strong>Remember:</strong> Missing the training pattern suggests underfitting.</p>"
      ],
      [
        "How do learning curves reveal fitting problems?",
        "<p>Learning curves compare training and validation performance as data size or training progress changes.</p><ul><li><strong>Large gap:</strong> Strong training but weak validation performance suggests overfitting.</li><li><strong>Both poor:</strong> Similar poor scores suggest underfitting or weak features.</li><li><strong>Loss trend:</strong> Falling training loss with rising validation loss suggests worsening generalization.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Curve pattern</th><th scope=\"col\">Meaning</th></tr></thead><tbody><tr><th scope=\"row\">Big gap: training high, validation low</th><td><strong>Overfitting</strong></td></tr><tr><th scope=\"row\">Both low and close together</th><td><strong>Underfitting</strong></td></tr><tr><th scope=\"row\">Both high and close together</th><td><strong>Good fit</strong></td></tr></tbody></table></div><p><strong>Remember:</strong> Compare both curves using the same metric and a baseline.</p>"
      ],
      [
        "How can I reduce overfitting?",
        "<p>Reduce overfitting by limiting training-specific learning and improving generalization.</p><ul><li><strong>Data:</strong> Add representative examples or appropriate augmentation.</li><li><strong>Complexity:</strong> Simplify the model or increase regularization.</li><li><strong>Selection:</strong> Use validation-based early stopping and remove noisy features within training.</li></ul><p><strong>Remember:</strong> Less noise fitting, better unseen-data performance.</p>"
      ],
      [
        "How can I reduce underfitting?",
        "<p>Reduce underfitting by helping the model learn more of the real pattern.</p><ul><li><strong>Capacity:</strong> Use a more expressive model or better features.</li><li><strong>Regularization:</strong> Reduce an overly strong penalty.</li><li><strong>Optimization:</strong> Train longer or adjust optimization if fitting has not converged.</li></ul><p><strong>Remember:</strong> Increase useful learning capacity, then check validation performance.</p>"
      ]
    ]
  },
  {
    "title": "Bias–variance tradeoff",
    "questions": [
      [
        "What is bias, and how does it relate to variance?",
        "<p>Bias is systematic prediction error; variance is sensitivity to the training sample.</p><ul><li><strong>Bias:</strong> Restrictive assumptions can miss real patterns; high bias often causes underfitting.</li><li><strong>Variance:</strong> Predictions vary across training samples; high variance often accompanies overfitting.</li><li><strong>Tradeoff:</strong> More flexibility often lowers bias but raises variance.</li></ul><p><strong>Remember:</strong> High bias: misses patterns. High variance: fits sample-specific details.</p>"
      ],
      [
        "What is variance in machine learning?",
        "<p>Variance measures how much predictions change across different training samples from the same data source.</p><ul><li><strong>Sensitivity:</strong> A high-variance model responds strongly to sample-specific details.</li><li><strong>Overfitting:</strong> It may learn noise and perform much better on training data.</li><li><strong>Reduction:</strong> More representative data, regularization, or averaging can reduce variance.</li></ul><p><strong>Remember:</strong> High variance means unstable predictions and a risk of overfitting.</p>"
      ],
      [
        "What is the bias–variance tradeoff?",
        "<p>The bias-variance tradeoff balances systematic error against sensitivity to training data.</p><ul><li><strong>Simple models:</strong> Often have higher bias and lower variance.</li><li><strong>Flexible models:</strong> Often have lower bias and higher variance.</li><li><strong>Objective:</strong> Minimize unseen-data error; the pattern is not universal for every model.</li></ul><p class=\"formula\"><strong>Formula:</strong> Expected squared prediction error = Bias squared + Variance + Irreducible noise. This decomposition assumes squared-error regression.</p><p><strong>Remember:</strong> Balance missed patterns against unstable predictions.</p>"
      ],
      [
        "How does regularization affect bias and variance?",
        "<p>Regularization constrains fitting and typically increases bias while reducing variance.</p><ul><li><strong>Benefit:</strong> Less sensitivity to training noise can reduce overfitting.</li><li><strong>Cost:</strong> Strong constraints may prevent learning real patterns.</li><li><strong>Selection:</strong> Tune regularization on validation data; too much can underfit.</li></ul><p><strong>Remember:</strong> A stronger constraint trades flexibility for stability.</p>"
      ]
    ]
  },
  {
    "title": "Cross-validation",
    "questions": [
      [
        "What is cross-validation, and how does k-fold work?",
        "<p>Cross-validation evaluates a learning procedure over several training-validation splits.</p><ol><li><strong>Split:</strong> Divide development data into k folds.</li><li><strong>Rotate:</strong> Train on k minus one folds and validate on the remaining fold.</li><li><strong>Summarize:</strong> Repeat for all folds and report the mean and variability.</li></ol><p><strong>Remember:</strong> Each fold takes a turn as validation data.</p>"
      ],
      [
        "Can you explain 5-fold cross-validation with an example?",
        "<p>In 5-fold cross-validation, five runs each validate on a different fifth of the data.</p><ol><li><strong>Divide:</strong> Split 100 examples into five folds of 20.</li><li><strong>Rotate:</strong> Each run trains on 80 and validates on 20; every example validates once.</li><li><strong>Average:</strong> Scores 0.82, 0.85, 0.80, 0.84, 0.83 have mean 0.828, about 0.83.</li></ol><p><strong>Remember:</strong> Five folds give five validation scores, not five independent test sets.</p>"
      ],
      [
        "How should I choose k?",
        "<p>Choose k based on data size, computing budget, and split constraints.</p><ul><li><strong>Starting point:</strong> Five or ten folds are common choices.</li><li><strong>Cost:</strong> More folds require more training runs.</li><li><strong>Reliability:</strong> Larger k does not guarantee a more reliable estimate; respect rare classes and groups.</li></ul><p><strong>Remember:</strong> Choose useful folds, not simply the largest k.</p>"
      ],
      [
        "When is ordinary k-fold inappropriate?",
        "<p>Ordinary k-fold is inappropriate when its splits violate data dependencies or evaluation needs.</p><ul><li><strong>Time series:</strong> Use time-aware splits to avoid learning from the future.</li><li><strong>Related entities:</strong> Use group-aware folds to keep an entity out of both sides.</li><li><strong>Class imbalance:</strong> Stratified folds can preserve class proportions when appropriate.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Data</th><th scope=\"col\">Why ordinary k-fold is inappropriate</th><th scope=\"col\">Use instead</th></tr></thead><tbody><tr><th scope=\"row\">Time series</th><td>It would use the future to predict the past.</td><td><strong>Time-series split</strong></td></tr><tr><th scope=\"row\">Grouped data</th><td>The same user could appear in training and test data.</td><td><strong>Group k-fold</strong></td></tr><tr><th scope=\"row\">Imbalanced classes</th><td>Folds may have different class proportions.</td><td><strong>Stratified k-fold</strong></td></tr></tbody></table></div><p><strong>Remember:</strong> Choose folds that match real prediction conditions.</p>"
      ],
      [
        "What is nested cross-validation?",
        "<p>Nested cross-validation separates hyperparameter selection from performance estimation.</p><ul><li><strong>Inner loop:</strong> Select configurations using inner validation folds.</li><li><strong>Outer loop:</strong> Evaluate the complete selection procedure on held-out outer folds.</li><li><strong>Tradeoff:</strong> This reduces selection bias but needs more model fits.</li></ul><p><strong>Remember:</strong> Inner chooses; outer evaluates.</p>"
      ]
    ]
  },
  {
    "title": "Evaluation metrics",
    "questions": [
      [
        "What do classification metrics measure, and what are TP, TN, FP, and FN?",
        "<p>Classification metrics measure different types of correct and incorrect class predictions.</p><ul><li><strong>Correct outcomes:</strong> TP is an actual positive predicted positive; TN is an actual negative predicted negative.</li><li><strong>False positive:</strong> FP is a negative incorrectly predicted positive, a false alarm.</li><li><strong>False negative:</strong> FN is a positive incorrectly predicted negative, a missed case.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Outcome</th><th scope=\"col\">Prediction</th><th scope=\"col\">Reality</th><th scope=\"col\">Meaning</th></tr></thead><tbody><tr><th scope=\"row\">TP (true positive)</th><td>Positive</td><td>Positive</td><td><strong>Correct positive</strong></td></tr><tr><th scope=\"row\">TN (true negative)</th><td>Negative</td><td>Negative</td><td><strong>Correct negative</strong></td></tr><tr><th scope=\"row\">FP (false positive)</th><td>Positive</td><td>Negative</td><td><strong>False alarm</strong></td></tr><tr><th scope=\"row\">FN (false negative)</th><td>Negative</td><td>Positive</td><td><strong>Missed case</strong></td></tr></tbody></table></div><p><strong>Remember:</strong> Define the positive class before counting TP, TN, FP, and FN.</p>"
      ],
      [
        "What is accuracy, and when is it misleading?",
        "<p>Accuracy is the proportion of all predictions that are correct.</p><ul><li><strong>Calculation:</strong> Divide correct predictions by the total number of examples.</li><li><strong>Limitation:</strong> A majority-class predictor can score highly on imbalanced data.</li><li><strong>Use:</strong> Check class balance and error costs before relying on accuracy.</li></ul><p class=\"formula\">Accuracy = (TP + TN) / total.</p><p class=\"example\"><strong>Example:</strong> If 99% of emails are legitimate, always predicting legitimate gets 99% accuracy but catches no spam.</p><p><strong>Remember:</strong> High accuracy can hide failure on the minority class.</p>"
      ],
      [
        "What is precision?",
        "<p>Precision is the proportion of predicted positives that are actually positive.</p><ul><li><strong>Focus:</strong> Start with the examples the model flagged positive.</li><li><strong>Error:</strong> False positives lower precision.</li><li><strong>Use:</strong> Prioritize precision when false alarms are costly.</li></ul><p class=\"formula\">Precision = TP / (TP + FP).</p><p class=\"example\"><strong>Example:</strong> A spam filter flags 50 emails and 40 are spam: precision is 40/50 = 80%.</p><p><strong>Remember:</strong> Precision asks: of those flagged, how many were correct?</p>"
      ],
      [
        "What is recall?",
        "<p>Recall is the proportion of actual positives that the model finds.</p><ul><li><strong>Focus:</strong> Start with all genuinely positive examples.</li><li><strong>Error:</strong> False negatives lower recall.</li><li><strong>Use:</strong> Prioritize recall when missing a positive case is costly.</li></ul><p class=\"formula\">Recall = TP / (TP + FN).</p><p class=\"example\"><strong>Example:</strong> Finding 80 of 100 fraudulent transactions gives recall of 80%.</p><p><strong>Remember:</strong> Recall asks: of all positives, how many were found?</p>"
      ],
      [
        "What is the F1 score?",
        "<p>F1 is the harmonic mean of precision and recall.</p><ul><li><strong>Balance:</strong> A high F1 requires both precision and recall to be high.</li><li><strong>Limitation:</strong> F1 ignores true negatives and does not encode every error cost.</li><li><strong>Use:</strong> Compare precision-recall balance at a chosen decision threshold.</li></ul><p class=\"formula\">F1 = 2 × (precision × recall) / (precision + recall).</p><p class=\"example\"><strong>Example:</strong> Precision 0.80 and recall 0.50 give F1 approximately 0.615.</p><p><strong>Remember:</strong> F1 rewards finding positives accurately and thoroughly.</p>"
      ],
      [
        "Can you calculate all threshold-based metrics from one example?",
        "<p>One confusion matrix gives classification metrics at a single decision threshold.</p><ul><li><strong>Counts:</strong> TP = 40, FP = 10, FN = 20, TN = 130; total = 200.</li><li><strong>Results:</strong> Accuracy = 0.85, precision = 0.80, recall approximately 0.667.</li><li><strong>Limits:</strong> F1 approximately 0.727; score-based ROC-AUC needs more than one confusion matrix.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Metric</th><th scope=\"col\">Calculation</th><th scope=\"col\">Result</th></tr></thead><tbody><tr><th scope=\"row\">Accuracy</th><td>(40 + 130) / 200</td><td>0.85</td></tr><tr><th scope=\"row\">Precision</th><td>40 / 50</td><td>0.80</td></tr><tr><th scope=\"row\">Recall</th><td>40 / 60</td><td>0.667</td></tr><tr><th scope=\"row\">F1</th><td>2 &times; 0.80 &times; 0.667 / (0.80 + 0.667)</td><td>0.727</td></tr><tr><th scope=\"row\">Specificity</th><td>130 / 140</td><td>0.929</td></tr><tr><th scope=\"row\">False positive rate</th><td>10 / 140</td><td>0.071</td></tr></tbody></table></div><p><strong>Remember:</strong> Counts give threshold-specific metrics; scores give ranking metrics.</p>"
      ],
      [
        "How does the decision threshold affect precision and recall?",
        "<p>The threshold controls which prediction scores count as positive.</p><ul><li><strong>Lower threshold:</strong> Predict more positives; recall cannot decrease on a fixed dataset.</li><li><strong>Higher threshold:</strong> Predict fewer positives; recall cannot increase on a fixed dataset.</li><li><strong>Precision:</strong> Often improves with a higher threshold, but this is not guaranteed.</li></ul><p><strong>Remember:</strong> Thresholds change decisions; choose them using validation data.</p>"
      ],
      [
        "What are the ROC curve and AUC-ROC?",
        "<p>ROC plots true positive rate against false positive rate across thresholds; AUC summarizes ranking quality.</p><ul><li><strong>Axes:</strong> True positive rate is recall; false positive rate is FP divided by FP plus TN.</li><li><strong>Interpretation:</strong> AUC 1 means perfect ranking; random ranking has expected AUC 0.5.</li><li><strong>Inputs:</strong> Use prediction scores or probabilities, not just hard class labels.</li></ul><p class=\"formula\"><strong>Formula:</strong> True positive rate = TP / (TP + FN); false positive rate = FP / (FP + TN).</p><p><strong>Remember:</strong> ROC-AUC measures ranking across thresholds, not probability calibration.</p>"
      ],
      [
        "Is AUC-ROC enough for an imbalanced dataset?",
        "<p>ROC-AUC alone can hide poor precision when positives are rare.</p><ul><li><strong>False alarms:</strong> A small false positive rate can still represent many incorrect alerts.</li><li><strong>Alternatives:</strong> Inspect precision-recall curves, average precision, and chosen-threshold metrics.</li><li><strong>Reporting:</strong> Average precision and trapezoidal PR-AUC are different summaries.</li></ul><p><strong>Remember:</strong> For rare positives, check how many alerts are actually useful.</p>"
      ],
      [
        "What if a metric has a zero denominator?",
        "<p>A metric with a zero denominator is mathematically undefined.</p><ul><li><strong>Precision:</strong> Undefined when there are no predicted positives.</li><li><strong>Recall:</strong> Undefined when there are no actual positives.</li><li><strong>Handling:</strong> Report the convention explicitly; zero_division controls relevant scikit-learn outputs.</li></ul><p><strong>Remember:</strong> Check the class counts before interpreting an undefined score.</p>"
      ],
      [
        "How do macro, micro, and weighted averages differ?",
        "<p>Macro, micro, and weighted averages combine per-class metrics in different ways.</p><ul><li><strong>Macro:</strong> Average class metrics equally, emphasizing performance across classes.</li><li><strong>Micro:</strong> Pool TP, FP, and FN first, then compute the metric.</li><li><strong>Weighted:</strong> Average class metrics according to each class's support.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Average</th><th scope=\"col\">How it is calculated</th><th scope=\"col\">Effect</th></tr></thead><tbody><tr><th scope=\"row\">Macro</th><td>Calculate the metric per class and take a simple average.</td><td><strong>All classes count equally</strong>.</td></tr><tr><th scope=\"row\">Micro</th><td><strong>Pool all TP, FP, FN</strong> across classes and calculate once.</td><td>Big classes dominate.</td></tr><tr><th scope=\"row\">Weighted</th><td>Average per-class metrics <strong>weighted by class size</strong>.</td><td>Larger classes receive more weight.</td></tr></tbody></table></div><p><strong>Remember:</strong> Macro treats classes equally; micro pools counts; weighted uses class size.</p>"
      ],
      [
        "How do I choose the right evaluation metric?",
        "<p>Choose evaluation metrics according to the real costs and goals of predictions.</p><ul><li><strong>False alarms:</strong> Use precision when incorrect alerts are costly.</li><li><strong>Missed positives:</strong> Use recall when missing cases is costly.</li><li><strong>Broader evaluation:</strong> Use F1 for precision-recall balance, ranking metrics for scores, and macro metrics for equal class weight.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Situation</th><th scope=\"col\">Metric</th></tr></thead><tbody><tr><th scope=\"row\">Balanced classes</th><td>accuracy is fine</td></tr><tr><th scope=\"row\">False alarms costly</th><td><strong>precision</strong></td></tr><tr><th scope=\"row\">Missing cases costly</th><td><strong>recall</strong></td></tr><tr><th scope=\"row\">Need a balance on imbalanced data</th><td>F1 or <strong>PR-AUC</strong></td></tr><tr><th scope=\"row\">Ranking quality across thresholds</th><td>ROC-<strong>AUC</strong></td></tr><tr><th scope=\"row\">Multi-class with rare classes</th><td><strong>macro F1</strong></td></tr></tbody></table></div><p><strong>Remember:</strong> Match the metric to the mistake that matters.</p>"
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
