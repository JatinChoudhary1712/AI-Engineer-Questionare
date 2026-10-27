const topics = [
  { title: 'Learning paradigms', questions: [
    ['What is machine learning?', '<p>Machine learning uses data to learn patterns that help a system make predictions or decisions, instead of explicitly programming every rule.</p><p class="example"><strong>Example:</strong> A spam classifier learns patterns from emails so it can classify new messages.</p>'],
    ['What is supervised learning?', '<p>Supervised learning trains a model on examples containing <strong>input features (X)</strong> and a known <strong>target or label (y)</strong>. The model learns a mapping from inputs to targets.</p><ul><li><strong>Classification:</strong> predict a category, such as spam or not spam.</li><li><strong>Regression:</strong> predict a numerical value, such as a house price.</li></ul>'],
    ['What is unsupervised learning?', '<p>Unsupervised learning discovers structure in data without supplied target labels.</p><ul><li><strong>Clustering:</strong> group customers with similar behavior.</li><li><strong>Dimensionality reduction:</strong> represent many features using fewer dimensions, for example with PCA.</li></ul><p>The discovered groups do not automatically have meaningful business labels; they need interpretation.</p>'],
    ['What is reinforcement learning?', '<p>In reinforcement learning, an <strong>agent</strong> takes actions in an <strong>environment</strong>, receives rewards, and learns a <strong>policy</strong> to maximize expected cumulative reward.</p><p class="example"><strong>Example:</strong> A game-playing agent chooses moves and learns from outcomes. A useful action may have a delayed reward.</p><p><strong>Exploration</strong> tries actions to learn more; <strong>exploitation</strong> uses actions already expected to work well.</p>'],
    ['How do supervised, unsupervised, and reinforcement learning differ?', '<div class="table-wrap"><table><thead><tr><th>Paradigm</th><th>Learning signal</th><th>Typical goal</th></tr></thead><tbody><tr><td>Supervised</td><td>Known target labels</td><td>Predict labels or values</td></tr><tr><td>Unsupervised</td><td>Structure in unlabeled data</td><td>Find groups or representations</td></tr><tr><td>Reinforcement</td><td>Rewards from interactions</td><td>Learn a sequence of decisions</td></tr></tbody></table></div><p>Real systems may combine these approaches.</p>'],
    ['Which learning approach fits these examples?', '<ul><li><strong>Predict a sale price using past labeled sales:</strong> supervised regression.</li><li><strong>Identify fraudulent transactions using fraud labels:</strong> supervised classification.</li><li><strong>Group articles without category labels:</strong> unsupervised clustering.</li><li><strong>Teach a robot actions using rewards:</strong> reinforcement learning.</li></ul><p>Choose based on the available feedback and objective, not just the application name.</p>']
  ]},
  { title: 'Data splits', questions: [
    ['What are training, validation, and test sets?', '<ul><li><strong>Training set:</strong> used to fit model parameters.</li><li><strong>Validation set:</strong> used to select models, tune hyperparameters, choose thresholds, or decide when to stop training.</li><li><strong>Test set:</strong> held aside to evaluate the final selected procedure on unseen data.</li></ul><p>The test set should not influence model selection.</p>'],
    ['What split ratio should I use?', '<p>Common starting points are <strong>70/15/15</strong> or <strong>80/10/10</strong> for training/validation/test. There is no universally best ratio.</p><p>Choose enough validation and test examples to estimate performance reliably, including important classes and groups. Small datasets may benefit from cross-validation within the training portion.</p>'],
    ['What is data leakage, and how can I avoid it?', '<p>Data leakage happens when training or model selection uses information that would not be available at prediction time, making evaluation overly optimistic.</p><ul><li>Fit scalers, imputers, feature selection, and similar learned preprocessing only on training data.</li><li>Keep duplicates and related records from crossing splits when they would leak information.</li><li>Do not use future information or target-derived features unavailable at prediction time.</li></ul><p>During cross-validation, fit preprocessing separately inside each training fold, ideally through a pipeline.</p>'],
    ['When should I use stratified, group, or time-based splits?', '<ul><li><strong>Stratified:</strong> approximately preserve class proportions for classification.</li><li><strong>Group-based:</strong> keep records from the same patient, customer, or device together when evaluating generalization to new groups.</li><li><strong>Time-based:</strong> train on earlier observations and evaluate on later ones for future prediction.</li></ul><p>A random split is suitable only when its assumptions match how the model will be used.</p>'],
    ['Why should I avoid repeatedly checking the test set?', '<p>If test results guide changes, you indirectly tune to the test set. It becomes part of model selection and no longer provides a clean final estimate.</p><p>Use validation data or cross-validation for iteration. Evaluate the frozen procedure on the test set; if you tune using those results, a fresh untouched evaluation set is needed for an independent assessment.</p>']
  ]},
  { title: 'Overfitting & underfitting', questions: [
    ['What is overfitting?', '<p>Overfitting occurs when a model learns noise or training-specific patterns that do not generalize well.</p><p class="example"><strong>Typical sign:</strong> 99% training accuracy but 75% validation accuracy on comparable data. A gap is a warning, not proof: leakage, distribution differences, or small samples can also affect results.</p>'],
    ['What is underfitting?', '<p>Underfitting occurs when the learned model fails to capture important patterns, giving poor performance on both training and validation data.</p><p class="example"><strong>Example:</strong> Fitting a straight line to a strongly curved relationship can underfit.</p><p>Causes include insufficient model flexibility, weak features, excessive regularization, or incomplete optimization.</p>'],
    ['How can I reduce overfitting?', '<ul><li>Collect more representative data or apply appropriate data augmentation.</li><li>Use stronger regularization or a less complex model.</li><li>Apply early stopping using validation performance.</li><li>Remove noisy features or use suitable feature selection within the training procedure.</li><li>Consider methods such as bagging that can reduce variance.</li></ul><p>Choose changes using validation results, not test results.</p>'],
    ['How can I reduce underfitting?', '<ul><li>Use a more expressive model or better features.</li><li>Reduce excessive regularization.</li><li>Check optimization settings and train longer if fitting has not converged.</li><li>Verify feature quality and target correctness.</li></ul><p>More training data alone usually does not fix a model that cannot represent the underlying relationship.</p>'],
    ['How do learning curves reveal fitting problems?', '<p>Learning curves track training and validation performance as training size or training progress changes.</p><ul><li><strong>Both errors high and close:</strong> investigate underfitting, feature quality, or noise.</li><li><strong>Low training error but much higher validation error:</strong> investigate overfitting or a mismatch between splits.</li><li><strong>Validation loss rises while training loss falls over epochs:</strong> an early-stopping point may have been passed.</li></ul><p>Interpret curves using a suitable baseline and consistent metrics.</p>']
  ]},
  { title: 'Bias–variance tradeoff', questions: [
    ['What is bias in machine learning?', '<p><strong>Bias</strong> is systematic error introduced by the assumptions or limitations of a learning procedure. A high-bias model can miss important relationships and underfit.</p><p class="example"><strong>Example:</strong> A linear model without suitable transformed features cannot represent a complex nonlinear pattern.</p><p>This statistical meaning is distinct from social bias or fairness.</p>'],
    ['What is variance in machine learning?', '<p><strong>Variance</strong> describes how much a learned prediction changes when the model is trained on different samples from the same data-generating process.</p><p>A highly flexible model may closely fit one training sample but produce very different predictions when trained on another. High variance is often associated with overfitting.</p>'],
    ['What is the bias–variance tradeoff?', '<p>Increasing model flexibility often reduces bias but increases variance. The goal is good performance on unseen data, balancing these sources of error.</p><p class="formula">Expected squared prediction error = Bias² + Variance + Irreducible noise</p><p>This classic decomposition applies under the usual squared-error regression assumptions. It is not a universal formula for every metric. Modern models may show more complex behavior than a simple U-shaped error curve.</p>'],
    ['How does regularization affect bias and variance?', '<p>Regularization discourages overly complex or extreme fitted solutions. Increasing regularization typically <strong>increases bias</strong> and <strong>reduces variance</strong>.</p><p>Too little can permit overfitting; too much can cause underfitting. Select its strength using validation data or cross-validation.</p><p class="example"><strong>Examples:</strong> L1/L2 penalties in regression and limiting a decision tree’s depth.</p>']
  ]},
  { title: 'Cross-validation', questions: [
    ['How does k-fold cross-validation work?', '<ol><li>Divide development data into k folds.</li><li>Train on k − 1 folds and evaluate on the remaining fold.</li><li>Repeat k times so each fold is used for validation once.</li><li>Summarize the validation scores, often using their mean and standard deviation.</li></ol><p>Keep a final test set outside this process when using cross-validation for tuning. After selection, refit the chosen pipeline on all development data.</p>'],
    ['Can you explain 5-fold cross-validation with an example?', '<p>With 1,000 development examples, split them into five folds of 200. Each run trains on 800 and validates on 200, using a different validation fold each time.</p><p class="formula">Scores: 0.80, 0.82, 0.79, 0.84, 0.85 → Mean = 0.82</p><p>Each example is used for validation once and training four times. Report variability too; fold scores are correlated, so their standard deviation is not automatically a confidence interval.</p>'],
    ['How should I choose k?', '<p><strong>5 or 10</strong> are common starting points. More folds use a larger fraction of data for each training run but require more computation; they do not guarantee a more reliable estimate.</p><p>Choose k based on dataset size, compute budget, and split constraints. Stratified folds need enough examples of rare classes. Leave-one-out uses k equal to the number of examples and can be expensive.</p>'],
    ['When is ordinary k-fold inappropriate?', '<p>Ordinary k-fold can give misleading results when observations are dependent or ordered.</p><ul><li>Use <strong>group-aware folds</strong> for related records when evaluating new groups.</li><li>Use <strong>time-aware or rolling splits</strong> for forecasting; avoid training on the future to predict the past.</li><li>Use <strong>stratified folds</strong> when preserving classification proportions is appropriate.</li></ul><p>Preprocessing must still be fitted separately inside each training fold.</p>'],
    ['What is nested cross-validation?', '<p>Nested cross-validation separates tuning from evaluation: an <strong>inner loop</strong> selects hyperparameters, while an <strong>outer loop</strong> evaluates the entire selection procedure.</p><p>It reduces the optimistic bias of reporting the same cross-validation score used to choose the best configuration, at the cost of more training runs.</p>']
  ]},
  { title: 'Evaluation metrics', questions: [
    ['What are TP, TN, FP, and FN?', '<p>First define the <strong>positive class</strong>, such as “fraud.” For binary classification:</p><div class="table-wrap"><table><thead><tr><th></th><th>Actually positive</th><th>Actually negative</th></tr></thead><tbody><tr><th>Predicted positive</th><td>True positive (TP)</td><td>False positive (FP)</td></tr><tr><th>Predicted negative</th><td>False negative (FN)</td><td>True negative (TN)</td></tr></tbody></table></div><p>A false positive is a false alarm; a false negative is a missed positive case.</p>'],
    ['What is accuracy, and when is it misleading?', '<p>Accuracy is the fraction of predictions that are correct.</p><p class="formula">Accuracy = (TP + TN) / (TP + TN + FP + FN)</p><p class="example"><strong>Example:</strong> If 990 of 1,000 transactions are legitimate, predicting “legitimate” every time gives 99% accuracy while catching no fraud.</p><p>Accuracy is most useful when class proportions and error costs make the overall correct fraction meaningful.</p>'],
    ['What is precision?', '<p>Precision answers: <strong>Of the examples predicted positive, how many were actually positive?</strong></p><p class="formula">Precision = TP / (TP + FP)</p><p class="example">If 50 emails are flagged as spam and 40 are truly spam, precision is 40/50 = <strong>80%</strong>.</p><p>Prioritize precision when false positives are costly, such as flagging legitimate emails as spam.</p>'],
    ['What is recall?', '<p>Recall, also called sensitivity or true positive rate, answers: <strong>Of all actual positives, how many did the model find?</strong></p><p class="formula">Recall = TP / (TP + FN)</p><p class="example">If there are 100 fraudulent transactions and the model detects 80, recall is 80/100 = <strong>80%</strong>.</p><p>Prioritize recall when missing positive cases is costly, while checking the resulting false positives.</p>'],
    ['What is the F1 score?', '<p>F1 is the <strong>harmonic mean</strong> of precision and recall. It is high only when both are high.</p><p class="formula">F1 = 2 × Precision × Recall / (Precision + Recall)<br>F1 = 2TP / (2TP + FP + FN)</p><p class="example">Precision = 0.80 and recall = 0.50 gives F1 ≈ <strong>0.615</strong>.</p><p>F1 ignores true negatives and does not encode every business cost. Use it when precision and recall both matter.</p>'],
    ['How does the decision threshold affect precision and recall?', '<p>A classifier may predict positive when its score is at least a threshold, such as 0.5.</p><ul><li><strong>Lower the threshold:</strong> predict more positives; recall cannot decrease on a fixed dataset, while false positives may increase.</li><li><strong>Raise the threshold:</strong> predict fewer positives; recall cannot increase, and precision often improves.</li></ul><p>Precision is not guaranteed to change monotonically. Choose the threshold using validation data and the costs or constraints of the task.</p>'],
    ['What are the ROC curve and AUC-ROC?', '<p>The <strong>ROC curve</strong> plots true positive rate against false positive rate across decision thresholds.</p><p class="formula">TPR = Recall = TP / (TP + FN)<br>FPR = FP / (FP + TN)</p><p><strong>AUC-ROC</strong> is the area under this curve. An AUC of 1 means perfect ranking; random ranking has expected AUC 0.5. Below 0.5 indicates ranking worse than random in the chosen score direction.</p><p>AUC can be interpreted as the probability that a randomly chosen positive scores above a randomly chosen negative, counting ties as half. Compute it from scores or probabilities, not just hard class labels. It measures ranking, not probability calibration.</p>'],
    ['Is AUC-ROC enough for an imbalanced dataset?', '<p>No. With many negatives, a small false positive rate can still mean many false alarms. A high ROC-AUC does not guarantee useful precision at the threshold you deploy.</p><p>Also inspect the <strong>precision–recall curve</strong>, average precision (a common PR summary), the confusion matrix, and precision/recall at a chosen threshold. Average precision and trapezoidal PR-AUC use different calculations and should not be treated as identical.</p>'],
    ['Can you calculate all threshold-based metrics from one example?', '<p>Suppose TP = 40, FP = 10, FN = 20, TN = 130, for 200 predictions.</p><ul><li><strong>Accuracy:</strong> (40 + 130)/200 = 85%.</li><li><strong>Precision:</strong> 40/(40 + 10) = 80%.</li><li><strong>Recall:</strong> 40/(40 + 20) ≈ 66.7%.</li><li><strong>F1:</strong> 80/(80 + 10 + 20) ≈ 72.7%.</li><li><strong>False positive rate:</strong> 10/(10 + 130) ≈ 7.1%.</li></ul><p>You cannot recover a full score-based ROC-AUC from this single confusion matrix; you need prediction scores across thresholds.</p>'],
    ['How do macro, micro, and weighted averages differ?', '<p>For multiclass classification, precision, recall, and F1 can be computed per class by treating that class as positive and the others as negative.</p><ul><li><strong>Macro:</strong> average the per-class metric equally; highlights rare-class performance.</li><li><strong>Weighted:</strong> average per-class metrics using each class’s number of actual examples; common classes dominate.</li><li><strong>Micro:</strong> pool TP, FP, and FN across classes before calculating the metric.</li></ul><p>In single-label multiclass classification over all classes, micro precision, recall, and F1 equal accuracy. Macro F1 is the mean of per-class F1 scores, not generally the F1 of macro precision and recall.</p>'],
    ['What if a metric has a zero denominator?', '<p>Precision is undefined if there are no predicted positives; recall is undefined if there are no actual positives. F1 has a zero denominator if TP, FP, and FN are all zero.</p><p>Libraries may return zero, NaN, or a warning depending on settings. State your convention and inspect class counts. Binary ROC-AUC is undefined when the evaluation set contains only one class.</p>'],
    ['How do I choose the right evaluation metric?', '<ul><li><strong>Overall correctness with suitable class balance and error costs:</strong> accuracy.</li><li><strong>Limit false alarms:</strong> precision, often with a minimum recall requirement.</li><li><strong>Catch positive cases:</strong> recall, often with a precision or capacity constraint.</li><li><strong>Balance precision and recall:</strong> F1.</li><li><strong>Compare ranking across thresholds:</strong> ROC-AUC, supplemented by PR metrics for rare positives.</li></ul><p>These are classification metrics. Regression usually needs measures such as MAE or RMSE. Always connect evaluation to the real objective and report relevant per-class or group results.</p>']
  ]}
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
