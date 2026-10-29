const topics = [
  {
    "title": "Grid search and random search",
    "questions": [
      [
        "What is hyperparameter tuning, and how is it different from learning weights?",
        "<p>Hyperparameter tuning selects model or training settings using validation performance.</p><ul><li><strong>Parameters:</strong> Weights are learned by the training algorithm.</li><li><strong>Hyperparameters:</strong> Settings such as learning rate and depth configure training or model capacity.</li><li><strong>Selection:</strong> Compare configurations without using the final test set.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Concept</th><th scope=\"col\">Explanation</th></tr></thead><tbody><tr><th scope=\"row\">Parameters</th><td>Weights are learned by the training algorithm.</td></tr><tr><th scope=\"row\">Hyperparameters</th><td>Settings such as learning rate and depth configure training or model capacity.</td></tr><tr><th scope=\"row\">Selection</th><td>Compare configurations without using the final test set.</td></tr></tbody></table></div><p><strong>Remember:</strong> Training learns weights; tuning chooses the settings.</p>"
      ],
      [
        "How does grid search choose configurations?",
        "<p>Grid search evaluates every combination in a predefined set of hyperparameter values.</p><ol><li><strong>Define:</strong> Specify candidate values for each setting.</li><li><strong>Combine:</strong> Form the Cartesian product of those values.</li><li><strong>Evaluate:</strong> Choose the best tested configuration using the selected validation metric.</li></ol><p class=\"example\"><strong>Example:</strong> Depth [3,5] and minimum leaf size [1,4] produce four configurations.</p><p><strong>Remember:</strong> Grid search covers the grid, not every possible configuration.</p>"
      ],
      [
        "How does random search differ from grid search?",
        "<p>Random search samples configurations instead of evaluating every grid combination.</p><ul><li><strong>Sampling:</strong> Draw values from specified lists or distributions.</li><li><strong>Budget:</strong> Set a trial count to control the number of evaluations.</li><li><strong>Tradeoff:</strong> It can explore a broad space efficiently but may miss good regions.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Concept</th><th scope=\"col\">Explanation</th></tr></thead><tbody><tr><th scope=\"row\">Sampling</th><td>Draw values from specified lists or distributions.</td></tr><tr><th scope=\"row\">Budget</th><td>Set a trial count to control the number of evaluations.</td></tr><tr><th scope=\"row\">Tradeoff</th><td>It can explore a broad space efficiently but may miss good regions.</td></tr></tbody></table></div><p><strong>Remember:</strong> Grid tries combinations systematically; random search spends a sampling budget.</p>"
      ],
      [
        "How many model fits does a grid search require?",
        "<p>Grid-search training cost equals the number of configurations times the number of folds.</p><ol><li><strong>Configurations:</strong> Multiply the number of choices for each hyperparameter.</li><li><strong>Cross-validation:</strong> Multiply configuration count by the fold count.</li><li><strong>Refit:</strong> Training the selected model on all development data adds another fit.</li></ol><div class=\"formula\">\\[N_{\\mathrm{fits}}=\\left(\\prod_{j=1}^{p}m_j\\right)k\\]</div><p class=\"example\"><strong>Example:</strong> Three learning rates, four batch sizes, two layer counts, and five folds require 3 x 4 x 2 x 5 = 120 fits, plus one refit if enabled.</p><p><strong>Remember:</strong> Count combinations, multiply by folds, then include refitting.</p>"
      ],
      [
        "When should I use grid search versus random search?",
        "<p>Use grid search for small focused spaces and random search for broader limited-budget exploration.</p><ul><li><strong>Grid search:</strong> Useful for a small set of deliberately chosen values.</li><li><strong>Random search:</strong> Useful when a large space cannot be exhaustively evaluated.</li><li><strong>Fairness:</strong> Compare configurations with consistent splits, metrics, and training budgets.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Concept</th><th scope=\"col\">Explanation</th></tr></thead><tbody><tr><th scope=\"row\">Grid search</th><td>Useful for a small set of deliberately chosen values.</td></tr><tr><th scope=\"row\">Random search</th><td>Useful when a large space cannot be exhaustively evaluated.</td></tr><tr><th scope=\"row\">Fairness</th><td>Compare configurations with consistent splits, metrics, and training budgets.</td></tr></tbody></table></div><p><strong>Remember:</strong> Small focused grid; broad budgeted random search.</p>"
      ],
      [
        "Which data should tuning use, and how do I avoid leakage?",
        "<p>Tuning should fit on training folds and select using validation folds, leaving test data untouched.</p><ul><li><strong>Preprocessing:</strong> Fit learned transformations inside each training fold.</li><li><strong>Selection:</strong> Compare hyperparameters using development-data results.</li><li><strong>Final evaluation:</strong> Use an untouched test set after choosing the procedure.</li></ul><p><strong>Remember:</strong> Training fits, validation chooses, test evaluates.</p>"
      ],
      [
        "How do I run grid search and random search in scikit-learn?",
        "<p>Run GridSearchCV and RandomizedSearchCV with the same data splits and scoring metric.</p><ol><li><strong>Prepare:</strong> Separate development data from a held-out test set.</li><li><strong>Search:</strong> Fit both search objects on development data with matching cross-validation folds.</li><li><strong>Select:</strong> Compare development results before using the final test data.</li></ol><pre><code class=\"language-python\">from sklearn.datasets import load_iris\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.model_selection import (\n    train_test_split, StratifiedKFold,\n    GridSearchCV, RandomizedSearchCV)\n\nX, y = load_iris(return_X_y=True)\nX_dev, X_test, y_dev, y_test = train_test_split(\n    X, y, test_size=0.2, stratify=y, random_state=42)\ncv = StratifiedKFold(n_splits=3, shuffle=True, random_state=42)\nspace = {\"max_depth\": [2, 4, None],\n         \"min_samples_leaf\": [1, 3]}\nmodel = RandomForestClassifier(n_estimators=50, random_state=42)\n\nsearches = [\n    GridSearchCV(model, space, cv=cv, scoring=\"accuracy\"),\n    RandomizedSearchCV(model, space, n_iter=4, cv=cv,\n                       scoring=\"accuracy\", random_state=42),\n]\nfor search in searches:\n    search.fit(X_dev, y_dev)\n    print(type(search).__name__, search.best_params_,\n          search.best_score_)\n# Pick the procedure using development results before testing.</code></pre><p><strong>Remember:</strong> Search on development data, never on the final test set.</p><p><a href=\"https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.GridSearchCV.html\" target=\"_blank\" rel=\"noopener noreferrer\">GridSearchCV</a> / <a href=\"https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.RandomizedSearchCV.html\" target=\"_blank\" rel=\"noopener noreferrer\">RandomizedSearchCV</a></p>"
      ]
    ]
  },
  {
    "title": "Bayesian optimization",
    "questions": [
      [
        "What is Bayesian optimization in hyperparameter tuning?",
        "<p>Bayesian optimization uses results from earlier trials to choose promising configurations.</p><ul><li><strong>History:</strong> Learn from evaluated settings and their validation scores.</li><li><strong>Model:</strong> Estimate which unexplored settings may perform well.</li><li><strong>Balance:</strong> Trade off promising regions against uncertain regions.</li></ul><p><strong>Remember:</strong> Use past trials to choose the next expensive trial.</p>"
      ],
      [
        "What are the surrogate model and acquisition function?",
        "<p>A surrogate estimates validation performance; an acquisition function chooses where to evaluate next.</p><ul><li><strong>Surrogate:</strong> A cheaper model of the relationship between settings and scores.</li><li><strong>Acquisition:</strong> Ranks candidates using predicted performance and uncertainty.</li><li><strong>Variants:</strong> Gaussian processes are common, while TPE uses a different density-based approach.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Concept</th><th scope=\"col\">Explanation</th></tr></thead><tbody><tr><th scope=\"row\">Surrogate</th><td>A cheaper model of the relationship between settings and scores.</td></tr><tr><th scope=\"row\">Acquisition</th><td>Ranks candidates using predicted performance and uncertainty.</td></tr><tr><th scope=\"row\">Variants</th><td>Gaussian processes are common, while TPE uses a different density-based approach.</td></tr></tbody></table></div><p><strong>Remember:</strong> Surrogate predicts; acquisition proposes.</p>"
      ],
      [
        "What is exploration versus exploitation in tuning?",
        "<p>Exploitation tests promising known regions; exploration investigates uncertain regions.</p><ul><li><strong>Exploitation:</strong> Refine settings near configurations that already performed well.</li><li><strong>Exploration:</strong> Try less-known areas that could contain better configurations.</li><li><strong>Balance:</strong> Using only one strategy can miss good results or waste trials.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Concept</th><th scope=\"col\">Explanation</th></tr></thead><tbody><tr><th scope=\"row\">Exploitation</th><td>Refine settings near configurations that already performed well.</td></tr><tr><th scope=\"row\">Exploration</th><td>Try less-known areas that could contain better configurations.</td></tr><tr><th scope=\"row\">Balance</th><td>Using only one strategy can miss good results or waste trials.</td></tr></tbody></table></div><p><strong>Remember:</strong> Exploit what looks good; explore what is uncertain.</p>"
      ],
      [
        "Why can Bayesian optimization help when training is expensive?",
        "<p>Bayesian optimization can reduce expensive model fits by choosing trials using previous results.</p><ul><li><strong>Benefit:</strong> Spend trials on configurations with a promising improvement opportunity.</li><li><strong>Overhead:</strong> Fitting the surrogate and selecting candidates also cost computation.</li><li><strong>Limits:</strong> Noise, poor search bounds, or a tiny budget can reduce its advantage.</li></ul><p><strong>Remember:</strong> Smarter trial selection can help, but improvement is not guaranteed.</p>"
      ],
      [
        "How does TPE differ from independent random sampling?",
        "<p>TPE guides new samples using parameter distributions from better and remaining trials.</p><ol><li><strong>Partition:</strong> Separate observed trials according to their objective values.</li><li><strong>Model:</strong> Estimate parameter distributions associated with the two groups.</li><li><strong>Suggest:</strong> Favor candidates associated with the better group; early trials may be random.</li></ol><p><strong>Remember:</strong> TPE learns where successful trials tend to occur.</p><p><a href=\"https://optuna.readthedocs.io/en/stable/reference/samplers/generated/optuna.samplers.TPESampler.html\" target=\"_blank\" rel=\"noopener noreferrer\">Reference: Optuna TPESampler</a></p>"
      ],
      [
        "How do I tune a model using Optuna TPE?",
        "<p>Use an Optuna objective that trains and validates a fresh model for every trial.</p><ol><li><strong>Suggest:</strong> Sample hyperparameters using the trial object.</li><li><strong>Evaluate:</strong> Return mean cross-validation performance with consistent folds.</li><li><strong>Optimize:</strong> Set the objective direction correctly and keep the final test data untouched.</li></ol><pre><code class=\"language-python\">import optuna\nfrom sklearn.datasets import load_iris\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.model_selection import (\n    train_test_split, StratifiedKFold, cross_val_score)\n\nX, y = load_iris(return_X_y=True)\nX_dev, X_test, y_dev, y_test = train_test_split(\n    X, y, test_size=0.2, stratify=y, random_state=42)\ncv = StratifiedKFold(n_splits=3, shuffle=True, random_state=42)\n\ndef objective(trial):\n    model = RandomForestClassifier(\n        n_estimators=50, random_state=42,\n        max_depth=trial.suggest_int(\"max_depth\", 2, 10),\n        min_samples_leaf=trial.suggest_int(\"min_samples_leaf\", 1, 5))\n    return cross_val_score(\n        model, X_dev, y_dev, cv=cv, scoring=\"accuracy\").mean()\n\nstudy = optuna.create_study(\n    direction=\"maximize\", sampler=optuna.samplers.TPESampler(seed=42))\nstudy.optimize(objective, n_trials=20)\nprint(study.best_params, study.best_value)\n# X_test and y_test remain untouched during tuning.</code></pre><p><strong>Remember:</strong> Each trial returns a validation score, not a test-set score.</p>"
      ]
    ]
  },
  {
    "title": "Learning rate, batch size, epochs, and layers",
    "questions": [
      [
        "What do learning rate, batch size, epochs, and layers control?",
        "<p>Learning rate, batch size, epochs, and layers control update size, gradient batches, training duration, and model depth.</p><ul><li><strong>Learning rate:</strong> Scales parameter updates; too large can destabilize training.</li><li><strong>Batch size:</strong> Sets examples per gradient estimate and affects memory and noise.</li><li><strong>Epochs and layers:</strong> Epochs limit passes through data; layers determine network depth and interact with capacity.</li></ul><div class=\"formula\">\\[\\theta_{t+1}=\\theta_t-\\alpha\\nabla J(\\theta_t)\\]</div><p><strong>Remember:</strong> Update size, batch size, training duration, and depth must work together.</p>"
      ],
      [
        "What does batch size change during training?",
        "<p>Batch size is the number of examples used in one batch-gradient estimate.</p><ul><li><strong>Small batches:</strong> Usually require less memory and produce noisier gradients.</li><li><strong>Large batches:</strong> Use more memory and may improve hardware throughput.</li><li><strong>Updates:</strong> Normally one update follows each batch; accumulation can change this.</li></ul><p><strong>Remember:</strong> Batch size changes memory, gradient noise, and updates per epoch.</p>"
      ],
      [
        "What is an epoch, and how is it different from a training step?",
        "<p>An epoch is one pass through training data; a step usually processes one batch.</p><ul><li><strong>Epoch:</strong> Covers the training examples once for a finite dataset.</li><li><strong>Step:</strong> Processes a batch, typically followed by an optimizer update.</li><li><strong>Exceptions:</strong> Streaming data, configured steps, and accumulation can change the relationship.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Concept</th><th scope=\"col\">Explanation</th></tr></thead><tbody><tr><th scope=\"row\">Epoch</th><td>Covers the training examples once for a finite dataset.</td></tr><tr><th scope=\"row\">Step</th><td>Processes a batch, typically followed by an optimizer update.</td></tr><tr><th scope=\"row\">Exceptions</th><td>Streaming data, configured steps, and accumulation can change the relationship.</td></tr></tbody></table></div><p><strong>Remember:</strong> Epoch counts passes; steps count batch processing.</p>"
      ],
      [
        "How do layer count and layer width affect a neural network?",
        "<p>Layer count sets network depth, while layer width sets units per layer.</p><ul><li><strong>Capacity:</strong> Both affect how complex a function the network can learn.</li><li><strong>Cost:</strong> More units or layers generally increase parameters, memory, and computation.</li><li><strong>Validation:</strong> A larger network can be harder to optimize or more prone to overfitting.</li></ul><p><strong>Remember:</strong> More capacity is an option to test, not a promise of improvement.</p>"
      ],
      [
        "How many updates occur for 1,000 examples, batch size 128, and 10 epochs?",
        "<p>With 1,000 examples, batch size 128, and 10 epochs, ordinary training makes 80 updates if partial batches are kept.</p><ol><li><strong>Batches:</strong> Round 1000 divided by 128 upward to get eight batches per epoch.</li><li><strong>Total:</strong> Eight updates per epoch times ten epochs gives 80 updates.</li><li><strong>Conditions:</strong> The last batch has 104 examples; dropping it or accumulating gradients changes the count.</li></ol><div class=\"formula\">\\[\\text{steps per epoch}=\\lceil1000/128\\rceil=8\\]\\[\\text{total updates}=8\\times10=80\\]</div><p><strong>Remember:</strong> State the batching assumptions before counting updates.</p>"
      ],
      [
        "Why search learning rates on a logarithmic scale?",
        "<p>Search learning rates logarithmically because useful values often differ by orders of magnitude.</p><ul><li><strong>Range:</strong> Values such as 0.0001, 0.001, and 0.01 test multiplicative changes.</li><li><strong>Sampling:</strong> A log-uniform range gives equal opportunity to each order of magnitude.</li><li><strong>Bounds:</strong> Choose limits appropriate to the optimizer, architecture, and data.</li></ul><p><strong>Remember:</strong> Explore powers of ten before fine-tuning nearby values.</p>"
      ],
      [
        "Why should batch size and learning rate be tuned together?",
        "<p>Tune batch size and learning rate together because batch size changes gradient noise and update frequency.</p><ul><li><strong>Noise:</strong> Different batch sizes produce different gradient estimates.</li><li><strong>Updates:</strong> Larger batches mean fewer updates per epoch for the same data.</li><li><strong>Comparison:</strong> Equal epoch counts do not guarantee equal update counts or compute.</li></ul><p><strong>Remember:</strong> Changing the batch changes the training dynamics.</p>"
      ],
      [
        "How should maximum epochs interact with hyperparameter tuning?",
        "<p>Maximum epochs is a training cap that should work with a consistent early-stopping policy.</p><ul><li><strong>Budget:</strong> Allow enough time for useful learning.</li><li><strong>Fairness:</strong> Slow-learning configurations can look poor if stopped prematurely.</li><li><strong>Reporting:</strong> Record actual epochs or updates alongside validation scores.</li></ul><p><strong>Remember:</strong> A maximum is a cap, not a requirement to train that long.</p><p><a href=\"https://keras.io/api/models/model_training_apis/\" target=\"_blank\" rel=\"noopener noreferrer\">Reference: Keras training APIs</a></p>"
      ]
    ]
  },
  {
    "title": "Early stopping",
    "questions": [
      [
        "What is early stopping, and what does it monitor?",
        "<p>Early stopping ends training when a monitored metric stops improving sufficiently.</p><ul><li><strong>Monitor:</strong> Validation loss is a common choice for tracking generalization.</li><li><strong>Patience:</strong> Allow a configured number of epochs without qualifying improvement.</li><li><strong>Benefit:</strong> Save training time and limit overfitting; success is not guaranteed.</li></ul><p><strong>Remember:</strong> Stop when useful validation improvement stalls.</p>"
      ],
      [
        "Why monitor validation loss rather than only training loss?",
        "<p>Validation loss helps reveal overfitting that falling training loss can hide.</p><ul><li><strong>Training trend:</strong> Training loss can continue decreasing as the model fits training details.</li><li><strong>Validation trend:</strong> Rising validation loss signals worse performance on held-out examples.</li><li><strong>Separation:</strong> Keep validation outside gradient updates and never early-stop on the final test set.</li></ul><p><strong>Remember:</strong> Training loss shows fitting; validation loss helps judge generalization.</p>"
      ],
      [
        "What do patience, min_delta, and mode mean?",
        "<p>Patience, min_delta, and mode define when an early-stopping monitor counts improvement.</p><ul><li><strong>patience:</strong> Number of monitored epochs without improvement to tolerate.</li><li><strong>min_delta:</strong> Minimum qualifying improvement; in Keras this is an absolute change.</li><li><strong>mode:</strong> Use min for metrics such as loss and max for metrics such as accuracy.</li></ul><p><strong>Remember:</strong> Patience waits; min_delta sets significance; mode sets direction.</p>"
      ],
      [
        "When would patience = 2 stop this validation-loss sequence?",
        "<p>For losses 0.60, 0.50, 0.51, 0.52, patience two stops after epoch four under the stated settings.</p><ol><li><strong>Best:</strong> Epoch two has the lowest loss, 0.50.</li><li><strong>Wait:</strong> Epochs three and four fail to improve with min_delta zero and mode min.</li><li><strong>Restore:</strong> If best-weight restoration is enabled, retain epoch two's weights.</li></ol><p><strong>Remember:</strong> Two consecutive non-improving epochs after the best trigger stopping.</p>"
      ],
      [
        "Why restore the best weights instead of keeping the final weights?",
        "<p>Restoring best weights returns the checkpoint with the best monitored result, which may precede the final epoch.</p><ul><li><strong>Patience window:</strong> Training can continue after the best epoch.</li><li><strong>Selection:</strong> The final weights can be worse than an earlier checkpoint.</li><li><strong>Configuration:</strong> Set restore_best_weights=True explicitly when using this Keras option.</li></ul><p><strong>Remember:</strong> Last trained is not always best validated.</p>"
      ],
      [
        "How is early stopping different from reducing the learning rate?",
        "<p>Early stopping ends training; learning-rate reduction continues training with smaller updates.</p><ul><li><strong>Early stopping:</strong> Stop after the monitored metric stalls.</li><li><strong>Learning-rate reduction:</strong> Lower the update size to allow further refinement.</li><li><strong>Combination:</strong> Give the lower learning rate time to help before stopping.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Concept / approach</th><th scope=\"col\">Explanation</th></tr></thead><tbody><tr><th scope=\"row\">Early stopping</th><td><strong>ends training</strong> when the monitored metric stalls.</td></tr><tr><th scope=\"row\">Learning-rate reduction</th><td>makes smaller updates and <strong>allows training to continue</strong>. These can be combined; give the reduced learning rate enough time to affect <strong>validation performance</strong> before stopping.</td></tr></tbody></table></div><p><strong>Remember:</strong> Stopping ends the run; rate reduction changes how it continues.</p>"
      ],
      [
        "How do I apply early stopping to a small Keras network?",
        "<p>Apply early stopping by passing a configured callback to model fitting.</p><ol><li><strong>Prepare:</strong> Split training and validation data and fit scaling only on training data.</li><li><strong>Configure:</strong> Monitor validation loss with a suitable patience and best-weight restoration.</li><li><strong>Fit:</strong> Set a maximum epoch budget and pass the callback with validation data.</li></ol><pre><code class=\"language-python\">import keras\nfrom sklearn.datasets import make_classification\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import StandardScaler\n\nkeras.utils.set_random_seed(42)\nX, y = make_classification(\n    n_samples=800, n_features=20, random_state=42)\nX_train, X_val, y_train, y_val = train_test_split(\n    X, y, test_size=0.2, stratify=y, random_state=42)\nscaler = StandardScaler().fit(X_train)\nX_train = scaler.transform(X_train)\nX_val = scaler.transform(X_val)\n\nmodel = keras.Sequential([\n    keras.Input(shape=(20,)),\n    keras.layers.Dense(32, activation=\"relu\"),\n    keras.layers.Dense(16, activation=\"relu\"),\n    keras.layers.Dense(1, activation=\"sigmoid\"),\n])\nmodel.compile(optimizer=keras.optimizers.Adam(learning_rate=1e-3),\n              loss=\"binary_crossentropy\")\nstop = keras.callbacks.EarlyStopping(\n    monitor=\"val_loss\", mode=\"min\", patience=5,\n    min_delta=1e-4, restore_best_weights=True)\nhistory = model.fit(\n    X_train, y_train, validation_data=(X_val, y_val),\n    batch_size=32, epochs=100, callbacks=[stop], verbose=0)\nprint(\"Epochs run:\", len(history.history[\"loss\"]))</code></pre><p><strong>Remember:</strong> Monitor held-out validation performance and restore the best checkpoint.</p><p><a href=\"https://keras.io/api/callbacks/early_stopping/\" target=\"_blank\" rel=\"noopener noreferrer\">Reference: Keras EarlyStopping</a></p>"
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
