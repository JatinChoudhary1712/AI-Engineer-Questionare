const topics = [
  {
    "title": "Grid search and random search",
    "questions": [
      [
        "What is hyperparameter tuning, and how is it different from learning weights?",
        "<p>Hyperparameter tuning compares model or training configurations using validation results. Grid search and random search are two ways to choose which configurations to try.</p><p><strong>Parameters</strong> are learned during training, such as neural-network weights. <strong>Hyperparameters</strong> configure the model or training process, such as learning rate, batch size, layer count, and maximum epochs.</p><p>Tuning compares configurations using validation performance; it does not directly learn the model weights.</p>"
      ],
      [
        "How does grid search choose configurations?",
        "<p>Define a finite list of values for each hyperparameter. Grid search evaluates every combination in that grid.</p><p>For max_depth = [3, 5] and min_samples_leaf = [1, 4], it tries (3, 1), (3, 4), (5, 1), and (5, 4). It finds the best evaluated combination under the chosen metric, not necessarily the best possible configuration.</p>"
      ],
      [
        "How does random search differ from grid search?",
        "<p>Random search samples configurations from specified lists or distributions. Its trial count controls the search budget instead of requiring every combination.</p><p>It can explore more distinct values along important dimensions when only a few hyperparameters strongly affect results. It can still miss good regions; random sampling is not a guarantee of improvement.</p>"
      ],
      [
        "How many model fits does a grid search require?",
        "<p>Multiply the number of choices for each hyperparameter, then multiply by the number of cross-validation folds.</p><div class=\"formula\">\\[N_{\\mathrm{fits}}=\\left(\\prod_{j=1}^{p}m_j\\right)k\\]</div><p>With 3 learning rates, 4 batch sizes, 2 layer counts, and 5 folds: \\(3\\times4\\times2\\times5=120\\) fits. Refitting the winner on all development data adds one more fit.</p>"
      ],
      [
        "When should I use grid search versus random search?",
        "<p><strong>Grid search:</strong> a small, deliberately chosen set of configurations or a narrow follow-up search.</p><p><strong>Random search:</strong> a larger space with a limited trial budget. Start broadly, then narrow the ranges based on validation results.</p><p>Compare candidates with the same metric, data splits, and a clearly defined training budget.</p>"
      ],
      [
        "Which data should tuning use, and how do I avoid leakage?",
        "<p>Fit candidates on training folds and compare them on validation folds. Keep the final test set out of configuration selection.</p><p>Any learned preprocessing, such as scaling, must be fitted inside each training fold, usually through a pipeline. Do not scale all data before cross-validation.</p><p>If you repeatedly tune to a validation score, it can become optimistic. Use an untouched test set for the final selected procedure.</p>"
      ],
      [
        "How do I run grid search and random search in scikit-learn?",
        "<p>Both searches use the same development data, folds, and accuracy metric. The held-out test data is not used to pick a winner.</p><pre><code class=\"language-python\">from sklearn.datasets import load_iris\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.model_selection import (\n    train_test_split, StratifiedKFold,\n    GridSearchCV, RandomizedSearchCV)\n\nX, y = load_iris(return_X_y=True)\nX_dev, X_test, y_dev, y_test = train_test_split(\n    X, y, test_size=0.2, stratify=y, random_state=42)\ncv = StratifiedKFold(n_splits=3, shuffle=True, random_state=42)\nspace = {\"max_depth\": [2, 4, None],\n         \"min_samples_leaf\": [1, 3]}\nmodel = RandomForestClassifier(n_estimators=50, random_state=42)\n\nsearches = [\n    GridSearchCV(model, space, cv=cv, scoring=\"accuracy\"),\n    RandomizedSearchCV(model, space, n_iter=4, cv=cv,\n                       scoring=\"accuracy\", random_state=42),\n]\nfor search in searches:\n    search.fit(X_dev, y_dev)\n    print(type(search).__name__, search.best_params_,\n          search.best_score_)\n# Pick the procedure using development results before testing.</code></pre><p><a href=\"https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.GridSearchCV.html\" target=\"_blank\" rel=\"noopener noreferrer\">GridSearchCV</a> / <a href=\"https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.RandomizedSearchCV.html\" target=\"_blank\" rel=\"noopener noreferrer\">RandomizedSearchCV</a></p>"
      ]
    ]
  },
  {
    "title": "Bayesian optimization",
    "questions": [
      [
        "What is Bayesian optimization in hyperparameter tuning?",
        "<p>Bayesian optimization is a sequential search method that learns from completed trials to decide what to try next. Its aim is to find good configurations with fewer expensive evaluations.</p><p>It uses previous configurations and their validation scores to guide the next choice, instead of drawing every trial independently.</p><p>A probabilistic model or density estimate describes promising regions. A selection rule balances trying likely improvements with exploring uncertain regions.</p>"
      ],
      [
        "What are the surrogate model and acquisition function?",
        "<p>The <strong>surrogate</strong> is a cheaper model of how validation performance changes across configurations. A Gaussian process is one common choice.</p><p>An <strong>acquisition function</strong>, such as expected improvement, ranks possible trials using predicted performance and uncertainty. Optimize that rule to select the next expensive training run.</p><p>Not every Bayesian-style optimizer uses a Gaussian process; TPE uses a different density-based formulation.</p>"
      ],
      [
        "What is exploration versus exploitation in tuning?",
        "<p><strong>Exploitation:</strong> try configurations near regions that already scored well. <strong>Exploration:</strong> test less-known regions that might be better.</p><p>Only exploiting can miss a better region. Only exploring can waste an expensive training budget. Bayesian methods use observed results to balance the two.</p>"
      ],
      [
        "Why can Bayesian optimization help when training is expensive?",
        "<p>It spends computation on selecting promising trials to reduce the number of costly model fits. This is useful when each trial takes substantial time.</p><p>It is not guaranteed to beat random search. Noisy scores, a poorly chosen search space, or a tiny budget can limit its advantage. Surrogate fitting and candidate selection also have a cost.</p>"
      ],
      [
        "How does TPE differ from independent random sampling?",
        "<p>TPE separates previous trials into better and remaining groups, then models the parameter distributions associated with them. New suggestions favor values more associated with the better group.</p><p>Startup trials may use random sampling before enough observations exist. Set the objective direction correctly: maximize accuracy, but minimize a loss.</p><p><a href=\"https://optuna.readthedocs.io/en/stable/reference/samplers/generated/optuna.samplers.TPESampler.html\" target=\"_blank\" rel=\"noopener noreferrer\">Reference: Optuna TPESampler</a></p>"
      ],
      [
        "How do I tune a model using Optuna TPE?",
        "<p>The objective returns mean cross-validation accuracy. Each trial builds a fresh model, and the same folds are reused for comparison. Requires optuna and scikit-learn.</p><pre><code class=\"language-python\">import optuna\nfrom sklearn.datasets import load_iris\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.model_selection import (\n    train_test_split, StratifiedKFold, cross_val_score)\n\nX, y = load_iris(return_X_y=True)\nX_dev, X_test, y_dev, y_test = train_test_split(\n    X, y, test_size=0.2, stratify=y, random_state=42)\ncv = StratifiedKFold(n_splits=3, shuffle=True, random_state=42)\n\ndef objective(trial):\n    model = RandomForestClassifier(\n        n_estimators=50, random_state=42,\n        max_depth=trial.suggest_int(\"max_depth\", 2, 10),\n        min_samples_leaf=trial.suggest_int(\"min_samples_leaf\", 1, 5))\n    return cross_val_score(\n        model, X_dev, y_dev, cv=cv, scoring=\"accuracy\").mean()\n\nstudy = optuna.create_study(\n    direction=\"maximize\", sampler=optuna.samplers.TPESampler(seed=42))\nstudy.optimize(objective, n_trials=20)\nprint(study.best_params, study.best_value)\n# X_test and y_test remain untouched during tuning.</code></pre>"
      ]
    ]
  },
  {
    "title": "Learning rate, batch size, epochs, and layers",
    "questions": [
      [
        "What do learning rate, batch size, epochs, and layers control?",
        "<p>Learning rate sets the update scale; batch size sets how many examples contribute to a batch gradient; epochs set the training duration; and layers define network depth. These choices interact, so changing one can affect how the others behave.</p><p>The learning rate scales an optimizer's parameter update. For basic gradient descent:</p><div class=\"formula\">\\[\\theta_{t+1}=\\theta_t-\\alpha\\nabla J(\\theta_t)\\]</div><p>Too large a value can make training unstable; too small a value can make progress slow. A useful value depends on the optimizer, data, architecture, and batch size.</p>"
      ],
      [
        "What does batch size change during training?",
        "<p>Batch size is the number of examples used for one gradient estimate. With ordinary mini-batch training and no gradient accumulation, the optimizer updates after each batch.</p><p>Smaller batches usually give noisier estimates and need less memory. Larger batches use more memory and may improve hardware throughput. Neither guarantees better generalization.</p>"
      ],
      [
        "What is an epoch, and how is it different from a training step?",
        "<p>An <strong>epoch</strong> usually means one pass through the training examples. A <strong>step</strong> processes one batch, typically followed by an optimizer update.</p><p>With a finite array dataset, batch size controls how many steps occur per epoch. Streaming datasets or explicitly configured steps_per_epoch can change this relationship.</p>"
      ],
      [
        "How do layer count and layer width affect a neural network?",
        "<p><strong>Layer count</strong> controls depth; <strong>width</strong> controls the number of units in a layer. Both influence capacity, parameter count, memory use, and training cost.</p><p>Adding layers does not guarantee better validation performance. It can make optimization harder or increase overfitting. Compare architectures with a consistent evaluation setup.</p>"
      ],
      [
        "How many updates occur for 1,000 examples, batch size 128, and 10 epochs?",
        "<p>If the last partial batch is kept and there is one update per batch:</p><div class=\"formula\">\\[\\text{steps per epoch}=\\lceil1000/128\\rceil=8\\]\\[\\text{total updates}=8\\times10=80\\]</div><p>The last batch has 104 examples. Dropping that batch gives 7 steps per epoch. Gradient accumulation can also change the number of optimizer updates.</p>"
      ],
      [
        "Why search learning rates on a logarithmic scale?",
        "<p>Useful learning rates often differ by orders of magnitude. Values such as 0.0001, 0.001, and 0.01 explore multiplicative changes rather than evenly spaced tiny changes.</p><p>A log-uniform range gives equal opportunity to each order of magnitude. Choose bounds appropriate to the optimizer; these example values are not universal settings.</p>"
      ],
      [
        "Why should batch size and learning rate be tuned together?",
        "<p>Changing batch size changes gradient noise and the number of updates per epoch. A learning rate that works for one batch size can behave differently for another.</p><p>For the same 1,000 examples, batch sizes 100 and 250 give 10 and 4 updates per epoch. Equal epoch counts therefore do not mean equal update counts or compute budgets.</p>"
      ],
      [
        "How should maximum epochs interact with hyperparameter tuning?",
        "<p>Maximum epochs sets a training cap, not a requirement to use every epoch. Combine a reasonable cap with a consistent early-stopping policy.</p><p>A configuration stopped too soon may look worse simply because it learns more slowly. Record actual epochs or updates and validation scores when comparing different learning rates or architectures.</p><p><a href=\"https://keras.io/api/models/model_training_apis/\" target=\"_blank\" rel=\"noopener noreferrer\">Reference: Keras training APIs</a></p>"
      ]
    ]
  },
  {
    "title": "Early stopping",
    "questions": [
      [
        "What is early stopping, and what does it monitor?",
        "<p>Early stopping chooses when to end training based on a monitored result, usually validation performance, instead of always running the maximum number of epochs.</p><p>Early stopping watches a metric during training and stops when it fails to improve for a configured period. Monitoring validation loss helps choose a useful stopping point without waiting for the maximum epochs.</p><p>It can reduce wasted training and limit overfitting. It does not guarantee the best possible model.</p>"
      ],
      [
        "Why monitor validation loss rather than only training loss?",
        "<p>Training loss can keep falling while validation loss rises. Monitoring only training loss can therefore miss worsening performance on unseen examples.</p><p>Validation data must remain outside gradient updates. Do not use the final test set for early stopping: that would make it part of model selection.</p>"
      ],
      [
        "What do patience, min_delta, and mode mean?",
        "<ul><li><strong>patience:</strong> how many monitored epochs without improvement to tolerate.</li><li><strong>min_delta:</strong> the minimum absolute change counted as an improvement in Keras.</li><li><strong>mode:</strong> whether improvement means a decrease or increase. Use min for loss and max for accuracy.</li></ul><p>A small improvement that does not exceed min_delta does not reset patience.</p>"
      ],
      [
        "When would patience = 2 stop this validation-loss sequence?",
        "<p>Suppose validation losses are [0.60, 0.50, 0.51, 0.52], mode is min, min_delta is 0, and monitoring starts at the first epoch.</p><p>Epoch 2 is the best. Epochs 3 and 4 fail to improve, so patience = 2 triggers stopping after epoch 4. Best-weight restoration selects the weights from epoch 2.</p>"
      ],
      [
        "Why restore the best weights instead of keeping the final weights?",
        "<p>The last monitored epoch can be worse than the best one because training continues during the patience window. Restoring best weights keeps the earlier, better checkpoint.</p><p>In Keras, set restore_best_weights=True explicitly. Otherwise the model keeps its final weights.</p>"
      ],
      [
        "How is early stopping different from reducing the learning rate?",
        "<p><strong>Early stopping:</strong> ends training when the monitored metric stalls.</p><p><strong>Learning-rate reduction:</strong> makes smaller updates and allows training to continue. These can be combined; give the reduced learning rate enough time to affect validation performance before stopping.</p>"
      ],
      [
        "How do I apply early stopping to a small Keras network?",
        "<p>This synthetic binary-classification example sets the learning rate, batch size, maximum epochs, and two hidden layers. It uses explicit training and validation arrays. Requires Keras with a configured backend and scikit-learn.</p><pre><code class=\"language-python\">import keras\nfrom sklearn.datasets import make_classification\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import StandardScaler\n\nkeras.utils.set_random_seed(42)\nX, y = make_classification(\n    n_samples=800, n_features=20, random_state=42)\nX_train, X_val, y_train, y_val = train_test_split(\n    X, y, test_size=0.2, stratify=y, random_state=42)\nscaler = StandardScaler().fit(X_train)\nX_train = scaler.transform(X_train)\nX_val = scaler.transform(X_val)\n\nmodel = keras.Sequential([\n    keras.Input(shape=(20,)),\n    keras.layers.Dense(32, activation=\"relu\"),\n    keras.layers.Dense(16, activation=\"relu\"),\n    keras.layers.Dense(1, activation=\"sigmoid\"),\n])\nmodel.compile(optimizer=keras.optimizers.Adam(learning_rate=1e-3),\n              loss=\"binary_crossentropy\")\nstop = keras.callbacks.EarlyStopping(\n    monitor=\"val_loss\", mode=\"min\", patience=5,\n    min_delta=1e-4, restore_best_weights=True)\nhistory = model.fit(\n    X_train, y_train, validation_data=(X_val, y_val),\n    batch_size=32, epochs=100, callbacks=[stop], verbose=0)\nprint(\"Epochs run:\", len(history.history[\"loss\"]))</code></pre><p><a href=\"https://keras.io/api/callbacks/early_stopping/\" target=\"_blank\" rel=\"noopener noreferrer\">Reference: Keras EarlyStopping</a></p>"
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
