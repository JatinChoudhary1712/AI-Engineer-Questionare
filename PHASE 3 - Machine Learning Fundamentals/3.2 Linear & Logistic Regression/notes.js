const masteryNotes = [
  {
    id: 'linear', title: 'Linear regression: closed form aur gradient descent',
    sections: [
      '<p>Jab output ek number ho, jaise house price, toh input aur output ka relation seekhna hota hai. Har naya price manually guess karne ke bajay model past examples se prediction karta hai.</p>',
      '<p>Meri soch: har feature prediction mein apna weighted contribution deta hai. Area ka weight alag, bedrooms ka alag; sab contributions aur ek starting value jod kar final answer milta hai.</p>',
      String.raw`<p>Linear regression ek supervised model hai jo continuous target ko features ke linear combination se estimate karta hai.</p><div class="formula">\[\hat y=b+\sum_{j=1}^{p}w_jx_j\]</div><p>\(x_j\): input, \(w_j\): learned weight, \(b\): intercept, aur \(\hat y\): predicted value.</p>`,
      String.raw`<p><strong>Closed form:</strong> least-squares problem ko directly solve karo. Intercept ke liye \(X\) mein ones ka column hota hai.</p><div class="formula">\[\hat\theta=(X^{\mathsf T}X)^{-1}X^{\mathsf T}y\]</div><p>Yeh inverse formula independent columns maangta hai; code mein stable least-squares solver use karna better hai.</p><p><strong>Gradient descent:</strong> weights se prediction banao, MSE ka gradient nikalo, phir chhota update karo. Repeat karte raho.</p><div class="formula">\[\theta\leftarrow\theta-\alpha\frac{2}{n}X^{\mathsf T}(X\theta-y)\]</div><p>\(\alpha\) learning rate hai. Bahut bada step unstable ho sakta hai, bahut chhota step slow hota hai.</p>`,
      String.raw`<p>Maan lo area \(x=[1,2,3]\), price \(y=[3,5,7]\). Line \(\hat y=1+2x\) teeno points ko exactly fit karti hai. Ab \(x=4\) par prediction \(1+2(4)=9\).</p><p>Gradient step samjho: sirf \(x=1,y=3\), initial \(w=b=0\). Squared loss ke dono gradients \(-6\) hain. \(\alpha=0.1\) par simultaneous update se \(w=b=0.6\); prediction 0 se 1.2 ho gaya, jo target 3 ke kareeb hai.</p>`,
      { intro: 'Python + NumPy ka toy example: dono methods same line ke paas pahunchte hain. Yeh learning demo hai; evaluation ke liye alag test data chahiye.', code: `import numpy as np

x = np.array([1., 2., 3.])
y = np.array([3., 5., 7.])
X = np.column_stack([np.ones(len(x)), x])

# Stable direct least-squares solution
closed, *_ = np.linalg.lstsq(X, y, rcond=None)

# Gradient descent on mean squared error
theta = np.zeros(2)
for _ in range(5000):
    gradient = 2 / len(y) * X.T @ (X @ theta - y)
    theta -= 0.05 * gradient

print(closed)  # [1., 2.]
print(theta)   # approximately [1., 2.]
print(np.array([1., 4.]) @ theta)  # approximately 9` },
      '<p>Basic linear features complex curved patterns miss kar sakte hain. Outliers squared loss ko strongly affect karte hain, aur correlated features coefficients ko unstable bana sakte hain. Alternatives: polynomial features for simple curves, Ridge for stability, ya trees for nonlinear patterns.</p>',
      '<p>House-price estimate, monthly sales forecast from known inputs, ya delivery-time prediction. Model ko unseen examples par check karo; training fit achha hona future accuracy ki guarantee nahi hai.</p>',
      '<p><strong>Bina notes dekhe bolo:</strong> inputs se prediction kaise banta hai? Closed form aur gradient descent mein kya difference hai? Upar wale example mein area 4 ka price 9 kyun aaya? Apni language mein samjha pao tab tick karo.</p>'
    ]
  },
  {
    id: 'logistic', title: 'Logistic regression: sigmoid aur binary classification',
    sections: [
      '<p>Jab answer do classes mein se ek ho, jaise spam ya not spam, toh class ke saath uski probability bhi estimate karni hoti hai.</p>',
      '<p>Meri soch: pehle inputs ko ek score mein badlo. Sigmoid us score ko 0 aur 1 ke beech le aata hai. Phir threshold se decide karo ki class 1 bolna hai ya class 0.</p>',
      String.raw`<p>Logistic regression ek supervised classifier hai jo positive class ki probability ko linear score ke sigmoid se model karta hai.</p><div class="formula">\[z=b+w^{\mathsf T}x,\qquad P(y=1\mid x)=\sigma(z)=\frac{1}{1+e^{-z}}\]</div>`,
      '<p>Features lo, weighted score banao, sigmoid lagao, aur training mein binary cross-entropy minimize karo. Prediction ke waqt probability threshold se compare hoti hai. Threshold 0.5 common starting point hai; use validation data aur error cost ke hisaab se choose karo.</p>',
      String.raw`<p>Agar score \(z=2\), toh \(p=1/(1+e^{-2})\approx0.881\). Threshold 0.5 par class 1 predict hogi. Agar \(z=0\), probability 0.5; agar \(z=-2\), probability lagbhag 0.119.</p>`,
      { intro: 'Python + NumPy se score, sigmoid aur threshold ko seedha dekho. Weights yahan pehle se diye gaye hain; training nahi ho rahi.', code: `import numpy as np

def predict(x, w, b, threshold=0.5):
    z = b + np.dot(w, x)
    # Stable sigmoid for very large positive/negative scores
    p = np.exp(-np.logaddexp(0, -z))
    return float(p), int(p >= threshold)

probability, label = predict([2.0], [1.0], 0.0)
print(round(probability, 3), label)  # 0.881 1` },
      '<p>Raw features par boundary linear hoti hai; complex patterns ke liye transformed features ya tree models chahiye ho sakte hain. Probability output hamesha perfectly calibrated nahi hota. Class imbalance mein sirf accuracy dekhna kaafi nahi; precision aur recall bhi dekho.</p>',
      '<p>Customer churn, spam detection, aur transaction fraud ki binary prediction. Threshold decide karta hai kitne false alarms ya missed cases accept karne hain.</p>',
      '<p><strong>Bina notes dekhe bolo:</strong> sigmoid kyun lagate hain? Probability aur class label mein kya difference hai? Score 2 aur threshold 0.5 ka output calculate karke samjhao.</p>'
    ]
  },
  {
    id: 'losses', title: 'Cost functions: MSE aur Binary Cross-Entropy',
    sections: [
      '<p>Model ki galti ko ek number mein measure karna zaroori hai. Training isi number ko kam karne ki koshish karti hai; ise loss ya cost kehte hain.</p>',
      '<p>Meri soch: numerical target ke liye actual aur predicted number ka gap dekho. Binary probability ke liye dekho ki model ne sahi class ko kitni probability di, aur confidently galat hone par zyada penalty do.</p>',
      String.raw`<p><strong>MSE:</strong> numerical errors ke squares ka average.</p><div class="formula">\[\mathrm{MSE}=\frac1n\sum_{i=1}^n(\hat y_i-y_i)^2\]</div><p><strong>BCE:</strong> binary labels ki negative average log-likelihood.</p><div class="formula">\[\mathrm{BCE}=-\frac1n\sum_{i=1}^n[y_i\log p_i+(1-y_i)\log(1-p_i)]\]</div>`,
      '<p>MSE mein har error square karo, sab jodo aur examples ki count se divide karo. BCE mein actual label 1 ho toh negative log of positive probability; label 0 ho toh negative log of one minus that probability. Dono mein lower loss better hai. BCE ke logs natural logs hain.</p>',
      String.raw`<p><strong>MSE:</strong> targets [2,4], predictions [3,2]. Errors 1 aur -2; squared errors 1 aur 4. Average \((1+4)/2=2.5\).</p><p><strong>BCE:</strong> labels [1,0], probabilities [0.9,0.2]. Loss \(-[\log(0.9)+\log(0.8)]/2\approx0.164\). Pehle example mein probability 0.01 hoti toh uska individual loss lagbhag 4.605 hota: confident wrong answer ki badi penalty.</p>`,
      { intro: 'Python + NumPy se dono losses calculate karo.', code: `import numpy as np

y = np.array([2., 4.])
pred = np.array([3., 2.])
print(np.mean((pred - y) ** 2))  # 2.5

labels = np.array([1., 0.])
p = np.clip(np.array([0.9, 0.2]), 1e-12, 1 - 1e-12)
bce = -np.mean(labels * np.log(p) + (1-labels) * np.log1p(-p))
print(round(bce, 3))  # 0.164` },
      '<p>MSE outliers ko zyada weight deta hai; regression mein MAE alternative ho sakta hai. BCE confidently wrong predictions par bahut badi penalty deta hai; extreme logits ke liye stable library loss use karo. Accuracy aur F1 classification decisions evaluate karte hain, par BCE ki tarah probability-training loss nahi hain.</p>',
      '<p>House-price regression train karne ke liye MSE; spam probability model ke liye BCE. Target numerical hai ya binary, uske according objective choose karo.</p>',
      '<p><strong>Bina notes dekhe bolo:</strong> MSE 2.5 kaise aaya? Actual label 1 ho toh probability 0.01 ki BCE, probability 0.9 se zyada kyun hogi?</p>'
    ]
  },
  {
    id: 'regularization', title: 'Regularization: Ridge (L2) aur Lasso (L1)',
    sections: [
      '<p>Model training data ki noise ko fit kar sakta hai, ya correlated inputs ke kaaran bade unstable weights seekh sakta hai. Regularization weights ko control karke generalization improve karne mein help karta hai.</p>',
      '<p>Meri soch: sirf training error kam karna target nahi; unnecessarily bade weights ka bill bhi lagao. Ridge weights ko chhota karta hai; Lasso kuch weights ko zero bhi kar sakta hai.</p>',
      String.raw`<p>Regularization data loss mein coefficient penalty add karta hai. Ek consistent convention mein:</p><div class="formula">\[J_{\mathrm{Ridge}}=\mathrm{MSE}+\lambda\sum_jw_j^2\]\[J_{\mathrm{Lasso}}=\mathrm{MSE}+\lambda\sum_j|w_j|\]</div><p>\(\lambda\geq0\) penalty strength hai. Intercept ko usually penalize nahi karte. Libraries ka loss scaling alag ho sakta hai.</p>`,
      '<p>Training features scale karo, penalty type choose karo, aur validation se penalty strength select karo. Ridge generally saare coefficients retain karta hai; Lasso sparse solution de sakta hai. Bahut strong penalty useful signal bhi daba sakti hai.</p>',
      String.raw`<p>Maan lo weights [3,4], MSE = 2, aur \(\lambda=0.1\). Ridge penalty \(0.1(3^2+4^2)=2.5\), objective 4.5. Lasso penalty \(0.1(|3|+|4|)=0.7\), objective 2.7.</p><p>Yeh same fixed weights par penalty ka calculation hai; isse Lasso automatically better prove nahi hota. Fit aur validation performance se comparison karte hain.</p>`,
      { intro: 'Python + scikit-learn: scaler training data par hi fit hota hai. Dono models ke liye alpha ki numeric value directly equivalent objective strength nahi maanni chahiye.', code: `from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Ridge, Lasso

X = [[1, 2], [2, 1], [3, 4], [4, 3], [5, 6], [6, 5]]
y = [3, 4, 7, 8, 11, 12]

for estimator in [Ridge(alpha=1.0), Lasso(alpha=0.1)]:
    model = make_pipeline(StandardScaler(), estimator)
    model.fit(X, y)
    print(type(estimator).__name__, model.predict([[7, 6]]))` },
      '<p>Too much regularization underfit kara sakta hai. Correlated features mein Lasso ka selected subset unstable ho sakta hai. Ridge exact feature selection nahi deta. Elastic Net L1 aur L2 ko combine karne ka alternative hai.</p>',
      '<p>Sales prediction mein bahut related marketing features ho toh Ridge useful baseline hai. Bahut saare candidate features mein sparse regression chahiye toh Lasso try kar sakte ho, validation ke saath.</p>',
      '<p><strong>Bina notes dekhe bolo:</strong> squared aur absolute penalty mein difference kya hai? Kaunsa exact zeros de sakta hai? Lambda bahut bada karne par kya risk hai?</p>'
    ]
  },
  {
    id: 'ovr', title: 'Multi-class classification: One-vs-Rest',
    sections: [
      '<p>Binary classifier sirf do classes handle karta hai. Agar teen ya zyada mutually exclusive classes hon, toh One-vs-Rest binary classifiers ko combine karke multiclass prediction bana sakta hai.</p>',
      '<p>Meri soch: har class ka ek specialist banao. Cat specialist poochta hai "Cat hai ya baaki kuch?" Dog aur Bird specialists bhi apna score dete hain. Sabse strong score wali class choose karo.</p>',
      String.raw`<p>\(K\) classes ke liye \(K\) binary models train hote hain. Model \(k\) ke labels us class ke liye 1 aur baaki sab ke liye 0 hote hain.</p><div class="formula">\[\hat y=\operatorname*{arg\,max}_{k\in\{1,\ldots,K\}}s_k(x)\]</div><p>\(s_k(x)\) class \(k\) ka score hai.</p>`,
      '<p>Har class ke binary labels banao, us par alag classifier fit karo, phir naye input ke liye saare scores nikalo. Single-label setting mein highest score choose karo. Independent sigmoid outputs ka sum 1 hona zaroori nahi.</p>',
      '<p>Classes Cat, Dog, Bird hain. Cat model ke labels mein sirf cats 1 hain; baaki 0. Prediction scores Cat = 0.7, Dog = 0.2, Bird = 0.4 aaye. Highest score 0.7 hai, isliye answer Cat; scores ka sum 1.3 hona independent models mein possible hai.</p>',
      { intro: 'Python + scikit-learn: Iris dataset ki teen classes par OvR model. Test split training se alag hai.', code: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.multiclass import OneVsRestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42)
model = make_pipeline(StandardScaler(),
    OneVsRestClassifier(LogisticRegression(max_iter=1000)))
model.fit(X_train, y_train)
print(model.predict(X_test[:3]))
print(model.score(X_test, y_test))` },
      '<p>Classes badhne par models ki count bhi badhti hai. Rare class vs rest imbalanced ho sakta hai, aur independent scores ki calibration alag ho sakti hai. Mutually exclusive classes ke liye multinomial logistic regression with softmax ek alternative hai.</p>',
      '<p>News articles ko Sports, Business, ya Technology mein classify karna, jab har article ko exactly ek category deni ho.</p>',
      '<p><strong>Bina notes dekhe bolo:</strong> four classes ke liye kitne models lagenge? Class k ke training labels kaise banenge? Agar do scores 0.5 se upar aa jaayen toh single-label OvR kya karega?</p>'
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
  help.textContent = 'Har point par click karke notes kholo ya band karo. Samajh aane par checkbox tick karo.';
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
    const disclosure = document.createElement('details');
    disclosure.className = 'mastery-disclosure';
    const summary = document.createElement('summary');
    summary.className = 'mastery-summary';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.className = 'mastery-point-check';
    input.id = article.id + '-point-' + index;
    input.setAttribute('aria-label', note.title + ': ' + masteryLabels[index]);
    input.checked = Array.isArray(savedMastery[note.id]) && savedMastery[note.id][index] === true;
    const labelText = document.createElement('span');
    labelText.textContent = masteryLabels[index];
    const chevron = document.createElement('span');
    chevron.className = 'mastery-chevron';
    chevron.setAttribute('aria-hidden', 'true');
    summary.append(labelText, chevron);
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
    disclosure.append(summary, body);
    item.append(input, disclosure);
    list.append(item);
  });
  article.append(header, progress, help, list);
  notesRoot.append(article);
  updateMastery();
}
