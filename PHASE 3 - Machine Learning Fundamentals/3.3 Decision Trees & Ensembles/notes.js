const masteryNotes = [
  {
    id: 'trees', title: 'Decision trees: Gini aur entropy',
    sections: [
      '<p>Jab data mein rule-based ya nonlinear patterns hon, ek single straight-line relationship enough nahi hota. Decision tree inputs ko step-by-step groups mein baant kar prediction karta hai.</p>',
      '<p>Meri soch: twenty questions game jaisa hai. Har sawaal kuch possibilities hata deta hai. Achha sawaal woh hai jo mixed examples ko zyada pure groups mein divide kare.</p>',
      String.raw`<p>Decision tree ek supervised model hai jisme internal nodes feature tests, branches unke outcomes, aur leaves predictions represent karte hain. Classification impurity ke common measures:</p><div class="formula">\[G=1-\sum_{k=1}^{K}p_k^2\qquad H=-\sum_{k=1}^{K}p_k\log_2p_k\]</div><p>\(p_k\) node mein class \(k\) ka proportion hai. Gini aur entropy dono pure node par zero hote hain; entropy mein zero-probability term ka contribution zero maante hain.</p>`,
      String.raw`<p>Candidate feature aur threshold try karo. Har split ke baad children ki weighted impurity nikalo. Jo allowed split sabse zyada impurity reduce kare, use choose karo; stopping condition tak repeat karo.</p><div class="formula">\[\Delta I=I_{\mathrm{parent}}-\frac{n_L}{n}I_L-\frac{n_R}{n}I_R\]</div><p>Entropy reduction ko information gain kehte hain. Regression tree usually squared-error reduction use karta hai.</p>`,
      String.raw`<p>Parent mein 4 examples: 2 positive, 2 negative. Gini \(1-0.5^2-0.5^2=0.5\), entropy 1 bit. Ek split left mein dono positives aur right mein dono negatives rakh deta hai. Dono children pure, impurity 0; Gini gain 0.5 aur entropy gain 1 bit.</p>`,
      { intro: 'Python + scikit-learn: ek feature threshold se classes separate hoti hain. Gini ki jagah entropy bhi try karo.', code: `from sklearn.tree import DecisionTreeClassifier

X = [[1], [2], [3], [4]]
y = [0, 0, 1, 1]
for criterion in ['gini', 'entropy']:
    tree = DecisionTreeClassifier(
        criterion=criterion, max_depth=1, random_state=42)
    tree.fit(X, y)
    print(criterion, tree.predict([[1.5], [3.5]]))
    # [0 1]` },
      '<p>Deep tree training data memorize kar sakta hai; chhote data changes se structure badal sakta hai. Depth aur minimum leaf size control karo. Random forest variance kam karne ka alternative hai; boosting sequential corrections se prediction improve karta hai.</p>',
      '<p>Loan-default prediction ya customer churn mein income, usage, aur payment-history rules. Single shallow tree ka decision path inspect karna aasaan hota hai; rule ko causal conclusion mat samjho.</p>',
      '<p><strong>Bina notes dekhe bolo:</strong> node, branch, leaf kya hain? Gini aur entropy kya measure karte hain? Four-example split ka gain khud calculate karo.</p>'
    ]
  },
  {
    id: 'forest', title: 'Random forests: bagging of decision trees',
    sections: [
      '<p>Ek deep tree training sample ke small changes par kaafi badal sakta hai. Random forest multiple diverse trees ko combine karke prediction ki variance kam karne ki koshish karta hai.</p>',
      '<p>Meri soch: ek expert ke answer par depend karne ke bajay thode alag experience wale experts se poochho. Unki combined judgement zyada stable ho sakti hai, especially jab sab exactly same galti na kar rahe hon.</p>',
      '<p>Random forest ek tree ensemble hai. Standard bagged version mein har tree bootstrap sample par train hota hai, aur har split par random feature subset consider karta hai. Bagging ka matlab bootstrap aggregating hai.</p>',
      String.raw`<p>Training data se replacement ke saath samples banao: ek row repeat ho sakti hai aur kuch rows sample mein na aayen. Har tree independently train karo. Feature randomness trees ki correlation kam karne mein help karti hai.</p><p>Regression mein average:</p><div class="formula">\[\hat y(x)=\frac1T\sum_{t=1}^{T}h_t(x)\]</div><p>Classification mein class votes ya averaged class probabilities combine karte hain; scikit-learn forest average probabilities use karta hai.</p>`,
      '<p>Original rows A, B, C, D hain. Ek bootstrap sample A, A, C, D ho sakta hai; doosra B, C, C, D. Teen regression trees predictions 100, 110, 120 dein, toh forest answer (100 + 110 + 120)/3 = 110.</p>',
      { intro: 'Python + scikit-learn: held-out split par forest evaluate karo. Trees training mein bootstrap samples use karte hain.', code: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42)
forest = RandomForestClassifier(
    n_estimators=100, max_depth=4, bootstrap=True, random_state=42)
forest.fit(X_train, y_train)
print(forest.score(X_test, y_test))` },
      '<p>Forest ek tree se zyada memory aur prediction time leta hai; poora model explain karna harder hota hai. Bahut correlated trees ka average limited improvement dega. Simpler explanation ke liye shallow tree, ya tuned tabular performance ke liye gradient boosting compare kar sakte ho.</p>',
      '<p>Customer churn, fraud-risk classification, aur demand prediction jaise tabular tasks mein useful baseline. Numeric features ko standardize karna tree splitting ke liye generally necessary nahi hota.</p>',
      '<p><strong>Bina notes dekhe bolo:</strong> bootstrap sample kya hai? Sirf bahut trees banana aur random forest mein kya extra difference hai? Predictions 100, 110, 120 ka final answer nikalo.</p>'
    ]
  },
  {
    id: 'boosting', title: 'Gradient boosting: XGBoost aur LightGBM',
    sections: [
      '<p>Current model jo patterns miss kar raha hai, unhe next model se correct karna hai. Boosting chhote corrections jod kar ensemble ki loss reduce karta hai.</p>',
      '<p>Meri soch: pehla draft banao, uski mistakes dekho, phir next draft mein targeted correction add karo. Har naya tree previous ensemble ko improve karne ki direction mein train hota hai.</p>',
      String.raw`<p>Gradient boosting ek additive learning method hai jo loss ke negative gradients se guided learners sequentially add karta hai.</p><div class="formula">\[F_m(x)=F_{m-1}(x)+\eta h_m(x)\]</div><p>\(F_{m-1}\): current model, \(h_m\): new tree, \(\eta\): learning rate. Squared loss mein correction residual fitting se related hoti hai; doosre losses ke gradients alag hote hain.</p>`,
      '<p>Initial prediction se start karo, gradients nikalo, correction tree fit karo, scaled output add karo, repeat. <strong>XGBoost</strong> tree booster gradient aur second-order information ke saath regularization use karta hai. <strong>LightGBM</strong> histogram-based split search aur leaf-wise growth ke liye jaana jaata hai. Depth, leaves, learning rate, aur validation-based stopping overfitting control karne mein useful hain.</p><p>Random forest trees independently train karta hai; boosting ka next tree current ensemble par depend karta hai.</p>',
      String.raw`<p>Ek example ka target 10, current prediction 6: residual 4. Maan lo correction tree is point par 4 predict kare aur \(\eta=0.25\). Naya output \(6+0.25(4)=7\). Agla correction 7 se aage improve karega. Yeh squared-loss intuition ka one-point demo hai.</p>`,
      { intro: 'Python + scikit-learn aur xgboost/lightgbm packages. Dono libraries same train/test split par fit hoti hain; yeh basic comparison hai, tuning experiment nahi.', code: `from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from xgboost import XGBClassifier
from lightgbm import LGBMClassifier

X, y = load_breast_cancer(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42)
models = [
    XGBClassifier(n_estimators=50, max_depth=3,
                  learning_rate=0.05, random_state=42, n_jobs=1),
    LGBMClassifier(n_estimators=50, num_leaves=7,
                   learning_rate=0.05, random_state=42,
                   n_jobs=1, verbosity=-1)
]
for model in models:
    model.fit(X_train, y_train)
    print(type(model).__name__, model.score(X_test, y_test))` },
      '<p>Depth, learning rate aur tree count carefully choose karne padte hain. Repeated corrections noise bhi fit kar sakti hain. LightGBM ki leaf-wise growth small data par deep branches bana sakti hai. XGBoost ya LightGBM mein universal winner nahi; simpler baseline ke liye logistic regression ya random forest compare karo.</p>',
      '<p>Fraud scores, churn probabilities, aur sales forecasts jaise structured-feature tasks. Engineered counts, recent activity, aur numeric/category features ke patterns learn karne mein commonly use hote hain.</p><p>References: <a href="https://arxiv.org/abs/1603.02754" target="_blank" rel="noopener noreferrer">XGBoost paper</a>, <a href="https://lightgbm.readthedocs.io/en/stable/Features.html" target="_blank" rel="noopener noreferrer">LightGBM features</a>.</p>',
      '<p><strong>Bina notes dekhe bolo:</strong> next tree kis cheez ko correct karta hai? Prediction 6, correction 4, learning rate 0.25 par output kya hoga? XGBoost aur LightGBM ki ek-ek key property batao.</p>'
    ]
  },
  {
    id: 'importance', title: 'Feature importance',
    sections: [
      '<p>Model bahut inputs use karta hai. Humein samajhna hota hai ki fitted model ki predictions kin features par zyada depend karti hain.</p>',
      '<p>Meri soch: kisi input ki useful information hataane par model ka score kitna girta hai? Ya training mein us feature ne splits ko kitna improve kiya? Dono importance ke alag nazariye hain.</p>',
      '<p>Feature importance ek chosen method ke according fitted model mein input ki contribution ka summary hai. Yeh universal property ya causal effect nahi hai.</p><p><strong>Impurity importance:</strong> split impurity reductions ka total. <strong>Gain:</strong> boosting objective improvement ka summary. <strong>Split count:</strong> feature kitni baar split mein aaya.</p>',
      String.raw`<p><strong>Permutation importance:</strong> held-out data par baseline score nikalo, ek feature shuffle karo, phir score dubara nikalo. Shuffle repeat karke average aur variability dekho.</p><div class="formula">\[\mathrm{Importance}_j=s_{\mathrm{baseline}}-\frac1R\sum_{r=1}^{R}s_{j,r}^{\mathrm{shuffled}}\]</div><p>Yahan score higher-is-better hai. Bada drop matlab model us feature ki information par zyada rely karta hai. Score kabhi improve bhi ho sakta hai, jisse negative estimate aata hai.</p>`,
      '<p>Baseline accuracy 0.90. Income shuffle karne par scores 0.79 aur 0.81: mean 0.80, importance 0.10 ya 10 percentage points. Age shuffle karne par mean 0.89: importance 0.01. Is model aur dataset par income shuffle ka impact zyada tha.</p>',
      { intro: 'Python + scikit-learn: model train data par fit hota hai, importance held-out data par measure hoti hai. Agar results se features select karo, final evaluation ke liye ek aur untouched test set rakho.', code: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.inspection import permutation_importance

data = load_iris()
X_train, X_eval, y_train, y_eval = train_test_split(
    data.data, data.target, test_size=0.3,
    stratify=data.target, random_state=42)
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
result = permutation_importance(
    model, X_eval, y_eval, scoring='accuracy',
    n_repeats=10, random_state=42)
for name, mean, std in zip(data.feature_names,
        result.importances_mean, result.importances_std):
    print(name, round(mean, 3), round(std, 3))` },
      '<p>Impurity importance many possible split points wale features ko favor kar sakti hai. Correlated features ek doosre ki information replace karke permutation importance kam dikha sakte hain; shuffling unrealistic combinations bhi bana sakti hai. Grouped permutation ya SHAP complementary views hain, causal proof nahi.</p>',
      '<p>Churn model mein tenure, recent usage, aur complaints mein se model kis signal par rely karta hai, yeh inspect karna. Feature importance data quality aur model debugging mein useful hai; important feature ka matlab usko change karne se outcome zaroor badlega, aisa nahi.</p><p><a href="https://scikit-learn.org/stable/modules/permutation_importance.html" target="_blank" rel="noopener noreferrer">Reference: permutation importance</a>.</p>',
      '<p><strong>Bina notes dekhe bolo:</strong> impurity aur permutation importance mein difference kya hai? Baseline 0.90 aur shuffled mean 0.80 ka drop kya hai? Correlated features ranking ko misleading kaise bana sakte hain?</p>'
    ]
  }
];


const masteryLabels = [
  'Problem it solves', 'Intuition in my own words', 'Formal definition',
  'Mechanism and key components', 'One worked example', 'Small implementation',
  'Limitations and alternatives', 'Real-world use case', 'Explain from memory'
];
const notesRoot = document.querySelector('#learning-notes');
const notesNav = document.querySelector('#notes-nav');
const progressKey = 'ml-mastery:v1:' + window.location.pathname;
let savedMastery = {};
try {
  const saved = JSON.parse(localStorage.getItem(progressKey) || '{}');
  if (saved && typeof saved === 'object' && !Array.isArray(saved)) savedMastery = saved;
} catch {
  // Notes and checkboxes still work if browser storage is unavailable.
}
for (const note of masteryNotes) {
  const article = document.createElement('article');
  article.className = 'mastery-note';
  article.id = 'notes-' + note.id;
  const title = document.createElement('h3');
  title.id = article.id + '-title';
  title.textContent = note.title;
  article.setAttribute('aria-labelledby', title.id);
  article.append(title);

  const link = document.createElement('a');
  link.href = '#' + article.id;
  link.textContent = note.title;
  notesNav.append(link);

  const header = document.createElement('div');
  header.className = 'mastery-header';
  const heading = document.createElement('h4');
  heading.id = article.id + '-checklist';
  heading.textContent = 'Concept mastery checklist';
  const count = document.createElement('span');
  count.className = 'mastery-count';
  count.setAttribute('role', 'status');
  count.setAttribute('aria-live', 'polite');
  header.append(heading, count);
  const progress = document.createElement('progress');
  progress.className = 'mastery-progress';
  progress.max = masteryLabels.length;
  progress.setAttribute('aria-labelledby', heading.id + ' ' + title.id);
  const help = document.createElement('p');
  help.className = 'mastery-help';
  help.textContent = 'Har point ko samajh kar tick karo. Notes hamesha khule hain; kuch expand karne ki zaroorat nahi.';
  const list = document.createElement('ol');
  list.className = 'mastery-items';
  const checkboxes = [];
  function updateMastery() {
    const done = checkboxes.filter(input => input.checked).length;
    count.textContent = done + '/' + masteryLabels.length;
    progress.value = done;
  }
  note.sections.forEach((content, index) => {
    const item = document.createElement('li');
    item.className = 'mastery-item';
    const label = document.createElement('label');
    label.className = 'mastery-check';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = article.id + '-point-' + index;
    input.setAttribute('aria-label', note.title + ': ' + masteryLabels[index]);
    input.checked = Array.isArray(savedMastery[note.id]) && savedMastery[note.id][index] === true;
    const labelText = document.createElement('span');
    labelText.textContent = masteryLabels[index];
    label.append(input, labelText);
    const body = document.createElement('div');
    body.className = 'mastery-body';
    if (typeof content === 'string') {
      body.innerHTML = content;
    } else {
      const intro = document.createElement('p');
      intro.textContent = content.intro;
      const pre = document.createElement('pre');
      const code = document.createElement('code');
      code.className = 'language-python';
      code.textContent = content.code;
      pre.append(code);
      body.append(intro, pre);
    }
    checkboxes.push(input);
    input.addEventListener('change', () => {
      savedMastery[note.id] = checkboxes.map(checkbox => checkbox.checked);
      updateMastery();
      try {
        localStorage.setItem(progressKey, JSON.stringify(savedMastery));
      } catch {
        document.querySelector('#storage-note').hidden = false;
      }
    });
    item.append(label, body);
    list.append(item);
  });
  article.append(header, progress, help, list);
  notesRoot.append(article);
  updateMastery();
}
