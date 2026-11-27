const topics = [
  {
    "title": "Decision trees - splitting criteria (Gini and entropy)",
    "questions": [
      [
        "What is a decision tree?",
        "<p><strong>Decision Tree</strong> ek <strong>supervised ML algorithm</strong> hai jo classification aur regression dono ke liye use hota hai.</p><p>It works like a flowchart, splitting data into smaller subsets based on simple 'If-Else' conditions on features (using metrics like <strong>Gini Impurity</strong> or <strong>Entropy</strong>) until it reaches a final prediction at the leaf node.</p><p><strong>Iske 3 main hisse hote hain:</strong></p><ul><li><strong>Root Node:</strong> Sabse upar wala pehla aur sabse important sawaal (jaise: \"Kya barish ho rahi hai?\").</li><li><strong>Branches / Internal Nodes:</strong> Sawaalon ke jawab (Yes/No) ke base par aage badhne wale raste aur agle sawaal.</li><li><strong>Leaf Node:</strong> Sabse neeche wala final result ya prediction (jaise: \"Chhata le kar jao\").</li></ul><p><strong>Remember:</strong> Root se Leaf tak simple If-Else sawaal poochte hue final prediction par pahunchna hi Decision Tree hai.</p>"
      ],
      [
        "What are Entropy and Gini Impurity, and where are they used?",
        "<p><strong>Gini Impurity</strong> aur <strong>Entropy</strong> dono mathematical metrics hain jo kisi dataset ya node mein <strong>impurity</strong> (classes ka mix-up ya confusion) measure karte hain.</p><ul><li><strong>Where &amp; Why Used:</strong> Inka use <strong>Decision Tree</strong> banate waqt har node par <strong>best split</strong> (kaunsa feature aur threshold choose karna hai) decide karne ke liye hota hai.</li><li><strong>Problem Solved:</strong> Tree ke paas kai features hote hain; yeh metrics ek <strong>\"judge\"</strong> ki tarah batate hain ki kis feature par split karne se data sabse zyada <strong>pure (saaf)</strong> groups mein divide hoga.</li></ul><p><strong>Remember:</strong> Entropy aur Gini dono judge hain jo tree ko sabse saaf split choose karne mein madad karte hain.</p>"
      ],
      [
        "What is Gini impurity?",
        "<p><strong>Gini Impurity</strong> ek metric hai jo Decision Tree mein kisi node ki <strong>impurity</strong> ya <strong>class mix-up</strong> ko measure karta hai.</p><ul><li><strong>Misclassification probability:</strong> Basically, yeh batata hai ki agar hum us node se randomly ek data point pick karein aur usse distribution ke hisaab se label dein, toh <strong>galat classify hone ki probability</strong> kya hai.</li><li><strong>Pure vs. Impure node:</strong> Agar node bilkul pure hai (ek hi class ke samples), toh Gini score <strong>0</strong> hota hai. Agar binary classification mein classes 50-50 split hain, toh maximum impurity hoti hai, jiska score <strong>0.5</strong> hota hai.</li><li><strong>Best split selection:</strong> Tree har step par aisa split choose karta hai jo Gini Impurity ko sabse zyada kam kare.</li></ul><div class=\"formula\">\\[G = 1 - \\sum_{i=1}^{K} (p_i)^2\\]</div><p class=\"example\"><strong>Example (Loan Approval):</strong> Agar 3 features hain—<strong>Salary</strong>, <strong>Age</strong>, aur <strong>Favorite Color</strong>—toh Favorite Color se split karne par Yes/No mix rehta hai (Gini ≈ 0.48), jabki <code>Salary &gt; 50k</code> se lagbhag saare Yes ek taraf aur No doosri taraf aa jaate hain (Gini ≈ 0.10). Isliye tree <strong>Salary &gt; 50k</strong> ko Root Node banata hai.</p><p><strong>Remember:</strong> Gini = 0 matlab 100% pure node, aur Gini = 0.5 matlab 50-50 max mix-up; tree har split par Gini kam karta hai.</p>"
      ],
      [
        "What is entropy in a decision tree?",
        "<p>Decision Tree ke context mein <strong>Entropy</strong> kisi node ki <strong>randomness</strong> ya <strong>uncertainty</strong> ko measure karti hai—yani yeh batati hai ki us node mein classes kitni zyada mixed hain.</p><ul><li><strong>Pure Node (100% ek hi class):</strong> \\(\\text{Entropy} = 0\\) (koi confusion nahi).</li><li><strong>50-50 Split (Dono classes barabar):</strong> \\(\\text{Entropy} = 1\\) (maximum confusion).</li><li><strong>Goal:</strong> Tree har step par <strong>Information Gain</strong> (parent aur child nodes ki entropy ka difference) maximize karta hai, taaki child nodes ki entropy kam se kam ho.</li></ul><div class=\"formula\">\\[\\text{Entropy} = -\\sum p_i \\log_2(p_i)\\]</div><p><strong>Symbols:</strong> \\(p_i\\) har class ki probability hai.</p><p><strong>Remember:</strong> Entropy = 0 matlab zero confusion, Entropy = 1 matlab 50-50 maximum confusion; tree Information Gain maximize karta hai.</p>"
      ],
      [
        "How do Gini impurity and entropy differ?",
        "<p><strong>Dono ka kaam ek hi hai (best split dhundhna)</strong>, lekin dono alag mathematical formula aur scale use karte hain.</p><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Feature</th><th scope=\"col\">Gini Impurity</th><th scope=\"col\">Entropy</th></tr></thead><tbody><tr><th scope=\"row\">Formula</th><td>\\(1 - \\sum (p_i)^2\\)</td><td>\\(-\\sum p_i \\log_2(p_i)\\)</td></tr><tr><th scope=\"row\">Value Range (Binary)</th><td><strong>0</strong> (pure) se <strong>0.5</strong> (50-50 split)</td><td><strong>0</strong> (pure) se <strong>1.0</strong> (50-50 split)</td></tr><tr><th scope=\"row\">Computation Speed</th><td><strong>Faster</strong> (sirf squaring hoti hai)</td><td><strong>Slightly Slower</strong> (\\(\\log_2\\) calculate karna padta hai)</td></tr></tbody></table></div><p><strong>Remember:</strong> Gini fast hai (squaring) aur scikit-learn mein default hai; Entropy log use karta hai—par dono ka goal pure nodes banana hai.</p>"
      ],
      [
        "How does a tree choose a split using Gini or entropy?",
        "<p>A classification tree chooses a split that reduces weighted child-node impurity.</p><ol><li><strong>Evaluate:</strong> Compare candidate feature thresholds.</li><li><strong>Weight:</strong> Multiply each child's impurity by its fraction of samples.</li><li><strong>Select:</strong> Choose the largest permitted impurity reduction; with entropy this is information gain.</li></ol><div class=\"formula\">\\[\\Delta I=I_{\\mathrm{parent}}-\\left(\\frac{n_L}{n}I_L+\\frac{n_R}{n}I_R\\right)\\]</div><p class=\"example\">A parent with Gini 0.5 split into two pure children has a Gini reduction of 0.5.</p><p><strong>Symbols:</strong> I denotes impurity; n_L and n_R are child sample counts, and n is their total.</p><p><strong>Remember:</strong> Judge a split by how much cleaner its children become.</p>",
        { "later": true }
      ],
      [
        "How do I calculate impurity reduction when child nodes have different sizes?",
        "<p>Weight child impurities by sample count before subtracting from the parent impurity.</p><ol><li><strong>Parent:</strong> Ten samples, five per class, give Gini 0.5.</li><li><strong>Children:</strong> Four positives form a pure left node; one positive and five negatives form the right.</li><li><strong>Reduction:</strong> Weighted child impurity is 1/6, giving a Gini reduction of 1/3.</li></ol><div class=\"formula\">\\[G_L=0,\\qquad G_R=1-(1/6)^2-(5/6)^2=5/18\\]\\[G_{\\mathrm{children}}=(4/10)(0)+(6/10)(5/18)=1/6\\]\\[\\Delta G=0.5-1/6=1/3\\]</div><p><strong>Remember:</strong> Larger children must contribute more to weighted impurity.</p>",
        { "later": true }
      ],
      [
        "How do I train a decision tree with Gini versus entropy in scikit-learn?",
        "<p>Set the decision tree's criterion to compare Gini and entropy on the same data.</p><ol><li><strong>Configure:</strong> Use criterion equal to gini or entropy.</li><li><strong>Fit:</strong> Keep data, depth, and random state consistent across runs.</li><li><strong>Compare:</strong> Check predictions on the same inputs; this toy example is not a general evaluation.</li></ol><pre><code class=\"language-python\">from sklearn.tree import DecisionTreeClassifier\n\nX = [[1], [2], [3], [4]]\ny = [0, 0, 1, 1]\nfor criterion in ['gini', 'entropy']:\n    tree = DecisionTreeClassifier(\n        criterion=criterion, max_depth=1, random_state=42)\n    tree.fit(X, y)\n    print(criterion, tree.predict([[1.5], [3.5]]))\n    # [0 1]</code></pre><p><strong>Remember:</strong> Change the impurity criterion while keeping the experiment comparable.</p>",
        { "later": true }
      ]
    ]
  },
  {
    "title": "Random forests - bagging of decision trees",
    "questions": [
      [
        "What is a Random Forest?",
        "<p><strong>Random Forest</strong> ek <strong>Ensemble Learning</strong> algorithm hai—jiska matlab hai ki ek single model par depend karne ke bajay multiple weak/individual models ko combine karke ek strong aur accurate model banana.</p><ul><li><strong>How it Works:</strong> Yeh multiple <strong>Decision Trees</strong> ko parallel mein independently train karta hai.</li><li><strong>Final Output:</strong> Sabhi trees ke predictions ko combine karke final result deta hai—<strong>Classification</strong> mein <strong>majority voting</strong> aur <strong>Regression</strong> mein <strong>average</strong> ke through.</li></ul><p><strong>Remember:</strong> Ek tree overfit kar sakta hai, par bahut saare trees milkar stable aur accurate prediction dete hain.</p>"
      ],
      [
        "What is Bagging, and why does Random Forest use it?",
        "<p><strong>Bagging</strong>, jiska full form <strong>Bootstrap Aggregating</strong> hai, ek ensemble technique hai jo model ka <strong>variance</strong> reduce karne aur <strong>overfitting</strong> rokne ke liye use hoti hai.</p><ul><li><strong>Bootstrapping:</strong> Ismein original dataset se <strong>sampling with replacement</strong> ke through multiple random subsets banaye jaate hain, aur har subset par ek alag model (jaise Decision Tree) parallel mein train hota hai.</li><li><strong>Aggregating:</strong> Jab saare models train ho jaate hain, toh unke predictions ko combine karke final output nikaala jaata hai—<strong>Classification</strong> mein <strong>majority voting</strong> aur <strong>Regression</strong> mein <strong>average</strong> ke through.</li><li><strong>Why it works:</strong> Kyunki har model thode alag data par train hota hai, unki galtiyan cancel out ho jaati hain aur humein ek <strong>stable prediction</strong> milta hai.</li></ul><p><strong>Remember:</strong> Bootstrap (alag random subsets) + Aggregating (combine predictions) = Bagging, jo variance aur overfitting kam karta hai.</p>"
      ],
      [
        "What does sampling with replacement mean in bagging?",
        "<p><strong>Sampling with replacement</strong> ka matlab hai dataset se ek row pick karke note karna, aur phir usse wapas original dataset mein daal dena—taaki wo dobara pick ho sake.</p><ul><li><strong>Sample Impact:</strong> Har tree ko same size ka sample milta hai—kuch rows repeat (<strong>duplicates</strong>) hoti hain aur lagbhag <strong>~37% rows</strong> chhoot jaati hain (jinhein <strong>Out-of-Bag samples</strong> kehte hain).</li><li><strong>Core Purpose:</strong> Har tree ko thoda alag data dena, jisse trees <strong>uncorrelated</strong> bante hain aur model ka <strong>variance reduce</strong> hota hai (overfitting kam hoti hai).</li></ul><p class=\"example\"><strong>Example:</strong> Agar original data A, B, C, D hai, toh ek bootstrap sample A, A, C, D ban sakta hai (A repeat hua aur B chhoot gaya).</p><p><strong>Remember:</strong> Row pick karo, note karo, wapas daalo—isse har tree ko thoda alag data milta hai.</p>"
      ],
      [
        "Why does a random forest also sample features at each split?",
        "<p>Random feature sampling makes trees less dependent on the same dominant features.</p><ul><li><strong>Correlation:</strong> Similar trees tend to make similar errors.</li><li><strong>Diversity:</strong> Different candidate features encourage different splits.</li><li><strong>Variance:</strong> Combining less-correlated trees can give more stable predictions.</li></ul><p><strong>Remember:</strong> A forest benefits from trees that make different mistakes.</p>",
        { "later": true }
      ],
      [
        "How does a random forest combine tree predictions?",
        "<p><strong>Random Forest</strong> sabhi trees ke independent outputs ko <strong>aggregation</strong> (Classification mein voting aur Regression mein average) ke through ek final prediction mein combine karta hai.</p><ol><li><strong>New Input Data Aata Hai:</strong> Ek naya, unseen test data point (row) model ko diya jaata hai.</li><li><strong>Har Tree Apna Prediction Deta Hai:</strong> Forest ke sabhi \\(N\\) Decision Trees (e.g., 100 trees) independently us data point ko apne root-to-leaf path se pass karke apna-apna output nikaalte hain.</li><li><strong>Task Type Check Hota Hai (Aggregation Step):</strong><ul><li><strong>Classification — Hard Voting:</strong> Har tree ek class vote karta hai; jis class ko sabse zyada votes (majority) milte hain, wahi final prediction banti hai.</li><li><strong>Classification — Soft Voting (Default in scikit-learn):</strong> Har tree har class ki probability deta hai; sabhi trees ki probabilities ka average nikala jaata hai aur highest probability wali class select hoti hai.</li><li><strong>Regression:</strong> Sabhi trees ke predicted numbers ka simple mean (average) nikala jaata hai.</li></ul></li><li><strong>Final Output:</strong> Yeh combined value Random Forest ka final prediction ban jaati hai.</li></ol><div class=\"formula\">\\[\\hat{y}(\\mathbf{x})=\\frac{1}{N}\\sum_{i=1}^{N}\\hat{y}_i\\]</div><p class=\"example\"><strong>Example:</strong> Agar 3 regression trees 100, 110, aur 120 predict karte hain, toh Random Forest ka final output <strong>110</strong> hoga.</p><p><strong>Remember:</strong> Classification mein voting (hard/soft) aur Regression mein mean (average) se sabhi trees ki predictions combine hoti hain.</p>"
      ],
      [
        "Why can combining many trees reduce variance?",
        "<p>Bahut saare diverse trees ko combine karne se individual trees ki galtiyan cancel out ho jaati hain, jisse model ka <strong>variance</strong> kam hota hai.</p><ul><li><strong>1 Tree = Overconfident:</strong> Ek akela tree training data ko ratta maar leta hai, isliye naye data par galti karta hai (<strong>High Variance</strong>).</li><li><strong>Many Trees = Teamwork:</strong> Jab hum 100 alag-alag trees banate hain, toh sab alag galtiyan karte hain.</li><li><strong>Average se Balance:</strong> Jab sabka average nikaalte hain, toh ek tree ki galti doosre ke sahi answer se cancel out ho jaati hai, aur final answer <strong>stable</strong> ho jaata hai.</li></ul><p><strong>Remember:</strong> Variance tabhi kam hota hai jab trees diverse (alag-alag) hon, sirf ek hi tree ki copies banane se nahi.</p>"
      ],
      [
        "What are out-of-bag samples in a random forest?",
        "<p><strong>Out-of-Bag (OOB) samples</strong> wo ~<strong>36.8% unseen training rows</strong> hain jo bootstrapping ke waqt kisi specific tree ke training bag mein select nahi hotin.</p><ul><li><strong>63.2% vs. 36.8% Split:</strong> Sampling with replacement mein har tree ko lagbhag <strong>63.2%</strong> unique rows milti hain, aur bachi hui <strong>36.8%</strong> rows us tree ke liye unseen (OOB) rehti hain.</li><li><strong>Built-in Validation Set:</strong> Yeh unseen rows ek free <strong>validation set</strong> ki tarah kaam karti hain—alag se validation split ya cross-validation chalaye bina model check ho jaata hai.</li><li><strong>OOB Score / Error:</strong> Har data point ko sirf unhi trees se predict karwaya jaata hai jinke bag mein wo nahi tha, aur un predictions ko aggregate karke <strong>OOB Score</strong> milta hai.</li></ul><p><strong>Remember:</strong> OOB = ~36.8% chhooti hui rows jo Random Forest ko bina extra split ke built-in validation deti hain.</p>"
      ],
      [
        "How do I train a bagged random forest in scikit-learn?",
        "<p>Train a random forest on the training split and evaluate it on held-out examples.</p><ol><li><strong>Split:</strong> Separate training and test data before fitting.</li><li><strong>Fit:</strong> Enable bootstrap sampling and configure the forest.</li><li><strong>Evaluate:</strong> Predict only after fitting; compare predictions with held-out targets.</li></ol><pre><code class=\"language-python\">from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\n\nX, y = load_iris(return_X_y=True)\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, stratify=y, random_state=42)\nforest = RandomForestClassifier(\n    n_estimators=100, max_depth=4, bootstrap=True, random_state=42)\nforest.fit(X_train, y_train)\nprint(forest.score(X_test, y_test))</code></pre><p><strong>Remember:</strong> Bootstrap inside training; evaluate outside training.</p>",
        { "later": true }
      ]
    ]
  },
  {
    "title": "Gradient boosting - XGBoost and LightGBM",
    "questions": [
      [
        "What is gradient boosting, and how do its trees improve a model?",
        "<p><strong>Gradient Boosting</strong> ek additive ensemble algorithm hai jo shallow decision trees (weak learners) ko ek-ke-baad-ek train karta hai. Har naya tree pichle ensemble ki galtiyan sudharta hai.</p><div class=\"example\"><strong>Note — Ensemble Learning kya hai?</strong> Jab ek akela model kaafi na ho, toh hum multiple chhote models (<em>weak learners</em>) ko mila kar ek strong model banate hain — ya toh parallel mein (Bagging / Random Forest) ya step-by-step (Boosting).</div><figure style=\"margin:14px 0;text-align:center;\"><svg viewBox=\"0 0 740 190\" width=\"100%\" style=\"max-width:740px;height:auto;border:1px solid var(--line,#dbe4e2);border-radius:8px;background:var(--card,#fff);padding:8px;\" role=\"img\" aria-label=\"Gradient boosting block diagram showing sequential residual fitting and additive updates\"><defs><marker id=\"gb-arrow\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto-start-reverse\"><path d=\"M 0 1 L 10 5 L 0 9 z\" fill=\"#087f73\"/></marker></defs><rect x=\"14\" y=\"68\" width=\"82\" height=\"46\" rx=\"6\" fill=\"#edf5f2\" stroke=\"#087f73\" stroke-width=\"1.5\"/><text x=\"55\" y=\"88\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"700\" fill=\"#172d36\">Input x</text><text x=\"55\" y=\"104\" text-anchor=\"middle\" font-size=\"11\" fill=\"#52666d\">+ target y</text><line x1=\"96\" y1=\"91\" x2=\"124\" y2=\"91\" stroke=\"#087f73\" stroke-width=\"1.5\" marker-end=\"url(#gb-arrow)\"/><rect x=\"126\" y=\"68\" width=\"94\" height=\"46\" rx=\"6\" fill=\"#edf5f2\" stroke=\"#087f73\" stroke-width=\"1.5\"/><text x=\"173\" y=\"88\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"700\" fill=\"#172d36\">Baseline F₀</text><text x=\"173\" y=\"104\" text-anchor=\"middle\" font-size=\"10.5\" fill=\"#52666d\">constant pred</text><line x1=\"220\" y1=\"91\" x2=\"248\" y2=\"91\" stroke=\"#087f73\" stroke-width=\"1.5\" marker-end=\"url(#gb-arrow)\"/><rect x=\"250\" y=\"22\" width=\"122\" height=\"44\" rx=\"6\" fill=\"#faf6ec\" stroke=\"#b87013\" stroke-width=\"1.5\"/><text x=\"311\" y=\"41\" text-anchor=\"middle\" font-size=\"11.5\" font-weight=\"700\" fill=\"#172d36\">Pseudo-Residual</text><text x=\"311\" y=\"56\" text-anchor=\"middle\" font-size=\"10.5\" fill=\"#52666d\">r₁ = -∂L / ∂F₀</text><line x1=\"248\" y1=\"91\" x2=\"248\" y2=\"44\" stroke=\"#087f73\" stroke-width=\"1.5\"/><line x1=\"248\" y1=\"44\" x2=\"250\" y2=\"44\" stroke=\"#087f73\" stroke-width=\"1.5\"/><line x1=\"311\" y1=\"66\" x2=\"311\" y2=\"86\" stroke=\"#087f73\" stroke-width=\"1.5\" marker-end=\"url(#gb-arrow)\"/><rect x=\"250\" y=\"88\" width=\"122\" height=\"46\" rx=\"6\" fill=\"#edf5f2\" stroke=\"#087f73\" stroke-width=\"1.5\"/><text x=\"311\" y=\"108\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"700\" fill=\"#172d36\">Tree h₁(x)</text><text x=\"311\" y=\"124\" text-anchor=\"middle\" font-size=\"10.5\" fill=\"#52666d\">fits r₁ (× η)</text><line x1=\"372\" y1=\"111\" x2=\"404\" y2=\"111\" stroke=\"#087f73\" stroke-width=\"1.5\" marker-end=\"url(#gb-arrow)\"/><rect x=\"406\" y=\"68\" width=\"98\" height=\"46\" rx=\"6\" fill=\"#edf5f2\" stroke=\"#087f73\" stroke-width=\"1.5\"/><text x=\"455\" y=\"88\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"700\" fill=\"#172d36\">F₁ = F₀ + ηh₁</text><text x=\"455\" y=\"104\" text-anchor=\"middle\" font-size=\"10.5\" fill=\"#52666d\">updated model</text><line x1=\"504\" y1=\"91\" x2=\"534\" y2=\"91\" stroke=\"#087f73\" stroke-width=\"1.5\" marker-end=\"url(#gb-arrow)\"/><rect x=\"536\" y=\"68\" width=\"64\" height=\"46\" rx=\"6\" fill=\"#f5f7f4\" stroke=\"#8dbfb2\" stroke-width=\"1.5\" stroke-dasharray=\"4 3\"/><text x=\"568\" y=\"88\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"700\" fill=\"#172d36\">m = 2..M</text><text x=\"568\" y=\"104\" text-anchor=\"middle\" font-size=\"10.5\" fill=\"#52666d\">repeat</text><line x1=\"600\" y1=\"91\" x2=\"624\" y2=\"91\" stroke=\"#087f73\" stroke-width=\"1.5\" marker-end=\"url(#gb-arrow)\"/><rect x=\"626\" y=\"68\" width=\"100\" height=\"46\" rx=\"6\" fill=\"#152f38\" stroke=\"#087f73\" stroke-width=\"1.5\"/><text x=\"676\" y=\"88\" text-anchor=\"middle\" font-size=\"12\" font-weight=\"700\" fill=\"#ffffff\">Final Fₘ(x)</text><text x=\"676\" y=\"104\" text-anchor=\"middle\" font-size=\"10.5\" fill=\"#a7d8cb\">F₀ + Σ η hₘ(x)</text><text x=\"370\" y=\"168\" text-anchor=\"middle\" font-size=\"11\" fill=\"#52666d\">Har shallow tree hₘ(x) loss ka negative gradient predict karta hai aur η se scale hokar model mein add hota hai.</text></svg><figcaption style=\"font-size:.82rem;color:var(--muted,#52666d);margin-top:4px;\">Block diagram: Gradient Boosting mein step-by-step error correction</figcaption></figure><h4>Trees Model ko Kaise Improve Karte Hain</h4><ol><li><strong>Baseline (\\(F_0\\)):</strong> Ek constant prediction se start hota hai (jaise regression mein target mean, ya classification mein log-odds) jo loss minimize kare.</li><li><strong>Pseudo-Residual:</strong> Har step \\(m\\) pe pichle model \\(F_{m-1}(x_i)\\) ki galti (loss ka negative gradient) nikalte hain:<div class=\"formula\">\\[r_{im} = -\\left[ \\frac{\\partial L(y_i, F(x_i))}{\\partial F(x_i)} \\right]_{F(x) = F_{m-1}(x)}\\]</div>MSE loss mein ye seedha actual error \\(y_i - \\hat{y}_i\\) ban jata hai.</li><li><strong>Error Fitting:</strong> Naya shallow tree \\(h_m(x)\\) raw target \\(y\\) ki jagah is residual \\(r_{im}\\) ko predict karna seekhta hai.</li><li><strong>Shrinkage &amp; Update:</strong> Naye tree ko learning rate \\(\\eta \\in (0, 1]\\) se scale karke ensemble mein add karte hain:<div class=\"formula\">\\[F_m(x) = F_{m-1}(x) + \\eta \\, h_m(x)\\]</div>Chhote steps bias kam karte hain, aur shallow depth + \\(\\eta\\) overfitting rokta hai.</li></ol><p><strong>Remember:</strong> Har naya tree pichle model ki bachi hui galti (residual) ko thoda-thoda karke fix karta hai.</p>"
      ],
      [
        "How does one boosting step update a prediction?",
        "<p><strong>Core Concept:</strong> Har boosting iteration \\(m\\) mein model purani prediction \\(F_{m-1}(x)\\) ko update karne ke liye ek naya shallow tree \\(h_m(x)\\) train karta hai jo bachi hui galtiyon (pseudo-residuals) ko predict kare, aur us correction ko learning rate (\\(\\eta\\)) se scale karke ensemble mein add kar deta hai.</p><h4>The 4-Step Update Process</h4><ol><li><strong>Compute Pseudo-Residuals (\\(r_{im}\\)):</strong> Pichhle step ki prediction par loss function \\(L\\) ka negative gradient nikalna:<div class=\"formula\">\\[r_{im} = -\\left[ \\frac{\\partial L(y_i, F(x_i))}{\\partial F(x_i)} \\right]_{F(x) = F_{m-1}(x)}\\]</div>(MSE loss mein yeh seedha \\(y_i - F_{m-1}(x_i)\\) hota hai).</li><li><strong>Fit Weak Learner (\\(h_m\\)):</strong> Ek shallow regression tree train karna jo input features \\(X\\) se in pseudo-residuals \\(r_{im}\\) ko predict kare aur data ko terminal leaves \\(R_{jm}\\) mein baante.</li><li><strong>Optimal Leaf Value (\\(\\gamma_{jm}\\)):</strong> Har leaf \\(j\\) ke liye woh output value calculate karna jo us leaf ke loss ko minimize kare:<div class=\"formula\">\\[\\gamma_{jm} = \\arg\\min_{\\gamma} \\sum_{x_i \\in R_{jm}} L\\left(y_i, F_{m-1}(x_i) + \\gamma\\right)\\]</div></li><li><strong>Additive Update with Shrinkage:</strong> Naye tree ke output ko learning rate (\\(\\eta\\)) se multiply karke purani prediction mein add karna:<div class=\"formula\">\\[F_m(x) = F_{m-1}(x) + \\eta \\, h_m(x)\\]</div></li></ol><p><strong>Remember:</strong> Current prediction + (learning rate × new tree correction).</p>"
      ],
      [
        "How does bagging in a random forest differ from gradient boosting?",
        "<ul><li><strong>Bagging (Random Forest):</strong> Bahut saare independent trees ek saath (parallel) bante hain, aur end mein sabka output combine (average/vote) karke final decision banta hai.</li><li><strong>Gradient Boosting:</strong> Trees sequentially bante hain—har naya tree pichhle tree ki bachi hui galti (loss/residual) par depend karta hai, aur yeh iteration tab tak chalti hai jab tak error kam na ho jaye.</li></ul><div class=\"table-wrap\"><table><thead><tr><th></th><th>Random Forest (Bagging)</th><th>Gradient Boosting</th></tr></thead><tbody><tr><th>Training</th><td>Trees parallel aur independent bante hain</td><td>Har naya tree pichhle ensemble par depend karta hai</td></tr><tr><th>Combination</th><td>Predictions ka average ya majority vote</td><td>Sequential corrections add hote hain (\\(+ \\eta h_m\\))</td></tr><tr><th>Main goal</th><td>Variance (overfitting) kam karna</td><td>Bias aur error step-by-step kam karna</td></tr></tbody></table></div><p><strong>Remember:</strong> Bagging parallel diversity se variance ghatata hai; Boosting sequential corrections se error ghatata hai.</p>"
      ],
      [
        "What is XGBoost?",
        "<p>XGBoost is an optimized gradient-boosting library often used with decision trees.</p><ul><li><strong>Updates:</strong> Its tree booster uses gradient and second-order loss information.</li><li><strong>Regularization:</strong> Penalties control tree complexity and leaf weights.</li><li><strong>Evaluation:</strong> Tune it on validation data rather than assuming it is always best.</li></ul><p><strong>Remember:</strong> XGBoost adds efficient, regularized tree corrections.</p><p><a href=\"https://arxiv.org/abs/1603.02754\" target=\"_blank\" rel=\"noopener noreferrer\">Reference: XGBoost paper</a></p>"
      ],
      [
        "What is LightGBM?",
        "<p>LightGBM is a gradient-boosting framework designed for efficient tree training.</p><ul><li><strong>Histograms:</strong> Bin feature values to reduce split-search work and memory.</li><li><strong>Growth:</strong> Leaf-wise growth chooses the leaf with the greatest gain.</li><li><strong>Control:</strong> Limit tree complexity because unrestricted growth can overfit.</li></ul><p><strong>Remember:</strong> LightGBM uses histogram splits and gain-driven leaf growth.</p><p><a href=\"https://lightgbm.readthedocs.io/en/stable/Features.html\" target=\"_blank\" rel=\"noopener noreferrer\">Reference: LightGBM features</a></p>"
      ],
      [
        "How do learning rate and tree count affect gradient boosting?",
        "<p>Learning rate scales each boosting correction; tree count sets how many are added.</p><ul><li><strong>Smaller rate:</strong> Usually needs more trees to make comparable progress.</li><li><strong>Too few trees:</strong> The ensemble may underfit.</li><li><strong>Too much fitting:</strong> Too many corrections can overfit; choose using validation results.</li></ul><p><strong>Remember:</strong> Tune correction size and correction count together.</p>"
      ],
      [
        "What distinguishes XGBoost from LightGBM?",
        "<p>XGBoost and LightGBM are different implementations of gradient boosting.</p><ul><li><strong>XGBoost:</strong> Uses gradient and second-order loss information with tree regularization.</li><li><strong>LightGBM:</strong> Is known for histogram-based split search and leaf-wise growth.</li><li><strong>Choice:</strong> Both have configurable behavior; compare them on the actual task.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Concept</th><th scope=\"col\">Explanation</th></tr></thead><tbody><tr><th scope=\"row\">XGBoost</th><td>Uses gradient and second-order loss information with tree regularization.</td></tr><tr><th scope=\"row\">LightGBM</th><td>Is known for histogram-based split search and leaf-wise growth.</td></tr><tr><th scope=\"row\">Choice</th><td>Both have configurable behavior; compare them on the actual task.</td></tr></tbody></table></div><p><strong>Remember:</strong> Implementation choices matter, but validation decides the winner.</p>"
      ],
      [
        "How do I train XGBoost and LightGBM classifiers on the same data?",
        "<p>Compare XGBoost and LightGBM by training both on the same training split.</p><ol><li><strong>Prepare:</strong> Use the same features, targets, and held-out split.</li><li><strong>Train:</strong> Fit each classifier with its own configuration.</li><li><strong>Evaluate:</strong> Use the same metric; a basic example is not a complete tuning experiment.</li></ol><pre><code class=\"language-python\">from sklearn.datasets import load_breast_cancer\nfrom sklearn.model_selection import train_test_split\nfrom xgboost import XGBClassifier\nfrom lightgbm import LGBMClassifier\n\nX, y = load_breast_cancer(return_X_y=True)\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, stratify=y, random_state=42)\nmodels = [\n    XGBClassifier(n_estimators=50, max_depth=3,\n                  learning_rate=0.05, random_state=42, n_jobs=1),\n    LGBMClassifier(n_estimators=50, num_leaves=7,\n                   learning_rate=0.05, random_state=42,\n                   n_jobs=1, verbosity=-1)\n]\nfor model in models:\n    model.fit(X_train, y_train)\n    print(type(model).__name__, model.score(X_test, y_test))</code></pre><p><strong>Remember:</strong> Compare libraries under the same evaluation conditions.</p>"
      ]
    ]
  },
  {
    "title": "Feature importance",
    "questions": [
      [
        "What is feature importance in tree models?",
        "<p>Feature importance summarizes how strongly a fitted model relies on each input under a chosen measure.</p><ul><li><strong>Measure:</strong> Impurity, gain, split count, and permutation importance answer different questions.</li><li><strong>Scope:</strong> Importance describes a fitted model and dataset.</li><li><strong>Causation:</strong> An important feature is not automatically a cause of the target.</li></ul><p><strong>Remember:</strong> Always ask how importance was measured.</p>"
      ],
      [
        "How do impurity, gain, and split-count importance differ?",
        "<p>Impurity, gain, and split count assign importance using different tree statistics.</p><ul><li><strong>Impurity:</strong> Sum sample-weighted impurity reductions for a feature.</li><li><strong>Gain:</strong> Aggregate improvement in the boosting objective from feature splits.</li><li><strong>Split count:</strong> Count how often a feature is used, regardless of improvement size.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Concept / approach</th><th scope=\"col\">Explanation</th></tr></thead><tbody><tr><th scope=\"row\">Impurity importance</th><td>sums sample-weighted impurity reductions attributed to each feature in a tree or forest.</td></tr><tr><th scope=\"row\">Gain importance</th><td>reports improvement in the boosting objective from splits using a feature. A library may report average gain or total gain; check the selected importance type.</td></tr><tr><th scope=\"row\">Split count</th><td>counts feature usage, regardless of how useful each split was. Frequent splitting and large improvements are different measures.</td></tr></tbody></table></div><p><strong>Remember:</strong> Reduction, improvement, and frequency are different measurements.</p>"
      ],
      [
        "How is permutation importance calculated?",
        "<p>Permutation importance measures the score change when one feature is shuffled.</p><ol><li><strong>Baseline:</strong> Score the fitted model on suitable held-out data.</li><li><strong>Shuffle:</strong> Randomly reorder one feature and score again.</li><li><strong>Repeat:</strong> Repeat shuffling to estimate the typical score drop and variability.</li></ol><div class=\"formula\">\\[I_j=s_{\\mathrm{baseline}}-\\frac{1}{R}\\sum_{r=1}^{R}s_{j,r}^{\\mathrm{shuffled}}\\]</div><p><strong>Remember:</strong> Break one feature's information and measure the damage.</p><p><a href=\"https://scikit-learn.org/stable/modules/permutation_importance.html\" target=\"_blank\" rel=\"noopener noreferrer\">Reference: permutation importance</a></p>"
      ],
      [
        "What is the importance if accuracy drops from 0.90 to 0.80 after shuffling?",
        "<p>If accuracy falls from 0.90 to 0.80 after shuffling, permutation importance is 0.10.</p><ul><li><strong>Calculation:</strong> Subtract the shuffled accuracy from the baseline accuracy.</li><li><strong>Units:</strong> A difference of 0.10 is ten percentage points.</li><li><strong>Comparison:</strong> A drop from 0.90 to 0.89 is one percentage point.</li></ul><div class=\"formula\">\\[I=0.90-0.80=0.10\\]</div><p><strong>Remember:</strong> Importance is the score drop, not the shuffled score.</p>"
      ],
      [
        "Why can feature-importance rankings be misleading?",
        "<p>Feature-importance rankings can be distorted by feature properties and dependencies.</p><ul><li><strong>Split bias:</strong> Impurity importance can favor features with many possible splits.</li><li><strong>Correlation:</strong> Related features can share or hide each other's importance.</li><li><strong>Interpretation:</strong> Results depend on the model, data, and metric and do not prove causation.</li></ul><div class=\"table-wrap\"><table><thead><tr><th scope=\"col\">Concept / approach</th><th scope=\"col\">Explanation</th></tr></thead><tbody><tr><th scope=\"row\">Many possible splits</th><td>training-based impurity importance can favor features with many distinct values.</td></tr><tr><th scope=\"row\">Correlated features</th><td>one feature can substitute for another, reducing its measured permutation importance.</td></tr><tr><th scope=\"row\">Unrealistic shuffled rows</th><td>permutation can break relationships between features. Interpret rankings alongside model performance; importance is model reliance, not proof that changing an input causes an outcome.</td></tr></tbody></table></div><p><strong>Remember:</strong> Treat importance as model evidence, not a causal verdict.</p>"
      ],
      [
        "How do I calculate held-out permutation importance for a random forest?",
        "<p>Compute permutation importance on held-out examples after fitting the random forest.</p><ol><li><strong>Train:</strong> Fit the model using training data only.</li><li><strong>Measure:</strong> Shuffle features on held-out data with repeated evaluations.</li><li><strong>Protect:</strong> If importance guides feature selection, keep another untouched final evaluation set.</li></ol><pre><code class=\"language-python\">from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.inspection import permutation_importance\n\ndata = load_iris()\nX_train, X_eval, y_train, y_eval = train_test_split(\n    data.data, data.target, test_size=0.3,\n    stratify=data.target, random_state=42)\nmodel = RandomForestClassifier(n_estimators=100, random_state=42)\nmodel.fit(X_train, y_train)\nresult = permutation_importance(\n    model, X_eval, y_eval, scoring='accuracy',\n    n_repeats=10, random_state=42)\nfor name, mean, std in zip(data.feature_names,\n        result.importances_mean, result.importances_std):\n    print(name, round(mean, 3), round(std, 3))</code></pre><p><strong>Remember:</strong> Measure importance outside fitting and keep final evaluation independent.</p>"
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
  for (const [question, answer, meta] of topic.questions) {
    const detail = document.createElement('details');
    if (meta && meta.later) detail.classList.add('question-later');
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
